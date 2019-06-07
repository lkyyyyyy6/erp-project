<template>
 <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item> 
    </el-breadcrumb>
     
     <el-alert
    title="添加商品信息"
    type="info"
    center
    show-icon
    class="myalert">
    </el-alert>

  <el-steps :active="active" finish-status="success" align-center class="mysteps">
  <el-step title="步骤 1"></el-step>
  <el-step title="步骤 2"></el-step>
  <el-step title="步骤 3"></el-step>
  <el-step title="步骤 4"></el-step>
  <el-step title="步骤 5"></el-step>
</el-steps>

 <el-tabs  @tab-click="handleClick" tab-position="left">

    <el-tab-pane label="基本信息" name="first">

      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="商品名称"  prop="goods_name">
          <el-input v-model="form.goods_name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="商品价格"  prop="goods_price">
          <el-input v-model="form.goods_price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="商品重量" prop="goods_weight">
          <el-input v-model="form.goods_weight" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="商品数量" prop="goods_number" >
          <el-input v-model="form.goods_number" autocomplete="off"></el-input>
        </el-form-item>

      <el-form-item>
            <!-- 级联选择器 -->
            {{ value }}
          <el-cascader
            clearable
            v-model="value"
              :options="options"
              class="mycascader"
              :props="props"
            ></el-cascader>
      </el-form-item>
      </el-form>
    </el-tab-pane>

    <el-tab-pane label="商品参数" name="second" class="second">
      <div v-for="(item,index) in manyList" :key="index" >
        <span>{{ item.attr_name }}</span>
        <div  v-for="(item1,index1) in item.attr_vals.split(',')" :key="index1">
            <el-checkbox v-model="checked" :label='item1' border ></el-checkbox>
        </div>
      </div>
      </el-tab-pane>

    <el-tab-pane label="商品属性" name="third">

      <div v-for="(item,index) in onlyList" :key="index" class="mydiv">
        <h4>{{ item.attr_name }}</h4>
        <div v-for="(item1,index1) in item.attr_vals.split(',')" :key="index1">
            <el-input  class="input-with-select" :value="item1"></el-input>
        </div>
      </div>
      </el-tab-pane>

    <el-tab-pane label="商品图片" name="fourth">
      <!-- 
        :on-preview="handlePreview"
        :on-remove="handleRemove"
       -->
      <el-upload
      class="upload-demo"
      action="http://localhost:8888/api/private/v1/upload"
      :file-list="filelist"
      :headers='uploadhead'
      :on-success	="handleSuccess"
      :on-remove="handleRemove"
      list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          {{ filelist}}
    </el-tab-pane>

    <el-tab-pane label="商品内容" name="fifth">
      <el-button size="small" type="primary" @click="post">提交商品</el-button>
      <quill-editor></quill-editor>
    </el-tab-pane>
  </el-tabs>
 </el-card>
</template>

<script>
export default {
  data() {
    return {
      active:0,
      form: {
        goods_name: "",
        goods_price: "",
        goods_weight: "",
        goods_number: "",
      },
      rules:{
        goods_name:[{required: true, message: '商品名不能为空'}],
        goods_price:[{required: true, message: '商品价格不能为空'}],
        goods_weight:[{required: true, message: '商品重量不能为空'}],
        goods_num:[{required: true, message: '商品数量不能为空'}],
      },
      value:[1,3,6], //下拉框选中的数据
      options:[],
      props:{
        label:'cat_name',
        value:'cat_id'
      },
      manyList:[], //商品参数list
      onlyList:[], //商品属性list
      checked: true,



      filelist:[], //接受的是个对象
        uploadhead:{
          Authorization:  localStorage.getItem('token')
        }
    }
  },
  methods:{

     handleClick(tab, event) {
        // console.log(tab.index) //下标
        this.active = +tab.index //得到字符串，隐式转换
        if(this.active!=0){  //不是基本信息
          // console.log('111');
          // console.log(this.value.length);
          if(this.value.length === 0){
            this.$message.error('请选择商品分类')
            return
          }else{
          let sel = this.active==1?'many':'only'  //点击第二个与第一个请求的数据不同
          this.$http.get(`categories/${this.value[this.value.length-1]}/attributes?sel=${sel}`)
            .then((res)=>{
              let{meta,data} = res.data
              sel === 'many' ? this.manyList = data : this.onlyList = data
              console.log(this.manyList,this.onlyList)
            })
        }
        }
      },

      //获取级联选择器下拉框的数据
      async getoptionsList(){
        let res = await this.$http.get(`categories?tyep=3`)
        // console.log(res.data)
        this.options = res.data.data
      },


      //图片上传成功
      handleSuccess(res, file, fileList){
        // console.log(fileList)
          this.filelist.push({
            name:res.data.tmp_path,
            url:res.data.url
          })   
      },
      //点击删除图片
      handleRemove(file, fileList){
        console.log(file)
        // console.log(fileList)
        for(var i = 0;i < this.filelist.length;i++){
          if(this.filelist[i].name === file.name){
            // console.log('111');
            this.filelist.splice(i,1)
          }
        }
        // console.log(this.filelist);
      },
      //提交商品
      async post(){
        let goodObj = {
          goods_name:this.form.goods_name,
          goods_number:this.form.goods_number,
          goods_price:this.form.goods_price,
          goods_weight:this.form.goods_weight,
          goods_cat:this.value.join(',')
        }
        // console.log(this.value);
        // console.log(goodObj);
        let res = await this.$http.post('goods',goodObj)
        // console.log(res);
        this.$message({
          type:'success',
          message:'商品创建成功'
        })
        this.$router.push('/goods')
  }

  },
  
  mounted(){
    this.getoptionsList()
  }
}
</script>

<style scoped>
  .myalert{
    margin-top: 10px;
    line-height: 0px;
  }
  .mysteps{
    line-height: 0px;
    margin-top: 10px;
  }

  .second{
    line-height: 30px;
  }
  .mydiv{
    margin-top: 30px; 
  }
 
</style>
