<style scoped>
	@import "../../static/css/table.css";
	@import "../../static/css/console.css";
	/*头部*/
	
	.report-header .name {
		font-weight: bold;
		font-size: 20px;
	}
	
	.report-header .el-select {
		float: right;
	}
	
	.report-header .group {
		color: #9f9f9f;
		margin: 5px 0;
		font-size: 15px;
	}
	/*统计部分*/
	
	.report-left {
		width: 300px;
		margin-top: 10px;
	}
	
	.report-statistics h5 {
		font-size: 16px;
		font-weight: 400;
		margin: 5px 0;
	}
	
	.report-statistics .iconfont {
		color: #5fccac;
		font-size: 20px;
		margin-right: 5px;
	}
	
	.statistics-content {
		padding-left: 24px;
	}
	
	.statistics-content p {
		float: left;
		width: 50%;
		line-height: 24px;
	}
	
	.statistics-content p .key {
		color: #626262;
	}
	
	.statistics-content p .value {
		color: #dd544e;
	}
	
	.el-textarea textarea {
		min-height: 80px!important;
	}
	
	.el-form-item__label {
		width: 120px !important;
	}
	
	.el-form-item {
		margin-bottom: 0;
	}
	
	h5 {
		padding-top: 20px;
	}
	
	.search {
		float: right;
	}
</style>

