describe('实现 call、apply、bind', () => {
  it ('call => ', () => {
    const { call } = require('./index.js');
    Function.prototype.myCall = call;
    const obj = { a: 1 }; // 上下文
    const f = function(...args) {
      return { context: this, args };
    };
    expect(f.apply(obj, 1, 2).toEqual({ context: obj, args: [1, 2] }));
  });
  // if ('apply => ', () => {});
  // if ('bind => ', () => {});
});