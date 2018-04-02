<style scoped>
    .search .el-input {
        width: auto;
    }

    .table-list {
        margin-top: 10px;
        text-align: center !important;
    }

    .table-list table th div {
        text-align: center !important;
    }

    .el-table--border tr td:last-child, .el-table--border tr th:last-child {
        border-right: 0 !important;
    }

    .el-button--small {
        padding: 6px 10px;
    }

    .el-button + .el-button {
        margin-left: 3px;
    }

</style>
<style>
    .rolemanage .el-table--border tr td:last-child,
    .rolemanage .el-table--border tr th:last-child {
        border-right: none;
    }

    .rolemanage .el-table td {
        padding: 6px 0!important;
    }
</style>
<style lang="less">
@import '../commonless/tree_and_table.less';
</style>
<template>
    <div class="rolemanage common-card-wrap" style="height: 100%;">
        <el-card class="box-card">
            <div class="text item">
                <div class="content">
                    <div class="action handle-bar">
                        <el-button type="danger" @click="showdialog" size="mini">新建系统</el-button>
                    </div>
                    <div class="table-list">
                        <div class="left-tree">
                            <div class="left-tree-title">选择系统</div>
                            <el-tree :data="treeData" @node-click="leftTreeClick"></el-tree>
                        </div>
                        <el-table class="right-table" :data="tableData" border :height="tableHeight"
                                  empty-text="请选择系统或当前系统没有数据">
                            <el-table-column align="center" prop="system_NAME" label="子系统"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </el-card>
        <!--新增系统弹窗-->
        <el-dialog title="新建系统" :visible="dialog.dialogVisible" append-to-body modal-append-to-body :before-close="closeAddDialog">
            <el-form label-width="80px">
                <el-row>
                    <el-col>
                        <el-form-item label="系统">
                            <el-select v-model="dialog.system" placeholder="请选择"  filterable allow-create @change="systemOpt" style="width:43%">
                                <el-option
                                        v-for="item in dialog.systemSelect"
                                        :label="item.system_NAME"
                                        :value="item.system_ID"
                                        :key="item.system_ID"
                                ></el-option>
                            </el-select>
                            <el-input v-model="dialog.systemperson" v-if="dialog.systempvisibble" placeholder="维护人" style="width: 43%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="subsystem" :span='24' style='position: relative;'>
                        <el-form-item label="子系统" class='sunSystem' v-for="(item,index) in dialog.systemAll">
                            <el-input v-model="item.SYSTEM_NAME" placeholder="请填写子系统" style="width: 43%;" ></el-input>

                            <el-input v-model="item.SYSTEM_USER" placeholder="维护人" style="width: 43%;"></el-input>
                            <i
                                    :class="index == 0 && dialog.systemAll.length ==1?'el-icon-plus':index == dialog.systemAll.length-1?'el-icon-plus':'el-icon-minus'"
                                    @click="addsubStystem(index,$event)"
                                    style="line-height: 40px;height: 40px;text-align: right; font-size: 20px;cursor: pointer;font-weight: bold;width: 9%;top: 0;right: -35px;">
                            </i>

                        </el-form-item>
                    </el-col>
                    <el-col style="text-align: center;">
                        <el-button type="primary" @click="postSystem" size="medium">提交</el-button>
                        <el-button @click="backPage" size="medium">返回</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                search: "",
                tableData: [],
                tableHeight: "auto",
                treeData: [],
                leftTreeData: [],
                dialog:{
                        name:'',
                        systemperson:'',//涉及系统维护人
                        systempvisibble:false,//涉及系统维护人是否显示
                        system:'',//涉及系统
                        dialogVisible: false,
                        classic:[],
                        systemSelect:[],//涉及系统选项
                        systemAll: [{"SYSTEM_NAME": "",'SYSTEM_USER':""}],//子系统
                },
            }
        },
        mounted(){
            this.calculate();
            this.loadData()
        },
        methods: {
            calculate(){
                let height = document.querySelector(".mainr").offsetHeight;
                let leftTree = document.querySelector(".left-tree");
                let card_body = document.querySelector(".box-card .el-card__body");
                card_body.style.height = ( height - 34) - + "px";
                //                         总高度        -   卡片头高度     -card_body上下padding-操作栏高度28-margin-top的15px
                leftTree.style.height = (height - 34)  - 20 - 28 - 15 + "px";
                this.tableHeight = (height - 34)  - 20 - 28 - 15;
            },
            loadData(){
                this.tableData =[]
                let params = new URLSearchParams();
                this.$maskin();
                this.$axios.post("golive/systeml", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        let arr = [];
                        for (let i of data.result) {
                            if (!i.system_FID) {
                                let obj = {
                                    "label": i.system_NAME,
                                    "id": i.system_ID,
                                    "children": [],
                                    "subsystem": i.systemlist,
                                };
                                for (let j of data.result) {
                                    if (j.system_FID && (j.system_FID == i.system_ID)) {
                                        let childerenObj = {
                                            "label": j.system_NAME,
                                            "id": j.system_ID,
                                            "subsystem": j.systemlist,
                                        };

                                        obj.children.push(childerenObj)
                                    }
                                    else{
                                    }
                                }
                                arr.push(obj)
                            }
                        }
                        this.treeData = arr;
                        this.$maskoff()
                    }
                })
            },
            //新建系统的系统选择
            showdialog(){
                this.dialog.dialogVisible=true;
                this.calculate()
                let params = new URLSearchParams();
                this.$axios.post('/golive/systemlists', params).then((res) => {
                    if(res.data.code=200){
                        let systems=[];
                        let data = res.data.result;
                        for(let i of data){
                            systems.push(i);
                        }
                        this.$set(this.dialog, "systemSelect", systems);//系统
                    }
                })
            },
