<template>
  <el-card>
      <!-- 将 面包屑给到卡片的具名header -->
        <bread-crumb slot="header">
    <template slot="title">素材管理</template>
        </bread-crumb>
        <!-- 上传组件  必须有action属性-->
        <!-- :show-file-list是否显示上传列表 默认为TRUE -->
        <el-row type='flex' justify="end">
            <!-- 上传行为  :http-request 自定义上传的实现-->
        <el-upload   action='' :http-request="uploadImg"  :show-file-list="false">
            <el-button size='small' type='primary'>上传素材</el-button>
        </el-upload>
        </el-row>
        <!-- 标签页 -->
        <!-- v-model 绑定的是当前所激活的页签 单击哪个activeName就是哪个的name -->
        <el-tabs v-model='activeName' @tab-click="changeTab">
            <!-- 标签 label为显示的标签名 name是选中的页签的值-->
            <el-tab-pane label='全部素材' name="all">
            <!-- 循环生成页面结构 -->
                <div class='img-list'>
                    <!-- 必须有key -->
                    <el-card v-for="item in list" :key="item.id" class='img-card'>
                        <img :src="item.url" alt="">
                        <el-row class="operate" type='flex' align="middle" justify="space-around">
                            <!-- 收藏按钮 -->
                            <i class='el-icon-star-on'></i>
                            <!-- 删除按钮 -->
                            <i class='el-icon-delete-solid'></i>
                        </el-row>
                    </el-card>
                </div>
            </el-tab-pane>
            <el-tab-pane label='收藏素材' name='collect'>
                 <div class='img-list'>
                    <!-- 必须有key -->
                    <el-card v-for="item in list" :key="item.id" class='img-card'>
                        <img :src="item.url" alt="">
                    </el-card>
                </div>
            </el-tab-pane>
        </el-tabs>
        <!-- 公共的分页组件 -->
        <el-row type="flex" justify="center" style="height:80px" align="middle">
            <el-pagination background :page-size="page.pageSize"
            :total="page.total"
            :current-page="page.currentPage"
            layout="prev,pager,next"
            @current-change="changePage"
            ></el-pagination>
        </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [], // 接收全部素材的数据
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 8 // 每页条数
      }
    }
  },
  methods: {
    //   上传图片组件的方法
    uploadImg (params) {
      // params.file为要上传的图片文件
      const data = new FormData() // 实例化一个formData对象

      data.append('image', params.file)
      debugger
      this.$axios({
        url: '/user/images',
        method: 'post', // 上传或新增一般为该类型
        data// data:data  因为同名，所以省略
      }).then(() => {
        this.getMaterial() // 上传成功，重新获取数据
      }).catch(() => {
        this.$message.error('上传素材失败')
      })
    },
    // 定义一个上传组件的方法
    // uploadImg (params) {
    //   //  params.file 就是需要上传的图片文件
    //   // 接口参数类型要求是 formData
    //   const data = new FormData() // 实例化一个formData对象
    //   debugger
    //   data.append('image', params.file) // 加入文件参数

    //   // 开始发送上传请求了
    //   this.$axios({
    //     url: '/user/images', // 请求地址
    //     method: 'post', // 上传或者新增一般都是post类型
    //     data // es6简写
    //   }).then(() => {
    //     // 如果成功了 我们应该 重新来取数据啊
    //     this.getMaterial()
    //   }).catch(() => {
    //     this.$message.error('上传素材失败')
    //   })
    // },
    //   获取素材数据
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          // 若this.activeName===collect 表示点击的为收藏，结果就为true
          collect: this.activeName === 'collect', // 为false中获取全部，为true是获取收藏
          page: this.page.currentPage, // 页码
          per_page: this.page.pageSize // 每页条数
        },
        data: {}
      }).then(result => {
        // 将返回结果赋给list
        this.list = result.data.results
        this.page.total = result.data.total_count // 全部/收藏素材总数
      })
    },
    // 切换页签 时触发该方法
    changeTab () {
      this.page.currentPage = 1 // 将当前页码切换成第一页
      this.getMaterial()
    },
    // newPage为当前点击的页码
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    }
  },
  created () {
    this.getMaterial()
  }

}
</script>

<style lang="less" scoped>
// 每一句都必须加分号，不然会报错
.img-list{
    display: flex;
    flex-wrap: wrap;
    justify-content:center;
    .img-card{
        width:220px;
        height:240px;
        margin:20px 30px;
        position:relative;
        img{
            width:100%;
            height:100%;
        }
        .operate{
            position:absolute;
            bottom:0;
            left:0;
            width:100%;
            background: #f4f5f6;
            height: 30px;
            i{
                font-size:20px;
            }
            .el-icon-star-on{
                color:orangered
            }
        }}

}
</style>
