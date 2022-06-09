<template id="main">

  <el-card id="card">

    <el-row> <!--搜索框-->
      <el-col :span="5">
        <el-select v-model="searchKey" @change="handleSearchKeyChange">
          <el-option label="班级号" value="id" style="color: black;"></el-option>
        </el-select>
      </el-col>

      <el-col :span="18">
        <el-input placeholder="请输入搜索内容" class="input-with-select" v-model="searchContent">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="18">
        <el-button icon="el-icon-refresh" @click="handleReset">刷新筛选</el-button>
      </el-col>

      <el-col :span="1">
        <el-button icon="el-icon-circle-plus-outline" @click="handleInsert">新增班级</el-button>
      </el-col>
    </el-row>

    <el-divider></el-divider>

    <template>
      <el-table ref="singleTable" :data="classess" style="font-size: medium;font-family: 楷体;">
        <el-table-column prop="id" label="班级号" align="center" width="250" sortable></el-table-column>
        <el-table-column prop="name" label="班级名" width="250"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
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

    <el-dialog title="新增班级" :visible.sync="dialogInsert" width="30%">
      <el-form :inline="true" label-position="right" label-width="120px" :model="classesInsert">
        <el-form-item label="班级号：">
          <el-input v-model="classesInsert.id" placeholder="请输入班级号" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="班级名：">
          <el-input v-model="classesInsert.name" placeholder="请输入班级名" style="width: 300px"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogInsert = false">取 消</el-button>
        <el-button type="primary" @click="insertMessage">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改信息" :visible.sync="dialogUpdate" width="30%">
      <el-form :inline="true" label-position="right" label-width="120px" :model="classesUpdate">
        <el-form-item label="班级号：">
          <el-input v-model="classesUpdate.id" placeholder="请输入班级号" style="width: 300px" disabled></el-input>
        </el-form-item>
        <el-form-item label="班级名：">
          <el-input v-model="classesUpdate.name" placeholder="请输入班级名" style="width: 300px"></el-input>
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
  name: "classesManage",
  data() { // 页面所用数据
    return {
      searchKey: 'id', // 查询字段
      searchContent: '', // 查询内容
      query: { // 查询条件
        id: null, // 班级号
        name: null, // 班级名
        currentPage: 1, // 当前页
        pageSize: 5 // 页面记录数量
      },
      classess: [],// 从数据库中查询出来的班级数据
      pagination: {
        currentPage: 1,
        pageSize: 5,
        total: 0
      },
      dialogInsert: false, // 插入班级信息
      classesInsert: { // 插入的班级对象
        id: null,
        name: null,
      },
      dialogUpdate: false, // 修改班级信息
      classesUpdate: { // 修改的班级对象
        id: null,
        name: null,
      }
    }
  },
  methods: { // 页面所用方法
    handleSearchKeyChange() { // 当查询字段发生变化
      this.query.id = null; // 发生变化后，对应的查询条件内容清空
      this.query.name = null;
      this.setSearchContent();
    },
    setSearchContent() {
      switch (this.searchKey) { // 设置对应字段的查询内容
        case 'id':
          this.query.id = this.searchContent;
          break;
        case 'name':
          this.query.name = this.searchContent;
          break;
      }
    },
    handleSearch() { // 查找符合条件的信息
      this.setSearchContent();
      this.selectClasses();
    },
    handleReset() { // 重置查询条件
      this.searchContent = ''; // 输入框内容
      this.query.id = null; // 查询条件中的班级号
      this.query.name = null; // 查询条件中的班级名
      this.selectClasses();
    },
    handleInsert() { // 插入信息
      this.dialogInsert = true;
    },
    handleUpdate(row) { // 修改信息
      this.classesUpdate = row;
      this.dialogUpdate = true;
    },
    handleFilter(value, row, column) { // 过滤结果
      const property = column['property'];
      return row[property] === value;
    },
    handlePageSizeChange(val) { //当界面显示数据条数发生变化
      this.query.pageSize = val;
      this.selectClasses()
    },
    handleCurrentPageChange(val) { //当页面页数发生变化
      this.query.currentPage = val;
      this.selectClasses()
    },
    insertMessage() { // 插入弹框
      this.$confirm("请检查输入信息是否无误，是否继续？", "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.insertClasses();
      })
    },
    updateMessage() { // 更新弹窗
      this.$confirm("请检查输入信息是否无误，是否继续？","提示",{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'waring'
      }).then(() => {
        this.updateClasses();
      })
    },
    selectClasses() { // 查询数据库中的班级记录
      this.$axios.get("/classes/select", {
        params: this.query
      }).then((resp) => {
        // console.log(resp)
        if (resp.data.code === 0) { // 说明查找成功
          this.pagination = resp.data.data;
          this.classess = this.pagination.data; // 赋值
        } else { // 说明查找不成功
          this.classess = []; // 清空数组
        }
      })
    },
    insertClasses() { // 往数据库中插入班级记录
      this.$axios.post("/classes/insert",
        this.$qs.stringify(this.classesInsert)
      ).then((resp) => {
        // console.log(resp)
        if (resp.data.code === 0) { // 说明添加班级信息成功
          this.$message({
            message: '增加班级成功！',
            type: 'success'
          });
          this.classesInsert.id = null;
          this.classesInsert.name = null; // 插入成功后将插入对象中的属性置空
          this.selectClasses(); // 查找班级信息
        } else { // 说明添加班级信息不成功
          this.$message.error("增加失败，系统运行出错")
        }
      });
      this.dialogInsert = false; // 设置插入弹框为可见
    },
    updateClasses() { // 从数据库中修改班级记录
      this.$axios.put("/classes/update",
        this.$qs.stringify(this.classesUpdate)
      ).then((resp) => {
        console.log(resp)
        if (resp.data.code === 0) { // 说明修改班级信息成功
          this.$message({
            message: '修改信息成功！',
            type: 'success'
          });
          this.selectClasses(); // 查找班级信息
        } else { // 说明修改班级信息不成功
          this.$message.error("修改失败，系统运行出错")
        }
      });
      this.dialogUpdate = false; // 设置修改弹框为不可见
    }
  },
  mounted() {
    this.selectClasses(); // 查询班级信息
  }
}
</script>

<style scoped>

#pagination {
  margin-top: 15px;
  text-align: center;
}

#card {
  width: 600px;
  margin-left: 25%;
}

</style>
