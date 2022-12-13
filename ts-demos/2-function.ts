function add(x: number, y: number, z?: number): number {
  if (typeof z === 'number') return x + y + z;
  return x + y;
};

const result1 = add(2, 3);
const result2 = add(2, 3, 4);


const add2: (x: number, y: number, z?: number) => number = add;
