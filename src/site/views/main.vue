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
            <selection-bar v-if="showSelectionBar"></selection-bar>
            <router-view class="router-view"></router-view>
          </div>
      </el-container>
    </el-container>
</template>


<script>
  import navTop from '../components/layout/navTop.vue';
  import navSlider from '../components/layout/navSlider.vue';
  import selectionBar from '../components/layout/selectionBar.vue';

  export default {
    computed: {
    },
    components: { navTop, navSlider, selectionBar},

    data() {
      return {
        showSelectionBar: true
      }
    },

  }
</script>
