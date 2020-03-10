<template>
    <div class="cover-image">
        <div class="cover-image-item" v-for="(item,index) in list" :key="index" @click="openDialog(index)">
            <!-- 图片的地址应等于item -->
            <!-- 若item无值，显示默认图片 -->
            <img :src="item?item:defaultImag" alt="">
        </div>
        <el-dialog :visible="dialogVisible" @close="dialogVisible=false">
            <!-- 监听谁的自定义事件就在谁的标签上写@事件名 -->
            <select-image @selectImg="recieveImg"></select-image>
        </el-dialog>
    </div>
</template>

<script>
export default {
  props: ['list'], // 接收传递的参数
  data () {
    return {
      defaultImag: require('../../assets/img/pic_bg.png'),
      dialogVisible: false, // 控制弹层的显示或隐藏
      selectIndex: -1// 记录点击的图片的索引
    }
  },
  methods: {
    //   点击图片弹出一个层
    openDialog (index) {
      this.dialogVisible = true
      this.selectIndex = index
    },
    // 此处的url为子组件传过来的 点击的图片地址
    // 若要改变封面需到父组件，props传递的值不能修改
    // selectIndex为要修改封面的索引
    recieveImg (url) {
      this.$emit('changeImg', url, this.selectIndex)
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.cover-image{
    display: flex;
    margin:20px 100px;
    .cover-image-item{
        border:1px solid #ccc;
        width: 250px;
        height: 250px;
        padding:20px;
    img{
        width:100%;
        height: 100%;
    }
    }
}
</style>
