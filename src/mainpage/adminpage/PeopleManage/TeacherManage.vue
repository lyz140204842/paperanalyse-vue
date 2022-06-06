<template id="main">

  <el-card id="card">

    <el-row> <!--搜索框-->
      <el-col :span="18">
        <el-input placeholder="请输入搜索内容" class="input-with-select" v-model="searchContent">
          <!--          <el-select slot="prepend" v-model="searchKey" @change="handleSearchKeyChange">-->
          <!--            <el-option label="教师号" value="tno" style="color: black;"></el-option>-->
          <!--            <el-option label="教师姓名" value="name" style="color: black;"></el-option>-->
          <!--          </el-select>-->
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
      <el-table ref="singleTable" :data="teachers" style="font-size: medium;font-family: 楷体;">
        <el-table-column prop="tno" label="教师号" align="center" width="100" sortable></el-table-column>
        <el-table-column prop="name" label="教师姓名" width="100"></el-table-column>
        <el-table-column prop="password" label="密码" width="100"></el-table-column>
        <el-table-column prop="gender" label="性别" width="60"></el-table-column>
        <el-table-column prop="birthday" label="出生日期"></el-table-column>
        <el-table-column prop="phone" label="电话号码"></el-table-column>
        <el-table-column prop="email" label="邮箱地址"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="medium">删除</el-button>
            <el-button type="text" size="medium">修改</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div id="pagination">
        <el-pagination @size-change="handlePageSizeChange" @current-change="handleCurrentPageChange"
                       :current-page="pagination.currentPage" :page-sizes="[5, 10, 15, 20,50,100]" :page-size="pagination.pageSize"
                       :total="pagination.total" layout="total, sizes, prev, pager, next, jumper" background>
        </el-pagination>
      </div>
    </template>

  </el-card>
</template>

<script>
export default {
  name: "TeacherManage",
  data() { // 页面所用数据
    return {
      searchKey: '教师号', // 查询字段
      searchContent: '', // 查询内容
      query: { // 查询条件
        tno: '', // 教师号
        name: '', // 教师姓名
        currentPage: 1, // 当前页
        pageSize: 5 // 页面记录数量
      },
      teachers: [
        {
          tno: 1,
          name: "张三",
          password: "***",
          gender: "男",
          birthday: "2001-05-14",
          phone: "123456",
          email: "12314534r5234",
        }
      ],// 从数据库中查询出来的教师数据
      pagination: {
        currentPage: 1,
        pageSize: 5,
        total: 0
      },
    }
  },
  methods: { // 页面所用方法
    handleSearchKeyChange() { // 当查询字段发生变化
      this.query.tno = ''; // 发生变化后，对应的查询条件内容清空
      this.query.name = '';
      switch (this.searchKey) { // 选择查询的是
        case 'tno':
          this.query.tno = this.searchContent;
          break;
        case 'name':
          this.query.name = this.searchContent;
          break;
      }
    },
    handlePageSizeChange(val) { //当界面显示数据条数发生变化
      this.query.pageSize = val;
    },
    handleCurrentPageChange(val) { //当页面页数发生变化
      this.query.currentPage = val;
    },
    selectTeacher() { // 查询数据库中的教师记录
      this.$axios.get("/teacher/select").then((resp) => {
        console.log(resp)
      })
    }
  },
  mounted() { // 查询教师信息
    // this.selectTeacher();
  }
}
</script>

<style scoped>

#pagination {
  margin-top: 15px;
  text-align: center;
}

#card {
  width: 1000px;
  margin-left: 15%;
}

</style>
