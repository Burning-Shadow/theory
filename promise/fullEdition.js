const STATUS = {
  PENDING: 'PENDING',
  FULLFILLED: 'FULLFILLED',
  REJECT: 'REJECT',
};

class _Promise {
  constructor(executor) {
    this.resolveCallback = [];
    this.rejectCallback = [];
    this._STATUS = STATUS.PENDING;
    this.value = undefined;

    try {
      executor(this.resolve);
    } catch (err) {
      this.reject(err);
    }
  }

  resolve = (value) => {
    if (this._STATUS === STATUS.PENDING) {
      this.value = value;
      this.resolveCallback.forEach(cb => cb(value));
      this._STATUS = STATUS.FULLFILLED;
    }
  };

  reject = (err) => {
    if (this._STATUS === STATUS.PENDING) {
      this.rejectCallback.forEach(cb => cb(err));
      this._STATUS = STATUS.REJECT;
    }
  };

  then = (resolveHandler, rejectHandler) => {
    const onResolve = typeof resolveHandler === 'function' ? resolveHandler : val => val;
    const onReject = typeof rejectHandler === 'function' ? resolveHandler : err => err;

    return new _Promise((resolve, reject) => {
      try {
        if (this._STATUS === STATUS.FULLFILLED) {
          const result = onResolve(this.value);

          if (result instanceof _Promise) result.then(resolve, reject);
          else resolve(result);
        }

        if (this._STATUS === STATUS.REJECT) {
          const err = onReject(this.value);

          if (result instanceof _Promise) result.then(resolve, reject);
          else reject(result);
        }

        if (this._STATUS === STATUS.PENDING) {
          this.resolveCallback.push(val => {
            const result = onResolve(val);

            if (result instanceof _Promise) result.then(resolve, reject);
            else resolve(result);
          });

          this.rejectCallback.push(err => {
            const result = onReject(err);

            if (result instanceof _Promise) result.then(resolve, reject);
            else reject(result);
          });
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  catch = (errHandler) => {
    return this.then(null, errHandler);
  }

  finally = (finalHandler) => {
    return this.then(val => {
      finalHandler();
      return val;
    }, err => {
      finalHandler();
      throw err;
    })
  };

  all = (promiseList) => {
    return new _Promise((resolve, reject) => {
      if (!Array.isArray(promiseList)) {
        reject(new TypeError('参数错误！'))
      }
      let count = 0
      let valueList = new Array(promiseList.length)
      promiseList.forEach((promise, index) => {
        _Promise.resolve(promise).then(result => {
          count++
          valueList[index] = result  //  将每次返回的结果搜集起来
          if (count === promiseList.length) {
            //  表示所有的promise都有结果，最终将所有的结果都resolve出去
            resolve(valueList)
          }
        }, err => reject(err))
      })
    })
  };

  allSettled = (promises) => {
    return new _Promise(function (resolve, reject) {
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
        _Promise.resolve(promises[i]).then(
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
  }
}