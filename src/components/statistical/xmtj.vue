<template>
	<div class="workreport common-card-wrap" style="height: 100%;">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span class="card-title">项目统计</span>
			</div>
			<div class="action clear" style="margin-bottom: 30px;">
				<div class="fr" style="margin-left: 20px;">
					<div class="search i-b">
						<el-button size="mini" type="primary" @click="getExls">生成报告
						</el-button>
					</div>
				</div>
				<div class="i-b" style="float: right;">
					<el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="changeLoad" v-model="dateRange" type="datetimerange" :picker-options="pickerOptions2" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini" align="right">
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

					</el-form>
					<div class="report-list" style="margin-top: 10px;">
						<el-form label-width="100px" label-position="right">
							<el-row :gutter="20">
								<el-col :span="12" v-if="selectDate">
									<h5><i class="iconfont icon-iconfontzhizuobiaozhun0261 i-b"></i><span class="i-b">{{selectDate}}{{selectNew}}任务</span></h5>
								</el-col>
								<el-col :span="12" v-if="!selectDate">
									<h5><i class="iconfont icon-iconfontzhizuobiaozhun0261 i-b"></i><span class="i-b">当前开发项目</span></h5>
								</el-col>
								<el-col :span="12">
									<el-form-item label="" class="search i-b" style="margin-top: 20px;">
										<el-input placeholder="请输入检索关键字" suffix-icon="icon-sousuo iconfont" v-model="keyWord" @change="searchKeyword($event)" size="mini" clearable>
										</el-input>
									</el-form-item>
								</el-col>
							</el-row>
						</el-form>
						<div class="table-list">
							<el-table ref="multipleTable" :data="showData" @selection-change="handleSelectionChange" style="width: 100%">
								<el-table-column label="全部" type="selection" width="55"></el-table-column>
								<el-table-column label="需求编号" width="200">
									<template slot-scope="scope">
										<span @click="goneeds($event,scope.row)" class="tab-opt">{{scope.row.st_NEELID}}</span>
									</template>
								</el-table-column>
								<!--<el-table-column prop="st_NEELID" label="需求编号" ></el-table-column>-->
								<el-table-column prop="st_NEELNAME" label="需求名称" show-overflow-tooltip></el-table-column>
								<el-table-column prop="st_STARTDATE" label="提交日期" width="110"></el-table-column>
								<el-table-column prop="st_ENDDATE" label="期望上线日期" width="110"></el-table-column>
								<el-table-column prop="st_NEELSOURCE" label="需求来源" show-overflow-tooltip></el-table-column>
								<!--<el-table-column prop="st_DESIGNSYSTEM" label="涉及系统" show-overflow-tooltip></el-table-column>-->
								<el-table-column prop="st_RRIORITY" label="优先级" width="70"></el-table-column>
								<el-table-column prop="st_PLANHOURS" label="计划工时" width="110"></el-table-column>
								<el-table-column prop="st_WORKHOURS" label="投入工时" width="110"></el-table-column>
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
  import moment from 'moment';
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
				showData: "",
				OriginData: "",
				classType: "", // 传值（分别对应 A 新增 B 完成 C留存 D执行）
				selectDate: "", //传值 （点击对象对应的时间）
				selectNew: "", //传值标签
				dateComp: {},
				dateRange: [], //时间区间
				workHoursArr: [],
				keyWord: '',
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
                        year:"",
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setDate(1);
							start.setMonth(0);
							picker.$emit('pick', [start, end]);
							this.year="year"
						}
					}]
				}
			}
		},
		filters: {
			percent: function(val) {
				if(val.indexOf('%') > 0) {
					val = val.split('%')[0]
					if(parseInt(val) >= 100) {
						val = 100
					}
				}
				return val;
			}
		},
		mounted() {
			this.loadChartsData()
		},
		methods: {
      getExls() {
				let params = new URLSearchParams();
        if(this.dateRange.length == 0) {
            params.append("startDate", moment().format('YYYY-MM-DD'));
            params.append("endDate", moment().format('YYYY-MM-DD'));
            this.select_value = "day"
        } else {
            let startDate=this.dateRange[0]
            let endDate=this.dateRange[1]
            this.select_value = "orther"
            if(this.pickerOptions2.shortcuts[3].year=="year"){
                this.pickerOptions2.shortcuts[3].year=""
                this.select_value="year"
                startDate=""
                endDate=""
            }
            params.append("startDate", startDate);
            params.append("endDate", endDate);
        }

				params.append("TYPE", this.select_value);
				params.append("classType", this.classType);
				params.append("SELECTDATE", this.selectDate);
        this.$axios.get(`/statistical/exportFile?${params.toString()}&token=${this.$getToken()}`);
				//this.$axios.get("/statistical/exportFile", params).then((res) => {
				//	let data = res.data;
				//	if(data.code != 200) {
				//		this.$warn(data.message);
        //  }
        //});
      },
			changeLoad() {
				this.classType = "", // 传值（分别对应 A 新增 B 完成 C留存 D执行）
					this.selectDate = "", //传值 （点击对象对应的时间）
					this.selectNew = "", //传值标签
                    this.loadChartsData()
			},
			loadChartsData() {
				this.$maskin();
				let params = new URLSearchParams();


				if(this.dateRange.length == 0) {
					params.append("startDate", "");
					params.append("endDate", "");
					this.select_value = "day"
				} else {
				    let startDate=this.dateRange[0]
                    let endDate=this.dateRange[1]
					this.select_value = "orther"
                    if(this.pickerOptions2.shortcuts[3].year=="year"){
                        this.pickerOptions2.shortcuts[3].year=""
                        this.select_value="year"
                        startDate=""
                        endDate=""
                    }
                    params.append("startDate", startDate);
                    params.append("endDate", endDate);
				}

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
									if(i.name == "延期") {
										i.label = {
											normal: {
												show: true,
												position: "bottom",
												rotate: 45,
												textStyle: {
													color: '#000'
												},
												formatter: '延期',
											}
										}
									}
									break;
								case "执行":
									if(i.name == "期内") {
										i.label = {
											normal: {
												show: true,
												position: "bottom",
												rotate: 45,
												textStyle: {
													color: '#000'
												},
												formatter: '期内',
											}
										}
									}
									break;
								default:
									break;
							}

						}
						this.loadChart(data.result.rriorityNames, data.result.dateX, data.result.resultList)
						this.loadPlanhours(data.result.delayMap)
						this.loadData()
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
                    this.select_value = "day"
                } else {
                    let startDate=this.dateRange[0]
                    let endDate=this.dateRange[1]
                    this.select_value = "orther"
                    if(this.pickerOptions2.shortcuts[3].year=="year"){
                        this.pickerOptions2.shortcuts[3].year=""
                        this.select_value="year"
                        startDate=""
                        endDate=""
                    }
                    params.append("startDate", startDate);
                    params.append("endDate", endDate);
                }

				params.append("TYPE", this.select_value);
				params.append("classType", this.classType);
				params.append("SELECTDATE", this.selectDate);
				this.$axios.post("/statistical/getStatisticalProjectAll", params).then((res) => {
					let data = res.data;
					if(data.code == 200) {
						this.$set(this, "showData", res.data.result);
						this.$set(this, "OriginData", res.data.result);
					} else {
						this.$warn(data.message);
					}
					this.$maskoff();
				})
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
				this.loadWorkhours(arr, name)
			},
			loadPlanhours(data) {
				//右下角的图标
				var echarts = require('echarts');
				var planhours = echarts.init(document.getElementById("planhours")); //延迟率
				let option = {}
				planhours.clear()
				option = {
					title: {
						text: '延期率',
						x: 'right'
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						show: true,
						x: 'left',
						data: ['期内', '延期']
					},
					series: [
						{
							name: '访问来源',
							type: 'pie',
							radius: ['30%', '55%'],
							labelLine: {
								normal: {
									length: 20,
									length2: 50,
									lineStyle: {
										color: '#333'
									}
								}

							},
							label: {
								normal: {
									formatter: '{a|{d}%}\n{b|{b}}',
									borderWidth: 0,
									borderRadius: 4,
									padding: [0, -50],
									rich: {
										a: {
											color: '#333',
											fontSize: 16,
											lineHeight: 20
										},
										hr: {
											borderColor: '#333',
											width: '100%',
											borderWidth: 0.5,
											height: 0
										},
										b: {
											fontSize: 16,
											lineHeight: 20,
											color: '#333'
										}
									}
								}
							},
							data: [{
								value: data.during,
								name: '期内'
							}, {
								value: data.delay,
								name: '延期'
							}]
						}
					]
				};
				planhours.setOption(option);
				this.$maskoff();
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
				var self = this
				proBar.on('click', function(params, event) {
					let type = params.seriesId
					self.selectDate = params.name
					if(type.indexOf("0") > 0) {
						self.classType = "A"
						self.selectNew = "新增"
					}
					if(type.indexOf("1") > 0) {
						self.classType = "B"
						self.selectNew = "完成"
					}
					if(params.seriesName =="延期") {
						self.classType = "C"
						self.selectNew = "延期"
					}
					if(params.seriesName =="期内") {
						self.classType = "D"
						self.selectNew = "期内"
					}

					self.loadData()
				});
			},
			//跳转到需求页面
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
			}, //搜索关键字
			searchKeyword() {
				this.$maskin();
				if(this.keyWord != "") {
					let arr = [];
					for(let i of this.OriginData) {
						if(JSON.stringify(i).indexOf(this.keyWord) >= 0) {
							arr.push(i)
						}
					}
					this.$set(this, "showData", arr)
				} else {
					this.$set(this, "showData", this.OriginData)
				}
				this.$maskoff();
			},

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
