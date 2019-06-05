import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/login.vue'
import Home from '../components/home/home.vue'
import Users from '../components/home/users.vue'
import Roles from '../components/home/roles.vue'
import Rights from '../components/home/quanxian.vue'
import Goods from '../components/home/goods.vue'
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
        { path:'/goods',component:Goods }

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
