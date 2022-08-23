const STATUS = {
  PENDING: 'PENDING',
  RESOLVE: 'RESOLVE',
  REJECT: 'REJECT',
};

class MyPromise {
  constructor(executor) {
    this.resolveCallback = [];
    this.rejectCallback = [];
    this.status = STATUS.PENDING;
    this.value = undefined;

    try {
      executor(this.resolve);
    } catch (err) {
      throw new Error(err);
    }
  }

  static resolve = (p) => {
    if (p instanceof MyPromise) {
      return p.then();
    }
    if (p.then === undefined) {
      return new MyPromise((resolve, reject) => {
        resolve(p);
      });
    }
    return new MyPromise((resolve, reject) => {
      resolve(p).then();
    });
    if (this.status === STATUS.PENDING) {
      this.value = val;
      this.resolveCallback.forEach(_ => _(val));
      this.status = STATUS.RESOLVE;
    }
  };

  static reject = (err) => {
    if (this.status === STATUS.PENDING) {
      this.value = val;
      this.rejectCallback.forEach(_ => _(err));
      this.status = STATUS.REJECT;
    }
  };

  /*
  then = (onResolve, onReject) => {
    const successObserver = onResolve instanceof Function ? onResolve : val => val;
    const failObserver = onReject instanceof Function ? onReject : err => err;

    if (this.status === STATUS.RESOLVE) {
      successObserver(this.value);
    }

    if (this.status === STATUS.REJECT) {
      failObserver(this.value);
    }

    if (this.status === STATUS.PENDING) {
      this.resolveCallback.push(successObserver);
      this.rejectCallback.push(failObserver);
    }
  };
  */

  then = (successObserver, failObserver) => {
    const onResolve = successObserver instanceof Function ? successObserver : val => val;
    const onReject = failObserver instanceof Function ? failObserver : err => err;

    return new MyPromise((resolve, reject) => {
      try {
        if (this.status === STATUS.RESOLVE) {
          const result = onResolve(this.value)
          if (result instanceof MyPromise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        }

        if (this.status === STATUS.REJECT) {
          const result = onReject(this.value)
          if (result instanceof MyPromise) {
            result.then(resolve, reject);
          } else {
            reject(result);
          }
        }

        if (this.status === STATUS.PENDING) {
          this.resolveCallback.push(val => {
            const result = onResolve(val);
            if (result instanceof MyPromise) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          });
          this.rejectCallback.push(reason => {
            const result = onReject(reason);
            if (result instanceof MyPromise) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          });
        }
      } catch (err) {
        reject(err);
      }
    });
  };

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
}

new MyPromise(resolve => {
  setTimeout(() => {
    resolve("hello world");
  }, 1000);
}).then(value => {
  console.log(value);
  return new MyPromise(resolve => resolve(value + 1));
}).then(value => {
  console.log(value);
});