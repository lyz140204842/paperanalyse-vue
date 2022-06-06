<template>
  <el-container>
    <el-header id="header">
        <div id="title">试卷分析系统-管理员</div>
    </el-header>

    <el-container>
      <el-aside width="200px" class="aside">
        <el-menu
          :default-openeds="opened"
          router
          class="el-menu-vertical-demo"
        >
          <el-submenu index="1">
            <template slot="title">
              <span>人员管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="TeacherBrowse">教师信息管理</el-menu-item>
              <el-menu-item index="StudentBrowse">学生信息管理</el-menu-item>
              <el-menu-item index="">班级信息管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <span>课程管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="">教师授课管理</el-menu-item>
              <el-menu-item index="">学生选课管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <span>学期事务管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="">学期管理</el-menu-item>
              <el-menu-item index="">课程管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>

      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>

    </el-container>

  </el-container>
</template>

<script>
export default {
  data() {
    return {
      opened: ["1", "2", "3"],
    };
  },
  methods: {}
}
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}

#header {
  width: 100%;
  background: #00BFFF;
}

#title{
  float: left;
  color: white;
  font-size: 40px;
  font-family: 华文楷体;
}

</style>
