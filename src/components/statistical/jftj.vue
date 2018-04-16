<template>
	<div class="workreport common-card-wrap" style="height: 100%;">
		<el-card class="box-card" >
			<div slot="header" class="clearfix">
				<span class="card-title">积分统计</span>
			</div>
			<div class="action clear" style="margin-bottom: 30px;">
				<el-select v-model="selectArr_value"  placeholder="请选择部门" clearable size="mini" @change="loadCharData" filterable>
					<el-option v-for="item in selectArr" :label="item.dept_name" :value="item.dept_id" :key="item.dept_id">
					</el-option>
				</el-select>
        <el-select v-model="select_value"  placeholder="请选择统计方式" clearable size="mini" @change="loadCharData" filterable>
          <el-option v-for="item in select" :label="item.label" :value="item.value" :key="item.value">
          </el-option>
        </el-select>
				<div class="fr" style="margin-left: 20px;">
					<div class="search i-b">
						<el-button size="mini" type="primary" @click="getPdf('积分统计')">生成报告
						</el-button>
					</div>
				</div>
				<!--<div class="i-b" style="float: right;">-->
					<!--<el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="loadCharData" v-model="dateRange" type="daterange" :picker-options="pickerOptions2" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini" align="right">-->
					<!--</el-date-picker>-->
				<!--</div>-->
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
									<h5><i class="iconfont icon-iconfontzhizuobiaozhun0261 i-b"></i><span class="i-b">积分列表</span></h5>
								</el-col>
							</el-row>
						</el-form>
						<div class="table-list">
							<el-table :data="showData" style="width: 100%" :default-sort = "{prop: 'deptName', order: 'ascending'}">
								<el-table-column prop="deptName" label="组别" ></el-table-column>
								<el-table-column prop="userName" label="人员" ></el-table-column>
								<el-table-column prop="upType" label="统计方式" ></el-table-column>
								<el-table-column prop="startDate" label="开始日期" width="110"></el-table-column>
								<el-table-column prop="endDate" label="截止日期" width="110"></el-table-column>
								<el-table-column prop="efficiency" label="工作效率" ></el-table-column>
								<el-table-column prop="saturation" label="工作饱和度"></el-table-column>
								<el-table-column prop="promptness" label="任务完成及时率"></el-table-column>
								<el-table-column prop="integral" label="积分"></el-table-column>
							</el-table>
						</div>
					</div>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script>
  import cloneDeep from "lodash/cloneDeep";
	export default {
		data() {
			return {
				select_value: "week",
				select: [
				//     {
				// 	label: "日积分",
				// 	value: "day"
				// },
                    {
					label: "周积分",
					value: "week"
				}, {
					label: "月积分",
					value: "month"
				}, {
					label: "年积分",
					value: "year"
				}],
				showData: [],
				dateComp: {},
				selectArr: [], //部门
				selectArr_value: "",
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
			this.loadDept()
		},
		methods: {
			loadDept(){
				let params = new URLSearchParams();
				this.$axios.post("/statistical/getdeptsList", params).then((res) => {
					let data = res.data;
					if(data.code == 200) {
            this.selectArr = cloneDeep(data.result);
            this.selectArr_value = data.result[0].dept_id;
					} else {
						this.$warn(data.message);
					}
				})
			},
			loadCharData() {
				this.$maskin();
				let params = new URLSearchParams();
				// if(this.dateRange.length == 0) {
				// 	params.append("startDate", "");
				// 	params.append("endDate", "");
				// 	this.select_value = "day"
				// } else {
				// 	params.append("startDate", this.dateRange[0]);
				// 	params.append("endDate", this.dateRange[1]);
				// 	this.select_value = "orther"
				// }

				params.append("deptId", this.selectArr_value);
                params.append("TYPE", this.select_value);
				this.$axios.post("/statistical/getIntegralStatisticalData", params).then((res) => {
					let data = res.data;
					if(data.code == 200) {
						let xaxis = []
						let efficiency = []
						let promptness = []
						let saturation = []
						let integral=[]
						for(let i of data.result.result2) {
							xaxis.push(i.userName)
							efficiency.push((i.efficiency)*100)
							promptness.push((i.promptness)*100)
							saturation.push((i.saturation)*100)
							integral.push(i.integral)
						}
						this.loadsystemChart(xaxis, efficiency, promptness, saturation,integral)
						this.$set(this, "showData", data.result.result1);
					} else {
						this.$warn(data.message);
					}


				})
			},
			loadsystemChart(xaxis, efficiency, promptness, saturation,integral) {

				var echarts = require('echarts');
				let height = document.querySelector(".mainr").offsetHeight;
				let card_header_height = document.querySelector(".el-card__header").offsetHeight;
				let card_body = document.querySelector(".box-card .el-card__body");
				card_body.style.height = height - card_header_height - 36 + "px";
				var proBar = echarts.init(document.getElementById("system")); //项目统计表格
				let option = {}
				option = {
					title: {
						text: "积分统计",
						left: 'center'
					},
					tooltip: {
						trigger: 'axis',
						formatter: function(params, ticket, callback) {
							var res = params[0].name;
							for(var i = 0, l = params.length; i < l; i++) {
								if(params[i].seriesType === 'line') {
									res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '0') + '';
								} else {
									res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '0') + '%';
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
						data: ['饱和度', '效率', '及时率',"积分"]
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
					,{
						type: 'value',
						name: '个数',
						min: 0,
						position: 'right',
						axisLabel: {
							formatter: '{value}个'
						}
					}
				],
					series: [{
						name: '工作效率',
						type: 'bar',
						yAxisIndex: 0,
						label: {
							normal: {
								show: false,
								position: 'top',
							}
						},
						// lineStyle: {
						// 	normal: {
						// 		width: 3,
						// 		shadowColor: 'rgba(0,0,0,0.4)',
						// 		shadowBlur: 10,
						// 		shadowOffsetY: 10
						// 	}
						// },
						data: efficiency
					}, {
						name: '任务完成及时率',
						type: 'bar',
						yAxisIndex: 0,
						label: {
							normal: {
								show: false,
								position: 'top',
							}
						},
						data: promptness
					}, {
						name: '工作饱和度',
						type: 'bar',
						yAxisIndex: 0,
						label: {
							normal: {
								show: false,
								position: 'top'
							}
						},
						data: saturation
					}
					, {
						name: '积分',
						type: 'line',
						yAxisIndex: 0,
						label: {
							normal: {
								show: true,
								position: 'top'
							}
						},
						data: integral
					}
					]
				};
				proBar.setOption(option);
				this.$maskoff();
			}

		}
	}
</script>
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
