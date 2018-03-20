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

    .left-tree {
        width: 19%;
        float: left;
        border: 1px solid #ebeef5;
        margin-right: 1%;
        padding-top: 47px;
        overflow: auto;
    }
</style>
<style>
    .rolemanage .el-table--border tr td:last-child,
    .rolemanage .el-table--border tr th:last-child {
        border-right: none;
    }

    .rolemanage .el-table td {
        padding: 6px 0 !important;
    }
</style>
<template>
    <div class="rolemanage common-card-wrap" style="height: 100%;">
        <el-card class="box-card">
            <div class="text item">
                <div class="content">
                    <div class="action">
                        <router-link :to="{path:'addrole'}">
                            <el-button size="mini" type="primary">新建角色</el-button>
                        </router-link>
                        <router-link to="power">
                            <el-button size="mini">权限列表</el-button>
                        </router-link>
                        <div class="search fr">
                            <el-input size="mini" v-model="search" placeholder="输入检索关键字"></el-input>
                            <el-button size="mini" type="primary">检索</el-button>
                        </div>
                    </div>
                    <div class="table-list">
                        <div class="left-tree">
                            <el-tree :data="treeData" @node-click="leftTreeClick"></el-tree>
                        </div>
                        <el-table :data="tableData" border style="width: 80%" :height="tableHeight"
                                  empty-text="请选择部门或当前部门没有数据">
                            <el-table-column align="center" prop="role_NAME" label="所属职位"></el-table-column>
                            <!--<el-table-column align="center" label="操作">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<router-link :to="{path:'editrole',query:{id: scope.row.role_ID}}">-->
                                        <!--<el-button @click="editRow(scope.row,scope)" size="small" type="primary">编辑</el-button>-->
                                    <!--</router-link>-->
                                    <!--<el-button @click="deleteRow(scope.row,scope)" size="small" type="danger">删除-->
                                    <!--</el-button>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                        </el-table>
                    </div>
                </div>
            </div>
        </el-card>
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
                leftTreeData: []
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
                this.$axios.post("/role/queryRoleMenu", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        /* [{
                         label: '一级 1',
                         children: [{
                         label: '二级 1-1',
                         children: [{
                         label: '三级 1-1-1'
                         }]
                         }]
                         }] */
                        let arr = [];
                        for (let i of data.result.deptRoles) {
                            if (!i.dept_fid) {
                                let obj = {
                                    "label": i.dept_name,
                                    "id": i.dept_id,
                                    "children": [],
                                    "roles": i.roles,
                                };
                                for (let j of data.result.deptRoles) {
                                    if (j.dept_fid && (j.dept_fid == i.dept_id)) {
                                        let childerenObj = {
                                            "label": j.dept_name,
                                            "id": j.dept_id,
                                            "roles": j.roles,
                                        };
                                        obj.children.push(childerenObj)
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
            leftTreeClick(val){
                this.tableData = val.roles
            },
            editRow(el, scope){

            },
            deleteRow(el, scope){
                this.$maskin();
                let params = new URLSearchParams();
                params.append("ROLE_ID", el.role_ID)
                this.confirm("确定删除该角色？", () => {
                    this.$axios.post("/role/deleteRole", params).then((res) => {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$success("操作成功！");
                            this.$maskoff();
                            this.loadData()
                        }
                    })
                })
            }
        }
    }
</script>