<template id="main">

  <el-card id="card">

    <el-row> <!--搜索框-->
      <el-col :span="3">
        <el-select v-model="searchKey" @change="handleSearchKeyChange">
          <el-option label="课程号" value="cno" style="color: black;"></el-option>
          <el-option label="课程名称" value="courseName" style="color: black;"></el-option>
        </el-select>
      </el-col>

      <el-col :span="18">
        <el-input placeholder="请输入搜索内容" class="input-with-select" v-model="searchContent">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </el-col>

      <el-col :span="3">
        <el-button icon="el-icon-refresh" @click="handleReset">刷新筛选</el-button>
      </el-col>

    </el-row>

    <el-divider></el-divider>

    <template>
      <el-table ref="singleTable" :data="courseDTO" style="font-size: medium;font-family: 楷体;">
        <el-table-column prop="cno" label="课程号" align="center" sortable></el-table-column>
        <el-table-column prop="name" label="课程名称"></el-table-column>
        <el-table-column prop="credit" label="学分"></el-table-column>
        <el-table-column prop="time" label="学时"></el-table-column>
        <el-table-column prop="term" label="学期"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="medium" @click="handleBrowse(scope.row)">查看</el-button>
            <el-button type="text" size="medium" @click="handleInsert(scope.row)">选课</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div id="pagination">
        <el-pagination @size-change="handlePageSizeChange" @current-change="handleCurrentPageChange"
                       :current-page="pagination.currentPage" :page-sizes="[5, 10, 15, 20,50,100]"
                       :page-size="pagination.pageSize"
                       :total="pagination.total" layout="total, sizes, prev, pager, next, jumper" background>
        </el-pagination>
      </div>
    </template>

    <el-dialog title="已选班级" :visible.sync="dialogBrowse" width="30%">
      <el-table ref="singleTable" :data="selectingCourseDTO" style="font-size: medium;font-family: 楷体;">
        <el-table-column prop="classId" label="班级号" align="center" sortable></el-table-column>
        <el-table-column prop="name" label="班级名称"></el-table-column>
        <el-table-column prop="gradeFile" label="成绩"></el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogBrowse = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="选修课程" :visible.sync="dialogInsert" width="30%">
      <el-form :inline="true" label-position="right" label-width="120px" :model="selectingCourse">
        <el-form-item label="课程号：">
          <el-input v-model="selectingCourse.cno" style="width: 300px" disabled></el-input>
        </el-form-item>
        <el-form-item label="班级号：">
          <el-select style="width: 300px" v-model="selectingCourse.classId">
            <el-option v-for="temp in classes" :label="temp.name" :value="temp.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogInsert = false">取 消</el-button>
        <el-button type="primary" @click="insertSelectingCourse">确 定</el-button>
      </span>
    </el-dialog>

  </el-card>
</template>

<script>
export default {
  name: "SelectingCourseChoose",
  data() {
    return {
      searchKey: 'cno', // 查询字段
      searchContent: '', // 查询内容
      query: { // 查询条件
        cno: null, // 课程号
        name: null, // 课程名称
        currentPage: 1, // 当前页
        pageSize: 5 // 页面记录数量
      },
      courseDTO: [], // 从数据库中查询出来的课程信息
      pagination: { // 分页工具
        currentPage: 1,
        pageSize: 5,
        total: 0
      },
      selectingCourseDTO: [], // 从数据库中查询出来的选课信息
      cno: null, // 查询的cno
      dialogBrowse: false, // 查看选课
      dialogInsert: false, // 选修课程
      classes:[], // 查找不在cno中的课程
      selectingCourse:{ // 插入选课信息
        cno:null,
        classId:null
      }
    }
  },
  methods: {
    handleSearchKeyChange() { // 当查询字段发生变化
      this.query.cno = null; // 发生变化后，对应的查询条件内容清空
      this.query.name = null;
      this.setSearchContent();
    },
    setSearchContent() {
      switch (this.searchKey) { // 设置对应字段的查询内容
        case 'cno':
          this.query.cno = this.searchContent;
          break;
        case 'name':
          this.query.name = this.searchContent;
          break;
      }
    },
    handleSearch() { // 查找符合条件的信息
      this.setSearchContent();
      this.selectCourseDTO();
    },
    handleReset() { // 重置查询条件
      this.searchContent = ''; // 输入框内容
      this.query.cno = null; // 查询条件中的教师号
      this.query.name = null; // 查询条件中的教师姓名
      this.selectCourseDTO();
    },
    handlePageSizeChange(val) { //当界面显示数据条数发生变化
      this.query.pageSize = val;
    },
    handleCurrentPageChange(val) { //当页面页数发生变化
      this.query.currentPage = val;
      this.selectCourseDTO();
    },
    handleBrowse(val) { // 查看选课信息
      this.cno = val.cno;
      this.selectSelectingCourseDTO();
      this.dialogBrowse = true;
    },
    handleInsert(val) { // 插入选课信息
      this.cno = val.cno;
      this.selectingCourse.cno = val.cno;
      this.selectClasses();
      this.dialogInsert = true;
    },
    selectCourseDTO() { // 查询数据库中的教师记录
      this.$axios.get("/courseDTO/selective", {
        params: this.query
      }).then((resp) => {
        // console.log(resp)
        if (resp.data.code === 0) { // 说明查找成功
          this.pagination = resp.data.data;
          this.courseDTO = this.pagination.data; // 赋值
        } else { // 说明查找不成功
          this.courseDTO = []; // 清空数组
        }
      })
    },
    selectSelectingCourseDTO() { // 查询数据库中的选课记录
      this.selectingCourseDTO = []; // 清空记录
      this.$axios.get("/selectingCourseDTO/selective",{
        params: {cno:this.cno}
      }).then((resp) => {
        console.log(resp)
        if (resp.data.code === 0) { // 说明查找成功
          this.selectingCourseDTO = resp.data.data;
        }
      })
    },
    selectClasses() { // 查询数据库中的班级
      this.classes = []; // 清空内容
      this.$axios.get("/classes/selectNotInCourse",{
        params: {cno:this.cno}
      }).then((resp) => {
        console.log(resp)
        if (resp.data.code === 0) { // 说明查找成功
          this.classes = resp.data.data;
        }
      })
    },
    insertSelectingCourse() { // 插入选课记录
      this.$axios.post("/selectingCourse/insert",
        this.$qs.stringify(this.selectingCourse)
      ).then((resp) => {
        if (resp.data.code === 0) { // 说明添加选课成功
          console.log(resp)
          this.$message({
            message: '选课成功成功！',
            type: 'success'
          });
        } else { // 说明添加选课失败
          this.$message.error("选课失败，系统运行出错")
        }
      })
      this.dialogInsert = false
    }
  },
  mounted() {
    this.selectCourseDTO(); // 查询教师信息
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
