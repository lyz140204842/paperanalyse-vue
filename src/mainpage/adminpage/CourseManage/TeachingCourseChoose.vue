<template>

  <el-card id="card">
    <el-row> <!--搜索框-->
      <el-col :span="3">
        <el-select v-model="searchKey" @change="handleSearchKeyChange">
          <el-option label="课程号" value="cno" style="color: black;"></el-option>
          <el-option label="课程名称" value="courseName" style="color: black;"></el-option>
          <el-option label="教师号" value="tno" style="color: black;"></el-option>
          <el-option label="教师姓名" value="teacherName" style="color: black"></el-option>
          <el-option label="班级号" value="classId" style="color: black;"></el-option>
          <el-option label="班级名称" value="className" style="color: black"></el-option>
        </el-select>
      </el-col>

      <el-col :span="15">
        <el-input placeholder="请输入搜索内容" class="input-with-select" v-model="searchContent">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </el-col>

      <el-col :span="3">
        <el-button icon="el-icon-refresh" @click="handleReset">刷新筛选</el-button>
      </el-col>

      <el-col :span="3">
        <el-button icon="el-icon-circle-plus-outline" @click="handleInsert">新增授课</el-button>
      </el-col>
    </el-row>

    <el-divider></el-divider>

    <template>
      <el-table ref="singleTable" :data="teachingCourseDTO" style="font-size: medium;font-family: 楷体;">
        <el-table-column prop="cno" label="课程号" align="center" sortable></el-table-column>
        <el-table-column prop="courseName" label="课程名称"></el-table-column>
        <el-table-column prop="credit" label="课程学分"></el-table-column>
        <el-table-column prop="time" label="学时"></el-table-column>
        <el-table-column prop="term" label="学期" width="150px"></el-table-column>
        <el-table-column prop="tno" label="教师号"></el-table-column>
        <el-table-column prop="teacherName" label="教师姓名"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="classId" label="班级号"></el-table-column>
        <el-table-column prop="className" label="班级名称"></el-table-column>
      </el-table>

      <div id="pagination">
        <el-pagination @size-change="handlePageSizeChange" @current-change="handleCurrentPageChange"
                       :current-page="pagination.currentPage" :page-sizes="[5, 10, 15, 20,50,100]"
                       :page-size="pagination.pageSize"
                       :total="pagination.total" layout="total, sizes, prev, pager, next, jumper" background>
        </el-pagination>
      </div>
    </template>

    <el-dialog title="新增授课" :visible.sync="dialogInsert" width="30%">
      <el-form :inline="true" label-position="right" label-width="120px" :model="teachingCourse">
        <el-form-item label="课程：">
          <el-select style="width: 300px" v-model="teachingCourse.cno">
            <el-option v-for="temp in courses" :label="temp.name" :value="temp.cno" :key="temp.cno"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级：">
          <el-select style="width: 300px" v-model="teachingCourse.classId">
            <el-option v-for="temp in classes" :label="temp.name" :value="temp.id" :key="temp.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教师：">
          <el-select style="width: 300px" v-model="teachingCourse.tno">
            <el-option v-for="temp in teachers" :label="temp.name" :value="temp.tno" :key="temp.tno"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogInsert = false">取 消</el-button>
        <el-button type="primary" @click="insertMessage">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>

</template>

