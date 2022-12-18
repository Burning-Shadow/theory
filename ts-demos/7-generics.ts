/**
 * 泛型的存在让我们在定义函数时无需关注类型
 * 不同于 any 不做约束，其参数、结果可以完全按照占位符来映射调用方的具体形参
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/
function echo<T>(arg: T): T {
  return arg;
};

const str: string = 'str';
const result = echo(str);
// ----------------------------------------------------------------------------------------

function logger<Type extends { length: number }>(params: Type): Type {
  console.log(params.length);
  return params;
}

logger({ length: 0 });
logger([1, 2, 3]);
logger('12333qjiojfa');
// logger(1); // number 不能分配给 { length:number }
// ----------------------------------------------------------------------------------------

function getObjProperty<Type>(obj: Type, key: keyof Type) {
  return obj[key];
}

getObjProperty({ a: 1 }, 'a');
// getProperty({ a: 1}, 'b');
// ----------------------------------------------------------------------------------------

function getProperty<Type, Key extends keyof Type = keyof Type>(
  obj: Type,
  key: Key
) {
  return obj[key];
}

// getProperty({ name: 'senlin', age: 18 }, false); // Error: false不能分配给'name'|'age'
// getProperty({ name: 'senlin', age: 18 }, '444'); // Error: '444'不能分配给'name'|'age'
getProperty({ name: 'senlin', age: 18 }, 'name'); // OK: 'senlin'
// ----------------------------------------------------------------------------------------

function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
};

const result3 = swap(['str', 123]);


/**
 * 约束泛型 Duck Typing
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/
interface IWithLength {
  length: number;
}

function echoWithLength<T extends IWithLength>(arg: T): T {
  console.log(arg.length);
  return arg;
};

const arrs = echoWithLength([1, 2, 3]);
const strs = echoWithLength('str');
const obj = echoWithLength({ length: 2, width: 10 });
console.log(arrs);
console.log(strs);
console.log(obj);


/**
 * class & generics
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/
class Queue<T> {
  private data = [];

  push(item: T) {
    return this.data.push(item);
  }
  pop(): T {
    return this.data.pop();
  }
}

const queue = new Queue<number>();
queue.push(1);
console.log(queue.pop().toFixed());

const queue2 = new Queue<string>();
queue2.push('str');
console.log(queue2.pop().length);




class Minclass<T> {
  public list: T[] = []
  add(value: T): void {
    this.list.push(value)
  }
  min(): T {
    let minNum = this.list[0]
    for (let i = 0; i < this.list.length; i++) {
      if (minNum > this.list[i]) {
        minNum = this.list[i]
      }
    }
    return minNum
  }
}
let m = new Minclass<number>()
m.add(2)
m.add(6)
m.min() //2
let s = new Minclass<string>()
s.add('m')
s.add('c')
s.min()//c


/**
 * interface & generics
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/
interface KeyPair<T, U> {
  key: T;
  value: U;
}

const kp1: KeyPair<number, string> = { key: 123, value: 'value' }
const kp2: KeyPair<string, number> = { key: 'key', value: 123 }

const arr1: number[] = [1, 2, 3];
const arr2: Array<number> = [1, 2, 3];


interface IPlus<T> {
  (a: T, b: T): T;
};

function plus(a: number, b: number): number {
  return a + b;
};
function connect(a: string, b: string): string {
  return a + b;
};

const a: IPlus<number> = plus;
const b: IPlus<string> = connect;


