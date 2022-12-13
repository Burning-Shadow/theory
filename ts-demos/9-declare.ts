/**
 * 往往引入第三方库的时候会将该引用语句放入名为 xxx.d.ts 的文件中
 * ts 会解析 .d.ts 文件，并将其声明范围映射到所有 ts 文件中
 * 
 * 一般的库均有 types 声明文件，也就是 declare 语法的组合
 * 详情可以在 microsoft.github.io/TypeSearch/ 下查询
*/

declare const jQuery: (selector: string) => any;
