<style scoped>
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
    .statistics-content{
        padding-left:24px;
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
    .el-textarea textarea{
        min-height: 80px!important;
    }
    .el-table__row td{
        padding: 0;
        min-height: 45px;
    }
    table tr,table td,table th,table div{
        text-align: center;
    }
    .el-table--border td:last-child, .el-table--border th:last-child{
        border-right:none;
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
                    <strong class="name">姓名</strong>
                    <el-select v-model="select_value" size="mini" clearable>
                        <el-option
                                v-for="item in select"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <p class="group">
                        <span>所在组别：</span>
                        <span>组别名称</span>
                    </p>
                </div>
                <div class="report-statistics clear">
                    <div class="report-left fl">
                        <h5><i class="iconfont icon-wancheng i-b"></i><span class="i-b">完成任务统计</span></h5>
                        <div class="statistics-content clear">
                            <p><span class="key">业务需求</span>：<span class="value">1</span></p>
                            <p><span class="key">技术需求</span>：<span class="value">1</span></p>
                            <p><span class="key">日常任务</span>：<span class="value">1</span></p>
                            <p><span class="key">问题处理</span>：<span class="value">1</span></p>
                        </div>
                        <h5><i class="iconfont icon-biaozhungongshizhidinghefenxi i-b"></i><span class="i-b">工时统计</span></h5>
                        <div class="statistics-content clear">
                            <p><span class="key">忙碌</span>：<span class="value">1</span></p>
                            <p><span class="key">空闲</span>：<span class="value">1</span></p>
                        </div>
                    </div>
                    <div class="report-right fr">
                        <div id="mychart" style="width: 350px;height: 180px;margin-top: -20px"></div>
                    </div>
                    <div class="clear"></div>
                    <div class="report-explain">
                        <h5><i class="iconfont icon-beizhuweitianxie i-b"></i><span class="i-b">说明</span></h5>
                        <div class="statistics-content">
                            <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    v-model="textarea">
                            </el-input>
                        </div>
                    </div>
                    <div class="report-list" style="margin-top: 10px;">
                        <h5><i class="iconfont icon-iconfontzhizuobiaozhun0261 i-b"></i><span class="i-b">完成任务明细</span></h5>
                        <div class="statistics-content">
                            <el-table
                                    :data="tableData"
                                    border
                                    style="width: 100%">
                                <el-table-column prop="a" label="项目组"></el-table-column>
                                <el-table-column prop="b" label="姓名"></el-table-column>
                                <el-table-column prop="c" label="所处需求"></el-table-column>
                                <el-table-column prop="d" label="临近时间点"></el-table-column>
                                <el-table-column prop="e" label="预期完成时间"></el-table-column>
                                <el-table-column prop="f" label="时间点内容"></el-table-column>
                                <el-table-column prop="g" label="更新时间"></el-table-column>
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
        data(){
            return {
                select_value: "1",
                textarea:"",
                select: [{
                    label: "日报",
                    value: "1"
                }, {
                    label: "周报",
                    value: "2"
                }, {
                    label: "月报",
                    value: "3"
                }, {
                    label: "年报",
                    value: "4"
                }],
                tableData: [{
                    a: '2016-05-02',
                    b: '王小虎',
                    c: 'dsadasdassadasd',
                    d:"2016-05-02",
                    e:"2016-05-02",
                    f:"上海市普陀区金沙江路 1518 弄",
                    g:"2016-05-02"
                },]
            }
        },
        mounted(){
            let height = document.querySelector(".mainr").offsetHeight;
            let card_header_height = document.querySelector(".el-card__header").offsetHeight;
            let card_body = document.querySelector(".box-card .el-card__body");
            card_body.style.height = height - card_header_height - 36 + "px";
            let chart = document.getElementById("mychart");
            let asset_chart = this.$echarts.init(chart);
            let option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'right',
                    data:["业务需求","技术需求","日常任务","问题处理","忙碌","空闲"]
                },
                series: [
                    {
                        name:'完成任务统计',
                        type:'pie',
                        selectedMode: 'single',
                        radius: [0, '45%'],
                        label: {
                            normal: {
                                show:false,
                            }
                        },
                        data:[
                            {value:335, name:'忙碌'},
                            {value:679, name:'空闲'}
                        ]
                    },
                    {
                        name:'工时统计',
                        type:'pie',
                        selectedMode: 'single',
                        radius: ["60%", '90%'],
                        label: {
                            normal: {
                                show:false,
                            }
                        },
                        data:[
                            {value:335, name:'业务需求'},
                            {value:310, name:'技术需求'},
                            {value:234, name:'日常任务'},
                            {value:135, name:'问题处理'}
                        ]
                    }
                ]
            };
            asset_chart.setOption(option);
        },
        methods: {}
    }
</script>