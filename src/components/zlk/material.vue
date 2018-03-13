<style scoped>
    @import "../../static/css/table.css";
    @import "../../static/css/console.css";

    .word {
        text-align: center;
        line-height: 50px;
        font-size: 24px;
        font-weight: bold;
    }
</style>
<style>
    .zlk .el-table .cell {
        text-align: center;
    }
</style>
<template>
    <div class="zlk common-card-wrap" style="height: 100%;">
        <el-card class="box-card">
            <div class="text item">
                <div class="content">
                    <h2 class="word">{{name}}</h2>
                    <el-form label-width="100px">
                        <el-form-item label="文档编号">
                            {{code}}
                        </el-form-item>
                        <el-form-item label="文档名称">
                            {{name}}
                        </el-form-item>
                        <el-form-item label="文档版本">
                            {{version}}
                        </el-form-item>
                        <el-form-item label="目录位置">
                            {{dir}}
                        </el-form-item>
                        <el-form-item label="关联系统">
                            {{system}}
                        </el-form-item>
                        <el-form-item label="录入人员">
                            {{person}}
                        </el-form-item>
                        <el-form-item label="录入时间">
                            {{date}}
                        </el-form-item>
                        <el-form-item label="文档简介">
                            {{dec}}
                        </el-form-item>
                        <el-form-item label="文档预览">
                            <el-button type="primary" size="mini" @click="viewWord">点击预览</el-button>
                        </el-form-item>
                    </el-form>
                    <canvas id="canvas" style="border: 1px solid #ccc"></canvas>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import "../../static/js/pdf.js";
    import "../../static/js/pdf.worker.js";
    export default {
        data(){
            return {
                file: "",
                code: "1",//编号
                name: "文档名称",//文档名称
                version: "1",//文档版本
                dir: "1",//目录位置
                system: "1",//关联系统
                person: "1",//录入人员
                date: "1",//录入时间
                dec: "1",//文档简介
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
            change(e){
                this.file = e.target.files[0]
            },
            calculate(){
                let height = document.querySelector(".mainr").offsetHeight;
                let card_body = document.querySelector(".box-card .el-card__body");
                card_body.style.height = height - 36 + "px";
            },
            loadData(){
                this.calculate();
            },
            //预览文档
            viewWord(){
//                let params= new FormData();
//                params.append("id","20180312184843")
//                params.append("token","7b0cc2cf9a474c9285573bcea2406565")
//                params.append("type","1")
//                this.$axios.post("/fault/download",params).then((res)=>{
//                    let reader = new FileReader()
//                    reader.readAsBinaryString(res)
//                    reader.onload = function (e) {
//                        console.log(e)
//                    }
//                });

            }
        }
    }
</script>