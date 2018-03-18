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
				<span class="card-title">积分统计</span>
			</div>
			<div class="action clear" style="margin-bottom: 30px;">
				<div class="fr">
					<!--<div style="margin-right: 10px;" class="i-b">
						<el-date-picker v-model="dateRange" @change="pickDate(dateRange)" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right" size="mini" :picker-options="dateComp">
						</el-date-picker>
					</div>
					<div class="search i-b">
						<el-button size="mini" type="primary">生成报告
						</el-button>
					</div>-->
				</div>
			</div>
			<div class="text item workreport-wrapper">
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
								<el-table-column prop="deptName" label="组别"></el-table-column>
								<el-table-column prop="userName" label="人员"></el-table-column>
								<el-table-column prop="upType" label="统计方式"></el-table-column>
								<el-table-column prop="startDate" label="开始日期"></el-table-column>
								<el-table-column prop="endDate" label="截止日期"></el-table-column>
								<el-table-column prop="efficiency" label="工作饱和度"></el-table-column>
								<el-table-column prop="saturation" label="工作效率"></el-table-column>
								<el-table-column prop="promptness" label="任务完成及时率"></el-table-column>
								<!--<el-table-column prop="st_WORKHOURS" label="积分"></el-table-column>-->
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
				showData: [],
				dateComp: {},
				dateRange: '',
				workHoursArr: [],
				keyWord: ''
			}
		},
		mounted() {
			this.loadCharData()
		},
		methods: {
			loadCharData() {
//				this.$maskin();
				let params = new URLSearchParams();
				params.append("TYPE", this.select_value);
				this.$axios.post("/statistical/getIntegralStatisticalData", params).then((res) => {
					let data = res.data;
					if(data.code == 200) {
						let xaxis = []
						let efficiency = []
						let promptness = []
						let saturation = []
						for(let i of data.result.result2) {
							xaxis.push(i.userName)
							efficiency.push(i.efficiency * 100)
							promptness.push(i.percentage * 100)
							saturation.push(i.saturation * 100)
						}
						this.loadsystemChart(xaxis, efficiency, promptness, saturation)
						this.$set(this, "showData", data.result.result1);
					} else {
						this.$warn(data.message);
					}
					this.$maskoff();

				})
			},
			loadsystemChart(xaxis, efficiency, promptness, saturation) {
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
						data: ['饱和度', '效率', '及时率']
					},
					xAxis: [{
						type: 'category',
						axisTick: {
							alignWithLabel: true
						},
						data: xaxis
					}],

					yAxis: [
					{
						type: 'value',
						name: '百分比',
						min: 0,
						position: 'left',
						axisLabel: {
							formatter: '{value}%'
						}
					}
//					,{
//						type: 'value',
//						name: '百分比',
//						min: 0,
//						position: 'right',
//						axisLabel: {
//							formatter: '{value}%'
//						}
//					}
				],
					series: [{
						name: '饱和度',
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
						data: efficiency
					}, {
						name: '效率',
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
						data: promptness
					}, {
						name: '及时率',
						type: 'bar',
						yAxisIndex: 0,
						label: {
							normal: {
								show: true,
								position: 'top'
							}
						},
						data: saturation
					}
//					, {
//						name: '期内正常运转率',
//						type: 'line',
//						yAxisIndex: 0,
//						label: {
//							normal: {
//								show: true,
//								position: 'top'
//							}
//						},
//						data: normal
//					}
					]
				};

				proBar.setOption(option);
			}

		}
	}
</script>