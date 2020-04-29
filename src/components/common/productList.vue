
<template>
  <div>
      <div class="product">
        <div class="product-item" v-for="(item,index) in product" :key="index" @click="itemClick(item.iid)">
          <div>
              <img :src="item.show.img" :alt="item.title" v-lazy="item.show.img" @load="loadImg">
          </div>
          <div>
              <p class="product-item-title">{{item.title}}</p>
              <p class="product-item-font">
                <span class="product-item-price">{{item.price}}</span>
                <van-icon name="star-o" />
                <span>{{item.cfav}}</span>
              </p>           
          </div> 
        </div>
      </div>
  </div>
</template>

<script>
//引入vant懒加载
import Vue from 'vue';
import { Lazyload } from 'vant';
Vue.use(Lazyload);

export default {
    data(){
        return{

        }
    },
    methods:{
      //跳转详情路由
      itemClick(iid){
          this.$router.push("/details/"+iid)
          console.log("我被点击了");
          
      },
        // 监听图片加载完成情况
    loadImg(){
          //发送事件到事件总线上面去，随时监听
          this.$bus.$emit("loadImgItem")
        }
    },
    props:{
      product:{
        type:Array,
        default:[]
      }
    }
}
</script>

<style scoped>
.product{
  display: flex;
  flex-wrap:wrap;
  justify-content:center;
  margin-top:5px;
}
.product .product-item{
  width:48%;
  margin:0 3px;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
}
.product .product-item img{
  width:100%;
}
.product .product-item .product-item-title{
  font-size:12px;
  color:#212121;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.product .product-item .product-item-font{
  text-align:center;
  font-size:13px;
}
.product .product-item .product-item-font .product-item-price{
  color:var(--background-color);
}
</style>