<!-- <script src="./src/index.js"></script> -->
<script>
  // 
  /**
   * bundle.js
   * 
   * 1. 收集依赖
   * 2. ES6 转 ES5
   * 3. 替换 require & exports
   * 4. 提供入口
  */
  (function (list) {
    function require(file) {
      var exports = {};
      (function (exports, code) {
        eval(code);
      })(exports, list[file]);
      return exports;
    }
    // 入口
    require('index.js');
  })({
    'add.js': 'exports.default = function (a, b) { return a + b };',
    'index.js': `
      var add = require('add.js').default;
      console.log(add(2, 4));
    `,
  });
</script>