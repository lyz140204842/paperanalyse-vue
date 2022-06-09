<template id="main">

  <el-card id="card">

    <el-row> <!--搜索框-->
      <el-col :span="3">
        <el-select v-model="searchKey" @change="handleSearchKeyChange">
          <el-option label="教师号" value="tno" style="color: black;"></el-option>
          <el-option label="教师姓名" value="teacherName" style="color: black;"></el-option>
          <el-option label="课程号" value="cno" style="color: black;"></el-option>
          <el-option label="课程名称" value="courseName" style="color: black;"></el-option>
        </el-select>
      </el-col>

      <el-col :span="15">
        <el-input placeholder="请输入搜索内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </el-col>

      <el-col :span="3">
        <el-button icon="el-icon-refresh" @click="handleReset">刷新筛选</el-button>
      </el-col>

      <el-col :span="3">
        <el-button icon="el-icon-circle-plus-outline">新增教师授课</el-button>
      </el-col>
    </el-row>

    <el-divider></el-divider>

    <template>
      <el-table stripe border :header-cell-style="{background:'#409EFF',color:'#FFFFFF'}" :data="teachingCourses"
                ref="filterTable" style="font-size: medium;font-family: 楷体;" border>
        <el-table-column prop="teacherId" label="教师号" width="160" align="center" sortable></el-table-column>
        <el-table-column prop="courseId" label="课程号" width="160" sortable></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-tooltip class="item" content="编辑教师授课相关信息" placement="left" effect="light">
              <el-link icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-link>
            </el-tooltip>
            <template>
              <el-popconfirm icon="el-icon-info" icon-color="red" title="确定删除该教师授课的相关信息吗？"
                             @confirm="handleDelete(scope.row.teacherId)">
                <el-link icon="el-icon-delete" slot="reference">删除</el-link>
              </el-popconfirm>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </template>

  </el-card>
</template>

<script>
export default {
  name: "TeachingCourseManage",
  data() { // 页面所用数据
    return {
      searchKey: 'tno', // 查询字段
      searchContent: '', // 查询内容
      query: { // 查询条件
        tno: null, // 教师号
        teacherName: null, // 教师姓名
        cno: null, // 课程号
        courseNam: null, // 课程名称
        currentPage: 1, // 当前页
        pageSize: 5 // 页面记录数量
      },
      teachingCourses: [], // 从数据库中查询出来的授课数据
      pagination: {
        currentPage: 1,
        pageSize: 5,
        total: 0
      },
    }
  },
  methods: { // 页面所用方法
    handleSearchKeyChange() { // 当查询字段发生变化
      this.query.tno = null; // 发生变化后，对应的查询条件内容清空
      this.query.teacherName = null;
      this.query.cno = null;
      this.query.courseNam = null;
      this.setSearchContent();
    },
    setSearchContent() {
      switch (this.searchKey) { // 设置对应字段的查询内容
        case 'tno':
          this.query.tno = this.searchContent;
          break;
        case 'teacherName':
          this.query.teacherName = this.searchContent;
          break;
        case 'cno':
          this.query.cno = this.searchContent;
          break;
        case 'courseName':
          this.query.courseName = this.searchContent;
          break;
      }
    },
    handleSearch() { // 查找符合条件的信息
      this.setSearchContent();
      this.selectTeachingCourse();
    },
    handleReset() { // 重置查询条件
      this.searchContent = ''; // 输入框内容
      this.handleSearchKeyChange();
    },
    selectTeachingCourse() { // 查询数据库中的教师授课记录
      this.$axios.get("/teachingCourseDTO/selective", {
        params: this.query
      }).then((resp) => {
        console.log(resp)
        if (resp.data.code === 0) { // 说明查找成功
          this.pagination = resp.data.data;
          // this.teachers = this.pagination.data; // 赋值
        } else { // 说明查找不成功
          // this.teachers = []; // 清空数组
        }
      })
    },
  },
  mounted() { // 钩子函数
    this.selectTeachingCourse(); // 查询教师授课信息
  }
}
</script>

<style scoped>

#pagination {
  margin-top: 15px;
  text-align: center;
}

#card {
  width: 1200px;
  margin-left: 3%;
}

</style>
