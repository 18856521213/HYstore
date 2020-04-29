<template>
  <div>
      <div class="box">   
             up
      </div>

  </div>
</template>
<script>
export default {
    data(){
      return{

      }
    }
}
</script>
<style scoped>
  .box{
    width:70px;
    height:70px;
    background-color:white;
    color:var(--background-color);
    position: absolute;
    bottom:60px;
    right:20px;
    z-index:99;
    border-radius: 50%;
    text-align:center;
    line-height: 70px;
    opacity:0.8;
    font-size:25px;
    
  }

</style>