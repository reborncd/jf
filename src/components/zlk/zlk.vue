<style scoped>
    @import "../../static/css/table.css";
    @import "../../static/css/console.css";
</style>
<style>
    .zlk .el-table .cell {
        text-align: center;
    }
    .docedit .el-select{
        width: 100%;
    }
    .docedit-wrap .el-form-item{
        margin-bottom: 10px;
    }
    .docedit-wrap .el-dialog__body{
        padding: 15px 20px;
    }
</style>
<style lang="less">
@import '../commonless/tree_and_table.less';
</style>
<template>
    <div class="zlk common-card-wrap" style="height: 100%;">
        <el-card class="box-card">
            <div class="text item">
                <div class="content">
                    <div class="handle-bar action">
                        <el-button type="danger" size="mini" @click="addZL">新资料</el-button>
                        <el-select v-model="selectValue" size="mini" @change="changeTree" filterable>
                            <el-option
                                    v-for="(item, index) in options"
                                    :label="item.key"
                                    :key="index"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="clear" >
                        <div class="tree-wrapper leftwrap left-tree">
                          <div class="left-tree-title">选择{{selectValue === '1'?'目录':'系统'}}</div>
                            <el-tree
                                    :data="leftData"
                                    ref="lefttree"
                                    highlight-current
                                    @node-click="leftclick">
                            </el-tree>
                        </div>
                        <div class="tree-wrapper rightwrap right-table">
                            <div class="table-list" style="margin-top: 0;">
                                <el-table :data="table.tableData" border style="width: 100%"
                                          :height="table.tableHeight"
                                          highlight-current-row>
                                    <el-table-column prop="datum_ID" label="文档编号"></el-table-column>
                                    <el-table-column prop="datum_NAME" label="文档名称"></el-table-column>
                                    <el-table-column prop="file_DESCRIPTIOON" label="文档简介"></el-table-column>
                                    <el-table-column prop="date_TIME" :formatter="dataFormatter" width="120"
                                                     label="录入时间"></el-table-column>
                                    <el-table-column prop="user_NAME" label="录入人员"></el-table-column>
                                    <el-table-column label="操作" width="150">
                                        <template slot-scope="scope">
                                            <el-button size="mini" type="primary"
                                                       @click="viewrow(scope.$index, scope.row)">查看
                                            </el-button>
                                            <el-button size="mini" type="primary"
                                                       @click="downloadrow(scope.$index, scope.row)">下载
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
        <!--新建资料-->
        <el-dialog class="docedit-wrap" title="新建资料" :visible="add.addvisible" width="50%"
                   append-to-body modal-append-to-body :before-close="closeDialog">
            <el-form label-width="100px">
                <el-row :md="24" :gutter="20">
                    <el-col :span="24" :md="24">
                        <el-form-item label="文档编号" class="docedit">
                            <el-col :span="8" style="padding-left: 0">
                                <el-select v-model="add.subform.company" placeholder="企业代号" filterable>
                                    <el-option
                                            v-for="item in add.subform.companyArr"
                                            :key="item.no_ID"
                                            :label="item.no_REMARK+'（'+item.no_NAME+'）'"
                                            :value="item.no_NAME">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="8" style="padding-left: 0">
                                <el-select v-model="add.subform.system" placeholder="系统代号" filterable>
                                    <el-option
                                            v-for="item in add.subform.systemArr"
                                            :key="item.no_ID"
                                            :label="item.no_REMARK+'（'+item.no_NAME+'）'"
                                            :value="item.no_NAME">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="8" style="padding-left: 0">
                                <el-select v-model="add.subform.doc" placeholder="文档类型" filterable>
                                    <el-option
                                            v-for="item in add.subform.docArr"
                                            :key="item.no_ID"
                                            :label="item.no_REMARK+'（'+item.no_NAME+'）'"
                                            :value="`${item.no_NAME}-${item.no_ID}`">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="6" style="padding-left: 0; margin-top: 10px">
                                <el-input v-model="add.subform.code" disabled size="small"></el-input>
                            </el-col>
                            <el-col :span="6" style="padding-left: 0; margin-top: 10px">
                                <el-input v-model="add.subform.year" disabled size="small"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :md="24">
                        <el-form-item label="文档名称">
                            <el-input v-model="add.subform.wordname"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :md="24">
                        <el-form-item label="文档名版本">
                            <el-col style="padding: 0">
                                <el-input v-model="add.subform.version">
                                    <template slot="prepend">V</template>
                                </el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :md="24">
                        <el-form-item label="关联系统" style="width: 100%">
                            <el-select v-model="add.subform.sysF" placeholder="请选择关联系统" filterable
                                       @change="sysChange" style="width: 50%">
                                <el-option
                                        v-for="item in add.subform.sysFather"
                                        :key="item.system_ID"
                                        :label="item.system_NAME"
                                        :value="item.system_ID+','+item.system_NAME">
                                </el-option>
                            </el-select>
                            <el-select v-model="add.subform.sysC" style="width: 50%; float: right" filterable placeholder="请选择关联系统">
                                <el-option
                                        v-for="item in add.subform.sysChild"
                                        :key="item.system_ID"
                                        :label="item.system_NAME"
                                        :value="item.system_ID+','+item.system_NAME">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :md="24">
                        <el-form-item label="录入人员" >
                            <el-input placeholder="请输入内容" v-model="add.subform.write_user">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :md="24">
                        <el-form-item label="文档简介">
                            <el-input
                                    type="textarea"
                                    :rows="4"
                                    placeholder="请输入内容"
                                    v-model="add.subform.intro">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :md="24">
                        <el-form-item label="上传文档" :span="12" :md="12">
                            <div style="position: relative;overflow: hidden">
                                <el-button type="primary" size="mini">上传附件</el-button>
                                <input type="file" @change="getFile" ref="fileUp" multiple="multiple" placeholder="上传附件"
                                       style="width:78px;height: 28px;opacity: 0;position: absolute;left: 0;top: 6px;">
                            </div>
                            <p v-for="(item,index) in add.subform.uploadFiles" :key="index">{{item.name}}
                                <i style="margin-left: 10px;cursor: pointer;color: red;"
                                   @click="add.subform.uploadFiles.splice(index,1);add.subform.fileIds.splice(index,1)"
                                   class="el-icon-close"></i>
                            </p>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="add.addvisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="subaddForm" size="mini">确 定</el-button>
            </div>
        </el-dialog>
        <!--下载-->
        <el-dialog title="下载资料" :visible="download.downloadvisible" width="80%"
                   append-to-body modal-append-to-body :before-close="closeDialog">
            <div class="table-list">
                <el-table :data="download.data" border style="width: 100%">
                    <el-table-column prop="at_FILENAME" label="文档名"></el-table-column>
                    <el-table-column prop="at_FILESIZE" :formatter="filesize" label="大小" width="100"></el-table-column>
                    <el-table-column label="操作" width=100>
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="dlFromTable(scope.row)">下载</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="download.downloadvisible = false" size="mini">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
    export default {
        props: {
            username: ''
        },
        data(){
            return {
                download: {
                    downloadvisible: false,
                    data: [],//表格数据
                },
                tableDataVisible: false,//表格数据的展示
                infoVisible: true,//详情页
                leftData: [],//左侧的树形菜单数据
                selectValue: "1",//选择的筛选的值
                options: [{"key": "按目录检索", "value": "1"}, {"key": "按系统检索", "value": "2"}],
                add: {
                    clickDataCopy: {},
                    addvisible: false,
                    subform: {
                        company: "",//企业值
                        companyArr: [],//企业代号数组
                        system: "",//系统代号值
                        systemArr: [],//系统代号数组
                        doc: "",//文档类型值
                        docArr: [],//文档类型数组
                        code: "",//文档呢编号
                        year: "",//编制年份
                        wordname: "",//文档名称
                        version: "",//文件版本
                        intro: "",//文档简介
                        write_user: this.username,// 录入人员
                        uploadFiles: [],//选中的文件
                        fileIds: [],//要上传的文件ID
                        dirFather: [],//目录位置的父位置
                        dirF: "",//选择的值
                        dirChild: [],//目录位置的子位置
                        dirC: "",//选择的值
                        sysFather: [],//系统的父级
                        sysF: "",//系统的父级的值
                        sysChildOrigin: [],//系统子集的源数据
                        sysChild: [],//系统的子集的数组
                        sysC: "",//系统的子集的值
                    }
                },
                table: {
                    tableHeight: "",//
                    tableOriginData: [],//表格源数据
                    tableData: [],//表格展示的数据
                },
            }
        },
        filters: {
            "yyyy-mm-dd": function (time) {
                let d = new Date(time);
                let year = d.getFullYear();
                let month = d.getMonth() + 1 < 10 ? '0' + d.getMonth() : '' + d.getMonth();
                let day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
                let hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours();
                let minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes();
                let seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : '' + d.getSeconds();
                return year + '-' + month + '-' + day;
            },
        },
        mounted(){
            this.loadData()
        },
        methods: {
            calculate(){
                let height = document.querySelector(".mainr").offsetHeight;
                let card_body = document.querySelector(".box-card .el-card__body");
                let treeWrap = document.querySelectorAll(".tree-wrapper");
                let actionHeight = document.querySelector(".content .action").offsetHeight;
                card_body.style.height = height - 36 + "px";
                for (let i of treeWrap) {
                    //
                    i.style.height = height - 36 - 20 - 20 - 1 - actionHeight + "px";
                    this.table.tableHeight = height - 36 - 20 - 20 - 1 - actionHeight;
                }
            },
            loadData(){
                this.calculate();
                //默认按目录搜索
                this.loadTreeByDir()
            },
            //按目录搜索
            loadTreeByDir(){
                this.$maskin();
                let params = new URLSearchParams();
                params.append("CONDITION_FLAG", 1);
                //按目录检索
                this.$axios.post("/datum/getMenuList1", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.calculate();
                        let arr = []
                        //建立树形图
                        for (let i of data.result.father) {
                            let fobj = {
                                "label": `${i.no_REMARK}（${i.no_NAME}）`,
                                no_ID: i.no_ID,
                                no_NAME: i.no_NAME,
                                no_TYPE: i.no_TYPE,
                                "children": []
                            }
                            for (let j of data.result.child) {
                                let obj = {
                                    label: j.system_NAME,
                                    system_ID: j.system_ID,
                                    system_FID: j.system_FID,
                                    no_ID: i.no_ID,
                                }
                                fobj.children.push(obj)
                            }
                            arr.push(fobj)
                        }
                        arr.map(item=>item.children=null);
                        this.$set(this, "leftData", arr)
                    }
                });
                this.getTreeTableData(1);
            },
            //按系统级检索
            loadTreeBySystem(){
                this.$maskin();
                let params = new URLSearchParams();
                params.append("CONDITION_FLAG", 2);
                //按目录检索
                this.$axios.post("/datum/getMenuList3", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.calculate();
                        let arr = []
                        //建立树形图
                        for (let i of data.result) {
                            if (!i.system_FID) {
                                let fobj = {
                                    "label": i.system_NAME,
                                    "system_NAME": i.system_NAME,
                                    "system_ID": i.system_ID,
                                    "children": []
                                };
                                for (let j of data.result) {
                                    if (j.system_FID == i.system_ID) {
                                        let obj = {
                                            "label": j.system_NAME,
                                            "system_NAME": j.system_NAME,
                                            "system_ID": j.system_ID,
                                            "system_FID": j.system_FID,
                                        };
                                        fobj.children.push(obj);
                                    }
                                }
                                arr.push(fobj)
                            }
                        }
                        this.$set(this, "leftData", arr)
                    }
                });
                this.getTreeTableData(2);
            },
            //加载所有表格数据
            getTreeTableData(type){
                let params = new URLSearchParams();
                params.append("CONDITION_FLAG", type);
                this.$axios.post("/datum/getDatumlist", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$set(this.table, "tableData", data.result);
                        this.$set(this.table, "tableOriginData", data.result);
                        this.$maskoff()
                    }
                });
            },
            //筛选框下拉事件
            changeTree(){
                if (this.selectValue == 1) {
                    this.loadTreeByDir()
                } else {
                    this.loadTreeBySystem()
                }
            },
            //关闭弹窗
            closeDialog(){
                if (this.download.downloadvisible) {
                    this.download.downloadvisible = false;
                } else {
                    this.add.addvisible = false;
                    let dialogData = this.add.subform;
                    for (let i in dialogData) {
                      if(typeof(dialogData[i]) === typeof([])){
                        dialogData[i] = [];
                      }else if(typeof(dialogData[i]) === typeof('')){
                        dialogData[i] = '';
                      }
                    }
                }
            },
            //新增资料
            addZL(){
                this.$maskin();
                this.add.addvisible = true;
                let params = new URLSearchParams();
                this.$axios.post("/datum/getDatumnoList", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.add.addvisible = true;
                        this.$set(this.add.subform, "companyArr", data.result.type1);
                        this.$set(this.add.subform, "systemArr", data.result.type2);
                        this.$set(this.add.subform, "docArr", data.result.type3);
                        this.add.subform.code = data.result.seq;
                        this.add.subform.year = data.result.year;
                        //添加目录位置数据
                        this.$set(this.add.subform, "dirFather", data.result.type4.father);
                        this.$set(this.add.subform, "dirChild", data.result.type4.child);
                        //添加系统位置数据
                        let farr = [];
                        let carr = [];
                        for (let i of data.result.type5) {
                            if (i.system_FID) {
                                carr.push(i)
                            } else {
                                farr.push(i)
                            }
                        }
                        // this.$set(this.add.subform, "sysFather", farr);
                        // this.$set(this.add.subform, "sysChildOrigin", carr);
                        this.add.subform.sysFather = cloneDeep(farr)
                        this.add.subform.sysChildOrigin = cloneDeep(carr)
                        this.add.subform.write_user = this.username;// 录入人员
                        this.$maskoff();
                    }
                })
            },
            //关联系统的父级change事件
            sysChange(){
                let id = this.add.subform.sysF.split(",")[0];
                let arr = [];
                this.add.subform.sysC = "";
                for (let i of this.add.subform.sysChildOrigin) {
                    if (i.system_FID == id) {
                        arr.push(i)
                    }
                }
                this.$set(this.add.subform, "sysChild", arr);
            },
            //提交
            subaddForm(){
                let subform = this.add.subform;
                if (!subform.company) {
                    this.$warn("请选择企业代号");
                    return;
                }
                if (!subform.system) {
                    this.$warn("请选择系统代号");
                    return;
                }
                if (!subform.doc) {
                    this.$warn("请选择文档类型");
                    return;
                }
                if (!subform.wordname) {
                    this.$warn("请填写文档名称");
                    return;
                }
                if (!subform.version) {
                    this.$warn("请填写文档版本");
                    return;
                }
                if (!subform.sysF || !subform.sysC) {
                    this.$warn("请选择完整的系统");
                    return;
                }
                if (!subform.intro) {
                    this.$warn("请填写文档简介");
                    return;
                }
                if (!subform.write_user) {
                    this.$warn("请填写录入人员");
                    return;
                }
                if (!subform.fileIds.length) {
                    this.$warn("请至少上传一个文档");
                    return;
                }
                this.$maskin();
                let code = `${subform.company}_${subform.system}_${subform.doc.split('-')[0]}_${subform.code}_${subform.year}`;//文档编号
                let name = subform.wordname;//文档名称
                let version = subform.version;//版本
                let intro = subform.intro;//描述
                let params = new URLSearchParams();
                params.append("DATUM_ID", code); // 文档编码
                params.append("DATUM_NAME", name);// 文档名称
                params.append("DATUM_VERSION", version);// 文本版本
                params.append("WRITE_USER", subform.write_user);
                params.append("FILE_DESCRIPTIOON", intro);// 文档简介
                params.append("uploadfileIds", subform.fileIds);//上传文件
                params.append("CONDITION_FLAGM", subform.doc.split('-')[0]);// 目录位置

                params.append("INTERCONNECTED_SYSTEM",
                    subform.sysF.split(",")[1] + '-' + subform.sysC.split(",")[1]);//关联系统
                params.append("CONDITION_FLAGF",
                    `${subform.doc.split('-')[1]},${subform.sysF.split(",")[0]}`);//系统和目录的父级ID
                params.append("CONDITION_FLAGC",
                    `${subform.sysC.split(",")[0]}`);//系统和目录的子集ID

                this.$axios.post("datum/addDatum", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$success("操作成功");
                        this.$maskoff();
                        this.closeDialog();
                        this.leftclick(this.add.clickDataCopy);
                        this.$refs.fileUp.value='';
                    }
                })
            },
            //左侧点击事件
            leftclick(val){
              this.add.clickDataCopy = val;
                this.$maskin();
                let params = new URLSearchParams();
                params.append("CONDITION_FLAG", this.selectValue);
                if(this.selectValue == 1){
                    params.append("CONDITION_FLAGF", val.no_ID);
                }else{
                  if(!!val.children){
                    params.append("CONDITION_FLAGF", val.system_ID);
                  }else{
                    params.append("CONDITION_FLAGF", val.system_FID);
                    params.append("CONDITION_FLAGC", val.system_ID);
                  }
                }
                this.$axios.post("/datum/getDatumlist", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.calculate();
                        this.$set(this.table, "tableData", data.result);
                        this.$set(this.table, "tableOriginData", data.result);
                        this.$maskoff();
                    }
                })
            },
            //查看功能
            viewrow(index, val){
                this.$go("material", {
                    "id": val.datum_ID
                })
            },
            //下载功能
            downloadrow(index, val){
                this.$set(this.download, "data", val.datumATDetails);
                this.download.downloadvisible = true;
            },
            //文件上传的操作
            getFile(e){
                let file = Array.prototype.slice.call(e.target.files);
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                };
                let params = new FormData();
                params.append("token", this.$getToken());
                params.append("file", file[0]);
                this.$axios.post("/datum/upload", params, config).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        if (typeof this.add.subform.uploadFiles == "string" ||
                            typeof this.add.subform.fileIds == "string") {
                            this.$set(this.add.subform, "uploadFiles", []);
                            this.$set(this.add.subform, "fileIds", []);
                        }
                        this.add.subform.uploadFiles.push(file[0]);
                        this.add.subform.fileIds.push(data.result.attachmentId);
                    }
                });
            },
            //时间格式
            dataFormatter(row, col){
                let date = this.$format(row.date_TIME);
                return `${date.year}-${date.mouth}-${date.day}`
            },
            filesize(val){
                let size = parseFloat(val.at_FILESIZE / 1000).toFixed(2);
                return size + "kb"
            },
            dlFromTable(row){
                let id = row.at_ID;//文件ID
                this.$axios.get(`/datum/download?type=2&fileId=${id}&token=${this.$getToken()}`)
            }
        }
    }
</script>
