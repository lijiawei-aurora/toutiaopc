// 二次封装axios  此处的request相当于axios
import request from '@/utils/request'

// 该模块用于处理 素材请求
// 获取素材
export function getMaterial (params) {
  return request({
    url: '/user/images',
    params, // params: params,
    data: ''
  })
}
// 上传图片
export function uploadImg (data) {
  return request({
    url: '/user/images',
    method: 'post', // 上传或新增一般为该类型
    data// data:data  因为同名，所以省略
  })
}
// 收藏或取消收藏
export function collectOrCancel (row) {
  return request({
    url: `/user/images/${row.id}`, // row.id为所传的参数
    method: 'put',
    data: {
      collect: !row.is_collected // row.is_collected 若收藏了结果为TRUE 否则为false
    }
  })
}
// 删除素材
export function deleteMaterial (row) {
  return request({
    url: `/user/images/${row.id}`,
    method: 'delete'
  })
}
