<template>
  <el-card class="articles">
      <bread-crumb slot="header">
    <template slot="title">内容列表</template>
      </bread-crumb>
      <el-form style="padding-left:50px">
          <el-form-item  label="文章状态">
              <!-- 单选按钮 -->
              <!-- <el-radio-group v-model="searchForm.status" @change="changeCondition"> -->
              <el-radio-group v-model="searchForm.status" >
                  <!-- :label 相当于忽略引号，此时1为数字 -->
                  <el-radio :label="5">全部</el-radio>
                  <el-radio  :label="0">草稿</el-radio>
                  <el-radio  :label="1">待审核</el-radio>
                  <el-radio  :label="2">审核通过</el-radio>
                  <el-radio  :label="3">审核失败</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="频道列表">
              <!-- 下拉列表 -->
              <el-select placeholder="请选择频道"    v-model="searchForm.channel_id">
              <!-- <el-select placeholder="请选择频道"  @change="changeCondition"  v-model="searchForm.channel_id"> -->
<!-- 下拉选项  label是显示值 value 是绑定的值 -->
<el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="日期范围">
              <!-- 日期范围选择组件 要设置type属性为daterange -->
              <el-date-picker type="daterange"   value-format='yyyy-MM-dd' v-model="searchForm.dateRange"></el-date-picker>
              <!-- <el-date-picker type="daterange"   @change="changeCondition" value-format='yyyy-MM-dd' v-model="searchForm.dateRange"></el-date-picker> -->
          </el-form-item>
    <!-- 文章主体结构 -->
      </el-form>
      <el-row type='flex' align="middle" class="total">
        <span>共找到{{this.page.total}}条符合条件的内容</span>
      </el-row>
   <!-- 列表内容 -->
     <!-- 此时的item.id 为bigNumber类型  这里的key只能是字符串或number类型-->
   <div class="article-item" v-for="item in list" :key="item.id.toString()">
       <div class="left">
           <!-- 若获取的数据有图片则显示获取到的，若没有则显示默认的图片
           此处的defaultImg是一个变量，这里不能直接使用一个地址 -->
           <img :src="item.cover.images.length>0?item.cover.images[0]:defaultImg" alt="">
           <div class="info">
               <span>{{item.title}}</span>
               <!-- 使用过滤器改变显示的格式  此时接收的是数字 -->
               <el-tag class="status" :type="item.status|filterType">{{item.status|filterStatus}}</el-tag>
               <span class="date">{{item.pubdate}}</span>
           </div>
       </div>
       <div class="right">
         <!-- 跳转到发布页面 -->
         <span  @click="$router.push(`/home/publish/${item.id.toString()}`)" style="cursor:pointer">  <i class="el-icon-edit"></i> 修改</span>
         <!-- 需传递要删除的id -->
         <span @click="delArticle(item.id.toString())" style="cursor:pointer"> <i class="el-icon-delete" ></i>删除</span>

       </div>
   </div>
   <el-row type="flex" justify="center" sytle="height:80px" align="middle">
     <!-- prev表示上一页，next为下一页，pager表示页码列表 -->
      <el-pagination
              :current-page="page.currentPage"
              :page-size="page.pageSize"
              :total="page.total"
               background  layout='prev,pager,next'
                @current-change="changePage">
             </el-pagination>
   </el-row>
  </el-card>
</template>

<script>
import { delArticle, getChannels, getArticles } from '@/api/articles'
export default {
  data () {
    return {
      searchForm: {
        status: 5, // 文章状态
        channel_id: null, // 表示没有任何的类型
        dateRange: [] // 日期范围
      },
      page: {
        currentPage: 1, // 当前页码
        pageSize: 10, // 接口要求每页 10-50条之间
        total: 0 // 总数
      },
      channels: [], // 接收频道数据
      list: [],
      defaultImg: require('../../assets/img/default.jpg')// 引入图片
    }
  },

  methods: {
    // 删除文章
    async  delArticle (id) {
      await this.$confirm('您是否确定删除此条数据', '提示')
      // 点击确定后进入
      await delArticle(id)
      try {
        // 删除成功后  重新加载数据 若直接调用 this.getArticles() 不传参数 会使当前的
        // 条件都失效了
        this.changeCondition()
      } catch {
        this.$message.error('删除文章失败')
      }
    },
    changePage (newPage) { // newPage 为当前点击的页码
      this.page.currentPage = newPage
      this.changeCondition()
    },
    // 获取频道数据
    async getChannels () {
      const result = await getChannels()
      this.channels = result.data.channels
    },

    async  getArticles (params) {
      const result = await getArticles(params)
      this.list = result.data.results// 获取文章列表
      this.page.total = result.data.total_count
    },
    changeCondition () {
      const params = {
      // 为5时表示全部，后端不需要接收参数
        page: this.page.currentPage, // 若条件改变就回到第一页,否则就是点击的那个页码
        per_page: this.page.pageSize,
        // 为全部时不用传值
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        channel_id: this.searchForm.channel_id,
        begin_pubdate: this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null,
        end_pubdate: this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null
      }
      this.getArticles(params)// 将当前选择的值传给获取文章方法
    }
  },
  created () {
    this.getChannels()
    this.getArticles()
    this.changeCondition()
  }, // 过滤器
  // 注意：局部注册过滤器为 filters
  filters: {
    filterStatus (value) {
      switch (value) {
        case 0:return '草稿'
        case 1:return '待审核'
        case 2:return '审核通过'
        case 3:return '审核失败'
      }
    }, // 根据当前状态的值显示不同的tag标签
    filterType (value) {
      switch (value) {
        case 0:return 'warning' // 草稿
        case 1:return 'info' // 待审核
        case 2:return '' // 审核通过
        case 3:return 'danger' // 审核失败
      }
    }
  },
  watch: {
    searchForm: { // searchForm为要监听的变量
      deep: true, // 固定写法，会深度检测searchForm中的数据变化
      // 固定写法， 数据发生变化就会触发更新
      handler () {
        this.changeCondition()
        this.page.currentPage = 1 // 若条件改变就回到第一页
      }
    }
  }
}
</script>

<style lang="less" scoped>
.articles{
    .total{
        height:60px;
        border-bottom:1px solid #ccc;
    }//文章列表样式
    .article-item{
        display:flex;
        justify-content: space-between; //两端对齐
        padding:20px 0;
        border-bottom:1px solid #ccc;
    .left{
        display:flex;
        img{
            width: 180px;
            height: 100px;
            border-radius:4px;
        }
        .info{
            display:flex;
            flex-direction: column; //垂直排放
            height:100px;
            justify-content: space-between;
            margin-left:10px;
            .date{
                color:#999;
                font-size:12px;
            }
            .status{
                width: 60px;
                text-align:center;
            }
        }
     .right{
         span{
             font-size:14px;
             margin-right:8px;
             user-select:none;
         }
     }
    }
    }
}

</style>
