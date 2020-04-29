<template>
  <div>
    <div class="top">
      <div>用户评价</div>
      <div>更多></div>
    </div>
    <div class="body" v-for="(item,index) in user" :key="index">
      <div class="user-head">
        <div>
          <img :src="item.user.avatar" alt="">
        </div>
        <p>{{item.user.uname}}</p> 
      </div>
      <p class="reviews-body">{{item.content}}</p>
      <div class="reviews-bottom">
        <span>2{{item.create}}</span>
        <span>{{item.style}}</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props:{
      user:{
        type:Array,
        default:[]
      }
    }
}
</script>
<style scoped>
.top{
  display:flex;
  justify-content: space-between;
  height:50px;
  line-height:50px;
  padding:0 15px;
  color:#313131;
}
.top div:nth-child(1){
    font-size: 20px;
}
.top div:nth-child(2){
    font-size:15px;
}
.user-head{
  display:flex;
  padding:15px 15px 0 15px;
  border-top:8px solid #f6f6f6;
}
.user-head div{
    width:50px;
    border-radius: 50%;
    overflow: hidden;

}
.user-head img{
  width:100%;
}
.user-head p{
  padding-left:10px;
  color:#313131;
}
.reviews-body{
  padding:0 15px;
  color:#313131;
  font-size: 15px;
}
.reviews-bottom{
  font-size: 12px;
  padding:0  15px 30px 15px;
  color:#313131;
  border-bottom:8px solid #f6f6f6;
}
</style>