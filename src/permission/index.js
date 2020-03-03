import router from '@/router'
// 注册全局前置守卫
// 回调函数在路由发生改变之前执行
// to即将进入的 路由
// from 正要离开的
// next 是必须执行的函数
router.beforeEach(function (to, from, next) {
  next()
  // 首先应该判断 你需要拦截哪些页面 如果页面的地址以 /home为开头, 就需要进行token的判断
  // 判断页面是不是以 /home为开头
  if (to.path.startsWith('/home')) {
    // 获取查看是否有token
    const token = window.localStorage.getItem('user-token')
    if (token) {
      next() // 放过
    } else {
      next('/login') // 回登录页
    }
  } else {
    //   如果我不是去主页相关
    next() // 直接放过
  }
})
