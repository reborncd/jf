<style >
    .mr {
        margin-right: 15px;
    }

    .ml {
        margin-left: 15px;
    }

    .mb {
        margin-bottom: 15px;
    }

    .mt {
        /*margin-top: 15px;*/
    }

    .box-wrap {
        border-top: 1px solid #dc554f;
    }

    .mainr-index {
        width: 100%;
        height: 100%;
    }

    /*滚动字幕*/
    .scroll-wrap {
        background: url("../../static/image/index_bg.png") no-repeat center;
        background-size: cover;
        padding-left: 60px;
        padding-top: 20px;
        overflow: hidden;
        margin-bottom: 10px;
    }

    .scroll-wrap .iconfont {
        position: absolute;
        left: 0;
        top: 12px;
        width: 60px;
        font-size: 18px;
        color: white;
        text-align: center;
    }

    .scrollContent {
        color: white;
        line-height: 20px;
    }

    .scrollContent li {
        margin-bottom: 8px;
        padding-right: 20px;
    }

    .scrollContent li p {
        cursor: pointer;
    }

    .scrollContent li p:hover {
        text-decoration: underline;
    }

    /*日期插件*/
    .date-wrap {
        background: #777;
    }

    /*待办事项登卡片*/

    .box-card ul li {
        position: relative;
        padding-left: 20px;
        line-height: 20px;
        font-size: 14px;
        margin-top: 12px;
        cursor: pointer;
    }

    .box-card ul li:hover .content {
        text-decoration: underline;
        color: #da534f;
    }

    .box-card ul .dian {
        position: absolute;
        left: 5px;
        top: 8px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #ccc;
    }

    .box-card ul .content-title span.date {
        color: #999999;
        font-size: 12px;
    }

    .box-card ul .content {
        color: #929292;
        margin-top: 3px;
    }
</style>

