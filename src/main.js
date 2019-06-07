// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
// 引入element-tree-grid
import ElTreeGrid from 'element-tree-grid'
Vue.component(ElTreeGrid.name,ElTreeGrid)
//引入自己封装的axios插件
import myaxios from './assets/js/myaxios.js'
Vue.use(myaxios)
//自己封装的事件过滤器插件
import myMoment from './assets/js/myMoment.js'
Vue.use(myMoment)

//富文本框
import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
