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
                        <el-select v-model="selectValues" clearable @change="statusOpt" size="mini">
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
                                >
                                </el-date-picker>
                            </div>
                            <div class="search i-b" @keyup="searchKeyword($event)">
                            	<!--v-on:input="keyChange"-->
                                <el-input placeholder="请输入检索关键字" suffix-icon="icon-sousuo iconfont"  v-model="keyword" size="mini" >
                                </el-input>
                            </div>
                        </div>
                    </div>
                    <div class="table-list">
                        <el-table :data="table.tableData" border style="width: 100%"
                                  :height="table.tableHeight" highlight-current-row
                                  @row-click="handleCurrentChange">
                            <el-table-column prop="status" label="状态"></el-table-column>
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
                                                    <el-input v-model="operate.reason">{{operate.reason}}</el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12" :sm="12">
                                                <el-form-item label="影响范围">
                                                    <el-input v-model="operate.effectScope">{{operate.effectScope}}</el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="24" :sm="24" >
                                                <el-form-item  label="涉及系统">
                                                	<el-form-item label="">{{operate.system}}</el-form-item>                                                    
                                                </el-form-item>
                                                
                                            </el-col>
                                            <el-col :span="24" :sm="24" >
                                                <el-form-item label="子系统" class='sunSystem' v-for="(item,index) in operate.systemAll">
                                                    <el-select v-model="item.csty" placeholder="子系统" clearable>
                                                        <el-option
                                                        	v-for="_item in operate.subSystem"
						                                    :label="_item.SYSTEM_NAME"
						                             		:value="_item.SYSTEM_ID+','+_item.SYSTEM_NAME"
                                                        	></el-option>
                                                    </el-select>
                                                    <i :class="index == 0 && operate.systemAll.length ==1?'el-icon-plus':index == operate.systemAll.length-1?'el-icon-plus':'el-icon-minus'"
                                                       @click="addsubStystem(index,$event)"
                                                       style="line-height: 40px;height: 40px;text-align: center;
                                                font-size: 20px;cursor: pointer;font-weight: bold">
                                                    </i>
                                                   
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
                                <!--<input type="file" @change="getFile($event)" placeholder="上传附件">-->
                                <el-upload
								  class="upload-demo"
								  action="http://172.16.2.225:8082/fault/upload"
								  :on-preview="handlePreview"
								  :on-remove="handleRemove"
								  :before-remove="beforeRemove"
								  	multiple
								  :limit="3"
								  :on-exceed="handleExceed"
								  :file-list="fileList">
							  <el-button size="small" type="primary">点击上传</el-button>
							</el-upload>
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
					subStystemValue:'',//子系统
                	system:'',//涉及系统
                	subSystem:[],//子系统
                	systemAll:[{"fsty":"","csty":""}],
	            },
	            way:{
	            	status:'',
	            	sender:'',
	            	information:''
	            },
                keyword:"",
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
                	'id':'3',
                	"value":'已作废'
                },
                {
                	'id':'4',
                	"value":'已驳回'
                }],
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
                    consoleWrapperVisible: false,

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
                fileList: [{
                	name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, 
                	{name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
                	]
            }
        },
        mounted(){
            this.calculate();
            this.loadData();
            this.statusOpt();
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
            
            loadData(){
            	let params = new URLSearchParams();
//              this.$axios.post("/fault/query?type=1", params).then((res) => {
//                  let data = res.data  
//                  this.setTableData(data)
//              })
//              this.$axios.get("/fault/status?token=abm", params).then((res) => {
//          	 	let data=res.data;
//          	 	let statusArr=[]
//          	 	if(data.code==200){
//          	 		for(let i of data.result.status){
//							statusArr.push(i);
//          	 		}      
//          	 		this.$set(this, "selectValue", statusArr); 
//          	 	}
//          	 	else{
//          	 		this.$warn(message);
//          	 	}
//          	 	
//          	 })
            },
            setTableData(data){
            	 if (data.code == 200) {
                    let arr = [];
                    for (let i of data.result) {
                        	arr.push(i)
                    }
                    this.$set(this.table, "tableData", arr);
                    this.$set(this.table, "tableOriginData", arr);
                    this.$maskoff();
                }
            },
            statusOpt(val){
				let params = new URLSearchParams();
				params.append("status",val);
//				this.$axios.post("/fault/query?type=1", params).then((res) => {
//					 let data = res.data.status;
//					if (res.code == 200) {
//						alert(111);
//						this.$warn('操作成功');
//					}
//				})
            	
            },
            keyChange(val){
            	alert(val);
            },
           //详情显示
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
                            this.tabs.form.id = data.result.fault.id;
                            this.tabs.form.pripoerty = data.result.fault.priperty;
                           	this.tabs.form.relationUser = data.result.fault.relation_USER;
                            this.tabs.form.description = data.result.fault.description;
                            this.tabs.form.sumEffect= data.result.fault.sum_EFFECT;
                            this.tabs.form.descriptionEx= data.result.fault.description;
                           	switch(data.result.fault.status){
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
                           	this.operate.sender=data.result.fault.create_USER;
                           	this.way.sender=data.result.fault.create_USER;
                            let arr=[];
                            //
                          if(data.result.process.result.length>0){
                            for(let i of data.result.process.result){
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
//                        	操作台子系统显示
                          let subSystems=[];
                          for(let i of data.result.systems.result){
                          	if(!i.SYSTEM_FID){
                          		this.operate.system=i.SYSTEM_NAME
                          	}
                          	else{
                          		subSystems.push(i);
                          	}
                          }
                          this.$set(this.operate, "subSystem", subSystems);
                        
                        }
                    })
                    
                }
                return false;
            },
