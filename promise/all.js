//  假设我们已经实现了_Promise
_Promise.prototype.all = (promiseList) => {
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
}