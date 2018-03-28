<style scoped>
    .chart-wrap h2 {
        text-align: center;
    }

    .four-pie {
        margin-top: 30px;
    }

    .four-pie div {
        width: 500px;
        height: 150px;
        display: inline-block;
    }

    .chart-wrap h2 {
        font-size: 20px;
        font-weight: bold;
    }

    .button {
        position: absolute;
        left: 30px;
        top: 30px;
    }
</style>

<template>
    <div>
        <div class="common-card-wrap" style="height: 100%;">
            <el-card class="box-card">
                <div class="text item">
                    <!--全局看板-->
                    <el-button type="primary" size="mini" class="button" @click="showOption">看板设置</el-button>
                    <div class="content" v-if="visible.global">
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
                            <div id="people" style="display: block;margin: 0 auto;height: 200px"></div>
                        </div>
                        <div class="chart-wrap">
                            <h2>完成状态</h2>
                            <el-select v-model="complete.select" placeholder="请选择组别" @change="changeComplete">
                                <el-option
                                        v-for="item in complete.selectArr"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            <div id="complete" style="display: block;margin: 0 auto;height: 500px"></div>
                        </div>
                    </div>













                    <!--周期工时-->
                    <div class="content" v-if="visible.needs" style="margin-top: 35px">
                        <el-form label-width="120px" label-position="left">
                            <el-row :gutter="20" >
                                <el-col :span="12" :sm="12">
                                    <el-form-item label="需求名称">
                                        {{realtimeInfo.name}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" :sm="12">
                                    <el-form-item label="需求编号">
                                        {{realtimeInfo.number}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" :sm="12">
                                    <el-form-item label="参与者">
                                        {{realtimeInfo.actor}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" :sm="12">
                                    <el-form-item label="期望上线时间">
                                        {{realtimeInfo.onlinetime}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24" :sm="12">
                                    <el-form-item label="需求描述">
                                        {{realtimeInfo.xqms}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" :sm="12">
                                    <el-form-item label="当前状态">
                                        {{realtimeInfo.status}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" :sm="12">
                                    <el-form-item label="所处阶段">
                                        {{realtimeInfo.stage}}
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        <div class="track">
                            <ul>
                                <li v-for="item in realtimeInfo.info"></li>
                            </ul>
                        </div>
                        <!--周期-->
                        <div class="timeLine">
                            <div id="times" style="width: 100%;height: 300px"></div>
                        </div>
                        <!--工时-->
                        <div style="overflow:scroll;width: 100%" class="clear" id="hours-div">
                            <h1 :visible="realtimeInfo.titleVisible" style="text-align: center; font-weight: 900;font-size: 22px">工时统计</h1>
                            <!--<div id="workHours" style="width: 30%;height: 300px;float: left"></div>-->
                        </div>
                    </div>







                </div>
            </el-card>
        </div>
        <el-dialog title="看板设置" :visible="option.visible" width="50%"
                   append-to-body modal-append-to-body :before-close="closeDialog">
            <el-form label-width="100px">
                <el-form-item label="看板类型">
                    <el-checkbox v-model="option.global">全局看板</el-checkbox>
                    <el-checkbox v-model="option.needs">需求看板</el-checkbox>
                </el-form-item>
                <el-form-item label="需求类型" v-if="option.needs">
                    <el-select v-model="option.needschoosen" clearable placeholder="请选择需求类型"
                               @change="needsChange($event)">
                        <el-option v-for="item in option.needsArr" :key="item.value" :label="item.name"
                                   :value="item.id"></el-option>
                    </el-select>
                    <el-select v-model="option.code" clearable placeholder="请选择需求">
                        <el-option v-for="item in option.codeArr" :key="item.neel_ID" :label="item.neel_NAME"
                                   :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="切换频率">
                    <el-select v-model="option.time" placeholder="请选择切换频率">
                        <el-option v-for="item in option.timeArr" :key="item.value" :label="item.key"
                                   :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveOption" size="mini">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                visible:{
                    global:false,
                    needs:true
                },
                option: {
                    visible: false,
                    global: false,//全局看板
                    needs: false,//需求看板
                    loop: 30,//默认定时器时间
                    needsArr: [],//需求类型数组
                    needschoosen: "",//需求类型选择的值
                    codeArr: [],//需求编号数组
                    code: "",//需求选中值
                    activeCode: "",//确定后需要请求的需求ID
                    time: "",//切换频率选中的值
                    timeArr: [{
                        "key": "30秒",
                        "value": 30
                    }, {
                        "key": "60秒",
                        "value": 60
                    }, {
                        "key": "180秒",
                        "value": 180
                    }, {
                        "key": "300秒",
                        "value": 300
                    }, {
                        "key": "600秒",
                        "value": 600
                    }]
                },
                complete: {
                    selectArr: [],//完成状况数组
                    select: "全部",//选中值
                    originData : [],//源数据
                },
                realtimeInfo:{
                    infos:'',
                    name:'',  //需求名称
                    number:'',//需求编号
                    actor:'',//参与者
                    onlinetime:'',//上线时间
                    xqms:'',//需求描述
                    status:'',//当前状态
                    stage:'',//所处阶段
                    info:'',//各种信息
                    titleVisible:false,//标题的显示
                },
            }
        },
        mounted(){
            this.loadData();
        },
        methods: {
            //开启看板设置
            showOption(){
                this.option.visible = true;
            },
            //保存设置
            saveOption(){
                let params = new URLSearchParams();
                params.append("NEEL_TYPE", this.option.needschoosen);//需求类型ID
                params.append("NEEL_ID", this.option.code);//需求ID
                this.$axios.post("/statistical/getneelmainba", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {



                    }
                })
            },














































































            closeDialog(){
                this.option.visible = false;//看板的弹窗
            },
            calculate(){
                let height = document.querySelector(".mainr").offsetHeight;
                let card_body = document.querySelector(".box-card .el-card__body");
                card_body.style.height = height - 36 + "px";
            },
            loadData(){
                this.$maskin();
                this.calculate();
                this.loadGlobal();//加载全局看板
            },
            loadGlobal(){
                let params = new URLSearchParams();
                this.$axios.post("/statistical/getstatistics", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        //设置需求类型下拉数据
                        this.$set(this.option, "needsArr", data.result.Neellist);
                        if(this.visible.global){

                            //任务状态
                            let Sarr = [];
                            let Aarr = [];
                            let Barr = [];
                            let Carr = [];
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
                            //设置任务状态
                            this.setTaskStatus(Sarr, Aarr, Barr, Carr);
                            //人员状态
                            let personData = {
                                "dept_NAME": [],//所有的数组
                                "kocount": [],//空闲的数组
                                "mcount": [],//忙碌的数组
                                "sumcount": [],//总的时间
                            };
                            for (let j of data.result.sumcountuser) {
                                personData.dept_NAME.push(j.dept_NAME);
                                personData.kocount.push(j.kocount);
                                personData.mcount.push(j.mcount);
                                personData.sumcount.push(j.sumcount);
                            }
                            //设置人员状态
                            this.setPerson("人员状态", personData);
                            //设置完成状态数组
                            let allpeople = [];
                            let alldeptlist = [];
                            for (let i of data.result.deptlist) {
                                let obj = {
                                    "label": i.dept_NAME,
                                    "value": i.dept_ID,
                                    "deptuserlist": i.deptuserlist
                                };
                                alldeptlist.push(obj);
                                //放置到全部的人员数组中去
                                for (let j of i.deptuserlist) {
                                    allpeople.push(j)
                                }
                            }
                            alldeptlist.unshift({
                                "label": "全部",
                                "value": "全部",
                                "deptuserlist": allpeople
                            });
                            this.$set(this.complete, "selectArr", alldeptlist);
                            this.$set(this.complete, "originData", alldeptlist);
                            this.setComplete(alldeptlist);
                        }
                        this.$maskoff();
                    }
                });
            },
            //选择需求类型change事件
            needsChange(e){
                this.option.code = "";
                let params = new URLSearchParams();
                params.append("NEEL_TYPE", this.option.needschoosen);
                this.$axios.post("/statistical/getneelnamelist", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$set(this.option, "codeArr", data.result.neellist)
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
            setPerson(title, data){
                let person = this.$echarts.init(document.getElementById("people"));
                person.clear();
                person.setOption(this.personOption(title, data));
            },
            //人员状态设置
            personOption(title, data){
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
            changeComplete(){
                this.$maskin();
                this.setComplete(this.complete.originData);
                this.$maskoff();
            },
            //完成状态的设置
            completeOption(data){
                let person = [];//放置所有人员
                let ywxq = [];//业务需求的数组
                let jcjs = [];//基础建设的数组
                let rcrw = [];//日常任务的数组
                let jsxq = [];//技术需求的数组
                if (this.complete.select == "全部") {
                    for (let i of data) {
                        for (let j of i.deptuserlist) {
                            person.push(j.user_NAME);
                            for (let n of j.userwtbdlist) {
                                ywxq.push(n.prodcount);
                                jcjs.push(n.basecount);
                                rcrw.push(n.edalcount);
                                jsxq.push(n.techcount);
                            }
                        }
                    }
                }
                for (let i of data) {
                    if (i.value == this.complete.select) {
                        for (let j of i.deptuserlist) {
                            person.push(j.user_NAME);
                            for (let n of j.userwtbdlist) {
                                ywxq.push(n.prodcount);
                                jcjs.push(n.basecount);
                                rcrw.push(n.edalcount);
                                jsxq.push(n.techcount);
                            }
                        }
                        break;
                    }
                }
                return {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['基础建设', '日常任务', '技术需求', '业务需求']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value'
                    },
                    yAxis: {
                        type: 'category',
                        data: person
                    },
                    series: [{
                        name: '基础建设',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
//                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: jcjs
                    }, {
                        name: '日常任务',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
//                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: rcrw
                    }, {
                        name: '技术需求',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
//                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: jsxq
                    }, {
                        name: '业务需求',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
//                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: ywxq
                    }]
                }
            },
            //应用完成状态的配置
            setComplete(data){
                let complete = this.$echarts.init(document.getElementById("complete"));
                complete.clear();
                complete.setOption(this.completeOption(data));
            },
        }
    }
</script>