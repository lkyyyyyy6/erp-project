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
              <el-tag closable  @close='myclose(scope.row.id,item.id,scope)'> {{ item.authName }}  </el-tag>
          </el-col>

          <!-- 第二列 -->
          <el-col :span="18">
            <el-row v-for="(item1,key1) in item.children " :key="key1">
              <el-col :span="6">
               <el-tag closable  @close='myclose(scope.row.id,item1.id,scope)'>   {{ item1.authName }} </el-tag>
              </el-col>
              <el-col :span="18" >
                <el-tag closable @close='myclose(scope.row.id,item2.id,scope)' v-for="(item2,key2) in item1.children " :key="key2">   
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
          <el-button type="success" icon="el-icon-check" plain size="mini" @click="openQuanxian(scope)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 权限分配表单 -->
  <el-dialog title="权限分配" :visible.sync="quanxianTable">
    <el-tree
    :props="props"
    :default-expand-all='true'
    :default-checked-keys='checkArr'
    node-key="id"
    :data="quanxiandata"
    show-checkbox
    ref="tree"
  >
</el-tree>

  <div slot="footer" class="dialog-footer">
    <el-button @click="quanxianTable = false">取 消</el-button>
    <el-button type="primary" @click="postQuanxian">确 定</el-button>
  </div>
</el-dialog>


  </el-card>
</template>

<script>
export default {
  data() {
    return {
      props:{
          label: 'authName',
      },
      tableData:[
        {roleName:'主管',roleDesc:'负责人'},
        {roleName:'主管',roleDesc:'负责人'},
        {roleName:'主管',roleDesc:'负责人'},
        {roleName:'主管',roleDesc:'负责人'}
      ],
      checkArr:[],
      rid:'',
      quanxiandata:[
        {id:1, authName:'一级1',children:[
          {authName:'二级1-1',children:[
            {authName:'三级1-1-1'},
            {authName:'三级1-1-2'},
            {authName:'三级1-1-3'}
          ]},
          {authName:'二级1-2'}],
          },
          {id:2, authName:'一级2',children:[
          {authName:'二级2-1',children:[
            {authName:'三级2-1-1'},
            {authName:'三级2-1-2'},
            {authName:'三级2-1-3'}
          ]},
          {authName:'二级2-2'}],
          }

      ],
      form:{
        roleName:'',
        roleDesc:'',
        id:''
      },
      formLabelWidth: "120px",
      dialogFormVisible : false,
      editFormVisible: false,
      quanxianTable:false,
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

    //删除角色的权限
    async myclose(roleId,rightId,scope){
      let res = await this.$http.delete(`roles/${roleId}/rights/${rightId}`)
      // console.log(roleId,rightId)
      scope.row.children = res.data.data
      
    },

    //打开编辑权限表
    async openQuanxian(scope){
      this.quanxianTable = true
      this.checkArr = []  //每次打开都要清空
      let res = await this.$http.get('rights/tree')
      
      this.quanxiandata = res.data.data //讲数据给权限列表
      this.rid = scope.row.id
      // console.log( this.quanxiandata)
      //设置默认的选择，遍历当前行的三级默认选项
      scope.row.children.forEach(item =>{
        item.children.forEach(item2 =>{
          item2.children.forEach(item3 =>{
            this.checkArr.push(item3.id)
          })
        })
      })
    },

    //提交权限分配
     async postQuanxian(){
      // let checkIDs = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
      let checkIDs = [...this.$refs.tree.getCheckedKeys(),...this.$refs.tree.getHalfCheckedKeys() ]
      // console.log(checkIDs)
      let rids = checkIDs.join(',')   //注意转字符串
      // console.log(rids)
      console.log(this.rid);
      let res = await this.$http.post(`roles/${this.rid}/rights`,{roleId:this.rid,rids})
      console.log(res)
      this.$message({
        type:'success',
        message:'修改权限成功'
      })
      this.getRoleList()
      this.quanxianTable = false
    }







  },
  mounted(){
    this.getRoleList()
  }
}
</script scoped>

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
