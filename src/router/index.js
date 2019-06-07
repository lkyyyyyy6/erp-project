import Vue from 'vue'
import Router from 'vue-router'

// 路由懒加载
const Login = ()=> import ( '../components/login/login.vue')
const Home = ()=> import ( '../components/home/home.vue')
const Users = ()=> import ( '../components/home/users.vue')
const Roles = ()=> import ( '../components/home/roles.vue')
const Rights = ()=> import ( '../components/home/quanxian.vue')
const Categories = ()=> import ( '../components/home/categories.vue')
const Goods = ()=> import ( '../components/home/goods.vue')
const Add = ()=> import ( '../components/home/add.vue')
const Orders = ()=> import ('../components/home/orders.vue')
const Reports = ()=> import ('../components/home/reports.vue')
const Params = ()=> import ('../components/home/params.vue')

import { Message } from 'element-ui'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { 
      path: '/home',
      component: Home,
      children:[
        { path:'/users',component:Users}, //用户列表
        { path:'/roles',component:Roles}, //角色列表
        { path:'/rights',component:Rights }, //权限列表
        { path:'/categories',component:Categories } ,//商品分类
        {path:'/goods',component:Goods},//
        {path:'/add',component:Add },
        {path:'/orders',component:Orders },
        {path:'/reports',component:Reports },
        {path:'/params',component:Params }


      ]
     }
  ]
})

  // 导航守卫
router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(from)
  // console.log('123')
  if(to.path!='/login'){
    // console.log('333')
    if (!localStorage.getItem("token")) {
      console.log('444')
      //没有令牌就是没登录
      Message.error('你还没登录')
      // router.push('/')
      next('/')
    }else{
      next()
    }
  }else{
    next()
  }
  
   
  
  

})


export default router
