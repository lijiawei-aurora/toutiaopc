<template>
<div class="layout-aside" style="width:260px;height:100%">
    <div class="title">
        <img src="../../assets/img/logo_admin.png" alt="">
    </div>
    <!-- 导航菜单 -->
    <!-- 开启菜单的路由模式 :router="true"  简写方法 router -->
     <el-menu :router="true" background-color="#323745" text-color="#fff">
         <!--  没有子菜单的子菜单  index属性在路由模式下为跳转路径 -->
         <el-menu-item index="/home">
             <!-- 字体图标  elementUI中的 -->
            <i class="el-icon-s-home"> </i>
            <span> 首页</span>
         </el-menu-item>

         <el-submenu index="2">
             <!-- 在外面加一个template标签在页面上不会显示，但可以避免在每个标签上加slot -->
             <template slot="title">
                <i class='el-icon-document'></i>
                <span>内容管理</span>
             </template>

             <!-- 匿名插槽是二级菜单  具名插槽为一级菜单 -->
              <el-menu-item index='/home/publish'> 发布文章 </el-menu-item>
              <el-menu-item index='/home/articles'>内容列表</el-menu-item>
              <el-menu-item index='/home/comment'>评论列表</el-menu-item>
              <el-menu-item index='/home/material'>素材管理 </el-menu-item>
        </el-submenu>

         <el-submenu index="3" >
              <template slot="title">
                <i class="el-icon-star-on"></i>
                <span>粉丝管理</span>
             </template>
              <el-menu-item index='/home/picture'>图文数据 </el-menu-item>
              <el-menu-item index='/home/fansinfo'>粉丝概况</el-menu-item>
              <el-menu-item index='/home/fansphoto'>粉丝画像</el-menu-item>
              <el-menu-item index='/home/fanslist'>粉丝列表 </el-menu-item>
        </el-submenu>
         <el-menu-item index="/home/account">
             <i class="el-icon-user-solid"></i>
             <span>账户信息</span>
         </el-menu-item>
     </el-menu>
</div>

</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.layout-aside{
    background-color: #2e2f32;
    height:100vh;
    .title{
        text-align:center;
        padding:10px 0;
        img{
            height:35px;
        }
    }
    .el-menu{
        border-right:none
    }

}
</style>