<template>
	<div class="workreport common-card-wrap" style="height: 100%;">
		<el-card class="box-card" >
			<div slot="header" class="clearfix">
				<span class="card-title">人员统计</span>
			</div>
			<div class="action clear" style="margin-bottom: 30px;">
				<el-select v-model="select_value" clearable size="mini" @change="loadChange">
					<el-option v-for="(item, index) in select" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-select v-model="selectArr_value"  v-if="select_value=='personal'" clearable size="mini" @change="loadChange">
					<el-option v-for="(item, index) in selectArr" :label="item.dept_name" :value="item.dept_id">
					</el-option>
				</el-select>
				<div class="fr" style="margin-left: 20px;">
					<div class="search i-b">
						<el-button size="mini" type="primary" @click="getPdf('问题统计')">生成报告
						</el-button>
					</div>
				</div>
				<div class="i-b" style="float: right;">
					<el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="loadChange" v-model="dateRange" type="daterange" :picker-options="pickerOptions2" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini" align="right">
					</el-date-picker>
				</div>
			</div>
			<div class="text item workreport-wrapper" id="pdfDom">
				<div class="report-statistics clear">
					<el-form label-width="100px" label-position="right">
						<el-row :gutter="20">
							<el-col :span="24">
								<div id="pro-bar" style="width:100%;height: 400px;padding-bottom: 20px;"></div>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="24">
								<div id="work-bar" style="width:100%;height: 400px;padding-bottom: 20px;"></div>
							</el-col>
						</el-row>
						<el-row :gutter="20" v-if="ifshowPerson">
							<el-col :span="24">
								<div id="per-bar" style="width:100%;height: 400px;padding-bottom: 20px;"></div>
							</el-col>
						</el-row>
					</el-form>

					<div class="report-list" style="margin-top: 10px;">
						<el-form label-width="100px" label-position="right">
							<el-row :gutter="20">
								<el-col :span="12">
									<h5><i class="iconfont icon-iconfontzhizuobiaozhun0261 i-b"></i><span class="i-b">当前开发项目</span></h5>
								</el-col>
								<!--<el-col :span="12">
									<el-form-item label="" class="search i-b" style="margin-top: 20px;">
										<el-input placeholder="请输入检索关键字" suffix-icon="icon-sousuo iconfont" v-model="keyWord" size="mini" clearable>
										</el-input>
									</el-form-item>
								</el-col>-->
							</el-row>
						</el-form>
						<div class="table-list">
							<el-table :data="showData" style="width: 100%">
								<el-table-column label="需求编号" width="200">
									<template slot-scope="scope">
										<span @click="goneeds($event,scope.row)" class="tab-opt" >{{scope.row.st_NEELID}}</span>
									</template>
								</el-table-column>
								<el-table-column prop="st_NEELNAME" label="需求名称" show-overflow-tooltip></el-table-column>
								<el-table-column prop="st_STARTDATE" label="提交日期" width="110"></el-table-column>
								<el-table-column prop="st_ENDDATE" label="期望上线日期" width="110"></el-table-column>
								<el-table-column prop="st_NEELSOURCE" label="需求来源" show-overflow-tooltip></el-table-column>
								<!--<el-table-column prop="st_DESIGNSYSTEM" label="涉及系统" show-overflow-tooltip></el-table-column>-->
								<el-table-column prop="st_RRIORITY" label="优先级" width="70"></el-table-column>
								<el-table-column prop="st_STATE" label="状态"></el-table-column>
								<!--<el-table-column prop="st_WORKHOURS" label="更新时间"></el-table-column>-->
								<!--<el-table-column prop="st_SCHEDULE" label="操作">
									<template slot-scope="scope" class="action-wrap">
									<el-button  @click="goDetail(scope.row,$event)" size="small" type="primary">查看
									</el-button>
								    </template>
								</el-table-column>-->
							</el-table>
						</div>
					</div>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				select_value: "personal",
				select: [{
					label: "全部开发组",
					value: "group"
				}, {
					label: "人员统计",
					value: "personal"
				}],
				selectArr: [{
					dept_name:"全体",
					dept_id:"personal"
				}], //部门
				selectArr_value: "",
				date_value: "orther",
				date: [{
					label: "日报",
					value: "day"
				}, {
					label: "周报",
					value: "week"
				}, {
					label: "月报",
					value: "month"
				}, {
					label: "年报",
					value: "year"
				}],
				showData: "",
				dateComp: {},
				dateRange: [], //时间区间
				pickerOptions2: {
					shortcuts: [{
						text: '日报',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '周报',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * start.getDay());
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '月报',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setDate(1);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '年报',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setDate(1);
							start.setMonth(0);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				workHoursArr: [],
				ifshowPerson:false,
				keyWord: ''
			}
		},
		mounted() {
			this.loadChartsData()
			this.loadHours()
			this.loadData()
			//load 部门
			this.loadDept()
		},
		methods: {
			loadDept(){
				
				let params = new URLSearchParams();
//				params.append("TYPE", this.date_value);
//				params.append("selectType", this.select_value);
				this.$axios.post("/statistical/getdeptsList", params).then((res) => {
					let data = res.data;
					if(data.code == 200) {
						for (let i of data.result){
							this.selectArr.push(i)
						}
					} else {
						this.$warn(data.message);
					}
				})
			},
			loadData() {
				this.$maskin();
				let params = new URLSearchParams();
				if(this.dateRange.length == 0) {
					params.append("startDate", "");
					params.append("endDate", "");
					this.date_value = "day"
				} else {
					params.append("startDate", this.dateRange[0]);
					params.append("endDate", this.dateRange[1]);
					this.date_value = "orther"
				}
				params.append("TYPE", this.date_value);
				params.append("selectType", this.select_value);
				this.$axios.post("/statistical/getPersonlStatisticalLists", params).then((res) => {
					let data = res.data;
					if(data.code == 200) {
						this.$set(this, "showData", res.data.result);
					} else {
						this.$warn(data.message);
					}
					 
				})
			},
			loadChartsData() {
				this.$maskin();
				let params = new URLSearchParams();
				if(this.dateRange.length == 0) {
					params.append("startDate", "");
					params.append("endDate", "");
					this.date_value = "day"
				} else {
					params.append("startDate", this.dateRange[0]);
					params.append("endDate", this.dateRange[1]);
					this.date_value = "orther"
				}
				params.append("TYPE", this.date_value);
				params.append("selectType", this.select_value);
				
				if(this.select_value=="personal" && this.selectArr_value){
					params.append("deptId", this.selectArr_value);
				}
				this.$axios.post("/statistical/getStatisticalProjectByUser", params).then((res) => {
					let data = res.data;
					if(data.code == 200) {
						let legendArr = []
						let datas = []
						let ids = []
						if(this.select_value == "personal") {
							for(let i of res.data.result.result) {
								legendArr.push(i.userName)
								datas.push(i.count)
								ids.push(i.userId)
							}
						} else {
							for(let i of res.data.result.result) {
								legendArr.push(i.deptName)
								datas.push(i.count)
							}
						}
						this.loadChart(legendArr, datas, ids)
					} else {
						this.$warn(data.message);
					}

				})
			},
			loadHours() {
				this.$maskin();
				let params = new URLSearchParams();
				if(this.dateRange.length == 0) {
					params.append("startDate", "");
					params.append("endDate", "");
					this.date_value = "day"
				} else {
					params.append("startDate", this.dateRange[0]);
					params.append("endDate", this.dateRange[1]);
					this.date_value = "orther"
				}
				params.append("TYPE", this.date_value);
				params.append("selectType", this.select_value);
				if(this.select_value=="personal" && this.selectArr_value){
					params.append("deptId", this.selectArr_value);
				}
				this.$axios.post("/statistical/getStatisticalWorkHours", params).then((res) => {
					let data = res.data;
					if(data.code == 200) {
						let legendArr = []
						let datas = []
						if(this.select_value == "personal") {
							for(let i of res.data.result.result) {
								legendArr.push(i.userName)
								datas.push(i.count)
							}
						} else {
							for(let i of res.data.result.result) {
								legendArr.push(i.deptName)
								datas.push(i.count)
							}
						}
						this.loadWorkhours(legendArr, datas)
					} else {
						this.$warn(data.message);
					}

				})
			},
			loadChange() {
				this.loadChartsData()
				this.loadHours()
				this.loadData()
				this.ifshowPerson=false
			},
			goDetail(val, e) {
				e.cancelBubble = true;
				//TODO
			},
			loadWorkhours(legendArr, datas) {
				var echarts = require('echarts');
				let height = document.querySelector(".mainr").offsetHeight;
				let card_header_height = document.querySelector(".el-card__header").offsetHeight;
				let card_body = document.querySelector(".box-card .el-card__body");
				card_body.style.height = height - card_header_height - 36 + "px";
				var proBar = echarts.init(document.getElementById("work-bar")); //人员统计表格
				proBar.clear()
				let option = {
					title: {
						text: '工时统计',
						x: 'center'
					},
					color: ['#3398DB'],
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						data: legendArr,
						axisLabel: {
							rotate: -45,
						},
						axisTick: {
							alignWithLabel: true
						}
					}],
					yAxis: [{
						type: 'value'
					}],
					series: [{
						name: '工时统计',
						type: 'bar',
						barWidth: '60%',
						data: datas
					}]
				};
				proBar.setOption(option);
				 

			},
			loadChart(legendArr, datas, ids) {
				var echarts = require('echarts');
				let height = document.querySelector(".mainr").offsetHeight;
				let card_header_height = document.querySelector(".el-card__header").offsetHeight;
				let card_body = document.querySelector(".box-card .el-card__body");
				card_body.style.height = height - card_header_height - 36 + "px";
				var proBar = echarts.init(document.getElementById("pro-bar")); //人员统计表格
				proBar.clear()
				let text="人员统计"
				if(this.select_value=="personal"){
                    text="任务统计"
				}
				let option = {
					title: {
						text: text,
						x: 'center'
					},
					color: ['#3398DB'],
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						data: legendArr,
						axisLabel: {
							rotate: -45,
						},
						axisTick: {
							alignWithLabel: true
						}
					}],
					yAxis: [{
						type: 'value'
					}],
					series: [{
						name: text,
						type: 'bar',
						barWidth: '60%',
						data: datas
					}]
				};
				proBar.setOption(option);
				this.$maskoff();
				var self = this
				proBar.on('click', function(params) {
					let index = params.dataIndex
					self.getPerson(index, ids)
				});
			},
			getPerson(val, ids) {
				if(ids.length > 0) {
					let id = ids[val]
//					this.$maskin();
                    this.ifshowPerson=true
					let params = new URLSearchParams();
					params.append("selectType", "single");
					params.append("selectId", id);
					this.$axios.post("/statistical/getPersonlStatisticalDates", params).then((res) => {
						let data = res.data;
						if(data.code == 200) {
							let yaxis = []
							let start = []
							let end = []
							for(let i of data.result) {
								if(i.endTime && i.startTime) {
									yaxis.push(i.neelName)
									start.push(i.startTime)
									end.push(i.endTime)
								}
							}
							
							this.loadTimeChart(yaxis, start, end)
						} else {
							this.$warn(data.message);
						}
						 
					})
				}

			},
			loadTimeChart(yaxis, start, end) {
				
				var echarts = require('echarts');
				let height = document.querySelector(".mainr").offsetHeight;
				let card_header_height = document.querySelector(".el-card__header").offsetHeight;
				let card_body = document.querySelector(".box-card .el-card__body");
				card_body.style.height = height - card_header_height - 36 + "px";
				var proBar = echarts.init(document.getElementById("per-bar")); //人员统计表格
				proBar.clear()
				let option = {}
				option = {
					title: {
						text: '个人工作安排'
					},
					legend: {
						data: ['过期时间']
					},
					xAxis: {
						type: 'time'
					},
					yAxis: {
						data: yaxis
					},
					tooltip: {
						trigger: 'axis',
						formatter: function(params) {
							var res = params[0].name + "</br>"
							var date0 = params[0].data;
							var date1 = params[1].data;
							console.log(params[0])
							date0 = date0.getFullYear() + "-" + (date0.getMonth() + 1) + "-" + date0.getDate();
							date1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();
							res += params[0].seriesName + ":" + date0 + "</br>"
							res += params[1].seriesName + ":" + date1 + "</br>"
							return res;
						}
					},
					series: [

						{
							name: '开始时间',
							type: 'bar',
							stack: '总量',
							itemStyle: {
								normal: {
									color: 'rgba(0,0,0,0)'
								}
							},
							data: start
						}, {
							name: '结束时间',
							type: 'bar',
							stack: '总量',
							itemStyle: {
								normal: {
									color: '#52b4f7',
									barBorderRadius: 20,
									shadowColor: 'rgba(0, 0, 0, 0.3)',
									shadowBlur: 20
								}
							},
							data: end
						}
					]
				};
				proBar.setOption(option);
				 this.$maskoff();
			},//跳转到需求页面
			goneeds(e, val) {
				e.cancelBubble = true;
				let path = "";
				if(val.st_RETURNTYPE == "TECH") {
					path = "技术需求"
				}
				if(val.st_RETURNTYPE == "WORK") {
					path = "业务需求"
				}
				if(val.st_RETURNTYPE == "BASE") {
					path = "基础建设"
				}
				if(val.st_RETURNTYPE == "DALIY") {
					path = "日常任务"
				}
				
				this.$go("", "", {
					"neelId": val.st_NEELID
				}, path);
			}

		}
	}
</script>