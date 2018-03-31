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
    .col-div{
        position: relative;
    }
    .infoDiv{
        position: absolute;
        top: 1px;
        left: 10px;

    }
    .tab-opt{
        display: inline-block;
        width: 90px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .assign-wrapper li {
        margin-bottom: 6px;
        padding: 0 10px;
        min-height: 70px;
    }
    .assign-wrapper li .deptTitle {
        display: block;
        width: 100%;
        line-height: 34px;
        border: 1px solid #ccc;
        text-align: center;
        font-size: 14px;
        margin: 5px auto;
    }
    .assign-wrapper .check-item {
        margin: 5px 0;
        display: block;
    }
    .genzong span {
        color: #4f4f4f;
        margin: 0 8px;
    }
    .assgin-dialog h2 {
        margin-bottom: 10px;
        font-size: 20px;
    }
    .assgin-dialog .tab span {
        float: left;
        width: 50%;
        text-align: center;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
    }
</style>

<template>
    <div class="rolelist common-card-wrap" style="height: 100%;"
         @click="$event.target.className == 'icon-more iconfont'?'':tabs.consoleActionVisible = false">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <p class="card-title por">
                    <span class="back fl clear" @click="backPage" v-if="bugVisible">
                        <i class="el-icon-arrow-left"></i>
                        <i class="b">返回</i></span>
                    {{!bugVisible?'故障清单':'提交BUG'}}
                </p>
            </div>
            <div class="text item">
                <div class="content" v-if="!bugVisible">
                    <div class="action clear">
                        <el-button type="danger" @click="shouBug" size="mini">提交BUG</el-button>
                        <el-select v-model="selectValues" placeholder="请选择状态" @change="statusOpt"  clearable
                                   size="mini">
                            <el-option
                                    v-for="item in selectValue"
                                   :label="item.value"
                                    :value="item.id">
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
                                        @change='timeChange'
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
                              :height="table.tableHeight"
                              highlight-current-row
                                  ref="ywxq_table"
                              @row-click="handleCurrentChange">
                            <el-table-column prop="id" label="编号" width="200" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="description" label="描述" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <span :title=scope.row.description class="tab-opt" style="">{{scope.row.description}}</span>
                                </template>
                            </el-table-column>
                            <!--<el-table-column prop="os_TYPE" label="涉及系统"></el-table-column>-->
                            <el-table-column prop="system_TYPE" label="子系统" width="110" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="create_TIME" label="提交日期" width="110" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="priperty" label="bug等级" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="status" label="状态" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="update_TIME" label="更新时间" show-overflow-tooltip></el-table-column>
                        </el-table>
                    </div>
                    <div class="console-tab-wrapper" v-if="tabs.consoleWrapperVisible">
                        <div class="console-action-wrapper">
                            <i class="el-icon-close close" @click="setConsoleVisible"></i>
                        </div>
                        <el-tabs v-model="tabs.activeName" type="card" @tab-click="tabClick">
                            <el-tab-pane label="详情页" name="info">
                                <div class="console-tab-content">
                                    <el-form ref="form" :model="form" label-width="80px" label-position="left">
                                        <el-row :gutter="20" >
                                            <el-col :span="12" :sm="12">
                                                <el-form-item label="BUG编号">
                                                    {{tabs.form.id}}
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12" :sm="12">
                                                <el-form-item label="标题">
                                                     {{tabs.form.title}}
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12" :sm="12">
                                                <el-form-item label="提交人">
                                                    {{tabs.form.createUser}}
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="24" :sm="24">
                                                <el-form-item label="BUG说明">
                                                     {{tabs.form.description}}
                                                    <p>
										               	<a style="margin-right: 20px; color: #66b1ff;" v-for="(item,index) in tabs.form.downName" @click="downfile(item.id)" >{{item.name}}</a>
										            </p>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                    </el-form>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="操作台" name="console">
                                <div class="console-tab-content">
                                    <div class="console-action-wrapper">
                                        <!--<i class="icon-more iconfont"-->
                                           <!--@click="tabs.consoleActionVisible = !tabs.consoleActionVisible" v-if="operate.status=='待审核'"></i>-->
                                        <!--<div class="console-action fr" v-if="tabs.consoleActionVisible">-->
                                            <!--<span v-for="item in tabs.consoleActionData.bugact"-->
                                                  <!--@click="consoleActionEvent(item.name,'bugact')">{{item.name}}-->
                                            <!--</span>-->
                                        <!--</div>-->
                                    </div>
                                    <el-form :model="form" label-width="100px" label-position="left">
                                        <el-row :gutter="20">
                                            <el-col :span="12" :sm="12" v-if="operate.status=='待审核' && operate.permission" style="width: 51%;float: right">
                                                <el-form-item label="关联的缺陷号">
                                                    <el-select v-model="operate.relationValue" placeholder="" filterable  clearable style="width: 100%">
                                                        <el-option
                                                                v-for="_item in operate.relation"
                                                                :label="_item.technology_NEEL_ID"
                                                                :value="_item.technology_NEEL_ID"
                                                        ></el-option>
                                                    </el-select>
                                                    <!--<el-button style="margin-left: 50px"  type="primary"-->
                                                                <!--v-if="operate.fpvisible"-->
                                                                <!--@click="tableAction($event)">分配-->
                                                    <!--</el-button>-->
                                                </el-form-item>
                                            </el-col>

                                            <el-col :span="12" :sm="12">
                                                <el-form-item label="状态">
                                                    <el-form-item label="">{{operate.status}}</el-form-item>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12" :sm="12">
                                                <el-form-item label="发送人">
                                                    <el-form-item label="">{{operate.sender}}</el-form-item>
                                                </el-form-item>
                                            </el-col>
                                            <div class="opt-show" v-if="operate.status=='待审核' && operate.permission">
                                                <el-col :span="12" :sm="12">
                                                    <el-form-item label="成因">
                                                            <el-select v-model="operate.reasonValue" placeholder="" filterable  clearable style='width: 100%;'>
                                                                <el-option
                                                                        v-for="_item in operate.reasonSelect"
                                                                        :label="_item.REASON_NAME"
                                                                        :value="_item.ID"
                                                                ></el-option>
                                                            </el-select>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="12" :sm="12">
                                                    <el-form-item label="影响范围">
                                                        <el-input v-model="operate.effectScope"></el-input>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="12" :sm="12">
                                                    <el-form-item  label="涉及系统">
                                                        <el-form-item label="">{{operate.system}}</el-form-item>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="24" :sm="12" >
                                                    <el-form-item label="子系统" class='sunSystem' v-for="(item,index) in operate.systemAll">
                                                        <el-select v-model="item.csty" placeholder="子系统" clearable style='width: 90%;'>
                                                            <el-option
                                                                v-for="_item in operate.subSystem"
                                                                :label="_item.SYSTEM_NAME"
                                                                :value="_item.SYSTEM_ID+','+_item.SYSTEM_NAME"
                                                                ></el-option>
                                                        </el-select>
                                                        <i :class="index == 0 && operate.systemAll.length ==1?'el-icon-plus':index == operate.systemAll.length-1?'el-icon-plus':'el-icon-minus'"
                                                           @click="addsubStystem(index,$event)"
                                                           style="line-height: 40px;height: 40px;text-align: right;
                                                    font-size: 20px;cursor: pointer;font-weight: bold;width: 8%;">
                                                        </i>

                                                    </el-form-item>
                                                    </el-col>
                                                <el-col :span="24" :sm="24">
                                                    <el-form-item label="解决方案">
                                                        <el-input type="textarea" v-model="operate.solution"></el-input>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col align="center" v-if="operate.status=='待审核'">
                                                    <el-button type="" size="medium" value="驳回" name="'bh" @click="consoleActionEvent('驳回')">驳回</el-button>
                                                    <el-button type="primary" size="medium" value="确认" @click="consoleActionEvent('确认')">确认</el-button>
                                                </el-col>
                                            </div>
                                        </el-row>
                                    </el-form>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="全程跟踪" name="project">
                                <div class="console-tab-content">
                                    <el-form :model="form" label-width="100px" label-position="left">
                                        <el-row :gutter="20">
                                            <el-col :span="12" :sm="12">
                                                <el-form-item label="状态">
                                                    <el-form-item label="">{{operate.status}}</el-form-item>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12" :sm="12">
                                                <el-form-item label="发送人" label-width="100px">
                                                    <el-form-item label="">{{way.sender}}</el-form-item>
                                                </el-form-item>
                                            </el-col>
                                            <el-col class="col-div" :span="24" :sm="24">
                                                <div class="infoDiv" >
                                                    <p v-for="(item,key) in way.information">
                                                        {{key+1}}、
                                                        <span>{{item.record_START | date}}</span>
                                                        <em>{{item.record_DESC}}</em>
                                                    </p>

                                                </div>
                                            </el-col>
                                        </el-row>
                                    </el-form>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
                <div class="content" v-if="bugVisible">
                    <el-form :model="form" label-width="100px">
                        <el-row :gutter="24">
                            <el-col>
                                <el-form-item label="BUG编号">
                                    <el-input v-model="popup.popTxt.id" :disabled='error.disabled'></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col>
                                <el-form-item label="标题">
                                    <el-input v-model="popup.popTxt.title" ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                        	  <el-col :span="24" :sm="24" >
	                            <el-form-item label="故障等级">
	                                <el-select style="width: 50%" v-model="popup.popTxt.priperty2" placeholder="故障等级" clearable>
	                                    <el-option
	                                    	v-for="item in popup.priperty"
		                                    :label="item.name"
		                                    :value="item.value"
	                                    	></el-option>
	                                </el-select>

	                            </el-form-item>


                             </el-col>
                                <!--<el-col :span="12" :sm="12">-->
                                    <!--<el-form-item label="">-->
                                        <!--<el-button  type="primary"-->
                                                    <!--v-if="operate.fpvisible"-->
                                                    <!--@click="tableAction($event)">分配-->
                                        <!--</el-button>-->
                                    <!--</el-form-item>-->
                                <!--</el-col>-->
                        </el-row>
                        <el-row :gutter="24">
                        	  <el-col>
	                            <el-form-item label="BUG说明">
	                                <el-input v-model="popup.popTxt.description" type="textarea" ></el-input>
	                                <el-button type="primary">上传附件</el-button>
	                                <input type="file" @change="getFile($event)" placeholder="上传附件"
					                       style="width:78px;opacity: 0;position: absolute;left: 10px;top: 63px;">
					                <p v-for ="(item,index) in popup.popTxt.uploadFiles">{{item}}
					                  <i style="margin-left: 10px;cursor: pointer;color: red;"
					                  	@click="popup.popTxt.fileList.splice(index,1);popup.popTxt.uploadFiles.splice(index,1)" class="el-icon-close"></i>
					                </p>
					                </el-upload>
	                            </el-form-item>
	                             </el-col>
                        </el-row>
                        <el-row :gutter="24">
                        	  <el-col>
	                            <el-form-item label="提交人">
	                                <el-input v-model="popup.popTxt.createUser" type="textarea"></el-input>
	                            </el-form-item>
	                          </el-col>
                        </el-row>
                    </el-form>
                    <div style="text-align: center">
                        <el-button style="margin-left: 100px"  type="primary"
                                   v-if="operate.fpvisible"
                                   @click="tableAction($event)">分配人员
                        </el-button>
                        <el-button type="danger" @click="subForm">确 定</el-button>
                    </div>
                </div>
                <!--分配-->
                <el-dialog title="分配" :visible="assign.assignvisible" width="40%"
                           append-to-body modal-append-to-body :before-close="closeDialog" class="assgin-dialog">
                    <div slot="title">
                        <h2>分配</h2>
                        <el-input
                                class="search-input"
                                placeholder="请输入姓名"
                                v-model="assign.keyword"
                                @keyup.13="assignSearch($event)"
                                @change="assignSearch" clearable>
                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                    </div>
                    <!--左侧选择全部部门-->
                    <div class="assign-wrapper" v-if="assign.left">
                        <!--正常状态下展示部门-->
                        <ul v-if="!assign.leftSearch">
                            <li v-for="(item, index) in assign.searchData" v-if="item.users.length>0">
                                <span class="deptTitle" @click="assign.assignDeptIndex = index" style="cursor: pointer">{{item.dept_name}}</span>
                                <el-checkbox-group v-model="assign.checkList" v-show="index == assign.assignDeptIndex">
                                    <el-checkbox v-for="_item in item.users" :label="_item.user_ID+'-'+_item.user_NAME" class="check-item">
                                        {{_item.user_NAME}}&nbsp;-&nbsp;{{_item.role_NAME}}
                                    </el-checkbox>
                                </el-checkbox-group>
                            </li>
                        </ul>
                        <!--搜索状态下不展示部门-->
                        <div v-if="assign.leftSearch">
                            <el-checkbox-group v-model="assign.checkList">
                                <el-checkbox v-for="item in assign.searchData" :label="item.user_ID+'-'+item.user_NAME"
                                             class="check-item">
                                    {{item.user_NAME}}&nbsp;-&nbsp;{{item.role_NAME}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="assign.assignvisible = false" size="mini">取 消</el-button>
                        <el-button type="primary" @click="subAssign" size="mini">提交</el-button>
                    </div>
                </el-dialog>
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
                    tableData: [],
                    tableOriginData: [],
                    tableHeight: "",
                },
                  operate:{
                    id:'',
                    status:'',//状态
                    solution:'',//解决方案
                    sender:'',//发送人
                       reasonValue:'',//成因
                      reasonSelect:'',
                    effectScope:'',//影响范围
                    system:'',//涉及系统
                    subSystem:[],//子系统
                    systemAll:[{"csty":""}],
                    relation:'',//关联
                    relationValue:'',
                    glvisibble:false,
                      topeople:'',//指派人
                      topeopleSelect:'',
                      fpvisible:true,//分配弹窗显示
                      permission:false

                  },
              way:{
                status:'',
                sender:'',
                information:''
              },
                keyword: "",
                options: [
                ],
                selectValues:[],
                selectValue:[
                 {
                	'id':1,
                	"value":'待审核'
                },{
                	'id':'2',
                	"value":'已完成'
                },
                {
                	'id':'4',
                	"value":'已驳回'
                },
                ],
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
                    },
 {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
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
                    consoleActionData: {
                        "bugact": [{
                            "name":"驳回"
                        },{
                            "name":"确认"
                        }]
                    },
                    form:{
                    	id:'',
                    	title:'',
                    	createUser:'',
                    	description:'',
                    	downName:[]
                    },
                    consoleActionVisible: false,
                    consoleWrapperVisible: false,
                },
                popup:{
                	id:'',
                    fppeople:'',
                	priperty:[
                    {
                      'name':'紧急',
                      "value": "101"
                    },
                    {
                      'name':'中等',
                      "value": "102"
                    },
                    {
                      'name':'一般',
                      "value": "103"
                    }
                  ],
                  popTxt:{
                      'id': '',//问题ID
			          'priperty2':'',//故障等级
			          'relationUser': "",			//故障分析人员
			          'description': "",				//故障描述
			          'descriptionEx': "",			//故障复盘分析
			          'sumEffect': "",				//交易量影响
			          'uploadFiles':[],              // 上传成功的文件数组
			          'fileList':[],                //上传附件
		         },
                },
                split:{
                    splitaddvisible:false
                },
                assign: {
                    assignvisible: false,//分配的弹窗
                    keyword: "",//分配的搜索人员
                    left: true,//左侧的显示
                    right: false,//右侧的显示
                    checkList: [],//选择的数据
                    leftOriginData: [],//左侧显示的数据
//                    rightlistdata: [],//右侧显示的数据
                    leftSearch: false,//左侧搜索出来的结构展示
                    searchData: [],//左侧特殊结构，显示出来的搜索结果存放处
                    assignDeptIndex:"",//当前选中的部门索引
                },
            }
        },
        filters: {
            date(time) {
                let d = new Date(time);
                let year = d.getFullYear();
                let month = (d.getMonth() + 1)<10?'0' + (d.getMonth()+1) : '' + d.getMonth()+ 1;
                let day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
                let hour = d.getHours()< 10 ? '0' + d.getHours() : '' + d.getHours();
                let minutes = d.getMinutes() <10 ? '0' + d.getMinutes() : '' + d.getMinutes();
                let seconds = d.getSeconds() <10 ? '0' + d.getSeconds() : '' + d.getSeconds();
                return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
            },
        },
        mounted(){
            this.calculate();
            this.loadData();
        },
        methods: {
            calculate(){
                let height = document.querySelector(".mainr").offsetHeight;
//                let card_header_height = document.querySelector(".el-card__header").offsetHeight;
                let card_body = document.querySelector(".box-card .el-card__body");
                card_body.style.height = height - 36 -48 + "px";//此处需减去卡片头部
                //表格高度
                this.calculateTableHeight(this.tabs.consoleWrapperVisible);
                //tab高度
                if (this.tabs.consoleWrapperVisible) {
                    this.calculateTabsHeight();
                }
                //控制台的内容区域高度
            },
            calculateTableHeight(type){
                let height = document.querySelector(".mainr").offsetHeight;
                let actionHeight = document.querySelector(".content .action").offsetHeight;
                //true代表没有控制台
                if (!type) {
                    //-----------------------body的上下padding--table的margin-top-卡片头部
                    this.table.tableHeight = height - 36 - actionHeight - 20 - 20 - 48 -2;
                } else {
                    this.table.tableHeight = height * 0.3;
                }
            },
            calculateTabsHeight(){
                let card_body = document.querySelector(".box-card .el-card__body");
                let actionHeight = document.querySelector(".content .action").offsetHeight;
                let allTabContent = document.querySelectorAll(".console-tab-content");
                for (let i of allTabContent) {
                    //---------------el-card__body的可用内容高---------顶部操作栏的高---------表格部分的高------tab的头和margin的高----------操作台border-卡片头部
                    i.style.height = (parseInt(card_body.style.height) - 20 ) - actionHeight - (this.table.tableHeight + 20) - (20 + 40) - 2 + "px";
                }
            },
            handleSizeChange(val){

            },
            loadData(){
                this.$maskin();
            	let params = new URLSearchParams();
                this.$axios.post("/fault/query?type=2", params).then((res) => {
                    let data = res.data
                    this.setTableData(data)
                    this.$maskoff();
                })
            },
            setTableData(data){
            	 if (data.code == 200) {
                    let arr = [];
                    for (let i of data.result) {
                    	 if (i.update_TIME) {
                            let update = this.$format(i.update_TIME);
                            i.update_TIME = `${update.year}-${update.mouth}-${update.day}`;
                        }
                    	 if (i.create_TIME) {
                            let create = this.$format(i.create_TIME);
                            i.create_TIME = `${create.year}-${create.mouth}-${create.day}`;
                        }
                    	switch(i.status ){
		            	 case 1:
		                 i.status = '待审核'
		                  break;
		                  case 2:
		                 i.status = '已完成'
		                  break;
		                  case 3:
		                 i.status = '已作废'
		                  break;
		                  case 4:
		                 i.status = '已驳回'
		                  break;
		                  case 5:
		                 i.status = '已关联'
		                  break;
		            }
                        if(i.priperty==101){
                        	i.priperty='紧急'
                        }
                        if(i.priperty==102){
                        	i.priperty='中等'
                        }
                        if(i.priperty==103){
                        	i.priperty='一般'
                        }
                        	arr.push(i)
                    }
                    this.$set(this.table, "tableData", arr);
                    this.$set(this.table, "tableOriginData", arr);
                    this.$maskoff();
                }
            },
            //故障bug状态选择
             statusOpt(val){
             	this.setConsoleVisible()
				let params = new URLSearchParams();
				params.append("status",val);
				this.$axios.post("/fault/query?type=2", params).then((res) => {
					 let data = res.data;
					if (data.code == 200) {
						 let arr = [];
						for (let i of data.result) {
                    	 if (i.update_TIME) {
                            let update = this.$format(i.update_TIME);
                            i.update_TIME = `${update.year}-${update.mouth}-${update.day}`;
                        }
                    	 if (i.create_TIME) {
                            let create = this.$format(i.create_TIME);
                            i.create_TIME = `${create.year}-${create.mouth}-${create.day}`;
                        }
                    	switch(i.status ){
		            	 case 1:
		                 i.status = '待审核'
		                  break;
		                  case 2:
		                 i.status = '已完成'
		                  break;
		                  case 3:
		                 i.status = '已作废'
		                  break;
		                  case 4:
		                 i.status = '已驳回'
		                  break;
		            }
                        if(i.priperty==101){
                        	i.priperty='紧急'
                        }
                        if(i.priperty==102){
                        	i.priperty='中等'
                        }
                        if(i.priperty==103){
                        	i.priperty='一般'
                        }
                        	arr.push(i)
                    }
						this.$set(this.table, "tableData", arr);
					}
					else{
						this.$warn(message);
					}
				})
            },
//          时间搜索
            timeChange(val){
                this.$maskin();
            	this.setConsoleVisible()
				let startTime=val[0]
				let endTime=val[1]
				startTime=Date.parse(startTime);
				endTime=Date.parse(endTime);
				let params = new URLSearchParams();
				params.append("startTime",startTime);
				params.append("endTime",endTime);
				this.$axios.post("/fault/query?type=2", params).then((res) => {
					 let data = res.data;
					if (data.code == 200) {
						this.$warn('操作成功');
						let arr = [];
			          for (let i of data.result) {
			            if (i.update_TIME) {
			              let update = this.$format(i.update_TIME);
			              i.update_TIME = `${update.year}-${update.mouth}-${update.day}`;
			            }
			            if (i.create_TIME) {
			              let create = this.$format(i.create_TIME);
			              i.create_TIME = `${create.year}-${create.mouth}-${create.day}`;
			            }
			            switch(i.status ){
			            	 case 1:
			                 i.status = '待审核'
			                  break;
			                  case 2:
			                 i.status = '已完成'
			                  break;
			                  case 3:
			                 i.status = '已作废'
			                  break;
			                  case 4:
			                 i.status = '已驳回'
			                  break;
			            }
			            if (i.priperty == 101) {
			              i.priperty = '紧急'
			            }
			            if (i.priperty == 102) {
			              i.priperty = '中等'
			            }
			            if (i.priperty == 103) {
			              i.priperty = '一般'
			            }
			            arr.push(i)
			          }
			          this.$set(this.table, "tableData", arr);
                        this.$maskoff();
					}
					else{
						this.$warn(message);
					}
				})
            },
            // 搜索关键字
           searchKeyword(e){
           	this.setConsoleVisible()
                if (e.keyCode == 13) {
                	this.keyword=this.keyword.replace(/(^\s*)|(\s*$)/g, "");
                	let params = new URLSearchParams();
                	params.append("key",this.keyword);
                    this.$axios.post("/fault/query?type=2", params).then((res) => {
                    	let data = res.data;
						if (data.code == 200) {
							this.$warn('操作成功');
							let arr = [];
			          for (let i of data.result) {
			            if (i.update_TIME) {
			              let update = this.$format(i.update_TIME);
			              i.update_TIME = `${update.year}-${update.mouth}-${update.day}`;
			            }
			            if (i.create_TIME) {
			              let create = this.$format(i.create_TIME);
			              i.create_TIME = `${create.year}-${create.mouth}-${create.day}`;
			            }
			            switch(i.status ){
			            	 case 1:
			                 i.status = '待审核'
			                  break;
			                  case 2:
			                 i.status = '已完成'
			                  break;
			                  case 3:
			                 i.status = '已作废'
			                  break;
			                  case 4:
			                 i.status = '已驳回'
			                  break;
			            }
			            if (i.priperty == 101) {
			              i.priperty = '紧急'
			            }
			            if (i.priperty == 102) {
			              i.priperty = '中等'
			            }
			            if (i.priperty == 103) {
			              i.priperty = '一般'
			            }
			            arr.push(i)
			          }
			          this.$set(this.table, "tableData", arr);
						}
                    })
                }
           },
            //点击row显示详情
            handleCurrentChange(val){
               this.clearAddData()
                this.tabs.activeTableInfo = val;
                if (!this.tabs.consoleWrapperVisible) {
                    this.tabs.consoleWrapperVisible = true;
                    setTimeout(() => {
                        this.calculate()
                    }, 0);
                }
                this.loadTabsData(val)

            },
            loadTabsData(val){
                    if(val.status=='待审核'){
                        this.operate.glvisibble=true
                    }
                    this.$maskin();
                	let params = new URLSearchParams();
                    params.append("id", val.id);
                    this.$axios.post("/fault/get", params).then((res) => {
                        let data = res.data;
                        if (data.code == 200) {
                          this.operate.status =val.status
                          this.way.status =val.status
                          this.tabs.form.id = data.result.fault.id;
                          this.tabs.form.title = data.result.fault.title;
                          this.tabs.form.createUser = data.result.fault.create_USER;
                          this.tabs.form.description = data.result.fault.description
                          this.operate.sender=data.result.fault.create_USER;
                          this.way.sender=data.result.fault.create_USER;
                          this.operate.relation=data.result.technologys;
                          this.operate.permission = data.result.permission;
                          console.log(this.operate.permission )
                          let arr=[];
                          if(data.result.process.result.length>0){
                            for(let i of data.result.process.result){
                              arr.push(i);
                            }
                            this.$set(this.way, "information", arr);
                          }
                          else{
                            arr=[];
                            this.$set(this.way, "information", arr);
                          }
                          //操作台涉及系统
                          this.operate.system = data.result.systemDept.SYSTEM_NAME
//                       	 操作台子系统显示
                          let subSystems=[];
                          let reason=[]
                          for (let i of data.result.systems.result) {
                            let obj = {
                              "SYSTEM_NAME":i.SYSTEM_NAME,
                              "SYSTEM_ID":i.SYSTEM_ID
                            }
                            subSystems.push(obj);
                          }
                          this.$set(this.operate, "subSystem", subSystems);
                            for(let i of data.result.reasons.reasons){
                                reason.push(i)
                            }
                          this.$set(this.operate, "subSystem", subSystems);
                            this.$set(this.operate, "reasonSelect", reason);
                          //显示下载附件
			              if(data.result.attachment.length>0){
			              	let down=[]
			              	for(let i of data.result.attachment){
			              		if(i.id){
			              			down.push(i);
			              		}
			              		 this.$set(this.tabs.form, "downName", down);
			              	}
			              }
                            this.$maskoff();
                        }
                    })
            },
            tableAction(e){
                this.operate.fpvisible=true
//                this.$refs.ywxq_table.setCurrentRow(row);
                //阻止事件冒泡
                e.stopPropagation();
                this.getAssign();
            },
            getAssign(){
//                let info = this.tabs.activeTableInfo;
                this.assign.keyword = "";//初始化关键字
                this.assign.checkList = [];//初始化选中的数据
                this.assign.assignDeptIndex = "";//初始化选中的索引
                this.assign.leftSearch = false;//关闭搜索结果的展示
                this.assign.assignvisible = true;
                let params = new URLSearchParams();
////                if (info.state_ID == 304) {
//                    params.append("TASK_ID", info.work_NEET_ID);
////                }
                this.$axios.post("/work/queryUserByDemand", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$set(this.assign, "searchData", data.result.users);
//                        let all = data.result.users;
//                        let dept = [];
//                        for(let i of all){
//                            for(let j of i.DEPT_ID){
//                              if(j.DEPT_ID == i.DEPT_ID)
//                                dept.push({
//                                    "DEPT_NAME":i.DEPT_NAME,
//                                    "DEPT_ID":i.DEPT_ID,
//                                    "USER_NAME":j.USER_NAME
//                                })
//                            }
//                        }
                        this.$set(this.assign, "leftOriginData", data.result.users);
//                        this.$set(this.assign, "rightlistdata", data.result.dept.users);
                    }
                })
            },
            //-----------------------------------分配任务搜索功能
            assignSearch(){
                let keyword = this.assign.keyword;
//                let type;
//                if (this.assign.left) {
//                    type = "left"
//                } else {
//                    type = "right"
//                }
                //搜索关键字判断
                if (keyword == "") {
                    //为空
                    this.assign.leftSearch = false;
//                    this.$set(this.assign, "searchData", type == "left" ? this.assign.leftOriginData : this.assign.rightlistdata)
                    this.$set(this.assign, "searchData",this.assign.leftOriginData)
                } else {
                    //不为空
                    let arr = [];
//                    if (type == "left") {
                    for (let i of this.assign.leftOriginData) {
                        for (let j of i.users) {
                            if (j.user_NAME.indexOf(keyword) >= 0) {
                                arr.push(j)
                            }
                        }
                    }
                    this.assign.leftSearch = true;
//                    } else {
//                        for (let i of this.assign.rightlistdata) {
//                            if (i.user_NAME.indexOf(keyword) >= 0) {
//                                arr.push(i)
//                            }
//                        }
//                    }
                    this.$set(this.assign, "searchData", arr);
                }
            },
            //-----------------------------------提交分配任务
            subAssign(){
                let result = this.assign.checkList;
                if (result.length == 0) {
                    this.$warn("当前没有选择任何人员");
                } else {
                    let temp = [];
                    let idArr = [];
                    let nameArr = [];
                    for (let i of result) {
                        temp.push(i.split("-"))
                    }
                    for (let i of temp) {
                        idArr.push(i[0]);
                        nameArr.push(i[1]);
                    }
                    this.$set(this.popup,"fppeople",idArr);
                    this.assign.assignvisible = false;
                }
            },
            //驳回 确认操作
            consoleActionEvent(val, f){
                if(val=='确认'){
                    if(!this.operate.reasonValue){
//	          			this.$warn("请填写成因")
                        this.$warn('请填写完整信息');
                        return
                    }
                    if(!this.operate.effectScope){
//	          			this.$warn("请填写影响范围")
                        this.$warn('请填写完整信息');
                        return
                    }
                    let nameArr=[]
                    let idArr=[]
                    for(let i of this.operate.systemAll){
                        let idTxt=i.csty.split(",")[0];//子系统id
                        if(idArr.indexOf(idTxt)==-1){
                            idArr.push(i.csty.split(",")[0])
                            nameArr.push(i.csty.split(",")[1])
                        }
                        else{
                            this.$warn('请选择不同的子系统')
                            return
                        }
                    }
                    if(idArr[0]==''){
                        this.$warn('请选择子系统')
                        return
                    }
                    if(!this.operate.solution){
//	                  this.$warn("请填写解决方案")
                        this.$warn('请填写完整信息');
                        return
                    }
                    let params = new URLSearchParams();
                    params.append("id", this.tabs.form.id);	//id
                    params.append("reason", this.operate.reasonValue);	//成因
                    params.append("effectScope", this.operate.effectScope);	//影响范围
                    params.append("solution", this.operate.solution);//解决方案
                    params.append("systemTypeId", idArr);//子系统id
                    params.append("systemType", nameArr);//子系统名称
                    params.append("type", 2);//
                    params.append("technology_NEEL_ID", this.operate.relationValue);//故障ID

                    this.$axios.post("/fault/audit", params).then((res) => {
                        if(res.status==200){
                            this.$success("操作成功！");
                            this.errorVisible=false;
                            this.operate.status='已完成'
                            this.loadData();
                        }
                        else{
                            this.$warn(message);
                        }
                    })

                }
                if(val=='驳回'){
                    let params = new URLSearchParams();
                    params.append("id", this.tabs.form.id);
                    this.$axios.post("/fault/reject", params).then((res) => {
                        if(res.status==200){
                            this.$success("操作成功！");
                            this.errorVisible=false;
                            this.operate.status='已驳回'
                            this.clearAddData();
                            this.loadData();
                        }
                        else{
                            this.warn(data.message);
                        }
                    })
                }

            },
            closeDialog(){
                this.assign.assignvisible = false;//分配任务的弹窗
                this.split.splitaddvisible = false;//拆分任务添加人员的弹窗
            },
           getFile(e){
	        //上传附件
	        let config = {
	          headers: {
	            'Content-Type': 'multipart/form-data',
	          }
	        };
	         let params = new FormData();
	         params.append("token",this.$getToken())
	         params.append("file",e.target.files[0]);
	         this.$axios.post("/fault/upload", params,config).then((res)=>{
	         	let data =res.data;
	         	if(data.code == 200){
	         		if(typeof this.popup.popTxt.uploadFiles =="string"){
	         		this.$set(this.popup.popTxt,"uploadFiles",[])
	         		this.$set(this.popup.popTxt,"fileList",[])
	         		}
	         		this.popup.popTxt.uploadFiles.push(data.result.name)
	         		this.popup.popTxt.fileList.push(data.result.id)
	         	}
	         })
	      },
	      //下载附件
	      downfile(val){
	      	let token=localStorage.getItem("token")
//	      	window.open("http://192.168.43.216:8082/fault/download?token="+token+"&id="+val);
			this.$axios.get("/fault/download?token="+token+"&id="+val+'&type=2')
	      },
	      //提交bug弹窗显示
	      shouBug(){
	      	this.bugVisible=true
	      /*	let params = new URLSearchParams();
				params.append("status",2);
				this.$axios.post("/fault/getNo", params).then((res) => {
					 let data = res.data;
						this.$set(this.popup, "id",data.id);
				})*/
              let params = new FormData();
              params.append("status", 2);
              params.append("token", this.$getToken());
              this.$axios.post("/fault/getNo",params).then((res) => {
                  let data = res.data;
                  this.popup.popTxt.id=data.id;
              })
	      },
