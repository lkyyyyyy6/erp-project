<template>
  <el-container class="mycon">
  <el-header>
  <!-- 头 -->
<el-row type="flex" class="row-bg" justify="space-between">
  <el-col :span="2"><div class="grid-content "><img src="../../assets/logo.png" ></div></el-col>
  <el-col :span="6"><div class="grid-content "><h2>电商erp系统</h2></div></el-col>
  <el-col :span="2"><div class="grid-content ">
    <el-button type="danger" @click.prevent="logout">退出</el-button>
    </div></el-col>
</el-row>
  </el-header>
  <el-container>
    <!-- 侧边 -->
    <Aside></Aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import Aside from '../../layout/aside.vue'
export default {
  
  components:{
    Aside
  },




  methods:{
    logout(){
        this.$confirm('退出当前账号?', '提示', {
          confirmButtonText: '退出',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '登出成功!'
          });
           //清除token
      localStorage.removeItem('token')
      this.$router.push('/')
        }) 
    },
 
  }


 
}

</script scoped>

<style>
  img{
    height: 60px;
  }
  .mycon{
    height: 100%;
  }
 .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
 
</style>
