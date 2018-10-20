<template>
  <el-card class="m-a-1" :body-style="{padding: 10}">
    <div class="h2">{{selected}}</div>
    <el-button class="pull-right" style="margin-top: 8px;" @click="showOptions = !showOptions" size="small">{{showOptions? '收起':'切换'}}</el-button>
    <div v-show="showOptions" style="max-height:300px">
      <el-row :gutter="20" type="flex">
        <el-col :span="1" v-for="item in filters">
          <ul>
            <li v-for="option in item.options">{{option.name}}</li>
          </ul>
        </el-col>
        <el-col>
          <ul>
            <li v-for="option in options">{{options.name}}</li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  export default {
  name: 'selectionBar',
  props: ['filters', 'options', 'selected'],
  data() {
    return {
      showOptions: false,
      selected: '全部',
    }
  },
  computed: {
    ...mapState({
    }),
  },
  methods: {

  },
  created(){
  }
}
</script>
