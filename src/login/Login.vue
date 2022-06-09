<template>
  <div class="login-box">
    <el-card class = "box-card">
      <div slot = "header" class = "clearfix">
        <span>用户登录</span>
      </div>
      <div>
        <span class = "err">{{error}}</span>
        <el-form :model= "ruleForm" label-width="100px" class = "demo-ruleForm">
          <el-form-item label="用户名">
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
      error:''
    }
  },
  methods:{
    submitForm(){
      if (this.userType == 1) {
        this.$router.push('/AdminMain');
      } else {
        this.$router.push('/TeacherMain');
      }
      // if (this.ruleForm.username == "admin" && this.ruleForm.pass == "123"){
      //   this.$router.push('/AdminMain');
      // }
      // else if (this.ruleForm.username == "tea" && this.ruleForm.pass == "123"){
      //   this.$router.push('/TeacherMain');
      // }
      // else{
      //   this.error = '用户名或密码错误';
      // }
    }
  }
}

</script>

<style>
*{
  margin:0 auto;
  /*padding:0 auto;*/
}
/*  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    height: 800px;
    background-image: url("../assets/logo.png");
    background-size: cover;
  } */

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
