<template id="main">

  <el-card id="card">

    <el-row> <!--搜索框-->
      <el-col :span="5">
        <el-select v-model="searchKey" @change="handleSearchKeyChange">
          <el-option label="学期号" value="id" style="color: black;"></el-option>
          <el-option label="年份" value="year" style="color: black;"></el-option>
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
        <el-button icon="el-icon-circle-plus-outline" @click="handleInsert">新增学期</el-button>
      </el-col>
    </el-row>

    <el-divider></el-divider>

    <template>
      <el-table ref="singleTable" :data="terms" style="font-size: medium;font-family: 楷体;">
        <el-table-column prop="id" label="学期号" align="center" width="150" sortable></el-table-column>
        <el-table-column prop="year" label="开始学年" align="center" width="150" sortable></el-table-column>
        <el-table-column prop="number" label="学期数" align="center" width="100"></el-table-column>
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

    <el-dialog title="新增学期" :visible.sync="dialogInsert" width="30%">
      <el-form :inline="true" label-position="right" label-width="120px" :model="termInsert">
        <el-form-item label="学期号：">
          <el-input v-model="termInsert.id" placeholder="请输入学期号" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="年份：">
          <el-input v-model="termInsert.year" placeholder="请输入年份" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="学期数：">
          <el-input v-model="termInsert.number" placeholder="请输入学期数" style="width: 300px"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogInsert = false">取 消</el-button>
        <el-button type="primary" @click="insertMessage">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改信息" :visible.sync="dialogUpdate" width="30%">
      <el-form :inline="true" label-position="right" label-width="120px" :model="termUpdate">
        <el-form-item label="学期号：">
          <el-input v-model="termUpdate.id" placeholder="请输入学期号" style="width: 300px" disabled></el-input>
        </el-form-item>
        <el-form-item label="年份：">
          <el-input v-model="termUpdate.year" placeholder="请输入年份" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="学期数">
          <el-input v-model="termUpdate.number" placeholder="请输入学期数" style="width: 300px"></el-input>
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
  year: "TermManage",
  data() { // 页面所用数据
    return {
      searchKey: 'id', // 查询字段
      searchContent: '', // 查询内容
      query: { // 查询条件
        id: null, // 学期号
        year: null, // 年份
        currentPage: 1, // 当前页
        pageSize: 5 // 页面记录数量
      },
      terms: [],// 从数据库中查询出来的学期数据
      pagination: {
        currentPage: 1,
        pageSize: 5,
        total: 0
      },
      dialogInsert: false, // 插入学期信息
      termInsert: { // 插入的学期对象
        id: null,
        year: null,
        number: null
      },
      dialogUpdate: false, // 修改学期信息
      termUpdate: { // 修改的学期对象
        id: null,
        year: null,
        number: null
      }
    }
  },
  methods: { // 页面所用方法
    handleSearchKeyChange() { // 当查询字段发生变化
      this.query.id = null; // 发生变化后，对应的查询条件内容清空
      this.query.year = null;
      this.setSearchContent();
    },
    setSearchContent() {
      switch (this.searchKey) { // 设置对应字段的查询内容
        case 'id':
          this.query.id = this.searchContent;
          break;
        case 'year':
          this.query.year = this.searchContent;
          break;
      }
    },
    handleSearch() { // 查找符合条件的信息
      this.setSearchContent();
      this.selectTerm();
    },
    handleReset() { // 重置查询条件
      this.searchContent = ''; // 输入框内容
      this.query.id = null; // 查询条件中的学期号
      this.query.year = null; // 查询条件中的年份
      this.selectTerm();
    },
    handleInsert() { // 插入信息
      this.dialogInsert = true;
    },
    handleUpdate(row) { // 修改信息
      this.termUpdate = row;
      this.dialogUpdate = true;
    },
    handlePageSizeChange(val) { //当界面显示数据条数发生变化
      this.query.pageSize = val;
      this.selectTerm();
    },
    handleCurrentPageChange(val) { //当页面页数发生变化
      this.query.currentPage = val;
      this.selectTerm()
    },
    insertMessage() { // 插入弹框
      this.$confirm("请检查输入信息是否无误，是否继续？", "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.insertTerm();
      })
    },
    updateMessage() { // 更新谭光
      this.$confirm("请检查输入信息是否无误，是否继续？","提示",{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'waring'
      }).then(() => {
        this.updateTerm();
      })
    },
    selectTerm() { // 查询数据库中的学期记录
      this.$axios.get("/term/select", {
        params: this.query
      }).then((resp) => {
        // console.log(resp)
        if (resp.data.code === 0) { // 说明查找成功
          this.pagination = resp.data.data;
          this.terms = this.pagination.data; // 赋值
        } else { // 说明查找不成功
          this.terms = []; // 清空数组
        }
      })
    },
    insertTerm() { // 往数据库中插入学期记录
      this.$axios.post("/term/insert",
        this.$qs.stringify(this.termInsert)
      ).then((resp) => {
        // console.log(resp)
        if (resp.data.code === 0) { // 说明添加学期信息成功
          this.$message({
            message: '增加学期成功！',
            type: 'success'
          });
          this.termInsert.id = null;
          this.termInsert.year = null; // 插入成功后将插入对象中的属性置空
          this.selectTerm(); // 查找学期信息
        } else { // 说明添加学期信息不成功
          this.$message.error("增加失败，系统运行出错")
        }
      });
      this.dialogInsert = false; // 设置插入弹框为可见
    },
    updateTerm() { // 从数据库中修改学期记录
      this.$axios.put("/term/update",
        this.$qs.stringify(this.termUpdate)
      ).then((resp) => {
        console.log(resp)
        if (resp.data.code === 0) { // 说明修改学期信息成功
          this.$message({
            message: '修改信息成功！',
            type: 'success'
          });
          this.selectTerm(); // 查找学期信息
        } else { // 说明修改学期信息不成功
          this.$message.error("修改失败，系统运行出错")
        }
      });
      this.dialogUpdate = false; // 设置修改弹框为不可见
    }
  },
  mounted() {
    this.selectTerm(); // 查询学期信息
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
