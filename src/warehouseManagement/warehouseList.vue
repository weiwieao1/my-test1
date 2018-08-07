<template>
  <!--仓库管理-->
  <div class="warehouse-list">
    <div>
      <el-row :gutter="20">
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-button @click="add">添加仓库</el-button>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple" style="display: flex;align-items: center">
            <!--//状态选择-->
            <span>状态</span>
            <el-select v-model="value0" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple" style="display: flex;align-items: center">
            <span style="width: 70px">仓库名称</span>
            <el-input v-model="warehouseName" placeholder="请输入仓库名称"></el-input>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="inquiry(index)">查询</el-button>
          </div>
        </el-col>
      </el-row>
      <!--table-->
      <el-table
        v-loading="tableLoading"
        element-loading-text="拼命加载中"
        :data="tableData"
        border
        style="width: 100%;"
      >
        <el-table-column prop="xuhao"
                         label="序号"
                         width="80px"
        >
        </el-table-column>
        <el-table-column
          prop="warehouseCode"
          label="仓库编码"
        >
        </el-table-column>
        <el-table-column
          prop="warehouseName"
          label="仓库名称"
        >
        </el-table-column>
        <el-table-column
          prop="shortName"
          label="仓库简称"
        >
        </el-table-column>
        <el-table-column
          prop="typeName"
          label="供货类型"
        >
        </el-table-column>
        <el-table-column
          prop="returnedName"
          label="姓名"
        >
        </el-table-column>
        <el-table-column
          prop="returnedTel"
          label="手机"
        >
        </el-table-column>
        <el-table-column
          prop="returnedAddress"
          label="地址"
        >
        </el-table-column>
        <el-table-column
          prop="gmtCreate"
          label="创建时间"
          width="160px"
        >
          <template slot-scope="scope">
            <p v-show="scope.row.gmtCreate===null?false:true">{{scope.row.gmtCreate | time}}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="adit(scope.row,scope.$index)">{{isAdit}}</el-button>
            <span v-show="isAdit!==''?true:false">|</span>
            <el-button type="text" size="small" @click="deleteRow(index,scope.row)">{{isDelete}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--//添加仓库页面-->
      <el-dialog title="添加仓库" :visible.sync="dialogFormVisible" top="5vh">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="仓库编码" prop="warehouseCode">
            <el-input v-model="ruleForm.warehouseCode" class="inputs"></el-input>
          </el-form-item>
          <el-form-item label="仓库名称" prop="warehouseName">
            <el-input v-model="ruleForm.warehouseName" class="inputs"></el-input>
          </el-form-item>
          <el-form-item label="仓库简称" prop="shortName">
            <el-input v-model="ruleForm.shortName" class="inputs"></el-input>
          </el-form-item>
          <el-form-item label="供货类型" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择">
              <el-option label="现货仓" value="SPOT"></el-option>
              <el-option label="保税仓" value="INBONDED"></el-option>
              <el-option label="海外直购" value="OVERSEAS"></el-option>
              <el-option label="虚拟商品" value="VIRTUAL"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名" prop="returnedName">
            <el-input v-model="ruleForm.returnedName" class="inputs"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="returnedTel">
            <el-input v-model="ruleForm.returnedTel" class="inputs"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="returnedAddress">
            <el-input v-model="ruleForm.returnedAddress" class="inputs"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="sure('ruleForm')">保存</el-button>
            <el-button @click="clearAll('ruleForm')">清空</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!--//编辑页面弹框-->
      <el-dialog title="编辑仓库" :visible.sync="dialogFormVisible1" top="5vh">
        <el-form :model="ruleForm1" :rules="rules1" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
          <el-form-item label="仓库编码" prop="warehouseCode1">
            <el-input v-model="ruleForm1.warehouseCode1" auto-complete="off" class="inputs"></el-input>
          </el-form-item>
          <el-form-item label="仓库名称" prop="warehouseName1">
            <el-input v-model="ruleForm1.warehouseName1" auto-complete="off" class="inputs"></el-input>
          </el-form-item>
          <el-form-item label="仓库简称" prop="shortName1">
            <el-input v-model="ruleForm1.shortName1" auto-complete="off" class="inputs"></el-input>
          </el-form-item>
          <el-form-item label="供货类型" prop="type1">
            <el-select v-model="ruleForm1.type1" placeholder="请选择">
              <el-option label="现货仓" value="SPOT"></el-option>
              <el-option label="保税仓" value="INBONDED"></el-option>
              <el-option label="海外直购" value="OVERSEAS"></el-option>
              <el-option label="虚拟商品" value="VIRTUAL"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名" prop="returnedName1">
            <el-input v-model="ruleForm1.returnedName1" class="inputs" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="returnedTel1">
            <el-input v-model="ruleForm1.returnedTel1" auto-complete="off" class="inputs"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="returnedAddress1">
            <el-input v-model="ruleForm1.returnedAddress1" auto-complete="off" class="inputs"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="sure1('ruleForm1',tableData)">保存</el-button>
            <el-button @click="clearAll('ruleForm1')">清空</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
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
        warehouseName:'',//仓库名称
        isAdit: '编辑',//是否编辑
        isDelete: '删除',//是否删除
        tableData: [],
        options: [{value: '0', label: '已删除'}, {value: '1', label: '未删除'}],
        value0: '',
        //添加部分
        ruleForm: {
          warehouseName: '',
          warehouseCode: '',
          shortName: '',
          type: '',
          returnedAddress: '',
          returnedName: '',
          returnedTel: ''
        },
        rules: {
          warehouseName: [
            {required: true, message: '请输入仓库名称', trigger: 'blur'},
          ],
          warehouseCode: [
            {required: true, message: '请输入仓库编码', trigger: 'blur'}
          ],
          shortName: [
            {required: true, message: '请输入仓库简称', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请选择类型', trigger: 'change'}
          ],
        },
        //编辑部分
        ruleForm1: {
          warehouseName1: '',
          warehouseCode1: '',
          shortName1: '',
          type1: '',
          returnedAddress1: '',
          returnedName1: '',
          returnedTel1: ''
        },
        rules1: {
          warehouseName1: [
            {required: true, message: '请输入仓库名称', trigger: 'blur'},
          ],
          warehouseCode1: [
            {required: true, message: '请输入仓库编码', trigger: 'blur'}
          ],
          shortName1: [
            {required: true, message: '请输入仓库简称', trigger: 'blur'}
          ],
          type1: [
            {required: true, message: '请选择类型', trigger: 'change'}
          ],
        },
        dialogFormVisible: false,//添加
        dialogFormVisible1: false,//编辑
        arr: [],
        pages: 20,//默认一页20条
        currentPage: 1,
        index: null,
        resData: [],
        resPage: 1,
        indexId: 0,//点击当前编辑获取下标/ID
      };
    },
    methods: {
      //状态查询
      inquiry(index) {
        this.currentPage = 1;
        if (this.value0 == 0) {
          this.isDelete = '';
          this.isAdit = ''
        } else {
          this.isDelete = '删除';
          this.isAdit = '编辑';
        }
        this.ajax(this.value0, this.currentPage, this.pages,this.warehouseName)
      },
      //清空
      clearAll(a) {
        this.$refs[a].resetFields();
      },
      add() {
        //清空
        this.ruleForm.warehouseCode = '';
        this.ruleForm.warehouseName = '';
        this.ruleForm.shortName = '';
        this.ruleForm.type = '';
        this.ruleForm.returnedName = '';
        this.ruleForm.returnedTel = '';
        this.ruleForm.returnedAddress = '';
        this.dialogFormVisible = true;
      },
      adit(rows, index) {
        console.log(rows, index);
        this.ruleForm1.returnedName1 = rows.returnedName;
        this.ruleForm1.returnedTel1 = rows.returnedTel;
        this.ruleForm1.returnedAddress1 = rows.returnedAddress;
        this.ruleForm1.warehouseCode1 = rows.warehouseCode;
        this.ruleForm1.warehouseName1 = rows.warehouseName;
        this.ruleForm1.shortName1 = rows.shortName;
        this.ruleForm1.type1 = rows.type.toString();
        this.dialogFormVisible1 = true;
        this.indexId = index;//点击当前编辑获取下标/ID
      },
      //添加-确定
      sure(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post(this.url + '/warehouse/add_warehouse', {
              warehouseName: this.ruleForm.warehouseName,
              warehouseCode: this.ruleForm.warehouseCode,
              shortName: this.ruleForm.shortName,
              type: this.ruleForm.type,
              returnedAddress: this.ruleForm.returnedAddress,
              returnedName: this.ruleForm.returnedName,
              returnedTel: this.ruleForm.returnedTel,
            }, {emulateJSON: true}).then(function (res) {
              if (res.data.status == 200) {
                this.$message({
                  type: 'success',
                  message: '添加成功!'
                });
                this.value0 = '1';
                if (this.value0 == 1) {
                  this.isDelete = '删除';
                  this.isAdit = '编辑'
                }
                this.ajax(this.value0, this.currentPage, this.pages,this.warehouseName)
                this.dialogFormVisible = false;
                this.$refs[formName].resetFields();
              } else {
                this.$message({
                  type: 'error',
                  message: '添加失败!'
                });
              }
            }, function (err) {
              this.$message({
                type: 'error',
                message: '服务器连接中断,请联系后台人员!',
              });
            })
          } else {
            return false;
          }
        })
      },
      //编辑页确定
      sure1(formName1, tableData) {
        this.$http.post(this.url + '/warehouse/update_warehouse', {
          warehouseId: tableData[this.indexId].warehouseId,
          warehouseName: this.ruleForm1.warehouseName1,
          warehouseCode: this.ruleForm1.warehouseCode1,
          shortName: this.ruleForm1.shortName1,
          type: this.ruleForm1.type1,
          returnedAddress: this.ruleForm1.returnedAddress1,
          returnedName: this.ruleForm1.returnedName1,
          returnedTel: this.ruleForm1.returnedTel1
        }, {emulateJSON: true}).then(function (res) {
          console.log(res);
          if (res.data.status == 200) {
            this.dialogFormVisible1 = false;
            this.$refs[formName1].resetFields();
            this.$http.post(this.url + '/warehouse/all_warehouse', {
              page: this.currentPage,
              num: 100
            }, {emulateJSON: true}).then(function (res) {
              console.log(res)
              for (let i = 0; i < res.data.data.pageList.length; i++) {
                res.data.data.pageList[i].xuhao = i + 1;
              }
              this.arr.length = res.data.data.pageTotal;
              this.tableData = res.data.data.pageList;
            });
            this.$message({
              type: 'success',
              message: '编辑成功!'
            });
          } else {
            this.$message({
              type: 'error',
              message: '编辑失败!'
            });
          }
        }, function (err) {
          this.$message({
            type: 'error',
            message: '服务器连接中断,请联系后台人员!',
          });
        });
      },
      //删除
      deleteRow(index, rows) {
        console.log(index, rows);
        this.$http.post(this.url + '/warehouse/del_warehouse', {warehouseId: rows.warehouseId}, {emulateJSON: true}).then(function (res) {
          console.log(res);
          if (res.data.status == 200) {
            this.$confirm('此仓库正在使用,确定删除吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              closeOnClickModal: false
            }).then(() => {
              this.ajax(this.value0, this.currentPage, this.pages)
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }, function (err) {
              this.$message({
                type: 'error',
                message: '服务器连接中断,请联系后台人员!',
              });
            }).catch(() => {

            });
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!'
            });
          }
        }, function (err) {
          this.$message({
            type: 'error',
            message: '服务器连接中断,请联系后台人员!',
          });
        })
      },
      //一页几条
      handleSizeChange(val) {
        this.pages = val;
        this.currentPage = 1;
        console.log(this.pages);
        this.ajax(this.value0, this.currentPage, this.pages,this.warehouseName)
      },
      //分页函数
      handleCurrentChange(val) {
        this.currentPage = val;
        this.ajax(this.value0, this.currentPage, this.pages,this.warehouseName)
      },
      ajax(a1, a2, a3,a4) {
        this.tableLoading = true;
        this.$http.post(this.url + '/warehouse/status_warehouse', {
          status: a1,
          page: a2,
          num: a3,
          param: a4
        }, {emulateJSON: true}).then(function (res) {
          this.tableLoading = false;
          if (res.data.data == null || res.data.data.pageList == null) {
            this.arr.length = 0;
            this.tableData = [];
          } else {
            for (let i = 0; i < res.data.data.pageList.length; i++) {
              res.data.data.pageList[i].xuhao = i + 1 + (this.currentPage - 1) * a3;
            }
            this.arr.length = res.data.data.pageTotal;
            this.tableData = res.data.data.pageList;
          }
        }, function (err) {
          this.$message({
            type: 'error',
            message: '服务器连接中断,请联系后台人员!',
          });
        });
      },
    },
    created() {
      this.isDelete = '删除';
      this.value0 = "1";
      this.ajax("1", 1, this.pages,'');
    },
  }
</script>

<style scoped>
  .el-table {
    margin: 10px 0 5px 0;
  }

  .block {
    text-align: right;
  }

  .inputs {
    width: 300px;
  }

  /*.warehouse-list {*/
  /*height: 100%;*/
  /*overflow: hidden;*/
  /*}*/
</style>
