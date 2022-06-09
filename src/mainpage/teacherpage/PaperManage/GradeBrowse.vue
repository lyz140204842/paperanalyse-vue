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
      <el-table ref="singleTable" :data="papers" style="font-size: medium;font-family: 楷体;">
        <el-table-column prop="tno" label="教师号" sortable></el-table-column>
        <el-table-column prop="teacherName" label="教师姓名"></el-table-column>
        <el-table-column prop="cno" label="课程号" width="100" sortable></el-table-column>
        <el-table-column prop="courseName" label="课程名称"></el-table-column>
        <el-table-column prop="term" label="学期信息" sortable></el-table-column>
        <el-table-column prop="classId" label="班级号" sortable></el-table-column>
        <el-table-column prop="className" label="班级名"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="medium" @click="handleUpload(scope.row)">上传成绩</el-button>
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

    <el-dialog title="上传文件" :visible.sync="dialogInsert" width="30%">
      <el-form :inline="true" label-position="right" label-width="120px" :model="curPaper">
        <el-form-item label="课程名：">
          <el-input style="width: 300px" v-model="curPaper.courseName" disabled></el-input>
        </el-form-item>
        <el-form-item label="班级名：">
          <el-input style="width: 300px" v-model="curPaper.className" disabled></el-input>
        </el-form-item>
        <el-form-item label="教师名：">
          <el-input style="width: 300px" v-model="curPaper.teacherName" disabled></el-input>
        </el-form-item>
        <el-form-item label="上传文件：">
          <input style="width: 300px" type="file" ref="input" @input="handleChange"></input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogInsert = false">取 消</el-button>
        <el-button type="primary" @click="upload">确 定</el-button>
      </span>
    </el-dialog>

  </el-card>

</template>

<script>
export default {
  name: "GradeBrowse",
  data() { // 页面所用数据
    return {
      searchKey: 'tno', // 查询字段
      searchContent: '', // 查询内容
      query: { // 查询条件
        tno: null, // 教师号
        teacherName: null, // 教师姓名
        cno: null, // 课程号
        courseName: null, // 课程名称
        currentPage: 1, // 当前页
        pageSize: 5 // 页面记录数量
      },
      papers: [],// 从数据库中查询出来的试卷数据
      pagination: {
        currentPage: 1,
        pageSize: 5,
        total: 0
      },
      curPaper: {}, // 当前的试卷
      dialogInsert: false,
      file: null,
    }
  },
  methods: { // 页面所用方法
    handleSearchKeyChange() { // 当查询字段发生变化
      this.query.tno = null; // 发生变化后，对应的查询条件内容清空
      this.query.teacherName = null;
      this.query.cno = null;
      this.query.courseName = null;
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
      this.selectPaper();
    },
    handleReset() { // 重置查询条件
      this.searchContent = ''; // 输入框内容
      this.query.tno = null; // 查询条件中的教师号
      this.query.teacherName = null; // 查询条件中的教师姓名
      this.query.cno = null; //查询条件中的课程号
      this.query.courseName = null;//查询条件中的课程号
      this.selectPaper();
    },
    handleUpload(row) { // 上传试卷
      this.dialogInsert = true;
      this.curPaper = row;
      console.log(row)
    },
    handlePageSizeChange(val) { //当界面显示数据条数发生变化
      this.query.pageSize = val;
      this.selectPaper()
    },
    handleCurrentPageChange(val) { //当页面页数发生变化
      this.query.currentPage = val;
      this.selectPaper()
    },
    handleChange() { // 上传文件时
      this.file = this.$refs.input.files[0]
    },
    selectPaper() { // 查询数据库中的试卷记录
      this.$axios.get("/teachingCourseDTO/selective", {
        params: this.query
      }).then((resp) => {
        console.log(resp)
        if (resp.data.code === 0) { // 说明查找成功
          this.pagination = resp.data.data;
          this.papers = this.pagination.data; // 赋值
        } else { // 说明查找不成功
          this.papers = []; // 清空数组
        }
      })
    },
    upload() { // 上传文件
      let formData = new FormData();
      formData.append('file', this.file);
      // console.log(formData.get('file'))
      console.log(this.curPaper)
      this.$axios({
        url: "/xlsxFile/upload",
        method: "post",
        params: {
          classId: this.curPaper.classId,
          cno: this.curPaper.cno
        },
        data: formData
      }).then((resp) => {
          if (resp.data.code == 0) {
            this.$message({
              message: '上传成绩成功！',
              type: 'success'
            });
          }
          this.dialogInsert = false;
        }
      )
    },
  },
  mounted() {
    this.selectPaper(); // 查询试卷信息
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
  margin-left: 8%;
}

</style>
