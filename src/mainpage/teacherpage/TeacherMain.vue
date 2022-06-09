<template>
  <el-container>
    <el-header id="header" height="80px">
      <div id="title">试卷分析系统-教师</div>
    </el-header>

    <el-container>
      <el-aside width="250px">
        <el-menu router class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span class="menu">试卷管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item class="submenu" index="PaperBrowse">试卷管理</el-menu-item>
              <el-menu-item class="submenu" index="">成绩管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span class="menu">试卷分析</span>
            </template>
            <el-menu-item-group>
              <el-menu-item class="submenu" index="PaperAnalyseResult">整体分析</el-menu-item>
              <el-menu-item class="submenu" index="">参数分析</el-menu-item>
              <el-menu-item class="submenu" index="PictureTest">图表测试</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span class="menu">系统设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item class="submenu" index="">个人信息</el-menu-item>
              <el-menu-item class="submenu" index="">退出登录</el-menu-item>
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
    return {};
  },
  methods: {
  }
}
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}

#header { /*顶部*/
  width: 100%;
  background: #00BFFF;
}

.menu { /*侧边导航*/
  font-size: 18px;
  font-family: 黑体;
}

.submenu { /*侧边导航子选项*/
  font-size: 16px;
}

#title{
  float: left;
  color: white;
  font-size: 40px;
  line-height: 80px;
  font-family: 华文楷体;
}

</style>
