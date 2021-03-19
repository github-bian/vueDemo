<template>
  <div class="content">
    <div class="about">
      <h1>This is an about page</h1>
      <div class="father">
        <Father></Father>
        <router-view/>
      </div>
      <div v-for="(item,index) in list" :key="index">
        <div v-if="item.price">{{ item.name }}</div>
      </div>
      <div><p>{{ val }}</p>距离2021年2月8号还有： {{ timer }}</div>
      <div>
        <van-cell is-link @click="showPopup">展示弹出层</van-cell>
        <van-popup v-model="show" position="bottom" closeable :style="{ height: '60%' }">
          <van-checkbox-group v-model="result" class="mt30">
            <van-cell-group>
              <van-cell
                  v-for="(item, index) in list"
                  clickable
                  :key="index"
                  :title="`复选框 ${item.name}`"
                  @click="toggle(index)"
              >
                <template #right-icon>
                  <van-checkbox :name="item.name" ref="checkboxes"/>
                </template>
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </van-popup>
      </div>
    </div>

  </div>
</template>
<script>
import moment from 'moment'
import area from '@/assets/area'
import Father from '@/components/Father'

export default {
  name: 'about',
  data() {
    return {
      result: [],
      show: false,
      timer: "",
      areaList: '',
      val: "abi,bas",
      list: [
        {name: '五菱之光', price: '1888'},
        {name: '之光', price: ''},
        {name: '水电费费', price: null},
        {name: '地方', price: '188'},
        {name: '干撒', price: '1388'}
      ],
    }
  },
  components: {Father},
  created() {
//获取当前时间
    let m1 = moment();
//获取需要对比的时间
    let m2 = moment("2020-01-15T00:00:00.000+0800");
//计算相差多少天 day可以是second minute
    var day = m2.diff(m1, 'day');
    console.log('距离20201-01-10号还有多少天：', day)
    console.log('super超级', this.columns)
    this.timer = moment("2021-02-08", "YYYY年-MM月-DD").fromNow();
    this.dealWith()
    this.until()
    this.areaList = area
    console.log('地点json---->', area)
  },
  methods: {
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    showPopup() {
      this.show = true;
    },
    until() {
      var res = this.val.split(",")
      console.log('res===>', res)
    },
    dealWith() {
      var currentTime = new Date()
      var newTime = new Date(currentTime)
      console.log('当前时间', currentTime, '处理后的时间', newTime)
    }
  }
}
</script>
<style scoped>
.father {
  width: 350px;

  background-color: salmon;
  margin: 0 auto;
}

.content {
  width: 100%;
  height: 500px;
  background-color: darkolivegreen;
}

.mt30 {
  margin-top: 50px;
}
</style>
