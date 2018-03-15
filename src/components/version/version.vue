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
        text-align: center;
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
.edition-line{
	padding: 0 20px;
}
.edition-line ul li span{
	display: inline-block;
	width: 96%;
	border-bottom: 3px solid #666;
	position: absolute;
    top: 50%;
    margin-top: -1px;
    left: 13px;
}
.edition-line {
	margin: 0 auto;
}
.edition-line ul{
	height: 60px;
}
.edition-line ul li{
	height: 60px;
	position: relative;
	float: left;
}
.edition-line li em{
	width: 16px;
	float: left;
	height: 16px;
	background:white url(../../static/image/circular-icon.png) 0 center no-repeat;
	background-size: 16px 16px;
	position: absolute;
	left: 0;
	top: 28px;
}
.edition-line li span{
	left: 20px;
	width: 80%;
	height: 10px;
}
.edition-line li p.banP{
	position: absolute;
	top: 45px;
	left: 0px;
    width: 100%;
    text-align: left;
}
.edition-line li.last_li span{
	width: 0;
}
.edition-line li .infoDiv{
	position: absolute;
	width: 80%;
	left: 10%;
	top: -19px;
	padding: 5px;
	background: #EEEEEE;
	z-index:100;
}
.edition-line li .infoDiv p{
	word-break: break-all;
}
.el-dialog__body .el-select{
	width: 100%;
}
.detail-table.el-table td{
	padding: 0;
	text-align: center!important;                            
}
.el-table .cell{
	text-align: center!important;
}
</style>

<template>
    <div class="rolelist common-card-wrap" style="height: 100%;">
        <el-card class="box-card">            
            <div class="text item">
                <div class="content">
                    <div class="action clear">
                        <el-button type="danger" @click="showdialog" size="mini">新建系统</el-button>
                        <el-select v-model="selectValue" clearable
                                   size="mini">
                            <el-option
                                    v-for="item in options"
                                    :label="item.key"
                                    :value="item.value"
                            >
                            </el-option>
                        </el-select>
                        <div class="fr">                           
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
                            <el-table-column prop="system_ID" label="涉及系统"></el-table-column>
                            <el-table-column prop="version_ID" label="子系统" width="110"></el-table-column>
                            <el-table-column prop="new_VERSION" label="最新版本"></el-table-column>
                            <el-table-column prop="current_VERSION" label="当前版本" width="110"></el-table-column>
                            <el-table-column prop="start_DATE" label="启用日期"></el-table-column>
                            <el-table-column prop="start_TIME" label="启用时间"></el-table-column>
                            <el-table-column prop="neel_DESCRIPTION" label="需求描述"></el-table-column>                           	
                        </el-table>
                    </div>
                    <!--详情表格-->
                    <div class="console-tab-wrapper" v-if="tabs.consoleWrapperVisible">
                    	 <div class="console-action-wrapper"style="position: relative;">
                            <i class="el-icon-close close" @click="tabs.consoleWrapperVisible=false"></i>
                        </div>
                        <el-table class='detail-table' :data="table.tableDetail" border style="width: 100%;margin-top:20px;text-align: center;"
                                  :height="table.tableHeight" highlight-current-row >
                            <el-table-column prop="system_NAME" label="涉及名称"></el-table-column>
                            <el-table-column prop="system_FNAME" label="子系统" width="110"></el-table-column>
                            <el-table-column prop="new_VERSION" label="版本号"></el-table-column>
                            <el-table-column prop="current_STATE" label="当前版本" width="110"></el-table-column>
                            <el-table-column prop="start_DATE" label="启用日期"></el-table-column>
                            <el-table-column prop="start_TIME" label="启用时间"></el-table-column>
                            <el-table-column prop="neel_DESCRIPTION" label="需求描述"></el-table-column>                           	
                        </el-table>
                    </div>
                    <!--版本轴-->
                    <div class="edition-line clearfix" v-if="tabs.consoleWrapperVisible">
                    	<ul class="edition-line-ul clearfix">
                    		<li v-for='(item,index) in tabs.versionLine' v-bind:style="{ width: tabs.width}" v-model="item.version" :class="index==tabs.versionLine.length-1?'last_li':'line_li'">
                    			<em v-on:mouseover="showInfo(index)" v-on:mouseleave="hiddenInfo(index)"></em>
                    			<span></span>
                    			<p class="banP">{{item.current_VERSION}}</p>
                    			<div class="infoDiv" style=""  v-if="tabs.infoshowVisible && tabs.activeLineIndex == index" v-model="tabs.infoshowVisible">
                    				<p>操作人：{{item.user_NAME}}</p>
                    				<p>操作说明：{{item.czsm}}</p>
                    			</div>
                    		</li>
                    	</ul>
                    </div>
                </div>
            </div>
        </el-card>
		<!--新增系统弹窗-->
    	<el-dialog title="新建系统" :visible="dialog.dialogVisible" append-to-body modal-append-to-body :before-close="closeAddDialog">
    		 <el-form label-width="80px">
	    		<el-row>
	    			 <el-col>
                        <el-form-item label="系统">
                        	<el-select v-model="dialog.system" placeholder="请选择"  filterable allow-create>
	                        	<el-option 
	                                    v-for="item in dialog.systemSelect"
	                                    :label="item.system_NAME"
	                                    :value="item.system_ID"
	                            ></el-option>
                        	</el-select>                        	
                        </el-form-item>
                    </el-col>
                    <el-col class="subsystem" :span='22'>
                        <el-form-item label="子系统" class='sunSystem' v-for="(item,index) in dialog.systemAll">
                        	<el-input v-model="item.csty" placeholder="请填写子系统"></el-input>
                          <i
                            :class="index == 0 && dialog.systemAll.length ==1?'el-icon-plus':index == dialog.systemAll.length-1?'el-icon-plus':'el-icon-minus'"
                            @click="addsubStystem(index,$event)"
                            style="line-height: 40px;height: 40px;text-align: center; font-size: 20px;cursor: pointer;font-weight: bold;position: absolute;top: 0;right: -30px;">
                          </i>

                        </el-form-item>
                    </el-col>
                     <el-col style="text-align: center;">                     	
                     	<el-button type="primary" @click="postSystem" size="medium">提交</el-button>
                        <el-button @click="backPage" size="medium">返回</el-button>
                    </el-col>
	    		</el-row>
	    		<div slot="footer" class="dialog-footer" :visible="dialog.dialogVisible">
	                
	            </div>
    		</el-form>
    		
    	</el-dialog>
    </div>
    	
