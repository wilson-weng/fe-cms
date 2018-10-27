<template>
    <el-container class="height-100">
      <el-header class="layout-header">
        <nav-top></nav-top>
      </el-header>
      <el-container class="height-100">
          <el-aside width="200px">
            <nav-slider></nav-slider>
          </el-aside>
          <div style="background-color: #F9FBFD;" class="width-100">
            <selection-bar v-if="showSelectionBar" :options="orgList" :on-select="onOrgSelect">
              <div class="inline-block">{{currentOrg? '公司: '+currentOrg.org_name: '请选择客户公司'}}</div>
            </selection-bar>
            <router-view class="router-view"></router-view>
          </div>
      </el-container>
    </el-container>
</template>


<script>
  import navTop from '../components/layout/navTop.vue';
  import navSlider from '../components/layout/navSlider.vue';
  import selectionBar from '../components/layout/selectionBar.vue';
  import { mapState, mapActions } from 'vuex';

  export default {
    computed: {
      ...mapState({
        orgList: state => state.global.org_list.map(item => {
          return { id: item.id, name: item.org_name };
        }),
        orgRawList: state => state.global.org_list,
        currentOrg: state => state.global.current_org,
      })
    },
    components: { navTop, navSlider, selectionBar},

    data() {
      return {
        showSelectionBar: true,
      }
    },
    methods: {
      ...mapActions(['getOrgs', 'setCurrentOrg']),
      onOrgSelect(org_id){
        this.setCurrentOrg(this.orgRawList.find(item=>item.id == org_id))
      }
    },
    created(){
      this.getOrgs();
    }
  }
</script>
