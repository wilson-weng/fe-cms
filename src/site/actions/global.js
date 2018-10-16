import * as mutationTypes from '../constants/mutationTypes';
import axios from 'axios'
import * as urls from '../constants/urls';


export const setCurrentCompany = ({ commit }, currentCompany) => {
  commit(mutationTypes.SET_CUR_COMPANY, currentCompany);
}


export const setPasswordChange = ({ commit }) => {
  return new Promise();
}

export const checkLoginUser = ({ commit }, params) => {
  return new Promise((resolve)=>{
    if(params.account === 'laowujia' || params.password === 'baimagongyu') {
      let result = {
        status: 'ok',
        content: {
          'id': 1,
          'real_name': '管理员',
          'email': '845272203@qq.com',
          'role_id': 999
        }};
      commit(mutationTypes.SET_CUR_USER, result);
      resolve(result);
    }else{
      resolve({status: 'fail', msg: '用户名或密码错误！'})
    }
  });
}


export const getDataGetters = ({ commit }) => {
  return axios.get(`${urls.DATA_GETTER}`)
    .then(response => response.data)
};


export const refreshDataGetter = ({ commit }) => {
  return axios.get(`${urls.DATA_GETTER_REFRESH}`)
    .then(response => response.data)
};
