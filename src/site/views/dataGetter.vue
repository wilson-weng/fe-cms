<template>
  <div>
    <el-card class="m-a-1">
      <el-form label-position="left" label-width="120px">
        <el-form-item label="选择模块：">
          <el-radio-group v-model="selectedModule" @change="reset">
            <el-radio-button :label="module" :key="module" v-for="module in modules"></el-radio-button>
          </el-radio-group>
          <el-button type="default" class="pull-right" @click="refresh()">刷新</el-button>

        </el-form-item>
        <el-form-item label="请求API：" class="m-t-1">
          <div>/data/query</div>
        </el-form-item>
        <el-form-item label="请求参数：">
          <div>options: {{queryString}}</div>
          <div>filters: {{filterString}}</div>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="m-a-1">
      <div class="h3" slot="header">获取方法（单选）</div>
      <el-table
        ref="multipleTable"
        :data="queryList"
        style="width: 100%"
        highlight-current-row
        @current-change="handleCurrentChange">
        <el-table-column
          prop="attr_name"
          label="方法名">
        </el-table-column>
        <el-table-column
          prop="input_args"
          label="输入字段">
        </el-table-column>
        <el-table-column
          label="备注"
        >
          <template slot-scope="scope"><div v-html="scope.row.comment"></div></template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="m-a-1">
      <div class="h3" slot="header">获取字段（多选）</div>
      <el-table
        ref="multipleTable"
        :data="attrList"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="attr_name"
          label="方法名">
        </el-table-column>
        <el-table-column
          prop="input_args"
          label="输入字段">
        </el-table-column>
        <el-table-column
          label="备注"
        >
          <template slot-scope="scope"><div v-html="scope.row.comment"></div></template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import pluginButton from '../components/pluginButton.vue';

  export default {
    props: [],

    components: { pluginButton, },

    computed: {
      ...mapState({
        modules: function(){
          return Array.from(new Set(this.dataList.map(item=>item.dao)))
        },
        queryList: function(){
          let queryList = []
          for(let item of this.dataList){
            if(item.dao === this.selectedModule && ['get','list'].indexOf(item.type)>=0){
             queryList.push(item);
            }
          }
          return queryList
        },
        attrList: function(){
          let queryList = []
          for(let item of this.dataList){
            if(item.dao === this.selectedModule && item.type==='add'){
              queryList.push(item);
            }
          }
          return queryList
        },
        queryString: function(){
          return JSON.stringify({module: this.selectedModule, query: this.query.attr_name, attrs: this.attrs.map(item=>item.attr_name)})
        },
        filterString: function(){
          let filterList = {}
          let queryArgs = this.query.input_args? this.query.input_args.split(','):[]
          queryArgs.map(item=>(filterList[item] = ''));
          for(let item of this.attrs){
            queryArgs = item.input_args? item.input_args.split(','):[]
            queryArgs.map(item=>(filterList[item] = ''));
          }
          return JSON.stringify(filterList)
        }
      }),
    },
    methods: {
      ...mapActions(['getDataGetters', 'refreshDataGetter']),
      handleSelectionChange(val){
        this.attrs = val?val:[];
      },
      handleCurrentChange(val){
        this.query = val?val:'';
      },
      refresh(){
        this.refreshDataGetter().then(res=>{
          this.getDataGetters().then(res=>{
            this.dataList = res.data
          });
        })
      },
      reset(){
        console.log('reset')
        this.query = ''
        this.attrs = []
      }
    },
    data() {
      return {
        dataList: [],
        selectedModule: 'proj',
        query: '',
        attrs: [],
      }
    },

    created() {
      this.getDataGetters().then(res=>{
        this.dataList = res.data
      });
    },
  }
</script>
