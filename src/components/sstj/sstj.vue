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

    .setting-wrap {
        position: absolute;
        width: 100%;
        padding-top: 10px;
        left: 30px;
        top: 18px;
        background: white;
        z-index: 10;
    }
    .el-form-item{
        margin-bottom:0;
    }
    .track{
        height: 200px;
        overflow-y: auto;
    }
    .track li{
        line-height: 25px;
    }
</style>

<template>
    <div>
        <div class="common-card-wrap" style="height: 100%;">
            <el-card class="box-card">
                <div class="text item">
                    <!--全局看板-->
                    <div class="setting-wrap">
                        <el-button type="primary" size="mini" @click="showOption">看板设置</el-button>
                    </div>
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
                        <!--信息块-->
                        <el-form label-width="120px" label-position="left">
                            <el-row :gutter="20" >
                                <el-col :span="24" :sm="24">
                                    <el-form-item label="需求名称">
                                        {{realtimeInfo.neel_NAME}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24" :sm="24">
                                    <el-form-item label="需求编号">
                                        {{realtimeInfo.neel_ID}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" :sm="12">
                                    <el-form-item label="参与者">
                                        {{realtimeInfo.check_NAME}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" :sm="12">
                                    <el-form-item label="期望上线时间">
                                        {{realtimeInfo.golive_DATE}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24" :sm="24">
                                    <el-form-item label="需求描述">
                                        <div class="neel_DESCRIPTION"></div>
                                        <!--{{realtimeInfo.neel_DESCRIPTION}}-->
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        <h2 style="margin-top: 20px;">当前状态：<span style="margin-left:10px;color: red">{{realtimeInfo.state_NAME}}</span></h2>
                        <div class="track">
                            <ul>
                                <li v-for="(item, index) in info" :key="item.record_ID">
                                    {{index+1}}.
                                    <span style="margin-right: 5px;"></span>
                                    {{item.date_START}}&nbsp;&nbsp;{{item.record_DESC}}
                                </li>
                            </ul>
                        </div>
                        <!--信息块-->
                        <div v-show="sstj.hidezqvisible" id="system" style="width:1000px;height: 200px;margin: 20px 0;"></div>
                        <div v-show="sstj.hidegsvisible" style="width: 1000px;" class="clear" id="hours-div">
                            <h1 style="text-align: center; font-weight: 900;font-size: 20px">工时统计</h1>
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
                                   :value="item.neel_ID"></el-option>
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
                    global:true,
                    needs:false
                },
                option: {
                    visible: false,
                    global: true,//全局看板
                    needs: false,//需求看板
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
                    neel_NAME:'', //需求名称
                    neel_ID:'',//需求编号
                    check_NAME:'',//参与者
                    golive_DATE:'',//上线时间
                    neel_DESCRIPTION:'',//需求描述
                    state_Name:'',//当前状态
                    stage:'',//所处阶段
                    titleVisible:false,//标题的显示
                },
                info:[],//信息列表
                sstj:{
                    hidezqvisible:false,//周期统计
                    hidegsvisible:false,//工时统计
                },
                interval:"",
            }
        },
        mounted(){
            this.loadData();
        },
        destroyed() {
            clearInterval(this.interval);
        },
        methods: {
            //开启看板设置
            showOption(){
                this.option.visible = true;
            },
            //保存设置
            saveOption(){
                clearInterval(this.interval);
                this.option.global?this.visible.global = true:this.visible.global = false;
                this.option.needs?this.visible.needs = true:this.visible.needs = false;
                if(this.option.needs){
                    if(!this.option.needschoosen){
                        this.$warn("请选择需求类型");
                        return
                    }
                    if(!this.option.code){
                        this.$warn("请选择需求编码");
                        return
                    }
                }
                if(this.option.global && this.option.needs && !this.option.time){
                    this.$warn("请选择切换频率");
                    return;
                }
                this.$maskin();
                let params = new URLSearchParams();
                params.append("NEEL_TYPE", this.option.needschoosen);//需求类型ID
                params.append("NEEL_ID", this.option.code);//需求ID
                this.$axios.post("/statistical/getneelmainba", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200 && Reflect.has(data, 'result')) {
                        this.realtimeInfo = data.result.neellist.length > 0 && data.result.neellist[0];
                        document.querySelector(".neel_DESCRIPTION").innerHTML = data.result.neellist[0].neel_DESCRIPTION
                        this.info = data.result.NEELGZ;
                        //加载实时统计数据
                        if(data.result.systenDept && data.result.currentTime){
                            if(data.result.systenDept.length){
                                //技术经理分析过后显示周期统计模块
                                this.sstj.hidezqvisible = true
                                let bool = false;
                                for(let i of data.result.systenDept){
                                    if(i.infos){
                                        bool = true
                                    }
                                }
                                bool?this.sstj.hidegsvisible = true:this.sstj.hidegsvisible = false
                            }else{
                                //没有进行分析取消所有展示
                                this.sstj.hidezqvisible = false
                                this.sstj.hidegsvisible = false
                            }
                            this.setRealTime(data.result.systenDept,data.result.currentTime)
                        }
                        this.option.visible = false;
                        if(this.option.global && this.option.needs){
                           this.interval = setInterval(()=>{
                             if(this.visible.global){
                                 this.visible.global  = false;
                                 this.visible.needs  = true;
                             }else{
                                 this.visible.global  = true;
                                 this.visible.needs  = false;
                             }
                           },this.option.time*1000)
                        }
                        this.$maskoff()
                    }
                })
            },
            //设置实时统计数据
            setRealTime(systenDept,currentTime){
                let datashow = systenDept;
                let nowTime = currentTime;
                let yaxis = []; //y轴显示
                let startTime = []; //预期开始时间
                let endTime = []; //预期结束时间
                let actualTime = []; //实际完成时间
                let timeInfo=[]; //所有信息
                let deptName=[];//部门
                let allTime=[];//实际用时
                let requiredTime=[];//总用时
                let leaveTime=[];//剩余用时
                for(let i of datashow) {
                    timeInfo.push(i);
                    yaxis.push(i.DEPT_NAME);
                    startTime.push(new Date(i.EXPECT_START));
                    endTime.push(new Date(i.EXPECT_END));
                    if(!i.lastCompleteTime) {
                        //如果没有完成事件，设置完成时间为当前时间
                        i.lastCompleteTime = nowTime
                    }
                    if(i.lastCompleteTime<=i.EXPECT_END){
                        //如果完成时间在计划时间之内，完成时间等于预计时间
                        i.lastCompleteTime=i.EXPECT_END
                    }
                    //所有人员的实际用时
                    if(i.allTime){
                        allTime.push(i.allTime);
                        deptName.push(i.DEPT_NAME);
                        requiredTime.push(i.requiredTime);
                        leaveTime.push(i.requiredTime-i.allTime)
                    }
                    actualTime.push(new Date(i.lastCompleteTime));

                    this.$set(this.sstj, "gsinfo", timeInfo);
                }
                let len=requiredTime.length;
                this.$set(this.sstj,"yaxis",yaxis);
                this.$set(this.sstj,"startTime",startTime);
                this.$set(this.sstj,"endTime",endTime);
                this.$set(this.sstj,"actualTime",actualTime);
                this.$set(this.sstj,"timeInfo",timeInfo);
                this.$set(this.sstj,"deptName",deptName);
                this.$set(this.sstj,"requiredTime",requiredTime);
                this.$set(this.sstj,"leaveTime",leaveTime);
                this.$set(this.sstj,"allTime",allTime);
                this.sstj.len = len;
                this.realTime(yaxis,startTime,endTime,actualTime);
                this.workTime(deptName,leaveTime,requiredTime,allTime);

            },
