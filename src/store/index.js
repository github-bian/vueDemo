import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      username:'jack'
  },
  mutations: {
    changeNameBian(state){
      state.username='边龙龙'
    },
    changeNameZhao(state,newName){
      state.username=newName.username
    }
  },
  actions: {
  },
  modules: {
  }
})
