<template>
<!-- 大容器 -->
  <el-container>
    <el-aside>
      <h1>左侧导航区域</h1>
    </el-aside>
    <el-container>
    <el-header>
      <h1>顶部操作栏</h1>
    </el-header>
    <el-main>
      <h1>主要区域</h1>
    </el-main>
     <!-- 二级路由容器 -->
    <router-view></router-view>
    </el-container>
  </el-container>
</template>

<script>
export default {}
</script>

<style>
</style>
