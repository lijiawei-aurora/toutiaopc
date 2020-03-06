// 二次封装axios
// 配置拦截器及其他内容
import router from '@/router'
import axios from 'axios' // 将axios引入
// 配置axios的请求头地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 注册请求拦截器，两个参数为两个回调函数，成功执行第一个，失败执行第二个
axios.interceptors.request.use(function (config) {
//   // 成功时会传入一个config（所有axios的请求信息）
  const token = localStorage.getItem('user-token') // 从本地缓存中获取，并存入
  config.headers.Authorization = `Bearer ${token}`

  return config// 必须将该配置返回，该配置会作为请求参数进行请求
}, function (error) {
//   // 失败时会传入一个error
  return Promise.reject(error)
})
// 注册响应拦截器
axios.interceptors.response.use(function (response) {
  // response是响应体
  // 有些接口没有任何响应 所以进行判断 无响应体返回空对象
  // 将数据进行解构
  return response.data ? response.data : {}
}, function (error) {
  if (error.response.status === 401) {
    localStorage.removeItem('user-token')
    router.push('/login') // this.$router.push  这里是将router引入的
  }
  return Promise.reject(error)
})
export default axios // 导出  main.js 中引入
