import Vue from 'vue';
import Router from 'vue-router'; 
import Home from '@/home.vue'
Vue.use(Router);
export default new Router({
   routes:[
    {
      path:'/',
      component:()=>{
        return import (/* webpackChunkName: "home" */`@/home.vue`)
      }
    },
    {
      path:'/power',
      component:()=>{
        return import (/* webpackChunkName: "power" */`@/power.vue`)
      }
    }
   ]
})
