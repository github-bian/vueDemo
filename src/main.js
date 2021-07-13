import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import filters from '@/assets/filter'
import Vant from 'vant';
import lodash from 'lodash'
import '@/utils/flexable'   //使用postcss-pxtorem与flexable.js结合的形式，适配各类机型。此配置是以2倍屏的基础来配置的，也就是说你的设计图也是以2倍屏设计的，这样设计图上的px值是多少你就可以直接拷过来，省去了px转rem的换算。
// import echarts from "echarts";
import * as echarts from 'echarts'
import Axios from 'axios'  //导入axios

//将axios挂载到原型上
Vue.prototype.$axios = Axios;
Vue.prototype.$lodash= lodash
Vue.prototype.$echarts = echarts;
Vue.use(Vant);
Vue.use(filters);

import 'vant/lib/index.css';
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
