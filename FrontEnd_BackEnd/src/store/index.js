import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    areaData:{number:{
        totalConfirmCount:0,
        totalDeadCount:0,
        totalCuredCount:0,
        time:0
      },
    results:[
      {
        updateTime:0
      }
    ]}
  },
  mutations: {
    addData(state,payload){
      state.areaData.results = payload.results
      state.areaData.number.totalConfirmCount = payload.number.totalConfirmCount
      state.areaData.number.totalDeadCount = payload.number.totalDeadCount
      state.areaData.number.totalCuredCount = payload.number.totalCuredCount
      state.areaData.number.time = payload.number.time
      // console.log(state.areaData);
    }
  },
  actions: {
    addAreaData(context,payload){
      return new Promise((resolve, reject) => {
        context.commit('addData',payload)
        resolve()
      })
    }
  },
  modules: {
  }
})
