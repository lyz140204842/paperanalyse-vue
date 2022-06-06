<template>
  <el-container>
    <el-header>试卷分析系统基础数据管理</el-header>

    <el-container>
      <el-aside width="200px" class="aside">
        <el-menu
          :default-openeds="openeds"
          :default-active="$router.path"
          router
          class="el-menu-vertical-demo"
        >
          <el-submenu index="1">
            <template slot="title">
              <span>人员管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="TeacherBrowse" >教师信息管理</el-menu-item>
              <el-menu-item index="StudentBrowse">学生信息管理</el-menu-item>
              <el-menu-item index="">班级信息管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <span>课程管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="" >教师授课管理</el-menu-item>
              <el-menu-item index="" >学生选课管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <span>学期事务管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="" >学期管理</el-menu-item>
              <el-menu-item index="" >课程管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>

        <el-main>
          <router-view></router-view>
        </el-main>

      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      icon: 'el-icon-s-unfold',
      navText: '展开',
      aside: 200,
      navigations: [
        {
          'index': '1',
          'title': '人员管理',
          'icon': 'el-icon-menu',
          'items': [
            {
              'index': '/',
              'title': '教师信息管理'
            },
            {
              'index': '/',
              'title': '学生信息管理'
            },
            {
              'index': '/',
              'title': '班级信息管理'
            },
          ],
        },
        {
          'index': '2',
          'title': '课程管理',
          'icon': 'el-icon-menu',
          'items':  [
            {
              'index': '/',
              'title': '教师授课管理'
            },
            {
              'index': '/',
              'title': '学生选课管理'
            },
          ],
        },
        {
          'index': '3',
          'title': '学期事务管理',
          'icon': 'el-icon-menu',
          'items':[
            {
              'index': '/',
              'title': '学期管理'
            },
            {
              'index': '/',
              'title': '课程管理'
            },
          ],
        },
      ],
    };
  },
  methods: {
    // 导航收缩与展开
    handleCollapse() {
      if (this.isCollapse) {
        this.icon = 'el-icon-s-fold';
        this.isCollapse = false;
        this.navText = '收起';
      } else {
        this.icon = 'el-icon-s-unfold';
        this.isCollapse = true;
        this.navText = '展开';
      }
    },
    handleChange() {
      // this.$router.push("/TeacherBrowse")
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.el-header {
  background-color: #1fafe4;
  color: #fff;
  line-height: 60px;
  width: 100%;
}

.el-aside {
  overflow: hidden;
}
</style>
