<template>
  <div id="main"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  async mounted(){
            // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))
    let res = await this.$http.get('reports/type/1')
    let option = {
      title: {
        text: '堆叠区域图'
        },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
        }
    ]
}

option = {
  ...option,
  ...res.data.data
} //合并两个对象

// console.log(res.data.data)
option.xAxis[0].type = 'category'
option.xAxis[0].boundaryGap = false

// 绘制图表
myChart.setOption(option)


}
   

}
</script>

<style>
#main {
  width: 1200px;
  height: 600px;
}
</style>
