<template>
  <div>
        <nav-bar>
            <div slot="center">购物车</div>
        </nav-bar>
  </div>
</template>
<script>
import NavBar from "@/components/common/NavBar.vue"

export default{
    data(){
        return{

            
        }
    },
    methods:{

    },
    components:{
        NavBar
    }


}
</script>
<style scoped>
.van-nav-bar{
    background-color:var(--background-color);
    
}
.van-nav-bar__title{
    color:white;
}
</style>