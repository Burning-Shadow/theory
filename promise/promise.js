const STATUS = {
  PENDING: 'PENDING',
  FULLFILLED: 'FULLFILLED',
  REJECT: 'REJECT',
};

class _Promise {
  constructor(executor) {
    this.resolveCallbacks = [];
    this.rejectCallbacks = [];
    this.status = STATUS.PENDING;
    this.value = undefined;

    try {
      executor(this.resolve);
    } catch (err) {
      throw new Error(err);
    }
  }

  resolve = (val) => {
    if (this.status === STATUS.PENDING) {
      this.value = val;
      this.resolveCallbacks.forEach(cb => cb(value));
      this.status = STATUS.FULLFILLED;
    }
  }

  reject = (err) => {
    if (this.status === STATUS.PENDING) {
      this.rejectCallbacks.forEach(cb => cb(err));
      this.status = STATUS.REJECT;
    }
  }

  then = (successObserver, failObserver) => {
    const onResolve = typeof successObserver === 'function' ? successObserver : val => val;
    const onReject = typeof failObserver === 'function' ? failObserver : err => err;

    /**
     * 保证链式调用必须返回 promise
    */
    return new _Promise((resolve, reject) => {
      try {
        if (this.status === STATUS.FULLFILLED) {
          const result = onResolve(this.value);

          if (result instanceof _Promise) result.then(resolve, reject);
          else resolve(result);
        }

        if (this.status === STATUS.REJECT) {
          const result = onReject(this.value);

          if (result instanceof _Promise) result.then(resolve, reject);
          else reject(result);
        }

        if (this.status === STATUS.PENDING) {
          /**
           * PENDING 状态时需处理对应 callbacks
          */
          this.resolveCallbacks.push(val => {
            console.log('this.resolveCallbacks s push val = ', val);
            const result = onResolve(val);

            if (result instanceof _Promise) result.then(resolve, reject);
            else resolve(result);
          });

          this.rejectCallbacks.push(err => {
            console.log('this.rejectCallbacks s push err = ', err);
            const result = onReject(val);

            if (result instanceof _Promise) result.then(resolve, reject);
            else reject(result);
          });
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  catch = (onReject) => {
    return this.then(undefined, onReject);
  };

  finally = (cb) => {
    return this.then(value => {
      cb();
      return value;
    }, err => {
      cb();
      throw err;
    });
  };
};


new _Promise(resolve => {
  setTimeout(() => {
    resolve("hello world");
  }, 1000);
}).then(value => {
  console.log(value);
  return new _Promise(resolve => resolve(value + 1));
}).then(value => {
  console.log(value);
});