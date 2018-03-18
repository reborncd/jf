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
</style>

<template>
	<div class="workreport common-card-wrap" style="height: 100%;">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span class="card-title">工作汇报</span>
			</div>
			<div class="text item workreport-wrapper">
				<div class="report-header">
					<strong class="name">{{showData.USERNAME}}</strong>
					<el-select v-model="select_value" clearable @change="loadData">
						<el-option v-for="item in select" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<p class="group">
						<span>所在组别：</span>
						<span>{{showData.DEPT}}</span>
					</p>
					<p class="group">
						<span>职位：</span>
						<span>{{showData.ROLE}}</span>
					</p>
				</div>
				<div class="report-statistics clear">
					<el-form label-width="100px" label-position="right">
						<el-row :gutter="20">
							<el-col :span="12">
								<el-row :gutter="20">
									<el-col :span="24">
										<h5><i class="iconfont icon-wancheng i-b"></i><span class="i-b">完成任务统计</span></h5>
									</el-col>
									<el-col :span="6">
										<el-form-item label="业务需求"><span style="color: red;">{{showData.busiSize}}</span></el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="基础需求任务"><span style="color: red;">{{showData.baseSize}}</span></el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="日常任务"><span style="color: red;">{{showData.daliySize}}</span></el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="技术需求"><span style="color: red;">{{showData.techSize}}</span></el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="问题管理"><span style="color: red;">{{showData.faultSize}}</span></el-form-item>
									</el-col>
									<el-col :span="24">
										<h5><i class="iconfont icon-biaozhungongshizhidinghefenxi i-b"></i><span class="i-b">工时统计</span></h5>
									</el-col>
									<el-col :span="6">
										<el-form-item label="业务需求"><span style="color: red;">{{showData.busiTime}}</span></el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="基础需求任务"><span style="color: red;">{{showData.baseTime}}</span></el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="日常任务"><span style="color: red;">{{showData.daliyTime}}</span></el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="技术需求"><span style="color: red;">{{showData.techTime}}</span></el-form-item>
									</el-col>
								</el-row>
							</el-col>
							<el-col :span="12">
								<div id="mychart" style="width: 500px;height: 350px;"></div>
							</el-col>
						</el-row>

					</el-form>
					<div class="report-list" style="margin-top: 10px;">
						<el-row :gutter="20">
							<el-col :span="24">
								<h5><i class="iconfont icon-iconfontzhizuobiaozhun0261 i-b"></i><span class="i-b">完成任务明细</span></h5>
							</el-col>
						</el-row>
						<div class="table-list">
							<el-table :data="showData.workList" border style="width: 100%">
								<el-table-column prop="TASK_DESC" label="涉及系统"></el-table-column>
								<el-table-column prop="TASK_FINAL" label="负责模块"></el-table-column>
								<el-table-column prop="START_DATE" label="开始时间"></el-table-column>
								<el-table-column prop="REALY_DATE" label="完成时间"></el-table-column>
								<el-table-column prop="DESCRIPTION" label="故障描述"></el-table-column>
								<el-table-column prop="SOLUTION" label="解决方案"></el-table-column>
								<el-table-column prop="TYPE" label="任务类型"></el-table-column>
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
				select_value: "day",
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
				showData: ""
			}
		},
		mounted() {
			this.loadData()

		},
		methods: {
			loadData() {
				let params = new URLSearchParams();
				params.append("TYPE", this.select_value);
				this.$axios.post("/user/userWorkReport", params).then((res) => {
					this.$set(this, "showData", res.data.result);
					this.loadChart()
				})
			},
			loadChart() {
				var echarts = require('echarts');
				let height = document.querySelector(".mainr").offsetHeight;
				let card_header_height = document.querySelector(".el-card__header").offsetHeight;
				let card_body = document.querySelector(".box-card .el-card__body");
				card_body.style.height = height - card_header_height - 36 + "px";
				let chart = document.getElementById("mychart");
				var myChart = echarts.init(document.getElementById("mychart"));
				//          let asset_chart = this.$echarts.init(chart);
				let option = {
					title: {
						left: 'center',
						text: '工作汇报统计',
						subtext: '外圈是工作量统计，内圈是对应的时间统计',
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						x: 'left',
						data: ['日常任务', '业务需求', '技术需求', '基础需求任务', '问题管理', '日常任务', '业务需求', '技术需求', '基础需求任务']
					},
					series: [{
							name: '工时统计',
							type: 'pie',
							selectedMode: 'single',
							radius: [0, '30%'],

							label: {
								normal: {
									position: 'inner'
								}
							},
							labelLine: {
								normal: {
									show: false
								}
							},
							data: [{
									value: this.showData.daliyTime,
									name: '日常任务'
								},
								{
									value: this.showData.busiTime,
									name: '业务需求'
								},
								{
									value: this.showData.techTime,
									name: '技术需求'
								},
								{
									value: this.showData.baseTime,
									name: '基础需求任务'
								}
							]
						},
						{
							name: '完成任务统计',
							type: 'pie',
							radius: ['40%', '55%'],
							label: {},
							data: [{
									value: this.showData.daliySize,
									name: '日常任务'
								},
								{
									value: this.showData.busiSize,
									name: '业务需求'
								},
								{
									value: this.showData.techSize,
									name: '技术需求'
								},
								{
									value: this.showData.baseSize,
									name: '基础需求任务'
								},
								{
									value: this.showData.faultSize,
									name: '问题管理'
								}
							]
						}
					]
				};
				myChart.setOption(option);
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
			tabClick(val){
                this.calculateTabsHeight();
            }

		}
	}
</script>