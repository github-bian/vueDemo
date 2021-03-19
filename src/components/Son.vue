<template>
  <div class="son">
    <h1>我是孙子组件:son</h1>
    <p>
      通过v-bind="$attrs"接受到的值：
      {{$attrs}}
    </p>
    {{ $attrs.temp }}
  </div>
</template>
<script>
export default {
  name:"son",
  prop: {},
  data() {
    return {}
  },
  mounted() {
    this.$emit('tempFn')
    console.log('son组件中的this.$attrs',this.$attrs)
  },
  methods: {}
}
</script>
