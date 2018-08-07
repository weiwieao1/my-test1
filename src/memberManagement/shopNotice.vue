<template>
  <div class="shop-notice">
    <el-row :gutter="20">
      <el-col :span="2">
        <el-button @click="add">添加</el-button>
      </el-col>
      <el-col :span="4" style="display: flex;align-items: center">
        <span class="ws">名称</span>
        <el-input v-model="name" clearable></el-input>
      </el-col>
      <el-col :span="5" style="display: flex;align-items: center">
        <span class="ws">状态</span>
        <el-select v-model="status" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-button type="primary">查询</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="name='';status=''">清空条件</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary">导出</el-button>
      </el-col>
    </el-row>
    <el-table
      class="table"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="index"
        label="序号"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        >
      </el-table-column>
      <el-table-column
        prop="address"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="operate"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text">编辑</el-button>
          <span>&nbsp;|&nbsp; </span>
          <el-button type="text" @click="upLine(scope.row)">上线</el-button>
          <span>&nbsp;|&nbsp;</span>
          <el-button type="text" @click="close(scope.row)">关闭</el-button>
          <span>&nbsp;|&nbsp;</span>
          <el-button type="text" @click="delet(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20,50,100]"
        :page-size="pages"
        layout="total, sizes, prev, pager, next, jumper"
        :total="arr.length">
      </el-pagination>
    </div>
    <!--弹框-->
    <el-dialog title="添加消息" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="120px"  :rules="rules" ref="form">
        <el-form-item label="消息名称" prop="name">
          <el-input v-model="form.name" style="width: 60%"></el-input>
        </el-form-item>
        <el-form-item label="上线时间" required>
          <el-col :span="10">
            <el-form-item prop="date1">
              <el-date-picker type="datetime" placeholder="选择日期" v-model="form.date1" style="width: 80%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="3">至</el-col>
          <el-col :span="10">
            <el-form-item prop="date2">
              <el-date-picker type="datetime" placeholder="选择日期" v-model="form.date2" style="width: 80%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="消息内容" prop="content">
          <el-input v-model="form.content" style="width: 60%" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="绑定类型" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio label="DISCOUNT">二级页</el-radio>
            <el-radio label="GOODSDETAIL">商品详情</el-radio>
            <el-radio label="GOODSLIST">商品列表</el-radio>
            <el-radio label="LINK">链接</el-radio>
            <el-radio label="ACTIVITY">活动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="目标ID">
          <el-input v-model="form.aimsID"  style="width: 60%"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button type="primary" @click="sure('form')">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "shop-notice",
    data() {
      return {
        name:'',//名称
        status:'',//状态
        options: [
          {
          value: '1',
          label: '通知中'
        }, {
          value: '2',
          label: '待通知'
        }, {
          value: '3',
          label: '已关闭'
        }
        ],//状态选项
        tableData:[{}],
        currentPage:1,//分页
        arr:[],
        pages:20,//默认20条
        dialogFormVisible:false,
        form:{
          name:'',
          date1:'',//上线时间,
          data2:'',
          content:'',//内容,
          type:'',//类型
          aimsID:'',//目标ID
        },
        rules: {
          name: [
            {required: true, message: '请输入消息名称', trigger: 'blur'},
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          content: [
            {required: true, message: '请输入消息内容', trigger: 'blur'},
          ],
          type: [
            { required: true, message: '请选择绑定类型', trigger: 'change' }
          ],
        },
      }
    },
    methods: {
      //添加
      add(){
        //清空
        this.form = {};
        this.dialogFormVisible = true;
      },
      //add-sure
      sure(form){
        this.$refs[form].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            return false;
          }
        });
      },
      //上线按钮
      upLine(row){
        console.log(row);
        this.$confirm('确定上线?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '上线成功!'
          });
        }).catch(() => {

        });
      },
      //关闭按钮
      close(row){
        this.$confirm('确定关闭?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '关闭成功!'
          });
        }).catch(() => {

        });
      },
      //删除按钮
      delet(row){
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {

        });
      },
      //分页
      handleSizeChange(val){
        console.log(val);
      },
      handleCurrentChange(val){
        console.log(val);
      },
    },
    mounted() {

    }
  }
</script>

<style scoped>
.ws{
  width: 40px;
}
  .table{
    margin:10px 0;
  }
  .block{
    text-align: right;
  }
</style>
