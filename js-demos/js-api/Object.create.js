/**
 * proto: 新创建对象的原型对象
 * propertiesObject: 要添加到新对象的属性，相当于原型式继承，得到 obj 的所有属性
 * 亦可通过 Object.create(null) 创建一个不含任何属性的空对象
*/

Object.prototype.inherit = function (SubTypeProtorype) {
  function F() { };
  F.prototype = obj;
  return new F();
}