<template>
    <el-col :span="24" class="mainr-index">
        <div :style="topHeight">
            <el-col :span="16">
                <!--滚动字幕-->
                <div class="grid-content bg-purple box-wrap scroll-wrap mr por">
                    <i class="iconfont icon-laba"></i>
                    <ul class="scrollContent">
                        <li @mouseover="scrollMouseover" @mouseleave="setInterval">
                            <h5 class="title">标题</h5>
                            <p>当前项目什么什么的</p>
                        </li>
                        <li @mouseover="scrollMouseover" @mouseleave="setInterval">
                            <h5 class="title">标题</h5>
                            <p>当前项目什么什么的</p>
                        </li>
                        <li @mouseover="scrollMouseover" @mouseleave="setInterval">
                            <h5 class="title">标题</h5>
                            <p>当前项目什么什么的</p>
                        </li>
                        <li @mouseover="scrollMouseover" @mouseleave="setInterval">
                            <h5 class="title">标题</h5>
                            <p>当前项目什么什么的</p>
                        </li>
                        <li @mouseover="scrollMouseover" @mouseleave="setInterval">
                            <h5 class="title">标题</h5>
                            <p>当前项目什么什么的</p>
                        </li>
                    </ul>
                </div>
                <!--<el-col :span="24">-->
                <!--待办事项-->
                <el-col :span="12">
                    <div class="box-wrap mr mt">
                        <el-card class="box-card top_card">
                            <div slot="header" class="clearfix">
                                <span class="card-title">待办事项</span>
                            </div>
                            <ul class="text item">
                                <li>
                                    <span class="dian"></span>
                                    <h4 class="content-title">标题
                                        <span class="date fr">2017-01-01</span>
                                    </h4>
                                    <p class="content">内容</p>
                                </li>
                                <li>
                                    <span class="dian"></span>
                                    <h4 class="content-title">标题
                                        <span class="date fr">2017-01-01</span>
                                    </h4>
                                    <p class="content">内容</p>
                                </li>
                                <li>
                                    <span class="dian"></span>
                                    <h4 class="content-title">标题
                                        <span class="date fr">2017-01-01</span>
                                    </h4>
                                    <p class="content">内容</p>
                                </li>
                                <li>
                                    <span class="dian"></span>
                                    <h4 class="content-title">标题
                                        <span class="date fr">2017-01-01</span>
                                    </h4>
                                    <p class="content">内容</p>
                                </li>
                                <li>
                                    <span class="dian"></span>
                                    <h4 class="content-title">标题
                                        <span class="date fr">2017-01-01</span>
                                    </h4>
                                    <p class="content">内容</p>
                                </li>
                                <li>
                                    <span class="dian"></span>
                                    <h4 class="content-title">标题
                                        <span class="date fr">2017-01-01</span>
                                    </h4>
                                    <p class="content">内容</p>
                                </li>
                            </ul>
                        </el-card>
                    </div>
                </el-col>
                <!--经办事项-->
                <el-col :span="12">
                    <div class="box-wrap mr mt">
                        <el-card class="box-card top_card">
                            <div slot="header" class="clearfix">
                                <span class="card-title">经办事项</span>
                            </div>
                            <ul class="text item">
                                <li>
                                    <span class="dian"></span>
                                    <h4 class="content-title">标题
                                        <span class="date fr">2017-01-01</span>
                                    </h4>
                                    <p class="content">内容</p>
                                </li>
                                <li>
                                    <span class="dian"></span>
                                    <h4 class="content-title">标题
                                        <span class="date fr">2017-01-01</span>
                                    </h4>
                                    <p class="content">内容</p>
                                </li>
                                <li>
                                    <span class="dian"></span>
                                    <h4 class="content-title">标题
                                        <span class="date fr">2017-01-01</span>
                                    </h4>
                                    <p class="content">内容</p>
                                </li>
                                <li>
                                    <span class="dian"></span>
                                    <h4 class="content-title">标题
                                        <span class="date fr">2017-01-01</span>
                                    </h4>
                                    <p class="content">内容</p>
                                </li>
                                <li>
                                    <span class="dian"></span>
                                    <h4 class="content-title">标题
                                        <span class="date fr">2017-01-01</span>
                                    </h4>
                                    <p class="content">内容</p>
                                </li>
                                <li>
                                    <span class="dian"></span>
                                    <h4 class="content-title">标题
                                        <span class="date fr">2017-01-01</span>
                                    </h4>
                                    <p class="content">内容</p>
                                </li>
                            </ul>
                        </el-card>
                    </div>
                </el-col>
                <!--</el-col>-->
            </el-col>
            <!--日期插件-->
            <el-col :span="8">
                <div class="grid-content bg-purple box-wrap  mr" style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);">
                    <date-plug></date-plug>
                </div>
            </el-col>
        </div>
        <div :style="bottomHeight">
            <el-col :span="24" style="height: 100%">
                <el-col :span="8" style="height: 100%">
                    <div class="box-wrap mr mt">
                        <el-card class="box-card bottom_card">
                            <div slot="header" class="clearfix">
                                <span class="card-title">一周工作动态</span>
                            </div>
                            <div id="dynamic" class="echarts-warp"></div>
                        </el-card>
                    </div>
                </el-col>
                <el-col :span="8" style="height: 100%">
                    <div class="box-wrap mr mt">
                        <el-card class="box-card bottom_card">
                            <div slot="header" class="clearfix">
                                <span class="card-title">资源动态</span>
                            </div>
                            <div id="asset" class="echarts-warp"></div>
                        </el-card>
                    </div>
                </el-col>
                <el-col :span="8" style="height: 100%">
                    <div class="box-wrap mr mt">
                        <el-card class="box-card bottom_card">
                            <div slot="header" class="clearfix">
                                <span class="card-title">经办事项</span>
                            </div>
                            <ul class="text item">
                                <li>
                                    <span class="dian"></span>
                                    <h4 class="content-title">标题
                                        <span class="date fr">2017-01-01</span>
                                    </h4>
                                    <p class="content">内容</p>
                                </li>
                                <li>
                                    <span class="dian"></span>
                                    <h4 class="content-title">标题
                                        <span class="date fr">2017-01-01</span>
                                    </h4>
                                    <p class="content">内容</p>
                                </li>
                                <li>
                                    <span class="dian"></span>
                                    <h4 class="content-title">标题
                                        <span class="date fr">2017-01-01</span>
                                    </h4>
                                    <p class="content">内容</p>
                                </li>
                                <li>
                                    <span class="dian"></span>
                                    <h4 class="content-title">标题
                                        <span class="date fr">2017-01-01</span>
                                    </h4>
                                    <p class="content">内容</p>
                                </li>
                                <li>
                                    <span class="dian"></span>
                                    <h4 class="content-title">标题
                                        <span class="date fr">2017-01-01</span>
                                    </h4>
                                    <p class="content">内容</p>
                                </li>
                                <li>
                                    <span class="dian"></span>
                                    <h4 class="content-title">标题
                                        <span class="date fr">2017-01-01</span>
                                    </h4>
                                    <p class="content">内容</p>
                                </li>
                            </ul>
                        </el-card>
                    </div>
                </el-col>
            </el-col>
        </div>
    </el-col>

