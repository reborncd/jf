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
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span class="card-title">项目统计</span>
			</div>
			<div class="action clear" style="margin-bottom: 30px;">
				<el-select v-model="select_value" clearable size="mini" @change="loadChange">
					<el-option v-for="(item, index) in select" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<!--<div class="fr">
					<div style="margin-right: 10px;" class="i-b">
						<el-date-picker v-model="dateRange" @change="pickDate(dateRange)" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right" size="mini" :picker-options="dateComp">
						</el-date-picker>
					</div>
					<div class="search i-b">
						<el-button size="mini" type="primary">生成报告
						</el-button>
					</div>
				</div>-->
			</div>
			<div class="text item workreport-wrapper">
				<div class="report-statistics clear">
					<el-form label-width="100px" label-position="right">
						<el-row :gutter="20">
							<el-col :span="24">
								<div id="pro-bar" style="width:100%;height: 400px;padding-bottom: 20px;"></div>
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
							<el-table ref="multipleTable" :data="showData" @selection-change="handleSelectionChange" style="width: 100%">
								<el-table-column label="全部"  type="selection" width="55"></el-table-column>
								<el-table-column prop="st_NEELID" label="需求编号"></el-table-column>
								<el-table-column prop="st_STARTDATE" label="提交日期"></el-table-column>
								<el-table-column prop="st_ENDDATE" label="期望日期"></el-table-column>
								<el-table-column prop="st_NEELNAME" label="需求名称"></el-table-column>
								<el-table-column prop="st_NEELSOURCE" label="需求来源"></el-table-column>
								<el-table-column prop="st_DESIGNSYSTEM" label="涉及系统"></el-table-column>
								<el-table-column prop="st_RRIORITY" label="优先级"></el-table-column>
								<el-table-column prop="st_PLANHOURS" label="计划工时"></el-table-column>
								<el-table-column prop="st_WORKHOURS" label="投入工时"></el-table-column>
								<el-table-column prop="st_SCHEDULE" label="进度">
									<template slot-scope="scope" class="action-wrap">
									<el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.st_SCHEDULE | percent"></el-progress>
								    </template>
								</el-table-column>
							</el-table>
						</div>
						<el-row :gutter="20">
							<el-col :span="12" style="border: 1px solid #ebeef5;margin-top: 30px;">
								<div id="workhours" style="width:100%;height: 400px;"></div>
							</el-col>
							<el-col :span="12" style="border: 1px solid #ebeef5;margin-top: 30px;border-left: 0;">
								<div id="planhours" style="width:100%;height: 400px;"></div>
							</el-col>
						</el-row>
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
				select_value: "week",
				select: [{
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
				dateRange: '',
				workHoursArr: [],
				keyWord: ''
			}
		},
		filters: {
			percent: function(val) {
				if(val.indexOf('%')>0){
					val=val.split('%')[0]
					if(parseInt(val)>=100){
						val=100
					}
				}
				return val;
			}
		},
		mounted() {
			this.loadChartsData()
			this.loadData()
			//			this.loadChart()
		},
		methods: {
			loadChartsData() {
				this.$maskin();
				let params = new URLSearchParams();
				params.append("TYPE", this.select_value);
				this.$axios.post("/statistical/getChartsData", params).then((res) => {
					let data = res.data;
					if(data.code == 200) {
						let arr = []
						for(let i of data.result.resultList) {
							switch(i.stack) {
								case "新增":
									if(i.name == "A") {
										i.label = {
											normal: {
												show: true,
												position: "bottom",
												rotate: 45,
												textStyle: {
													color: '#000'
												},
												formatter: '新增',
											}
										}
									}
									break;
								case "完成":
									if(i.name == "A") {
										i.label = {
											normal: {
												show: true,
												position: "bottom",
												rotate: 45,
												textStyle: {
													color: '#000'
												},
												formatter: '完成',
											}
										}
									}
									break;
								case "留存":
									if(i.name == "A") {
										i.label = {
											normal: {
												show: true,
												position: "bottom",
												rotate: 45,
												textStyle: {
													color: '#000'
												},
												formatter: '留存',
											}
										}
									}
									break;
								case "执行":
									if(i.name == "A") {
										i.label = {
											normal: {
												show: true,
												position: "bottom",
												rotate: 45,
												textStyle: {
													color: '#000'
												},
												formatter: '执行',
											}
										}
									}
									break;
								default:
									break;
							}

						}
						this.loadChart(data.result.rriorityNames, data.result.dateX, data.result.resultList)

					} else {
						this.$warn(data.message);
					}
				})
			},
			loadData() {
				this.$maskin();
				let params = new URLSearchParams();
				params.append("TYPE", this.select_value);
				this.$axios.post("/statistical/getStatisticalProjectAll", params).then((res) => {
					let data = res.data;
					if(data.code == 200) {
						this.$set(this, "showData", res.data.result);
					} else {
						this.$warn(data.message);
					}

				})
			},
			loadChange() {
				this.loadChartsData()
				this.loadData()
			},
			handleSelectionChange(val) {
				let arr = [] //工时投入数组
				let name = [] //工时标题
				let planArr = [] //计划工时（暂时）
				let plan = []
				
				for(let i of val) {
					arr.push({
						value: parseInt(i.st_WORKHOURS),
						name: i.st_NEELNAME
					})
					name.push(i.st_NEELNAME)
					
				}
				this.loadWorkhours(arr,name)
			},
			loadPlanhours() {
				//右下角的图标
			},
			loadWorkhours(arr, name) {
				var echarts = require('echarts');
				var workHours = echarts.init(document.getElementById("workhours")); //工时投入
				let option = {}
                workHours.clear()
				option = {
					title: {
						text: '工时投入统计',
						x: 'right'
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						x: 'left',
						data: name
					},
					series: [{
						name: '工时投入',
						type: 'pie',
						radius: ['50%', '70%'],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: false,
								position: 'center'
							},
							emphasis: {
								show: true,
								textStyle: {
									fontSize: '30',
									fontWeight: 'bold'
								}
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						data: arr
					}]
				};
				workHours.setOption(option);
				this.$maskoff();

			},
			loadChart(legendArr, xArr, datas) {
				var echarts = require('echarts');
				let height = document.querySelector(".mainr").offsetHeight;
				let card_header_height = document.querySelector(".el-card__header").offsetHeight;
				let card_body = document.querySelector(".box-card .el-card__body");
				card_body.style.height = height - card_header_height - 36 + "px";
				var proBar = echarts.init(document.getElementById("pro-bar")); //项目统计表格
				proBar.clear()
				let option = {
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					legend: {
						data: legendArr
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						axisLabel: {
							margin: 35,
							textStyle: {
								fontWeight: "bolder",
								color: "#000000"
							}
						},
						data: xArr
					}],
					yAxis: [{
						type: 'value'
					}],
					series: datas
				};

				proBar.setOption(option);
				this.$maskoff();
				
			}

		}
	}
</script>