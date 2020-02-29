<template>
  <div class="login">
    <!-- 表单内容 -->
    <el-card class="login-card">
      <div class="title">
        <img src="../../assets/img/logo_index.jpg" alt />
      </div>
      <!-- 表单容器 -->
      <el-form class="content">
        <!-- 表单域 -->
        <el-form-item>
          <el-input placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input style="width:60%" placeholder="请输入验证码"></el-input>
          <el-button plain style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox>我已阅读同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
//添加scoped 表示样式只对当前组件有效
// 在style标签中加 lang=less 就可以使用less
.login {
  background-image: url('../../assets/img/login_bg.jpg');
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
