<template>
  <div>
    <el-menu v-if="companySelected"
             default-active="/worktable"
             :router="true"
             class="no-border m-t-1">
      <el-menu-item index="/worktable">
        <i class="el-icon-menu"></i>
        <span slot="title">操作台</span>
      </el-menu-item>
    </el-menu>
    <el-menu v-else
             :router="true"
             class="no-border m-t-1">
      <el-menu-item index="/company">
        <i class="el-icon-menu"></i>
        <span slot="title">公司列表</span>
      </el-menu-item>
      <el-menu-item index="/data">
        <i class="el-icon-menu"></i>
        <span slot="title">数据获取</span>
      </el-menu-item>
    </el-menu>
    <div style="position:fixed; left:0; bottom:0;width:200px;">
      <el-row>
        <el-col :span="12" class="text-center">
          <el-button type="text" class="color-text-hint" @click="showResetPswDialog = true"><i class="el-icon-setting" style="margin-right: 2px;"></i>设置</el-button>
        </el-col>
        <el-col :span="12" class="text-center">
          <el-button type="text" class="color-text-hint" @click="logout()"><i class="fas fa-sign-out-alt" style="margin-right: 2px;"></i>登出</el-button>
        </el-col>
        <el-dialog title="修改密码" :visible.sync="showResetPswDialog">
          <dialog-reset-password></dialog-reset-password>
        </el-dialog>
      </el-row>
    </div>
  </div>

</template>

<script>

  import { mapState } from 'vuex';
  import dialogResetPassword from '../dialog/dialogResetPassword.vue';

  export default {
    components: {dialogResetPassword},
    computed: {
      ...mapState({
        currentCompany: state => state.global.current_company,
      }),
    },
    methods: {
      logout(){
        this.$router.push({path: '/login'});
      },
    },

    data() {
        return {
          companySelected: false,
          showResetPswDialog: false
        }
    },
    watch: {
      $route: {
        handler: function(val, oldVal){
          if(val.name == 'company' || !this.currentCompany.id){
            this.companySelected = false;
          }else{
            this.companySelected = true;
          }
        },
        // 深度观察监听
        deep: true
      }
    },
    created(){
      this.companySelected = !!this.currentCompany.id;
    }

  }
</script>
