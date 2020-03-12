import request from '@/utils/request.js'
// 用户信息相关的接口
// 保存用户
export function saveUser (data) {
  return request({
    url: 'user/profile',
    method: 'patch', // 类型
    data
  })
}
// 编辑头像
export function uploadImg (data) {
  return request({
    url: '/user/photo',
    method: 'patch',
    data // 要传递的参数
  })
}
// 获取用户信息
export function getUserInfo () {
  return request({
    url: '/user/profile'
  })
}