// 			提交bug表单
            subForm(){
					if(!this.popup.popTxt.title){
//						this.$warn('请填写标题');
						this.$warn('请填写完整信息');
						return;
					}
					if(!this.popup.popTxt.priperty2){
//						this.$warn('请选择故障等级');
						this.$warn('请填写完整信息');
						return;
					}
					if(!this.popup.popTxt.description){
//						this.$warn('请填写BUG说明');
						this.$warn('请填写完整信息');
						return;
					}
					if(!this.popup.popTxt.createUser){
//						this.$warn("请填写提交人");
						this.$warn('请填写完整信息');
						return;
					}
					//上传附件
	            	let config = {
	            		headers: {
					        'Content-Type': 'multipart/form-data',
					    }
	            	}
	        	let params = new FormData();
	        	params.append("token",this.$getToken())
		        params.append("description", this.popup.popTxt.description);//BUG说明
		        params.append("title",this.popup.popTxt.title);//标题
		        params.append('createUser',this.popup.popTxt.createUser);//提交人
		        params.append("type",2);//类型
                params.append("priperty",this.popup.popTxt.priperty2);	//故障等级
                params.append("id",this.popup.popTxt.id);	//问题ID
                params.append("userId", this.popup.fppeople);//分配人id
		        params.append("attachmentId", JSON.stringify(this.popup.popTxt.fileList));
	            this.$axios.post("/fault/submit", params).then((res) => {
	                let data = res.data;
	                if (data.code == 200) {
	                  this.$success("操作成功！");
	                  this.errorVisible=false;
	                  this.clearAddData();
	                  this.loadData();
	                }
	                else{
	                  this.wran(data.message);
	                }
	              });
	              this.bugVisible=false
            },
//           控制台切换
            tabClick(val){
                this.calculateTabsHeight();
            },
            //清除新增新增的表单
		    clearAddData(){
		        for (let i in this.popup.popTxt) {
		            this.popup.popTxt[i] = "";
		        }
                this.operate.reasonValue=''
                this.operate.effectScope=''
                this.operate.solution=''
                let len=this.operate.systemAll.length-1
                for (let i of this.operate.systemAll) {
                    i.csty=''
                }
                this.operate.systemAll.splice(0,len)
                this.operate.system='';
		    },
			//添加系统
            addsubStystem(index,e){
            	let type = e.target.className
            	if(type == "el-icon-plus"){
	            	if(!this.operate.systemAll[index].csty){
	            		this.$warn("请先选择子系统");
	            		return
	            	}
            		this.operate.systemAll.push({"fsty":"","csty":""});
            	}else{
            		this.operate.systemAll.splice(index,1)
            	}
            },
            setConsoleVisible(){
                this.tabs.consoleWrapperVisible = false;
                this.calculateTableHeight(false)
            },

           backPage(val){
             	this.loadData();
             	this.clearAddData();
            	this.bugVisible=false
            }
        }
    }
</script>
