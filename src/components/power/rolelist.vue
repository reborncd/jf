<style scoped>
    .search .el-input {
        width: auto;
    }

    .table-list {
        margin-top: 15px;
        text-align: center !important;
    }

    .table-list table th div {
        text-align: center !important;
    }

    .left-tree {
        width: 14%;
        float: left;
        border: 1px solid #ebeef5;
        margin-right: 1%;
        padding-top: 47px;
        overflow: auto;
    }

    .el-button--small {
        padding: 6px 10px;
    }

    .el-button + .el-button {
        margin-left: 3px;
    }

    /*弹窗*/

    .el-dialog__wrapper {
        overflow: visible;
    }

    .el-dialog__body {
        height: 300px;
        overflow-y: auto;
    }

    .el-dialog__body .el-select {
        width: 100%;
    }

    .el-dialog__body .el-form-item {
        margin-bottom: 10px;
    }

    .roleInfodialog .el-form-item {
        line-height: 24px !important;
        margin: 0;
    }
</style>
<style>
    .rolelist .el-table--border tr td:last-child,
    .rolelist .el-table--border tr th:last-child {
        border-right: none;
    }

    .rolelist .el-table td {
        padding: 6px 0 !important;
    }
</style>
<template>
    <div class="rolelist common-card-wrap" style="height: 100%;">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="card-title">人员配置</span>
            </div>
            <div class="text item">
                <div class="content">
                    <div class="action clear">
                        <!--<el-button size="mini" type="primary" @click="createRole">新增职位</el-button>-->
                        <!--<router-link to="rolemanage">-->
                            <!--<el-button size="mini">角色管理</el-button>-->
                        <!--</router-link>-->
                        <div class="search fr">
                            <el-checkbox v-model="configChecked" @change="filterChangeEvent"
                                         style="margin-right: 10px;">只显示未配置人员
                            </el-checkbox>
                            <!--<el-checkbox v-model="leaveChecked" @change="filterChangeEvent" style="margin-right: 10px;">-->
                                <!--显示离职人员-->
                            <!--</el-checkbox>-->
                            <el-input size="mini" v-model="keyword" placeholder="输入检索关键字" clearable @change="searchKeyword"
                                      @keyup.13="searchKeyword"></el-input>
                            <el-button size="mini" type="primary" @click="searchKeyword">检索</el-button>
                        </div>
                    </div>
                    <div class="table-list">
                        <div class="left-tree">
                            <el-tree :data="treeDate" @node-click="leftTreeClick"></el-tree>
                        </div>
                        <el-table stripe class="table_role fr" :data="tableData" border style="width:85%"
                                  :height="tableHeight">
                            <el-table-column align="center" prop="user_ACCOUNT" label="用户名" show-overflow-tooltip></el-table-column>
                            <el-table-column align="center" prop="user_NAME" label="姓名" show-overflow-tooltip></el-table-column>
                            <el-table-column align="center" prop="dept_name" label="所处部门" show-overflow-tooltip></el-table-column>
                            <el-table-column align="center" prop="role_NAME" label="角色" show-overflow-tooltip></el-table-column>
                            <el-table-column align="center" prop="position" label="职位" show-overflow-tooltip></el-table-column>
                            <el-table-column align="center" prop="label_LANGUAGE_NAME" label="开发语言" show-overflow-tooltip></el-table-column>
                            <el-table-column align="center" :formatter="formatter" label="职务状态" show-overflow-tooltip></el-table-column>
                            <!--:filter-method="filterTag"-->
                            <!--:filters="[{text:0,value:'离职'},{text:1,value:'在职'}]" -->
                            <el-table-column align="center" label="操作" width='250'>
                                <template slot-scope="scope">
                                    <el-button @click="editRow(scope.row,scope,'read')" size="small">查看</el-button>
                                    <el-button @click="editRow(scope.row,scope,'edit')" size="small"
                                               :disabled="scope.row.status == 0?true:false">编辑
                                    </el-button>
                                    <!--<el-button @click="rowAction(scope.row,scope,'leave')" size="small"-->
                                               <!--:disabled="scope.row.status == 0?true:false">离职-->
                                    <!--</el-button>-->
                                    <el-button @click="rowAction(scope.row,scope,'del')" size="small" type="danger">删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </el-card>
        <el-dialog :title="dialogOption.dialogTitle" :visible="dialogOption.dialog_person_visible" center
                   label-position="left" width="50%" append-to-body modal-append-to-body :before-close="closeDialog">
            <el-form label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="dialogData.personData.user_ACCOUNT" disabled></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="dialogData.personData.user_NAME" disabled></el-input>
                </el-form-item>
                <el-form-item label="性别" v-if="dialogOption.infoShow">
                    <el-input v-model="dialogData.personData.sex" disabled></el-input>
                </el-form-item>
                <el-form-item label="所属部门">
                    <el-select v-model="dialogData.personData.chooseDept" clearable
                               :placeholder="dialogOption.infoShow?'':'请选择部门'" @change="chooseDeptEvent" :disabled="dialogOption.infoShow">
                        <el-option v-for="item in dialogData.personData.deptRoles" :label="item.dept_name"
                                   :value="item.dept_id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="dialogData.personData.chooseRole" clearable
                               :placeholder="dialogOption.infoShow?'':'请根据部门选择职位'" :disabled="dialogOption.infoShow">
                        <el-option v-for="item in dialogData.personData.deptRoles_choosen" :label="item.role_NAME"
                                   :value="item.role_ID"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职位">
                    <el-input v-model="dialogData.personData.position"></el-input>
                </el-form-item>
                <el-form-item label="开发语言">
                    <el-select v-model="dialogData.personData.chooseLanguage" clearable
                               :placeholder="dialogOption.infoShow?'':'请选择开发语言'"
                               :disabled="dialogOption.infoShow">
                        <el-option v-for="item in dialogData.personData.languages" :label="item.LABEL_LANGUAGE_NAME"
                                   :value="item.LABEL_LANGUAGE_ID"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="直属上级">
                    <el-select v-model="dialogData.personData.choosedeptUser" filterable clearable
                               :placeholder="dialogOption.infoShow?'':'请选择直属上级'"
                               style="width: 48%;margin-right: 2%;" @change="choosedeptUser"
                               :disabled="dialogOption.infoShow">
                        <el-option v-for="item in dialogData.personData.deptUsers" :label="item.dept_name"
                                   :value="item.dept_id"></el-option>
                    </el-select>
                    <el-select v-model="dialogData.personData.choosedeptUserId" filterable clearable
                               :placeholder="dialogOption.infoShow?'':'请选择负责人'"
                               style="width: 48%" :disabled="dialogOption.infoShow">
                        <el-option v-for="item in dialogData.personData.deptUsers_choosen" :label="item.user_NAME"
                                   :value="item.user_ID"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="在职时间" v-if="dialogOption.infoShow">
                    <el-input v-model="dialogData.personData.Days" disabled></el-input>
                </el-form-item>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" type="primary" @click="subForm" v-if="!dialogOption.infoShow">确 定</el-button>
                <el-button size="mini" @click="cancelForm">取 消</el-button>
            </div>
        </el-dialog>
    </div>

