<template>
  <div id="box">
    <!-- 首页展示 -->
    <nav-bar class="nav">
       <div slot="left" @click="goBack"><van-icon name="arrow-left" /></div>
       <div slot="center" class="center" >
         <div class="center-font"  v-for="(item,index) in title" :key="index" 
              @click="changeColor(index)" :class="{active:index === index02}">
           {{item}}
         </div>
       </div>
    </nav-bar>

 
   <scroll class="content"  ref="scroll" >
        <!-- 轮播图 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="red">
        <van-swipe-item v-for="(item,index) in swiperList" :key="index">
            <a href="#">
                <img  :src="item" />
            </a>
        </van-swipe-item>
      </van-swipe>
      <!-- 轮播图end -->

      <!-- 商品详情 -->
      <div class="product-info" >
          <p class="product-info-title">{{allInfo.itemInfo.desc}}</p>
          <p class="product-item-price-box">
            <span class="product-item-price">{{allInfo.itemInfo.price}}</span>
            <span class="product-item-oldprice">{{allInfo.itemInfo.oldPrice}}</span>
            <span class="product-item-discount">{{allInfo.itemInfo.discountDesc}}</span>
          </p>
          <div class="product-item-serve">
            <div v-for="(item,index) in allInfo.columns" :key="index">{{item}}</div>     
          </div>
          <div class="product-item-serve02">
            <div><van-icon name="chat-o" />延误必赔</div>
            <div>退货补运费</div>
            <div>全国包邮</div>
            <div>7天无理由</div>
          </div>
          <div class="store-info">
            <div class="store-info-box">
              <div class="store-info-logo">
                <img :src="allInfo.shopInfo.shopLogo" alt="logo">
              </div>
              <div class="store-name">{{allInfo.shopInfo.name}}</div>
            </div>
            <div class="store-detailed">
              <div class="store-sales">
                <p>{{allInfo.shopInfo.cFans}}</p>
                <p>总销量</p>
              </div>
              <div class="store-products">
                <p>{{allInfo.shopInfo.cGoods}}</p>
                <p>全部宝贝</p>
              </div>
              <div class="store-description">
                <div class="store-description-item" v-for="(item,index) in allInfo.shopInfo.score" :key="index">
                  <div>{{item.name}}</div>
                  <div :class="{actives:item.isBetter}" class="isactive">{{item.score}}</div>
                  <div v-if="item.isBetter" style="background-color:red;color:white;">低</div>
                  <div v-if="!item.isBetter" style="background-color:greenyellow;color:white;">高</div>
                </div>
          
              </div>
            </div>
            <div class="go-store">
                <button>进店逛逛</button>
            </div>
          </div>

          <!-- 产品图片 -->
          <div class="product-imgs" v-for="(item,index) in allInfo.itemInfo.topImages" :key="index">
            <img :src="item" alt="">
          </div>
          <!-- 产品尺码 -->
          <table class="table-size">
            <tr v-for="(item,index) in allInfo.itemParams.rule.tables[0] ? allInfo.itemParams.rule.tables[0] :'' " :key="index">
              <td>{{item[0]}}</td>
              <td>{{item[1]}}</td>
              <td>{{item[2]}}</td>
              <td>{{item[3]}}</td>
            </tr>
          </table>
          <!-- 第二个表格 -->
           <table class="table-size2">
            <tr v-for="(item,index) in allInfo.itemParams.info.set" :key="index">
              <td>{{item.key}}</td>
              <td>{{item.value}}</td>       
            </tr>
           
          </table>

          <!-- 用户评价 -->
          <user-reviews :user="allInfo.rate.list" />

          <!-- 热门推荐 -->
          <div>
            <div class="hot">热门推荐</div>
          </div>
      </div>

   </scroll>
   <van-goods-action class="add-car">
    <van-goods-action-icon icon="chat-o" text="客服"  />
    <van-goods-action-icon icon="cart-o" text="购物车" />
    <van-goods-action-button type="warning" text="加入购物车"  />
    <van-goods-action-button type="danger" text="立即购买"  />
  </van-goods-action>
  </div>
</template>
<script>
import {request} from "../../network/request"

