import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入模块
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import '@/styles/index.less'
import axios from 'axios'
Vue.config.productionTip = false

Vue.use(ElementUI) // 全局注册element-ui 一旦注册所有位置都可以使用
// Vue.use实际上会调用ElementUI对象里的一个install 方法，并且传入当前的Vue对象
// 配置axios的请求头地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
Vue.prototype.$axios = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
