const waitQueue = [];
let currSize = 0,
  maxSize = Infinity;

function ajax(url, params) {
  if (currSize >= maxSize) {
    waitQueue.push({ url, params });
    return;
  }

  // console.log('这部分进入了线程池');

  currSize += 1;
  // DO AJAX OPERATOR & return a Promise
};

const request = createRequest({ max: 3 });

for (let i = 0; i < 10; i++) {
  request(`/user${i}`, { cnt: i }).then(res => console.log(res));
}

/**
 * Please implement the function createRequest, which could subsequent specified request
*/

function createRequest({ max }) {
  maxSize = max;

  return ajax;
};

function doAdd(args) {
  ajax(...Object.values(args));
};

function removeItem() {
  if (waitQueue.length > 0) {
    doAdd(waitQueue.pop())
  } else {
    currSize--;
  }
}
