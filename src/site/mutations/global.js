import * as actions from '../actions/global';
import * as mutationTypes from '../constants/mutationTypes';

const initState = {
  current_org: '',
  current_user: {},
  org_list: []
};

const getters = {

};

const mutations = {
  [mutationTypes.SET_CUR_ORG](state, obj) {
    state.current_org = obj;
  },
  [mutationTypes.SET_CUR_USER](state, obj) {
    state.current_user = obj;
  },
  [mutationTypes.SET_ORG_LIST](state, obj) {
    state.org_list = obj;
  },
};


export default {
  state: initState,
  getters,
  actions,
  mutations,
};
