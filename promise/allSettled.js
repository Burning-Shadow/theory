Promise.allSettled = Promise.allSettled || function (promises) {
  return new Promise(function (resolve, reject) {
    if (!Array.isArray(promises)) {
      return reject(
        new TypeError("arguments must be an array")
      );
    }
    let resolvedCounter = 0;
    const len = promises.length;
    // 统计所有的promise结果并最后返回
    const resolvedResults = new Array(len);
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(
        function (value) {
          resolvedCounter++;
          resolvedResults[i] = value;
          if (resolvedCounter == len) {
            return resolve(resolvedResults);
          }
        },
        function (reason) {
          resolvedCounter++;
          resolvedResults[i] = reason;
          if (resolvedCounter == len) {
            return resolve(reason);
          }
        }
      );
    }
  });
};