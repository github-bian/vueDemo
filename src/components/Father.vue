<template>
  <div >
    <h1>我是父组件:father</h1>
    <hr>

    <Child name="边" age="24" gendar="男"
           :temp="tempdata"
           @tempFn="fatherFn('bian')"
           prop='$attrs不会传递child组件中定义的props值'></Child>
  </div>
</template>
<script>
import Child from '@/components/Child'
export default {
  components: {Child},
  data() {
    return{
      tempdata: 'i am father！！！！！！！！！！！！！！！！'
    }
  },
  methods: {
    fatherFn(data) {
      console.log('father function!',data);
    }
  }
}
</script>

<style>
.tips{

}
</style>



