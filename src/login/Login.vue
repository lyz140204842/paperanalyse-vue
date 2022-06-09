<template>
  <div class="login-box">
    <el-card class = "box-card">
      <div slot = "header" class = "clearfix">
        <span>用户登录</span>
      </div>
      <div>
        <span class = "err">{{error}}</span>
        <el-form :model= "ruleForm" label-width="100px" class = "demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop = "pass">
            <el-input type = "password" v-model="ruleForm.pass"></el-input>
          </el-form-item>
          <el-radio v-model="userType" label="1">管理员</el-radio>
          <el-radio v-model="userType" label="2">教师</el-radio>
          <el-form-item>
            <el-button type = "primary" @click = "submitForm()">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default{
  data(){
    return {
      ruleForm:{
        username:'',
        pass:''
      },
      userType: '',
      error:'',
      query: { // 查询条件
        tno: null, // 教师号
        name: null, // 教师姓名
        currentPage: 1, // 当前页
        pageSize: 5 // 页面记录数量
      },
      teachers: [],//从数据库中查询出来的教师数据
      query1: { // 查询条件
        mno: null, // 管理员账号
        name: null, // 管理员姓名
        currentPage: 1, // 当前页
        pageSize: 5 // 页面记录数量
      },
      managers: [],// 从数据库中查询出来的管理员数据
      pagination: {
        currentPage: 1,
        pageSize: 5,
        total: 0
      },
    }
  },
  methods:{
    submitForm(){
      var flag = false;
      if (this.userType == 1) {
        for(let i=0;i<this.managers.length;i++){
          if(this.managers[i].mno == (this.ruleForm.username-'0') && this.managers[i].password == this.ruleForm.pass){
            flag = true;
            this.$router.push('/AdminMain');
            break;
          }
        }
        if(!flag){
          this.error = '用户名或密码错误';
        }

      } else if(this.userType == 2) {
        for(let i=0;i<this.teachers.length;i++){
          if(this.teachers[i].tno == (this.ruleForm.username-'0') && this.teachers[i].password == this.ruleForm.pass){
            flag = true;
            this.$router.push('/TeacherMain');
            break;
          }
        }
        if(!flag){
          this.error = '用户名或密码错误';
        }
      }else{
        this.error = '用户名或密码错误';
      }
    },
    selectTeacher() { // 查询数据库中的教师记录
      this.$axios.get("/teacher/select", {
        params: this.query
      }).then((resp) => {
        // console.log(resp)
        if (resp.data.code === 0) { // 说明查找成功
          this.pagination = resp.data.data;
          this.teachers = this.pagination.data; // 赋值
        } else { // 说明查找不成功
          this.teachers = []; // 清空数组
        }
      })
    },
    selectManager() { // 查询数据库中的教师记录
      this.$axios.get("/manager/select", {
        params: this.query1
      }).then((resp) => {
        // console.log(resp)
        if (resp.data.code === 0) { // 说明查找成功
          this.pagination = resp.data.data;
          this.managers = this.pagination.data; // 赋值
        } else { // 说明查找不成功
          this.managers = []; // 清空数组
        }
      })
    }
  },
  mounted() { // 钩子函数
    this.selectTeacher(); // 查询教师授课信息
    this.selectManager();
  }
}

</script>

<style>
*{
  margin:0 auto;
}

.login-box {
  display: flex;
  width: 100%;
  height: 500px;
  padding-top: 150px;
  background-size: 100%;
  flex-direction: column;
  align-items: center;
}
.err{
  color:#f00;
}
</style>
