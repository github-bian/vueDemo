import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import filters from '@/assets/filter'
import Vant from 'vant';
// import echarts from "echarts";
import * as echarts from 'echarts'
import Axios from 'axios'  //导入axios

//将axios挂载到原型上
Vue.prototype.$axios = Axios;

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
