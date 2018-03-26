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
        }
    }
</script>