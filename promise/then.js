const PENDING = 'PENDING'
const FULLFILLED = 'FULLFILLED'
const REJECTED = 'REJECTED'

class _Promise {
  constructor(executor) {
    //立即调用函数
    executor(this.resolve, this.reject)
  }
  //初始化状态
  status = PENDING
  //初始化成功之后的值
  success = undefined
  //初始化失败之后的值
  error = undefined
  //用于保存成功回调，成功回调的默认值需要改成数组，因为只有数组可以存储多个回调函数
  successCallback = []
  //用于保存失败回调，失败回调的默认值需要改成数组，因为只有数组可以存储多个回调函数
  failCallback = []
  resolve = (success) => {
    //如果状态不是等待 则阻止程序执行
    if (this.state !== PENDING) return
    this.state = FULLFILLED
    //保存成功之后的值
    this.success = success
    //如果有这个回调，那么要执行这个回调，并且把成功的值传递进去
    //this.successCallback && this.successCallback(this.success);
    //现在呢数组中存储了多个回调函数，所以遍历数组的每个函数并让其执行,上面的代码已经不符合要求
    //重新编写逻辑
    //这里使用while语句用successCallback.length作为循环条件，如果数组中有值，拿到数组中的第一个回调函数传值并执行
    while (this.successCallback.length) this.successCallback.shift()(this.success);
  }
  reject = (rejected) => {
    //如果状态不是等待 则阻止程序执行
    if (this.state !== PENDING) return
    //把promise状态改为失败
    this.state = REJECTED
    //保存失败之后的值
    this.error = rejected
    //如果有这个回调,那么要执行这个回调，并且把失败的原因传递进去   
    //this.failCallback && this.failCallback(this.error);
    //现在呢数组中存储了多个回调函数，所以遍历数组的每个函数并让其执行,上面的代码已经不符合要求
    //重新编写逻辑
    //这里使用while语句用failCallback.length作为循环条件，拿到数组中的第一个回调函数传值并执行
    while (this.failCallback.length) this.failCallback.shift()(this.error);
  }
  then(successCallback, failCallback) {
    //要实现then方法的链式调用必须创建一promise对象
    //新建一个promise对象
    return new _Promise((resolve, reject) => {
      //逻辑判断如果当前状态为成功 则执行成功的回调并且把保存成功的值传递进去
      if (this.status === FULFILLED) {
        //保存上一个函数的返回值
        let x = successCallback(this.success)
        //并且把返回值传递给下一个then方法
        resolve(x);
        //逻辑判断如果当前状态为成功 则执行失败的回调并且把失败的原因传递进去
      } else if (this.status === REJECTED) {
        failCallback(this.error)
      } else {
        //当前状态为等待，也就是promise状态为pending，
        //如果是等待的话那应该调用成功回调还是失败回调呢
        //那当然是两个回调都无法调用，应为不知道到底是成功了还是还是失败了
        //在这种情况下应该将成功回调和失败回调进行保存
        //保存成功回调函数
        //在这里有一个问题  this.successCallback一次只能存储一个函数这样的不符合要求
        //所以在上面定义successCallback的时候将其定义为数组，这样就可以存储多个回调 ，将回调push进去
        this.successCallback.push(successCallback);
        //保存失败回调函数
        this.failCallback.push(failCallback);
      }
    })
  }
}