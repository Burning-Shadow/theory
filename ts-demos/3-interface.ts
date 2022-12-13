interface Person {
  readonly id: number,
  name: string,
  age: number,
  sex?: string,
};

const Student: Person = {
  id: 134,
  name: 'franciss',
  age: 20,
  sex: 'male',
}
