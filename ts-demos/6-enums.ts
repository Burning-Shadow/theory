/**
 * 尽量使用常量枚举【const enum Direction】
 * 可以提升性能
 * 
 * 只有常量值才可使用常量枚举，computed number【计算值】不可
*/
enum Direction {
  UP,    // 0
  DOWN,  // 1
  LEFT,  // 2
  RIGHT, // 3
};

console.log(Direction.UP); // 0
console.log(Direction[0]); // UP
