<template>
   <el-card class="box-card">
     <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item> 
    </el-breadcrumb>

    <div class="myinput">
      <el-input placeholder="请输入内容" v-model="keywords" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="serach"></el-button>
      </el-input>
        <el-button type="success" plain @click="tianjia"> 添加商品</el-button>
    </div>

    <el-table :data="tableData"  style="width: 100%" :border="true" class="mytable">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="380"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格" width="180"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" width="100"></el-table-column>
      <el-table-column prop="add_time" label="创建时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.add_time | timeFormat }}
        </template>
      </el-table-column>
      <el-table-column prop="opt" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain ></el-button>
          <el-button type="danger" icon="el-icon-delete" plain ></el-button>
        </template>
      </el-table-column>
    </el-table>

 

      <el-pagination
      @size-change='sizeChange'
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="pageSizes"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
   </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData:[],
      pagenum:1, //当前页面
      pagesize:10 ,//一页显示的数目
      keywords:'', //搜索框的内容
      pageSizes:[10,20,30,40,50], //可选
      total:0

  

    }
  },
  methods:{
    async getGoodsList(){
      let res = await this.$http.get(`goods?query=${this.keywords}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      let {data,meta} = res.data
      this.tableData = data.goods
      this.total = data.total //设置总数
      // console.log(this.tableData);
  
    },
    //点击第*页显示
    handleCurrentChange(val){
      this.pagenum = val
      this.getGoodsList()
    },
    // 页容量改变时触发
    sizeChange(val){
      this.pagesize = val
      this.getGoodsList()
    },
    serach(){
      this.getGoodsList()
    },
    tianjia(){
      this.$router.push('/add')
    }
  },
  mounted(){
    this.getGoodsList()
  }
}
</script>

<style scoped>
  .myinput {
  margin-top: 15px;
  line-height: 40px;
  float: left;
}
.input-with-select {
  width: 350px;
}
.mytable{
  line-height: 0px;
}
.ql-editor .ql-blank{
  height: 600px;
}
</style>
