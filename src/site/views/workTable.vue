<template>
  <div>
    <el-card class="m-a-1">
      <el-table :data="projs" border :header-cell-style="{color: '#303133'}">
        <el-table-column prop="proj_name" label="项目名称" min-width="4px"></el-table-column>
        <el-table-column label="项目插件" min-width="7px">
          <template slot-scope="scope">
            <plugin-button :props="plugin.props" :plugin="plugins[plugin.plugin_id]" :disabled="true" v-for="plugin in scope.row.plugins"
                           :key="plugin.key" v-if="showPlugins && plugins[plugin.plugin_id]" style="margin: 2px;"></plugin-button>
          </template>
        </el-table-column>
        <el-table-column label="操作"  min-width="4px">
          <template slot-scope="scope">
            <el-button @click.native.prevent="update(scope.row)" type="text">
              编辑
            </el-button>
            <el-button @click.native.prevent="feconfigure(scope.row)" type="text">
              前端配置
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="page" layout="prev, pager, next" :total="count" :page-size="10" :current-page.sync="curPage" @current-change="query(1)">
      </el-pagination>
    </el-card>
    <el-dialog title="编辑活动" v-if="showPluginDialog" :visible.sync="showPluginDialog">
      <el-input v-model="projName" disabled class="mission-input"></el-input>
      <br><br><br>
      <plugin-edit-panel  @changePlugin="changePlugin"></plugin-edit-panel>
      <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="showPluginDialog=false">确认</el-button>
          </span>
    </el-dialog>
    <el-dialog title="前端配置" :visible.sync="showFeconfigDialog">
      <feconfigure-panel></feconfigure-panel>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import pluginButton from '../components/pluginButton.vue';
  import pluginEditPanel from '../components/pluginEditPanel.vue';
  import feconfigurePanel from '../components/feconfigurePanel.vue';

  export default {
    props: [],

    components: { pluginButton, pluginEditPanel, feconfigurePanel },

    computed: {
      ...mapState({
        projs: state => state.proj.projs,
        plugins: state => state.proj.plugins,
        curProjId: state => state.proj.curProjId,
        currentCompany: state => state.global.current_company,
      }),
    },
    methods: {
      ...mapActions(['getProjList', 'getPlugins', 'setCurrentProj']),
      update(selectedProj) {
        this.projName = selectedProj.proj_name;
        this.setCurrentProj({curProjId: selectedProj.proj_id, curPlugins: selectedProj.plugins})
        this.showPluginDialog = true;
      },
      feconfigure(selectedProj) {
        this.projName = selectedProj.proj_name;
        this.setCurrentProj({curProjId: selectedProj.proj_id, curPlugins: selectedProj.plugins})
        this.showFeconfigDialog = true;
      },
      changePlugin(type, pluginId){
        this.queryProjs()
      },
      queryProjs(){
        let params = {page: 1, company_id: this.currentCompany.company_id};
        this.getProjList(params);
      }
    },
    data() {
      return {
        tableData: [],
        showPlugins: false,
        showPluginDialog: false,
        showFeconfigDialog: false,
        projName: '',
        count: 10,
        curPage: 1,
        loading: true
      }
    },

    created() {
      this.queryProjs();
      this.getPlugins().then(result => {
        if(result.status == 'ok') {
          this.showPlugins = true;
        }
      });
    },
  }
</script>
