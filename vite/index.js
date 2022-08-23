const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const compilerSfc = require('@vue/compiler-sfc');
const compilerDom = require('@vue/compiler-dom');

const app = new Koa();

// import { xxx } from 'vue' => import { xxx } from '/@modules/vue'
const rewriteImport = (content) => {
  return content.replace(/ from ['|"]([^'"]+)['|"]/g, (s0, s1) => {
    if (s1[0] !== '.' && s1[0] !== '/') {
      return ` from '/@modules/${s1}'`;
    } else {
      return s0;
    }
  });
};

app.use(async (ctx) => {
  const { url, query } = ctx.request;
  console.log(`url = ${url}`);

  if ('/' === url) {
    ctx.type = 'text/html';
    const content = fs.readFileSync('./index.html', 'utf-8')
      .replace('<script', `<script>window.process = { env: { NODE_ENV: 'dev' } }</script><script`);
    ctx.body = content;
  } else if (url.endsWith('.js')) {
    const p = path.resolve(__dirname, url.slice(1));
    const content = fs.readFileSync(p, 'utf-8');
    ctx.type = 'application/javascript';
    ctx.body = rewriteImport(content);
  } else if (url.startsWith('/@modules')) {
    // 文件内部 import => 相对路径
    const prefix = path.resolve(
      __dirname,
      'node_modules',
      url.replace('/@modules/', ''),
    );

    const module = require(`${prefix}/package.json`).module;
    const p = path.resolve(prefix, module);
    const ret = fs.readFileSync(p, 'utf-8');
    ctx.type = 'application/javascript';
    ctx.body = rewriteImport(ret);
  } else if (url.indexOf('.vue') !== -1) {
    // 支持 SFC 组件

    // 1. .vue 文件 => template-script 【compiler-sfc】
    const p = path.resolve(__dirname, url.split('?')[0].slice(1));
    const { descriptor } = compilerSfc.parse(fs.readFileSync(p, 'utf-8'));

    // console.log('descriptor = ', descriptor);

    if (!query.type) {
      // descriptor.script => js + template 生成 render 函数
      ctx.type = 'application/javascript';
      ctx.body = `
        ${rewriteImport(descriptor.script.content.replace('export default ', 'const __script = '))}
        import { render as __render } from '${url}?type=template'
        __script.render = __render;
        export default __script;
      `;
    } else {
      // 2. template script => render 函数【compiler-dom】
      const { template } = descriptor;
      const render = compilerDom.compile(template.content, { mode: 'module' });
      ctx.type = 'application/javascript';
      // console.log(render);
      ctx.body = rewriteImport(render.code);
    }
  } else if (url.endsWith('.css')) {
    // css 转为 js => 利用 js 添加一个 style 标签
    const p = path.resolve(__dirname, url.slice(1));
    const file = fs.readFileSync(p, 'utf-8');
    const content = `
      const css = '${file.replace(/\n/g, "")}';
      const link = document.createElement('style');
      link.setAttribute('type', 'text/css');
      document.head.appendChild(link);
      link.innerHTML = css;
      export default css;
    `;
    ctx.type = 'application/javascript';
    ctx.body = content;
  }
});

app.listen(3000, () => {
  console.log(`Vite start at 3000`);
});