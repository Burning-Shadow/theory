class Commitment {
  static PENDING = '待定';
  static FULFILLED = '成功';
  static REJECTED = '拒绝';

  constructor(func) {
    this.status = Commitment.PENDING;
    this.result = null;

    try {
      func(this.resolve.bind(this), this.reject.bind(this));
    } catch (err) {
      this.reject(err);
    }
  }

  resolve(result) {
    if (this.status === Commitment.PENDING) {
      this.status = Commitment.FULFILLED;
      this.result = result;
    }
  }
  reject(reason) {
    if (this.status === Commitment.PENDING) {
      this.status = Commitment.REJECTED;
      this.result = reason;
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : () => {};
    onRejected = typeof onRejected === 'function' ? onRejected : () => {};

    if (this.status === Commitment.FULFILLED) {
      setTimeout(() => {
        onFulfilled(this.result);
      });
    }

    if (this.status === Commitment.REJECTED) {
      setTimeout(() => {
        onRejected(this.result);
      });
    }
  }
};

const commitment = new Commitment((resolve, reject) => {
  resolve('嗨嗨嗨');
});

commitment.then(
  resolve => {
    console.log(result)
  },
  reject => {
    console.log(result.message)
  },
)