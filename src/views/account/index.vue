<template>
  <el-card>
    <!-- 面包屑 -->
      <bread-crumb slot='header'>
      <template slot="title">账户信息</template>
      </bread-crumb>
        <!-- <el-form ref="myForm" :model="formData" :rules="rules" label-width="100px"> -->
      <el-form :model="formData" :rules="rules" label-width="100px" ref="myForm" >
        <!-- 表单域 -->
        <el-form-item label="用户名" prop='name'>
          <el-input style="width:30%" v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input style="width:30%" v-model="formData.profile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input style="width:30%" v-model="formData.email"></el-input>

        </el-form-item>
        <el-form-item label="手机号">
          <!-- 手机号不可以更改 添加disabled属性 -->
          <el-input style="width:30%" disabled v-model='formData.mobile'></el-input>

        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="saveUser">保存</el-button>
        </el-form-item>
      </el-form>
      <!-- 头像 -->
      <el-upload action='' :http-request="uploadImg" :show-file-list="false" >
        <!-- 有头像显示头像，没有显示默认的图片 -->
      <img :src="formData.photo?formData.photo:defaultlImg" alt="" class='head-upload'>
      </el-upload>
  </el-card>
</template>

<script>
import eventBus from '@/utils/eventBus'
import { saveUser, uploadImg, getUserInfo } from '@/api/account'
export default {
  data () {
    return {
      formData: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      defaultlImg: require('../../assets/img/avatar.jpg'),
      rules: {
        name: [{ required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 1, max: 7, message: '用户名长度为1-7位', trigger: 'blur' }],
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]
      }
    }
  },
  methods: {
    // 保存用户
    async saveUser () {
      // 手动校验
      await this.$refs.myForm.validate()
      await saveUser(this.formData)
      try {
        this.$message.success('保存用户信息成功')
        eventBus.$emit('updateUser')
      } catch {
        this.$message.error('保存用户信息失败')
      }
    },
    // 编辑头像
    async uploadImg (params) {
      const data = new FormData()
      data.append('photo', params.file) // params.file为选择的地址
      const result = await uploadImg(data)
      this.formData.photo = result.data.photo
      eventBus.$emit('updateUser')
    },
    // 获取用户信息
    async getUserInfo () {
      const result = await getUserInfo()

      this.formData = result.data
    }
  },
  created () {
    // this.saveUser()
    this.getUserInfo()
  }
}
</script>

<style scoped>
.el-form{ margin-left:100px}
.head-upload{
  position:absolute;
  right:350px;
  top:160px;
  width: 200px;
  height: 200px;
  border-radius:50%
}
</style>
