<template>
  <div class="">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
      <div id="main" style="width: 600px; height: 400px"></div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, getCurrentInstance, reactive } from 'vue'
import * as echarts from 'echarts'
import { http } from '../../assets/js/http'
import { toast } from '../../assets/js/toast'
import _ from 'lodash'
export default defineComponent({
  name: '',
  components: {},
  setup() {
    const internalInstance = getCurrentInstance()
    const state = reactive({
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    })
    onMounted(async () => {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'))
      // 指定图表的配置项和数据
      const { data: res } = await http(internalInstance).get('reports/type/1')

      if (res.meta.status !== 200) {
        return toast(internalInstance).error('获取表失败')
      }
      //合并options
      const result = _.merge(state.options, res.data)
      // 使用刚指定的配置项和数据显示图表
      myChart.setOption(result)
    })
    return {
      state
    }
  }
})
</script>
<style></style>
