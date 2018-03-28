<style scoped>
    .four-pie{
       margin-top: 30px;
    }
    .four-pie div{
        width: 500px;
        height: 300px;
        display: inline-block;
    }
    .chart-wrap h2{
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
                            <div id="people"></div>
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
            this.setTaskStatus();
        },
        methods: {
            calculate(){
                let height = document.querySelector(".mainr").offsetHeight;
                let card_body = document.querySelector(".box-card .el-card__body");
                card_body.style.height = height - 36 + "px";
            },
            loadData(){
                this.calculate();
                let params = new URLSearchParams();
                this.$axios.post("/statistical/getstatistics",params).then((res)=>{
                    let data = res.data;
                    if(data.code == 200){
                        //任务状态
                        let stalist=data.result.stalist;
                        let pie1=[];
                        let pie2=[];
                        let pie3=[];
                        let pie4=[];
                        for (let i of stalist){
                            if(i.rriority_NAME=="S"){
                                pie1.push({value:i.count, name:i.state_NAME})
                            }
                            if(i.rriority_NAME=="A"){
                                pie2.push({value:i.count, name:i.state_NAME})
                            }
                            if(i.rriority_NAME=="B"){
                                pie3.push({value:i.count, name:i.state_NAME})
                            }if(i.rriority_NAME=="C"){
                                pie4.push({value:i.count, name:i.state_NAME})
                            }
                        }
                        this.setTaskStatus(pie1,pie2,pie3,pie4)
                    }
                })
            },
            //设置任务状态的四个圆
            getPeopleStatus(){
                let echarts = require('echarts');
                let people = echarts.init(document.getElementById("people"));
                people.clear()
                this.getPeople(people)
            },
            setTaskStatus(pie1,pie2,pie3,pie4){
                let echarts = require('echarts');
                let task1 = echarts.init(document.getElementById("task1"));
                let task2 = echarts.init(document.getElementById("task2"));
                let task3 = echarts.init(document.getElementById("task3"));
                let task4 = echarts.init(document.getElementById("task4"));
                task1.clear();
                task2.clear();
                task3.clear();
                task4.clear();
                this.getPie(pie1,task1,"S");
                this.getPie(pie2,task2,"A");
                this.getPie(pie3,task3,"B");
                this.getPie(pie4,task4,"C");
            },
            getPeople(task){
                let option = {
                    title:{
                        text:'嵌套环形图'
                    },
                    tooltip: {
                        show:true,
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        left: 'right',
                        top: 'center',
                        feature: {
                            dataView: {readOnly: false},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    legend: {
                        show:false,
                        orient: 'vertical',
                        x: 'left',
                        data:['第二批次','第一批次']
                    },
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            selectedMode: 'single',
                            radius: ['25%', '40%'],

                            label: {
                                normal: {
                                    position: 'inner',
                                    formatter:"{b} ({d}%)"
                                }

                            },
                            labelLine: {
                                normal: {
                                    show: true
                                }
                            },
                            data:[

                                {value:679, name:'第二批次'},
                                {value:1548, name:'第一批次'}
                            ]
                        },
                        {
                            name:'访问来源',
                            type:'pie',
                            selectedMode: 'single',
                            radius: ['40%', '55%'],

                            label: {
                                normal: {
                                    position: 'inner',
                                    formatter:"{b} ({d}%)"
                                }

                            },
                            labelLine: {
                                normal: {
                                    show: true
                                }
                            },
                            data:[

                                {value:679, name:'第二批次'},
                                {value:1548, name:'第一批次'}
                            ]
                        },
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['55%', '70%'],
                            label:{
                                normal:{
                                    position:'inside',
                                    formatter:"{b} ({c})"
                                }
                            },
                            data:[

                                {name:'第一批次',value:123},
                                {value:234, name:'二批次未到货金额'},

                                {value:1048, name:'一批次未到货金额'},
                                {value:251, name:'一批次到货金额'}
                            ]
                        }
                    ]
                };
                task.setOption(option);
            },
            getPie(pie,task,title){
                let option={}
                option= {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left'
                    },
                    series: [
                        {
                            name:title,
                            type:'pie',
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
                            data:pie
                        }
                    ]
                };
                task.setOption(option);
            }
        }
    }
</script>
