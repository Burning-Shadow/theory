export default class SelfVue {
  constructor(obj_instance) {
    this.$data = obj_instance.data;
    Observer(this.data);
    Compiler(obj_instance.el, this);
  }
};

function Observer(data_instance) {
  if (!data_instance || typeof data_instance !== 'object') return;

  const dependency = new Dependency();

  Object.keys(data_instance).forEach(key => {
    let value = data_instance[key];

    Observer(value);

    Object.defineProperty(data_instance, key, {
      enumerable: true,
      configurable: true,
      get() {
        Dependency.temp && dependency.addSub(Dependency.temp);
        return value;
      },
      set(newValue) {
        value = newValue;
        Observer(newValue);
        dependency.notify();
      }
    });
  });
};

function Observer(el, vm) {
  vm.$el = document.querySelector(el);

  // 临时接收 DOM 元素
  const fragment = document.createDocumentFragment();

  console.log('vm.$el.childNodes = ', vm.$el.childNodes);

  let child;
  while (child = vm.$el.firstChild) fragment.append(child);

  console.log('fragment = ', fragment);
  console.log('fragment.childNodes = ', fragment.childNodes);

  fragment_compile(fragment);

  // 修改函数
  function fragment_compile(node) {
    const pattern = /\{\{\s*(\S+)\s*\}\}/;

    // 文本节点直接返回，不进行编译
    if (node.nodeType === 3) {
      const { nodeValue } = node;

      const result_regexp = pattern.exec(node.nodeValue);
      console.log('result_regexp = ', result_regexp);
      console.log('node.nodeValue = ', node.nodeValue);

      if (result_regexp) {
        // 获取模板字符串【形如 more.like】
        const [, strTemplate] = result_regexp;
        const arr = strTemplate.split('.');
        const value = arr.reduce((total, curr) => total[curr], vm.$data);

        node.nodeValue = nodeValue.replace(pattern, value); // 立即执行一遍完成模板替换

        new Watcher(vm, strTemplate, newVal => {
          node.nodeValue = nodeValue.replace(pattern, newVal);
        });
      }

      return;
    }

    // 数据更改引起视图变更
    if (node.nodeType === 1 && node.nodeName === 'INPUT') {
      const attrs = Array.from(node.attributes);

      console.log(attrs);

      attrs.forEach(i => {
        if (i.nodeName === 'v-model') {
          const value = i.nodeValue.split('.').reduce((total, curr) => total[curr], vm.$data);

          node.value = value; // 立即执行一遍完成模板替换
          // 增加 watcher 保证
          new Watcher(vm, i.nodeValue, newVal => {
            node.value = newVal;
          });

          node.addEventListener('input', e => {
            const arr1 = i.nodeValue.split('.');
            const arr2 = arr1.slice(0, arr1.length - 1);
            const finalAttr = arr2.reduce((total, curr) => total[curr], vm.$data);
            finalAttr[arr1[arr1.length - 1]] = e.target.value;
          });
        }
      });
    }

    node.childNodes.forEach(child => fragment_compile(child));
  }

  // 将 fragment 缓存内的节点重新渲染至页面
  vm.$el.appendChild(fragment);
};

class Dependency {
  constructor() {
    this.list = [];
  }

  addSub(sub) {
    this.list.push(sub);
  };

  notify() {
    this.list.forEach(sub => sub.notify());
  }
}

class Watcher {
  constructor(vm, key, callback) {
    this.vm = vm;
    this.key = key;
    this.callback = callback;

    // 临时属性 —— 触发 getter
    Dependency.temp = this;
    // debugger;

    // 触发 getter 执行 addSub 操作
    key.split('.').reduce((total, curr) => total[curr], vm.$data);
    Dependency.temp = null;
  }

  update() {
    const value = this.key.split('.').reduce((total, curr) => total[curr], vm);
    this.callback(value);
  };
}
