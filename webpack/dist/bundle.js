(function (graph) {
    function require (file) {
      function absRequire (relPath) {
        return require(graph[file].deps[relPath]);
      }
      var exports = {};
      (function (require, exports, code) {
        eval(code);
      })(absRequire, exports, graph[file].code)
      return exports;
    }
    require('./src/index.js')
  })({"./src/index.js":{"deps":{"./add.js":"./src/add.js"},"code":"\"use strict\";\n\nvar _add = _interopRequireDefault(require(\"./add.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nconsole.log(\"\\u55E8\\u5BB3\\u55E8 ! \".concat((0, _add[\"default\"])(2, 4)));"},"./src/add.js":{"deps":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = _default;\n\nfunction _default(a, b) {\n  return a + b;\n}\n\n;"}})