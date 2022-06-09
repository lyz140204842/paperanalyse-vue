<template>

  <el-card>

    <el-row>
      <el-col :span="18">
        <el-input placeholder="请输入搜索内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="3">
        <el-button icon="el-icon-refresh">刷新筛选</el-button>
      </el-col>
      <el-col :span="3">
        <el-button icon="el-icon-circle-plus-outline" @click="handleInsert">新增学生</el-button>
      </el-col>
    </el-row>

    <el-divider></el-divider>

<!--    新增学生弹窗-->
    <template>
      <el-table stripe border :header-cell-style="{background:'#409EFF',color:'#FFFFFF'}" :data="students" ref="filterTable" style="font-size: medium;font-family: 楷体;" border>
        <el-table-column prop="sno" label="学号" width="140" align="center" sortable></el-table-column>
        <el-table-column prop="name" label="姓名" width="140" sortable></el-table-column>
        <el-table-column prop="cno" label="班级" width="140" align="center" :filters="classesFilters" :filter-method="filterHandler">
        </el-table-column>
        <el-table-column label="操作"  width="150">
          <template slot-scope="scope">
            <el-tooltip class="item" content="编辑学生相关信息" placement="left" effect="light">
              <el-link icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-link>
            </el-tooltip>
            <template>
              <el-popconfirm icon="el-icon-info" icon-color="red"title="确定删除该学生的相关信息吗？"
                             @confirm="handleDelete(scope.row)">
                <el-link icon="el-icon-delete" slot="reference">删除</el-link>
              </el-popconfirm>
            </template>
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

      <el-dialog title="新增学生" :visible.sync="dialogInsert" width="30%">
        <el-form :inline="true" label-position="right" label-width="120px" :model="studentInsert">
          <el-form-item label="学号：">
            <el-input v-model="studentInsert.sno" placeholder="请输入学号" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="学生姓名：">
            <el-input v-model="studentInsert.name" placeholder="请输入学生姓名" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="班级号:">
            <el-input v-model="studentInsert.cno"placeholder="请输入班级号"  style="width: 300px"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogInsert = false">取 消</el-button>
        <el-button type="primary" @click="insertMessage">确 定</el-button>
      </span>
      </el-dialog>

      <el-dialog title="修改学生信息" :visible.sync="dialogUpdate" width="30%">
        <el-form :inline="true" label-position="right" label-width="120px" :model="studentUpdate">
          <el-form-item label="学号：">
            <el-input v-model="studentUpdate.sno" placeholder="请输入学号" style="width: 300px" disabled></el-input>
          </el-form-item>
          <el-form-item label="学生姓名：">
            <el-input v-model="studentUpdate.name" placeholder="请输入学生姓名" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="班级号：">
            <el-input v-model="studentUpdate.cno" placeholder="请输入班级号" style="width: 300px"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogInsert = false">取 消</el-button>
        <el-button type="primary" @click="updateMessage">确 定</el-button>
      </span>
      </el-dialog>

    </template>


  </el-card>
</template>

<script>
export default {
  name: "StudentManage",
  data() {//定义页面所需数据
    return {
      //学生对象
      students:[],
      //新增学生对象
      studentInsert: {
        sno: '',
        name: '',
        cno: '',
      },
      studentUpdate: {
        sno: '',
        name: '',
        cno: '',
      },
      studentDelete: {
        sno: "",
        name: '',
        cno: '',
      },
      //查询条件
      query: {
        sno:null,
        name:null,
        cno:null,
        currentPage: 1,
        pageSize: 5
      },
      dialogInsert: false, // 插入学生信息
      dialogUpdate: false, // 修改学生信息

      //分页查询相关
      pagination: {
        currentPage: 1,
        pageSize: 5,
        total: 0
      },
    };
  },
  methods:{
    /**
     * 查询学生数据源
     */
    getData() {
      this.$axios('/student/select', {
        params: this.query //查询参数
      }, ).then((resp) => {
        if (resp.data.code === 0) {//查询成功
          //将查询结果赋给该页面列表对应对象
          this.pagination = resp.data.data;
          this.students = this.pagination.data;
        } else {
          this.students = [];
        }
      })
    },

    /**
     * 该部分为修该页面数据排列方法
     */
    handlePageSizeChange(val) { //当界面显示数据条数发生变化
      this.query.pageSize = val;
      this.getData();
    },
    handleCurrentPageChange(val) { //当页面页数发生变化
      this.query.currentPage = val;
      this.getData();
    },

    /**
     * 该代码块为插入数据相关方法
     */
    insertMessage() { // 插入提示对话框
      this.$confirm("请检查输入信息是否无误，是否继续？", "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.insertStudent();
      })
    },
    // 插入信息,呼出插入对话框
    handleInsert() {
      this.dialogInsert = true;
    },
    // 往数据库中插入教师记录,实现插入操作
    insertStudent() {
      this.$axios.post("/student/insert",
        this.$qs.stringify(this.studentInsert)
      ).then((resp) => {
        // console.log(resp)
        if (resp.data.code === 0) { // 说明添加教师信息成功
          this.$message({
            message: '添加学生成功！',
            type: 'success'
          });
          //重置插入对象
          this.studentInsert.sno = null;
          this.studentInsert.name = null;
          this.studentInsert.cno = null;
          // 刷星学生星系信息
          this.getData();
        } else { // 说明添加教师信息不成功
          this.$message.error("增加失败，系统运行出错")
        }
      });
      this.dialogInsert = false; // 设置插入弹框为可见
    },

    /**
     * 以下一组方法为修改功能
     * @param row
     */
    handleUpdate(row) { // 修改信息
      this.studentUpdate = row;
      this.dialogUpdate = true;
    },
    updateMessage() { // 更新弹窗
      this.$confirm("请检查输入信息是否无误，是否继续？","提示",{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'waring'
      }).then(() => {
        this.updateStudent();
      })
    },
    updateStudent() { // 从数据库中修改教师记录
      this.$axios.put("/student/update",
        this.$qs.stringify(this.studentUpdate)
      ).then((resp) => {
        console.log(resp)
        if (resp.data.code === 0) { // 说明修改教师信息成功
          this.$message({
            message: '修改信息成功！',
            type: 'success'
          });
          this.getData(); // 查找教师信息
        } else { // 说明修改教师信息不成功
          this.$message.error("修改失败，系统运行出错")
        }
      });
      this.dialogUpdate = false; // 设置修改弹框为不可见
    },

    /**
     * 以下一组方法为删除功能
     * @param row
     */
    handleDelete(row) { // 删除学生
      this.studentDelete= row;
      this.deleteStudent();
      console.log(this.studentDelete.sno)
    },
    deleteStudent() {//执行删除操作
      this.$axios.delete('/student/delete',{
          params: {
            sno: this.studentDelete.sno //此处参数名称要与后端删除方法中参数名称一致
          },
          paramsSerializer: params => {
            return this.$qs.stringify(params, {
              indices: false
            })
          }
      }
      ).then(resp => {
        if (resp.data.code === 0) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getData();
        }
      })
    },


  },
  //狗子函数,页面初始化时执行
  mounted() {

    this.getData();
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
