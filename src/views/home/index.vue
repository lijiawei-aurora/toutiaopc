<template>
<!-- 外层容器 -->
  <el-container>
    <el-aside style="width:260px">
      <!-- 左侧导航区域 -->
      <layout-aside></layout-aside>
    </el-aside>
    <el-container>
    <el-header>
      <!--顶部操作栏 -->
      <layout-header></layout-header>
    </el-header>
    <el-main>
      <!-- 主要区域 -->
       <!-- 二级路由容器 -->
    <router-view></router-view>
    </el-main>

    </el-container>
  </el-container>
</template>

<script>

export default {

}
</script>

<style>

</style>
