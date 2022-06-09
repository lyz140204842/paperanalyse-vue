<template id="main">

  <el-card id="card">

    <el-row> <!--搜索框-->
      <el-col :span="3">
        <el-select v-model="searchKey" @change="handleSearchKeyChange">
          <el-option label="课程号" value="cno" style="color: black;"></el-option>
          <el-option label="课程名称" value="name" style="color: black;"></el-option>
        </el-select>
      </el-col>

      <el-col :span="15">
        <el-input placeholder="请输入搜索内容" class="input-with-select"  v-model="searchContent">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </el-col>

      <el-col :span="3">
        <el-button icon="el-icon-refresh" @click="handleReset">刷新筛选</el-button>
      </el-col>

      <el-col :span="3">
        <el-button icon="el-icon-circle-plus-outline" @click="handleInsert">新增课程</el-button>
      </el-col>
    </el-row>

    <el-divider></el-divider>

    <template>
      <el-table ref="singleTable" :data="courses" style="font-size: medium;font-family: 楷体;">
        <el-table-column prop="cno" label="课程号" align="center" width="100" sortable></el-table-column>
        <el-table-column prop="name" label="课程名称" width="160" ></el-table-column>
        <el-table-column prop="credit" label="学分" width="160" ></el-table-column>
        <el-table-column prop="time" label="学时" width="160" ></el-table-column>
        <el-table-column prop="termId" label="学期号" width="160" ></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="medium" @click="handleUpdate(scope.row)">修改</el-button>
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

    <el-dialog title="新增课程" :visible.sync="dialogInsert" width="30%">
      <el-form :inline="true" label-position="right" label-width="120px" :model="courseInsert">
        <el-form-item label="课程号：">
          <el-input v-model="courseInsert.cno" placeholder="请输入课程号" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="课程名称：">
          <el-input v-model="courseInsert.name" placeholder="请输入课程名" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="学分：">
          <el-input v-model="courseInsert.credit" placeholder="请输入学分" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="学期号：">
          <el-input v-model="courseInsert.termId" style="width: 300px"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogInsert = false">取 消</el-button>
        <el-button type="primary" @click="insertMessage">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改信息" :visible.sync="dialogUpdate" width="30%">
      <el-form :inline="true" label-position="right" label-width="120px" :model="courseUpdate">
        <el-form-item label="课程号：">
          <el-input v-model="courseUpdate.cno" placeholder="请输入课程号" style="width: 300px" disabled></el-input>
        </el-form-item>
        <el-form-item label="课程名称：">
          <el-input v-model="courseUpdate.name" placeholder="请输入课程名" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="学分：">
          <el-input v-model="courseUpdate.credit" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="学时">
          <el-input v-model="courseUpdate.time" placeholder="请选择输入手机号" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="学期号">
          <el-input v-model="courseUpdate.termId" placeholder="请输入邮箱地址" style="width: 300px"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogInsert = false">取 消</el-button>
        <el-button type="primary" @click="updateMessage">确 定</el-button>
      </span>
    </el-dialog>

  </el-card>
</template>

<script>
export default {
  name: "courseManage",
  data() { // 页面所用数据
    return {
      searchKey: 'cno', // 查询字段
      searchContent: '', // 查询内容
      query: { // 查询条件
        cno: null, // 课程号
        name: null, // 课程姓名
        currentPage: 1, // 当前页
        pageSize: 5 // 页面记录数量
      },
      courses: [],// 从数据库中查询出来的课程数据
      pagination: {
        currentPage: 1,
        pageSize: 5,
        total: 0
      },
      dialogInsert: false, // 插入课程信息
      courseInsert: { // 插入的课程对象
        cno: null,
        name: null,
        credit: null,
        time: null,
        termId: null
      },
      dialogUpdate: false, // 修改课程信息
      courseUpdate: { // 修改的课程对象
        cno: null,
        name: null,
        credit: null,
        time: null,
        termId: null
      }
    }
  },
  methods: { // 页面所用方法
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
      this.selectCourse();
    },
    handleReset() { // 重置查询条件
      this.searchContent = ''; // 输入框内容
      this.query.cno = null; // 查询条件中的课程号
      this.query.name = null; // 查询条件中的课程姓名
      this.selectCourse();
    },
    handleInsert() { // 插入信息
      this.dialogInsert = true;
    },
    handleUpdate(row) { // 修改信息
      this.courseUpdate = row;
      this.dialogUpdate = true;
    },
    handlePageSizeChange(val) { //当界面显示数据条数发生变化
      this.query.pageSize = val;
      this.selectCourse()
    },
    handleCurrentPageChange(val) { //当页面页数发生变化
      this.query.currentPage = val;
      this.selectCourse()
    },
    insertMessage() { // 插入弹框
      this.$confirm("请检查输入信息是否无误，是否继续？", "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.insertCourse();
      })
    },
    updateMessage() { // 更新谭光
      this.$confirm("请检查输入信息是否无误，是否继续？","提示",{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'waring'
      }).then(() => {
        this.updateCourse();
      })
    },
    selectCourse() { // 查询数据库中的课程记录
      this.$axios.get("/course/select", {
        params: this.query
      }).then((resp) => {
        // console.log(resp)
        if (resp.data.code === 0) { // 说明查找成功
          this.pagination = resp.data.data;
          this.courses = this.pagination.data; // 赋值
        } else { // 说明查找不成功
          this.courses = []; // 清空数组
        }
      })
    },
    insertCourse() { // 往数据库中插入课程记录
      this.$axios.post("/course/insert",
        this.$qs.stringify(this.courseInsert)
      ).then((resp) => {
        // console.log(resp)
        if (resp.data.code === 0) { // 说明添加课程信息成功
          this.$message({
            message: '增加课程成功！',
            type: 'success'
          });
          this.courseInsert.cno = null;
          this.courseInsert.name = null; // 插入成功后将插入对象中的属性置空
          this.selectCourse(); // 查找课程信息
        } else { // 说明添加课程信息不成功
          this.$message.error("增加失败，系统运行出错")
        }
      });
      this.dialogInsert = false; // 设置插入弹框为可见
    },
    updateCourse() { // 从数据库中修改课程记录
      this.$axios.put("/course/update",
        this.$qs.stringify(this.courseUpdate)
      ).then((resp) => {
        console.log(resp)
        if (resp.data.code === 0) { // 说明修改课程信息成功
          this.$message({
            message: '修改信息成功！',
            type: 'success'
          });
          this.selectCourse(); // 查找课程信息
        } else { // 说明修改课程信息不成功
          this.$message.error("修改失败，系统运行出错")
        }
      });
      this.dialogUpdate = false; // 设置修改弹框为不可见
    }
  },
  mounted() {
    this.selectCourse(); // 查询课程信息
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
