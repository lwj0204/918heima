import Vue from 'vue'
import App from './App.vue'
import router from './permission'
import ElementUI from 'element-ui'
import Component from './components/index.js' // 引入插件对象
import axios from './utils/axios.config'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less'

Vue.config.productionTip = false
Vue.use(ElementUI) // 相当于全局注册
Vue.use(Component)
Vue.use(axios)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
