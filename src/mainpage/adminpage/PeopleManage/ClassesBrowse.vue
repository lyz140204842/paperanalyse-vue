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
        <el-button icon="el-icon-circle-plus-outline">新增班级</el-button>
      </el-col>
    </el-row>

    <el-divider></el-divider>

    <template>
      <el-table stripe border :header-cell-style="{background:'#409EFF',color:'#FFFFFF'}" :data="classess" ref="filterTable" style="font-size: medium;font-family: 楷体;" border>
        <el-table-column prop="classesId" label="班级号" width="160" align="center" sortable></el-table-column>
        <el-table-column prop="name" label="班级名" width="160" sortable></el-table-column>

        <el-table-column label="操作"  width="150">
          <template slot-scope="scope">
            <el-tooltip class="item" content="编辑班级相关信息" placement="left" effect="light">
              <el-link icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-link>
            </el-tooltip>
            <template>
              <el-popconfirm icon="el-icon-info" icon-color="red"title="确定删除该班级的相关信息吗？"
                             @confirm="handleDelete(scope.row.classesId)">
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
  name: "ClassesManage"
}
</script>

<style scoped>

</style>
