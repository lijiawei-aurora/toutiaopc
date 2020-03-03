// 公共的注册文件 用于全局注册所有的组件 使用Vue.use 方法
import LayoutHeader from './home/layout-header'
import LayoutAside from './home/layout-aside'
export default {
  install: function (Vue) {
    Vue.component('layout-header', LayoutHeader)
    Vue.component('layout-aside', LayoutAside)
  }
}
