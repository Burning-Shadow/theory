// import { str } from './modelA.js';

// console.log(`Hi Vite , ${str}`);

import { createApp, h } from 'vue'; // 浏览器无 commonJS 标准支持【该方案为后端标准】，故浏览器无法识别其位置
import App from './App.vue';
import './index.css';

// const App = {
//   render() {
//     return h('div', null, [h('div', null, String('义！乌！'))]);
//   }
// };

createApp(App).mount('#app');