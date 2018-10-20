<template>
  <div>
    <el-card class="m-a-1">
      <el-table :data="projList" border :header-cell-style="{color: '#303133'}">
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
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="page" layout="prev, pager, next" :total="projTotalPage" :page-size="10" :current-page.sync="page" @current-change="query()">
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
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import pluginButton from '../components/pluginButton.vue';
  import pluginEditPanel from '../components/pluginEditPanel.vue';

  export default {
    props: [],

    components: { pluginButton, pluginEditPanel },

    computed: {
      ...mapState({
        projList: state => state.proj.projList,
        projTotalPage: state => state.proj.projTotalPage,
        plugins: state => state.proj.plugins,
        curProjId: state => state.proj.curProjId,
        currentOrg: state => state.global.current_org,
      }),
    },
    methods: {
      ...mapActions(['getProjList', 'getPlugins', 'setCurrentProj']),
      update(selectedProj) {
        this.projName = selectedProj.proj_name;
        this.setCurrentProj({curProjId: selectedProj.proj_id, curPlugins: selectedProj.plugins})
        this.showPluginDialog = true;
      },
      changePlugin(type, pluginId){
        this.queryProjs()
      },
      query(){
        let params = {page: this.page, org_id: this.currentOrg.id};
        this.getProjList(params);
      }
    },
    data() {
      return {
        tableData: [],
        showPlugins: false,
        showPluginDialog: false,
        projName: '',
        loading: true,
        page: 1
      }
    },

    created() {
      this.query();
      this.getPlugins().then(result => {
        if(result.status == 'ok') {
          this.showPlugins = true;
        }
      });
    },
  }
</script>
