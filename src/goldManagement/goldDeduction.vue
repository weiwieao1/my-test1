<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="5">
                <div class="flexs">
                    <span style="width: 80px">用户编码</span>
                    <el-input placeholder="请输入用户编码" v-model="userCode"></el-input>
                </div>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" @click="inquiry">查询</el-button>
            </el-col>
            <el-col :span="14">
                <el-button type="primary" @click="clears">清除条件</el-button>
            </el-col>
            <el-col :span="3">
                <el-button type="primary" @click="wholeCoin">批量扣除金币</el-button>
            </el-col>
        </el-row>
        <el-table
                :data="tableData"
                border
                style="width: 100%;margin: 8px 0px">
            <el-table-column
                    type="index"
                    label="序号"
                    width="99"
            >
            </el-table-column>
            <el-table-column
                    prop="headimgurl"
                    label="买家名"
            >
                <template slot-scope="scope">
                    <div style="display: flex;align-items: center;margin: 5px 0">
                        <img :src="scope.row.headimgurl" alt="用户头像" style="width: 50px;height: 50px;">
                        <span>{{scope.row.nickname}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    prop="operate"
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="releaseCoin(scope.row)">扣除金币</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--批量扣除金币弹框-->
        <el-dialog title="批量扣除金币" :visible.sync="dialogFormVisible1">
            <el-form label-width="100px" class="demo-ruleForm">
                <el-form-item label="批量扣除金币" prop="name">
                    <div>
                        <el-upload
                                class="upload"
                                action="string"
                                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                :with-credentials="true"
                                :http-request="myupdate"
                                :show-file-list="false"
                                :multiple="false"
                                :limit="1"
                                :file-list="fileList">
                            <el-button  type="primary">点击上传</el-button>
                            <span v-if="temp.file">{{temp.file.name}}</span>
                        </el-upload>
                        <div style="text-align: right;margin-top: 15px">
                            <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                            <el-button  type="primary" @click="mineUpload">扣 除</el-button>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--扣除金币弹框-->
        <el-dialog title="扣除金币" :visible.sync="dialogFormVisible3">
            <el-form :model="ruleForm3" :rules="rules3" ref="ruleForm3" label-width="100px" class="demo-ruleForm">
                <el-form-item label="虚拟币总额">
                    <span><span style="font-size: 14px;color: blue">{{ruleForm3.money}}</span>元</span>
                </el-form-item>
                <el-form-item label="扣除金币数量" prop="num">
                    <el-input placeholder="请输入扣除金币数量" class="inputs" v-model="ruleForm3.num"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input placeholder="请输入备注" class="inputs" v-model="ruleForm3.remark" type="textarea"></el-input>
                </el-form-item>
                <div style="text-align: right">
                    <el-button @click="dialogFormVisible3 = false">取 消</el-button>
                    <el-button type="primary" @click="sure3('ruleForm3')">保 存</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script type="text/javascript">
    export default {
        data() {
            return {
                row3:{},
                clearable:true,
                loading: false,
                tableData: [],
                userCode: '',//用户编码
                dialogFormVisible1: false,//批量扣除金币
                dialogFormVisible3: false,//扣除金币
                ruleForm3: {num: '',money:'',remark:''},//扣除金币
                rules3: {
                    num: [{required: true, message: '请输入扣除金币数量', trigger: 'blur'}, {
                        pattern: /^(([1-9]+)|([0-9]+\.[0-9]{1,2}))$/,
                        message: '数字类型为 : 最多小数点后两位!'
                    }]
                },
                fileList:[],//批量扣除
                temp:{},//批量扣除
            }
        },
        methods: {
            //批量扣除发放
            myupdate(item) {
                this.fileList = [];
                console.log(item);
                this.temp = item;
                console.log(this.temp);
                console.log(this.fileList);
            },
            mineUpload() {
                console.log(this.temp.file);
                if(this.temp.file==undefined){
                    this.$message({
                        type: 'warning',
                        message: '请上传文件!'
                    });
                }else{
                    let item = this.temp;
                    let formData = new FormData();
                    formData.append('file', item.file);
                    this.$http.post(this.url+'/upload/gold_deduction', formData).then(function (res) {
                        if (res.data.status === 200) {
//                            this.userInfo.img = res.data.url;
//                            this.userInfo.fileList = [];
                            this.dialogFormVisible1 = false;
                            this.$message({
                                type: 'success',
                                message: '扣除金币成功!'
                            });
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    }, err => {
                        this.$message({
                            type: 'error',
                            message: '上传服务中断，稍后再试试'
                        });
                    });
                }
            },

            //清除条件
            clears() {
                this.userCode = '';
            },
            //查询
            inquiry(){
              this.ajax();
            },
            //批量扣除金币
            wholeCoin() {
                this.temp = {};
                this.dialogFormVisible1 = true;
            },
            //扣除金币弹框
            releaseCoin(row) {
                this.row3 = row;
                this.dialogFormVisible3 = true;
                this.ruleForm3.money = row.goldNumber;
                this.ruleForm3.num = '';
                this.ruleForm3.remark = '';
            },
            //扣除金币-sure
            sure3(ruleForm3) {
                this.$refs[ruleForm3].validate((valid) => {
                    if (valid) {
                        this.$http.post(this.url+'/gold/single_deduction',{userId:this.row3.userId,currentAmount:this.row3.goldNumber,goldAmount:this.ruleForm3.num,issueDeductReason:this.ruleForm3.remark},{emulateJSON:true}).then(function (res) {
                            if(res.data.status==200){
                                this.$message({type:'success',message:'操作成功!'})
                                this.dialogFormVisible3 = false;
                            }else{
                                this.$message({type:'warning',message:res.data.msg})
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },

            //分页
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            //ajax
            ajax() {
                this.$http.post(this.url + '/user/getUserInfo', {userId: this.userCode}, {emulateJSON: true}).then(function (res) {
                    this.tableData = [];
                    console.log(res);
                    if (res.data.data == null) {
                        this.$message({type: 'warning', message: res.data.msg});
                    } else {
                        this.tableData.push(res.data.data);
                        console.log(this.tableData);
                    }
                });
            }
        },
        mounted() {

        }

    }
</script>

<style scoped>
    .flexs {
        display: flex;
        align-items: center;
    }

    .block {
        text-align: right;
    }

    .inputs {
        width: 300px;
    }

    .redP {
        color: red;
    }
</style>
