class MyPromise {
  static PENDING = "PENDING";
  static FULFILLED = "FULFILLED";
  static REJECTED = "REJECTED";

  constructor(fun) {
    this.status = MyPromise.PENDING;
    this.result = null;
    this.error = null;
    this.onFulfilledList = [];
    this.onRejectedList = [];

    try {
      fun(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  resolve(res) {
    this.result = res;
    this.status = MyPromise.FULFILLED;
    this.onFulfilledList.forEach((cb) => {
      cb();
    });
  }

  reject(err) {
    this.error = err;
    this.status = MyPromise.REJECTED;
    this.onRejectedList.forEach((cb) => {
      cb();
    });
  }

  then(onFulfilled, onRejected) {
    const thenPromise = new MyPromise((resolve, reject) => {
      if (this.status === MyPromise.FULFILLED) {
        setTimeout(() => {
          if (typeof onFulfilled !== "function") {
            resolve(this.result);
          } else {
            onFulfilled(this.result);
          }
        });
      }

      if (this.status === MyPromise.REJECTED) {
        setTimeout(() => {
          if (typeof onRejected !== "function") {
            reject(this.result);
          } else {
            onRejected(this.result);
          }
        });
      }

      if (this.status === MyPromise.PENDING) {
        setTimeout(() => {
          this.onFulfilledList.push(() => {
            if (typeof onFulfilled !== "function") {
              resolve(this.result);
            } else {
              onFulfilled(this.result);
            }
          });

          this.onRejectedList.push(() => {
            if (typeof onRejected !== "function") {
              reject(this.result);
            } else {
              onRejected(this.result);
            }
          });
        });
      }
    });

    return thenPromise;
  }

  static resolve(data) {
    return new MyPromise((resolve) => resolve(data));
  }

  static reject(err) {
    return new MyPromise((resolve, reject) => reject(err));
  }
}