</template>
<script>
    export default {
        data(){
            return {
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
                dialogData: {
                    personData: {
                        user_ACCOUNT: "",//当前账号
                        user_NAME: "",//当前姓名
                        user_ID: "",//用户ID
                        deptRoles: [],//所属部门的数组
                        deptRoles_choosen: [],//选中所属部门后的对应数组
                        languages: [],//语言选择数组
                        deptUsers: [],//直属上级的数组
                        deptUsers_choosen: [],//选中直属上级后的对应数组
                        chooseDept: "",//选中的所属部门
                        chooseLanguage: "",//选中的开发语言
                        chooseRole: "",//选中的职位
                        choosedeptUser: "",//直属上级的部门id
                        choosedeptUserId: "",//直属上级的姓名id
                        Days:"",//在职时间
                        sex:"",//性别
                        position:"",//职位
                    },
                    deptData:{
                        roleDept:[],//根部门数组
                        subDept:[],//二级部门的数组
                        subDeptID:"",//已存在的二级部门的值，没意义只做展示
                        newDeptName:"",//新增部门的名称
                        fNewDeptId:""//新增父级部门的ID
                    }
                },
                configChecked: false,
                leaveChecked: false,
                keyword: "",
                tableData: [],
                tempTableData: [],
                tableHeight: "",
                treeDate: [],
                roleInfo: {}

            }
        },
        mounted(){
            this.calculate();
            this.loadData();
        },
        methods: {
            //加载数据
            loadData(){
                this.$maskin();
                let params = new URLSearchParams();
                this.$axios.post("role/queryDept", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
//                    树形菜单格式
//                        [{
//                            label: '一级 1',
//                            children: [{
//                                label: '二级 1-1',
//                                children: [{
//                                    label: '三级 1-1-1'
//                                }]
//                            }]
//                        }]
                        this.tableData = [];
                        this.tempTableData = [];
                        let treeArr = [{"label": "全部", "users": data.result.allUser}];
                        for (let i of data.result.deptUsers) {
                            if(!i.dept_fid){
                                let treeObj = {
                                    "label": i.dept_name,
                                    "children": [],
                                    "users":i.users
                                };
                                treeObj.users = i.users;//父级显示成员
                                for(let j of data.result.deptUsers){
                                    if (j.dept_fid && j.dept_fid == i.dept_id) {
                                        //当前不是父级，则把当前的信息添加到对应fID的父级进去
                                        let obj ={
                                            'label':j.dept_name,
                                            'id':j.dept_id,
                                            'users':j.users,
                                            "children":[]
                                        };
                                        for(let n of data.result.deptUsers){
                                            if(n.dept_fid && n.dept_fid == j.dept_id){
                                                let cobj = {
                                                    'label':n.dept_name,
                                                    'id':n.dept_id,
                                                    'users':n.users,
                                                };
                                                obj.children.push(cobj)
                                            }
                                        }
                                        treeObj.children.push(obj)
                                    }
                                }
                                treeArr.push(treeObj)
                            }
                        }
                        this.treeDate = treeArr;
                        for (let i of data.result.allUser) {
                            this.tableData.push(i);
                            this.tempTableData.push(i);
                        }
                        this.$maskoff()
                    }
//
                })
            },
            //计算高度
            calculate(){
                let height = document.querySelector(".mainr").offsetHeight;
                let leftTree = document.querySelector(".left-tree");
                let card_header_height = document.querySelector(".el-card__header").offsetHeight;
                let card_body = document.querySelector(".box-card .el-card__body");
                card_body.style.height = ( height - 34) - card_header_height + "px";
                //                         总高度        -   卡片头高度     -card_body上下padding-操作栏高度28-margin-top的15px
                leftTree.style.height = (height - 36) - card_header_height - 20 - 28 - 15 + "px";
                this.tableHeight = (height - 36) - card_header_height - 20 - 28 - 15;
            },
            closeDialog(){
              this.dialogOption.dialog_person_visible = false;
            },
            editRow(el, scope, type){
                this.$maskin();
                if (type == "edit") {
                    this.dialogOption.dialogTitle = "编辑配置";
                    this.dialogOption.infoShow = false;
                } else {
                    this.dialogOption.dialogTitle = "人员信息";
                    this.dialogOption.infoShow = true;
                }
                //置空之前的选项
                for(let i in this.dialogData.personData){
                    this.dialogData.personData[i] = "";
                }
                this.dialogData.personData.user_ACCOUNT = el.user_ACCOUNT;//回显账号
                this.dialogData.personData.user_NAME = el.user_NAME;//回显用户名
                this.dialogData.personData.user_ID = el.user_ID;
                this.dialogData.personData.position = el.position//回显职位
                let params = new URLSearchParams();
                params.append('USER_ID', el.user_ID);
                this.$axios.post("/role/editRoleMessage", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$set(this.dialogData.personData, "deptRoles", data.result.deptRoles);
                        this.$set(this.dialogData.personData, "languages", data.result.languages);
                        this.$set(this.dialogData.personData, "deptUsers", data.result.deptUsers);
                        if (el.dept_id) {//回显所处部门
                            this.dialogData.personData.chooseDept = el.dept_id;
                            this.chooseDeptEvent(el.dept_id);
                        }
                        if (el.role_ID) {
                            this.dialogData.personData.chooseRole = el.role_ID;//回显职位
                        }
                        if (el.label_LANGUAGE_ID) {
                            this.dialogData.personData.chooseLanguage = el.label_LANGUAGE_ID;//回显语言
                        }
                        if (data.result.FUSER_DEPT_ID) {
                            this.dialogData.personData.choosedeptUser = data.result.FUSER_DEPT_ID;//回显直属上级
                            this.choosedeptUser(data.result.FUSER_DEPT_ID);
                        }
                        if (data.result.FUSER_ID) {
                            this.dialogData.personData.choosedeptUserId = data.result.FUSER_ID;//回显负责人
                        }
                        this.dialogData.personData.sex = data.result.USER_SEX==0?"女":"男";
                        this.dialogData.personData.Days = data.result.Days?data.result.Days+"天":"";
                        this.$maskoff();
                        this.dialogOption.dialog_person_visible = true;
                    }
                })
            },
            rowAction(el, scope, type){
                this.confirm(type == "leave" ? "确定进行离职操作？" : "确定进行删除操作？", () => {
                    let params = new URLSearchParams();
                    params.append("USER_ID", el.user_ID);
                    params.append("STATUS", type == "leave" ? 0 : 2);
                    this.$axios.post("role/updateUserStatus", params).then((res) => {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$success("操作成功！");
                            this.loadData();
                        }
                    })
                });

            },

            subForm(){
                let personData = this.dialogData.personData;
                if(!personData.chooseDept){
                    this.$warn("请选择部门");
                    return;
                }
                if(!personData.chooseRole){
                    this.$warn("请选择角色");
                    return;
                }
                if(!personData.position){
                    this.$warn("请填写职位");
                    return;
                }
                let params = new URLSearchParams();
                params.append('USER_ID', personData.user_ID);
                params.append('ROLE_ID', personData.chooseRole);//所选角色
                params.append('DEPT_ID', personData.chooseDept);//所选部门
                params.append('USER_FID', personData.choosedeptUserId);//所选直属上级人员
                params.append('LABEL_LANGUAGE_ID', personData.chooseLanguage);//所选部门
                params.append("POSITION", personData.position);//所填 职位
                this.$axios.post("/role/addUserRole", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.dialogOption.dialog_person_visible = false;
                        this.loadData();
                        this.$success("编辑成功");
                    }
                });
            },
            cancelForm(){
                this.dialogOption.dialog_person_visible = false;
            },
            leftTreeClick(val){
                this.$set(this, "tableData", val.users)
            },
