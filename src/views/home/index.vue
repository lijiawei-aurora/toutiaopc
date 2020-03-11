<template>
<!-- 外层容器 -->
  <el-container>
    <!-- 多个行内样式用分号分隔 -->
    <el-aside :style="{width:collapse?'0':'260px'}" style="width:260px;background:#2e2f32;position:fixed;height:100vh">
      <!-- 左侧导航区域 -->
      <layout-aside></layout-aside>
    </el-aside>
    <el-container>
    <el-header  :style="{'margin-left':collapse?'0':'260px'}" >
      <!--顶部操作栏 -->
      <layout-header></layout-header>
    </el-header>
    <el-main :style="{'margin-left':collapse?'0':'260px'}">
      <!-- 主要区域 -->
       <!-- 二级路由容器 -->
    <router-view></router-view>
    </el-main>

    </el-container>
  </el-container>
</template>

<script>
import eventBus from '@/utils/eventBus'
export default {
  data () {
    return {
      collapse: false
    }
  },
  created () {
    eventBus.$on('changeCollapse', () => {
      this.collapse = !this.collapse
    })
  }

}
</script>

<style>

</style>
