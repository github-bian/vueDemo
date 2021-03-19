<template>
  <div >
    <h1>我是子组件:child</h1>
    <button @click="sendFun">按钮</button>
    <p>
      通过v-bind="$attrs"接受到的值：
      {{$attrs}}
    </p>
    <hr>
    <Son v-bind="$attrs" v-on="$listeners"></Son>
  </div>
</template>
<script>
import Son from '@/components/Son'

export default {
  components: {Son},
  props:["prop"],
  data() {
    return {}
  },
  mounted() {
    console.log('$listeners->>',this.$listeners)
  },
  created() {
    // 结果显示为$attrs.temp，不包含prop
    console.log('child组件中的this.$attrs',this.$attrs)
  },
  methods: {
    sendFun(){
      this.$emit('tempFn',)
    }
  }
}
</script>
