<template>
  <div class="main">
    <van-tabs @click="onClick">

      <van-row class="btnClass">
        当前月份：{{currenMonth}}
        <van-col span="8"> <van-button type="primary" @click="addMoney" class="vanbtn"> 结果+1</van-button></van-col>
        <van-col span="8"> <van-button type="danger" class="vanbtn"> 结果-1</van-button></van-col>
        <van-col span="8"> <van-button type="danger" class="vanbtn"> 清除</van-button></van-col>
      </van-row>

       <div>  结果：{{num}}</div>
      <van-divider />
      <van-tab v-for="(item,index) in navList" :title="item.title" @cahnge="onClick(item.title)">
        {{ item.name }} <br>  时间过滤器:{{timer|dealTime}}

        <div class="news" :class="['','red','pink','green','orgin'][dd.type]"  v-for="(dd,ss) in news">
          <button @click="deleteIndex(ss)">删除</button>
          <div> 姓名： {{ dd.name }} -----------手机号：{{ dd.tele|replaceTele }}</div>
          <div class="tips" :class="['yes','no','dead'][dd.type]" :data-status="dd.content"></div>
          <div> 日期：{{dd.date}} 月：{{weekTime}}</div>
        </div>

      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {Toast} from 'vant';
import filter from '@/assets/filter'
import moment from 'moment'
const mixsis ={
  updated() {
    // this.num=this.num+1

    console.log('数字长度为',this.num)
  },
  methods: {
    // addMoney:function (){
    //   this.num= this.num+1
    //   console.log('我是mixs')
    // }
  }
}
export default {
  components: {},
  props: {},
  mixins: [mixsis],
  data() {
    return {
      sortCity:["北京","上海","深圳"],
      num:0,
      currenDate: '',
      weekTime:'2021-01-26',
      navList: [
        {
          title: 'all',
          name: 'home',
          list: [{
            title: '交易规则',
            name: 'BusinessIntroduction',
          },
            {
              title: '政策法规',
              name: 'BusinessIntroduction',
            },
          ],
        },
        {
          title: 'has',
          name: 'BusinessIntroduction',
          list: [
            {
              title: '交易规则',
              name: 'BusinessIntroduction',
            },
            {
              title: '政策法规',
              name: 'BusinessIntroduction',
            },
          ],
        },
        {
          title: 'without',
          name: 'News',
          list: [
            {
              title: '公告通知',
              name: 'BusinessIntroduction',
            },
            {
              title: '公司新闻',
              name: 'BusinessIntroduction',
            },
            {
              title: '行业资讯',
              name: 'BusinessIntroduction',
            },
          ],
        },
      ],
      ListData: [
        {
          data: "我是初始化数据"
        }
      ],
      all: {
        index: 0,
        loadyFlag: false,
        list: []
      },
      has: {
        index: 1,
        loadyFlag: false,
        list: []
      },
      without: {
        index: 2,
        loadyFlag: false,
        list: []
      },
      timer:new Date(),
      news: [
        {
          name: '边龙龙',
          tele: "15517556730",
          time: "2021-01-26",
          content: "已通过",
          sortName:["北京","上海","深圳"]
        },
        {
          name: '啥快递',
          tele: "15517552110",
          time: "2021-02-26",
          content: "未通过"

        },
        {
          name: '山东矿机',
          tele: "15512215730",
          time: "2021-03-26",
          content: "已隔离"
        },
        {
          name: '沙发',
          tele: "15512215730",
          time: "2021-04-26",
          content: "未隔离"
        }
      ]
    };
  },
  created() {
    this.getData("all")
    this.weekTime=moment('2021-04-30T00:00:00.000+0800').format('M')   // 12小时制'xx:xx:xx am/pm'
    this.currenMonth=moment().format('YYYY年-MM月'); // 2021-02
    this.test()
  },
  watch: {},
  methods: {
    addMoney(){
      this.num=this.num+1
    },
    test(){
      const monthCHinses = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
      const bian=this.news.map(item=>{
        return{
          date: monthCHinses[moment(item.time).format('M')-1], // 月份
          mohth:moment(item.time).format('M')
        }
      })
      console.log('----123---',bian)
    },
    deleteIndex(index){
      console.log('||||||', this.news.splice(index,1))
    },
    onClick(name, title) {
      console.log(title)
      console.log(this[title].list)
      if (this[title].loadyFlag) {
        this.ListData = this[title].list
      } else {
        this.getData(title)
      }
    },
    getData(key) {
      this[key].loadyFlag = true
      const qe = [{data: "我是all接口请求数据"}]
      this[key].list = qe
      this.ListData = qe
      console.log('调用接口', qe)
      console.log('////', this[key])
    }
  },

  mounted() {
  },
};
</script>
<style lang="scss">
.btnClass{
  font-size: 16px;
  color: pink;
  .van-button{
    font-size: 16px;
    color: blue;
   .vanbtn:first-child{
     font-weight: 600;
     color: #80085b;
   }
  }
}
.red{
  background-color: red;
}

.pink{
  background-color: pink;
}
.green{
  background-color: green;
}
.orgin{
  background-color: #e36e06;
}
.news {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  //background-color: orange;
  margin: 10px;



  .tips {
    width: 80px;
    height: 30px;
    padding: 5px;

    &::after {
      content: attr(data-status);
      background-color: salmon;
      color: white;
    }

    &.yes::after {
      background-color: #16e85b;
      color: white;
    }

    &.no::after {
      background-color: #eca20f;
      color: white;
    }

    &.dead::after {
      background-color: #cb04f8;
      color: white;
    }
  }


}


.Top20_ProblemAnalysis {
  width: 100%;
  height: calc(100vh - 160px);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;

  .rightNav {
    width: 65%;
    height: 500px;
    background: white;
    max-width: 200px;
    margin-top: 20px;

    .tab-nav {
      padding: 1rem;
      list-style: none;

      li {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        cursor: pointer;
        user-select: none;

        .nav {
          padding: 1rem 0;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;

          i {
            transition: 0.3s;
            color: rgb(0, 225, 255);
          }

          span {
            display: inline-block;
            width: 100%;
            text-align: left;
            color: #808080;
            font-size: 0.88rem;
            margin-left: 1rem;
          }
        }

        .nav-n-box {
          transition: 0.3s;
          width: 100%;
          height: 0;
          overflow: hidden;

          .nav-n {
            width: 100%;
            font-size: 0.88rem;
            color: #808080;
            height: 2rem;
            text-align: left;
            padding-left: 2rem;
            line-height: 2rem;
            transition: 0.3s;

            &:hover {
              background: rgb(0, 225, 255);
              color: white;
              opacity: 0.5;
            }
          }
        }
      }
    }
  }

  .nav-n-box-active {
    #right-btn {
      transform: rotate(90deg) !important;
    }
  }

}
</style>
