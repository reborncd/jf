<style scoped>
    .chart-wrap h2{
        text-align: center;
    }
    .four-pie {
        margin-top: 30px;
    }

    .four-pie div {
        width: 500px;
        height: 300px;
        display: inline-block;
    }

    .chart-wrap h2 {
        font-size: 20px;
        font-weight: bold;
    }
</style>

<template>
    <div class="common-card-wrap" style="height: 100%;">
        <el-card class="box-card">
            <div class="text item">
                <div class="content">
                    <div class="chart-wrap">
                        <h2>任务状态</h2>
                        <div class="four-pie">
                            <div id="task1"></div>
                            <div id="task2"></div>
                            <div id="task3"></div>
                            <div id="task4"></div>
                        </div>
                    </div>
                    <div class="chart-wrap">
                        <h2>人员状态</h2>
                        <div class="four-pie">
                            <div id="people" style="display: block;margin: 0 auto"></div>
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
            return {}
        },
        mounted(){
            this.loadData();
        },
        methods: {
            calculate(){
                let height = document.querySelector(".mainr").offsetHeight;
                let card_body = document.querySelector(".box-card .el-card__body");
                card_body.style.height = height - 36 + "px";
            },
            loadData(){
                this.$maskin();
                this.calculate();
                let params = new URLSearchParams();
                this.$axios.post("/statistical/getstatistics", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        //任务状态
                        let Sarr = [];
                        let Aarr = [];
                        let Barr = [];
                        let Carr = [];
                        //设置任务状态
                        for (let i of data.result.stalist) {
                            if (i.rriority_NAME == "S") {
                                Sarr.push(i);
                            }
                            if (i.rriority_NAME == "A") {
                                Aarr.push(i);
                            }
                            if (i.rriority_NAME == "B") {
                                Barr.push(i);
                            }
                            if (i.rriority_NAME == "C") {
                                Carr.push(i);
                            }
                        }
                        this.setTaskStatus(Sarr, Aarr, Barr, Carr);
                        //人员状态
                        let personData = {
                            "dept_NAME":[],//所有的数组
                            "kocount":[],//空闲的数组
                            "mcount":[],//忙碌的数组
                            "sumcount":[],//总的时间
                        };
                        for(let j of data.result.sumcountuser){
                            personData.dept_NAME.push(j.dept_NAME);
                            personData.kocount.push(j.kocount);
                            personData.mcount.push(j.mcount);
                            personData.sumcount.push(j.sumcount);
                        }
                        //设置人员状态
                        this.setPerson("人员状态",personData);
                        this.$maskoff();
                    }
                })
            },
            //设置任务状态的四个圆
            setTaskStatus(Sarr, Aarr, Barr, Carr){
                let task1 = this.$echarts.init(document.getElementById("task1"));
                task1.clear();
                task1.setOption(this.statusOption("紧急重要", Sarr));

                let task2 = this.$echarts.init(document.getElementById("task2"));
                task2.clear();
                task2.setOption(this.statusOption("紧急普通", Aarr));

                let task3 = this.$echarts.init(document.getElementById("task3"));
                task3.clear();
                task3.setOption(this.statusOption("中等重要", Barr));

                let task4 = this.$echarts.init(document.getElementById("task4"));
                task4.clear();
                task4.setOption(this.statusOption("一般普通", Carr));
            },
            //圆的设置
            statusOption(title, allData){
                let arr = [];
                for (let i of allData) {
                    let obj = {
                        "name": i.state_NAME,
                        "value": i.count
                    };
                    arr.push(obj);
                }
                return {
                    title: {
                        text: title,
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        type: 'scroll',
                        orient: 'vertical',
                        right: 10,
                        top: 20,
                        bottom: 20,
                        data: allData
                    },
                    series: [{
                        name: '需求状态',
                        type: 'pie',
                        radius: '55%',
                        center: ['40%', '50%'],
                        data: arr,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                }
            },
            //设置人员的饼图
            setPerson(title,data){
                let person = this.$echarts.init(document.getElementById("people"));
                person.clear();
                person.setOption(this.personOption(title,data));
            },
            //人员状态设置
            personOption(title,data){
                return {
                    angleAxis: {},
                    radiusAxis: {
                        type: 'category',
                        data: data.dept_NAME,//组的数量
                    },
                    polar: {},
                    series: [{
                        type: 'bar',
                        data: data.kocount,
                        coordinateSystem: 'polar',
                        name: '空闲人数',
                        stack: 'a'
                    }, {
                        type: 'bar',
                        data: data.mcount,
                        coordinateSystem: 'polar',
                        name: '忙碌人数',
                        stack: 'a'
                    }],
                    legend: {
                        show: true,
                        data: ['空闲人数', '忙碌人数']
                    }
                }
            },
        }
    }
</script>