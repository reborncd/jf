<style scoped>
    @import "../../static/css/table.css";
    @import "../../static/css/console.css";
    .tree-wrapper.leftwrap{
        float: left;
        width: 24%;
        margin-right:1%;
        border:1px solid #ebeef5;
    }
    .tree-wrapper.rightwrap{
        float: right;
        width: 75%;
    }
</style>
<style>
    .zlk .el-table .cell{
        text-align: center;
    }
</style>
<template>
<div class="zlk common-card-wrap" style="height: 100%;">
    <el-card class="box-card">
        <div class="text item">
            <div class="content">
                <div class="action clear">
                    <el-button type="danger" size="mini" @click="addZL">新资料</el-button>
                    <el-select v-model="selectValue" clearable size="mini">
                        <el-option
                                v-for="item in options"
                                :label="item.key"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="clear" style="margin-top: 20px;">
                    <!--<input type="file" @change="upload">-->
                    <div class="tree-wrapper leftwrap">
                        <el-tree
                                :data="leftData"
                                show-checkbox
                                node-key="menu_id"
                                ref="lefttree"
                                highlight-current
                                @node-click="leftclick">
                        </el-tree>
                    </div>
                    <div class="tree-wrapper rightwrap">
                        <div class="table-list" style="margin-top: 0;">
                            <el-table :data="table.tableData" border style="width: 100%"
                                      :height="table.tableHeight"
                                      highlight-current-row
                                      @row-click="handleCurrentChange">
                                <el-table-column prop="datum_ID" label="文档编号"></el-table-column>
                                <el-table-column prop="datum_NAME" label="文档名称"></el-table-column>
                                <el-table-column prop="file_DESCRIPTIOON" label="文档简介" ></el-table-column>
                                <el-table-column prop="date_TIME" :formatter="dataFormatter" width="120" label="录入时间"></el-table-column>
                                <el-table-column prop="rriority_NAME" label="录入人员" ></el-table-column>
                                <el-table-column label="操作" width="150">
                                    <template slot-scope="scope">
                                        <el-button size="mini" type="primary"
                                                   @click="viewrow(scope.$index, scope.row)">查看
                                        </el-button>
                                        <el-button size="mini" type="primary"
                                                   @click="downloadrow(scope.$index, scope.row)">下载
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </el-card>
    <el-dialog title="新增" :visible="add.addvisible" width="60%"
               append-to-body modal-append-to-body :before-close="closeDialog">
        <el-form label-width="100px">
            <el-row :md="24" :gutter="20">
                <el-col :span="24" :md="24">
                    <el-form-item label="文档编号">
                        <el-input v-model="add.subform.code" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12" :md="12">
                    <el-form-item label="文档名称">
                        <el-input v-model="add.subform.wordname"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12" :md="12">
                    <el-form-item label="文档名版本">
                        <el-input v-model="add.subform.version"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24" :md="24">
                    <el-form-item label="文档简介">
                        <el-input
                                type="textarea"
                                :rows="2"
                                placeholder="请输入内容"
                                v-model="add.subform.intro">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="add.addvisible = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="subaddForm" size="mini">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
    export default {
        data(){
            return {
                leftData:[],//左侧的树形菜单数据
                selectValue:"",//选择的筛选的值
                options:[{"key":"按目录检索","value":"1"},{"key":"按系统检索","value":"2"}],
                add:{
                    addvisible:false,
                    subform:{
                        code:"",//文档呢编号
                        wordname:"",//文档名称
                        version:"v",//文件版本
                        intro:"",//文档简介
                    }
                },
                table:{
                    tableHeight:"",//
                    tableOriginData:[],//表格源数据
                    tableData:[],//表格展示的数据
                },
            }
        },
        filters: {
            "yyyy-mm-dd": function (time) {
                let d = new Date(time);
                let year = d.getFullYear();
                let month = d.getMonth() + 1<10?'0' + d.getMonth() : '' + d.getMonth();
                let day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
                let hour = d.getHours()< 10 ? '0' + d.getHours() : '' + d.getHours();
                let minutes = d.getMinutes() <10 ? '0' + d.getMinutes() : '' + d.getMinutes();
                let seconds = d.getSeconds() <10 ? '0' + d.getSeconds() : '' + d.getSeconds();
                return year + '-' + month + '-' + day ;
            },
        },
        mounted(){
            this.loadData()
        },
        methods: {
//            upload(e){
//                console.log(e)
//                let file = e.target.files[0];
//                let params = new FormData();
//                params.append("id","1")
//                params.append("file",file)
//                params.append("token","c56388dbb07140e4ba90d33b32dd8213")
//                let config = {
//                    headers:{
//                        'Content-Type': 'multipart/form-data'
//                    }
//                }
//                this.$axios.post("/fault/upload",params,config).then((res)=>{
//
//                })
//            },
            calculate(){
                let height = document.querySelector(".mainr").offsetHeight;
                let card_body = document.querySelector(".box-card .el-card__body");
                let treeWrap = document.querySelectorAll(".tree-wrapper");
                let actionHeight = document.querySelector(".content .action").offsetHeight;
                card_body.style.height = height - 36  + "px";
                for (let i of treeWrap) {
                    //
                    i.style.height =  height - 36  - 20  - 20-1-actionHeight  + "px";
                    this.table.tableHeight =  height - 36  - 20 -20-1-actionHeight;
                }

            },
            loadData(){
                let params = new URLSearchParams();
                params.append("CONDITION_FLAG",1);
                this.$axios.post("/datum/getDatumlist",params).then((res)=>{
                    let data =res.data;
                    if(data.code  == 200){
                        this.calculate();
                        this.$set(this.table,"tableData",data.result);
                        this.$set(this.table,"tableOriginData",data.result);
                    }
                })
            },
            //关闭弹窗
            closeDialog(){
                this.add.addvisible = false;
            },
            //新增资料
            addZL(){
                this.add.addvisible = true;
            },
            //提交
            subaddForm(){

            },
            //左侧点击事件
            leftclick(val){

            },
            //表格点击时间
            handleCurrentChange(val){

            },
            //查看功能
            viewrow(index,val){

            },
            //下载功能
            downloadrow(index,val){

            },
            //时间格式
            dataFormatter(row, col){
                let date = this.$format(row.date_TIME);
                return `${date.year}-${date.mouth}-${date.day}`
            },
        }
    }
</script>