import NavBar from "@/components/common/NavBar.vue"
import scroll from "@/components/common/scroll.vue"
import backTop from "@/components/common/backTop.vue"
import UserReviews from "@/components/common/UserReviews.vue"

  export default {
    data(){
      return{
          id:null,
          title:["商品","参数","评论","推荐"],
          index02:0,
          swiperList:[],
          allInfo:{}
      }
    },
    methods:{

      // 获取详情数据
      getDetails(iid){
        request({
          url:"/api/h8/detail",
          params:{
            iid
          }
        },(res)=>{
           this.swiperList = res.data.result.itemInfo.topImages 
            // console.log(res);
           this.allInfo=res.data.result;
            // console.log(this.swiperList);
            
            
        })
      },
      //点击改变颜色
      changeColor(index){
        this.index02=index
      },
      //回到上一路由
      goBack(){
        this.$router.go(-1);
      }
    },
    components:{
      NavBar,
      scroll,
      backTop,
      UserReviews
    },
    created(){
      this.id=this.$route.params.iid

      this.allInfo={
        itemInfo:'',
        shopInfo:{
          shopLogo:''
        },
        itemParams:{
          rule:[""]
        }
      }
      this.getDetails(this.id)
    },
    mounted(){

    }
  }
</script>
<style scoped>
.nav-bar{
  background-color:white;
  color:#313131;
}
.actives{
  color:red
}
.isactive{
  color:greenyellow
}

.center{
  display:flex;
  flex-wrap:wrap;
  justify-content:space-between;
  font-size:16px;
}
.center-font{
  flex:1;
}
.active{
  color:yellow;
  border-bottom:2px solid yellow;

}
.my-swipe{
  height:300px;
}
.my-swipe .van-swipe-item img{
  width:100%;
}
.content{
    width: 100%;
    position: absolute;
    top: 46px;
    bottom: 50px; 
    overflow: hidden;
    z-index: 3;
}

/* 商品info的css */
.product-info-title{
  padding:0 5px;
  font-size: 18px;
  color:#313131;
}
.product-item-price-box{
  padding:0 7px;
}
.product-item-price{
  font-size: 28PX;
  color:var(--background-color);
}
.product-item-oldprice{
  color:#808080;
  text-decoration:line-through;
}
.product-item-discount{
  color:white;
  background-color:var(--background-color);
  border-radius: 30%;
  padding:4px;
  font-size: 12px;
}
.product-item-serve{
  display:flex;
  flex-wrap:wrap;
  justify-content:space-between;
  padding: 0px 15px 8px 15px;
  font-size: 14px;
  color:#808080;
  border-bottom:0.5px solid #dbdbdb;
}
.product-item-serve02{
  display:flex;
  flex-wrap:wrap;
  justify-content:space-between;
  padding:20px 10px;
  font-size: 14px;
  color:#313131;
  border-bottom:5px solid #eeeeee;
}
.store-info-box{
  display: flex;
  align-items:center;
  padding:30px 10px 10px 10px;

}
.store-info-logo{
  width:50px;
  border-radius: 50%;
  border:0.2px solid #858585;
  overflow: hidden;
}
.store-info-logo img{
  width:100%;
}
.store-name{
  font-size: 18px;
  padding:0 10px;
  color:#666666;
}
.store-detailed{
  display:flex;
  text-align:center;
  align-items:center;
}
.store-sales{
  width:28%;
}
.store-products{
  width:28%;
}
.store-description{
  width:38%;
  display:flex;
  flex-direction:column;
}
.store-description-item{
  display:flex;
  padding:5px;
   justify-content:space-between;
}
.go-store{
  text-align:center;
}
.go-store button{
  width:150px;
  height:30px;
  border:0;
  border-radius: 10px;
  background-color:#f6f6f6;
  font-size: 15px;
  color:#313131;
}
/* 商品info的css-end */

/* 产品图片 */
.product-imgs{
  border-bottom:7px solid #f6f6f6;
  padding:10px 0;

}
.product-imgs img{
    width:100%;
}
/* 产品图片end */
/* 尺码表 */
.table-size{
  padding-top:5px;
  width:100%;
}
.table-size td{
  width:25%;
  height:30px;
  padding:5px 10px;
  border-bottom:1px solid #f6f6f6;
  font-size: 15px;
}

.table-size2{
  width:100%;
  border-top:8px solid #f6f6f6;
}
.table-size2 td{
  width:25%;
  height:30px;
  padding:5px 10px;
  border-bottom:1px solid #f6f6f6;
  font-size: 15px;
}
.table-size2 td:nth-child(2){
  width:75%;
  color:var(--background-color);
}
/* 尺码表end */
.hot{
  height:50px;
  /* font-size: 15px; */
  line-height:50px;
  padding:15px;
}

.add-car{
  z-index:99;
}
.van-goods-action{
  height:60px;
  box-shadow:0 -3px 3px #f6f6f6;
}
</style>