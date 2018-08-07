<template>
  <div id="main">
    <el-tabs type="border-card"  v-model="activeName" @tab-click="handleClick">
      <el-tab-pane  v-for="(item,index) in items" :key="index" :label="item.label">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="activityId"
            label="ID"
            >
          </el-table-column>
          <el-table-column
            prop="activityName"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="activityType"
            label="leixng">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeName:'',
        items:[{label:'用户管理'},{label:'配置管理'},{label:'财务管理'}],
        tableData:[]
      }
    },
    methods: {
      handleClick(val){
        console.log(val.index);
        if(val.index=='1'){
          this.ajax('FLASH_SALE');
        }else if(val.index=='2'){
          this.ajax('ANY_TIME');
        }else{
          this.ajax('FULL_CUT');
        }
      },
      ajax(a){
        this.$http.post(this.url+'/activity/getActivityList',{page: 1,num: 10,activityType: a}).then(function (res) {
          console.log(res);
          console.log('aaaaaaaaaaaaa');
          if(res.data.data==null){
            this.tableData = []
          }else{
            this.tableData = res.data.data.pageList;

          }
        })
      }
    },
    mounted() {
      this.ajax('FULL_CUT');
    },
  }
</script>

<style>

</style>
