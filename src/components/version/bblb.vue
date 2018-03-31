<style scoped>
    @import "../../static/css/table.css";
    @import "../../static/css/console.css";

    .search .el-input {
        width: auto;
    }

    .back {
        position: absolute;
        left: 0;
        top: 0;
        font-size: 13px;
        cursor: pointer;
        line-height: 21px;
    }

    .back i.b {
        color: #606266;
        font-style: normal;
    }

    .el-date-editor--datetimerange.el-input__inner {
        width: 370px;
    }

    .el-textarea textarea {
        height: 100px;
    }

    .el-table td, .el-table th {
        padding: 5px 0;
        text-align: center;
    }

    .el-button {
        padding: 6px 10px;
    }

    .console-tab-content .add {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        font-size: 20px;
        cursor: pointer;
        vertical-align: middle;
        /*margin-left:10px;*/
    }

    .edition-line {
        background: #EEEEEE;
        /*padding: 0 20px;*/
        padding: 0 3%;
    }

    .edition-line ul li span {
        display: inline-block;
        width: 96%;
        border-bottom: 3px solid #666;
        position: absolute;
        top: 30%;
        margin-top: -1px;
        left: 12px;

    }

    .edition-line {
        margin: 0 auto;
    }

    .edition-line ul {
        height: 50px;
    }

    .edition-line ul li {
        height: 50px;
        position: relative;
        float: left;
    }

    .edition-line li em {
        width: 16px;
        float: left;
        height: 16px;
        background: white;
        background-size: 20px 19px;
        position: absolute;
        left: -2px;
        top: 30%;
        cursor: pointer;
        border-radius: 50px;
        border: 1px solid #333333;
    }

    .edition-line li span {
        left: 20px;
        width: 80%;
        height: 10px;
    }

    .edition-line li p.banP {
        position: absolute;
        top: 60%;
        left: -17px;
        width: 100%;
        text-align: left;
    }

    .edition-line li.last_li span {
        width: 0;
    }

    .edition-line li .infoDiv {
        position: absolute;
        width: 180px;
        left: 7px;
        bottom: 35px;
        padding: 5px 10px;
        background: #939da9;
        z-index: 100;
        color: white;
        border-radius: 5px;
    }

    .edition-line li .infoDiv p {
        word-break: break-all;
    }

    .el-dialog__body .el-select {
        width: 100%;
    }

    .detail-table.el-table td {
        padding: 0;
        text-align: center !important;
    }

    .el-table th > .cell {
        text-align: center !important;
    }

    .el-table .cell {
        text-align: center !important;
    }

    .tab-opt {
        color: orange;
        text-decoration: underline;
        display: inline-block;
        width: 90px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
<style>
    .left-tree {
        width: 19%;
        float: left;
        border: 1px solid #ebeef5;
        margin-right: 1%;
        /*padding-top: 47px;*/
        overflow: auto;
    }

    .right-table {
        float: left;
        padding: 0px;
        width: 80%;
    }

    .role-tree-title {
        height: 47px;
        width: 100%;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
        background: #939da9;
        color: #fff;
        font-weight: bold;
    }

    .role-tree .el-tree-node, .el-tree-node__content {
        min-height: 39px;
        box-sizing: border-box;
    }

    .role-tree {
        width: 15.5%;
        float: left;
        border: 1px solid #ebeef5;
        margin-right: 1%;
        overflow: auto;
    }

    .el-dialog--center .el-dialog__body {
        padding-top: 0px !important;
    }
</style>

<template>


                <!--</div>-->
                <!--详情表格-->
                <!--<el-dialog :title="dialogOption.dialogTitle" :visible="dialogOption.dialog_person_visible" center-->
                <!--label-position="left" width="70%" append-to-body modal-append-to-body :before-close="closeDialog">-->
                <!--<div class="console-tab-content">-->
                <!--<div class="table-list">-->
                <!--<el-table class='detail-table' :data="table.tableDetail" border-->
                <!--style="width: 100%;text-align: center;"-->
                <!--:height="table.tableHeight" highlight-current-row>-->
                <!--<el-table-column prop="system_FNAME" label="涉及系统"-->
                <!--show-overflow-tooltip></el-table-column>-->
                <!--<el-table-column prop="system_NAME" label="子系统" width="110"-->
                <!--show-overflow-tooltip></el-table-column>-->
                <!--<el-table-column prop="new_VERSION" label="版本号"-->
                <!--show-overflow-tooltip></el-table-column>-->
                <!--<el-table-column prop="current_STATE" label="当前版本" width="110"-->
                <!--show-overflow-tooltip></el-table-column>-->
                <!--<el-table-column prop="start_DATE" label="启用日期"-->
                <!--show-overflow-tooltip></el-table-column>-->
                <!--<el-table-column prop="start_TIME" label="启用时间"-->
                <!--show-overflow-tooltip></el-table-column>-->
                <!--<el-table-column prop="neel_DESCRIPTION" label="需求名称"-->
                <!--show-overflow-tooltip>-->
                <!--<template slot-scope="scope">-->
                <!--<div @click="goneeds($event,scope.row)" :title=scope.row.neel_DESCRIPTION class="tab-opt neel_DESCRIPTION" style="line-height:1;"-->
                <!--:data-text="scope.row.neel_DESCRIPTION">{{scope.row.neel_DESCRIPTION}}</div>-->
                <!--</template>-->
                <!--</el-table-column>-->
                <!--</el-table>-->
                <!--</div>-->
                <!--<div class="edition-line clearfix" v-if="dialogOption.dialog_person_visible">-->
                <!--<ul class="edition-line-ul clearfix">-->
                <!--<li v-for='(item,index) in tabs.versionLine'-->
                <!--:style="{ width: tabs.width}" v-model="item.version"-->
                <!--:class="index==tabs.versionLine.length-1?'last_li':'line_li'">-->
                <!--<em @mouseover="showInfo(index)" @mouseleave="hiddenInfo(index)"></em>-->
                <!--<span></span>-->
                <!--<p class="banP">{{item.new_VERSION}}</p>-->
                <!--<div class="infoDiv" style=""-->
                <!--v-if="tabs.infoshowVisible && tabs.activeLineIndex == index"-->
                <!--v-model="tabs.infoshowVisible">-->
                <!--<p>操作人：{{item.user_NAME}}</p>-->
                <!--<p>操作说明：{{item.czsm}}</p>-->
                <!--</div>-->
                <!--</li>-->
                <!--</ul>-->
                <!--</div>-->
                <!--</div>-->
                <!--</el-tabs>-->
                <!--<div slot="footer" class="dialog-footer">-->
                <!--<el-button size="mini" @click="cancelForm">关闭</el-button>-->
                <!--</div>-->
                <!--</el-dialog>-->

</template>

<script>
    export default {
        data(){
            return {
                treeData: [],
                dialog: {
                    name: '',
                    systemValue: '',
                    subsystemValue: '',
                    dialogVisible: false,
                    classic: [],
                    systemSelect: [],
                    subSystemSelect: [],
                    banben: '',
                },
                errorVisible: false,
                table: {
                    tableData: [],
                    tableOriginData: [],
                    tableDetail: [],
                    tableHeight: "",

                },
                keyword: "",
                options: {
                    name: '',
                    value: ''
                },
                selectValue: "全部",
                form: {},
                error: {
                    disabled: true
                },
                tabs: {
                    versionLine: [{
                        'version': ''
                    }],
                    activeTableInfo: "",
                    form: {
                        bianhao: "",
                        fxry: "",
                        gzmsh: "",
                        yx: "",
                        fx: "",
                    },
                    activeLineIndex: "",
                    activeName: 'info',
                    consoleActionVisible: false,
                    consoleWrapperVisible: false,
                    infoshowVisible: false,
                    width: '',
                },
                addneeds: {
                    addInsetvisible: true,
                    addvisible: false,
                    changeInset: false,
                    addform: {
                        name: ""
                    },
                    sysName: {
                        name: ""
                    }
                },
                dialogOption: {
                    lockScroll: false,
                    appendToBody: false,
                    dialog_person_visible: false,
                    dialog_dep_visible: false,
                    showClose: false,
                    dialogTitle: "",
                    modal: false,
                    infoShow: false
                },
            }
        },
        mounted(){
            this.calculate();
            this.loadData();
        },
        methods: {
            calculate(){
//                let height = document.querySelector(".mainr").offsetHeight;
////                let card_header_height = document.querySelector(".el-card__header").offsetHeight;
//                let card_body = document.querySelector(".box-card .el-card__body");
//                card_body.style.height = ( height - 34) + "px";
//                //                         总高度        -   卡片头高度     -card_body上下padding-操作栏高度28-margin-top的15px
//                this.tableHeight = (height - 36) - 20 - 28 - 15;


                let height = document.querySelector(".mainr").offsetHeight;
//                let card_header_height = document.querySelector(".el-card__header").offsetHeight;
                let card_body = document.querySelector(".box-card .el-card__body");
                card_body.style.height = height - 36 + "px";
                //表格高度
                this.calculateTableHeight(this.tabs.consoleWrapperVisible);
                //tab高度
                if (this.tabs.consoleWrapperVisible) {
                    this.calculateTabsHeight();
                }
            },
            calculateTableHeight(type){
                let leftTree = document.querySelector(".left-tree");
                let height = document.querySelector(".mainr").offsetHeight;
                let actionHeight = document.querySelector(".content .action").offsetHeight;
                leftTree.style.height = height - 36 - actionHeight - 20 - 20 - 2 + "px";
                //true代表没有控制台
                if (!type) {
                    //-----------------------body的上下padding--table的margin-top-卡片头部
                    this.table.tableHeight = height - 36 - actionHeight - 20 - 20 - 2;
                } else {
                    this.table.tableHeight = height * 0.3;
                }
            },
            calculateTabsHeight(){
                let card_body = document.querySelector(".box-card .el-card__body");
                let actionHeight = document.querySelector(".content .action").offsetHeight;
                let allTabContent = document.querySelectorAll(".console-tab-content");
                for (let i of allTabContent) {
                    //---------------el-card__body的可用内容高---------顶部操作栏的高---------表格部分的高------tab的头和margin的高----------操作台border-卡片头部
                    i.style.height = (parseInt(card_body.style.height) - 20 ) - actionHeight - (this.table.tableHeight + 20) - (20 + 40) - 2 + "px";
                }
            },
            //表格渲染
            loadData(){
                this.$maskin();
                this.calculate()
                let params = new URLSearchParams();
                this.$axios.post('/version/versionlist', params).then((res) => {
                    if (res.code = 200) {
                        let sysArr = []
                        let data = res.data.result;
                        let temp = []
                        for (let i of data) {
                            let obj = {
                                "label": i.system_FNAME,
                                "id": i.system_ID,
                            };
                            if (temp.indexOf(i.system_ID) == -1) {
                                temp.push(i.system_ID)
                                sysArr.push(obj)
                            }
                        }
                        this.treeData = sysArr;
                        this.$maskoff();
                    }
//                    else {
//                        this.warn(message);
//                    }
                })
            },
            setTableData(data){
                this.$set(this.table, "tableData", data);
                this.$set(this.table, "tableOriginData", data);
                this.$maskoff();
            },
            //版本详情显示
            handleCurrentChange(val){
                this.$maskin();
                if (!this.tabs.consoleWrapperVisible) {
                    this.tabs.consoleWrapperVisible = true;
                    setTimeout(() => {
                        this.calculate()
                    }, 0);
                }
                let params = new URLSearchParams();
                if (val.neel_ID) {
                    params.append("NEEL_ID", val.neel_ID);
                    params.append("SYSTEM_ID", val.system_ID);
                    params.append("SUBSYSTEM", val.subsystem);
                } else {
                    params.append("SYSTEM_ID", val.system_ID);
                    params.append("SUBSYSTEM", val.subsystem);
                }
                this.$axios.post("/version/sonversionlist", params).then((res) => {
                    if (res.data.code == 200) {
                        let data = res.data.result;
//                        let versionNum = data.length;
                        let arr = [];
                        let nowArr
                        let versionP = []
                        for (let i of data) {
                            if (i.start_DATE) {
                                versionP.push(i);
                            }
                            if (i.current_STATE == 1) {
                                i.current_STATE = '是'
                                nowArr = i
                            }
                            else {
                                i.current_STATE = '';
                            }
                            arr.push(i);
                        }
                        let versionNum = versionP.length;
                        console.log(versionNum)
                        this.$set(this.table, "tableDetail", arr);
                        for (let i = 0; i < versionNum; i++) {
                            this.tabs.versionLine.push();
                            let width = 100 / (versionNum + 1) + "%"
                            this.$set(this.tabs, "width", width);
                        }
//                        最后一个不是当前版本

                        if (versionNum >= 1) {
                            if (versionP[versionNum - 1].current_STATE == '') {  //如果最后一个不是当前版本
                                if (nowArr) {
                                    versionP.push(nowArr);
                                }
                            }
                        }

                        this.$set(this.tabs, "versionLine", versionP);
                        this.dialogOption.dialog_person_visible = true;
                        this.$maskoff();
                    }
                })
                return false;
            },
//            handleCurrentChange(val){
//                this.calculate()
//                this.calculateTableHeight()
//                this.calculateTabsHeight()
//                if (!this.tabs.consoleWrapperVisible) {
//                    this.tabs.consoleWrapperVisible = true;
//                    setTimeout(() => {
//                        this.calculate()
//                    }, 0);
//                }
//                let params = new URLSearchParams();
//                if (val.neel_ID) {
//                    params.append("NEEL_ID", val.neel_ID);
//                    params.append("SYSTEM_ID", val.system_ID);
//                    params.append("SUBSYSTEM", val.subsystem);
//                } else {
//                    params.append("SYSTEM_ID", val.system_ID);
//                    params.append("SUBSYSTEM", val.subsystem);
//                }
//                this.$axios.post("/version/sonversionlist", params).then((res) => {
//                    if (res.data.code == 200) {
//                        let data = res.data.result;
//                        let versionNum = data.length;
//                        let arr = [];
//                        let versionP = []
//                        for (let i of data) {
//                            versionP.push(i);
//                            if (i.current_STATE == 1) {
//                                i.current_STATE = '是'
//                            }
//                            else {
//                                i.current_STATE = '';
//                            }
//
//                            arr.push(i);
//                        }
//                        this.$set(this.table, "tableDetail", arr);
//                        this.$set(this.tabs, "versionLine", versionP);
//                        for (let i = 0; i < versionNum; i++) {
//                            this.tabs.versionLine.push();
//                            let width = 100 / (versionNum + 1) + "%"
//                            this.$set(this.tabs, "width", width);
//                        }
//
//                    }
//                })
//                return false;
//            },
            //版本轴信息显示
            showInfo(index){
                this.tabs.infoshowVisible = true;
                this.tabs.activeLineIndex = index
            },
            //版本轴信息隐藏
            hiddenInfo(){
                this.tabs.infoshowVisible = false;
                this.tabs.activeLineIndex = ""
            },

            //添加版本
            showdialog(){
                this.dialog.dialogVisible = true;
                this.calculate()
                let params = new URLSearchParams();
                this.$axios.post('/golive/systemlist', params).then((res) => {
                    if (res.data.code = 200) {
                        let systems = [];
                        let data = res.data.result;
                        for (let i of data) {
                            systems.push(i);
                        }
                        this.$set(this.dialog, "systemSelect", systems);//系统
                    }
                })
//                })
            },
            systemOpt(){
                let params = new URLSearchParams();
                let systemId = this.dialog.systemValue.split("-")[0]
                params.append("SYSTEM_ID", systemId);
                this.$axios.post('/golive/systemson', params).then((res) => {
                    if (res.data.code = 200) {
                        let subsystems = [];
                        let data = res.data.result;
                        for (let i of data) {
                            subsystems.push(i);
                        }
                        this.$set(this.dialog, "subSystemSelect", subsystems);//子系统
                    }
                })
            },
            //添加版本提交
            postSystem(){
                let params = new URLSearchParams();
                let subSystem = []
                let systemList = [];
                if (!this.dialog.systemValue) {
//                    this.$warn('涉及系统不能为空');
                    this.$warn('请填写完整信息');
                    return;
                }
                if (!this.dialog.subsystemValue) {
//                    this.$warn('子系统系统不能为空');
                    this.$warn('请填写完整信息');
                    return;
                }
                if (!this.dialog.banben) {
//                    this.$warn('版本不能为空');
                    this.$warn('请填写完整信息');
                    return;
                }
                let reg = /^\d+\.\d+\.\d+$/;
                if (!reg.test(this.dialog.banben)) {
                    this.$warn("版本号格式有误");
                    return;
                }
                params.append("SYSTEM_ID", this.dialog.systemValue.split("-")[0])//涉及系统id
                params.append("SYSTEM_NAME", this.dialog.systemValue.split("-")[1])//涉及系统名称
                params.append("SYSTEM_SID", this.dialog.subsystemValue.split("-")[0])//子系统id
                params.append("SYSTEM_SNAME", this.dialog.subsystemValue.split("-")[1])//子系统名称
                params.append("NEW_VERSION", 'v' + this.dialog.banben)//版本号
                this.$axios.post('/version/addversion ', params).then((res) => {
                    if (res.data.code = 200) {
                        let data = res.data.result;
//                        this.loadData();
//                        this.clearAddData();
                    }
                    else {
                        this.$warn(message);
                    }
                })
                this.loadData();
                this.clearAddData();
                this.dialog.dialogVisible = false;
                return
            },
            //搜索
            searchKeyword(e){
                this.setConsoleVisible()
                if (e.keyCode == 13) {
                    let params = new URLSearchParams();
                    params.append("SOUSS", this.keyword);
                    this.$axios.post('/version/versionlist', params).then((res) => {
                        if (res.code = 200) {

                            let data = res.data.result
                            this.setTableData(data);

                        }
                        else {
                            this.warn(message);
                        }
                    })
                }
            },
            setConsoleVisible(){
                this.tabs.consoleWrapperVisible = false;
                this.calculateTableHeight(false)
            },
//         //弹窗关闭
            closeAddDialog(){
                this.clearAddData();
                this.dialog.dialogVisible = false
            },
            //清除新增新增的表单
            clearAddData(){
                for (let i in this.dialog) {
                    this.dialog[i] = "";
                }
//                this.dialog.systemSelect = '';
//                this.dialog.subsystem = '';
//                this.dialog.banben = '';
            },
            tabClick(val){
                this.calculateTabsHeight();
            },
            //返回
            backPage(val){
                this.loadData();
                this.clearAddData();
                this.dialog.dialogVisible = false
            },
//            点击左侧树
            leftTreeClick(val){
                let params = new URLSearchParams();
                params.append('SYSTEM_ID', val.id);
                this.$axios.post("/version/versionlist", params).then((res) => {
                    if (res.status = 200) {
                        let subsystems = [];
                        let data = res.data.result;
                        for (let i of data) {
                            subsystems.push(i);
                        }
                        this.$set(this.table, "tableData", subsystems);//子系统
                    }
                })
            },
            closeDialog(){
                this.dialogOption.dialog_person_visible = false;
            },
            cancelForm(){
                this.dialogOption.dialog_person_visible = false;
            },
            //跳转到需求页面
            goneeds(e, val){
                e.stopPropagation();
                let path = "";
                if (val.bs == "TECH") {
                    path = "技术需求"
                }
                if (val.bs == "PROD") {
                    path = "业务需求"
                }
                this.$go("", "", {"neelId": val.neel_ID}, path);
            }
        }
    }
</script>