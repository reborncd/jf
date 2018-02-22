<style scoped>
    @import "../../static/css/table.css";
    @import "../../static/css/console.css";

    .search .el-input {
        width: auto;
    }

    .back {
        position: absolute;
        left: 0;
        top: 0;
        font-size: 13px;
        cursor: pointer;
        line-height: 21px;
    }

    .back i.b {
        color: #606266;
        font-style: normal;
    }

    .el-date-editor--datetimerange.el-input__inner {
        width: 370px;
    }

    .el-textarea textarea {
        height: 100px;
    }

    .el-table td, .el-table th {
        padding: 5px 0;
    }

    .el-button {
        padding: 6px 10px;
    }
    .console-tab-content .add{
        display: inline-block;
        height: 40px;
        line-height: 40px;
        font-size: 20px;
        cursor: pointer;
        vertical-align: middle;
        /*margin-left:10px;*/
    }
</style>

<template>
    <div class="rolelist common-card-wrap" style="height: 100%;">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <p class="card-title por">
                    <span class="back fl clear" @click="bugVisible = !bugVisible" v-if="bugVisible">
                        <i class="el-icon-arrow-left"></i>
                        <i class="b">返回</i></span>
                    {{!bugVisible?'提交故障':'BUG提交单'}}
                </p>
            </div>
            <div class="text item">
                <div class="content" v-if="!bugVisible">
                    <div class="action clear">
                        <el-button type="danger" @click="bugVisible = !bugVisible" size="mini">提交BUG</el-button>
                        <el-select v-model="selectValue" clearable
                                   size="mini">
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
                            <div class="search i-b" @keyup="searchKeyword($event)">
                                <el-input
                                        placeholder="请输入检索关键字"
                                        suffix-icon="icon-sousuo iconfont"
                                        v-model="keyword"
                                        size="mini"
                                >
                                </el-input>
                            </div>
                        </div>
                    </div>
                    <div class="table-list">
                        <el-table :data="table.tableData" border style="width: 100%"
                                  :max-height="table.tableHeight" highlight-current-row
                                  @row-click="handleCurrentChange">
                            <el-table-column prop="aa" label="编号"></el-table-column>
                            <el-table-column prop="aa" label="提交日期" width="110"></el-table-column>
                            <el-table-column prop="aa" label="涉及系统"></el-table-column>
                            <el-table-column prop="aa" label="子系统" width="110"></el-table-column>
                            <el-table-column prop="aa" label="版本号"></el-table-column>
                            <el-table-column prop="aa" label="描述"></el-table-column>
                            <el-table-column prop="aa" label="优先级"></el-table-column>
                            <el-table-column prop="aa" label="状态"></el-table-column>
                            <el-table-column prop="aa" label="更新时间"></el-table-column>
                            <el-table-column label="操作" width="160">
                                <template slot-scope="scope" class="action-wrap">
                                    <el-button @click="editRow(scope.row,scope)" size="small" type="primary">查看</el-button>
                                    <el-button @click="deleteRow(scope.row,scope)" size="small" type="danger">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="console-tab-wrapper" v-if="tabs.consoleWrapperVisible">
                        <div class="console-action-wrapper">
                            <i class="el-icon-close close" @click="setConsoleVisible"></i>
                            <i class="icon-more iconfont"></i>
                            <div class="console-action fr" v-if="tabs.consoleActionVisible">
                                <span v-for="item in tabs.consoleActionData">{{item.name}}</span>
                            </div>
                        </div>
                        <el-tabs v-model="tabs.activeName" type="card" @tab-click="handleClick">
                            <el-tab-pane label="详情页" name="info">
                                <div class="console-tab-content">
                                    <el-form ref="form" :model="form" label-width="80px" label-position="left">
                                        <!--<el-row :gutter="20" >-->
                                            <!--<el-col :span="8" :sm="8">-->
                                                <!--<el-form-item label="BUG编号">-->
                                                    <!--BUG编号-->
                                                <!--</el-form-item>-->
                                            <!--</el-col>-->
                                            <!--<el-col :span="8" :sm="8">-->
                                                <!--<el-form-item label="标题">-->
                                        <!--BUG编号-->
                                                <!--</el-form-item>-->
                                            <!--</el-col>-->
                                            <!--<el-col :span="8" :sm="8">-->
                                                <!--<el-form-item label="提交人">-->
                                        <!--BUG编号-->
                                                <!--</el-form-item>-->
                                            <!--</el-col>-->
                                            <!--<el-col :span="24" :sm="24">-->
                                                <!--<el-form-item label="故障说明">-->
                                        <!--BUG编号-->
                                                <!--</el-form-item>-->
                                            <!--</el-col>-->
                                        <!--</el-row>-->
                                        <el-row :gutter="20" >
                                            <el-col :span="12" :sm="12">
                                                <el-form-item label="BUG编号">
                                                    BUG编号BUG编号BUG编号BUG编号
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12" :sm="12">
                                                <el-form-item label="标题">
                                                    BUG编号BUG编号BUG编号BUG编号
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12" :sm="12">
                                                <el-form-item label="提交人">
                                                    BUG编号BUG编号BUG编号BUG编号
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="24" :sm="24">
                                                <el-form-item label="涉及系统">
                                                    BUG编号BUG编号BUG编号BUG编号
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="24" :sm="24">
                                                <el-form-item label="子系统">
                                                    BUG编号BUG编号BUG编号BUG编号
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="24" :sm="24">
                                                <el-form-item label="子系统">
                                                    BUG编号BUG编号BUG编号BUG编号
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="24" :sm="24">
                                                <el-form-item label="子系统">
                                                    BUG编号BUG编号BUG编号BUG编号
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="24" :sm="24">
                                                <el-form-item label="子系统">
                                                    BUG编号BUG编号BUG编号BUG编号
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="24" :sm="24">
                                                <el-form-item label="故障说明">
                                                    BUG编号BUG编号BUG编号BUG编号
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="24" :sm="24">
                                                <el-form-item label="成因">
                                                    BUG编号BUG编号BUG编号BUG编号
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="24" :sm="24">
                                                <el-form-item label="影响范围">
                                                    BUG编号BUG编号BUG编号BUG编号
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="24" :sm="24">
                                                <el-form-item label="解决方案">
                                                    BUG编号BUG编号BUG编号BUG编号
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                    </el-form>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="操作台" name="console">
                                <div class="console-tab-content">
                                    <el-form :model="form" label-width="100px" label-position="left">
                                        <el-row :gutter="20">
                                            <el-col :span="12" :sm="12">
                                                <el-form-item label="状态">
                                                    <el-form-item label="213131"></el-form-item>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12" :sm="12">
                                                <el-form-item label="发送人">
                                                    <el-form-item label="213131"></el-form-item>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12" :sm="12">
                                                <el-form-item label="成因">
                                                    <el-input v-model="form.name"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12" :sm="12">
                                                <el-form-item label="影响范围">
                                                    <el-input v-model="form.name"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12" :sm="12">
                                                <el-form-item label="涉及系统">
                                                    <el-select v-model="form.region" placeholder="请选择活动区域" clearable>
                                                        <el-option label="区域一" value="shanghai"></el-option>
                                                        <el-option label="区域二" value="beijing"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12" :sm="12">
                                                <el-form-item label="子系统">
                                                    <el-select v-model="form.region" placeholder="请选择活动区域" clearable>
                                                        <el-option label="区域一" value="shanghai"></el-option>
                                                        <el-option label="区域二" value="beijing"></el-option>
                                                    </el-select>
                                                    <i class="el-icon-circle-plus-outline add"></i>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="24" :sm="24">
                                                <el-form-item label="解决方案">
                                                    <el-input type="textarea" v-model="form.desc"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                    </el-form>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="全程跟踪" name="project">
                                <div class="console-tab-content">
                                    <el-form :model="form" label-width="180px" label-position="left">
                                        <el-row :gutter="20">
                                            <el-col :span="8" :sm="8">
                                                <el-form-item label="待技术管理部审核：">
                                                    <el-form-item label="213131"></el-form-item>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="8" :sm="8">
                                                <el-form-item label="发送人：" label-width="100px">
                                                    <el-form-item label="213131"></el-form-item>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="24" :sm="24">信息</el-col>
                                        </el-row>
                                    </el-form>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
                <div class="content" v-if="bugVisible">
                    <el-form :model="form" label-width="120px">
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="BUG编号">
                                    <el-input v-model="form.name" :disabled='error.disabled'></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="标题">
                                    <el-input v-model="form.name" ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-form-item label="BUG说明">
                                <el-input v-model="form.name" type="textarea"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row :gutter="24">
                            <el-form-item label="提交人">
                                <el-input v-model="form.name" type="textarea"></el-input>
                            </el-form-item>
                        </el-row>
                    </el-form>
                    <div style="text-align: center">
                        <el-button type="danger" @click="subForm">确 定</el-button>
                    </div>
                </div>

            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                bugVisible:false,
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
                keyword: "",
                options: [
                    {
                        "key": "与我相关",
                        "value": "1"
                    }, {
                        "key": "全部",
                        "value": "2"
                    }, {
                        "key": "订制中",
                        "value": "3"
                    }, {
                        "key": "制定方案",
                        "value": "4"
                    }, {
                        "key": "方案选择",
                        "value": "5"
                    }, {
                        "key": "追踪信息",
                        "value": "6"
                    }, {
                        "key": "已完成",
                        "value": "7"
                    }, {
                        "key": "已作废",
                        "value": "8"
                    }
                ],
                selectValue: "与我相关",
                page: {},
                form: {},
                error: {
                    disabled: true
                },
                dateComp: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }],
                    value: ""
                },
                tabs: {
                    activeName: 'info',
                    consoleActionData: [
                        {"name": "aa"},
                        {"name": "aa"}
                    ],
                    consoleActionVisible: false,
                    consoleWrapperVisible: true
                }
            }
        },
        mounted(){
            this.calculate();
        },
        methods: {
            calculate(){
                let height = document.querySelector(".mainr").offsetHeight;
                let card_header_height = document.querySelector(".el-card__header").offsetHeight;
                let card_body = document.querySelector(".box-card .el-card__body");
                card_body.style.height = height - card_header_height - 36 + "px";
                //表格高度
                this.calculateTableHeight(this.tabs.consoleWrapperVisible ? 1 : 0);
                //tab高度
                if (this.tabs.consoleWrapperVisible) {
                    this.calculateTabsHeight();
                }
                //控制台的内容区域高度
            },
            calculateTableHeight(type){
                let height = document.querySelector(".mainr").offsetHeight;
                let actionHeight = document.querySelector(".content .action").offsetHeight;
                let card_header_height = document.querySelector(".el-card__header").offsetHeight;
                //40为padding高度,33为th高度，20位margin-top高度.最后为误差控制，随便写；
                //0代表没有控制台
                if (type == 0) {
                    this.table.tableHeight = height - actionHeight - card_header_height - 20 - 33 - 40 - 5;
                } else {
                    this.table.tableHeight = height * 0.3;
                }
            },
            calculateTabsHeight(){
                let card_body = document.querySelector(".box-card .el-card__body");
                let actionHeight = document.querySelector(".content .action").offsetHeight;
                let allTabContent = document.querySelectorAll(".console-tab-content");
                for (let i of allTabContent) {
                    //---------------el-card__body的可用内容高(增加一个范围容差)---------顶部操作栏的高---------表格部分的高------tab的头和margin的高---
                    i.style.height = (parseInt(card_body.style.height) - 40 - 5) - actionHeight - (this.table.tableHeight + 20) - (20 + 40) + "px";
                }
            },
            searchKeyword(e){
                if (e.keyCode == 13) {

                }
            },
            handleSizeChange(val){
                console.log(val)
            },
            handleCurrentChange(val){
                console.log(val)
            },
            subForm(){

            },
            cancelForm(){

            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleCurrentChange(val){
                console.log(val);
                if (!this.tabs.consoleWrapperVisible) {
                    this.tabs.consoleWrapperVisible = true;
                    this.calculateTableHeight(1);
                    setTimeout(() => {
                        this.calculateTabsHeight();
                    }, 0)
                }
            },
            setConsoleVisible(){
                this.tabs.consoleWrapperVisible = false;
                this.calculateTableHeight(0)
            }
        }
    }
</script>