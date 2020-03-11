import request from '@/utils/request'

// 该模块用于处理 素材请求
export function getMaterial (params) {
  return request({
    url: '/user/images',
    params, // params: params,
    data: ''
  })
}
