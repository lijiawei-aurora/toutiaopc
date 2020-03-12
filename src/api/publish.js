// 发布文章相关接口
import request from '@/utils/request'

export function publish (articleId, status, data) { // 发布修改草稿/正式文章
  return request({
    url: articleId ? `/articles/${articleId}` : '/articles',
    method: articleId ? 'put' : 'post', // 新增数据用post 修改用put
    params: { draft: status }, // 是否存为草稿  false为不是草稿
    data// data中定义的参数
  })
}
export function getChannels () {
  return request({
    url: '/channels'
  })
}
export function getArticleById (id) {
  return request({
    url: `/articles/${id}`
  })
}
