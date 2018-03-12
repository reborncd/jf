<style scoped>
    @import "../../../static/css/table.css";
    @import "../../../static/css/console.css";

    .search .el-input {
        width: auto;
    }

    .el-table .cell button {
        display: block;
        margin: 5px auto;
    }

    .el-form-item {
        margin-bottom: 10px;
    }
</style>
<style>
    .ywxq .el-table td, .ywxq .el-table th {
        padding: 10px 0 !important;
    }
</style>
<template>
    <div class="ywxq common-card-wrap" style="height: 100%;"  @click="$event.target.className == 'icon-more iconfont'?'':tabs.consoleActionVisible = false">
        <el-card class="box-card">
            <div class="text item">
                <div class="content">
                    <div class="action clear">
                        <el-button type="danger" size="mini" @click="addneeds.addvisible = true">新增</el-button>
                        <el-select v-model="selectValue" clearable size="mini">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.key"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <div class="fr">
                            <div style="margin-right: 10px;" class="i-b">
                                <el-date-picker
                                        v-model="dateComp.value"
                                        type="datetimerange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        align="right"
                                        size="mini"
                                        :picker-options="dateComp"
                                >
                                </el-date-picker>
                            </div>
                            <div class="search i-b">
                                <el-input
                                        placeholder="请输入检索关键字"
                                        suffix-icon="icon-sousuo iconfont"
                                        v-model="keyword"
                                        size="mini">
                                </el-input>
                            </div>
                        </div>
                    </div>
                    <div class="table-list">
                        <el-table :data="table.tableData" border style="width: 100%"
                        :height="table.tableHeight"
                        highlight-current-row
                        @row-click="handleCurrentChange">
                        <el-table-column prop="aa" label="需求编号" width="200"></el-table-column>
                        <el-table-column prop="aa" label="申请日期" width="100"></el-table-column>
                        <el-table-column prop="aa" label="计划投产日期" width="120"></el-table-column>
                        <el-table-column prop="aa" label="产品功能"></el-table-column>
                        <el-table-column prop="aa" label="需求来源"></el-table-column>
                        <el-table-column prop="aa" label="涉及系统"></el-table-column>
                        <el-table-column prop="aa" label="优先级"></el-table-column>
                        <el-table-column prop="aa" label="状态"></el-table-column>
                        <el-table-column prop="aa" label="bug清单"></el-table-column>
                        <!--<el-table-column label="操作">-->
                        <!--<template slot-scope="scope" class="action-wrap">-->
                        <!--<el-button size="mini" @click="editRow(scope.row,scope)"  type="primary">确认</el-button>-->
                        <!--<el-button size="mini" @click="deleteRow(scope.row,scope)"  type="danger">驳回</el-button>-->
                        <!--</template>-->
                        <!--</el-table-column>-->
                        </el-table>
                    </div>
                    <div class="console-tab-wrapper" v-if="tabs.consoleWrapperVisible">
                        <div class="console-action-wrapper">
                            <i class="el-icon-close close" @click="setConsoleVisible"></i>
                            <i class="icon-more iconfont"  @click="tabs.consoleActionVisible = !tabs.consoleActionVisible"></i>
                            <div class="console-action fr" v-if="tabs.consoleActionVisible">
                                <span v-for="item in tabs.consoleActionData">{{item}}</span>
                            </div>
                        </div>
                        <el-tabs v-model="tabs.activeName" type="card" @tab-click="handleClick">
                            <el-tab-pane label="详情页" name="info">
                                <div class="console-tab-content">
                                    a
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="操作台" name="console">
                                <div class="console-tab-content">
                                    <el-form label-width="100px" label-position="left">
                                        <el-row :gutter="20">
                                            <el-col :span="8">
                                                <el-form-item label="状态">需求编号</el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="发送人">申请人</el-form-item>
                                            </el-col>
                                        </el-row>
                                    </el-form>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="拆分项目" name="chaifen">
                                <div class="console-tab-content">
                                    a
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="全程跟踪" name="genzong">
                                <div class="console-tab-content">
                                  a
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="实时统计" name="tongji">
                                <div class="console-tab-content">
                                    a
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </div>
        </el-card>
        <!--立项-->
        <el-dialog title="新增" :visible="addneeds.addvisible" width="70%"
                   append-to-body modal-append-to-body :before-close="closeDialog">
            <el-form label-width="100px">
                <el-row :md="24" :gutter="20" v-if="addneeds.addvisible">
                    <el-col :span="12" :md="12">
                        <el-form-item label="需求编号">
                            <el-input v-model="addneeds.addform.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="需求名称">
                            <el-input v-model="addneeds.addform.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="申请人">
                            <el-input v-model="addneeds.addform.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="申请日期">
                            <el-date-picker type="date" placeholder="选择日期" v-model="addneeds.addform.name"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="需求来源">
                            <el-select v-model="addneeds.addform.name" placeholder="请选择部门"
                                       style="width: 49%;float: left;margin-right: 2%;">
                            </el-select>
                            <el-select v-model="addneeds.addform.name" placeholder="请选择人员"
                                       style="width: 49%;float: left;">
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="计划投产日期">
                            <el-date-picker type="date" placeholder="选择日期" v-model="addneeds.addform.name"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="优先级">
                            <el-select v-model="addneeds.addform.name" placeholder="请选择部门" style="width: 100%;">
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="重要程度">
                            <el-select v-model="addneeds.addform.name" placeholder="请选择部门" style="width: 100%;">
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :md="24">
                        <el-form-item label="是否加急">
                            <el-row :span="24">
                                <el-col :span="6" :md="6">
                                    <el-radio v-model="addneeds.addform.name" label="1">否</el-radio>
                                    <el-radio v-model="addneeds.addform.name" label="2">是</el-radio>
                                </el-col>
                                <el-col :span="18" :md="18">
                                    <el-input v-model="addneeds.addform.name"></el-input>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :md="24">
                        <el-form-item label="产品功能">
                            <el-input v-model="addneeds.addform.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :md="24">
                        <el-form-item label="需求名称">
                            <el-input type="textarea" v-model="addneeds.addform.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addneeds.addvisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="addneeds.addvisible = false" size="mini">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                addneeds: {
                    addvisible: false,
                    addform: {
                        name: ""
                    },
                    changeInsetform: {
                        name: ""
                    }
                },
                table: {
                    tableData: [{
                        a: '2016-05-03',
                        aa: '假如这是一段很长的字',
                    }, {
                        a: '2016-05-03',
                        aa: '假如这是一段很长的字',
                    }, {
                        a: '2016-05-03',
                        aa: '假如这是一段很长的字',
                    }, {
                        a: '2016-05-03',
                        aa: '假如这是一段很长的字',
                    }],
                    tableHeight: "",
                },
                search: "",
                dateValue: "",
                keyword: "",
                options: [
                    {
                        "key": "与我相关",
                        "value": "1"
                    }, {
                        "key": "全部",
                        "value": "2"
                    }, {
                        "key": "带技术部审核",
                        "value": "3"
                    }, {
                        "key": "待开发部审核",
                        "value": "4"
                    }, {
                        "key": "待产品部审核",
                        "value": "5"
                    }, {
                        "key": "开发计划制定",
                        "value": "6"
                    }, {
                        "key": "开发执行",
                        "value": "7"
                    }, {
                        "key": "开发挂起",
                        "value": "8"
                    }, {
                        "key": "验收中",
                        "value": "9"
                    }, {
                        "key": "需求完成",
                        "value": "10"
                    }, {
                        "key": "需求关闭",
                        "value": "11"
                    }
                ],
                selectValue: "与我相关",
                totalDate: "1",
                nowPage: "1",
                totalPage: "1",
                dateComp: {},
                tabs: {
                    consoleWrapperVisible: false,//控制台的显示
                    consoleActionVisible: false,//控制台的操作显示/隐藏
                    activeName: "info",
                },
            }
        },
        mounted(){
            this.calculate();
            this.tabs.infodata = {
                "name": 1
            };
            this.tabs.log = {
                "status":"asdasdsa",
                "role":"dsadas",
                "data":[
                    "asdas",
                    "asdasd",
                    "dasdas"
                ]
            }
        },
        methods: {
            //加载列表数据
            loadData(){
                let params = new URLSearchParams();
                this.$axios.post("/business/query",params).then((res)=>{
                    let data = res.data;
                    if(data.code == 200){
                        this.table.tableData = data.result;
                        this.table.tableOriginData = data.result;
                    }
                })
            },
            calculate(){
                let height = document.querySelector(".mainr").offsetHeight;
//                let card_header_height = document.querySelector(".el-card__header").offsetHeight;
                let card_body = document.querySelector(".box-card .el-card__body");
                card_body.style.height = height - 36 + "px";
                //表格高度
                this.calculateTableHeight(this.tabs.consoleWrapperVisible);
                //tab高度
                if (this.tabs.consoleWrapperVisible) {
                    this.calculateTabsHeight();
                }
            },
            //计算表格高度
            calculateTableHeight(type){
                let height = document.querySelector(".mainr").offsetHeight;
                let actionHeight = document.querySelector(".content .action").offsetHeight;
                //true代表没有控制台
                if (!type) {
                    //----------------------------------------------body的上下padding--table的margin-top-table上border
                    this.table.tableHeight = height - 36 - actionHeight - 20 - 20-1;
                } else {
                    this.table.tableHeight = height * 0.3;
                }
            },
            //计算操作台的高度
            calculateTabsHeight(){
                let card_body = document.querySelector(".box-card .el-card__body");
                let actionHeight = document.querySelector(".content .action").offsetHeight;
                let allTabContent = document.querySelectorAll(".console-tab-content");
                for (let i of allTabContent) {
                    //---------------el-card__body的可用内容高---------顶部操作栏的高---------表格部分的高------tab的头和margin的高----------操作台border
                    i.style.height = (parseInt(card_body.style.height) - 20 ) - actionHeight - (this.table.tableHeight + 20) - (20 + 40) - 2 + "px";
                }
            },
            //设置控制台的展示
            setConsoleVisible(){
                this.tabs.consoleWrapperVisible = false;
                this.calculateTableHeight(false)
            },
            closeDialog(){
                this.addneeds.addvisible = false;
            },
            setConsoleVisible(){

            },
            handleClick(){

            },
            searchKeyword(e){
                if (e.keyCode == 13) {

                }
            },
            handleCurrentChange(val){
                console.log(val)
                if (!this.tabs.consoleWrapperVisible) {
                    this.tabs.consoleWrapperVisible = true;
                    this.calculateTableHeight(1);
                    setTimeout(() => {
                        this.calculateTabsHeight();
                    }, 0)
                }
            }
        }
    }
</script>