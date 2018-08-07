<template>
  <!--财务审核-->
  <div class="financial-audit">
    <!--nav-->
    <el-row :gutter="12" style="font-size: 14px;color:#48576a">
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <span style="width: 80px">退款单号</span>
          <el-input type="primary" v-model="refundNo" placeholder="请输入退款单号"></el-input>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <span style="width: 60px">订单号</span>
          <el-input type="primary" v-model="orderNo" placeholder="请输入订单号"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <span style="width: 80px">退款方式</span>
          <el-select v-model="value1" placeholder="请选择" clearable>
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <span style="width: 80px">退款状态</span>
          <el-select v-model="value2" placeholder="请选择" clearable>
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <el-button type="primary" @click="inquiry">查询</el-button>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <el-button type="primary" @click="value2='';value1='';orderNo='';refundNo=''">清除条件</el-button>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <el-button type="primary" @click="export0">导出</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      border
      v-loading="tableLoading"
      element-loading-text="拼命加载中"
      style="width: 100%;;margin-top: 8px"
      @selection-change="handleSelectionChange"
      :max-height="cliH"
    >
      <el-table-column
        type="selection"
        disabled="true"
        :selectable="selectable"
        width="55">
      </el-table-column>
      <el-table-column
        prop=""
        label="原订单详情"
      >
        <template slot-scope="scope">
          <el-button type="text" @click="originOrderDetail(scope.row,scope.$index)">原订单详情</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="refundNo"
        label="退款单号"
      >
      </el-table-column>
      <el-table-column
        prop="refundAmountType"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="serviceRemark"
        label="账户">
      </el-table-column>
      <el-table-column
        prop="responsibleParty"
        label="责任方"
      >
      </el-table-column>
      <el-table-column
        prop="autorefundPath"
        label="退款账户类型">
      </el-table-column>
      <el-table-column
        prop="refundAmounts"
        label="应退金币">
        <template slot-scope="scope">
          <el-tooltip effect="light" placement="top-start">
            <div slot="content" style="font-size: 14px;">
              <p class="blue">补偿金币 : {{scope.row.recoupGolds}}</p>
            </div>
            <p class="xiaoshou">{{scope.row.refundAmounts}}</p>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="refundCashAdvances"
        label="应退金额">
        <template slot-scope="scope">
          <el-tooltip effect="light" placement="top-start">
            <div slot="content" style="font-size: 14px">
              <p class="blue">运费 : {{scope.row.refundCarriages}}</p>
              <p class="blue">税费 : {{scope.row.refundRatePrices}}</p>
              <p class="blue">补偿金额 : {{scope.row.recoupRmbs}}</p>
            </div>
            <p class="xiaoshou">{{scope.row.refundCashAdvances}}</p>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="gmtCreate"
        label="发起时间">
        <template slot-scope="scope">
          <span>{{scope.row.gmtCreate | time}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="thirdPartyRefundNo"
        label="流水号">
      </el-table-column>
      <el-table-column
        prop="isFinished"
        label="状态">
        <template slot-scope="scope">
          <span class="redP">{{scope.row.isFinished}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="operate"
        label="操作">
        <template slot-scope="scope">
          <div v-show="scope.row.btnShow">
            <div v-show="scope.row.refundAmountType=='补偿'?false:true">
              <el-button type="text" @click="noPass(scope.row,scope.$index)">驳回</el-button>
              <br>
            </div>
            <el-button type="text" @click="pass(scope.row,scope.$index)">审核通过</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="block">
      <el-button type="primary" :disabled="disabled" @click="wholeAudit">批量审核</el-button>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20]"
        :page-size="pages"
        layout="total, sizes, prev, pager, next, jumper"
        :total="arr.length">
      </el-pagination>
    </div>
    <!--驳回弹框-->
    <el-dialog title="驳回理由" :visible.sync="DialogVisible">
      <el-form :model="formInline">
        <el-form-item label="驳回理由" :label-width="formLabelWidth">
          <el-input v-model="formInline.reason" type="textarea" auto-complete="off" style="width: 50%"></el-input>
        </el-form-item>
      </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="DialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sure">确 定</el-button>
        </div>
    </el-dialog>
    <!--原订单详情弹框-->
    <el-dialog title="原订单详情" :visible.sync="dialogFormVisible" top="5vh">
      <el-form :model="form" v-loading="formLoading">
        <el-form-item label="订单编号" :label-width="formLabelWidth">
          <p>{{form.code}}</p>
        </el-form-item>
        <el-form-item label="拍单时间" :label-width="formLabelWidth">
          <p v-show="takeOrderTimeShow">{{form.takeOrderTime | time}}</p>
        </el-form-item>
        <el-form-item label="支付时间" :label-width="formLabelWidth">
          <p v-show="payTimeShow">{{form.payTime | time}} </p>
        </el-form-item>
        <el-form-item label="订单状态" :label-width="formLabelWidth">
          <p>{{form.orderStatus}}</p>
        </el-form-item>
        <el-form-item label="订单总额" :label-width="formLabelWidth">
          <p>{{form.money}}</p>
        </el-form-item>
        <el-form-item label="商品信息" :label-width="formLabelWidth">
          <div v-for="data,index3 in form.orderDetail" style="display: flex"
               :class="index3>0 ? 'borderB':'bb'">
            <img style="padding-top: 20px" :src="data.src"
                 alt="商品图片" class="pics">
            <div>
              <p>商品名称: <span>{{data.commodityName}}</span></p>
              <p>单价: <span>{{data.price}}</span></p>
              <p>数量: <span>{{data.number}}</span></p>
              <p>已退款数量: <span>{{data.refoundNumber}}</span></p>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="收货地址" :label-width="formLabelWidth">
          <p>{{form.address}}</p>
        </el-form-item>
        <el-button type="primary" @click="dialogFormVisible = false"
                   style="padding: 10px 15px;margin-left: 500px">返回列表
        </el-button>
      </el-form>
    </el-dialog>
    <!--导出弹框-->
    <el-dialog title="选择日期" :visible.sync="dialogFormVisible11">
      <el-form>
        <el-form-item label="选择日期" :label-width="formLabelWidth">
          <el-date-picker
            style="width: 50%;"
            @change="dateChange"
            v-model="dates"
            type="daterange"
            align="right"
            unlink-panels
            placeholder="请选择日期"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible11 = false">取 消</el-button>
        <el-button type="primary" @click="sure11">导 出</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        cliH:600,
        pages:20,
        tableLoading:false,
        dialogFormVisible11: false,
        formLoading: false,//原订单详情
        //导出
        dates: '',//日期
        formLabelWidth0: '160px',
        dialogFormVisible0: false,
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
        startTime: '',
        endTime: '',

        form: {},//原订单详情
        formLabelWidth: '120px',
        payTimeShow: '',
        takeOrderTimeShow: '',
        dialogFormVisible: false,//原订单详情
        activeName: 'first',
        options1: [
          {
            value: '0',
            label: '系统打款'
          }, {
            value: '1',
            label: '财务打款'
          }],//退款方式
        options2: [
          {
            value: '0',
            label: '未完成'
          }, {
            value: '1',
            label: '已完成'
          },
          {
            value: '2',
            label: '审核中'
          },
        ],//退款状态
        value1: '',//退款方式
        value2: '',//退款状态
        tableData: [],//table表
        arr: [],//分页
        currentPage: 1,
        items: ["全部", "退款", "补偿"],//按钮
        // nowIndex: 0,
        refundAmountType: '',
        refundNo: '',//退款单号
        orderNo: '',//订单编号
        multipleSelection: [],//批量
        disabled: '',//按钮变灰
        DialogVisible: false,//驳回
        formInline: {reason: ""},
        rules: {reason: [{required: true, message: '请填写驳回理由', trigger: 'blur'}]},
        rows: '',//sure-驳回
      }
    },
    methods: {
      //导出
      export0() {
        //清空
        this.dates = '';
        this.dialogFormVisible11 = true;
      },
      //日期
      sure11() {
        if (this.dates == undefined || this.dates == '' || this.dates.length == 0) {
          this.$message({
            type: 'warning',
            message: '请选择时间!'
          });
        } else {
          window.location.href = this.url + '/finance/export_fiancelook?startTime=' + this.startTime + '&endTime=' + this.endTime
        }
      },
      //日期
      dateChange(val) {
        console.log(val);
        this.startTime = val.substring(0, 10) + ' 00:00:00';
        this.endTime = val.substring(11, 21) + ' 23:59:59';
      },
      //查看原订单详情
      originOrderDetail(row, index) {
        this.dialogFormVisible = true;
        this.formLoading = true;
        this.$http.post(this.url + '/manage/query_order_details', {orderNo: row.orderNo}, {emulateJSON: true}).then(function (res) {
          this.form.code = res.data.data.orderNo;//订单编号
          if (res.data.data.gmtCreate == '' || res.data.data.gmtCreate == null) {
            this.takeOrderTimeShow = false;
          } else {
            this.form.takeOrderTime = res.data.data.gmtCreate;//拍单时间
            this.takeOrderTimeShow = true;
          }
          if (res.data.data.paymentTime == '' || res.data.data.paymentTime == null) {
            this.payTimeShow = false;
          } else {
            this.payTimeShow = true;
            this.form.payTime = res.data.data.paymentTime;//支付时间
          }
          //订单状态
          let orderStatusArr = ['待付款', '交易关闭', '待发货', '待收货', '交易完成', '已退款'];
          for (let j = 0; j < orderStatusArr.length; j++) {
            if (res.data.data.orderStatus == j) {
              this.form.orderStatus = orderStatusArr[j];
            }
          }
          //订单总额
          if (res.data.data.orderCarriages == null) {
            this.form.money = res.data.data.orderProductPriceTotals;
          } else {
            this.form.money = res.data.data.orderProductPriceTotals + '(含运费:' + res.data.data.orderCarriages + ' 优惠 : ' + res.data.data.discountAmounts + ' 税费 : ' + res.data.data.ratePrices + ')';
          }
          this.form.address = res.data.data.shippingAddress + '  ' + res.data.data.receiverName + '  ' + res.data.data.receiverTel//收货地址
          //数组循环--商品
          this.form.orderDetail = [];
          for (let i = 0; i < res.data.data.orderDetails.length; i++) {
            let obj = {};
            obj.src = res.data.data.orderDetails[i].productImageUrl;//商品图片
            obj.commodityName = res.data.data.orderDetails[i].productName;//商品名称
            obj.price = res.data.data.orderDetails[i].productUnivalent;//价格
            obj.number = res.data.data.orderDetails[i].productNum//数量
            obj.refoundNumber = res.data.data.orderDetails[i].refundNum//退款数量--暂时
            this.form.orderDetail.push(obj);
          }
          this.formLoading = false;
        });
      },
      //按钮变灰
      selectable(row, index) {
        console.log(row, index);
        if (row.isFinished != '未完成') {
          return false;
        } else {
          return true;
        }
      },
      //查询按钮
      inquiry() {
        this.currentPage = 1;
        this.ajax(this.pages,this.currentPage,this.orderNo,this.refundNo,this.value1,this.value2);
      },
      //批量选择
      handleSelectionChange(val) {
        console.log(val);
        console.log("0000");
        if (val.length == 0) {
          this.disabled = true;
        } else {
          this.disabled = false;
        }
        for (let i = 0; i < val.length; i++) {
          this.multipleSelection.push(val[i].refundAmountId)
        }
        console.log(this.multipleSelection);
      },
      //驳回
      noPass(row, index) {
        this.formInline.reason = '';//清空
        console.log(row, index);
        this.rows = row;
        this.DialogVisible = true;
      },
      //驳回-确定
      sure(formInline) {
        if (this.formInline.reason == null || this.formInline.reason == '') {
          this.$message({
            type: 'warning',
            message: '请填写驳回理由!'
          });
        } else {
          this.$http.post(this.url + '/finance/finance_reject', {
            refundAmountId: this.rows.refundAmountId,
            rejectReason: this.formInline.reason,
            refundNo: this.rows.refundNo,
          }, {emulateJSON: true}).then(function (res) {
            console.log(res);
            if (res.data.status == 200) {
              //刷新
              this.ajax(this.pages,this.currentPage,this.orderNo,this.refundNo,this.value1,this.value2);
              this.$message({
                type: 'success',
                message: '驳回成功!'
              });
            } else {
              this.$message({
                type: 'error',
                message: '驳回失败!'
              });
            }
          });
          this.DialogVisible = false;
        }
      },
      //审核通过
      pass(row, index) {
        console.log(row, index);
        this.$confirm('是否确定完成打款?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let arr = [];
          arr.push(row.refundAmountId);
          this.$http.post(this.url + '/finance/finance_success', {refundAmountIds: arr.join(',')}, {emulateJSON: true}).then(function (res) {
            console.log(res);
            if (res.data.status == 200) {
              this.$message({
                type: 'success',
                message: '打款成功!'
              });
              this.ajax(this.pages,this.currentPage,this.orderNo,this.refundNo,this.value1,this.value2);
            } else {
              this.$message({
                type: 'error',
                message: '打款失败!'
              });
            }
          });

        }).catch(() => {
        });
      },
      //批量审核按钮
      wholeAudit() {
        this.$confirm('是否确定完成打款?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(this.url + '/finance/finance_success', {refundAmountIds: this.multipleSelection.join(',')}, {emulateJSON: true}).then(function (res) {
            console.log(res);
            if (res.data.status == 200) {
              this.$message({
                type: 'success',
                message: '打款成功!'
              });
              this.ajax(this.pages,this.currentPage,this.orderNo,this.refundNo,this.value1,this.value2);
            } else {
              this.$message({
                type: 'error',
                message: '打款失败!'
              });
            }
          });

        }).catch(() => {
        });
      },
      //分页
      handleSizeChange(val){
        this.pages = val;
        this.ajax(this.pages,this.currentPage,this.orderNo,this.refundNo,this.value1,this.value2);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.ajax(this.pages,this.currentPage,this.orderNo,this.refundNo,this.value1,this.value2);
      },
      //公共ajax
      ajax(a0,a1,a3,a4,a5,a6) {
        this.tableLoading = true;
        this.$http.post(this.url + '/finance/query_finance', {
          page: a1,
          num: a0,
          orderNo: a3,
          refundNo: a4,
          refundMethod: a5,
          isFinished: a6,
        }, {emulateJSON: true}).then(function (res) {
          console.log(res);
          this.tableLoading = false;
          for (let i = 0; i < res.data.data.pageList.length; i++) {
            if (res.data.data.pageList[i].refundAmountType == 'NORMAL') {
              res.data.data.pageList[i].refundAmountType = '退款'
            } else {
              res.data.data.pageList[i].refundAmountType = '补偿'
            }
            if (res.data.data.pageList[i].isFinished == 0) {
              res.data.data.pageList[i].isFinished = '未完成'
              res.data.data.pageList[i].btnShow = true;
            } else if (res.data.data.pageList[i].isFinished == 1) {
              res.data.data.pageList[i].isFinished = '已完成'
            } else {
              res.data.data.pageList[i].isFinished = '审核中'
            }
          }
          this.tableData = res.data.data.pageList;
          this.arr.length = res.data.data.pageTotal;
        })
      }
    },
    created(){
      if(window.innerHeight<800){
        this.cliH = 600;
      }else{
        this.cliH = 740;
      }
    },
    mounted() {
      this.ajax(20,1,'','','','');
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

  .block {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
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
</style>
