<style scoped>

</style>

<template>

</template>

<script>
export default {
    data(){
        return {
            state_NAME:"",//当前状态
            technology_NEEL_ID:"",//需求编号
            neel_NAME:"",//需求名称
            type:"",//需求类型
            result:"",//成果类型
            influece:"",//需求影响面
            rriority_NAME:"",//优先级评定
            ascription:"",//需求划分归属
            prduct_LINE:"",//涉及产品线
            start_DATE:"",//申请日期
            end_DATE:"",//期望上线日期
            neel_SOURCE:"",//需求来源部门和人员
            user_NAME:"",//产品负责人
            importance_NAME:"",//重要程度
            urgent:"",//是否加急
            urgent_NAME:"",//加急原因
            background:"",//需求背景
            product_FUNCTION:"",//产品改造点
            neel_DESCRIPTION:"",//需求描述
            fali:"",//验收不通过


            reject: "",//驳回理由
            code_start: "",//开发开始时间
            code_end: "",//开发结束时间
            test_start: "",//测试开始时间
            test_end: "",//测试结束时间
            oldcode: "",//原需求编号
        }
    },
    methods:{

    }
}
</script>