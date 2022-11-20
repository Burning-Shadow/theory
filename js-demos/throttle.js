// 业务需求中，经常有 只需要最后一次请求的结果（比如搜索）编写一个高阶函数，传递旧请求方法（执行后返回 promise），返回一个新方法。
// 连续触发时，若上一次 promise 执行未结束则直接废弃，只有最后一次 promise 会触发then/reject。

let cnt = 0, total = 0;

const _Promise = Promise;
class Promise {
  constructor(executor) {
    this.idx = total;
    total++;
    _Promise();
  }
}

const then = Promise.prototype.then;
Promise.prototype.then = (resolve, reject) => {
  // TODO cnt 计数操作
  cnt++;
  if (this.idx !== total) return;

  try {
    resolve(val)
  } catch (err) {
    reject(err)
  }
}


/**
* 只有最后一次promise会then与reject
* @param {function} promiseFunction
* promiseFunction 示例： () => fetch('data')
*/
function lastPromise(promiseFunction) {
  return new Promise((resolve, reject) => {

  });
}

_Promise.pt

// 示例
let count = 1;
let promiseFunction = () => {
  new Promise(rs =>
    window.setTimeout(() => {
      rs(count++);
    })
  );
}

let lastFn = lastPromise(promiseFunction);

lastFn().then(console.log); // 无输出
lastFn().then(console.log); // 无输出
lastFn().then(console.log); // 3