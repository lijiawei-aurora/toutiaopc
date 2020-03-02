<template>
  <div class="login">
     <!-- 表单内容 -->
    <el-card class='login-card'>
      <!-- 放置标题图片 -->
      <div class='title'>
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
       <!-- 表单容器   绑定表单数据和表单验证规则-->
     <el-form ref="loginForm" :model="loginForm" :rules="loginRules" style="margin-top:20px">
        <!-- 表单域 里面   放置 input/select/checkbox 相当于一行-->
          <!-- 表单域   prop属性绑定的是要校验的字段名-->
        <el-form-item prop="mobile">
            <!-- v-model 实现双向绑定 -->
           <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 表单域 -->
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" style="width:65%" placeholder="验证码"></el-input>
            <el-button style="float:right" plain>发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="checked">
          <!-- 复选框 -->
          <el-checkbox  v-model="loginForm.checked"> 我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" style="width:100%" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 登录表单的数据
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        checked: false // 是否同意用户协议
      },
      // 定义表单的验证规则  rules为自定义的名字
      // rules:{
      //   "字段名"：[规则1，规则2.。。。。。。]  一个字段有多个规则，会从第一个开始校验，不通过则不对后面的进行校验
      // }  required只能校验是否为空，不能判断true或false
      // pattern 正则验证内容是否符合格式  ^1 表示以1开头
      // message 不满足规则时的提示信息
      loginRules: {
        // required 如果为true表示该字段必填
        mobile: [{ required: true, message: '您的手机号不能为空' },
          { pattern: /^1[3-9]\d{9}$/, message: '您的手机号格式不正确' }],
        code: [{ required: true, message: '验证码不能为空' }, { pattern: /^\d{6}$/, message: '您输入的验证码少于六位' }],

        // 自定义校验  rule 是校验规则 value是当前要校验的字段
        // 根据value值来判断是否执行成功
        // callback是一个回调函数 不论成功或失败多执行
        // 成功执行callback  失败执行callback(new Error('错误信息'))
        checked: [{
          validator: function (rule, value, callback) {
            value ? callback() : callback(new Error('请阅读用户须知并同意'))
          }
        }]
      }
    }
  },
  methods: {
    login () {
      //    this.$refs.loginForm 获取的就是el-form的对象实例
      // 第一种 回调函数 isOK, fields(没有校验通过的字段)
      // this.$refs.loginForm.validate(function (isOK) {
      //   if (isOK) {
      //     console.log('校验通过')
      //   } else {
      //     console.log('校验未通过')
      //   }
      // }) // 方法
      // 第二种方式 promise
      // 方法二
      this.$refs.loginForm.validate().then(() => {
        // 若验证成功会跳转到then
        // console.log('123')
        this.$axios({
          url: '/authorizations', // 请求地址
          data: this.loginForm, // 请求体
          method: 'post'
        }).then(result => {
          // console.log(result.data.data.token)
          // 放到前端的缓存中
          window.localStorage.setItem('user-token', result.data.data.token)

          this.$router.push('/home')

          // window.localStorage.setItem('user-token', result.data.data.token)
          // 编程式导航
          // this.$router.push('/') // 登录成功 跳转到home页
        }).catch(() => {
          this.$message({
            message: '手机号或者验证码错误',
            type: 'warning'
          })
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
//添加scoped 表示样式只对当前组件有效
// 在style标签中加 lang=less 就可以使用less
.login {
  background-image: url("../../assets/img/login_bg.jpg");
  height: 100vh;
  background-size: cover; //自适应
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 440px;
    height: 340px;
    .title {
      text-align: center;
      img {
        height: 30px;
      }
    }
    .content {
      margin-top: 20px;
    }
  }
}
</style>
