/**
 * 1. 创建新对象
 * 2. 将构造函数作用域赋给新对象（obj.__proto__ = Base.prototype）
 * 3. 执行构造函数中的代码（Base.call(obj, ...args)）
 * 4. 返回新对象
*/
function myNew(Constructor, ...args) {
  const obj = {};
  Object.setPrototypeOf(obj, Constructor.prototype);
  const result = Constructor.apply(obj, args);
  return result instanceof Object ? result : obj;
}