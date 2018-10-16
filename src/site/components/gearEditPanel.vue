<template>
  <div>
    <el-form label-position="left" label-width="120px" :model="propValues">
      <el-form-item label="配置点">
        <div class="h3">{{config.gear_id}}</div>
      </el-form-item>
      <el-form-item :label="prop.title" v-for="prop in propFormats" :key="prop.title">
        <el-input v-model="propValues[prop.title]" :type="prop.type" @input="onInputChange"></el-input>
      </el-form-item>
      <div class="text-right m-t-1">
        <el-button type="primary" @click="updateConfig()" :disabled="!editable">更改</el-button>
        <el-button @click="resetConfig()">复原</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: ['config'],
  data() {
    return {
      editable: false,
      propFormats: this.config.props_format ? JSON.parse(this.config.props_format) : [],
      propValues: this.config.props ? JSON.parse(this.config.props) : {},

    }
  },
  methods: {
    ...mapActions(['updatePageConfigure']),
    updateConfig(){
      let params = {...this.config}
      params.props = JSON.stringify(this.propValues)
      this.updatePageConfigure(params).then(()=>{
        this.$message({message: '修改成功！', type: 'success'})
        this.editable = false;
      });
    },
    onInputChange(){
      this.editable = true;
    },
    resetConfig(){
      this.propValues = this.config.props ? JSON.parse(this.config.props) : {}
      this.editable = true;
    }
  },
  destroyed(){
    this.resetConfig();
  }
}
</script>
