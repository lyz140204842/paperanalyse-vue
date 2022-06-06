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
        <el-button icon="el-icon-circle-plus-outline">新增教师</el-button>
      </el-col>
    </el-row>

    <el-divider></el-divider>

    <template>
      <el-table stripe border :header-cell-style="{background:'#409EFF',color:'#FFFFFF'}" :data="employees" ref="filterTable" style="font-size: medium;font-family: 楷体;" border>
        <el-table-column prop="employeeId" label="职工号" width="140" align="center" sortable></el-table-column>
        <el-table-column prop="name" label="姓名" width="100" sortable></el-table-column>
        <el-table-column prop="sex" label="性别" width="90" align="center" :filters="sexFilters" :filter-method="filterHandler">
        </el-table-column>
        <el-table-column prop="phone" label="电话" width="180">
          <template slot-scope="scope">
            <i class="el-icon-phone"></i>
            <span style="margin-left: 10px">{{scope.row.phone}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="entryTime" label="入职时间" width="180" sortable>
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{scope.row.entryTime}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="statusDescription" label="在职状态" width="100" align="center" :filters="statusFilters" :filter-method="filterHandler">
        </el-table-column>
        <el-table-column prop="departmentName" label="所属部门" width="100" align="center" :filters="departmentFilters"
                         :filter-method="filterHandler"></el-table-column>
        <el-table-column prop="salary" label="工资" width="120" align="center" sortable></el-table-column>
        <el-table-column label="操作" fixed="right" width="150">
          <template slot-scope="scope">
            <el-tooltip class="item" content="编辑员工相关信息" placement="left" effect="light">
              <el-link icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-link>
            </el-tooltip>
            <template>
              <el-popconfirm icon="el-icon-info" icon-color="red"title="确定删除该员工的相关信息吗？"
                             @confirm="handleDelete(scope.row.employeeId)">
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
  name: "TeacherManage"
}
</script>

<style scoped>

</style>
