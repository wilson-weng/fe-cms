<template>
    <div>
      <H3>选择页面<span class="subtitle m-l-1">在任意组件上加上v-gear指令后，即可在此对组件远端参数进行配置</span></H3>
      <el-tabs tabPosition="left" v-model="selectedPage" @tab-click="handleClick">
        <el-tab-pane :label="url" :name="url" :key="url" v-for="url in pageUrls">
          <el-card v-for="config in pageConfigs[url]" :key="config.id">
            <gear-edit-panel :config="config"></gear-edit-panel>
          </el-card>
        </el-tab-pane>
      </el-tabs>

    </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import gearEditPanel from '../components/gearEditPanel.vue';

  export default {
    props: [],
    components: { gearEditPanel },
    computed: {
      pageUrls: function(){
        let urls = [];
        for(let item of this.configs){
          if(urls.indexOf(item.page_url) < 0){
            urls.push(item.page_url);
          }
        }
        return urls;
      },
      pageConfigs: function(){
        let pageConfigs = {};
        for(let item of this.configs){
          if(pageConfigs[item.page_url]){
            pageConfigs[item.page_url].push(item)
          }else{
            pageConfigs[item.page_url] = [item]
          }
        }
        return pageConfigs;
      }
    },
    data() {
      return {
        configs: [],
        selectedPage: ''
      }
    },
    created(){
      this.getPageConfigure().then(res=>{
        this.configs = res.data;
        console.log(this.configs)
      })
    },
    methods: {
      ...mapActions(['getPageConfigure']),
      handleClick(){

      }
    },
  }
</script>

