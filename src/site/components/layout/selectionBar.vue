<template>
  <el-card class="m-a-1" :body-style="{padding: 0}">
    <div class="selection-bar">
      <slot></slot>
      <el-button class="pull-right inline-block" @click="showOptions = !showOptions" size="small">{{showOptions? '收起':'切换'}}</el-button>
    </div>
    <div v-show="showOptions" class="selection-panel">
      <el-row :gutter="20" type="flex">
        <el-col style="max-width: 160px" v-for="item in filters" :key="item.title" v-if="filters">
          <div style="padding: 20px;">{{item.title}}</div>
          <el-menu
            @select="onFilterSelect"
            default-active="2"
            class="selection-menu">
            <el-menu-item index="">全部</el-menu-item>
            <el-menu-item :index="option" v-for="option in item.options" :key="option">{{option}}</el-menu-item>
          </el-menu>
        </el-col>
        <el-col>
          <el-menu @select="onOptionSelect"
                   default-active="2"
                   class="selection-menu">
            <div style="padding: 20px">选择公司</div>
            <el-menu-item index="">全部</el-menu-item>
            <el-menu-item :index="item.id.toString()" v-for="item in options" :key="item.id">{{item.name}}</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
  name: 'selectionBar',
  props: ['options', 'selected', 'onSelect'],
  data() {
    return {
      showOptions: false,
      activateOption: '全部',
      filters: []
    }
  },
  computed: {
    ...mapState({
    }),
  },
  methods: {
    onFilterSelect(index){
    },
    onOptionSelect(index){
      this.showOptions = false;
      this.onSelect && this.onSelect(index)
    }
  },
}
</script>

<style  scoped>
  .el-menu-item {
    height: 38px;
    line-height: 38px;
    width: 120px;
    display: inline-block;
  }
  .selection-menu {
    max-height: 230px;
    overflow-y: auto;
  }
  .selection-bar {
    height: 32px;
    padding: 10px 20px
  }
  .selection-panel {
    max-height:300px;
    border-top: 1px solid #e8e8e8;
    padding-bottom: 20px
  }
</style>