//            实时统计周期
            realTime(yaxis,startTime,endTime,actualTime) {
                let proBar = this.$echarts.init(document.getElementById("system")); //实时统计
                proBar.clear()
                let option = {
                    title : {
                        text: '周期统计',
                        x:'center'
                    },
                    legend: {
                        data: ['实时统计']
                    },
                    xAxis: {
                        type: 'time'
                    },

                    yAxis: {
                        data: yaxis
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: function(params) {
                            let res = params[0].name + "</br>"
                            let date0 = new Date(params[0].data);
                            let date1 = new Date(params[1].data);
                            date0 = date0.getFullYear() + "-" + (date0.getMonth() + 1) + "-" + date0.getDate();
                            date1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();
                            res += params[0].seriesName + ":" + date0 + "</br>"
                            res += params[1].seriesName + ":" + date1 + "</br>"
                            return res;
                        }
                    },
                    series: [
                        {
                            name: '开始时间',
                            type: 'bar',
                            stack: '开始时间',
                            itemStyle: {
                                normal: {
                                    color: '#778899',
                                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                                }
                            },
                            data: startTime
                        }, {
                            name: '结束时间',
                            type: 'bar',
                            stack: '开始时间',
                            itemStyle: {
                                normal: {
                                    color: '#2E91BD',
                                    barBorderRadius: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                                    shadowBlur: 20
                                }
                            },
                            data:endTime
                        },
                        {
                            name: '超出开始时间',
                            type: 'bar',
                            stack: '开始时间',
                            itemStyle: {
                                normal: {
                                    color: '#F4201B',
                                    shadowColor: 'rgba(255, 255, 255, 0.3)',
                                }
                            },
                            data:actualTime
                        }
                    ]
                };
                proBar.setOption(option);
            },
            //工时
            workTime(deptName,leaveTime,requiredTime,allTime){
                let father = document.getElementById("hours-div");
                if(father){
                    let allChild = document.querySelectorAll("#hours-div .hour-child");
                    for(let i of allChild){
                        father.removeChild(i)
                    }
                    setTimeout(()=>{
                        for(let i=0;i<deptName.length;i++){
                            let txtName
                            if(leaveTime[i]>=0){
                                txtName='剩余工时'
                            }
                            else{
                                txtName='超出工时'
                                leaveTime[i]=-leaveTime[i]
                            }
                            let div = '<div id="workHours'+i+'" class="hour-child" style="height: 150px;width: 300px;float: left;"></div>';
                            father.insertAdjacentHTML("beforeend",div);
                            let option = {
                                axisLabel: {
                                    interval:0//横轴信息全部显示
                                },
                                tooltip : {
                                    trigger: 'item',
                                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                                },
                                series : [
                                    {
                                        name: deptName[i],
                                        type: 'pie',
                                        radius : "60%",
                                        center: ['60%', '50%'],
                                        data:[
                                            {value:leaveTime[i], name:txtName},
                                            {value:allTime[i], name:'实际工时'}
                                        ],
                                        itemStyle: {
                                            emphasis: {
                                                shadowBlur: 10,
                                                shadowOffsetX: 0,
                                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                                            }
                                        }
                                    }
                                ]
                            };
                            let proBar= this.$echarts.init(document.getElementById("workHours"+i)); //实时统计
                            proBar.setOption(option);
                        }
                    },0)

                }
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
