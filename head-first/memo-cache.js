function add(a, b) {
  return a + b;
}

function memo(func) {
  const cache = {};

  return function funcB(...args) {
    const argsKey = args.join('&');
    if (cache[argsKey]) {
      return cache[argsKey];
    }

    return cache[argsKey] = func(...args);
  }
}

const funcC = memo(add);
console.log(funcC(1, 2));
console.log(funcC(2, 3));
console.log(funcC(1, 2));