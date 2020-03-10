<template>
  <el-tabs v-model="activeName">
      <el-tab-pane label="素材库" name="material">
          <div class="select-image-list" >
              <el-card v-for="item in list" :key="item.id" class="image-card" >
              <img :src="item.url" alt="" @click="selectImg(item.url)">
              </el-card>
          </div>
          <el-row type="flex" justify="center" style="height:80px" align="middle"></el-row>
                <el-pagination :page-size="page.pageSize" :total="page.total" :current-page="page.currentPage"
                background layout="prev,pager,next" @current-change="changePage"></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="上传素材" name="upload">
            <!-- :show-file-list是否显示上传列表 默认为TRUE -->
          <el-upload action='' class="upload-img" :http-request="uploadImg"  :show-file-list="false">
              <!-- 上传组件 -->
                    <i class="el-icon-plus"></i>
          </el-upload>
      </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material', // 当前激活的变量
      list: [], // 素材列表
      page: {
        currentPage: 1,
        pageSize: 8,
        total: 0
      }
    }
  },
  methods: {
    getMaterial () {
      this.$axios({
        url: 'user/images',
        params: {
          collect: false, // 查询全部素材
          page: this.page.currentPage,
          per_page: this.page.pageSize // 每页条数
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    },
    // 切换页码时触发
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    // 点击图片时触发
    selectImg (url) {
      // 需将url传给上层组件
    // 自定义事件
      alert(url)
      this.$emit('selectImg', url)
    },
    uploadImg (params) {
      // params.file为要上传的图片文件
      const data = new FormData() // 实例化一个formData对象

      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post', // 上传或新增一般为该类型
        data// data:data  因为同名，所以省略
      }).then(result => {
        this.selectImg(result.data.url)// 上传成功，重新获取数据
      }).catch(() => {
        this.$message.error('上传素材失败')
      })
    }
  },
  created () {
    this.getMaterial()
  }

}
</script>

<style lang="less" scoped>
//弹出层的样式
.select-image-list{
    display: flex;
    flex-wrap:wrap;
    .image-card{
        width: 150px;
        height: 150px;
        margin:20px 10px;
        img{
            width: 100%;
            height: 100%;
        }
    }

}
.upload-img{
    display: flex;
    justify-content: center;
    i{
        font-size:20px;
        padding:50px;
        border:2px solid #ccc;
            }

}
</style>
