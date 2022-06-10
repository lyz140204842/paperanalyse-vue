<template>
  <el-main>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据展示</el-breadcrumb-item>
    </el-breadcrumb>

    <!--分析详情标签页-->

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-row>
        <el-col :span="4">
          <el-button icon="el-icon-circle-plus-outline" @click="handleCheckClick">选择试卷</el-button>
        </el-col>
      </el-row>

      <el-tab-pane label="分析结果详情" name="first">
        <el-col :span="12" class="col-1">
          <el-row>
            <el-col :span="2" style="width: 12px; height: 12px; background: #1890FF;
                        border-radius: 50%; margin: 20px 0 0 35px;"></el-col>
            <el-col :span="22" style="width: 150px; height: 15px; font-size: 16px;
                        font-family: Alibaba PuHuiTi; font-weight: 400; color: #333333;
                        margin: 15px 0 0 10px;">基础数据分析
            </el-col>
          </el-row>
          <el-row>
            <el-col style="width: 90%; height: 43px; font-size: 16px; font-family: Alibaba PuHuiTi;
                        font-weight: 400; color: #333333; margin: 15px 0 0 40px;">
              下表是本张试卷中各小题的得分的情况和分析结果，以及试卷整体分析的结果
            </el-col>
          </el-row>
          <el-row>
            <el-table :data="analyseResults" border
                      height="400"
                      width="570"
                      style="width: 100%">
              <el-table-column header-align="center" align="center" prop="serialNumber" label="题号" width="120">
              </el-table-column>
              <el-table-column header-align="center" align="center" prop="maxScore" label="平均分"
                               width="80"></el-table-column>
              <el-table-column header-align="center" align="center" prop="minScore"
                               label="最高分" width="80"></el-table-column>
              <el-table-column header-align="center" align="center" prop="averageScore"
                               label="最低分" width="90"></el-table-column>
              <el-table-column header-align="center" align="center" prop="difficulty"
                               label="难度" width="100"></el-table-column>
              <el-table-column header-align="center" align="center" prop="distinction"
                               label="区分度" width="100"></el-table-column>
            </el-table>
          </el-row>
        </el-col>
      </el-tab-pane>
      <!--      难度分析标签页-->
      <el-tab-pane label="难度分析" name="second">
        <el-col :span="12" class="col-2">
          <el-row>
            <el-col :span="2" style="width: 12px; height: 12px; background: #1890FF;
                        border-radius: 50%; margin: 20px 0 0 35px;"></el-col>
            <el-col :span="22" style="width: 150px; height: 15px; font-size: 16px;
                        font-family: Alibaba PuHuiTi; font-weight: 400; color: #333333;
                        margin: 15px 0 0 10px;">试卷难度分析
            </el-col>
          </el-row>
          <!--          <el-row>-->
          <!--            <el-col style="width: 90%; height: 43px; font-size: 16px; font-family: Alibaba PuHuiTi;-->
          <!--                        font-weight: 400; color: #333333; margin: 15px 0 0 40px;">-->
          <!--            </el-col>-->
          <!--          </el-row>-->
          <el-row>
            <div id="echart1"></div>
          </el-row>
        </el-col>
      </el-tab-pane>
      <!--      信度分析详情-->
      <el-tab-pane label="信度分析" name="third">
        <el-col :span="12" class="col-1">
          <el-row>
            <el-col :span="2" style="width: 12px; height: 12px; background: #1890FF;
                        border-radius: 50%; margin: 20px 0 0 35px;"></el-col>
            <el-col :span="22" style="width: 150px; height: 15px; font-size: 16px;
                        font-family: Alibaba PuHuiTi; font-weight: 400; color: #333333;
                        margin: 15px 0 0 10px;">试卷信度分析
            </el-col>
          </el-row>
          <!--          <el-row>-->
          <!--            <el-col style="width: 90%; height: 43px; font-size: 16px; font-family: Alibaba PuHuiTi;-->
          <!--                        font-weight: 400; color: #333333; margin: 15px 0 0 40px;">-->
          <!--            </el-col>-->
          <!--          </el-row>-->
          <el-row>
            <div id="echart23">
              <div id="echart2"></div>
              <div id="echart3"></div>
            </div>
          </el-row>
        </el-col>
      </el-tab-pane>
      <!--      区分度分析-->
      <el-tab-pane label="区分度分析" name="fourth">
        <el-col :span="12" class="col-2">
          <el-row>
            <el-col :span="2" style="width: 12px; height: 12px; background: #1890FF;
                        border-radius: 50%; margin: 20px 0 0 35px;"></el-col>
            <el-col :span="22" style="width: 150px; height: 15px; font-size: 16px;
                        font-family: Alibaba PuHuiTi; font-weight: 400; color: #333333;
                        margin: 15px 0 0 10px;">试卷区分度分析
            </el-col>
          </el-row>
          <!--          <el-row>-->
          <!--            <el-col style="width: 90%; height: 43px; font-size: 16px; font-family: Alibaba PuHuiTi;-->
          <!--                        font-weight: 400; color: #333333; margin: 15px 0 0 40px;">-->
          <!--            </el-col>-->
          <!--          </el-row>-->
          <el-row>
            <div id="echart4"></div>
          </el-row>
        </el-col>
      </el-tab-pane>
    </el-tabs>
    <!--    <el-row :gutter="20" class="row-pane">-->
    <!--      &lt;!&ndash;      第一行第一个表&ndash;&gt;-->

    <!--      &lt;!&ndash;      第一行第二个表&ndash;&gt;-->

    <!--    </el-row>-->
    <!--        第二行两个表-->
    <!--    <el-row :gutter="20" class="row-pane">-->
    <!--      &lt;!&ndash;      第二行第一个表&ndash;&gt;-->

    <!--      &lt;!&ndash;      第二行第二个表&ndash;&gt;-->

    <!--    </el-row>-->
    <el-dialog title="请选择成绩表" :visible.sync="dialogCheck" width="40%">
      <el-table ref="singleTable" :data="select" style="font-size: medium;font-family: 楷体;">
        <el-table-column prop="cno" label="课程号" align="center" width="100" sortable></el-table-column>
        <el-table-column prop="classId" label="班级号" width="100"></el-table-column>
        <el-table-column prop="grade" label="文件地址" width="100"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="medium" @click="handleSelect(scope.row)">选择</el-button>
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
      <!--      <span slot="footer" class="dialog-footer">-->
      <!--        <el-button @click="dialogInsert = false">取 消</el-button>-->
      <!--        <el-button type="primary" @click="updateMessage">确 定</el-button>-->
      <!--      </span>-->
    </el-dialog>
  </el-main>
