<template id="main">

  <el-card id="card">

    <el-row> <!--搜索框-->
      <el-col :span="3">
        <el-select v-model="searchKey" @change="handleSearchKeyChange">
          <el-option label="教师号" value="tno" style="color: black;"></el-option>
          <el-option label="教师姓名" value="name" style="color: black;"></el-option>
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
        <el-button icon="el-icon-circle-plus-outline" @click="handleInsert">新增教师</el-button>
      </el-col>
    </el-row>

    <el-divider></el-divider>

    <template>
      <el-table ref="singleTable" :data="teachers" style="font-size: medium;font-family: 楷体;">
        <el-table-column prop="tno" label="教师号" align="center" width="100" sortable></el-table-column>
        <el-table-column prop="name" label="教师姓名" width="100"></el-table-column>
        <el-table-column prop="password" label="密码" width="100"></el-table-column>
        <el-table-column prop="gender" label="性别" width="80" :filters="genderFilters"
                         :filter-method="handleFilter"></el-table-column>
        <el-table-column prop="birthday" label="出生日期"></el-table-column>
        <el-table-column prop="phone" label="电话号码"></el-table-column>
        <el-table-column prop="email" label="邮箱地址" width="200"></el-table-column>
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

    <el-dialog title="新增教师" :visible.sync="dialogInsert" width="30%">
      <el-form :inline="true" label-position="right" label-width="120px" :model="teacherInsert">
        <el-form-item label="教师号：">
          <el-input v-model="teacherInsert.tno" placeholder="请输入教师号" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="教师名称：">
          <el-input v-model="teacherInsert.name" placeholder="请输入教师名" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="teacherInsert.password" style="width: 300px"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogInsert = false">取 消</el-button>
        <el-button type="primary" @click="insertMessage">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改信息" :visible.sync="dialogUpdate" width="30%">
      <el-form :inline="true" label-position="right" label-width="120px" :model="teacherUpdate">
        <el-form-item label="教师号：">
          <el-input v-model="teacherUpdate.tno" placeholder="请输入教师号" style="width: 300px" disabled></el-input>
        </el-form-item>
        <el-form-item label="教师名称：">
          <el-input v-model="teacherUpdate.name" placeholder="请输入教师名" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="teacherUpdate.password" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-radio-group v-model="teacherUpdate.gender">
            <el-radio value="男" label="男">男</el-radio>
            <el-radio value="女" label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日：">
          <el-input v-model="teacherUpdate.birthday" type="date" placeholder="请选择日期"
                    style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="手机号吗">
          <el-input v-model="teacherUpdate.phone" placeholder="请选择输入手机号" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="teacherUpdate.email" placeholder="请输入邮箱地址" style="width: 300px"></el-input>
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
  name: "TeacherManage",
  data() { // 页面所用数据
    return {
      searchKey: 'tno', // 查询字段
      searchContent: '', // 查询内容
      query: { // 查询条件
        tno: null, // 教师号
        name: null, // 教师姓名
        currentPage: 1, // 当前页
        pageSize: 5 // 页面记录数量
      },
      teachers: [],// 从数据库中查询出来的教师数据
      pagination: {
        currentPage: 1,
        pageSize: 5,
        total: 0
      },
      genderFilters: [ // 根据性别进行过滤
        {
          text: '男',
          value: '男'
        }, {
          text: '女',
          value: '女'
        }
      ],
      dialogInsert: false, // 插入教师信息
      teacherInsert: { // 插入的教师对象
        tno: null,
        name: null,
        password: '123456',
        gender: null,
        birthday: null,
        phone: null,
        email: null
      },
      dialogUpdate: false, // 修改教师信息
      teacherUpdate: { // 修改的教师对象
        tno: null,
        name: null,
        password: null,
        gender: null,
        birthday: null,
        phone: null,
        email: null
      }
    }
  },
  methods: { // 页面所用方法
    handleSearchKeyChange() { // 当查询字段发生变化
      this.query.tno = null; // 发生变化后，对应的查询条件内容清空
      this.query.name = null;
      this.setSearchContent();
    },
    setSearchContent() {
      switch (this.searchKey) { // 设置对应字段的查询内容
        case 'tno':
          this.query.tno = this.searchContent;
          break;
        case 'name':
          this.query.name = this.searchContent;
          break;
      }
    },
    handleSearch() { // 查找符合条件的信息
      this.setSearchContent();
      this.selectTeacher();
    },
    handleReset() { // 重置查询条件
      this.searchContent = ''; // 输入框内容
      this.query.tno = null; // 查询条件中的教师号
      this.query.name = null; // 查询条件中的教师姓名
      this.selectTeacher();
    },
    handleInsert() { // 插入信息
      this.dialogInsert = true;
    },
    handleUpdate(row) { // 修改信息
      this.teacherUpdate = row;
      this.dialogUpdate = true;
    },
    handleFilter(value, row, column) { // 过滤结果
      const property = column['property'];
      return row[property] === value;
    },
    handlePageSizeChange(val) { //当界面显示数据条数发生变化
      this.query.pageSize = val;
    },
    handleCurrentPageChange(val) { //当页面页数发生变化
      this.query.currentPage = val;
    },
    insertMessage() { // 插入弹框
      this.$confirm("请检查输入信息是否无误，是否继续？", "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.insertTeacher();
      })
    },
    updateMessage() { // 更新弹窗
      this.$confirm("请检查输入信息是否无误，是否继续？","提示",{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'waring'
      }).then(() => {
        this.updateTeacher();
      })
    },
    selectTeacher() { // 查询数据库中的教师记录
      this.$axios.get("/teacher/select", {
        params: this.query
      }).then((resp) => {
        // console.log(resp)
        if (resp.data.code === 0) { // 说明查找成功
          this.pagination = resp.data.data;
          this.teachers = this.pagination.data; // 赋值
        } else { // 说明查找不成功
          this.teachers = []; // 清空数组
        }
      })
    },
    insertTeacher() { // 往数据库中插入教师记录
      this.$axios.post("/teacher/insert",
        this.$qs.stringify(this.teacherInsert)
      ).then((resp) => {
        // console.log(resp)
        if (resp.data.code === 0) { // 说明添加教师信息成功
          this.$message({
            message: '增加教师成功！',
            type: 'success'
          });
          this.teacherInsert.tno = null;
          this.teacherInsert.name = null; // 插入成功后将插入对象中的属性置空
          this.selectTeacher(); // 查找教师信息
        } else { // 说明添加教师信息不成功
          this.$message.error("增加失败，系统运行出错")
        }
      });
      this.dialogInsert = false; // 设置插入弹框为可见
    },
    updateTeacher() { // 从数据库中修改教师记录
      this.$axios.put("/teacher/update",
        this.$qs.stringify(this.teacherUpdate)
      ).then((resp) => {
        console.log(resp)
        if (resp.data.code === 0) { // 说明修改教师信息成功
          this.$message({
            message: '修改信息成功！',
            type: 'success'
          });
          this.selectTeacher(); // 查找教师信息
        } else { // 说明修改教师信息不成功
          this.$message.error("修改失败，系统运行出错")
        }
      });
      this.dialogUpdate = false; // 设置修改弹框为不可见
    }
  },
  mounted() {
    this.selectTeacher(); // 查询教师信息
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
