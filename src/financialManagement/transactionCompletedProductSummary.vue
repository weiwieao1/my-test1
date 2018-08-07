<template>
  <!--交易完成商品汇总表-->
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="完成日期">
        <el-date-picker
          @change="dateChange"
          v-model="formInline.dates"
          type="datetimerange"
          align="right"
          unlink-panels
          placeholder="请输入完成日期"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="供应商">
        <el-select v-model="formInline.appler" placeholder="请选择" clearable filterable  @change="applerChange">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="skucode">
        <el-input placeholder="请输入skucode" v-model="skucode"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="inquiry">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="skucode='';formInline.appler='';formInline.dates=''">清除条件</el-button>
      </el-form-item>
      <el-form-item>
        <a :href="this.url+'/finance/allGoods_export?warehouse='+formInline.appler+'&startTime='+startTime+'&endTime='+endTime+'&skucode='+skucode"><el-button type="primary">导出</el-button></a>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      v-loading="loading"
      element-loading-text="拼命加载中"
      border
      style="width: 100%;font-size: 12px">
      <el-table-column
        prop="goodsSpu"
        label="spucode"
      >
      </el-table-column>
      <el-table-column
        prop="goodsSku"
        label="skucode"
      >
      </el-table-column>
      <el-table-column
        prop="quantity"
        label="商品数量"
      >
      </el-table-column>
      <el-table-column
        prop="price"
        label="售价">
      </el-table-column>
      <el-table-column
        prop="total"
        label="总金额">
      </el-table-column>
      <el-table-column
        prop="coin"
        label="实际支付金币">
      </el-table-column>
      <el-table-column
        prop="comsumeRMB"
        label="实际支付金额">
      </el-table-column>
      <el-table-column
        prop="rate"
        label="税率">
      </el-table-column>
      <el-table-column
        prop="payAccount"
        label="支付方式">
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20,50]"
        :page-size="pages"
        layout="total, sizes, prev, pager, next, jumper"
        :total="arr.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pages:20,
        skucode: '',//查询-sku
        formInline: {
          dates: '',
          appler: ''
        },
        pickerOptions: {
          shortcuts: [
            {
              text: '今日',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime());
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '昨日',
              onClick(picker) {
//                                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                picker.$emit('pick', [start, start]);
              }
            },
            {
              text: '最近7日',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近30日',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '本月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                let day = start.getDate() - 1;
                start.setTime(start.getTime() - 3600 * 1000 * 24 * day);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '上月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                let monthStart = start.getMonth() + 1 - 1;
                let monthEnd = start.getMonth() + 1;

                //传入日期获取时间戳函数；看懂了自己再改改
                function da(month, day) {
                  let start1 = new Date();
                  let year = start1.getFullYear();
                  let str = year.toString() + '/' + '0' + month.toString() + '/' + day;
                  let date = new Date(str);
                  let time = date.getTime();
                  return time;
                };

                let st = da(monthStart, '01');
                let en = da(monthEnd, '01');

                start.setTime(st);
                end.setTime(en);
                picker.$emit('pick', [start, end]);
              }
            }
          ]
        },
        options: [],//供应商
        tableData: [],
        currentPage: 1,//分页
        arr: [],//分页
        startTime: '',
        endTime: '',
        loading: false,
      }
    },
    methods: {
      inquiry() {
        this.currentPage = 1;
        this.ajax(this.pages,this.currentPage, this.formInline.appler, this.skucode)
      },
//            查询-时间
      dateChange(val) {
        console.log(val);
        if(val===undefined||val===''){
          this.startTime = '';
          this.endTime = '';
        }else{
          this.startTime = val.substring(0,19);
          this.endTime = val.substring(20,39);
        }

      },
//            查询-供应商
      applerChange(val) {
        console.log(val);
        console.log(this.formInline.appler);
      },
//            分页
      handleSizeChange(val){
        this.pages = val;
        this.ajax(this.pages,this.currentPage, this.formInline.appler, this.skucode)
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.ajax(this.pages,this.currentPage, this.formInline.appler, this.skucode)
      },
      //事件戳转换
      add0(m) {
        return m < 10 ? '0' + m : m
      },
      formatDate(timestamp) {
//timestamp是整数，否则要parseInt转换
        var time = new Date(timestamp);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y + '-' + this.add0(m) + '-' + this.add0(d)
      },
//            ajax
      ajax(a0,a1, a4, a5) {
        this.loading = true;
        this.$http.post(this.url + '/finance/allGoods', {
          pageNumber: a1,
          pageSize: a0,
          startTime: this.startTime,
          endTime:  this.endTime,
          warehouse: a4,
          skucode: a5,
        }, {emulateJSON: true}).then(function (res) {
          console.log(res);
          this.loading = false;
          if ( res.data.data==null||res.data.data.pageList == null) {
            this.tableData = [];
            this.arr.length = 0;
          } else {
            this.tableData = res.data.data.pageList;
            this.arr.length = res.data.data.pageTotal;
          }
        });
      }
    },
    mounted() {
//           查询商品发货仓所有
      this.$http.post(this.url + '/warehouse/all_warehouse', {
        page: 1,
        num: 10000000,
        status: 1,
      }, {emulateJSON: true}).then(function (res) {
        console.log(res);
        if (res.data.data == null||res.data.data.pageList==null) {
          this.options = [];
        } else {
          for (let i = 0; i < res.data.data.pageList.length; i++) {
            let obj = {};
            obj.value = res.data.data.pageList[i].warehouseCode;
            obj.label = res.data.data.pageList[i].warehouseName;
            this.options.push(obj);
          }
        }
      });
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      this.formInline.dates = [this.formatDate(start.getTime()), this.formatDate(new Date())];
      this.startTime = this.formatDate(start.getTime());
      this.endTime = this.formatDate(new Date());
      this.ajax(20,1, '', '', '', '', '');
    }

  }
</script>

<style scoped>
  .grid-content {
    display: flex;
  }

  .spans1 {
    width: 120px;
  }

  .spans0 {
    width: 120px;
  }

  .el-tabs {
    margin-top: 10px;
  }

  .el-col {
    line-height: 36px;
  }

  .footer {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  p {
    /*color: red;*/
    font-size: 14px;
  }

  .btns {
    margin: 5px 0;
  }

  .bgs {
    border: 1px solid red;
    color: red;
  }

  .sure {
    margin-top: 15px;
  }

  .redP {
    color: red;
  }

  .xiaoshou {
    cursor: pointer;
    color: blue;
  }

  .blue {
    color: blue;
  }

  img {
    width: 50px;
    height: 50px;
  }

  .bb {
  }

  .borderB {
    border-top: 1px dashed gray;
  }

  .table {
    max-height: 600px;
    overflow-y: scroll;
  }

  .block {
    text-align: right;
    margin-top: 5px;
  }
</style>
