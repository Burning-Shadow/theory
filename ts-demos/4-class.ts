class Animal {
  /**
   * public    公有方法，可访问、更改
   * protected 子类可以访问，外部无法直接访问
   * private   子类亦不可访问，只能在本类中使用
   * readonly  只读
   * static    无需实例化，可以通过类名直接访问
  */
  protected name: string;
  static categories: string[] = ['mammal', 'bird'];
  static isAnimal(a) {
    return a instanceof Animal;
  }

  constructor(name: string) {
    this.name = name;
  };

  run() {
    return `${this.name} is running`;
  }
}

console.log(Animal.categories);
const snake = new Animal('cat');
snake.run();
console.log(Animal.isAnimal(snake));
// ptotected 无法在类外部访问 & 更改
console.log(snake.name);
snake.name = 'haihaihai';


class Dog extends Animal {
  bark() {
    return `${this.name} is barking`;
  }
}

const lucky = new Dog('lucky');
lucky.bark();


class Cat extends Animal {
  constructor(name: string) {
    super(name);
    console.log(this.name);
  }

  run() {
    return `Meow, ${super.run()}`;
  }
}

const honey = new Cat('honey');
honey.run();