</template>

<script>
    export default {
        data(){
            return {
            	dialog:{
            		name:'',
            		system:'',
            		dialogVisible: false,
            		classic:[],
            		systemSelect:[],
			        systemAll: [{"csty": ""}],
            	},
                errorVisible: false,
                table: {
                    tableData: [],
                    tableOriginData: [],
                    tableDetail:[],
                    tableHeight: "",
                    
                },
                keyword: "",
                options: {
                	name:'',
                	value:''
                },
                selectValue: "全部",
                form: {},
                error: {
                    disabled: true
                },
                tabs:{
                	versionLine:[{
                		'version':''
                	}],
                	activeTableInfo:"",
                	form:{
                		bianhao:"",
                		fxry:"",
                		gzmsh:"",
                		yx:"",
                		fx:"",
                	},
                	activeLineIndex:"",
                    activeName: 'info',
                    consoleActionVisible: false,
                    consoleWrapperVisible: false,
                    infoshowVisible:false,
					width:'',
                },
	           addneeds: {
	                    addInsetvisible: true,
	                    addvisible: false,
	                    changeInset: false,
	                    addform: {
	                        name: ""
	                    },
	                    sysName: {
	                        name: ""
	                    }
	               },              
            }
        },
        mounted(){
            this.loadData();
        },
        methods: {  
            calculate(){
                let height = document.querySelector(".mainr").offsetHeight;
                let card_body = document.querySelector(".box-card .el-card__body");
                card_body.style.height = height - 36 + "px";//此处需减去卡片头部
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
                    this.table.tableHeight = height - 36 - actionHeight - 20 - 20 -2;
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
            //表格渲染
            loadData(){   
            	this.calculate()
            	let params = new URLSearchParams();
                this.$axios.post('/version/versionlist', params).then((res) => {
                	if(res.code=200){
                		let data = res.data.result
                    	this.setTableData(data);
                	}
                	else{
                		this.warn(message);
                	}
                })
            },            
            setTableData(data){
                this.$set(this.table, "tableData", data);
                this.$set(this.table, "tableOriginData", data);                    
                this.$maskoff();
            },
            //版本详情显示
            handleCurrentChange(val){
            	if (!this.tabs.consoleWrapperVisible) {
                    this.tabs.consoleWrapperVisible = true;
                    setTimeout(() => {
                        this.calculate()
                    }, 0);
                }
                if(val.neel_ID){
                	let params = new URLSearchParams();
                	params.append("NEEL_ID", val.neel_ID);
                	params.append("SYSTEM_ID", val.system_ID);
                	params.append("SUBSYSTEM", val.subsystem);
                    this.$axios.post("/version/sonversionlist", params).then((res) => {                      	
                    	 if (res.data.code == 200) {
	                    	let data=res.data.result;
	                    	let versionNum=data.length;
	                    	let arr=[];
	                    	let versionP=[]
	                    	for (let i of data) {
	                    		versionP.push(i);
	                    		if(i.current_STATE==1){
	                    			i.current_STATE='是'
	                    		}
	                    		else{
	                    			i.current_STATE='';
	                    		}
	                    		
	                    		arr.push(i);
                    		}
	                    	this.$set(this.table, "tableDetail", arr);
	                    	this.$set(this.tabs, "versionLine", versionP);
	                    	for(let i=0;i<versionNum;i++){           		
		                		this.tabs.versionLine.push();
		                		let width=100/(versionNum+1)+"%"	
		                		 this.$set(this.tabs, "width", width);
		                	}
	                    	
                       }
                    })
                }
                return false;
            },
            //版本轴信息显示
            showInfo(index){
            	this.tabs.infoshowVisible=true;
            	this.tabs.activeLineIndex = index
            },
            //版本轴信息隐藏
           hiddenInfo(){
           	 	this.tabs.infoshowVisible=false;
            	this.tabs.activeLineIndex = ""
           },
            //新建系统的系统选择
            showdialog(){
	           	this.dialog.dialogVisible=true;
	           	this.calculate()
            	let params = new URLSearchParams();
                this.$axios.post('/golive/systemlists', params).then((res) => {
                	if(res.data.code=200){    
                		let systems=[];
                		let data = res.data.result;
                		for(let i of data){
                			systems.push(i);
                		}
                		this.$set(this.dialog, "systemSelect", systems);//系统
                	}
                })
           },
           
           //新建系统提交
           postSystem(){
           		let subSystem=[]
           		let params = new URLSearchParams();
           		let systemList=[];
           		if(!this.dialog.system){
           			this.$warn('涉及系统不能为空');
           			return;
           		}
           		else{
           			for(let i of this.dialog.systemSelect){
	           			systemList.push(i.system_ID)
	           		}
           			if(systemList.indexOf(this.dialog.system)==-1){
	           			params.append("SYSTEM_NAME",this.dialog.system);
	           		}
	           		else{
	           			params.append("SYSTEM_ID",this.dialog.system);
	           		}
           		}
           		for(let i of this.dialog.systemAll){           			
           			if(!i.csty){
           				this.$warn('请填写子系统')
           				return
           			}
           			else if(subSystem.indexOf(i.csty)==-1){
				      subSystem.push(i.csty)
				    }
           		}
           		params.append("SYSTEM_NAMES",subSystem);
           		 this.$axios.post('/version/addSystem ', params).then((res) => {
                	if(res.data.code=200){    
                		let data=res.data.result;
                	}
                	else{
                		this.$warn(message);
                	}
               })
           		 
           		this.dialog.dialogVisible = false;
           		return;
           },
           //追加子系统
            addsubStystem(index, e){
		        let type = e.target.className
		        if (type == "el-icon-plus") {
		          if (!this.dialog.systemAll[index].csty) {
		            this.$warn("请先填写子系统");
		            return
		          }
		          else{ 
		          	let subSystem=[];
		          	for(let i of this.dialog.systemAll){
		          		let csty=i.csty;
		          		if(subSystem.indexOf(csty)==-1){
		          			subSystem.push(csty);
		          		}
		          		else{
		          			this.dialog.systemAll[index].csty=''
		          			this.$warn("请填写不同的子系统");
		          			return
		          		}
		          	}
		          	this.dialog.systemAll.push({"csty": ""});
		          }
		       }
		        else {
		          this.dialog.systemAll.splice(index, 1)
		        }
		        
      		},
//         //弹窗关闭
           closeAddDialog(){
           	 	this.clearAddData();
                this.dialog.dialogVisible = false
            },
            //清除新增新增的表单
		    clearAddData(){
		    	let len=this.dialog.systemAll.length-1;
		        for (let i of this.dialog.systemAll) {
		        	i.csty=''		         
		        }
		        this.dialog.systemAll.splice(0,len)
		        this.dialog.system='';
		    },
            //搜索
            searchKeyword(e){
                if (e.keyCode == 13) {

                }
            },
             //返回
		      backPage(val){
		        this.loadData();
		        this.clearAddData();
		        this.dialog.dialogVisible = false
		      }
        }
    }
</script>