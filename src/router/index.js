import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/login.vue'
import Home from '../components/home/home.vue'
import Users from '../components/home/users.vue'
import Roles from '../components/home/roles.vue'
import Quanxian from '../components/home/quanxian.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { 
      path: '/home',
      component: Home,
      children:[
        { path:'/users',component:Users}, //用户列表
        { path:'/roles',component:Roles}, //角色列表
        { path:'/quanxian',component:Quanxian }

      ]
     }
  ]
})
