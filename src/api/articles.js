// 二次封装axios  此处的request相当于axios
import request from '@/utils/request'
// 删除文章
export function delArticle (id) {
  return request({
    url: `/articles/${id}`,
    method: 'delete'
  })
}
// 获取频道数据
export function getChannels () {
  return request({
    url: '/channels'
  })
}

// 获取文章
export function getArticles (params) {
  return request({
    url: '/articles',
    params
  })
}
