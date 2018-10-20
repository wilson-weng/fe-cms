<template>
  <div>
    <el-menu default-active="/company"
             :router="true"
             class="no-border m-t-1">
      <el-submenu  index="/company">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>公司管理</span>
        </template>
        <el-menu-item index="/plugin">插件管理</el-menu-item>
        <el-menu-item index="/feconfigure">前端配置</el-menu-item>
      </el-submenu>
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
          showResetPswDialog: false
        }
    },

  }
</script>
