<template>
  <div class="nav-bar">
      <div class="left"><slot name="left"></slot></div>  
      <div class="center"><slot name="center"></slot></div>  
      <div class="right"><slot name="right"></slot></div>  

  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
  .nav-bar{
    width:100%;
    height:46px;
    line-height:46px;
    display:flex;
    position: fixed;
    right:0;
    left:0;
    top:0;
    background-color:var(--background-color);
    color:white;
    font-size: 18px;
    box-shadow: 0 1px 1px rgba(100,100,100,0.4);
  }
.left,.right{
    width:60px;
    text-align:center;
    line-height: 46px;

}
.center{
    flex:1;
    text-align:center;
  

}

</style>