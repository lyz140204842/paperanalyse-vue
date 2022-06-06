<template>

  <el-card>

    <el-row> <!--搜索框-->
      <el-col :span="18">
        <el-input placeholder="请输入搜索内容" class="input-with-select" v-model="searchContent">
          <el-select placeholder="请选择" slot="prepend" v-model="searchKey" @change="handleSearchKeyChange">
            <el-option label="教师号" value="tno" style="color: black;"></el-option>
            <el-option label="教师姓名" value="name" style="color: black;"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="3">
        <el-button icon="el-icon-refresh">刷新筛选</el-button>
      </el-col>
      <el-col :span="3">
        <el-button icon="el-icon-circle-plus-outline">新增教师</el-button>
      </el-col>
    </el-row>

    <el-divider></el-divider>

    <template>
      <el-table stripe border :header-cell-style="{background:'#409EFF',color:'#FFFFFF'}" :data="teachers" ref="filterTable" style="font-size: medium;font-family: 楷体;" border>
        <el-table-column prop="tno" label="教师号" width="200" align="center" sortable></el-table-column>
        <el-table-column prop="name" label="教师姓名" width="230"></el-table-column>
        <el-table-column prop="password" label="密码" width="200"></el-table-column>
        <el-table-column prop="gender" label="性别" width="200"></el-table-column>
        <el-table-column prop="birthday" label="出生日期" width="200"></el-table-column>
        <el-table-column prop="phone" label="电话号码" width="200"></el-table-column>
        <el-table-column prop="email" label="邮箱地址" width="200"></el-table-column>
        <el-table-column label="操作" fixed="right" width="150"></el-table-column>
      </el-table>
    </template>

  </el-card>
</template>

<script>
export default {
  name: "TeacherManage",
  data() { // 页面所用数据
    return {
      searchKey: '', // 查询字段
      searchContent: '', // 查询内容
      query: { // 查询条件
        tno: '', // 教师号
        name: '', // 教师姓名
        currentPage: 1, // 当前页
        pageSize: 5 // 页面记录数量
      },
      teachers: {}, // 从数据库中查询出来的教师数据
      genderFilters: [{ // 性别过滤器
        text: '男',
        value: '男'
      }, {
        text: '女',
        value: '女'
      }],
    }
  },
  methods: { // 页面所用方法
    handleSearchKeyChange() { // 当查询字段发生变化
      this.query.tno = ''; // 发生变化后，对应的查询条件内容清空
      this.query.name = '';
      switch (this.searchKey) { // 选择查询的是
        case 'tno': this.query.tno = this.searchContent; break;
        case 'name': this.query.name = this.searchContent; break;
      }
    }
  }
}
</script>

<style scoped>

</style>
