<template>
  <!--main-->
  <div>
    <div>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button style="margin-bottom: 8px" @click="add">添加素材</el-button>
        </el-col>
        <el-col :span="6">
          <div class="flexs">
            <span style="width: 70px">发布时间</span>
            <el-date-picker
              @change="timeDate"
              v-model="timeValue"
              type="daterange"
              range-separator="至"
              placeholder="选择日期范围">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="flexs">
            <span style="width: 40px">话题</span>
            <el-select v-model="topicValue" placeholder="请选择话题" :clearable="clearable" filterable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="flexs">
            <span style="width: 40px">标题</span>
            <el-input placeholder="请输入标题" v-model="title"></el-input>
          </div>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="inquiry">查询</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="timeValue='';title='';topicValue=''">清除条件</el-button>
        </el-col>
      </el-row>
      <el-button v-for="(btn,index) in btnData" :key="index" class="btn" :class="{bgs:index==nowIndex}"
                 @click="btns(index)">{{btn}}
      </el-button>
    </div>
    <div>
      <el-table
        ref="multipleTable"
        @selection-change="handleSelectionChange"
        :data="tableData"
        border
        style="width: 100%;margin-top: 8px">
        <el-table-column
          type="selection"
          width="88">
        </el-table-column>
        <el-table-column
          prop="materialTitle"
          label="标题"
        >
        </el-table-column>
        <el-table-column
          prop="mtList"
          label="关联话题">
          <template slot-scope="scope">
            <div>
              <el-tag v-for="(tag,Index) in scope.row.mtList" :key="Index" type="success" size="small"
                      style="margin-right: 5px">
                {{tag.topicName}}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="materialLevel"
          label="非会员是否可见">
          <template slot-scope="scope">
            <p v-text="scope.row.materialLevel==0?'是':'否'"></p>
          </template>
        </el-table-column>
        <el-table-column
          prop="upTime"
          label="发布时间">
        </el-table-column>
        <el-table-column
          prop="operate"
          label="操作">
          <template slot-scope="scope">
            <div class="flexs">
              <el-button type="text" @click="adit(scope.row,scope.$index)">编辑</el-button>
              <div class="flexs" v-show="show1">
                <span>&nbsp;|&nbsp; </span>
                <el-button type="text" @click="movetoRecycleBin(scope.row,scope.$index)">移入回收站</el-button>
              </div>
              <div class="flexs" v-show="show2">
                <span> &nbsp;|&nbsp;</span>
                <el-button type="text" @click="pub(scope.row,scope.$index)">发布</el-button>
                <span> &nbsp;|&nbsp;</span>
                <el-button type="text" @click="delet(scope.row,scope.$index)">{{delets}}</el-button>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <div class="block">
        <div>
          <el-button type="primary" @click="wholePub" :disabled="disabledBtn" v-show="wholePubShow">批量发布</el-button>
          <el-button @click="wholeDel" type="primary" :disabled="disabledBtn">批量删除</el-button>
        </div>
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
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pages:20,
        delets: '删除',
        show1: false,//已发布
        show2: false,//其余
        wholePubShow: false,
        clearable: true,
        nowIndex: 0,
        tableData: [],
        currentPage: 1,
        arr: [],
        btnData: ["已发布", "定时发布箱", "草稿箱", "回收站"],
        timeValue: [],//发布时间
        topicValue: '',//话题
        title: '',//标题
        options: [],//话题
        startTime: '',
        endTime: '',
        disabledBtn: true,//按钮显示
        handleSelectArr: [],
        index: 1,//记录状态
      }
    },

    methods: {
      //4个按钮
      btns(index) {
        sessionStorage.setItem('nowIndex', index);
        //清空
        this.timeValue = '';//发布时间
        this.topicValue = '';//话题
        this.title = '';//标题
        if (index == 0) {
          this.show1 = true;
          this.show2 = false;
          this.wholePubShow = false;
        } else {
          this.show1 = false;
          this.show2 = true;
          this.wholePubShow = true;
        }
        this.nowIndex = index;
        this.currentPage = 1;
        if (index == 0) {
          //2-已发布
          this.index = 1;
          this.delets = '删除'
        } else if (index == 1) {
          //4-定时发布箱
          this.index = 3;
          this.delets = '删除'
        } else if (index == 2) {
          //1-草稿箱
          this.index = 0;
          this.delets = '删除'
        } else {
          //3-回收站
          this.index = 2;
          this.delets = '彻底删除'
        }
        sessionStorage.setItem('index', this.index);
        this.currentPage = 1;
        this.ajax(this.index, this.currentPage, '', '', '', '',this.pages);
      },
      //查询
      inquiry() {
        sessionStorage.setItem('topicValue', this.topicValue);
        sessionStorage.setItem('title', this.title);
        this.currentPage = 1;
        this.ajax(this.index, this.currentPage, this.startTime, this.endTime, this.topicValue, this.title,this.pages);
      },
      //编辑
      adit(row, index) {
        console.log(this.currentPage);
        sessionStorage.setItem('currentPage', this.currentPage);
        sessionStorage.setItem('pages', this.pages);
        this.$router.push({
          path: '/aditFindMaterial',
          query: {row: row}
        })
      },
      //移入回收站
      movetoRecycleBin(row, index) {
        this.$confirm('确定移入回收站?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(this.url + '/material/setCollectionBox', {materialId: row.materialId}, {emulateJSON: true}).then(function (res) {
            console.log(res);
            if (res.data.status == 200) {
              this.$message({
                type: 'success',
                message: '移入成功!'
              });
              //刷新
              this.ajax(this.index, this.currentPage, this.startTime, this.endTime, this.topicValue, this.title,this.pages);
            } else {
              this.$message({
                type: 'error',
                message: '移入失败!'
              });
            }
          });
        }).catch(() => {
        });
      },
      //单个发布
      pub(row, index) {
        console.log(this.index);
        this.$confirm('确定发布?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(this.url + '/material/publishMaterialById', {materialId: row.materialId}, {emulateJSON: true}).then(function (res) {
            console.log(res);
            if (res.data.status == 200) {
              this.$message({
                type: 'success',
                message: '发布成功!'
              });
              //刷新
              this.ajax(this.index, this.currentPage, this.startTime, this.endTime, this.topicValue, this.title,this.pages);
            } else {
              this.$message({
                type: 'error',
                message: '发布失败!'
              });
            }
          });
        }).catch(() => {

        });
      },
      //批量发布
      wholePub() {
        console.log(this.index);
        this.$confirm('确定批量发布?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(this.url + '/material/publishMaterialIds', {materialIds: JSON.stringify(this.handleSelectArr)}, {emulateJSON: true}).then(function (res) {
            console.log(res);
            if (res.data.status == 200) {
              this.$message({
                type: 'success',
                message: '发布成功!'
              });
              //刷新
              this.ajax(this.index, this.currentPage, this.startTime, this.endTime, this.topicValue, this.title,this.pages);
            } else {
              this.$message({
                type: 'error',
                message: '发布失败!'
              });
            }
          });
        }).catch(() => {

        });
      },
      //单个删除
      delet(row, index) {
        console.log(this.index);
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.index == 0 || this.index == 2) {
            //草稿箱和回收箱
            this.$http.post(this.url + '/material/deleteMaterialById', {materialId: row.materialId}, {emulateJSON: true}).then(function (res) {
              console.log(res);
              if (res.data.status == 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                //刷新
                this.ajax(this.index, this.currentPage, this.startTime, this.endTime, this.topicValue, this.title,this.pages);
              } else {
                this.$message({
                  type: 'error',
                  message: '删除失败!'
                });
              }
            });
          } else {
            //3-定时发布
            this.$http.post(this.url + '/material/setCollectionBox', {materialId: row.materialId}, {emulateJSON: true}).then(function (res) {
              console.log(res);
              if (res.data.status == 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                //刷新
                this.ajax(this.index, this.currentPage, this.startTime, this.endTime, this.topicValue, this.title,this.pages);
              } else {
                this.$message({
                  type: 'error',
                  message: '删除失败!'
                });
              }
            });
          }
        }).catch(() => {

        });
      },
      //批量删除按钮
      wholeDel() {
        console.log(this.index);
        this.$confirm('确定批量删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.index == 1 || this.index == 3) {
            //已发布和定时发布
            this.$http.post(this.url + '/material/setCollectionBoxes', {materialIds: JSON.stringify(this.handleSelectArr)}, {emulateJSON: true}).then(function (res) {
              console.log(res);
              if (res.data.status == 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                //刷新
                this.ajax(this.index, this.currentPage, this.startTime, this.endTime, this.topicValue, this.title,this.pages);
              } else {
                this.$message({
                  type: 'error',
                  message: '删除失败!'
                });
              }
            });
          } else {
            //草稿箱和回收站
            this.$http.post(this.url + '/material/deleteMaterialIds', {materialIds: JSON.stringify(this.handleSelectArr)}, {emulateJSON: true}).then(function (res) {
              console.log(res);
              if (res.data.status == 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                //刷新
                this.ajax(this.index, this.currentPage, this.startTime, this.endTime, this.topicValue, this.title,this.pages);
              } else {
                this.$message({
                  type: 'error',
                  message: '删除失败!'
                });
              }
            })
          }
        }).catch(() => {

        });
      },
      //多选与按钮变灰
      handleSelectionChange(val) {
        console.log(val);
        //只有选中时,按钮才显示
        if (val.length > 0) {
          this.disabledBtn = false;
        } else {
          this.disabledBtn = true;
        }
        this.handleSelectArr = [];
        for (let i = 0; i < val.length; i++) {
          this.handleSelectArr.push(val[i].materialId);
        }
        console.log(this.handleSelectArr);
      },
      //添加
      add() {
        this.$router.push({path: '/findMaterial'})
      },
      //分页
      handleSizeChange(val){
        this.pages = val;
        this.ajax(this.index, this.currentPage, this.startTime, this.endTime, this.topicValue, this.title,this.pages);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        //刷新
        this.ajax(this.index, this.currentPage, this.startTime, this.endTime, this.topicValue, this.title,this.pages);
      },
      //发布时间
      timeDate(val) {
        console.log(val);
        if(val==undefined){
          this.startTime = '';
          this.endTime = '';
        }else{
          this.startTime = val.substring(0, 10);
          this.endTime = val.substring(11);
        }
        sessionStorage.setItem('startTime', this.startTime);
        sessionStorage.setItem('endTime', this.endTime);
      },
      //ajax
      ajax(a0, a1, a2, a3, a4, a5,a6) {
        this.$http.post(this.url + '/material/getMaterialList', {
          materialStatus: a0,//0-草稿箱;1-已发布;2-回收;3定时发布箱
          page: a1,
          num: a6,
          startTime: a2,//时间范围
          endTime: a3,//时间范围
          topicId: a4,//话题
          materialTitle: a5,//标题
        }, {emulateJSON: true}).then(function (res) {
          if (res.data.data === null || res.data.data.pageList === null) {
            this.tableData = [];
            this.arr.length = 0;
          } else {
            this.tableData = res.data.data.pageList;
            this.arr.length = res.data.data.pageTotal;
          }
        })
      }
    },
    beforeRouteEnter(to, from, next) {  // 路由进入前判断
      console.log('路由进入前', from.path);
      if (from.path !== '/aditFindMaterial') { // 如果不是从编辑页面来,清理
        console.log('清理session');
        let arr = ['startTime', 'endTime', 'title', 'topicValue','nowIndex','currentPage','index','pages'];
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
      console.log('//////////////////');
      console.log(this.index);
      if (sessionStorage.nowIndex) {
        this.nowIndex = sessionStorage.nowIndex;
      }
      if (sessionStorage.index) {
        this.index = sessionStorage.index;
      }
      console.log('****************');
      console.log(this.index);
      if (sessionStorage.currentPage) {
        this.currentPage = parseInt(sessionStorage.currentPage);
        console.log(this.currentPage);
      } else {
        this.currentPage = 1;
      }
      if (sessionStorage.pages) {
        this.pages = parseInt(sessionStorage.pages);
      }
      if (sessionStorage.startTime && sessionStorage.endTime) {
        this.startTime = sessionStorage.startTime;
        this.endTime = sessionStorage.endTime;
        let arr = [];
        arr.push(this.startTime, this.endTime);

        this.timeValue = arr;
      }
      if (sessionStorage.topicValue) {
        this.topicValue = parseInt(sessionStorage.topicValue);
      }
      if (sessionStorage.title) {
        this.title = sessionStorage.title;
      }
      // if(sessionStorage.show2=='true'){
      //   this.$nextTick(()=>{
      //     this.show2 = true;
      //     this.delets = '彻底删除'
      //   })
      // }
      if(this.index==2){
        this.$nextTick(()=>{
          this.show1 = false;
          this.show2 = true;
          this.delets = '彻底删除'
        })
      }else if(this.index==0||this.index==3){
        this.$nextTick(()=>{
          this.show1 = false;
          this.show2 = true;
          this.delets = '删除'
        })
      }

      if(this.index==0||this.index==2||this.index==3){
        this.wholePubShow = true;//批量发布按钮显示
      }
      this.ajax(this.index, this.currentPage, this.startTime, this.endTime, this.topicValue, this.title,this.pages);

      this.delets = '删除';//记录删除按钮状态
      this.show1 = true;//操作按钮
      this.show2 = false;//操作按钮

      //话题查询
      this.$http.post(this.url + '/material/getMaterialTopics', {}, {emulateJSON: true}).then(function (res) {
        console.log(res);
        if (res.data.data == null) {
          this.options = [];
        } else {
          for (let i = 0; i < res.data.data.length; i++) {
            let obj = {};
            obj.label = res.data.data[i].topicName;
            obj.value = res.data.data[i].topicId;
            this.options.push(obj);
          }
          console.log(this.options);
        }
      });
    },
  }
</script>

<style scoped>
  .block {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
  }

  .flexs {
    display: flex;
    align-items: center;
  }

  .flexs p {
    font-size: 14px;
  }

  .btn {
    padding: 10px 15px;
  }

  .bgs, .bg {
    border: 1px solid red;
    color: red;
  }

  .active {
    border: 1px solid red;
    color: red;
  }
</style>
