<template>
  <!--二级页-->
  <div>
    <el-button style="margin-bottom: 8px" @click="add">添加</el-button>
    <el-table
      v-loading="tableLoading"
      element-loading-text="拼命加载中"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="xuhao"
        label="序号"
        width="88">
      </el-table-column>
      <el-table-column
        prop="pageName"
        label="页面名称"
      >
      </el-table-column>
      <el-table-column
        prop="customPageId"
        label="页面ID"
      >
      </el-table-column>
      <el-table-column
        prop="operate"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="adit(scope.row,scope.$index)">编辑</el-button>
          <span>|</span>
          <el-button type="text" @click="delet(scope.row,scope.$index)">删除</el-button>
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
    <!--添加弹框-->
    <el-dialog title="添加页面名称" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="页面名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" auto-complete="off" class="inputs"></el-input>
        </el-form-item>
        <el-form-item label=" " :label-width="formLabelWidth">
          <div style="text-align: right">
            <el-button  @click="dialogFormVisible=false">取 消</el-button>
            <el-button type="primary" @click="sure('form')">确 定</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        tableLoading:false,
        pages:20,
        currentPage: 1,
        arr: [],
        tableData: [],
        dialogFormVisible: false,//add
        formLabelWidth: '120px',
        form: {name: ''},
        rules: {
          name: [{required: true, message: '请输入页面名称', trigger: 'blur'},]
        },

      }

    },
    methods: {
//            删除
      delet(row, index) {
        console.log(row, index);
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal:false
        }).then(() => {
          this.$http.post(this.url + '/customPage/del_custom_page', {customPageId: row.customPageId}, {emulateJSON: true}).then(function (res) {
            console.log(res);
            if (res.data.status == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
//                                刷新
              this.ajax(this.currentPage,this.pages)
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
          });
        }).catch(() => {
        });
      },
      add() {
        this.form.name = '';//清空
        this.dialogFormVisible = true;
      },
//            编辑
      adit(row, index) {
        console.log(row);
        sessionStorage.setItem('currentPage',this.currentPage);
        sessionStorage.setItem('pages',this.pages);
        this.$router.push({
          path: '/secondAdit',
          query: {customPageId: row.customPageId}
        })
      },
      sure(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.$http.post(this.url + '/customPage/create_customPage', {pageName: this.form.name}, {emulateJSON: true}).then(function (res) {
              console.log(res);
              if (res.data.status == 200) {
                this.dialogFormVisible = false;
                this.$message({
                  type: 'success',
                  message: '添加成功!'
                });
//                                刷新页面
                this.ajax(this.currentPage,this.pages)
              } else {
                this.$message({
                  type: 'error',
                  message: '添加失败!'
                });
              }
            });
          } else {
            return false;
          }
        });
      },
//      分页
      handleSizeChange(val){
        this.pages = val;
        this.ajax(this.currentPage,this.pages)
      },
      handleCurrentChange(val){
        console.log(val);
        this.currentPage = val;
        this.ajax(this.currentPage,this.pages)
      },
      ajax(a1,a2) {
        this.tableLoading = true;
        this.$http.post(this.url + '/customPage/get_all_page', {
          page: a1,
          num: a2
        }, {emulateJSON: true}).then(function (res) {
          console.log(res);
          this.tableLoading = false;
          if (res.data.data === null|| res.data.data.pageList===null) {
            this.tableData = [];
            this.arr.length = 0;
          } else {
            for (let i = 0; i < res.data.data.pageList.length; i++) {
              res.data.data.pageList[i].xuhao = i + 1+(this.currentPage-1)*this.pages;
            }
            this.tableData = res.data.data.pageList;
            this.arr.length = res.data.data.pageTotal;
          }
        })
      },
    },
    beforeRouteEnter(to, from, next) {  // 路由进入前判断
      console.log('路由进入前', from.path);
      if (from.path !== '/secondAdit') { // 如果不是从编辑页面来,清理
        let arr=['currentPage','pages'];
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
      if(sessionStorage.currentPage){
        this.currentPage = parseInt(sessionStorage.currentPage);
      }
      if(sessionStorage.pages){
        this.pages = parseInt(sessionStorage.pages);
      }
      this.ajax(this.currentPage,this.pages);
    }
  }
</script>
<style scoped>
  .inputs {
    width: 350px;
  }

  .redP {
    color: red;
  }
  .block{
    text-align: right;
    margin-top: 8px;
  }
</style>
