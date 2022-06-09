<template>
  <div class="test2" style="width:600px;height:400px;">
    <div id="myChart" style="width:100%;height:278px;float:left;"></div>
  </div>
</template>

<script>
// 注意，以下写法固定，不能写错
import *as echarts from 'echarts'
export default  {
  name: 'test2',
  data () {
    return {
      myChart: '',
      opinionData2: [
        { value: 1, name: '试卷难度分析', itemStyle: 'red' },
        { value: 45, name: '正常行为', itemStyle: '#1FC48D' },
        { value: 3, name: '睡觉行为', itemStyle: '#6DC8EC' },
        { value: 3, name: '玩手机行为', itemStyle: '#3F8FFF' }
      ]
    }
  },
  mounted: function () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      this.myChart = this.$echarts.init(document.getElementById('myChart'))
      this.myChart.setOption({
        title: {
          text: '试卷难度分析', // 主标题
          subtext: '', // 副标题
          x: 'left' // x轴方向对齐方式
        },
        grid: { containLabel: true },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {d}%'
        },
        // color: ['#1FC48D', '#F5A60A', '#6DC8EC', '#3F8FFF'],
        color: ['red', '#1FC48D', '#6DC8EC', '#3F8FFF'],
        // backgroundColor: '#ffffff',
        legend: {
          orient: 'vertical',
          icon: 'circle',
          align: 'left',
          x: 'right',
          y: 'bottom',
          data: ['校园暴力行为', '正常行为', '睡觉行为', '玩手机行为']
        },
        series: [
          {
            name: '课堂行为',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            center: ['40%', '50%'],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              color: function (params) {
                // 自定义颜色
                var colorList = ['red', '#1FC48D', '#6DC8EC', '#3F8FFF']
                return colorList[params.dataIndex]
              }
            },
            data: this.opinionData2
          }
        ]
      })
    }
  }
}
</script>

<style scoped>

#card {
  width: 1000px;
  margin-left: 15%;
}
</style>
