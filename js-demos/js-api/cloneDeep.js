// 编写一个深度克隆函数，满足以下需求（此题考察面较广，注意细节）
function deepClone(obj) {
  if (typeof obj !== 'object') return obj;

  const newObj = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    if (obj[key] instanceof Date) newObj[key] = new Date(obj[key]);

    else if (obj[key] instanceof RegExp) newObj[key] = new RegExp(obj[key]);

    // DOM 元素节点
    else if (typeof obj[key] === 'object' && sourceObj[key].nodeType === 1) {
      let domEle = document.getElementsByTagName(sourceObj[key].nodeName)[0];
      newObj[key] = domEle.cloneNode(true);
    } else {
      newObj[key] = (typeof sourceObj[key] === 'object') ? deepCopy(sourceObj[key]) : sourceObj[key];
    }
  }
};

// deepClone 函数测试效果
const objA = {
  name: 'jack',
  birthday: new Date(),
  pattern: /jack/g,
  body: document.body,
  others: [123, 'coding', new Date(), /abc/gim, ]
};

const objB = deepClone(objA);
console.log(objA === objB); // 打印 false
console.log(objA, objB); // 对象内容一样
