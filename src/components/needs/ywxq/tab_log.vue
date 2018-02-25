<style scoped>
    .text{
        line-height: 26px;
    }
</style>

<template>
    <el-row>
        <el-col :span="10"><span>状态 ：</span>{{log.status}}</el-col>
        <el-col :span="10" style="margin-bottom: 10px;"><span>发送人 ：</span> {{log.role}}</el-col>
        <el-col class="text" v-for="(item,index) in log.data">{{index+1}}<span style="margin:0 5px;">.</span>{{item}}</el-col>
    </el-row>
</template>

<script>
    export default {
        props:{
            "log":null
        },
        data(){
            return {

            }
        },
        methods:{

        }
    }
</script>