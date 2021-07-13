<template>

  <div class="home">
    <h3>v1.0.3</h3>
    <HelloWorld :num="num" @addMethod="addfun" @reduceMethod="reducefun" ref="hellomsg" msg="边">
      <div >我是HelloWorld组件中的插槽</div>
   </HelloWorld>

    <van-button type="danger" class="button" @click="run">点我接受子组件数据</van-button>
    <div>{{ age }}</div>
    <van-button type="warning" @click="setNameBian">不带参设置为边龙龙</van-button>
    <div>{{ username }}</div>
    <van-button type="warning" @click="setNameZhao">带参设置为赵得住</van-button>

    <van-button type="warning" @click="showT">遮罩层</van-button>
    <van-overlay :show="show" @click="show = false">
      <div class="historyModel" @click.stop>
        <div class="block">
          <div class="content">
            <div class="headerBar">

              <span @click="beforeM"> << {{ beforeMonth }}</span>
              <span> {{ currentMonth }}</span>
              <span @click="nextM"> {{ nextMonth }}  >></span>

            </div>
            <van-steps direction="vertical" :active="-1">
              <van-step>
                <div class="box">
                  <div class="boxl">
                    <p>【城市】物流状态1</p>
                    <p>2016-07-12 12:40</p>
                  </div>
                  <div class="boxr">
                    已打卡
                  </div>
                </div>
              </van-step>
              <van-step>
                <div class="box">
                  <div class="boxl">
                    <p>【城市】物流状态1</p>
                    <p>2016-07-12 12:40</p>
                  </div>
                  <div class="boxr">
                    已打卡
                  </div>
                </div>
              </van-step>
              <van-step>
                <div class="box">
                  <div class="boxl">
                    <p>【城市】物流状态1</p>
                    <p>2016-07-12 12:40</p>
                  </div>
                  <div class="boxr">
                    已打卡
                  </div>
                </div>
              </van-step>
            </van-steps>

          </div>
          <div class="icon" @click="show=false">
            x
          </div>
        </div>

      </div>
    </van-overlay>
    <div v-for="(item,index) in timers">
      {{item}}
    </div>
  </div>


</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Hrader from '@/components/Header'
import moment from "moment";

export default {
  name: 'Home',
  components: {
    HelloWorld, Hrader
  },
  data() {
    return {
      monthDayList:null,
      monthNum: 0,
      beforeMonth: null,
      nextMonth: null,
      currentMonth: null,// 2021-02
      nowMonth: moment().format('M月'),// 2021-02
      show: false,
      outName: '赵得住',
      username: this.$store.state.username,
      age: 0,
      num: 1,
      timers:''
    }
  },
  mounted() {
    this.username = this.$store.state.username
  },
  created() {
    this.currentMonth = moment().format('YYYY.MM');
    this.beforeMonth = moment(new Date()).subtract(1, 'months').format('YYYY-MM');
    this.nextMonth = moment(new Date()).subtract(-1, 'months').format('YYYY-MM');
    console.log('vue------>store', this.$store.state.username);
    this.demo()
    this.monthDayList=moment("2021-02", "YYYY-MM").daysInMonth()
    this.dealWi()
  },
  computed: {},
  methods: {
    dealWi(){
      let fullmonthDayList=moment("2021-02", "YYYY-MM").daysInMonth()
      for(let i=1;i<=fullmonthDayList;i++){
        this.timers= this.currentMonth+'.'+i

        console.log('--',this.currentMonth+'.'+i)
      }

    },
    beforeM() {
      let num = 0
      num = num + 1
      this.nextMonth = this.currentMonth
      this.currentMonth = moment(this.currentMonth).subtract(num, 'months').format('YYYY-MM');
      this.beforeMonth = moment(this.currentMonth).subtract(1, 'months').format('YYYY-MM');

    },
    nextM() {
      let num = 0
      num = num - 1
      this.beforeMonth = this.currentMonth
      this.currentMonth = moment(this.currentMonth).subtract(num, 'months').format('YYYY-MM');
      this.nextMonth = moment(this.currentMonth).subtract(-1, 'months').format('YYYY-MM');
    },
    showT() {
      this.show = true
    },
    demo() {
      try {
        let app
        console.log(app.wer)
      } catch (err) {
        console.log(err)
      }

    },
    setNameBian() {
      this.$store.commit('changeNameBian')
    },
    setNameZhao() {
      this.$store.commit('changeNameZhao', {
        username: this.outName
      })
    },
    addfun(data) {
      console.log('父组件接受子组件传来的值=>', data);
      this.num++
    },
    reducefun() {
      this.num < 1 ? alert('停滞你的操作') : this.num--
    },
    run() {
      console.log('机：', this.$refs.hellomsg.messge)
      this.$refs.hellomsg.hello()
    }
  }
}

</script>

<style>
.home {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
}

.historyModel {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  box-sizing: border-box;
}

.headerBar {
  width: 100%;
  padding: 18px;
  height: 100%;
  box-sizing: border-box;
  background-color: seagreen;
}

.icon {
  margin: 0 auto;
  font-size: 42px;
  color: white;
  width: 50px;
  height: 50px;
}

</style>
