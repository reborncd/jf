<style scoped>
    .search .el-input {
        width: auto;
    }

    .table-list {
        margin-top: 30px;
        text-align: center !important;
    }

    .table-list table th div {
        text-align: center !important;
    }

    .el-table--border tr td:last-child, .el-table--border tr th:last-child {
        border-right: 0 !important;
    }
</style>

<template>
    <div class="rolelist common-card-wrap" style="height: 100%;">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="card-title">操作日志</span>
            </div>
            <div class="text item">
                <div class="content">
                    <h4>用户名：{{username}}</h4>
                    <div class="table-list">
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column prop="page" label="项目组" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="power" label="需求名称" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="role" label="功能项" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="power" label="操作项" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="role" label="操作日期" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="power" label="操作时间" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="role" label="当前状态" show-overflow-tooltip></el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button type="danger" @click="editRow(scope.row,scope)" size="small">撤销</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div style="text-align: center;margin-top: 20px;" @click="a">
                <el-button>返回</el-button>
            </div>
        </el-card>
    </div>

</template>

<script>
    import powerStatic from "../../static/js/power";
    export default {
        data(){
            return {
                username:"用户名",
                tableData:powerStatic
            }
        },
        mounted(){
            let height = document.querySelector(".mainr").offsetHeight;
            let card_header_height = document.querySelector(".el-card__header").offsetHeight;
            let card_body = document.querySelector(".box-card .el-card__body");
            card_body.style.height = height - card_header_height - 36 + "px";
        },
        methods: {
            a(){
                this.$router.go(-1)
            }
        }
    }
</script>