</template>

<script>
    import datePlug from "./datePlug.vue";
    export default {
        data(){
            return {
                scrollStyle_y: 0,
                interval: "",
                scrollHeight: "",
                scrollWrap: "",
                topHeight: "",
                bottomHeight: ""
            }
        },
        components: {
            "date-plug": datePlug
        },
        mounted(){
            this.calculate();
            let dynamic_wrap = document.getElementById("dynamic");
//            let dynamic_chart = this.$echarts.init(dynamic_wrap);
            // 指定图表的配置项和数据
            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                legend: {
                    data: ['当前新增需求', '当日完成需求', '当日执行任务', '当日留存需求']
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        min: 0,
                        max: 250,
                        interval: 50,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    {
                        type: 'value',
                        min: 0,
                        max: 25,
                        interval: 5,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }
                ],
                series: [
                    {
                        name: '当前新增需求',
                        type: 'bar',
                        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 23.2]
                    },
                    {
                        name: '当日完成需求',
                        type: 'bar',
                        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6]
                    },
                    {
                        name: '当日执行任务',
                        type: 'bar',
                        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6]
                    },
                    {
                        name: '当日留存需求',
                        type: 'line',
                        yAxisIndex: 1,
                        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3]
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
//            dynamic_chart.setOption(option);
//            let asset_wrap = document.getElementById("asset");
//            let asset_chart = this.$echarts.init(asset_wrap);
//            dynamic_chart.setOption(option);
//this.setInterval()
        },
        methods: {
            calculate(){
                let height = document.getElementsByClassName("mainr")[0].offsetHeight;
                let scrollBanner = document.querySelector(".scroll-wrap");
                let card_header_height = document.querySelector(".el-card__header").offsetHeight;
                let top_card_body = document.querySelectorAll(".top_card .el-card__body");
                let bottom_card_body = document.querySelectorAll(".bottom_card .el-card__body");
                let dateWrap = document.getElementById("schedule-box");
                //设置上半部分高度
                this.topHeight = {
                    //  总高度-上下padding-10的下外边距
                    height: (height - 34 - 10) * 0.6 + "px",
                    "margin-bottom": "10px"
                };
                //设置下半部分高度
                this.bottomHeight = {
                    //  总高度-上下padding
                    height: (height - 34 - 10) * 0.4 + "px"
                };
                //设置滚动字幕高度                 截取上半部分0.35的高度
                scrollBanner.style.height = (height - 34 - 10) * 0.6 * 0.35 + "px";
                //设置日期的高度
                dateWrap.style.height = (height - 34 - 10) * 0.6 + "px";
                //设置中间三个卡片高度
                for (let i of top_card_body) {
                    //                    截取上半部分0.65的高度   -   卡片头部的高度-卡片border-滚动字幕的下外边距10px
                    i.style.height = ((height - 34 - 10) * 0.60 * 0.65) - card_header_height - 1 - 10 + "px";
                }
                //设置下面三个卡片高度
                for (let i of bottom_card_body) {
                    //                    截取下半部分100%的高度      -   卡片头部的高度
                    i.style.height = ((height - 34 - 10) * 0.4) - card_header_height - 1 + "px";
                }
                let echarts_wrap = document.querySelectorAll(".echarts-warp");
                for (let i of echarts_wrap) {
                    //                    截取下半部分100%的高度      -   卡片头部的高度
                    i.style.height = ((height - 34 - 10) * 0.4) - card_header_height - 1 + "px";
                }
            },
            clearInt(){
//                clearInterval(this.interval)
            },
            scrollMouseover(){
//                this.clearInt()
            },
            setInterval(){
//                this.interval = setInterval(() => {
//                    let scrollWrap = document.getElementsByClassName("scrollContent")[0];
//                    let scrollHeight = scrollWrap.offsetHeight;
//                    this.scrollStyle_y--;
//                    if (-this.scrollStyle_y >= scrollHeight+20) {
//                        //122是容器scrollWrap的高
//                        this.scrollStyle_y = 122
//                    } else {
//                        scrollWrap.style.transform = `translate(0,${this.scrollStyle_y}px)`
//                    }
//                }, 10)
            },
            focus(){
                console.log(1)
            }
        },
    }
</script>