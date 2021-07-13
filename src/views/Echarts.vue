<template>
  <div id="app">
    <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
  </div>

</template>
<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      list:''
    }
  },
  created() {
    this.test()
    this.show()
  },
  mounted() {
    this.$nextTick(()=>{
      this.drawLine();
    })

  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.resize()
      // 绘制图表
      const option={
        title: {text: '在Vue中使用echarts'},
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }
      myChart.setOption(option);
    },
    test(){
      var message="hello"
      console.log(message);
    },
//发送get请求
    show() {
      // 用/api來代理'http://localhost:8083'
      // this.$axios
      //     .get("/api/blog/list")
      //     .then(res => {
      //       console.log('获取到数据了',res);
      //       this.list = res.data.result;
      //       // }
      //     })
      //     .catch(e => {
      //       console.log(e);
      //     });
      console.log('11111')
    },

  }
}
</script>
