<template>
  <el-card>
      <bread-crumb slot="header">
       <template slot="title">发布文章</template>
      </bread-crumb>
      <!-- label-width 可设置标题宽度 -->
      <el-form ref="myForm" :rules="publishRules" :model="publishForm" style="margin-left:50px" label-width="100px">
          <!-- prop为需要校验的字段名 v-model为数据绑定 -->
          <el-form-item label="标题" prop="title">
              <el-input v-model="publishForm.title" placeholder="请输入您的标题" style="width:60%"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
              <!-- <el-input  v-model="publishForm.content" placeholder="请输入您的标题" type="textarea" :rows="4"></el-input> -->
              <!-- 富文本编辑器 -->
              <quill-editor  v-model="publishForm.content" style="height:300px" ></quill-editor>
          </el-form-item>
          <el-form-item label="封面" prop="cover" style="margin-top:100px">
              <el-radio-group v-model="publishForm.cover.type" @change="changType">
                  <!-- :label中存的是后台的数据 -->
                  <el-radio :label="1">单图</el-radio>
                  <el-radio :label="3">三图</el-radio>
                  <el-radio :label="0">无图</el-radio>
                  <el-radio :label="-1">自动</el-radio>
              </el-radio-group>
          </el-form-item>
          <!-- 放置封面组件 -->
          <cover-image :list="publishForm.cover.images" @changeImg="changeImg"></cover-image>
          <el-form-item label="频道" prop="channel_id">
              <el-select placeholder="请选择频道" v-model="publishForm.channel_id">
                  <!-- 下拉选项 :label为分组的名称，显示的  value选项的值-->
                  <el-option v-for="item in channels" :key="item.id"
                  :label="item.name" :value="item.id">{{item.name}}</el-option>
              </el-select>
          </el-form-item>
          <el-form-item >
              <el-button type='primary' @click="publish('false')">发表文章</el-button>
              <el-button @click="publish('true')">存入草稿</el-button>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
import { publish, getChannels, getArticleById } from '@/api/publish'
export default {

  data () {
    return {
      channels: [], // 接收频道数据
      // 表单数据
      publishForm: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // -1自动  0无图 1单图 3三图
          images: []// 字符串数组，  对应type  3为三个图
        },
        channel_id: null// 频道id

      },
      // 表单校验规则  通过prop绑定  trigger:"blur" 离开焦点进行校验
      //   min/max  校验字符串最大或最小长度  校验数字最大或最小值
      publishRules: {
        title: [{ required: true, message: '请输入您的文章标题', trigger: 'blur' },
          { min: 5, max: 30, message: '文章标题应在5-30字符之间', trigger: 'blur' }],
        content: [{ required: true, message: '请输入您的文章内容' }],
        cover: [{ required: true, message: '请选择您的封面' }],
        channel_id: [{ required: true, message: '请选择您的频道' }]

      }
    }
  },
  watch: {
    // 捕捉路由参数的变化
    // watch监听data中的数据变化
    $route: function (to, from) {
    // 监听$route的变化
    // to为新路由地址对象，from为旧的路由地址对象
      if (to.params.articleId) {
        this.getArticleById(to.params.articleId)
      } else {
        this.publishForm = {
          title: '', // 文章标题
          content: '', // 文章内容
          cover: {
            type: 0, // -1自动  0无图 1单图 3三图
            images: []// 字符串数组，  对应type  3为三个
          },
          channel_id: null// 频道id
        }
      }
    }
  },
  methods: {
    // 根据type的改变对images进行控制
    changType () {
      if (this.publishForm.cover.type === 1) {
        this.publishForm.cover.images = ['']
      } else if (this.publishForm.cover.type === 3) {
        this.publishForm.cover.images = ['', '', '']
      } else {
        this.publishForm.cover.images = []
      }
    },
    // 接收子组件cover-image传递的变量
    changeImg (url, index) {
      // splice替换  索引 替换的个数，替换的内容
      this.publishForm.cover.images.splice(index, 1, url)
    },
    //   传入的status表示是否为草稿
    async publish (status) { // 发布修改草稿/正式文章
      //   this.$refs.myform.validate(isOk => {  //方法一
      //     if (isOk) {

      //     } else {}
      //   })
      // 方法二
      // 手动校验表单 调用validate()方法
      await this.$refs.myForm.validate()
      const { articleId } = this.$route.params // id不为空就是修改，为空就是添加
      await publish(articleId, status, this.publishForm)
      try {
        this.$message.success('操作成功')
        this.$router.push('/home/articles') // 跳转到文章列表
      } catch {
        this.$message.error('操作失败')
      }
    },
    async  getChannels () {
      const result = await getChannels()
      this.channels = result.data.channels // 将频道数据赋值给本地
    },
    // 根据id获取文章详情数据
    async  getArticleById (id) {
      const result = await getArticleById(id)
      // this.title = result.data.title
      // this.channel_id = result.data.channel_id
      // this.content = result.data.content
      this.publishForm = result.data// 将数据赋值给表单数据
    }
  },
  //   判断路径是否有文章id
  created () {
    this.getChannels()// 获取频道数据
    const { articleId } = this.$route.params// 解构赋值
    // articleId && this.getArticleById(articlcvheId)  效果同下 前面为true 执行后面的
    if (articleId) {
      this.getArticleById(articleId)
    }
  }
}
</script>

<style>

</style>
