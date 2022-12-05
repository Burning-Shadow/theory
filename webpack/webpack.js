const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');
const { parse } = require('path');

/**
 * 分析单独模块
 * @param {*} file
*/
function getModuleInfo(file) {
  // 读取文件
  const body = fs.readFileSync(file, 'utf-8');
  // console.log('body = ', body);
  // TODO 罗列 import 项
  /**
   * 转换 AST 语法树
   * 1. 代码字符串 => 对象 => 对象遍历解析
   * 2. 编译过程 AST
  */
  const ast = parser.parse(body, { sourceType: 'module' });
  // console.log('ast = ', ast);

  const deps = {};

  traverse(ast, {
    ImportDeclaration({ node }) {
      // 遇到 import 节点时回调
      // console.log('import , ', node);
      const dirname = path.dirname(file);
      const absPath = `./${path.join(dirname, node.source.value)}`; // ./src/add.js
      console.log('absPath = ', absPath);
      deps[node.source.value] = absPath;
    }
  });

  // TODO ES6 => ES5
  const { code } = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env']
  });

  const moduleInfo = { file, deps, code };
  return moduleInfo;
};

const info = getModuleInfo('./src/index.js');
console.log('info = ', info);

/**
 * 模块解析
 * @param {*} file 
 * @returns 
 */
function parseModules(file) {
  const entry = getModuleInfo(file);
  const temp = [entry];
  const depsGraph = {};

  getDeps(temp, entry);
  temp.forEach(info => {
    depsGraph[info.file] = {
      deps: info.deps,
      code: info.code,
    }
  });

  console.log('depsGraph = ', depsGraph);
  return depsGraph;
}

/**
 * 获取依赖
 * @param {*} temp 
 * @param {*} param1 
 */
function getDeps(temp, { deps }) {
  Object.keys(deps).forEach(key => {
    const child = getModuleInfo(deps[key]);
    temp.push(child);
    getDeps(temp, child);
  });
};

// const content = parseModules('./src/index.js');
// console.log('content = ', content);

/**
 * 打包成 bundle.js
*/
function bundle(file) {
  const depsGraph = JSON.stringify(parseModules(file));
  return `(function (graph) {
    function require (file) {
      function absRequire (relPath) {
        return require(graph[file].deps[relPath]);
      }
      var exports = {};
      (function (require, exports, code) {
        eval(code);
      })(absRequire, exports, graph[file].code)
      return exports;
    }
    require('${file}')
  })(${depsGraph})`;
}

const content = bundle('./src/index.js');
!fs.existsSync('./dist') && fs.mkdirSync('./dist');
fs.writeFileSync('./dist/bundle.js', content);