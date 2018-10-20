<template>
  <div>
    <el-card class="m-a-1" v-for="company in companyList" :body-style="{padding: '10px'}" :key="company.id">
      <div slot="header" class="clearfix">
        <img :src="company.company_thumbnail" class="image inline-block m-r-1">
        <div class="inline-block">
          <div class="h2">{{company.company_name}}</div>
          <div class="subtitle">{{company.company_desc}}</div>
        </div>
        <el-button class="pull-right" style="margin-top: 8px;" @click="enterCompany(company)" size="small">进入公司</el-button>
      </div>
      <div>
        <el-tag type="info" color="white">开始日期： {{company.start_time}}</el-tag>
        <el-tag type="info" color="white">服务模式： {{company.service_type}}</el-tag>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import statsCard from '../components/statsCard.vue';

  export default {
    components: { statsCard },
    computed: {
      ...mapState({
        companyList: state => state.company.company_list,
      }),
    },
    methods: {
      ...mapActions(['getCompanyList', 'setCurrentCompany']),
      enterCompany(company){
        this.setCurrentCompany(company);
        this.$router.push({path: '/plugin'});
      }
    },
    created(){
      this.getCompanyList({page: 1});
    }

  }
</script>

