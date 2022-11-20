// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 原型链 / 类继承 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function Person(name, age) {
  this.name = name,
    this.age = age,
    this.play = [1, 2, 3];
  this.setName = function () {};
}
Person.prototype.setAge = function () {};
function Student(price) {
  this.price = price;
  this.setScore = function () {};
}
Student.prototype = new Person(); // 子类型的原型为父类型的一个实例对象
var s1 = new Student(15000);
var s2 = new Student(14000);
console.log(s1, s2);

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 构造函数式继承 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function Person(name, age) {
  this.name = name,
    this.age = age,
    this.setName = function () {};
}
Person.prototype.setAge = function () {};

function Student(name, age, price) {
  Person.call(this, name, age); // 相当于: this.Person(name, age)
  this.price = price
}
var s1 = new Student('Tom', 20, 15000);

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 组合式继承 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function Person(name, age) {
  this.name = name,
    this.age = age,
    this.setAge = function () {};
}
Person.prototype.setAge = function () {
  console.log("111");
}

function Student(name, age, price) {
  Person.call(this, name, age);
  this.price = price;
  this.setScore = function () {};
}
Student.prototype = new Person();
Student.prototype.constructor = Student //组合继承也是需要修复构造函数指向的
Student.prototype.sayHello = function () {};
var s1 = new Student('Tom', 20, 15000);
var s2 = new Student('Jack', 22, 14000);
console.log(s1);
console.log(s1.constructor); //Student
console.log(p1.constructor); //Person

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 原型继承 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function Persion(name, age) {
  this.name = name;
  this.age = age;
  this.setAge = function() {};
}
Student.prototype = createObj(Persion); // 相当于 Student = Object.create(Persion);
function createObj(o) {
  function f() {};
  f.prototype = o;
  return new f();
}
Student.prototype = new Person();

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 寄生式继承 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function Person(name, age) {
  this.name = name,
    this.age = age,
    this.setAge = function () {};
}
Person.prototype.setAge = function () {
  console.log("111");
}

function Student(name, age, price) {
  Person.call(this, name, age)
  this.price = price
  this.setScore = function () {};
}
Student.prototype = Person.prototype;
Student.prototype.sayHello = function () {};
var s1 = new Student('Tom', 20, 15000);
console.log(s1);

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 寄生组合式继承 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function Person(name, age) {
  this.name = name,
    this.age = age;
}
Person.prototype.setAge = function () {
  console.log("111");
}

function Student(name, age, price) {
  Person.call(this, name, age);
  this.price = price;
  this.setScore = function () {};
}
Student.prototype = Object.create(Person.prototype); // 核心代码
Student.prototype.constructor = Student; //核心代码
var s1 = new Student('Tom', 20, 15000);
console.log(s1 instanceof Student, s1 instanceof Person); // true true
console.log(s1.constructor); //Student
console.log(s1);