<template>
  <el-container>
    <el-header>试卷分析系统</el-header>
    <el-container>
      <el-aside :width="aside">
        <el-menu :default-openeds="['1']" class="el-menu-vertical-demo" :collapse="isCollapse" router>
          <el-menu-item @click="handleCollapse">
            <i :class="icon"></i>
            <span slot="title">{{navText}}</span>
          </el-menu-item>
          <el-submenu v-for="nav in navigations" :key="nav" :index="nav.index">
            <template slot="title">
              <i :class="nav.icon"></i>
              <span slot="title">{{nav.title}}</span>
            </template>
            <el-menu-item v-for="item in nav.items" :key="nav" :index="item.index">{{item.title}}</el-menu-item>
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
      isCollapse: false,
      icon: 'el-icon-s-unfold',
      navText: '展开',
      aside: 200,
      navigations: [
        {
          'index': '1',
          'title': '试卷管理',
          'icon': 'el-icon-menu',
          'items': [
            {
              'index': '/',
              'title': '试卷管理'
            },
            {
              'index': '/',
              'title': '成绩管理'
            },
          ],
        },
        {
          'index': '2',
          'title': '试卷分析',
          'icon': 'el-icon-menu',
          'items':  [
            {
              'index': '/',
              'title': '整体分析'
            },
            {
              'index': '/',
              'title': '参数分析'
            },
            {
              'index': '/',
              'title': '难度分析'
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
