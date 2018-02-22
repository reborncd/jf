<style>

</style>

<template>
    <div class="console-tab-content">
        <el-form label-width = "100px" label-position="left">
            <el-row :gutter="20">
                <el-col :span="12"><el-form-item label="需求编号">{{infodata.name}}</el-form-item></el-col>
                <el-col :span="12"><el-form-item label="申请人">{{infodata.name}}</el-form-item></el-col>
                <el-col :span="12"><el-form-item label="需求名称">{{infodata.name}}</el-form-item></el-col>
                <el-col :span="12"><el-form-item label="需求来源">{{infodata.name}}</el-form-item></el-col>
                <el-col :span="12"><el-form-item label="申请日期">{{infodata.name}}</el-form-item></el-col>
                <el-col :span="12"><el-form-item label="计划投产日期">{{infodata.name}}</el-form-item></el-col>
                <el-col :span="12"><el-form-item label="优先级">{{infodata.name}}</el-form-item></el-col>
                <el-col :span="12"><el-form-item label="重要程度">{{infodata.name}}</el-form-item></el-col>
                <el-col :span="24">
                    <el-form-item label="是否加急"><span>{{infodata.name}}</span><span style="margin-right: 20px;">{{infodata.name}}</span></el-form-item>
                </el-col>
                <el-col :span="24"><el-form-item label="需求描述">{{infodata.name}}</el-form-item></el-col>
                <el-col :span="24"><el-form-item label="产品功能">{{infodata.name}}</el-form-item></el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    export  default {
        props:{
            infodata:null
        },
        methods:{

        }
    }
</script>