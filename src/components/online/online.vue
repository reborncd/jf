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
	
	.el-table td,
	.el-table th {
		padding: 5px 0;
	}
	
	.el-button {
		padding: 6px 10px;
	}
	
	.console-tab-content .add {
		position: absolute;
		font-size: 20px;
		height: 20px;
		cursor: pointer;
		top: 0;
		bottom: 0;
		right: 5px;
		margin: auto;
	}
	
	.addCol {
		position: relative;
		padding: 0 30px 0 0!important;
	}
	
	.el-form-item__label {
		width: 120px !important;
	}
</style>
<template>
	<div class="jcjs common-card-wrap" @click="$event.target.className == 'icon-more iconfont'?'':tabs.consoleActionVisible = false">
		<el-card class="box-card">
			<div class="text item">
				<div class="content">
					<div class="action clear">
						<!--<el-button type="danger" size="mini" @click="newneeds">立项</el-button>-->
						<el-select v-model="selectValueUs" @change="selectStatUs(selectValueUs)" clearable size="mini">
							<el-option v-for="(item, index) in optionsUs" :label="item.key" :value="item.value">
							</el-option>
						</el-select>
						<el-select v-model="selectValueOn" @change="selectStatOn(selectValueOn)" clearable size="mini">
							<el-option v-for="(item, index) in optionsOn" :label="item.key" :value="item.value">
							</el-option>
						</el-select>
						<div class="fr">
							<div style="margin-right: 10px;" class="i-b">
								<el-date-picker v-model="dateRange" @change="pickDate(dateRange)" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right" size="mini" :picker-options="dateComp">
								</el-date-picker>
							</div>
							<div class="search i-b">
								<el-input placeholder="请输入检索关键字" suffix-icon="icon-sousuo iconfont" v-model="keyword" size="mini" clearable @change="searchKeyword($event)">
								</el-input>
							</div>
						</div>
					</div>
					<!--表格部分-->
					<div class="table-list">
						<el-table :data="table.tableData" border style="width: 100%" :height="table.tableHeight" highlight-current-row @row-click="handleCurrentChange">
							<el-table-column prop="nELL" label="需求编号"></el-table-column>
							<el-table-column prop="dESIRED_START_DATETIME" label="预计上线日期" width="110"></el-table-column>
							<el-table-column prop="dESIRED_END_DATETIME" label="预期上线时间" width="110"></el-table-column>
							<el-table-column prop="sYSTEM_NAME" label="系统名称"></el-table-column>
							<el-table-column prop="gOLIVE_SYSTEM" label="子系统"></el-table-column>
							<el-table-column prop="bAN" label="版本号"></el-table-column>
							<el-table-column prop="pRODUCT_FUNCTION" label="产品功能"></el-table-column>
							<el-table-column prop="cOLIVE_TYPE_NAME" label="上线类型"></el-table-column>
							<el-table-column prop="sTATE_NAME" label="状态"></el-table-column>
							<el-table-column label="操作" width="130">
								<template slot-scope="scope" class="action-wrap">
									<el-button v-if="scope.row.sTATE==2 || scope.row.sTATE==9" @click="agreeRow(scope.row,scope,$event)" size="small" type="primary">通过
									</el-button>
									<el-button v-if="scope.row.sTATE==2 || scope.row.sTATE==9" @click="unagreeRow(scope.row,scope,$event)" size="small" type="danger">驳回
									</el-button>
									<el-button v-if="scope.row.sTATE==4" @click="ensureRow(scope.row,scope,$event)" size="middle" type="primary">确定上线
									</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<!--表格部分-->
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

											<el-col :span="12">
												<el-form-item v-if="state.id==9" label="上线类型">{{tabs.data_one.goliveProject.cOLIVE_TYPE_NAME}}</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item v-if="state.id==9" label="上线模块">{{tabs.data_one.goliveProject.gOLIVE_MODULE}}</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item v-if="state.id==9" label="上线内容">{{tabs.data_one.goliveProject.gOLIVE_CONTENT}}</el-form-item>
											</el-col>

											<el-col :span="12">
												<el-form-item label="需求编号">{{tabs.data_one.DemandTechnology.tECHNOLOGY_NEEL_ID}}</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="需求名称">{{tabs.data_one.DemandTechnology.nEEL_NAME}}</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="申请人">{{tabs.data_one.DemandTechnology.uSER_NAME}}</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="需求来源">{{tabs.data_one.DemandTechnology.nEEL_SOURCE}}</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="申请日期">{{tabs.data_one.DemandTechnology.sTART_DATE}}</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="计划投产日期">{{tabs.data_one.DemandTechnology.eND_DATE}}</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="优先级">{{tabs.data_one.DemandTechnology.rRIORITY_NAME}}</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="重要程度">{{tabs.data_one.DemandTechnology.iMPORTANCE_NAME}}
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="是否加急"><span style="margin-right: 40px;">{{tabs.data_one.DemandTechnology.uRGENT}}</span><span>{{tabs.data_one.DemandTechnology.uRGENT_NAME}}</span>
												</el-form-item>
											</el-col>
											<el-col :span="24">
												<el-form-item label="需求描述">{{tabs.data_one.DemandTechnology.nEEL_DESCRIPTION}}
												</el-form-item>
											</el-col>
											<el-col :span="24">
												<el-form-item label="产品功能">{{tabs.data_one.DemandTechnology.pRODUCT_FUNCTION}}
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item v-if="state.id==9" label="开发负责人">{{tabs.data_one.goliveProject.oPEN_LEADER}}</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item v-if="state.id==9" label="项目负责人">{{tabs.data_one.goliveProject.pROJECT_LEADER}}</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item v-if="state.id==9" label="产品负责人">{{tabs.data_one.goliveProject.pRODUCT_LEADER}}</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item v-if="state.id==9" label="测试负责人">{{tabs.data_one.goliveProject.tEST_LEADER}}</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item v-if="state.id==9" label="预计上线日期">{{tabs.data_one.goliveProject.dESIRED_START_DATETIME}}</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item v-if="state.id==9" label="预计上线时间">{{tabs.data_one.goliveProject.dESIRED_END_DATETIME}}</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item v-if="state.id==9" label="影响时间">{{tabs.data_one.goliveProject.iNFLUENCE_MM}}分钟</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item v-if="state.id==9" label="是否停交易">{{tabs.data_one.goliveProject.tRADE_NAME}}</el-form-item>
											</el-col>
										</el-row>
									</el-form>
								</div>
							</el-tab-pane>

							<el-tab-pane label="操作台" name="console">
								<div class="console-tab-content">
									<div class="console-action-wrapper">
										<i class="icon-more iconfont" @click="tabs.consoleActionVisible = !tabs.consoleActionVisible"></i>
										<div class="console-action fr" v-if="tabs.consoleActionVisible">
											<span v-for="item in tabs.consoleActionData" @click="consoleActionEvent(item)">{{item.name}}
                                            </span>
										</div>
									</div>

									<el-form label-width="140px" v-if="!state.id || state.id==1">
										<el-col :span="24">
											<el-form-item label="状态">{{state.name}}
											</el-form-item>
										</el-col>
										<el-row :md="24" :gutter="20">
											<el-col :span="12" :md="12">
												<el-form-item label="上线类型">
													<el-select v-model="consoleForm.onlineType">
														<el-option v-for="(item, index) in onlineTypes" :label="item.key" :value="item.value">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
											<el-col :span="12" :md="12" v-if="consoleForm.onlineType!=0">
												<el-form-item label="是否加急">
													<el-select v-model="consoleForm.ifUrgent">
														<el-option v-for="(item, index) in ifUrgents" :label="item.key" :value="item.value">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>

											<el-col style="padding: 0;" v-for="(content, index) in onlineForm.onlineContent">
												<el-col :span="12">
													<el-form-item label="涉及系统">
														<el-select v-model="content.SYSTEM_ID" @change="systeMv(index,$event)">
															<el-option v-for="(item, index) in aboutSystems" :label="item.key" :value="item.value">
															</el-option>
														</el-select>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="上线系统">
														<el-select v-model="content.GOLIVE_SYSTEM">
															<el-option v-for="(item, index) in onlineSystems" :label="item.key" :value="item.value">
															</el-option>
														</el-select>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="上线模块">
														<el-input v-model="content.GOLIVE_MODULE"></el-input>
													</el-form-item>
												</el-col>
												<el-col :span="10">
													<el-form-item label="上线内容">
														<el-input v-model="content.GOLIVE_CONTENT"></el-input>
													</el-form-item>
												</el-col>
												<el-col :span="2">
													<i :class="index == 0 && onlineForm.onlineContent.length == 1?'el-icon-plus':index == onlineForm.onlineContent.length-1?'el-icon-plus':'el-icon-minus'" style="line-height: 40px;height: 40px;text-align: center;
                                                font-size: 20px;cursor: pointer;font-weight: bold" @click="systemEvent(index,$event)">
                                            </i></el-col>
											</el-col>

											<el-col :span="12">
												<el-form-item label="项目负责人">
													<el-input v-model="consoleForm.projectLeader"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="开发负责人">
													<el-input v-model="consoleForm.developmentLeader"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="测试负责人">
													<el-input v-model="consoleForm.testLeader"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="产品负责人">
													<el-input v-model="consoleForm.productManager"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="预计上线日期">
													<el-date-picker type="date" placeholder="选择日期" v-model="consoleForm.expectDate" style="width: 100%;"></el-date-picker>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="预计上线时间">
													<el-input v-model="consoleForm.expectTime"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="是否停交易">
													<el-select v-model="consoleForm.ifStop">
														<el-option v-for="(item, index) in ifUrgents" :label="item.key" :value="item.value">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="影响时间（分钟）">
													<el-input v-model="consoleForm.effectTime"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="24" :md="24">
												<el-form-item label="附件说明">
													<el-input type="textarea" v-model="consoleForm.illustrate"></el-input>
												</el-form-item>
											</el-col>
										</el-row>

									</el-form>

									<el-form label-width="60px" label-position="left" v-if="state.id==9">
										<el-row :gutter="20">
											<el-col :span="10" :sm="10">
												<el-form-item label="状态：">
													<span style="color: red">{{tabs.state_NAME}}</span>
												</el-form-item>
											</el-col>
											<el-col :span="6" :sm="6">
												<el-form-item label="发送人：" label-width="100px">
													{{tabs.user_NAME}}
												</el-form-item>
											</el-col>
											<el-col :span="24" :sm="24">
												<el-form-item label="附件说明：" label-width="100px">
													{{tabs.user_NAME}}
												</el-form-item>
											</el-col>
										</el-row>
									</el-form>

								</div>
							</el-tab-pane>
							<el-tab-pane label="全程跟踪" name="log">
								<div class="console-tab-content">
									<el-form label-width="60px" label-position="left">
										<el-row :gutter="20">
											<el-col :span="10" :sm="10">
												<el-form-item label="状态：">
													<span style="color: red">{{tabs.state_NAME}}</span>
												</el-form-item>
											</el-col>
											<el-col :span="6" :sm="6">
												<el-form-item label="发送人：" label-width="100px">
													{{tabs.user_NAME}}
												</el-form-item>
											</el-col>
											<el-col :span="24" :sm="24">
												<p v-for="(item,index) in tabs.genzong" class="genzong">
													{{index+1}}. <span>{{item.record_START | date}}</span>{{item.record_DESC}}
												</p>
											</el-col>
										</el-row>
									</el-form>
								</div>
							</el-tab-pane>

						</el-tabs>
					</div>
					<!--控制台部分-->
				</div>
			</div>
		</el-card>
		<!--立项-->
		<el-dialog title="上线确认" :visible="onlineSure.addvisible" width="60%" append-to-body modal-append-to-body :before-close="closeAddDialog">
			<el-form label-width="100px">
				<el-row :md="24" :gutter="20">
					<el-col :span="12">
						<el-form-item label="发布负责人">
							<el-input v-model="onlineSure.addform.fbfzr"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24" :md="24">
						<el-form-item label="上线结果" style="height: 42px">
							<el-row :span="24">
								<el-col :span="24" :md="24">
									<el-radio v-model="onlineSure.addform.sxjg" label="5">成功</el-radio>
									<el-radio v-model="onlineSure.addform.sxjg" label="6">失败</el-radio>
									<el-radio v-model="onlineSure.addform.sxjg" label="10">回滚</el-radio>
								</el-col>
							</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="12" v-if="onlineSure.addform.sxjg==10">
						<el-form-item label="回滚系统">
							<el-select v-model="onlineSure.addform.hgxt">
								<el-option v-for="(item, index) in onlineSystems" :label="item.key" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12" :md="12">
						<el-form-item label="操作日期">
							<el-date-picker type="date" placeholder="操作日期" v-model="onlineSure.addform.czrq" style="width: 100%;"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12" :md="12">
						<el-form-item label="操作时间">
							<el-input v-model="onlineSure.addform.czsj"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24" :md="24" v-if="onlineSure.addform.sxjg!=5">
						<el-form-item>
							<el-input type="textarea" v-model="onlineSure.addform.smk"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="agreeSure" size="middle">确 定</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				mainId: '',
				onlineForm: {
					onlineContent: [{
						"SYSTEM_ID": '',
						"GOLIVE_SYSTEM": '',
						"GOLIVE_MODULE": '',
						"GOLIVE_CONTENT": ''
					}]
				},
				onlineSystems: [],
				aboutSystems: [],
				ifUrgents: [{
					"key": '是',
					'value': '1'
				}, {
					"key": '否',
					'value': '0'
				}],
				onlineTypes: [],
				consoleForm: {
					onlineType: "",
					ifUrgent: "",
					projectLeader: '',
					developmentLeader: '',
					testLeader: '',
					productManager: '',
					expectDate: '',
					expectTime: '',
					ifStop: '',
					effectTime: '',
					illustrate: ''
				},
				golivetype: [],
				systemlist: [],
				systemv: [],
				onlineSure: {
					addvisible: false,
					addform: {
						"sxxqId": "", //上线需求id
						"fbfzr": "", //发布负责人
						"sxjg": "5", //上线结果
						"hgxt": "", //回滚版本
						"czrq": "", //操作日期
						"czsj": "", //操作时间
						"smk": "" //说明框
					}

				},
				table: {
					tableData: [],
					tableOriginData: [],
					tableHeight: "",
				},
				dateValue: "",
				keyword: "",
				screenKey: {
					"STATE": "",
					"DATE": "",
					"START_DATE": "",
					"END_DATE": ""
				},
				optionsUs: [{
					"key": "全部",
					"value": ""
				}],
				selectValueUs: "全部",
				optionsOn: [{
					"key": "全部",
					"value": ""
				}, {
					"key": "今日上线",
					"value": new Date()
				}],
				selectValueOn: "全部",
				dateComp: {},
				dateRange: '',
				tabs: {
					activeName: "info", //控制台的选中项
					consoleWrapperVisible: false, //控制台的显示
					consoleActionVisible: false, //控制台的操作显示/隐藏
					consoleActionData: [],
					activeTableInfo: "", //当前选中的信息表格
					data_one: {},
					state_NAME: "", //状态
					user_NAME: "", //负责人
					genzong: ""
				},
				consoleRight: {
					level: 1 //权限等级    1是质量管理部
				},
				state: {
					id: '',
					name: ''
				}
			}
		},
		mounted() {
			this.getSelectUs(); //第一个筛选框
			this.loadData();
			//			this.consoleAction();
		},
		methods: {
			consoleAction(id) {
				this.tabs.consoleActionData = []
				if(!id || id == 1) {
					this.tabs.consoleActionData.push({
						"name": '提交'
					})
				} else {
					this.tabs.consoleActionData.push({
						"name": '通过'
					})
					this.tabs.consoleActionData.push({
						"name": '驳回'
					})
				}

			}, //权限控制
			submitConsole() {
				let formArr = JSON.stringify(this.onlineForm.onlineContent);
				let params = new URLSearchParams();
				params.append("NEEL_ID", this.mainId); //id
				params.append("COLIVE_ID", this.consoleForm.onlineType); //上线类型
				params.append("PROJECT_LEADER", this.consoleForm.projectLeader); //项目负责人
				params.append("OPEN_LEADER", this.consoleForm.developmentLeader); //开发负责人
				params.append("TEST_LEADER", this.consoleForm.testLeader); //测试负责人
				params.append("PRODUCT_LEADER", this.consoleForm.productManager); //产品负责人
				params.append("DESIRED_START_DATETIMES", this.consoleForm.expectDate); //预计上线日期
				params.append("DESIRED_END_DATETIME", this.consoleForm.expectTime); //预计上线时间
				params.append("TRADE", this.consoleForm.ifStop); //是否停交易
				params.append("INFLUENCE_MM", this.consoleForm.effectTime); //影响时间
				params.append("bics", formArr); //点击加号
				params.append("ILLUSTRATE", this.consoleForm.illustrate); //附件说明
				if(this.consoleForm.ifUrgent) {
					params.append("URGENT", this.consoleForm.ifUrgent); //是否加急
				}
				this.$axios.post("/golive/addgoliveproject", params).then((res) => {
					let data = res.data;
					if(data.code == 200) {
						this.$success(data.message);
						this.tabs.consoleWrapperVisible = false;
						this.calculateTableHeight(false)
						this.clearAddData();
						this.loadData();
					} else {
						this.$warn(data.message);
					}
				});

			},
			//新增涉及系统
			systemEvent(index, e) {
				let className = e.target.className;
				if(className == "el-icon-plus") {
					this.onlineForm.onlineContent.push({
						"SYSTEM_ID": '',
						"GOLIVE_SYSTEM": '',
						"GOLIVE_MODULE": '',
						"GOLIVE_CONTENT": ''
					})
				} else {
					//当前是删除操作
					this.onlineForm.onlineContent.splice(index, 1)
				}
			},
			getSelectUs() {
				let params = new URLSearchParams();
				this.$axios.post("/golive/stategolive", params).then((res) => {
					let data = res.data.data;
					for(let i of data) {
						let arr = {
							"key": i.sTATE_GOLIVE_NAME,
							"value": i.iD
						};
						this.optionsUs.push(arr);
					}
				})
			},
			selectStatUs(value) {
				this.screenKey.STATE = value;
				this.loadData();
			},
			selectStatOn(value) {
				this.screenKey.DATE = value;
				this.loadData();
			},
			pickDate(value) {
				this.screenKey.START_DATE = value[0];
				this.screenKey.END_DATE = value[1];
				this.loadData();
			},
			loadData() {
				//          	this.$maskin();
				this.calculate();
				this.tabs.consoleWrapperVisible = false;
				this.clearAddData();
				let params = new URLSearchParams();
				if(this.screenKey) {
					params.append('STATE', this.screenKey.STATE);
					params.append('DATE', this.screenKey.DATE);
					params.append('START_DATE', this.screenKey.START_DATE);
					params.append('END_DATE', this.screenKey.END_DATE);
				}
				this.$axios.post("/golive/getgoliveprojectlist", params).then((res) => {
					let data = res.data.data
					this.setTableData(data);
				})
			},
			setTableData(data) {
				this.$set(this.table, "tableData", data);
				this.$set(this.table, "tableOriginData", data);
				this.$maskoff();
			},
			//通过
			agreeRow(val, arg, e) {
				e.cancelBubble = true;
				let params = new URLSearchParams();
				params.append('COLIVE_ID', val.cOLIVE_ID);
				params.append('GOLIVE_ID', val.gOLIVE_ID);
				this.$axios.post("/golive/upgoliveneel", params).then((res) => {
					let data = res.data;
					if(data.code == 200) {
						this.$success(data.message);
						this.loadData();
					} else {
						this.$warn(data.message);
					}
				})
			},
			unagreeRow(val, arg, e) {
				e.cancelBubble = true;
				let params = new URLSearchParams();
				params.append('COLIVE_ID', val.cOLIVE_ID);
				params.append('GOLIVE_ID', val.gOLIVE_ID);
				this.$axios.post("/golive/upgoliveState", params).then((res) => {
					let data = res.data;
					if(data.code == 200) {
						this.$success(data.message);
						this.loadData();
					} else {
						this.$warn(data.message);
					}
				})
			},
			ensureRow(val, arg, e) {
				e.cancelBubble = true;
				this.onlineSure.addvisible = true;
				this.onlineSure.addform.sxxqId = val.gOLIVE_ID;
				this.systeMv2(val);
			},
			//最终通过
			agreeSure() {
				let params = new URLSearchParams();
				params.append('GOLIVE_ID', this.onlineSure.addform.sxxqId);
				params.append('RELEASE_HEAD', this.onlineSure.addform.fbfzr);
				params.append('STATE', this.onlineSure.addform.sxjg);
				params.append('DESIRED_START_DATETIMES', this.onlineSure.addform.czrq);
				params.append('DESIRED_END_DATETIME', this.onlineSure.addform.czsj);
				params.append('CZSM', this.onlineSure.addform.smk);
				params.append('SYSTEM', this.onlineSure.addform.hgxt);
				this.$axios.post("/golive/goliveyse", params).then((res) => {
					let data = res.data;
					if(data.code == 200) {
						this.$success(data.message);
						this.loadData();
					} else {
						this.$warn(data.message);
					}
				})
			},
			//清除新增的表单
			clearAddData() {
				//				for(let i in this.addneeds.addform) {
				//					this.addneeds.addform[i] = "";
				//				}
			},
			//清空通过表单
			clearOnline() {
				for(let name in this.onlineSure.addform) {
					if(name == 'sxjg') {
						this.onlineSure.addform[name] = "5"
					} else {
						this.onlineSure.addform[name] = ""
					}
				}
			},
			//搜索关键字
			searchKeyword() {
				//              this.$maskin();
				if(this.keyword != "") {
					let arr = [];
					for(let i of this.table.tableOriginData) {
						if(JSON.stringify(i).indexOf(this.keyword) >= 0) {
							arr.push(i)
						}
					}
					this.$set(this.table, "tableData", arr)
				} else {
					this.$set(this.table, "tableData", this.table.tableOriginData)
				}
				this.$maskoff();
			},
			closeAddDialog() {
				this.clearOnline();
				this.onlineSure.addvisible = false;
			},
			//点击表格列表展示控制台
			handleCurrentChange(val) {
				//              this.$maskin();
				this.tabs.activeTableInfo = val;
				this.state.id = val.sTATE;
				this.state.name = val.sTATE_NAME;
				this.consoleAction(val.sTATE)
				if(!this.tabs.consoleWrapperVisible) {
					this.tabs.consoleWrapperVisible = true;
					setTimeout(() => {
						this.calculate()
					}, 0);
				}
				if(val.nELL) {
					let params = new URLSearchParams();
					this.mainId = val.nELL;
					params.append("NEEL_ID", val.nELL);
					params.append("GOLIVE_ID", val.gOLIVE_ID);
					this.$axios.post("/golive/goliveneel", params).then((res) => {
						let data = res.data.data;
						this.tabs.data_one = data;
						this.$set(this.tabs, "data_one", data);
						this.$maskoff();
					})
				}
				this.goliveType()
				this.systemList()

			},
			goliveType() {
				let params = new URLSearchParams()
				this.$axios.post("/golive/golivetype", params).then((res) => {
					let data = res.data.data;
					for(let i of data) {
						this.onlineTypes.push({
							"key": i.cOLIVE_TYPE_NAME,
							"value": i.cOLIVE_TYPE_ID
						})
					}
				})
			},
			systemList() {
				let params = new URLSearchParams()
				this.$axios.post("/golive/systemlist", params).then((res) => {
					let data = res.data.data;
					for(let i of data) {
						this.aboutSystems.push({
							"key": i.sYSTEM_NAME,
							"value": i.sYSTEM_ID
						})
					}
				})
			},
			systeMv(index, value) {
				let params = new URLSearchParams()
				params.append('NEEL', this.mainId)
				params.append('SYSTEM_ID', value)
				this.onlineForm.onlineContent[index].GOLIVE_SYSTEM = ''
				this.onlineSystems = []
				this.$axios.post("/golive/systemv", params).then((res) => {
					let data = res.data.data;
					for(let i of data) {
						this.onlineSystems.push({
							"key": i.sYSTEM,
							"value": i.sYSTEM
						})
					}
				})
			},
			systeMv2(value) {
				this.onlineSure.addform.hgxt = "";
				let params = new URLSearchParams()
				params.append('NEEL', value.nELL)
				params.append('SYSTEM_ID', value.sYSTEM_ID)
				this.$axios.post("/golive/systemv", params).then((res) => {
					let data = res.data.data;
					for(let i of data) {
						this.onlineSystems.push({
							"key": i.sYSTEM,
							"value": i.sYSTEM
						})
					}
				})
			},
			//操作台的事件
			consoleActionEvent(val) {
				this.tabs.consoleActionVisible = false;
				switch(val.name) {
					case "提交":
						this.submitConsole();
						break;
					case "驳回":
						this.rejected();
						break;
					case "通过":
						this.consoleAgree();
						break;
				}
			},

			rejected() {
				let info = this.tabs.activeTableInfo;
				if(info.state_ID != 303 && info.state_ID != 305) {
					this.$warn("当期状态无法进行驳回操作！");
					return;
				}
				this.prompt("确定进行驳回操作？", "请填写驳回理由", (val) => {
					if(val.value == "") {
						this.$warn("请填写驳回理由");
						return;
					}
					let params = new URLSearchParams();
					params.append("BASE_ID", info.base_NEET_ID);
					params.append("RESON", val.value);
					params.append("OLD_STATE", info.state_ID);
					this.$axios.post("/base/baseReject", params).then((res) => {
						let data = res.data;
						if(data.code == 200) {
							this.$success("操作成功！");
							this.loadData();
						}
					})
				})
			},
			calculate() {
				let height = document.querySelector(".mainr").offsetHeight;
				//                let card_header_height = document.querySelector(".el-card__header").offsetHeight;
				let card_body = document.querySelector(".box-card .el-card__body");
				card_body.style.height = height - 36 + "px";
				//表格高度
				this.calculateTableHeight(this.tabs.consoleWrapperVisible);
				//tab高度
				if(this.tabs.consoleWrapperVisible) {
					this.calculateTabsHeight();
				}
				//控制台的内容区域高度
			},
			calculateTableHeight(type) {
				let height = document.querySelector(".mainr").offsetHeight;
				let actionHeight = document.querySelector(".content .action").offsetHeight;
				//true代表没有控制台
				if(!type) {
					//----------------------------------------------body的上下padding--table的margin-top
					this.table.tableHeight = height - 36 - actionHeight - 20 - 20;
				} else {
					this.table.tableHeight = height * 0.3;
				}
			},
			calculateTabsHeight() {
				let card_body = document.querySelector(".box-card .el-card__body");
				let actionHeight = document.querySelector(".content .action").offsetHeight;
				let allTabContent = document.querySelectorAll(".console-tab-content");
				for(let i of allTabContent) {
					//---------------el-card__body的可用内容高---------顶部操作栏的高---------表格部分的高------tab的头和margin的高----------操作台border
					i.style.height = (parseInt(card_body.style.height) - 20) - actionHeight - (this.table.tableHeight + 20) - (20 + 40) - 2 + "px";
				}
			},
			setConsoleVisible() {
				this.tabs.consoleWrapperVisible = false;
				this.calculateTableHeight(false)
			}
		}
	}
</script>