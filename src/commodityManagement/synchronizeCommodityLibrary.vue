<template>
    <!--同步商品库-->
    <div class="synchronize-commodity-library">
        <!--主页面-->
        <div>
            <!--nav-->
            <el-row :gutter="8">
                <el-col :span="5" class="flexs">
                        <span class="spans0">商品发货仓</span>
                            <el-cascader
                                    :clearable="clearable"
                                    :props="defaultProps1"
                                    :options="options1"
                                    v-model="selectedOptions1"
                                    filterable
                                    @change="handleChange1">
                            </el-cascader>
                </el-col>
                <el-col :span="4" class="flexs">
                    <span class="spans0">商品名称</span>
                    <el-input type="text" placeholder="请输入商品名称" v-model="skuName" class="ww"></el-input>
                </el-col>
                <el-col :span="4" class="flexs">
                    <span class="spans0">skucode</span>
                    <el-input type="text" placeholder="请输入skucode" v-model="skuCode" class="ww"></el-input>
                </el-col>
                <el-col :span="3" class="flexs">
                        <span class="spans1">发布状态</span>
                        <el-select v-model="value3" placeholder="请选择" class="ww" :clearable="clearable">
                            <el-option
                                    v-for="item in options3"
                                    :key="item.value3"
                                    :label="item.label"
                                    :value="item.value3">
                            </el-option>
                        </el-select>
                </el-col>
                <el-col :span="3" class="flexs">
                        <span class="spans1">是否组套</span>
                        <el-select v-model="value4" placeholder="请选择" class="ww" :clearable="clearable">
                            <el-option
                                    v-for="item in options4"
                                    :key="item.value4"
                                    :label="item.label"
                                    :value="item.value4">
                            </el-option>
                        </el-select>
                </el-col>
                <el-col :span="2">
                        <el-button type="primary" @click="inquiry">查询</el-button>
                </el-col>
                <el-col :span="2">
                        <el-button type="primary" @click="clears">清除条件</el-button>
                </el-col>
            </el-row>
            <!--table-->
            <el-table
              v-loading="tableLoading"
              element-loading-text="拼命加载中"
                    :data="tableData"
                    border
                    style="width: 100%;margin-top: 10px"
                    >
                <el-table-column
                        prop="xuhao"
                        label="序号"
                        width="80px"
                >
                </el-table-column>
                <el-table-column
                        prop="productId"
                        label="productId"
                >
                </el-table-column>
                <el-table-column
                        prop="skucode"
                        label="skucode"
                >
                </el-table-column>
                <el-table-column
                        prop="skuname"
                        label="商品名称"
                >
                </el-table-column>
                <el-table-column
                        prop="spucode"
                        label="spucode"
                >
                </el-table-column>
                <el-table-column
                        prop="warehouseName"
                        label="发货仓"
                >
                </el-table-column>
                <el-table-column
                        prop="stockNumber"
                        label="库存"
                >
                </el-table-column>
                <el-table-column
                        prop="listPrice"
                        label="平均成本价"
                >
                </el-table-column>
                <el-table-column
                        prop="isBom"
                        label="是否组套"
                >
                </el-table-column>
                <el-table-column
                        prop="gmtCreate"
                        label="同步时间"
                        width="160px"
                >
                    <template slot-scope="scope">
                        <p v-show="scope.row.gmtCreate==null?false:true">{{scope.row.gmtCreate | time}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="operate"
                        label="操作"
                >
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="publish2(scope.row,scope.$index)">{{fabu}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[20,50,100,500]"
                        :page-size="pages"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="arr.length">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              tableLoading:false,
              pages:20,//默认一页20条
                clearable:true,
                warehouseCode: '',//下拉菜单warehouseCode
                skuName: '',//商品名称
                skuCode: '',//规格代码
                selectedOptions1: [],
                tableData: [],
                currentPage: 1,
                arr: [],//分页
                value: '',
                value2: '',
                value3: '0',
                value4: '0',
                options1: [],
                defaultProps1: {
                    value: 'warehouseCode',
                    label: 'warehouseName',//过滤warehouseName
                },
                options2: [{
                    value2: '选项一',
                    label: '商品名称'
                },
                    {
                        value2: '选项二',
                        label: 'skucode'
                    },
                    {
                        value2: '选项三',
                        label: '平均成本价'
                    },
                ],
                options3: [{value3: '0', label: '未发布'}, {value3: '1', label: '已发布'}],//发布状态
                options4: [{value4: '0', label: '否'}, {value4: '1', label: '是'}],//是否组套
                fahuocang: '',
                warehouseCode: '',
                fabu:'',
            }
        },
        methods: {
            //清空条件
            clears(){
                this.selectedOptions1 = [];
                this.skuName = '';
                this.skuCode = '';
                this.value3 = '';
                this.value4 = '';
                this.warehouseCode = '';
            },
            handleChange1(val) {
                this.warehouseCode = val[0];
                console.log();
            },
            //头部查询
            inquiry() {
                if(this.value3==0){
                    this.fabu="发布"
                }else{
                    this.fabu=""
                }
                this.currentPage = 1;
              this.ajax(this.currentPage,this.pages,this.value4,this.value3,this.skuName,this.skuCode,this.warehouseCode)
            },
            //发布
            publish2(rows, index) {
                console.log(rows, index);
              sessionStorage.setItem('currentPage',this.currentPage);
              sessionStorage.setItem('pages',this.pages);
              sessionStorage.setItem('value4',this.value4);
              sessionStorage.setItem('value3',this.value3);
              sessionStorage.setItem('skuName',this.skuName);
              sessionStorage.setItem('skuCode',this.skuCode);
              sessionStorage.setItem('warehouseCode',this.warehouseCode);
              this.$router.push({
                    path: '/publish2',
                    query: {
                        da: rows.warehouseName,
                        skuName: rows.skuname,
                        spuKode: rows.spucode,
                        productId: rows.productId,
                        skucode: rows.skucode
                    }
                })
                console.log(rows.warehouseCode);
            },
            //分页函数
            handleSizeChange(val) {
              this.pages = val;
              this.currentPage = 1;
              this.ajax(this.currentPage,this.pages,this.value4,this.value3,this.skuName,this.skuCode,this.warehouseCode)
            },
            handleCurrentChange(val) {
              this.currentPage = val;
              this.ajax(this.currentPage,this.pages,this.value4,this.value3,this.skuName,this.skuCode,this.warehouseCode)
            },
          //ajax
          ajax(a1,a2,a3,a4,a5,a6,a7){
              if(a7==undefined){
                a7='';
              }
              this.tableLoading = true;
            this.$http.post(this.url + '/product/select_synchronizeProduct', {
              page: a1,
              num: a2,
              isBom:a3,
              productStatus:a4,
              skuname:a5,
              skucode:a6,
              warehouseCode:a7
            }, {emulateJSON: true}).then(function (res) {
              console.log(res);
              this.tableLoading = false;
              if(res.data.data==null||res.data.data.pageList==null){
                this.arr.length = 0;
                this.tableData = [];
              }else{
                for (let i = 0; i < res.data.data.pageList.length; i++) {
                  if(res.data.data.pageList[i].isBom==0){
                    res.data.data.pageList[i].isBom="否"
                  }else{
                    res.data.data.pageList[i].isBom="是"
                  }
                  this.fahuocang = res.data.data.pageList[i].warehouseName + '--' + res.data.data.pageList[i].type;
                  res.data.data.pageList[i].xuhao = i + 1+(this.currentPage-1)*this.pages;
                  res.data.data.pageList[i].warehouseName = this.fahuocang;
                }
                this.arr.length = res.data.data.pageTotal;
                this.tableData = res.data.data.pageList;
              }
            });
          },
        },
      beforeRouteEnter(to, from, next) {  // 路由进入前判断
        console.log('路由进入前', from.path);
        if (from.path !== '/publish2') { // 如果不是从编辑页面来,清理
          let arr=['currentPage','pages','value4','value3','skuName','skuCode','warehouseCode'];
          let removeSession = (list) => { //批量清理session
            list.forEach((item) => {
              sessionStorage.removeItem(item);
            })
          };
          removeSession(arr)
        }
        next(vm => {
          // 通过 `vm` 访问组件实例
        })
      },
        created() {
            //查询table所有
            if(this.value3==0){
                this.fabu="发布"
            }else{
                this.fabu=""
            }
            if(sessionStorage.currentPage){
              this.currentPage = parseInt(sessionStorage.currentPage)
            }
          if(sessionStorage.pages){
            this.pages = parseInt(sessionStorage.pages)
          }
          if(sessionStorage.value4){
            this.value4 = sessionStorage.value4
          }
          if(sessionStorage.value3){
            this.value3 = sessionStorage.value3
          }
          if(sessionStorage.skuName){
            this.skuName = sessionStorage.skuName
          }
          if(sessionStorage.skuCode){
            this.skuCode = sessionStorage.skuCode
          }
          if(sessionStorage.warehouseCode){
            this.warehouseCode = sessionStorage.warehouseCode;
            this.selectedOptions1.push(this.warehouseCode)
          }
           this.ajax(this.currentPage,this.pages,this.value4,this.value3,this.skuName,this.skuCode,this.warehouseCode)
            //查询商品发货仓所有
            this.$http.post(this.url + '/warehouse/all_warehouse', {
                page: 1,
                num: 100000,
                status: 1,

            }, {emulateJSON: true}).then(function (res) {
                console.log(res);
                for (let k = 0; k < res.data.data.pageList.length; k++) {
                    this.fahuocang = res.data.data.pageList[k].warehouseName + '--' + res.data.data.pageList[k].typeName;
                    res.data.data.pageList[k].xuhao = k + 1;
                    res.data.data.pageList[k].warehouseName = this.fahuocang;
                }
                this.options1 = res.data.data.pageList;
            });
        },
    }
</script>

<style scoped>
  .flexs{
    display: flex;
    align-items: center;
  }
    .spans1 {
        width: 100px;
    }

    .spans0 {
        width: 80px;
    }
    .block {
        text-align: right;
        margin-top: 5px;
    }
</style>
