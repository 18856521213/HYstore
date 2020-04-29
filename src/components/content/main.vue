<template>
  <div>
   <!-- <van-nav-bar title="首页"/> -->
   <nav-bar>
       <div slot="center">首页</div>
   </nav-bar>

     <scroll class="content" 
             :probeType="3" 
             ref="scroll"
             @scroll="eventThink"
             :pull-up-load="true"
             @pullingUp="lodeMore"

     >
        <!-- 轮播图 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="red" >
        <van-swipe-item v-for="(item,index) in swiperList" :key="index">
            <a :href="item.link">
                <img  :src="item.image" :alt="item.title">
            </a>
        </van-swipe-item>
      </van-swipe>
      <!-- 轮播图end -->
        <!-- 分类图 -->
        <van-grid :border="false" :column-num="4">
            <van-grid-item v-for="(item,index) in recommend" :key="index" :url="item.link">
                <van-image :src="item.image" />
                <p class="sort-item-title">{{item.title}}</p>
            </van-grid-item>      
        </van-grid>        
        <!-- 分类图end -->
        <!-- 标签产品展示 -->
        <van-tabs swipeable
                  animated
                  sticky
                  duration="1"               
                  @click="getImage"
                  @change="getImage"
                  :scroll="{ scrollTop: 44, isFixed: true}"
                  >
            <van-tab v-for="(item,index) in keyWord" :key="index" :title="item.words">
                    <!-- 产品数展示 -->
                <productList :product="goods['pop'].list" v-show="changePlay01" />
                <productList :product="goods['new'].list" v-show="changePlay02" />
                <productList :product="goods['sell'].list" v-show="changePlay03" />

            </van-tab>
        </van-tabs>

        <!-- 标签产品展示end -->
     </scroll>   
     <!-- 回到顶部  -->
     <back-Top v-show="isDisabled" @click.native="backTop"></back-Top>
  </div>
</template>

<script>
import {request} from "../../network/request"

import productList from "@/components/common/productList.vue"
import scroll from "@/components/common/scroll.vue"
import backTop from "@/components/common/backTop.vue"
import NavBar from "@/components/common/NavBar.vue"
export default{
    data(){
        return{
            changePlay01:true,
            changePlay02:false,
            changePlay03:false,
            swiperList:[],
            recommend:[],
            keyWord:[],
            goods:{
                "pop":{page:1,list:[]},
                "new":{page:1,list:[]},
                "sell":{page:1,list:[]}
            },
            isDisabled:false,
            page:1

            
        }
    },
    mounted() {

        //启动获取轮播图的函数
        this.getSwiper(),

        //启动获取商品数量的函数
        this.getProductList("pop",this.page)
        this.getProductList("new",this.page)
        this.getProductList("sell",this.page)

        //开始监听图片加载完成后
        //防抖函数的调用
        const refresh = this.debounce(this.$refs.scroll.refresh,500)
        this.$bus.$on("loadImgItem",()=>{         
            refresh()          
        })
    },
//   注册组件
  components:{
        NavBar,
        productList,
        scroll,
        backTop 
    },

    methods:{
    //----------交互相关的函数-----------
    //防抖函数
    debounce(func,delay){
        let timer = null 
        return function(...args){
            if(timer) clearTimeout(timer)           
            timer = setTimeout(()=>{
                    func.apply(this,args)
            },delay)
        }
    },
    //加载更多
    lodeMore(){
      this.getProductList("pop",this.page)
      this.getProductList("new",this.page)
      this.getProductList("sell",this.page)
        
    },
    //点击回到顶部按钮后，回到相对应的x，y的位置和时间
    backTop(){
        this.$refs.scroll.scroll.scrollTo(0.0,800)
    },
    //实现当滑动多少高度以后，回到顶部按钮的组件显示与否
    eventThink(pos){
        // console.log(pos)
        if(pos.y<-1000){
           
            this.isDisabled=true
        }else{
            this.isDisabled=false
        }
    },
    //实现商品组件切换时，显示相对应的组件
    getImage(name){
           //根据点击传过来的下标值来显示哪个组件显示出来
           const index = name%3
           if( index == 0){
               this.changePlay01=true;
               this.changePlay02=false;
               this.changePlay03=false;
               
           }else if(index== 1){

               this.changePlay01=false;
               this.changePlay02=true;
               this.changePlay03=false;

           }else{
               this.changePlay01=false;
               this.changePlay02=false;
               this.changePlay03=true;
           }
            
    },       

    //-------------网络操作相关的函数---------------    
    // 获取轮播图数据并传递到data中去
    getSwiper(){
        request({
            url:"/home/multidata"
            },res=>{                
                this.swiperList=res.data.data.banner.list;
                this.recommend=res.data.data.recommend.list;
                this.keyWord=res.data.data.keywords.list;                                 
        })
    },
    //请求商品数的axios函数
    getProductList(type,page){
        request({
            url:"/api/h8/home/data",
            params:{
                type,
                page
            }
            },(res)=>{
                
                const goods = res.data.data.list
                this.goods[type].list.push(...goods);
                this.page+=1;
                                    
        })
    }



    }


}
</script>
<style scoped>
.content{
    width: 100%;
    position: absolute;
    top: 46px;
    bottom: 50px;  /*关键*/
    overflow: hidden;
    z-index: 1;
}


.my-swipe .van-swipe-item img{
    width:100%;

}
.custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
}
.sort-item-title{
    font-size: 14px;
    color:#494949;
}

</style>