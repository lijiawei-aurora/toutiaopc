import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'
import Login from '@/views/login'

import DefaultHome from '@/views/home/default_home'
// 简写形式，相当于 /src/views/home/index.vue
Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/home'

}, {
  path: '/home',
  // name: 'Home',
  // 当某个路由有子级路由的时候，这时候父级路由需要一个默认的路由，
  // 所以父级路由不能定义name属性 不然会有警告
  component: Home,
  children: [{
    path: '', // 为空 表示二级路由的默认组件
    component: DefaultHome // 二级路由默认组件
  }]
}, {
  path: '/login',
  name: 'Login',
  component: Login
}
  // {
  //   path: '/about',
  //   name: 'About',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
