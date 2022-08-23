import Vue from './vue.js';

console.log(Vue);

const vm = new Vue({
  el: '#app',
  data: {
    name: 'fatewang',
    more: {
      like: 'sleep',
    }
  },
});
console.log(vm);
