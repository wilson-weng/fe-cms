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
            <current-company-bar v-if="showCompanyBar"></current-company-bar>
            <router-view class="router-view"></router-view>
          </div>
      </el-container>
    </el-container>
</template>


<script>
  import navTop from '../components/layout/navTop.vue';
  import navSlider from '../components/layout/navSlider.vue';
  import currentCompanyBar from '../components/currentCompanyBar.vue';
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState({
        currentCompany: state => state.global.current_company,
      }),
    },
    components: { navTop, navSlider, currentCompanyBar},

    data() {
      return {
        showCompanyBar: false
      }
    },
    watch: {
      $route: {
        handler: function(val, oldVal){
          if(val.name == 'company' || val.name == 'mobile' || val.name == 'data'){
            this.showCompanyBar = false;
          }else {
            this.showCompanyBar = true;
          }
        },

        // 深度观察监听
        deep: true
      }
    },
    mounted(){
      this.showCompanyBar = !!this.currentCompany.id;
      if(!this.currentCompany.id){
        this.$router.push('company');
      }
    }
  }
</script>
