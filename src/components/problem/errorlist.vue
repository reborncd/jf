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
</style>

<template>
    <div class="rolelist common-card-wrap" style="height: 100%;"
         @click="$event.target.className == 'icon-more iconfont'?'':tabs.consoleActionVisible = false">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <p class="card-title por">
                    <!--<span class="back fl clear" @click="errorVisible = !errorVsetTableDataisible" v-if="errorVisible">-->
                    <span class="back fl clear" v-if="errorVisible">
                        <i class="el-icon-arrow-left"></i>
                        <i class="b" @click="backPage">返回</i></span>
                    	{{!errorVisible?'提交故障':'故障提交单'}}
                </p>
            </div>
            <div class="text item">
                <div class="content" v-if="!errorVisible">
                    <div class="action clear">
                        <el-button type="danger" @click="errorVisible = !errorVisible" size="mini">提交故障</el-button>
                        <el-select v-model="selectValue" clearable
                                   size="mini">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.key"
                                    :value="item.value"
                            >
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
                                  :height="table.tableHeight" highlight-current-row
                                  @row-click="handleCurrentChange">
                            <el-table-column prop="id" label="编号"></el-table-column>
                            <el-table-column prop="create_TIME" label="提交日期" width="110"></el-table-column>
                            <el-table-column prop="os_TYPE" label="涉及系统"></el-table-column>
                            <el-table-column prop="system_TYPE" label="子系统" width="110"></el-table-column>
                            <el-table-column prop="reason" label="故障成因"></el-table-column>
                            <el-table-column prop="description" label="描述"></el-table-column>
                            <el-table-column prop="priperty" label="优先级"></el-table-column>
                            <el-table-column prop="status" label="状态"></el-table-column>
                            <el-table-column prop="update_TIME" label="更新时间"></el-table-column>                           	
                        </el-table>
                    </div>
                    <div class="console-tab-wrapper" v-if="tabs.consoleWrapperVisible">
                        <div class="console-action-wrapper">
                            <i class="el-icon-close close" @click="setConsoleVisible"></i>
                        </div>
                        <el-tabs v-model="tabs.activeName" type="card" @tab-click="handleClick">
                            <el-tab-pane label="详情页" name="info">
                                <div class="console-tab-content">
                                    <el-form ref="form" :model="form" label-width="100px" label-position="left">
                                        <el-row :gutter="20" >
                                            <el-col :span="8" :sm="8">
                                                <el-form-item label="BUG编号">
                                                    {{tabs.form.id}}
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="8" :sm="8">
                                                <el-form-item label="故障等级">
                                                    {{tabs.form.pripoerty}}
                                                    
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="8" :sm="8">
                                                <el-form-item label="故障分析人员">
                                                  {{tabs.form.relationUser}}
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="24" :sm="24">
                                                <el-form-item label="故障描述">
                                                   {{tabs.form.description}}
                                                </el-form-item>
                                                
                                            </el-col>
                                            <el-col :span="24" :sm="24">
                                                <el-form-item label="交易量影响">
                                                   {{tabs.form.sumEffect}}
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="24" :sm="24">
                                                <el-form-item label="故障描复盘和分析">
                                                   {{tabs.form.descriptionEx}}
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                    </el-form>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="操作台" name="console" >
                                <div class="console-action-wrapper">
                                    <i class="icon-more iconfont"
                                       @click="tabs.consoleActionVisible = !tabs.consoleActionVisible"></i>
                                    <div class="console-action fr" v-if="tabs.consoleActionVisible">
                                        <span v-for="item in tabs.consoleActionData.erract"
                                        	@click="consoleActionEvent(item.name,'erract')">{{item.name}}</span>
                                    </div>
                                </div>
                                <div class="console-tab-content">
                                    <el-form :model="form" label-width="100px" label-position="left">
                                        <el-row :gutter="20">
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
                                            <el-col :span="12" :sm="12">
                                                <el-form-item label="成因">
                                                    <el-input v-model="form.name">{{operate.reason}}</el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12" :sm="12">
                                                <el-form-item label="影响范围">
                                                    <el-input v-model="form.name">{{operate.effectScope}}</el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12" :sm="12">
                                                <el-form-item label="涉及系统">
                                                    <el-select v-model="operate.systemTxt" placeholder="涉及系统" clearable @change="systemchange">
                                                        <el-option  
                                                        	v-for="item in operate.system"
						                                    :label="item.system_NAME"
						                                    :value="item.system_ID"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12" :sm="12">
                                                <el-form-item label="子系统" class='sunSystem'>
                                                    <el-select v-model="operate.subStystemValue" placeholder="子系统" clearable @change="subsystemchange">
                                                        <el-option
                                                        	v-for="item in operate.subSystem"
						                                    :label="item.system_NAME"
						                                    :value="item.system_ID"
                                                        	></el-option>
                                                    </el-select>
                                                    <!--<el-select v-model="operate.subStystemTxt" placeholder="子系统" clearable @change="subsystemchange">
                                                        <el-option
                                                        	v-for="item in operate.subSystem"
						                                    :label="item.system_NAME"
						                                    :value="item.system_ID"
                                                        	></el-option>
                                                    </el-select>-->
                                                    <i class="el-icon-circle-plus-outline add" @click="addsubStystem"></i>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="24" :sm="24">
                                                <el-form-item label="解决方案">
                                                    <el-input type="textarea" v-model="operate.solution"></el-input>
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
                                                    <el-form-item label="">{{way.status}}</el-form-item>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="8" :sm="8">
                                                <el-form-item label="发送人：" label-width="100px">
                                                    <el-form-item label="">{{way.sender}}</el-form-item>
                                                </el-form-item>
                                            </el-col>
                                            <el-col class="col-div" :span="24" :sm="24">
	                                           <div class="infoDiv" v-for="(item,key) in way.information">
	                                           	<p>
	                                           		{{key+1}}、
	                                           		<span>{{item.record_START}}</span>
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
                <!--故障提交单弹窗-->
                <div class="content" v-if="errorVisible">
                    <el-form :model="form" label-width="120px">
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="故障等级">
                                    <!--<el-input v-model="popup.priperty"></el-input>-->
                                    <el-select v-model="popup.priperty2" placeholder="故障等级" clearable>
                                        <el-option
                                        	v-for="item in popup.priperty"
		                                    :label="item.name"
		                                    :value="item.value"
                                        	></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="故障分析人员">
                                    <el-input v-model="popup.relationUser"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row  :gutter="24">
                            <el-form-item label="故障描述">
                                <el-input v-model="popup.description" type="textarea"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row :gutter="24">
                            <el-form-item label="故障复盘分析">
                                <el-input v-model="popup.descriptionEx" type="textarea"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row :gutter="24">
                            <el-form-item label="交易量影响">
                                <el-input v-model="popup.sumEffect" type="textarea"></el-input>
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
                errorVisible: false,
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
                	reason:'',//成因
                	effectScope:'',//影响范围
                	systemTxt:'', //涉及系统   
					subStystemValue:'',//子系统
                	system:'',//涉及系统
                	subSystem:''//子系统
	            },
	            way:{
	            	status:'',
	            	sender:'',
	            	information:''
	            },
                keyword: "",
                options: [
                    
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
                	activeTableInfo:"",
                	form:{
                		id:"",
                		pripoerty:'',
                		relationUser:"",
                		description:"",
                		sumEffect:"",
                		descriptionEx:""
                	},
                    activeName: 'info',
                    consoleActionData: {
                        "erract": [{
                            "name":"驳回"
                        },{
                            "name":"确认",
                        }]
                    },
                    consoleActionVisible: false,
                    consoleWrapperVisible: true,

                },
                popup:{
                	priperty2:'',
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
                ],                //故障等级
					relationUser:"",			//故障分析人员
                	description:"",				//故障描述
                	descriptionEx:"",			//故障复盘分析
                	sumEffect:"",				//交易量影响
                },
                errorVsetTableDataisible:false,
            }
        },
        mounted(){
            this.calculate();
            this.loadData();
        },
        methods: {       
            calculate(){
                let height = document.querySelector(".mainr").offsetHeight;
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
            	let params = new URLSearchParams();
                this.$axios.post("/fault/query?", params).then((res) => {
                    let data = res.data             
                    this.setTableData(data)
                })
            },
            setTableData(data){
            	 if (data.code == 200) {
                    let arr = [];
                    for (let i of data.result) {
                    	if(i.type==1){
                    		 if (i.create_TIME) {
		                        let create = this.$format(i.create_TIME);
		                        i.create_TIME = `${create.year}-${create.mouth}-${create.day}`;
	                        }
	                        if (i.update_TIME) {
		                        let create = this.$format(i.create_TIME);
		                        i.update_TIME = `${create.year}-${create.mouth}-${create.day}`;
	                        }
                        arr.push(i)
                    	}
                    }
                    this.$set(this.table, "tableData", arr);
                    this.$set(this.table, "tableOriginData", arr);
                    this.$maskoff();
                }
            },
            handleCurrentChange(val){
                this.tabs.activeTableInfo = val;
                if (!this.tabs.consoleWrapperVisible) {
                    this.tabs.consoleWrapperVisible = true;
                    setTimeout(() => {
                        this.calculate()
                    }, 0);
                }
                if(val.id){
                	let params = new URLSearchParams();
                    params.append("id", val.id);
                    this.$axios.post("/fault/get", params).then((res) => {
                        let data = res.data;
                        if (data.code == 200) {
                            //以下是设置展示数据
                            this.tabs.form.id = data.result.id;
                            this.tabs.form.pripoerty = data.result.priperty;
                           	this.tabs.form.relationUser = data.result.relation_USER;
                            this.tabs.form.description = data.result.description;
                            this.tabs.form.sumEffect= data.result.sum_EFFECT;
                            this.tabs.form.descriptionEx= data.result.description; 
                           	switch(data.result.status){
                           		 case 1:
			                        this.operate.status='审核中'
			                        this.way.status='审核中'
			                        break;
			                     case 2:
			                        this.operate.status='已完成'
			                        this.way.status='已完成'
			                        break;
		                         case 3:
			                        this.operate.status='已作废'
			                        this.way.status='已作废'
			                        break;
		                         case 4:
			                        this.operate.status='已驳回'
			                        this.way.status='已驳回'
			                        break;
		                         case 5:
		                        	this.operate.status='已关联'
		                        	this.way.status='已关联'
		                        	break;
                           	}
                           	this.operate.sender=data.result.create_USER; 
                           	this.way.sender=data.result.create_USER;
                           	this.handleClick({tabs:"全程跟踪"}, event);
                        }
                    })
                    
                }
                return false;
            },
            searchKeyword(e){
                if (e.keyCode == 13) {
                	
                }
            },
            pripoertyLevelChange(){
            	
            },
            subForm(){
            	//提交故障提交单	
            	if(!this.popup.priperty){
            		this.$warn('请填写故障等级');
            		return;
            	}
            	if(!this.popup.relationUser){
            		this.$warn('请填写故障分析人员');
            		return;
            	}
            	if(!this.popup.description){
            		this.$warn('请填写故障描述');
            		return;
            	}
            	if(!this.popup.descriptionEx){
            		this.$warn('请填写故障复盘分析');
            		return;
            	}
            	if(!this.popup.sumEffect){
            		this.$warn('请填写交易量影响');
            		return;
            	}
            	
        		let params = new URLSearchParams();
                params.append("priperty", this.popup.priperty2);	//故障等级
                params.append("relationUser", this.popup.relationUser);	//故障分析人员
                params.append("description", this.popup.description);//故障描述
                params.append("descriptionEx", this.popup.descriptionEx);//故障复盘分析
                params.append("sumEffect", this.popup.sumEffect);//交易量影响  
                params.append("type",1);//类型                     
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
            },
            cancelForm(){
            	
            },
            handleClick(tab, event){
            	if(tab.label=='操作台'){
            		let params = new URLSearchParams();
            		this.$axios.post("/fault/system", params).then((res) => {                			
            			let data=res.data.result;  
            			if(res.status==200){
            				let system = []; 
	            			for(let i of data){
	            				system.push(i);            		
	            			}
	            			this.$set(this.operate, "system", system);
	            		}
            			else{
	                    	this.warn(data.message);
	                  }            			
            		});	
            	}
            	if(tab.label=='全程跟踪'){
            		let params = new URLSearchParams();
            		params.append('id',this.tabs.activeTableInfo.id);
            		this.$axios.post("/fault/process", params).then((res) => {  
            			let data=res.data; 
            			let arr=[];
            			if(data.code==200){
            				this.$set(this.way, "information", data.result);
            				if(data.result.length>0){
            					for(let i of data.result){
	            					if(i.record_START){
	            						let start=this.$format(i.record_START);
	            						i.record_START= `${start.year}-${start.mouth}-${start.day}`;
	            					}
	            					arr.push(i);
	            				}
            				 	this.$set(this.way, "information", arr);
            				}
            				else{
            					arr=[];
            					this.$set(this.way, "information", arr);
            				}
            			}
            		});	
            	}
            },
            systemchange(val){
            	if(val){
            		let params = new URLSearchParams();
	            	params.append("id", val);	//涉及系统id	            	
	            	this.$axios.post("/fault/system", params).then((res) => {
            			if(res.status==200){
            				let data=res.data.result;
            				let subSystem=[]
            				for(let i of data){
            					subSystem.push(i);
            				}
            				this.$set(this.operate, "subSystem", subSystem);
            			}
            			else{
            				this.warn(data.message);
            			}
            		})
            	}
            },
            subsystemchange(val){
            	val = String(val)
            },
            //添加子系统
            addsubStystem(){
            	
            },
            setConsoleVisible(){
                this.tabs.consoleWrapperVisible = false;
                this.calculateTableHeight(false)
            },
            //操作台的事件
            consoleActionEvent(val, f){
            	if(val=='确认'){
            		let params = new URLSearchParams();
	                params.append("BASE_NEET_ID", this.addneeds.addform.code);	//需求编码
	                params.append("NEEL_NAME", this.addneeds.addform.name);	//需求名称
	                params.append("START_DATE", this.addneeds.addform.shenqingdate);	//申请日期
	                params.append("END_DATE", this.addneeds.addform.jihuadate);//计划投产日期
	                
            	}
            	if(val=='驳回'){
            		let params = new URLSearchParams();
	                params.append("id", this.tabs.form.id);
	                this.$axios.post("/fault/reject", params).then((res) => {
            			if(res.status==200){
            				this.$success("操作成功！");
	                        this.errorVisible=false;
	                        this.clearAddData();
	                        this.loadData();
            			}
            			else{
            				this.warn(data.message);
            			}
            		})
            	}
            	
                this.tabs.consoleActionVisible = false//   
           },            
             backPage(val){
             	this.loadData();        	
            	this.errorVisible=false
            }
        }
    }
</script>