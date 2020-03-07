<template>
  <el-card class="articles">
      <bread-crumb slot="header">
    <template slot="title">内容列表</template>
      </bread-crumb>
      <el-form style="padding-left:50px">
          <el-form-item  label="文章状态">
              <!-- 单选按钮 -->
              <el-radio-group v-model="searchForm.status">
                  <!-- :label 相当于忽略引号，此时1为数字 -->
                  <el-radio :label="5">全部</el-radio>
                  <el-radio  :label="1">草稿</el-radio>
                  <el-radio  :label="2">待审核</el-radio>
                  <el-radio  :label="3">审核通过</el-radio>
                  <el-radio  :label="4">审核失败</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="频道列表">
              <!-- 下拉列表 -->
              <el-select placeholder="请选择频道"  v-model="searchForm.channel_id">
<!-- 下拉选项  label是显示值 value 是绑定的值 -->
<el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="日期范围">
              <!-- 日期范围选择组件 要设置type属性为daterange -->
              <el-date-picker type="daterange" v-model="searchForm.dateRange"></el-date-picker>
          </el-form-item>
    <!-- 文章主体结构 -->
      </el-form>
      <el-row type='flex' align="middle" class="total">
        <span>共找到1000条符合条件的内容</span>
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
         <span>  <i class="el-icon-edit"></i> 修改</span>
         <span> <i class="el-icon-delete"></i>删除</span>

       </div>
   </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        stauts: 5, // 文章状态
        channel_id: null, // 表示没有任何的类型
        dateRange: [] // 日期范围
      },
      channels: [], // 接收频道数据
      list: [],
      defaultImg: require('../../assets/img/default.jpg')
    }
  },

  methods: {
    // 获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },

    getArticles () {
      this.$axios({
        url: '/articles'
      }).then(result => {
        this.list = result.data.results// 获取文章列表
      })
    }
  },
  created () {
    this.getChannels()
    this.getArticles()
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
