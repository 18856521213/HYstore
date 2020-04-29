<template>
<div>
   <van-tabbar 
   v-model="active"
   active-color="#f53051"
   inactive-color="#000"
   >
      <van-tabbar-item icon="wap-home" to="/main">首页</van-tabbar-item>
      <van-tabbar-item icon="wap-nav" to="/sort">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart" to="car">购物车</van-tabbar-item>
      <van-tabbar-item icon="manager" to="mine">我的</van-tabbar-item>
   </van-tabbar>
<router-view></router-view>



</div>
</template>

<script>


export default {
  name: 'App',
  data(){
    return{
      active:0
    }

  },
  methods:{


  }
  
  }
</script>

<style>
  @import ".//assets/css/base.css";


</style>