<script>
export default {
  name: "TeachingCourseChoose",
  data() {
    return {
      searchKey: 'cno', // 查询字段
      searchContent: '', // 查询内容
      query: { // 查询条件
        cno: null, // 课程号
        courseName: null, // 课程名称
        tno: null, // 教师号
        teacherName: null, // 教师名称
        classId: null, // 班级号
        className: null, // 班级姓名
        currentPage: 1, // 当前页
        pageSize: 5 // 页面记录数量
      },
      pagination: { // 分页工具
        currentPage: 1,
        pageSize: 5,
        total: 0
      },
      teachers:[], // 所有老师
      classes:[], // 所有班级
      courses:[], // 所有课程
      teachingCourseDTO: [], // 从数据库中查询出来的授课信息
      dialogInsert: false, // 插入授课信息
      teachingCourse:{
        cno:null,
        tno:null,
        classId:null
      }, // 需要插入的授课信息
    }
  },
  methods: {
    handleSearchKeyChange() { // 当查询字段发生变化
      this.query.cno = null; // 发生变化后，对应的查询条件内容清空
      this.query.courseName = null;
      this.query.tno = null;
      this.query.teacherName = null;
      this.query.classId = null;
      this.query.className = null;
      this.setSearchContent();
    },
    setSearchContent() {
      switch (this.searchKey) { // 设置对应字段的查询内容
        case 'cno':
          this.query.cno = this.searchContent;
          break;
        case 'courseName':
          this.query.courseName = this.searchContent;
          break;
        case 'tno':
          this.query.tno = this.searchContent;
          break;
        case 'teacherName':
          this.query.teacherName = this.searchContent;
          break;
        case 'classId':
          this.query.classId = this.searchContent;
          break;
        case 'className':
          this.query.className = this.searchContent;
          break;
      }
    },
    handleReset() { // 重置查询条件
      this.searchContent = ''; // 输入框内容
      this.handleSearchKeyChange(); // 清空输入内容
      this.selectTeachingCourseDTO();
    },
    handleSearch() { // 查找符合条件的信息
      this.setSearchContent();
      this.selectTeachingCourseDTO();
    },
    handlePageSizeChange(val) { //当界面显示数据条数发生变化
      this.query.pageSize = val;
    },
    handleCurrentPageChange(val) { //当页面页数发生变化
      this.query.currentPage = val;
      this.selectTeachingCourseDTO();
    },
    handleInsert() { // 显示增加授课信息的界面
      this.handleSearchKeyChange();
      this.selectTeacher();
      this.selectCourse();
      this.selectClasses();
      this.dialogInsert = true;
    },
    insertMessage() { // 插入弹框
      this.$confirm("授课信息无法更改，请检查输入信息是否无误，是否继续？", "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.insertSelectingCourse();
      })
    },
    selectTeachingCourseDTO() { // 查询数据库中的授课记录
      this.teachingCourseDTO = []; // 清空记录
      this.$axios.get("/teachingCourseDTO/selective",{
          params:this.query
      }).then((resp) => {
        // console.log(resp)
        if (resp.data.code === 0) { // 说明查找成功
          this.teachingCourseDTO = resp.data.data.data;
        }
      })
    },
    selectTeacher() { // 查询数据库中的教师记录
      this.$axios.get("/teacher/select", {
        params: this.query
      }).then((resp) => {
        // console.log(resp)
        if (resp.data.code === 0) { // 说明查找成功
          this.teachers = resp.data.data.data; // 赋值
          console.log(this.teachers);
        } else { // 说明查找不成功
          this.teachers = []; // 清空数组
        }
      })
    },
    selectClasses() { // 查询数据库中的班级记录
      this.$axios.get("/classes/select", {
        params: this.query
      }).then((resp) => {
        // console.log(resp)
        if (resp.data.code === 0) { // 说明查找成功
          this.classes = resp.data.data.data; // 赋值
          console.log(this.classes);
        } else { // 说明查找不成功
          this.classes = []; // 清空数组
        }
      })
    },
    selectCourse() { // 查询数据库中的课程记录
      this.$axios.get("/course/select", {
        params: this.query
      }).then((resp) => {
        // console.log(resp)
        if (resp.data.code === 0) { // 说明查找成功
          this.courses = resp.data.data.data; // 赋值
          console.log(this.courses)
        } else { // 说明查找不成功
          this.courses = []; // 清空数组
        }
      })
    },
    insertSelectingCourse() { // 插入授课记录
      this.$axios.post("/teachingCourse/insert",
        this.$qs.stringify(this.teachingCourse)
      ).then((resp) => {
        // console.log(resp)
        if (resp.data.code === 0) { // 说明添加教师信息成功
          this.$message({
            message: '增加授课成功！',
            type: 'success'
          });
          this.teachingCourse.tno = null;
          this.teachingCourse.cno = null;
          this.teachingCourse.classId = null; // 插入成功后将插入对象中的属性置空
          this.selectTeachingCourseDTO(); // 查找教师授课信息
        } else { // 说明添加教师信息不成功
          this.$message.error("增加失败，请检查输入")
        }
      });
      this.dialogInsert = false; // 设置插入弹框为可见
    }
  },
  mounted() {
    this.selectTeachingCourseDTO();
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
  margin-left: 7%;
}

</style>
