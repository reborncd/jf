<style scoped>
    @import "../../../static/css/table.css";
    @import "../../../static/css/console.css";
</style>

<template>
    <div class="jsxq common-card-wrap"
         @click="$event.target.className == 'icon-more iconfont'?'':tabs.consoleActionVisible = false">
        <el-card class="box-card">
            <div class="text item">
                <div class="content">
                    <div class="action clear">
                        <el-button type="danger" size="mini" @click="start_addneeds">新增</el-button>
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
                                        size="mini"
                                        clearable
                                >
                                </el-input>
                            </div>
                        </div>
                    </div>
                    <div class="table-list">
                        <el-table :data="table.tableData" border style="width: 100%"
                                  :height="table.tableHeight"
                                  highlight-current-row
                                  @row-click="handleCurrentChange">
                            <el-table-column prop="technology_NEEL_ID" label="需求编号" width="200"></el-table-column>
                            <el-table-column prop="start_DATE" label="申请日期" width="100"></el-table-column>
                            <el-table-column prop="end_DATE" label="计划投产日期" width="120"></el-table-column>
                            <el-table-column prop="neel_NAME" label="需求名称"></el-table-column>
                            <el-table-column prop="system_NAME" label="涉及系统"></el-table-column>
                            <el-table-column prop="state_NAME" label="状态"></el-table-column>
                            <el-table-column prop="rriority_NAME" label="优先级" width="80"></el-table-column>
                            <!--<el-table-column label="操作">-->
                            <!--<template slot-scope="scope">-->
                            <!--<el-button size="mini" type="primary"-->
                            <!--v-if="!scope.row.start_DATE"-->
                            <!--@click="splitCodeStart(scope.$index, scope.row)">驳回-->
                            <!--</el-button>-->
                            <!--</template>-->
                            <!--</el-table-column>-->
                        </el-table>
                    </div>
                    <!--控制台部分-->
                    <div class="console-tab-wrapper" v-if="tabs.consoleWrapperVisible">
                        <div class="console-action-wrapper">
                            <i class="el-icon-close close" @click="setConsoleVisible"></i>
                        </div>
                        <el-tabs v-model="tabs.activeName" type="card">
                            <el-tab-pane label="详情页" name="info">
                                <div class="console-tab-content">
                                    <el-form label-width="100px" label-position="left">
                                        <el-row :gutter="20">
                                            <el-col :span="24">
                                                <el-form-item label="涉及系统" style="color: red">
                                                    {{tabs.dataList.system_NAME}}
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="24">
                                                <el-form-item label="状态" style="color: red">
                                                    {{tabs.dataList.state_NAME}}
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="需求编号">{{tabs.dataList.technology_NEEL_ID}}</el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="申请人">{{tabs.dataList.user_NAME}}</el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="需求名称">{{tabs.dataList.neel_NAME}}</el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="需求来源">{{tabs.dataList.neel_SOURCE}}</el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="申请日期">{{tabs.dataList.start_DATE}}</el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="计划投产日期">{{tabs.dataList.end_DATE}}</el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="优先级">{{tabs.dataList.rriority_NAME}}</el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="重要程度">{{tabs.dataList.importance_NAME}}
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="24">
                                                <el-form-item label="是否加急">
                                                    <span style="margin-right: 40px;">{{tabs.dataList.urgent}}</span>
                                                    <span style="color: red!important;">{{tabs.dataList.urgent_NAME}}</span>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="24">
                                                <el-form-item label="产品功能">{{tabs.dataList.product_FUNCTION}}</el-form-item>
                                            </el-col>
                                            <el-col :span="24">
                                                <el-form-item label="需求描述">{{tabs.dataList.neel_DESCRIPTION}}</el-form-item>
                                            </el-col>
                                        </el-row>
                                    </el-form>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="经理操作台" name="console">
                                <div class="console-tab-content">

                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="开发任务操作台" name="codetask" v-if="tabs.codetask">
                                <div class="console-tab-content">
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="测试任务操作台" name="testtask" v-if="tabs.testtask">
                                <div class="console-tab-content">
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="拆分任务详情" name="split" v-if="tabs.allSplittask">
                                <div class="console-tab-content">
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="全程跟踪" name="log">
                                <div class="console-tab-content">
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="实时统计" name="count">
                                <div class="console-tab-content">
                                    a
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                    <!--控制台部分-->
                </div>
            </div>
        </el-card>
        <!--新增-->
        <el-dialog title="新增" :visible="addneeds.addvisible" width="80%"
                   append-to-body modal-append-to-body :before-close="closeDialog">
            <el-form label-width="100px">
                <el-row :md="24" :gutter="20">
                    <!--<el-col :span="12" :md="12">-->
                        <!--<el-form-item label="涉及系统">-->
                            <!--<el-select v-model="addneeds.addform.system" clearable placeholder="请选择涉及系统"-->
                                       <!--style="width: 100%;">-->
                                <!--<el-option v-for="item in addneeds.addform.systemArr" :label="item.rriority_NAME"-->
                                           <!--:value="item.rriority_ID"></el-option>-->
                            <!--</el-select>-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--<el-col :span="24" :md="24" v-if="addneeds.addform.oldcode">-->
                        <!--<el-form-item label="原需求编号">-->
                            <!--<span style="color: #FF6600;cursor: pointer">{{addneeds.addform.oldcode}}</span>-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                    <el-col :span="12" :md="12">
                        <el-form-item label="需求类型">
                            <el-select v-model="addneeds.addform.type" clearable placeholder="请选择需求类型"
                                       @change="changeType"
                                       style="width: 100%;">
                                <el-option v-for="item in addneeds.addform.typeArr" :label="item.neel_TYPE_NAME"
                                           :value="item.neel_TYPE_ID"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="需求编号">
                            <el-input v-model="addneeds.addform.code" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="需求名称">
                            <el-input v-model="addneeds.addform.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="重要程度">
                            <el-select v-model="addneeds.addform.importance" clearable placeholder="请选择重要程度"
                                       style="width: 100%;">
                                <el-option v-for="item in addneeds.addform.importanceArr"
                                           :label="item.importance_NAME" :value="item.importance_ID"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="申请人">
                            <el-input v-model="addneeds.addform.apply_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="需求来源">
                            <el-select v-model="addneeds.addform.fromdeptId" clearable placeholder="请选择部门"
                                       style="width: 49%;float: left;margin-right: 2%;" @change="fromdeptchange">
                                <el-option v-for="item in addneeds.addform.fromdeptArr" :label="item.dept_name"
                                           :value="item.dept_id"></el-option>
                            </el-select>
                            <el-select v-model="addneeds.addform.fromdeptroleId" clearable placeholder="请选择人员"
                                       style="width: 49%;float: left;">
                                <el-option v-for="item in addneeds.addform.fromdeptroleArr" :label="item.user_NAME"
                                           :value="item.user_ID"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="申请日期">
                            <el-date-picker type="date" placeholder="选择日期" v-model="addneeds.addform.start_date"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="计划投产日期">
                            <el-date-picker type="date" placeholder="选择日期" v-model="addneeds.addform.end_date"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="优先级">
                            <el-select v-model="addneeds.addform.level" clearable placeholder="请选择优先级"
                                       style="width: 100%;">
                                <el-option v-for="item in addneeds.addform.levelArr" :label="item.rriority_NAME"
                                           :value="item.rriority_ID"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :md="24">
                        <el-form-item label="是否加急" style="height: 42px">
                            <el-row :span="24">
                                <el-col :span="6" :md="6">
                                    <el-radio v-model="addneeds.addform.urgent" label="0">否</el-radio>
                                    <el-radio v-model="addneeds.addform.urgent" label="1">是</el-radio>
                                </el-col>
                                <el-col :span="18" :md="18">
                                    <el-input placeholder="请填写加急原因" v-model="addneeds.addform.urgentreason"
                                              v-if="addneeds.addform.jiaji ==1?true:false"></el-input>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                    <!--原产品功能-->
                    <el-col :span="24" :md="24" v-if="addneeds.addform.oldgongneng">
                        <el-form-item label="原产品功能">
                            {{addneeds.addform.oldgongneng}}
                            <!--<el-input v-model="addneeds.addform.oldgongneng" disabled></el-input>-->
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :md="24">
                        <el-form-item label="产品功能">
                            <el-input v-model="addneeds.addform.function"></el-input>
                        </el-form-item>
                    </el-col>
                    <!--原需求描述-->
                    <el-col :span="24" :md="24" v-if="addneeds.addform.oldneedsname">
                        <el-form-item label="原需求描述">
                            {{addneeds.addform.oldneedsname}}
                            <!--<el-input type="textarea" v-model="addneeds.addform.oldneedsname" disabled></el-input>-->
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :md="24">
                        <el-form-item label="需求描述">
                            <el-input type="textarea" v-model="addneeds.addform.describe"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addneeds.addvisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="subaddForm" size="mini">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                addneeds: {
                    addvisible: true,
                    addProject: true,
                    addform:{
                        "system": "",//涉及系统
                        "systemArr": [],//涉及系统数组
                        "type":"",//选择的需求类型
                        "typeArr":[],//需求类型数组
                        "code": "",//需求编号
                        "name": "",//需求名称
                        "apply_name": "",//申请人
                        "fromdeptId": "",//来源部门ID
                        "fromdeptArr": "",//部门数组
                        "fromdeptroleId": "",//需求来源人ID
                        "fromdeptroleArr": "",//需求来源人数组
                        "importance": "",//重要程度
                        "importanceArr": "",//重要程度数组
                        "level": "",//优先级
                        "levelArr": "",//优先级数组
                        "start_date": "",//申请日期
                        "end_date": "",//计划投产日期
                        "urgent": "",//是否加急
                        "urgentreason": "",//加急的原因
                        "function": "",//产品功能
                        "describe": "",//需求描述

                        "oldcode": "",//原需求编号
                        "oldgongneng": "",//原产品功能
                        "oldneedsname": "",//原需求描述
                    }
                },
                options: [],
                selectValue:"",//选择的筛选的值
                dateComp:{},//日期筛选的值
                keyword:"",//搜索关键词
                table: {
                    tableHeight: "",//表格高度
                    tableData: [],//表格展示数据
                    tableOriginData: [],//表格源数据
                },
                tabs: {
                    activeName:"info",
                    consoleWrapperVisible: false,//控制台的显示
                    consoleActionVisible: false,//控制台的操作显示/隐藏
                    dataList:{
                        system_NAME:"",//涉及系统
                        state_NAME: "",//当前状态
                        base_NEET_ID: "",//需求ID
                        technology_NEEL_ID:"",//需求编号
                        user_NAME: "",//申请人
                        neel_NAME: "",//需求名称
                        neel_SOURCE: "",//需求来源部门
                        start_DATE: "",//申请日期
                        end_DATE: "",//计划投产日期
                        rriority_NAME: "",//优先级
                        importance_NAME: "",//重要程度
                        urgent: "",//是否加急
                        urgent_NAME: "",//加急原因
                        product_FUNCTION:"",//产品功能
                        neel_DESCRIPTION:"",//需求描述


                        reject: "",//驳回理由
                        code_start: "",//开发开始时间
                        code_end: "",//开发结束时间
                        test_start: "",//测试开始时间
                        test_end: "",//测试结束时间
                        oldcode:"",//原需求编号
                    },
                }
            }
        },
        mounted(){
            this.loadData();
        },
        methods: {
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
            //关闭控制台
            setConsoleVisible(){
                this.tabs.consoleWrapperVisible = false;
                this.calculateTableHeight(false)
            },
            loadData(){
                this.calculate();
                let params = new URLSearchParams();
                this.$axios.post("/demand/getdemandTechnology",params).then((res)=>{
                    let data = res.data;
                    if(data.code == 200){
                        this.table.tableData = data.result;
                        this.table.tableOriginData = data.result;
                    }
                })
            },
            //关闭弹窗
            closeDialog(){
                this.addneeds.addvisible = false;//关闭新增的弹窗
            },
            //表格点击事件
            handleCurrentChange(val){
                this.tabs.activeName= "info";
                if (!this.tabs.consoleWrapperVisible) {
                    this.tabs.consoleWrapperVisible = true;
                    setTimeout(() => {
                        this.calculate()
                    }, 0);
                }
                this.loadTabData(val)
            },
            //加载控制台信息
            loadTabData(val){
                this.$maskin();
                let params = new URLSearchParams();
                params.append("TECHNOLOGY_NEEL_ID",val.technology_NEEL_ID);
                this.$axios.post("/demand/technologyId",params).then((res)=>{
                    let data = res.data;
                    if(data.code == 200){
                        let info = data.result.technology;
                        this.tabs.dataList.system_NAME=info.system_NAME;//涉及系统
                        this.tabs.dataList.state_NAME=info.state_NAME;//当前状态
                        this.tabs.dataList.base_NEET_ID=info.base_NEET_ID;//需求ID
                        this.tabs.dataList.technology_NEEL_ID=info.technology_NEEL_ID;//需求编号
                        this.tabs.dataList.user_NAME=info.user_NAME;//申请人
                        this.tabs.dataList.neel_NAME=info.neel_NAME;//需求名称
                        this.tabs.dataList.neel_SOURCE=info.neel_SOURCE;//需求来源部门
                        this.tabs.dataList.start_DATE=info.start_DATE;//申请日期
                        this.tabs.dataList.end_DATE=info.end_DATE;//计划投产日期
                        this.tabs.dataList.rriority_NAME=info.rriority_NAME;//优先级
                        this.tabs.dataList.importance_NAME=info.importance_NAME;//重要程度
                        this.tabs.dataList.urgent=info.urgent?"否":"是";//是否加急
                        this.tabs.dataList.urgent_NAME=info.urgent_NAME;//加急原因
                        this.tabs.dataList.product_FUNCTION=info.product_FUNCTION;//产品功能
                        this.tabs.dataList.neel_DESCRIPTION=info.neel_DESCRIPTION;//需求描述
                        this.$maskoff();
                    }
                })
            },
            //新建需求前拉数据
            start_addneeds(){
                this.$maskin();
                let params = new URLSearchParams();
                this.$axios.post("/demand/gettypelist",params).then((res)=>{
                    let data = res.data;
                    if(data.code == 200){
                        this.$set(this.addneeds.addform, "fromdeptArr", data.result.depts);
                        this.$set(this.addneeds.addform, "importanceArr", data.result.importance);
                        this.$set(this.addneeds.addform, "levelArr", data.result.rrioritylist);
                        this.$set(this.addneeds.addform, "typeArr", data.result.typelist);
                        this.addneeds.addform.apply_name = data.result.USERNAME;
                        this.addneeds.addvisible = true;
                        this.$maskoff();
                    }
                })
            },
            //获取需求编号
            changeType(){
                console.log(this.addneeds.addform.type)
                if(this.addneeds.addform.type){
                    let params = new URLSearchParams();
                    params.append("NEEL_TYPE_ID",this.addneeds.addform.type);
                    this.$axios.post("/demand/technologyID",params).then((res)=>{
                        let data = res.data;
                        if(data.code == 200){
                            this.addneeds.addform.code = data.result.rt
                        }
                    })
                }
            },
            //提交新建需求
            subaddForm(){
                let params = new URLSearchParams();
                params.append("NEEL_TYPE",this.addneeds.addform.type);
                params.append("TECHNOLOGY_NEEL_ID",this.addneeds.addform.code);
                params.append("NEEL_NAME",this.addneeds.addform.name);
                params.append("IMPORTANCE",this.addneeds.addform.importance);
                params.append("USER_NAME",this.addneeds.addform.apply_name);
                params.append("NEEL_SOURCE_USER_ID",this.addneeds.addform.fromdeptroleId);
                params.append("NEEL_SOURCE_DEPT_ID",this.addneeds.addform.fromdeptId);
                params.append("START_DATE",this.addneeds.addform.start_date);
                params.append("END_DATE",this.addneeds.addform.end_date);
                params.append("RRIORITY",this.addneeds.addform.level);
                params.append("URGENT",this.addneeds.addform.urgent);
                params.append("URGENT_NAME",this.addneeds.addform.urgentreason);
                params.append("PRODUCT_FUNCTION",this.addneeds.addform.function);
                params.append("NEEL_DESCRIPTION",this.addneeds.addform.describe);
                params.append("STATE",303);
                this.$axios.post("/",params).then((res)=>{
                    let data =res.data;
                    if(data.code == 200){

                    }
                });
                console.log(this.addneeds.addform.start_date)
            },
            //新建时部门change事件
            fromdeptchange(){
                this.addneeds.addform.fromdeptroleId = "";
                let choosenId = this.addneeds.addform.fromdeptId;
                for(let i of this.addneeds.addform.fromdeptArr){
                    if(i.dept_id == choosenId){
                        this.$set(this.addneeds.addform,"fromdeptroleArr",i.users)
                    }
                }
            }
        }
    }
</script>