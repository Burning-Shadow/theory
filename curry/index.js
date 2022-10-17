function sum(a, b, c) {
  // console.log('arguments = ', arguments);
  return a + b + c;
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> callCurry >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function callCurry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };
};

const currySum = callCurry(sum);

console.log(currySum(1, 2, 3));
console.log(currySum(1)(2, 3));
console.log(currySum(1)(2)(3));

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> bindCurry >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function bindCurry(func) {
  return function bindfn() {
    if (arguments.length < func.length) {
      console.log('bind');
      return bindfn.bind(null, ...arguments);
      // 关键：保存参数，并在调用时和后面的参数一起传入 bindfn
    }

    return func.apply(null, arguments);
  }
}

const bindCurrySum = bindCurry(sum);

console.log(bindCurrySum(1, 2, 3));
console.log(bindCurrySum(1)(2, 3));
console.log(bindCurrySum(1)(2)(3));