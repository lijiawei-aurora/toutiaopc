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
                    <el-card v-for="(item,index) in list" :key="item.id" class='img-card'>
                      <!-- 点击图片 将对话框的dialogVisible设为true就可以弹出 -->
                        <img :src="item.url" alt="" @click="selectImg(index)">
                        <el-row class="operate" type='flex' align="middle" justify="space-around">
                            <!-- 收藏按钮 -->
                            <i class='el-icon-star-on' @click="collectOrCancel(item)" :style="{color:item.is_collected ? 'red' : 'black'}"></i>
                            <!-- 删除按钮 -->
                            <i class='el-icon-delete-solid' @click="deleteMaterial(item)"></i>
                        </el-row>
                    </el-card>
                </div>
            </el-tab-pane>
            <el-tab-pane label='收藏素材' name='collect'>
                 <div class='img-list'>
                    <!-- 必须有key -->
                    <el-card v-for="(item,index) in list" :key="item.id" class='img-card'>
                        <img :src="item.url" alt="" @click="selectImg(index)">
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
        <!-- 通过visible属性true或false控制显示与隐藏 -->
        <!-- el-dialog 组件是懒加载的  -->
        <el-dialog :visible='dialogVisible' @close="dialogVisible=false" @opened="openEnd">
          <!-- 走马灯组件 -->
          <el-carousel indicator-position="outside" height="400px" ref="myCarousel">
              <!-- 大图预览当前页的所有图片 幻灯片 -->
              <el-carousel-item v-for="item in list" :key=item.id >
                <img :src="item.url" alt="" style="width:100%;height:100%">
              </el-carousel-item>
          </el-carousel>
        </el-dialog>
  </el-card>
</template>

<script>
import { getMaterial, uploadImg, collectOrCancel, deleteMaterial } from '@/api/material'

export default {
  data () {
    return {
      activeName: 'all',
      list: [], // 接收全部素材的数据
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 8 // 每页条数

      },
      dialogVisible: false,
      imgIndex: -1 // 当前点击的图片的索引
    }
  },
  methods: {
    //   上传图片组件的方法
    async uploadImg (params) {
      // params.file为要上传的图片文件
      const data = new FormData() // 实例化一个formData对象
      data.append('image', params.file)
      await uploadImg(data)
      try {
        this.getMaterial() // 上传成功，重新获取数据
      } catch {
        this.$message.error('上传素材失败')
      }
    },
    // 获取素材
    async getMaterial () {
      // 此处的getMaterial为接口中的
      const result = await getMaterial({
        collect: this.activeName === 'collect', // 为false中获取全部，为true是获取收藏
        page: this.page.currentPage, // 页码
        per_page: this.page.pageSize
      })// 每页条数
      // 将返回结果赋给list
      this.list = result.data.results
      this.page.total = result.data.total_count // 全部/收藏素材总数
    },
    // getMaterial () {
    //   this.$axios({
    //     url: '/user/images',
    //     params: {
    //       // 若this.activeName===collect 表示点击的为收藏，结果就为true
    //       collect: this.activeName === 'collect', // 为false中获取全部，为true是获取收藏
    //       page: this.page.currentPage, // 页码
    //       per_page: this.page.pageSize // 每页条数
    //     },
    //     data: {}
    //   }).then(result => {
    //     // 将返回结果赋给list
    //     this.list = result.data.results
    //     this.page.total = result.data.total_count // 全部/收藏素材总数
    //   })
    // },

    // 收藏或取消收藏
    async  collectOrCancel (row) {
      await collectOrCancel(row)
      try {
        this.getMaterial()
      } catch {
        this.$message.error('操作失败')
      }
    },
    // 删除素材
    async deleteMaterial (row) {
      await this.$confirm('您确定要删除图片吗', '提示')
      // 用户单击确定后进入此
      await deleteMaterial(row)
      try {
        this.getMaterial()
      } catch {
        this.$message.error('删除失败')
      }
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
    },
    openEnd () {
      // 打开结束
      this.$refs.myCarousel.setActiveItem(this.imgIndex)
    },
    // 点击图片时调用该方法
    selectImg (index) {
      this.imgIndex = index
      this.dialogVisible = true
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

        }}

}
</style>