//            filterTag(value,row){
//                return row.tag === value;
//            }
            formatter(row, column) {
                return row.status == 0 ? "离职" : row.status == 1 ? "在职" : "";
            },
            chooseDeptEvent(value){
                //二级联动--选择职位
                this.$set(this.dialogData.personData, "deptRoles_choosen", []);
                this.dialogData.personData.chooseRole = "";
                let arr = [];
                for (let i of this.dialogData.personData.deptRoles) {
                    if (i.dept_id == value) {
                        for (let j of i.roles) {
                            arr.push(j)
                        }
                        break;
                    }
                }
                this.$set(this.dialogData.personData, "deptRoles_choosen", arr);
            },
            choosedeptUser(value){
                //二级联动--选择上级
                this.$set(this.dialogData.personData, "deptUsers_choosen", []);
                this.dialogData.personData.choosedeptUserId = "";
                let arr = [];
                for (let i of this.dialogData.personData.deptUsers) {
                    if (i.dept_id == value) {
                        for (let j of i.users) {
                            arr.push(j)
                        }
                        break;
                    }
                }
                this.$set(this.dialogData.personData, "deptUsers_choosen", arr);
            },
            filterChangeEvent(){
                this.filterCheck(this.configChecked, this.leaveChecked)
            },
            filterCheck(configChecked, leaveChecked){
                //筛选的情况判断
                if (configChecked && leaveChecked) {
                    //显示未配置，显示离职
                    let arr = [];
                    for (let i of this.tempTableData) {
                        if ((!i.role_NAME || !i.dept_name) && i.status == 0) {
                            arr.push(i)
                        }
                    }
                    this.$set(this, "tableData", arr);
                } else if (!configChecked && leaveChecked) {
                    //不显示未配置，显示离职
                    let arr = [];
                    for (let i of this.tempTableData) {
                        if (i.status == 0) {
                            arr.push(i)
                        }
                    }
                    this.$set(this, "tableData", arr);
                } else if (configChecked && !leaveChecked) {
                    //显示未配置，不显示离职
                    let arr = [];
                    for (let i of this.tempTableData) {
                        if (!i.role_NAME || !i.dept_name) {
                            arr.push(i)
                        }
                    }
                    this.$set(this, "tableData", arr)
                } else {
                    this.$set(this, "tableData", this.tempTableData)
                }
            },
            searchKeyword(e){
                if (this.keyword == "") {
                    this.$set(this, "tableData", this.tempTableData);
                } else {
                    //搜索功能
                    this.$maskin(1);
                    let arr = [];
                    for (let i of this.tempTableData) {
                        if (JSON.stringify(i).indexOf(this.keyword) >= 0) {
                            arr.push(i);
                        }
                    }
                    this.$set(this, "tableData", arr);
                    this.$maskoff();
                }
            },
        }
    }
</script>