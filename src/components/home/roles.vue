<template>
  <el-card class="box-card">
     <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item> 
    </el-breadcrumb>
  <el-row class="myrow">
    <el-col :span="1">
      <el-button type="success" plain @click="dialogFormVisible = true" >添加角色</el-button>
    </el-col>
   
  </el-row>
  

  <!-- 提交表单 -->
    <el-dialog title="添加角色" :visible.sync="dialogFormVisible" width="1200px">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="角色名称(必填)" :label-width="formLabelWidth" prop="roleName">
          <el-input v-model="form.roleName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色描述" :label-width="formLabelWidth" >
          <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="postChara">提 交</el-button>
      </div>
    </el-dialog>


     <!-- 编辑表单 -->
    <el-dialog title="编辑角色" :visible.sync="editFormVisible" width="1200px">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="角色名称(必填)" :label-width="formLabelWidth" prop="roleName">
          <el-input v-model="form.roleName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色描述" :label-width="formLabelWidth" >
          <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editChara">提 交</el-button>
      </div>
    </el-dialog>




    <el-table :data="tableData" style="width: 100%" :border="true" class="mytable">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- v-for循环 需要的数据-->
        <el-row v-for="(item,key) in scope.row.children " :key="key">
          <!-- 第一列 -->
          <el-col :span="6">
              <el-tag> {{ item.authName }}  </el-tag>
          </el-col>

          <!-- 第二列 -->
          <el-col :span="18">
            <el-row v-for="(item1,key1) in item.children " :key="key1">
              <el-col :span="6">
               <el-tag>   {{ item1.authName }} </el-tag>
              </el-col>
              <el-col :span="18" >
                <el-tag v-for="(item2,key2) in item1.children " :key="key2">   
                  {{ item2.authName }}
                   </el-tag>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        </template>
        </el-table-column>
       <el-table-column type="index"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="180"></el-table-column>
      <el-table-column prop="opt" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain size="mini"  @click="openEditTable(scope.row.id)"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini" @click="delChara(scope.row.id)"></el-button>
          <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
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
        {roleName:'主管',roleDesc:'负责人'},
        {roleName:'主管',roleDesc:'负责人'},
        {roleName:'主管',roleDesc:'负责人'},
        {roleName:'主管',roleDesc:'负责人'}
      ],
      form:{
        roleName:'',
        roleDesc:'',
        id:''
      },
      formLabelWidth: "120px",
      dialogFormVisible : false,
      editFormVisible: false,
       rules: {
        roleName: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
      },
    }
  },
  methods:{
    async getRoleList(){
      let res = await this.$http.get('roles')
      // console.log(res)
      this.tableData = res.data.data
    },

    //添加新角色
    async postChara(){
      let res = await this.$http.post('roles',this.form)
      // console.log(res);
      this.$message({
        type:'success',
        message:res.data.meta.msg
      })
      this.getRoleList()
       this.dialogFormVisible = false
    },

    //删除角色
    async delChara(id){
       this.$confirm("删除角色?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        // console.log(id);
        let res = await this.$http.delete(`roles/${id}`);
        // console.log(res);
        this.$message({
          type: "success",
          message: "删除成功"
        });
        this.getRoleList();
      });
    },

    //打开编辑窗口
    async openEditTable(id){
        this.editFormVisible = true
        let res = await this.$http.get('roles/'+id)
        this.form = res.data.data
        this.form.id = id
        console.log(this.form);
    },
    //提交编辑用户
    async editChara(){
      let res = await this.$http.put(`roles/${this.form.id}`,this.form)
      // console.log(res)
      
      this.$message({
        type:'success',
        message:'修改成功'
      })
      this.editFormVisible = false
      this.getRoleList()
    },



  },
  mounted(){
    this.getRoleList()
  }
}
</script>

<style scoped>
 .mytable{
    line-height: 0px;
  }
  .myrow{
    line-height: 0px;
    margin: 20px;
    margin-left: -13px;

  }

</style>
