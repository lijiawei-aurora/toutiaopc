<template>
<!-- elementUI面包屑  separator为选项与选项之间的分隔符-->
  <el-breadcrumb separator=">">
      <!-- 单击首页跳到首页 -->
      <el-breadcrumb-item  to="/home">首页</el-breadcrumb-item>
      <!-- 第二项开始需通过props传值方式传入  slot插槽采用 -->
      <el-breadcrumb-item>
          <!-- 具名插槽 -->
          <slot name="title"></slot>
      </el-breadcrumb-item>

  </el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>
