<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
        <slot></slot>

    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll"

export default {
    data(){
      return{
          scroll:null,
          
      }
    },
    props:{
      probeType:{
        type:Number,
        default:1
      },
      pullUpLoad:{
        type:Boolean,
        default:false
      }
    },
    mounted(){
        this.scroll = new BScroll(this.$refs.wrapper,{
          click:true,
          probeType:this.probeType,
          pullUpLoad:this.pullUpLoad
        })

        this.scroll.on("scroll",pos=>{
          // console.log(pos);      
         this.$emit("scroll",pos)        
        })

        this.scroll.on("pullingUp", ()=>{
              this.$emit('pullingUp')
              
        })
         
    },
    methods:{
      // scrollTO方法，内部封装，方便随时调用
        scrollTo(x,y,time=300){
         this.scroll && this.scroll.scrollTo(x,y,time)
        },
        refresh(){
          this.scroll &&  this.scroll.refresh()
        }
    }
}
</script>
<style scope>
  
</style>

