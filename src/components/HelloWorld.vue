<template>
  <div class="wrap">
    <h1>{{ msg }}</h1>
    <h3>hellowoeld组件</h3>
    <div class="slot"> <slot ></slot></div>
    <div class="flex_row">
      <van-button type="primary" @click="addNum()">加1</van-button>
      <h2>{{ num }}</h2>
      <van-button type="primary" @click="reduceNum()">减1</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: {
      type:String,
      default:'边龙龙'
    },
    num: Number
  },
  data() {
    return {
      userData: '',
      messge: "我是子组件的信息",
      listArray: [
        {id: 1, name: "bian", age: 23},
        {id: 2, name: "zhao", age: 24},
        {id: 3, name: "long", age: 25}
      ],
      userList: []
    }
  },
  created() {

  },
  methods: {
    nullFun() {
      alert('停滞你的操作')
    },
    hello() {
      alert('我是子组件的hello函数')
    },
    addNum() {
      this.$emit("addMethod", "子组件像父组件传值")
      this.userData = this.listArray.map(item => item.name).join(" ")
      console.log('处理后的数据=》', this.userData)
    },
    reduceNum() {
      this.$emit("reduceMethod")
    }
  }
}
</script>

<!-- prop 是子组件用来接受父组件传递过来的数据的一个自定义属性。
父组件的数据需要通过 props 把数据传给子组件，子组件需要显式地用 props 选项声明 "prop"：
-->
<style scoped>
.flex_row {
  display: flex;
  justify-content: center;
  align-content: center;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: wheat;
}


.button {
  font-size: 22px;
  display: inline-block;
  outline: none;
  background-color: seagreen;
  width: 150px;
  height: 40px;
  line-height: 30px;
  text-align: center;
  color: wheat;
  margin: 20px;
}
.slot{
    font-weight: 600;
    color: red;
}
</style>
