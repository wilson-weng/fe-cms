import * as mutation from '../constants/mutationTypes';
import * as urls from '../constants/urls';
import * as Utils from '../utils';
import * as mutationTypes from 'src/site/constants/mutationTypes'
import axios from 'axios'


export const getProjList = ({ commit }, params) => {
  return fetch(`${urls.GET_PROJ_PLUGINS}?page=${params.page}&company_id=${params.company_id}`, {
    method: 'GET',
    credentials: 'include',
    headers: Utils.getFormHeader(),
  })
    .then(response => response.json())
    .then(result => {
      if(result.status == 'ok'){
        commit(mutation.GET_PROJ_PLUGINS, result.content.result);
        return result;
      }
      else{
        return result;
      }
    });
}


export const getPlugins = ({ commit }) => {
  return fetch(`${urls.GET_PLUGINS}`, {
    method: 'GET',
    credentials: 'include',
    headers: Utils.getFormHeader(),
  })
    .then(response => response.json())
    .then(result => {
      if(result.status == 'ok'){
        commit(mutation.GET_PLUGIN_QUERY, result.content);
        return result;
      }
      else{
        return result;
      }
    });
}

export const updatePlugin = ({ commit }, params) => {
  return fetch(`${urls.PROJ_PlUGIN_UPDATE}`,{
    method: 'POST',
    credentials: 'include',
    headers: Utils.getFormHeader(),
    body: Utils.getPostParams(params)
  })
    .then(response => response.json())
    .then(result => {
      if(result.status == 'ok' && result.content){
        commit(mutation.SET_CURRENT_PLUGIN, result.content);
        return result;
      }
      else{
        return result;
      }
    });
}


export const getPageConfigure = ({ commit }) => {
  return axios.get(`${urls.FE_CONFIGURE}`)
    .then(response => response.data)
};

export const updatePageConfigure = ({ commit }, params) => {
  return axios.post(`${urls.FE_CONFIGURE}`, params)
    .then(response => response.data)
};


export const setCurrentProj = ({ commit }, proj) => {
  commit(mutationTypes.SET_CURRENT_PROJ, proj);
}
