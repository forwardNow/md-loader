import Vue from 'vue/dist/vue.esm';
import 'highlight.js/styles/atom-one-light.css';

import Demo from '../src/demo';
import mdFile from './mds/1.basic-tags.md';

Vue.use(Demo);

new Vue({
  render: (h) => h(mdFile),
  // template: '<div>xxxx <code-component0 /></div>',
  // components: {
  //   'code-component0': (function () {
  //     const $$options = {
  //       data() {
  //         return {
  //           person: {
  //             name: 'zhangsan',
  //             age: 18,
  //           },
  //         };
  //       },
  //     };
  //
  //     $$options.template = `<div>
  //       <div>
  //         {{ person.name }}
  //       </div>
  //     </div>`;
  //
  //     return $$options;
  //   }()),
  //
  // },
}).$mount('#app');