</template>

<script>
export default {
  name: "PictureTest",
  data() {
    return {
      activeName: 'first',
      //试卷分析结果
      analyseResults: [],
      select: [],
      gradeFile: {
        cno: null, // 课程号
        name: null, // 课程名称
        grade: null,
      },

      query: { // 查询条件
        cno: null, // 课程号
        name: null, // 课程名称
        currentPage: 1, // 当前页
        pageSize: 5 // 页面记录数量
      },
      pagination: {
        currentPage: 1,
        pageSize: 5,
        total: 0
      },
      dialogCheck: false, // 插入学生信息

      questionNumber: 4,//题目数
      simpleQuestion: "",
      middleQuestion: '',
      difficultQuestion: '',


    }
  },

  mounted() {

    this.getData();
    this.getFile()

  },

  methods: {
    resumeGroup() {//重置图形
      this.onInitEchart1();
      this.onInitEchart2();
      this.onInitEchart3();
      this.onInitEchart4();
    },
    handleDate() {//处理数据
      this.questionNumber = 0;
      this.simpleQuestion = 0;
      this.middleQuestion = 0;
      this.difficultQuestion = 0;
      for (let i = 0; i < this.analyseResults.length; i++) {
        if (this.analyseResults[i].difficulty <= 0.6) {
          this.simpleQuestion++;
        } else if (this.analyseResults[i].difficulty <= 0.8) {
          this.middleQuestion++;

        } else {
          this.difficultQuestion++;
        }
        this.questionNumber++;
      }
      // alert("简单题数"+this.simpleQuestion);
      // alert("中等题数"+this.middleQuestion);
      // alert("难题数"+this.difficultQuestion);
      // alert("总题目数"+this.questionNumber);
      this.resumeGroup();

    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSelect(row) {
      this.gradeFile = row;
      // alert(this.gradeFile.grade);
      this.getData();
    },
    getFile() {//查询所有试卷
      this.$axios('/selectingCourseDTO/selective', {
        params: this.query //查询参数
      },).then((resp) => {
        if (resp.data.code === 0) {//查询成功
          //将查询结果赋给该页面列表对应对象
          this.select = resp.data.data;
        } else {
          this.select = [];
        }
      })
    },
    getData() {//获取分析星系
      this.$axios('/analyseResult/select', {
        params: this.gradeFile //查询参数
      },).then((resp) => {
        // alert(this.filename);
        if (resp.data.code === 0) {//查询成功
          //将查询结果赋给该页面列表对应对象
          this.analyseResults = resp.data.data;
        } else {
          this.analyseResults = [];
        }
        this.dialogCheck = false;
        this.handleDate();//图形数据初始化
        // alert(this.questionNumber);
      })
    },
    handlePageSizeChange(val) { //当界面显示数据条数发生变化
      this.query.pageSize = val;
      this.getFile()
    },
    handleCurrentPageChange(val) { //当页面页数发生变化
      this.query.currentPage = val;
      this.getFile()
    },
    handleCheckClick() {
      this.dialogCheck = true;
    },
    /**
     * 难度分析图表
     */
    onInitEchart1() {
      let echarts = require('echarts');
      let myChart = echarts.init(document.getElementById('echart1'), 'walden');
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        series: [
          {
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '40%'],
            label: {
              position: 'outer',
              formatter: '{b}\n{c}',
              color: '#0078FF',
              fontSize: 12,
              lineHeight: 22
            },
            labelLine: {
              show: true,
              length: 60
            },
            data: [
              {value: this.simpleQuestion, name: '简单题',itemStyle: '#1FC48D'},
              {value: this.middleQuestion, name: '中等题',itemStyle: '#6DC8EC'},
              {value: this.difficultQuestion, name: '难题',itemStyle: '#3F8FFF'}
            ]
          },
          {
            type: 'pie',
            radius: ['55%', '75%'],
            label: {
              position: 'outer',
              formatter: '{b}\n{c}',
              color: '#2c78cd',
              fontSize: 12,
              lineHeight: 22
            },
            labelLine: {
              show: true
            },
            data: [
              {value: 3, name: '总体难度'},
              {value: 7, name: '总体难度'}
            ]
          }
        ]
      };
      myChart.setOption(option);
    },
    onInitEchart2() {
      let echarts = require('echarts');
      let myChart = echarts.init(document.getElementById('echart2'), 'walden');
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '18',
                color: '#0078FF',
                formatter: '{b} ({d}%)'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {value: 42.0, name: '高区分度', selected: true},
              {value: 57.5, name: '低区分度'}
            ]
          }
        ]
      };
      myChart.setOption(option);
      let index = 0;
      myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: 0
      });
      myChart.on("mouseover", function (e) {
        if (e.dataIndex != index) {
          myChart.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
            dataIndex: index
          });
        }
      });
      myChart.on("mouseout", function (e) {
        index = e.dataIndex;
        myChart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: 0
        });
      });
    },
    onInitEchart3() {
      let echarts = require('echarts');
      let myChart = echarts.init(document.getElementById('echart3'), 'walden');
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '18',
                color: '#0078FF',
                formatter: '{b} ({d}%)'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {value: 42.5, name: '完建'},
              {value: 57.5, name: '在建', selected: true}
            ]
          }
        ]
      };
      myChart.setOption(option);
      let index = 1;
      myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: 1
      });
      myChart.on("mouseover", function (e) {
        if (e.dataIndex != index) {
          myChart.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
            dataIndex: index
          });
        }
      });
      myChart.on("mouseout", function (e) {
        index = e.dataIndex;
        myChart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: 1
        });
      });
    },
    onInitEchart4() {
      let echarts = require('echarts');
      let myChart = echarts.init(document.getElementById('echart4'), 'walden');
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              position: 'outer',
              formatter: '{b}\n{c}亿元',
              color: '#0078FF',
              fontSize: 12,
              lineHeight: 22
            },
            emphasis: {
              label: {
                show: true
              }
            },
            labelLine: {
              show: true
            },
            data: [
              {value: 26.4, name: '社会资本 十三五投资'},
              {value: 31.5, name: '中央财政 十三五投资'},
              {value: 30, name: '其他 十三五投资'},
              {value: 62, name: '地方财政 十三五投资'},
            ]
          }
        ]
      };
      myChart.setOption(option);
    }
  }
}
</script>

<style scoped>
.row-pane {
  height: 500px !important;
  margin: 20px 0 0 0 !important;
}

.col-1 {
  background-color: white;
  height: 500px !important;
  width: 80%;
  float: left;
}

.col-2 {
  background-color: white;
  height: 500px !important;
  width: 80%;
  float: left;
}

#echart1, #echart2, #echart3, #echart4 {
  height: 350px;
  width: 800px;
  margin: 0 auto;
}

#echart23 {
  display: flex;
}
</style>
