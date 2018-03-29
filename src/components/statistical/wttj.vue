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
				<span class="card-title">问题统计</span>
			</div>
			<div class="action clear" style="margin-bottom: 30px;">
				<div class="fr" style="margin-left: 20px;">
					<div class="search i-b">
						<el-button size="mini" type="primary" @click="getPdf('问题统计')">生成报告
						</el-button>
					</div>
				</div>
				<div class="i-b" style="float: right;">
					<el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="loadCharData" v-model="dateRange" type="daterange" :picker-options="pickerOptions2" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini" align="right">
					</el-date-picker>
				</div>
			</div>
			<div class="text item workreport-wrapper" id="pdfDom">
				<div class="report-statistics clear">
					<el-form label-width="100px" label-position="right">
						<el-row :gutter="20">
							<el-col :span="24" style="border: 1px solid #ebeef5;">
								<div id="system" style="width:100%;height: 400px;margin: 20px 0;"></div>
							</el-col>
						</el-row>
					</el-form>
					<div class="report-list" style="margin-top: 10px;">
						<el-form label-width="100px" label-position="right">
							<el-row :gutter="20">
								<el-col :span="12">
									<h5><i class="iconfont icon-iconfontzhizuobiaozhun0261 i-b"></i><span class="i-b">问题列表</span></h5>
								</el-col>
							</el-row>
						</el-form>
						<div class="table-list">
							<el-table :data="showData" style="width: 100%">
								<el-table-column prop="systemName" label="系统名称" show-overflow-tooltip></el-table-column>
								<el-table-column prop="bug" label="BUG"></el-table-column>
								<el-table-column prop="fault" label="故障"></el-table-column>
								<el-table-column prop="A1" label="程序"></el-table-column>
								<el-table-column prop="A2" label="硬件"></el-table-column>
								<el-table-column prop="A3" label="网络"></el-table-column>
								<el-table-column prop="A4" label="人为"></el-table-column>
								<el-table-column prop="percentage" label="期内正常运转率" width="150"></el-table-column>
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
				select_value: "orther",
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
				showData: [],
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
				keyWord: ''
			}
		},
		mounted() {
			this.loadCharData()
		},
		methods: {
			loadCharData() {
				this.$maskin();
				let params = new URLSearchParams();
				if(this.dateRange.length == 0) {
					params.append("startDate", "");
					params.append("endDate", "");
					
				} else {
					params.append("startDate", this.dateRange[0]);
					params.append("endDate", this.dateRange[1]);
					
				}
				this.$axios.post("/statistical/getProblemStatisticalData", params).then((res) => {
					let data = res.data;
					if(data.code == 200) {
						let xaxis = []
						let normal = []
						let bug = []
						let fault = []
						for(let i of data.result.resultLists1) {
							xaxis.push(i.systemName)
							normal.push(i.percentage * 100)
							bug.push(i.bug)
							fault.push(i.fault)
						}
						this.loadsystemChart(xaxis, normal, bug, fault)
						//数据啊
						for(let j of data.result.resultLists2){
							this.showData.push(j)
						}
					} else {
						this.$warn(data.message);
					}
					

				})
			},
			loadsystemChart(xaxis, normal, bug, fault) {
				var echarts = require('echarts');
				let height = document.querySelector(".mainr").offsetHeight;
				let card_header_height = document.querySelector(".el-card__header").offsetHeight;
				let card_body = document.querySelector(".box-card .el-card__body");
				card_body.style.height = height - card_header_height - 36 + "px";
				var proBar = echarts.init(document.getElementById("system")); //项目统计表格
				let option = {}
				option = {
					title: {
						text: "系统统计",
						left: 'center'
					},
					tooltip: {
						trigger: 'axis',
						formatter: function(params, ticket, callback) {

							var res = params[0].name;

							for(var i = 0, l = params.length; i < l; i++) {
								if(params[i].seriesType === 'line') {
									res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + 'h';
								} else {
									res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + '个';
								}
							}
							return res;

						}
					},
					grid: {
						containLabel: true
					},
					legend: {
						bottom: 20,
						x: 'center',
						data: ['bug次数', '故障次数', '期内正常运转率']
					},
					xAxis: [{
						type: 'category',
						axisLabel: {
							rotate: -45,
						},
						axisTick: {
							alignWithLabel: true
						},
						data: xaxis
					}],

					yAxis: [{
						type: 'value',
						name: '个数',
						min: 0,
						position: 'left',
						axisLabel: {
							formatter: '{value}'
						}
					}, {
						type: 'value',
						name: '百分比',
						min: 0,
						position: 'right',
						axisLabel: {
							formatter: '{value}%'
						}
					}],
					series: [{
						name: 'bug次数',
						type: 'bar',
						yAxisIndex: 0,
						label: {
							normal: {
								show: true,
								position: 'top',
							}
						},
						lineStyle: {
							normal: {
								width: 3,
								shadowColor: 'rgba(0,0,0,0.4)',
								shadowBlur: 10,
								shadowOffsetY: 10
							}
						},
						data: bug
					}, {
						name: '故障次数',
						type: 'bar',
						yAxisIndex: 0,
						label: {
							normal: {
								show: true,
								position: 'top'
							}
						},
						data: fault
					}, {
						name: '期内正常运转率',
						type: 'line',
						yAxisIndex: 1,
						label: {
							normal: {
								show: true,
								position: 'top'
							}
						},
						data: normal
					}]
				};

				proBar.setOption(option);
				this.$maskoff();
			}

		}
	}
</script>