//            涉及系统选择时时候是否显示维护人
            systemOpt(val){
                let systemList=[]
                for(let i of this.dialog.systemSelect){
                    systemList.push(i.system_ID)
                }
                if(systemList.indexOf(val)==-1){
                    this.dialog.systempvisibble=true
                }
                else{
                    this.dialog.systempvisibble=false
                }
           },
            //新建系统提交
            postSystem(){
                let params = new URLSearchParams();
                let subSystem=[]
                let systemList=[];  //系统列表
//                如果涉及系统为空
                if(!this.dialog.system){
                    this.$warn('涉及系统不能为空');
                    return;
                }
//                如果涉及系统不为空
                else{
                    for(let i of this.dialog.systemSelect){
                        systemList.push(i.system_ID)
                    }
                    if(systemList.indexOf(this.dialog.system)==-1){  //如果是新添加的系统
                        if(!this.dialog.systemperson){
                            this.$warn('涉及系统维护人不能为空');
                            return
                        }
                        else{
                            params.append("SYSTEM_NAME",this.dialog.system);//如果是新的涉及系统就传值新的系统name
                        }

                    }
                    else{
                        params.append("SYSTEM_ID",this.dialog.system);//如果是已存在的涉及系统 就传值系统id
                    }
                }
                for(let i of this.dialog.systemAll){
                    if(systemList.indexOf(this.dialog.system) >=0 ){  //如果不是新的涉及系统  子系统必填
                        if(!i.SYSTEM_NAME){
                            this.$warn('请填写子系统')
                            return
                        }
                        if(!i.SYSTEM_USER){
                            this.$warn('请填写子系统维护人')
                            return
                        }
                    }
                    if( subSystem.indexOf(i.SYSTEM_NAME)==-1){
                        subSystem.push(i)
                    }
                    else{
                        this.$warn('请填写不同的子系统')
                        return
                    }
                }
                params.append("bice",JSON.stringify(subSystem));
                params.append("SYSTEM_USER",this.dialog.systemperson);
                this.$axios.post('/version/addSystem ', params).then((res) => {
                    if(res.data.code=200){
                        let data=res.data.result;
                        this.loadData();
                        this.clearAddData();
                        this.dialog.systempvisibble=false
                    }
                })

                this.dialog.dialogVisible = false;
                this.loadData();
                return;
            },
            //追加子系统
            addsubStystem(index, e){
                let type = e.target.className
                if (type == "el-icon-plus") {
                    if (!this.dialog.systemAll[index].SYSTEM_NAME) {
                        this.$warn("请先填写子系统");
                        return
                    }
                    if (!this.dialog.systemAll[index].SYSTEM_USER) {
                        this.$warn("请先填写子系统维护人");
                        return
                    }
                    else{
                        let subSystem=[];
                        for(let i of this.dialog.systemAll){
//                            let SYSTEM_NAME=i.SYSTEM_NAME;
//                            if(subSystem.indexOf(SYSTEM_NAME)==-1){
//                                subSystem.push(SYSTEM_NAME);
//                            }
                            let SYSTEM_NAME=i.SYSTEM_NAME;
                            if(subSystem.indexOf(SYSTEM_NAME)==-1){
                                subSystem.push(i);
                            }
                            else{
                                this.dialog.systemAll[index].SYSTEM_NAME=''
                                this.$warn("请填写不同的子系统");
                                return
                            }
                        }
                        this.dialog.systemAll.push({"SYSTEM_NAME": "","SYSTEM_USER":''});
                    }
                }
                else {
                    this.dialog.systemAll.splice(index, 1)
                }

            },
            closeAddDialog(){
                this.clearAddData();
                this.dialog.dialogVisible = false
            },
            //清除新增新增的表单
            clearAddData(){
                let len=this.dialog.systemAll.length-1;
                for (let i of this.dialog.systemAll) {
                    i.SYSTEM_USER='';
                    i.SYSTEM_NAME='';
                }
                this.dialog.systemAll.splice(0,len)
                this.dialog.system='';
            },
            //返回
            backPage(val){
                this.loadData();
                this.clearAddData();
                this.dialog.dialogVisible = false
            },
            leftTreeClick(val){
                this.tableData = val.subsystem
            },
            editRow(el, scope){

            },
        }
    }
</script>
