import Vue from 'vue'
import Vuex from 'vuex'
import actions from './site/actions'
import modules from './site/mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  actions,
  modules,
  strict: true,
})


import axios from 'axios';
import * as Utils from "src/site/utils";
axios.interceptors.request.use(function (config) {
  config.headers = Utils.getFormHeader()
  if(store.state.proj.curProjId){
    config.headers.proj_id = store.state.proj.curProjId
  }
  if(config.data){
    config.data = Utils.getPostParams(config.data);
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


export default store
