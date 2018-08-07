<template>
    <div class="datas">
      <div style="width:80%;">
        <p style="color: red;font-size: 16px;margin-bottom: 10px">以下数据每隔15分钟刷新一次</p>
        <el-table
          :data="tableData"
          border
          style="width: 100%;text-align: right">
          <el-table-column
            prop="type"
            label=""
            header-align="right"
          >
          </el-table-column>
          <el-table-column
            prop="gmv"
            label="GMV"
            header-align="right"
          >
          </el-table-column>
          <el-table-column
            prop="orderNum"
            label="订单数"
            header-align="right"
          >
          </el-table-column>
          <el-table-column
            prop="personNum"
            header-align="right"
            label="消费人数">
          </el-table-column>
          <el-table-column
            prop="meanOrder"
            header-align="right"
            label="订单均价">
          </el-table-column>
          <el-table-column
            prop="personPrice"
            header-align="right"
            label="客单价">
          </el-table-column>
          <el-table-column
            prop="time"
            header-align="right"
            label="最后订单时间">
            <template slot-scope="scope">
              <span v-show="scope.row.time==null?false:true">{{scope.row.time | time}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
    export default {
        name: "datas",
      data(){
          return{
            tableData:[],
            times:Object
          }
      },
      methods:{
        ajax(){
          console.log('请求---------');
          this.tableData = [];
          this.$http.post(this.url+'/system/getIndexData',{}).then(function (res) {
            console.log(res);
            let r = res.data.data;
            let yesterday = r.yesterday,today = r.today,thisMonth = r.thisMonth,lastMonth = r.lastMonth;
            yesterday['type'] = '昨日数据';
            today['type'] = '今日数据';
            thisMonth['type'] = '本月累计';
            lastMonth['type'] = '上月累计';
            this.tableData.push(yesterday,today,thisMonth,lastMonth);
          })
        }
      },
      beforeMount(){
        // var self = this;
        // setInterval(self.ajax,3000);
      },
      created() {
        this.ajax();
        // // // setInterval(this.ajax,9000);
        // let timer=()=>{
        //   clearTimeout(this.times);
        //   this.ajax();
        //   this.times = setTimeout(timer(),9000);
        // };
        // timer();
        this.times=setInterval(this.ajax,900000);
      },
      beforeDestroy() {
       // clearTimeout(this.times);
       clearInterval(this.times);
      }
    }
</script>

<style scoped>

</style>
