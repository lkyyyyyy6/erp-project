<template>
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="myinput">
      <el-input placeholder="请输入内容" v-model="text" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
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
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="opt" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain></el-button>
          <el-button type="danger" icon="el-icon-delete" plain></el-button>
          <el-button type="success" icon="el-icon-check" plain></el-button>
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
      form: {
        name: "",
        pwd: "",
        email: "",
        phone: ""
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
          let token = localStorage.getItem('token');

          this.$http.post("users",{
            username:this.form.name,
            password:this.form.pwd,
            email:this.form.email,
            mobile:this.form.phone
          },
            { 
                headers: { Authorization: token } 
            }
            ).then(res => {
              // console.log(res);
              this.$message({
            message: "添加成功",
            type: "success"
          });
              this.dialogFormVisible = false
               this.getuserList()
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
    }
  },
  mounted() {
    this.getuserList();
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
