<template>
<!-- type=flex 使用flex布局   align 设置垂直对齐方式 justify 设置水平对齐方式-->
 <el-row class="layout-header" type="flex" align="middle">
     <!-- 分为两列 -->
     <el-col :span="12" class="left">
         <i class="el-icon-s-fold"></i>
         <span>头条</span>
     </el-col>
     <el-col class="right" :span="12">
         <el-row type="flex" justify="end" align="middle">
         <img :src="userInfo.photo" alt="">
      <!-- 下拉菜单  command 为事件 点击菜单触发-->
       <el-dropdown  trigger="click" @command="clickMenu">
           <!-- 下拉菜单显示内容 -->
           <span>{{ userInfo.name }}</span>
           <!-- 折叠部分 需使用具名插槽 -->

           <!-- <el-dropdown-menu>专门做下拉的组件 -->
           <el-dropdown-menu slot="dropdown">
               <!-- 下拉选项组件 -->
               <el-dropdown-item command="info">
                   个人信息
               </el-dropdown-item>
               <el-dropdown-item command="git">
                   git地址
               </el-dropdown-item>
               <el-dropdown-item command="quit">
                   退出
               </el-dropdown-item>
           </el-dropdown-menu>
       </el-dropdown>
         </el-row>
     </el-col>
 </el-row>
</template>

<script>
import eventBus from '@/utils/eventBus'// 公共监听
export default {
  data () {
    return {
      userInfo: {} // 用户个人信息
    }
  },
  methods: {
    clickMenu (command) {
      if (command === 'info') {

      } else if (command === 'git') {
        window.location.href = 'https://github.com/lijiawei-aurora'
      } else {
        // 删除localStorage中的内容
        localStorage.removeItem('user-token')
        this.$router.push('/login')
      }
    },
    // 获取用户个人信息
    getUserInfo () {
      this.$axios({
        url: '/user/profile',
        headers: {
        // Authorization: `Bearer ${token}`
        }, // 放置请求头参数
        methods: 'get' // 默认为get方法，可省略
      }).then(result => {
        this.userInfo = result.data
      })
    }

  },
  created () {
    this.getUserInfo()
    // 监听用户信息改变
    eventBus.$on('updateUser', () => {
      this.getUserInfo()
    })
  }
}
</script>

<style lang="less" scoped>
.layout-header{
    height:60px;
    .left{
        i{
            font-size:20px
        }

    }
    .right{
        img{
            width: 40px;
            height: 40px;
            border-radius:50%;
            margin-right:30px
            }
            .el-dropdown{
                cursor:pointer
            }
    }
}

</style>
