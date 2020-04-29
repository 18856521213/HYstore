import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {//首页组件
      path:"/main",
      component:()=>import("@/components/content/main.vue")
    },
    {//分类组件
      path:"/sort",
      component:()=>import("@/components/content/sort.vue")
    },
    {//购物车组件
      path:"/car",
      component:()=>import("@/components/content/car.vue")
    },
    {//我的组件
      path:"/mine",
      component:()=>import("@/components/content/mine.vue")
    },
    {//详情组件
      path:"/details/:iid",
      component:()=>import("@/components/common/details.vue")
    }
      ],
  mode:"history"//调用history模式,默认是hash
})
