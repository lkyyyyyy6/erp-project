<template>
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

     <el-table :data="tableData" style="width: 800px" :border="true" class="mytable">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column  label="层级" >
        <template slot-scope="scope">
          {{ scope.row.level === 0 ? '第一级':scope.row.level === 1 ? '第二级':'第三级'}}
        </template>
      </el-table-column>
     </el-table>

  </el-card>

</template>

<script>
export default {
  data() {
    return {
      tableData:[
        { authName:'商品管理',path:'goods',level:'一级' },
        { authName:'商品管理',path:'goods',level:'一级' },
        { authName:'商品管理',path:'goods',level:'一级' }
      ]
    }
  },
  methods:{
    async getAllList(){
      let res = await this.$http.get('rights/list')
      // console.log(res)  
      this.tableData = res.data.data
      
    }
  },
  mounted(){
    this.getAllList()
  }
}
</script>

<style scoped>
  .mytable{
    line-height: 0px;
  }
</style>
