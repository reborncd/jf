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
	width: 89%;
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
.edition-line li{
	width: 100px;
	float: left;
	height: 60px;
	background: url(../../static/image/circular-icon.png) 0 center no-repeat;
	background-size: 16px 16px;
	position: relative;

}
.edition-line li p{
	position: absolute;
	top: 35px;
	left: -42px;
    width: 100%;
    text-align: center;
}
.edition-line li.last_li span{
	width: 0;
}
.el-dialog__body .el-select{
	width: 100%;
}
.detail-table.el-table td{
	padding: 0;
	text-align: center;                            
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
                        <el-table class='detail-table' :data="table.tableDetail" border style="width: 100%,margin-top:20px"
                                  :height="table.tableHeight" highlight-current-row >
                            <el-table-column prop="system_NAME" label="涉及名称"></el-table-column>
                            <el-table-column prop="system_FNAME" label="子系统" width="110"></el-table-column>
                            <el-table-column prop="version_ID" label="版本号"></el-table-column>
                            <el-table-column prop="current_VERSION" label="当前版本" width="110"></el-table-column>
                            <el-table-column prop="start_DATE" label="启用日期"></el-table-column>
                            <el-table-column prop="start_TIME" label="启用时间"></el-table-column>
                            <el-table-column prop="neel_DESCRIPTION" label="需求描述"></el-table-column>                           	
                        </el-table>
                        <!--版本轴-->
                    </div>
                    <div class="edition-line" v-if="tabs.consoleWrapperVisible">
                        	<ul class="edition-line-ul clearfix">
                        		<li><span></span><p>版本1.0</p></li>
                        		<!--<li><span></span><p>版本1.0</p></li>
                        		<li class="last_li"><span></span><p>版本1.0</p></li>-->
                        	</ul>
                        </div>
                </div>
            </div>
        </el-card>
		<!--新增系统弹窗-->
    	<el-dialog title="新建系统" :visible="dialog.dialogVisible" append-to-body modal-append-to-body :before-close="closeAddDialog">
    		 <el-form label-width="100px">
	    		<el-row>
	    			 <el-col>
                        <el-form-item label="系统">
                        	<el-select v-model="dialog.ID" placeholder="请选择">
	                        	<el-option 
	                                    v-for="item in dialog.systemSelect"
	                                    :label="item.system_NAME"
	                                    :value="item.system_ID"
	                            ></el-option>
                        	</el-select>                        	
                        </el-form-item>
                    </el-col>
                    <el-col class="subsystem">
                        <el-form-item label="子系统">
                        	<el-input v-model="dialog.subsystemSelect"></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col>
                     	<el-button @click="appendSubsystem">添加</el-button>
                    </el-col>
                     <el-col style="text-align: center;">                     	
                     	<el-button type="primary" @click="postSystem" size="medium">提交</el-button>
                        <el-button @click="dialog.dialogVisible = false" size="medium">返回</el-button>
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
            		dialogVisible: false,            		
            		subsystemSelect:[],
            		classic:[],
            		systemSelect:[],
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
                	activeTableInfo:"",
                	form:{
                		bianhao:"",
                		fxry:"",
                		gzmsh:"",
                		yx:"",
                		fx:"",
                	},
                    activeName: 'info',
                    consoleActionVisible: false,
                    consoleWrapperVisible: false,

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
                })
               
            },            
            setTableData(data){
                    this.$set(this.table, "tableData", data);
                    this.$set(this.table, "tableOriginData", data);                    
                    this.$maskoff();
            },
             //版本轴样式
//          editiionLine(){
//          	let editionuls=document.querySelector('.edition-line ul');
//          	let editionLi=document.createElement('li');
//          	let editionSpan=document.createElement('span');
//          	let editionP=document.createElement('p');  
//          	editionLi.style.width='100px';
//          	editionLi.style.float='left';
//          	editionLi.style.height='60px';
//          	editionLi.style.background='url(../../static/image/circular-icon.png) 0 center no-repeat';
//          	editionLi.style.backgroundSize='16px';
//          	editionLi.style.position='relative';
//          	editionP.style.width='100%';
//          	editionP.style.position='absolute';
//          	editionP.style.top='35px';
//          	editionP.style.left='-24px'
//          	editionP.style.textalign='center';
//          	editionSpan.style.width='89%';
//          	editionSpan.style.display='inline-block';
//          	editionSpan.style.position='absolute';
//          	editionSpan.style.top='50%';
//          	editionSpan.style.marginTop='-1px';
//          	editionSpan.style.left='13px';
//          	editionSpan.style.borderBottom='3px solid #666';
//          	editionuls.appendChild(editionLi);            
//          	editionLi.appendChild(editionSpan);
//          	editionLi.appendChild(editionP);
//          	editionP.innerHTMl="background";
//          	console.log(editionuls);
//          },
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
	                    	let arr=[];
	                    	for (let i of data) {
	                    		if(i.current_STATE==1){
	                    			i.current_VERSION='是'
	                    		}
	                    		else{
	                    			i.current_VERSION='';
	                    		}
	                    		arr.push(i);
                    		}
	                    	this.$set(this.table, "tableDetail", arr);
                        }
                    })
					
                }
               
                return false;
            },
            //新建系统弹窗显示
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
           postSystem(){
           		let params = new URLSearchParams();
           		 this.$axios.post('/golive/systemlists', params).then((res) => {
                	if(res.data.code=200){    
                		let data=res.data.result;
                		console.log(data);
                	}
                })
//         		this.addneeds.changeInset = false;
           		return;
           },
           appendSubsystem(){
           	
           },
           //弹窗关闭
           closeAddDialog(){
                this.dialog.dialogVisible = false
            },
            
            //搜索
            searchKeyword(e){
                if (e.keyCode == 13) {

                }
            }
        }
    }
</script>