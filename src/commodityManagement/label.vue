<template>
  <!--标签-->
  <div class="label">
    <!--主页面-->
    <div>
      <div class="grid-content bg-purple">
        <el-button @click="add" class="add">添加标签</el-button>
        <!--添加标签弹框-->
        <el-dialog title="添加标签" :visible.sync="dialogFormVisible">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="标签名称" prop="name">
              <el-input v-model="ruleForm.name" style="width: 250px"></el-input>
            </el-form-item>
            <!--图片上传-->
            <el-form-item label="标签图片" prop="img">
              <el-upload
                class="upload-demo"
                :action="urls+'tag'"
                :on-success="handleSuccess"
                :show-file-list="false"
              >
                <img :src="imageUrl" class="avatar" style="width: 100px;height: 100px;">
              </el-upload>
            </el-form-item>
            <div style="text-align: right">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="sure('ruleForm',tableData)">保 存</el-button>
            </div>
          </el-form>
        </el-dialog>
      </div>
      <!--table-->
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
        >
        </el-table-column>
        <el-table-column
          prop="tagImgurl"
          label="标签图片"
        >
          <template slot-scope="scope">
            <img :src="scope.row.tagImgurl" width="40" height="40" style="margin-top: 10px"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="tagName"
          label="标签名称"
        >
        </el-table-column>
        <el-table-column
          prop="gmtCreate"
          label="创建时间"
        >
          <template slot-scope="scope">
            {{scope.row.gmtCreate | time}}
          </template>
        </el-table-column>
        <el-table-column
          prop="operate"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="adit(scope.row,scope.$index)">编辑</el-button>
            <span>|</span>
            <el-button type="text" size="small" @click="setSpu(scope.row,scope.$index)">绑定spu</el-button>
            <span>|</span>
            <el-button type="text" size="small" @click="deletes(scope.row,scope.$index)">删除</el-button>

          </template>
        </el-table-column>
      </el-table>
      <!--编辑弹框-->
      <el-dialog title="编辑标签" :visible.sync="dialogFormVisible1">
        <el-form :model="form1" label-width="100px">
          <el-form-item label="标签名称">
            <el-input v-model="form1.labelName1" auto-complete="off"
                      style="width:250px"></el-input>
          </el-form-item>
          <el-form-item label="标签图片" prop="img1">
            <el-upload
              class="upload-demo"
              :action="urls+'tag'"
              :on-success="handleSuccess1"
              :show-file-list="false"
            >
              <img :src="imageUrl1" class="avatar" style="width: 100px;height: 100px;">
            </el-upload>
          </el-form-item>
          <div style="text-align: right">
            <el-button @click="dialogFormVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="sure1('form1',tableData)">保 存</el-button>
          </div>
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
        tableLoading:false,
        imageUrl: 'https://image.qqsk.com/brand/1516271241514.png',//add
        imageUrl1: 'https://image.qqsk.com/brand/1516271241514.png',//adit
        tableData: [],
        arr: [],//分页
        currentPage: 1,
        pages:20,
        rules: {name: [{required: true, message: '请输入标签名称', trigger: 'blur'},]},//添加
        ruleForm: {
          name: '',
        },//添加
        form1: {labelName1: ''},//编辑
        dialogFormVisible: false,
        dialogFormVisible1: false,
        aditIndex: '',//编辑下标
      }
    },
    methods: {
      //添加
      add() {
        this.dialogFormVisible = true;
      },
      //编辑
      adit(rows, index) {
        this.aditIndex = index;
        this.form1.labelName1 = this.tableData[index].tagName;
        this.imageUrl1 = this.tableData[index].tagImgurl;
        this.dialogFormVisible1 = true;
      },
      //设置spu
      setSpu(rows, index) {
        sessionStorage.setItem('currentPage', this.currentPage);
        sessionStorage.setItem('pages',this.pages)
        this.$router.push({path: '/bindSpu', query: {tagId: rows.tagId}});
      },
      //删除
      deletes(rows, index) {
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          type: 'warning'
        }).then(() => {
          this.$http.post(this.url + '/tag/del_tag', {tagId: this.tableData[index].tagId}, {emulateJSON: true}).then(function (res) {
//                        console.log(res);
            if (res.data.status == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!',
              });
              //刷新
              this.ajax(this.currentPage,this.pages);
            } else {
              this.$message({
                type: 'warning',
                message: '删除失败'
              });
            }
          }, function (err) {
            this.$message({
              type: 'error',
              message: '服务器连接中断,请联系后台人员!',
            });
          });
        }).catch(() => {
//                    this.$message({
//                        type: 'info',
//                        message: '已取消删除'
//                    });
        });
      },
      //添加确定按钮
      sure(form, tableData) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            if (this.imageUrl == 'https://image.qqsk.com/brand/1516271241514.png') {
              this.$message({
                type: 'warning',
                message: '请选择图片!'
              });
            } else {
              this.$http.post(this.url + '/tag/add_tag', {
                tagName: this.ruleForm.name,
                tagImgurl: this.imageUrl,
              }, {emulateJSON: true}).then(function (res) {
                console.log(res);
                if (res.data.status == 200) {
                  this.ruleForm.name = '';
                  this.imageUrl = 'https://image.qqsk.com/brand/1516271241514.png';
                  //刷新
                  this.ajax(this.currentPage,this.pages);
                  this.$message({
                    message: '添加成功!',
                    type: 'success'
                  });
                } else {
                  this.$message({
                    message: '添加失败!',
                    type: 'warning'
                  });
                }
              }, function (err) {
                this.$message({
                  type: 'error',
                  message: '服务器连接中断,请联系后台人员!',
                });
              });
              this.dialogFormVisible = false;
            }
          } else {
            return false;
          }
        });
      },
      //编辑确定按钮
      sure1(form, tableData) {
        this.$http.post(this.url + '/tag/update_tag', {
          tagName: this.form1.labelName1,
          tagId: tableData[this.aditIndex].tagId,
          tagImgurl: this.imageUrl1,
        }, {emulateJSON: true}).then(function (res) {
          console.log(res);
          if (res.data.status == 200) {
            this.$message({
              message: '编辑成功!',
              type: 'success'
            });
            //刷新
            this.ajax(this.currentPage,this.pages);
          } else {
            this.$message({
              message: '编辑失败!',
              type: 'warning'
            });
          }
        }, function (err) {
          this.$message({
            type: 'error',
            message: '服务器连接中断,请联系后台人员!',
          });
        })
        this.dialogFormVisible1 = false;
      },
      //添加-图片上传
      handleSuccess(response, file) {
        this.imageUrl = response.data.url;
      },
      //编辑-图片上传
      handleSuccess1(response, file) {
        this.imageUrl1 = response.data.url;
      },
      //分页
      handleSizeChange(val){
        this.pages = val;
        this.currentPage = 1;
        this.ajax(this.currentPage,this.pages);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.ajax(this.currentPage,this.pages);
      },
      //ajax
      ajax(a,a1) {
        this.tableLoading = true;
        this.$http.post(this.url + '/tag/all_tag', {page: a, num: a1}, {emulateJSON: true}).then(function (res) {
          console.log(res);
          this.tableLoading = false;
          if (res.data.data == null) {
            this.tableData = [];
            this.arr.length = 0;
          } else {
            for (let i = 0; i < res.data.data.pageList.length; i++) {
              res.data.data.pageList[i].xuhao = i + 1 + (this.currentPage - 1) * a1;
            }
            this.arr.length = res.data.data.pageTotal;
            this.tableData = res.data.data.pageList;
          }
        }, function (err) {
          this.$message({
            type: 'error',
            message: '服务器连接中断,请联系后台人员!',
          });
        })
      }
    },
    beforeRouteEnter(to, from, next) {  // 路由进入前判断
      if (from.path !== '/bindSpu') { // 如果不是从编辑页面来,清理
        console.log('清理session');
        let arr = ['currentPage','pages'];
        let removeSession = (list) => { //批量清理session
          list.forEach((item) => {
            sessionStorage.removeItem(item);
          })
        };
        removeSession(arr);
      }
      next(vm => {
        // 通过 `vm` 访问组件实例
      })
    },
    created() {
      if (sessionStorage.currentPage) {
        this.currentPage = parseInt(sessionStorage.currentPage);
      }
      if (sessionStorage.pages) {
        this.pages = parseInt(sessionStorage.pages);
      }
      this.ajax(this.currentPage,this.pages)
    },
  }
</script>

<style scoped>
  .redP {
    color: red;
  }

  .add {
    margin-bottom: 10px;
  }

  .grid-content {
    display: flex;
    line-height: 36px;
  }

  .spans0 {
    width: 100px;
  }

  .el-row1 {
    margin-bottom: 10px;
  }

  .block {
    text-align: right;
    margin-top: 10px;
  }
</style>
