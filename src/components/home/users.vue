<template>
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="myinput">
      <el-input placeholder="请输入内容" v-model="text" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="searchuser"></el-button>
      </el-input>&nbsp;
      <el-button type="success" plain @click="dialogFormVisible = true">添加用户</el-button>
    </div>


    <!-- 提交表单 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="1200px">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="用户名(必填)" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码(必填)" :label-width="formLabelWidth" prop="pwd">
          <el-input v-model="form.pwd" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.prevent="adduser">提 交</el-button>
      </div>
    </el-dialog>


    <!-- 编辑表单 -->
    <el-dialog title="修改用户信息" :visible.sync="editTable" width="1200px">
      <el-form :model="form" ref="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editTable = false">取 消</el-button>
        <el-button type="primary" @click.prevent="edit(form.id)">修改</el-button>
      </div>
    </el-dialog>


    <!-- 角色分配 -->
    <el-dialog title="分配角色" :visible.sync="charaTable">
      <el-form :model="form">
        <el-form-item label="当前用户" :label-width="formLabelWidth">
          {{ form.name }}
        </el-form-item>
        <el-form-item label="请选择角色" :label-width="formLabelWidth">
          <el-select v-model="form.rid" placeholder="请选择">
            <!-- label设置文本，value设置option的value -->
            <el-option :value="-1" :label="'请选择'"></el-option>
            <el-option v-for="item in options" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="charaTable = false">取 消</el-button>
        <el-button type="primary" @click="postChara(form.id,form.rid)">修改角色</el-button>
      </div>
    </el-dialog>









    <el-table :data="tableData" style="width: 100%" :border="true" class="mytable">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态">
        <!--  
          slot-scope="scope"  scope就是当前行对应的数据源
        -->
        <template slot-scope="scope">
          <!-- {{ scope.row }} -->
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="statusChange(scope.row.id,scope.row.mg_state)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="opt" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain @click="getEditInfo(scope.row.id)"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain @click="deluser(scope.row.id)"></el-button>
          <el-button type="success" icon="el-icon-check" plain @click="charauser(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      text: "",
      dialogFormVisible: false,
      formLabelWidth: "120px",
      editTable: false,
      charaTable: false,
      options: [
        {id: 1, label: "深圳"},
        {id: 2, label: "广州"},
        {id: 3, label: "珠海"}
      ],
        
      
      form: {
        name: "",
        pwd: "",
        email: "",
        phone: "",
        id: "",
        rid:''
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      tableData: [
        {
          username: "111",
          email: "111",
          mobile: "222",
          mg_state: true
        }
      ]
    };
  },

  methods: {
    adduser() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // console.log('成功');
          let token = localStorage.getItem("token");

          this.$http
            .post(
              "users",
              {
                username: this.form.name,
                password: this.form.pwd,
                email: this.form.email,
                mobile: this.form.phone
              },
              {
                headers: { Authorization: token }
              }
            )
            .then(res => {
              // console.log(res);
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.dialogFormVisible = false;
              this.getuserList();
            });
        } else {
          this.$message({
            message: "请输入必填的信息",
            type: "warning"
          });
        }
      });
    },

    getuserList() {
      this.$http
        .get("users", {
          params: {
            pagenum: 1,
            pagesize: 10
          },
          headers: { Authorization: localStorage.getItem("token") }
        })
        .then(res => {
          // console.log(res);
          let { data, meta } = res.data;
          this.tableData = data.users;
        });
    },

    //搜索框
    async searchuser() {
      let res = await this.$http.get("users", {
        params: {
          query: this.text,
          pagenum: 1,
          pagesize: 10
        }
      });
      // console.log(res)
      this.tableData = res.data.data.users;
    },

    //根据id得到编辑用户的数据
    async getEditInfo(id) {
      this.editTable = true;
      let res = await this.$http.get(`users/${id}`);
      // console.log(res);
      this.form = {
        name: res.data.data.username,
        email: res.data.data.email,
        phone: res.data.data.mobile,
        id: res.data.data.id
      };
    },

    //提交编辑用户数据
    async edit(id) {
      let res = await this.$http.put(`users/${id}`, {
        id: this.form.id,
        email: this.form.email,
        mobile: this.form.phone
      });
      console.log(res);
      if (res.data.meta.status === 200) {
        this.$message({
          message: "更新成功",
          type: "success"
        });
        this.editTable = false;
        this.getuserList();
      } else {
        this.$message.error("出错啦");
      }
    },

    //删除用户
    deluser(id) {
      this.$confirm("删除用户?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        // console.log(id);
        let res = await this.$http.delete(`users/${id}`, id);
        // console.log(res);
        this.$message({
          type: "success",
          message: "删除成功"
        });
        this.getuserList();
      });
    },

    //改变用户状态
    async statusChange(id, status) {
      // console.log('改变');
      let res = await this.$http.put(`users/${id}/state/${status}`, {
        uId: id,
        type: status
      });
      // console.log(res);
      this.$message({
        type: "success",
        message: res.data.meta.msg
      });
    },

    //打开角色框框
    async charauser(id){
      this.charaTable = true
      let res = await this.$http.get(`users/${id}`,id)
      // console.log(res);
      this.form.id = res.data.data.id
      this.form.name = res.data.data.username
      this.form.rid = res.data.data.rid
      // console.log(this.form);
    },

    //分配角色
    async postChara(id,rid){
      let res = await this.$http.put(`users/${id}/role`,{
        id:id,
        rid:rid
      })
      // console.log(res);
      this.$message({
        type:'success',
        message:res.data.meta.msg
      })
      this.charaTable = false
    },



    //获取全部的角色列表
    async getAllChara(){
      let res = await this.$http.get('roles')
      console.log(res.data.data);
      this.options = res.data.data

    }
  },
  mounted() {
    this.getuserList()
    //一开始就加载下拉框中的数据
    this.getAllChara()
  }
};
</script>

<style scoped>
.mytable {
  line-height: 0px;
}
.myinput {
  margin-top: 15px;
  line-height: 40px;
  float: left;
}

.input-with-select {
  width: 350px;
}
</style>
