import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'
import Login from '@/views/login'
import DefaultHome from '@/views/home/default_home'

// 简写形式，相当于 /src/views/home/index.vue
Vue.use(VueRouter)

const routes = [{ // 404页面  找不到路径的页面均显示这个
  path: '*', // 匹配任何找不到组件的路由
  component: () => import('@/views/404')
},
{
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
  },
  { // 评论管理
    path: 'comment', // 不加/ 为拼接路由  /home/comment
    // 按需加载 只加载一次
    component: () => import('@/views/comment')

  }, { // 素材管理
    path: 'material',
    component: () => import('@/views/material')
  },
  { // 内容列表
    path: 'articles',
    component: () => import('@/views/articles')
  },
  { // 发布文章
    path: 'publish/:articleId?', // 此时可以传参也可以不传参 动态路由传参
    component: () => import('@/views/publish')
  }, { // 用户信息
    path: 'account',
    component: () => import('@/views/account')
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
