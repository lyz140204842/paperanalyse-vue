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
        <el-button icon="el-icon-circle-plus-outline">新增试卷</el-button>
      </el-col>
    </el-row>

    <el-divider></el-divider>

    <template>
      <el-table stripe border :header-cell-style="{background:'#409EFF',color:'#FFFFFF'}" :data="papers" ref="filterTable" style="font-size: medium;font-family: 楷体;" border>
        <el-table-column prop="paperId" label="试卷号" width="160" align="center" sortable></el-table-column>
        <el-table-column prop="courseName" label="课程名" width="160" align="center" sortable></el-table-column>
        <el-table-column prop="paperName" label="试卷名" width="160" align="center" sortable></el-table-column>
        <el-table-column prop="file" label="文件地址" width="160" sortable></el-table-column>
        <el-table-column label="操作"  width="150">
          <template slot-scope="scope">
            <el-tooltip class="item" content="编辑试卷相关信息" placement="left" effect="light">
              <el-link icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-link>
            </el-tooltip>
            <template>
              <el-popconfirm icon="el-icon-info" icon-color="red"title="确定删除该试卷的相关信息吗？"
                             @confirm="handleDelete(scope.row.paperId)">
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
  name: "PaperBrowse"
}
</script>

<style scoped>

</style>
