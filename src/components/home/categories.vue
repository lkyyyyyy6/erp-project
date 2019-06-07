<template>
  <el-card>
     <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="myrow">
      <el-col :span="1">
         <el-button class="mybtn" type="success" plain @click="dialogFormVisible = true">添加分类</el-button>
      </el-col>
    </el-row>

  <!-- 
    prop:一级菜单
    treeKey: 每个选项节点的id
    
   -->
  <el-table :data="pageList" style="width: 100%" :border="true" class="mytable">
      <el-table-tree-column    
            file-icon="icon icon-file" 
            folder-icon="icon icon-folder" 
            prop="cat_name"
            label="名称" 
            treeKey= "cat_id"
            parentKey= "cat_pid"
            levelKey="cat_level"
            width="320">
            </el-table-tree-column>
            <el-table-column prop="cat_level" label="级别" width="180">
        <template slot-scope="scope">
          {{ scope.row.cat_level === 0 ? '一级':scope.row.cat_level === 1 ? '二级': '三级' }}
        </template>
      </el-table-column>
      <el-table-column  label="是否有效">
        <template slot-scope="scope">
          {{ scope.row.cat_deleted === true ? '无效':'有效' }}
        </template>
      </el-table-column>
       <el-table-column prop="opt" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain ></el-button>
          <el-button type="danger" icon="el-icon-delete" plain ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 
      
      
     -->
    <!-- 

     @size-change： pageSize 改变时会触发	   每页条数
     @current-change currentPage 改变时会触发  当前页
      ：current-page：当前页
      :page-sizes 可选的页容量 一个数组
      :page-size 每页容量
     -->
     
      <el-pagination
      @size-change='sizeChange'
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>


  
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData:[
        {cat_name:'大家电',cat_level:'一级',cat_deleted:true},
        {cat_name:'家电',cat_level:'er级',cat_deleted:true},
        {cat_name:'电',cat_level:'san级',cat_deleted:false},
      ],
      total:0, //总数据
      pageSizes: [10,20,30],//可选的页容量数
      pageSize: 10 , //页容量
      currentPage:1 ,//当前页
      pageList:[] //装分页内容

      }
  },
  methods:{
    // 由于这个版本的element遍历不了children属性，所以要用element-tree-grid来遍历二级三级目录
    async getAllGoods(){
      let res = await this.$http.get('categories')
      // console.log(res.data)
      this.tableData = res.data.data
      this.total = this.tableData.length  //设置总数据条数
      // console.log(this.total);
      //获得第一个分页的数据
      this.getPageList()
      
    },
    handleCurrentChange(val){
      console.log(val);
      this.currentPage = val
      this.getPageList()
    },
    //获得当前分页的内容
    getPageList(){
      let start = (this.currentPage - 1) * this.pageSize
      let end = this.currentPage * this.pageSize 
      // console.log(start,end);
      this.pageList = this.tableData.slice(start,end)
      console.log(this.pageList )
    },
    //当每页总数改变时触发
    sizeChange(val){
      console.log(val);
       this.pageSize = val
      this.getPageList()
    }

  },
  mounted(){
    this.getAllGoods()
  }
}
</script>

<style scoped>
  .mybtn{
    /* line-height: 0px; */
  }
   .myrow{
    line-height: 0px;
    margin: 20px;
    margin-left: -13px;

  }
  .mytable{
    line-height: 0px;
  }
</style>
