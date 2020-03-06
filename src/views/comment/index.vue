<template>
<el-card v-loading="loading">
    <!-- 放置一个面包屑  slot=header 表示以下内容会作为具名插槽给card的hearder部分 -->
    <bread-crumb slot="header">
<template slot="title">评论管理</template>
    </bread-crumb>
    <!-- 表格 -->
    <el-table :data="list">
        <!-- 列  prop为显示的字段 label为表头 -->
        <el-table-column prop="title" label="标题" width="600"></el-table-column>
        <!-- 一个formatter属性 用来格式化内容 解决table中不显示布尔值的问题-->
        <el-table-column  :formatter="formatterBool"  prop="comment_status" label="评论状态"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column  prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column  label="操作">
          <!-- el-table-column组件在插槽中传出 row $index store column -->
           <!-- 文字按钮 size用于调字体大小 type将按钮设置为文字按钮 -->
        <template slot-scope="obj">
        <el-button type="text" size="small">修改</el-button>
        <!-- el-table 不显示布尔值，但提供了一个formatter属性 将布尔值转成其他值 -->
        <!-- 该按钮的内容要根据 当前行的评论状态来决定显示或隐藏 -->
        <el-button @click="openOrClose(obj.row)" type="text" size="small">{{obj.row.comment_status?'关闭':'打开'}}评论</el-button>
        </template>
        </el-table-column>

    </el-table>
    <!-- :total为总条数，根据该值来分页 -->
    <el-row style="height:80px" type="flex" align="middle" justify="center">
  <!-- 分页组件 current-page 当前页码 total 总数 page-size每页多少条-->
  <el-pagination background layout="prev,pager,next"
   :page-size="page.pageSize"
   :current-page="page.currentPage"
   :total="page.total"
   @current-change="changePage"></el-pagination>
</el-row>

</el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        total: 0, // 默认总条数
        currentPage: 1, // 默认页码
        pageSize: 10 // 每页的显示的条数
      }, // 放置分页参数
      loading: true // 控制loading遮罩层显示与隐藏
    }
  },
  methods: {
    // 页码改变事件 newPage 当前点击要切换的最新页码
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getComment() // 重新获取评论
    },
    getComment () {
      this.$axios({
        url: '/articles',
        params: { // 用于传get参数
          response_type: 'comment', // 控制获取参数的类型
          page: this.page.currentPage, // 请求的页数 不传也是1
          per_page: this.page.pageSize // 每页的页数

        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count // 将总数赋给total
        this.loading = false
      })
    },

    // formatterBool (row, column, cellValue, index) {
    //   //   row 行的数据   column 为列的信息
    //   // cellValue 为当前单元格的值   index 代表当前的索引
    //   return cellValue ? '正常' : '关闭'
    // },
    formatterBool (row, column, cellValue, index) {
      //  row 代表当前的一行数据
      // column 代表当前的列信息
      // cellValue 代表当前单元格的值
      // index 代表当前的索引
      // 该函数需要返回一个值 用来显示
      return cellValue ? '正常' : '关闭'
    },
    openOrClose (row) {
      // 根据状态调整提示信息
      const mess = row.comment_status ? '关闭' : '打开'
      // $confirm 也支持 promise 点击确定会进入到then 点击取消会进入到catch
      // 提示两个字是标题
      this.$confirm(`是否确定${mess}评论`, '提示').then(() => {
        // 调用打开或者关闭接口
        this.$axios({
          url: '/comments/status', // 请求地址
          method: 'put', // 请求类型
          // query参数
          params: {
            // id的数字太大会自动转换
            // 将BigNumber转为字符串
            article_id: row.id.toString() // 要更改状态的文章id
          },
          data: {
            //  body参数
            allow_comment: !row.comment_status // 是打开还是关闭  此状态和评论状态相反
          }
        }).then(() => {
          //   成功了 提示个消息 然后 重新拉取数据
          this.$message.success(`${mess}评论成功`)
          //  重新拉取数据
          this.getComment() // 调用重新拉取数据的方法
        }).catch(() => {
          //   失败 会进入到catch 显示打开或关闭失败
          this.$message.error(`${mess}评论失败`)
        })
      })
    }
  },
  // 页面初始化之后调用  获取数据
  created () {
    this.getComment()
  }
}

</script>

<style>

</style>
