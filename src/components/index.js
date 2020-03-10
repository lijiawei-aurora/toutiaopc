// 公共的注册文件 用于全局注册所有的组件 使用Vue.use 方法
import LayoutHeader from './home/layout-header'
import LayoutAside from './home/layout-aside'
import BreadCrumb from './common/bread-crumb'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import CoverImage from './publish/cover-image'
import SelectImage from './publish/select-image'
export default {
  install: function (Vue) {
    // 全局注册
    Vue.component('layout-header', LayoutHeader)
    Vue.component('layout-aside', LayoutAside)
    Vue.component('bread-crumb', BreadCrumb)
    Vue.component('cover-image', CoverImage)
    Vue.component('select-image', SelectImage)
    // 注册富文本编辑器
    Vue.use(VueQuillEditor)
  }
}
