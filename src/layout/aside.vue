<template>
  <el-aside width="200px">
       <el-menu
      :router='true'
      :unique-opened='true'
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu :index="item1.path" v-for="(item1,index1) in menusList" :key="index1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{ item1.authName }}</span>
        </template>
          <el-menu-item v-for="(item2,index2) in item1.children " :key="index2" :index="item2.path">
            <span> {{ item2.authName }}  </span>
            </el-menu-item>
      </el-submenu>

     
        
     
    </el-menu>
    </el-aside>
</template>

<script>
export default {
  data() {
    return {
      menusList:[]
    }
  },
  methods:{
    async getmenus(){
      let res = await this.$http.get('menus')
      // console.log(res);
      this.menusList = res.data.data
      // console.log(this.menusList);
    }
  },
  mounted(){
     this.getmenus()

    
  }
}
</script>

<style>

</style>