//         搜索
           searchKeyword(e){
                if (e.keyCode == 13) {
                	this.keyword=this.keyword.replace(/(^\s*)|(\s*$)/g, "");
                	let params = new URLSearchParams();
//                  params.append("id", val.id);
                    this.$axios.post("/fault/query?type=1", params).then((res) => {
                    	
                    })
                }
           },
           getFile(event){
//         		this.file = event.target.files[0];
//          	console.log(this.file);
           },
//          提交故障单
            subForm(){
            	//提交故障提交单	
//          	if(!this.popup.priperty){
//          		this.$warn('请填写故障等级');
//          		return;
//          	}
//          	if(!this.popup.relationUser){
//          		this.$warn('请填写故障分析人员');
//          		return;
//          	}
//          	if(!this.popup.description){
//          		this.$warn('请填写故障描述');
//          		return;
//          	}
//          	if(!this.popup.descriptionEx){
//          		this.$warn('请填写故障复盘分析');
//          		return;
//          	}
//          	if(!this.popup.sumEffect){
//          		this.$warn('请填写交易量影响');
//          		return;
//          	}
            	
        		let params = new URLSearchParams();
//              params.append("priperty", this.popup.priperty2);	//故障等级
//              params.append("relationUser", this.popup.relationUser);	//故障分析人员
//              params.append("description", this.popup.description);//故障描述
//              params.append("descriptionEx", this.popup.descriptionEx);//故障复盘分析
//              params.append("sumEffect", this.popup.sumEffect);//交易量影响  
//              params.append("type",1);//类型                     
//              this.$axios.post("/fault/submit", params).then((res) => {
//                  let data = res.data;
//                  if (data.code == 200) {
//                      this.$success("操作成功！");
//                      this.errorVisible=false;
//                      this.clearAddData();
//                      this.loadData();
//                  }
//                  else{
//                  	this.wran(data.message);
//                  }
//              });
            },
            //上传附件
                  handleRemove(file, fileList) {
			        console.log(file, fileList)
			      },
			      handlePreview(file) {
			        console.log(file);
			      },
			      handleExceed(files, fileList) {
			        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			      },
			      beforeRemove(file, fileList) {
			        return this.$confirm(`确定移除 ${ file.name }？`);
			      },
//            控制台切换
            handleClick(tab, event){
            	
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
            //驳回 确认操作
            consoleActionEvent(val, f){
            	if(val=='确认'){
            		
          		if(!this.operate.reason){
          			this.$warn("请填写成因")
          			return
          		}
          		if(!this.operate.effectScope){
          			this.$warn("请填写影响范围")
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
//                nameArr=nameArr.join(',')
//                idArr=idArr.join(',')
                }
                if(idArr[0]==''){
                  this.$warn('请选择子系统')
                  return
                }
                if(!this.operate.solution){
                  this.$warn("请填写解决方案")
                  return
                }
            		let params = new URLSearchParams();
            		params.append("id", this.tabs.form.id);	//id
	                params.append("reason", this.operate.reason);	//成因
	                params.append("effectScope", this.operate.effectScope);	//影响范围
	                params.append("solution", this.operate.solution);//解决方案
	                params.append("systemTypeId", idArr);//子系统id
	                params.append("systemType", nameArr);//子系统名称
	                params.append("type", 1);//子系统id
            		this.$axios.post("/fault/audit", params).then((res) => {
            			if(res.status==200){
            				this.$success("操作成功！");
	                        this.errorVisible=false;
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
	                        this.clearAddData();
	                        this.loadData();
            			}
            			else{
            				this.warn(data.message);
            			}
            		})
            	}
            	
                this.tabs.consoleActionVisible = false   
           },            
           //返回
             backPage(val){
             	this.loadData();        	
            	this.errorVisible=false
            }
        }
    }
</script>