/**
 * apply
*/
Function.prototype.myApply = function (context) {
  const currContext = context || window;
  currContext.fn = this; // 调用函数体

  let result;
  if (arguments[1]) result = currContext.fn(...arguments[1]);
  else result = currContext.fn();

  delete currContext.fn;
  return result;
}

/**
 * call
*/
Function.prototype.myCall = function (context) {
  const currContext = context || window;
  currContext.fn = this;

  const args = [...arguments].slice(1);
  const result = currContext.fn(...args);

  delete currContext.fn;
  return result;
}

/**
 * bind
*/
Function.prototype.bind = function (context) {
  if (typeof this !== 'function') throw new Error();

  const _this = this;
  const args = context ? [...arguments].slice(1) : [...arguments];

  return function F () {
    if (this instanceof F) return new _this(...args, ...arguments);
    return _this.apply(context, args.concat(...arguments));
  };
}