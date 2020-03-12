// 文章相关的接口
import request from '@/utils/request.js'
// 获取文章
export function getComment (params) {
  return request({
    url: '/articles',
    params
  })
}
// 打开或者关闭评论
export function openOrClose (row) {
  return request({
    url: '/comments/status', // 请求地址
    method: 'put', // 请求类型
    // query参数
    params: { article_id: row.id.toString() }, // 要更改状态的文章id
    data: {
      //  body参数
      allow_comment: !row.comment_status // 是打开还是关闭  此状态和评论状态相反
    }
  })
}
