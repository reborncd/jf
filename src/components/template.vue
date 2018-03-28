<style scoped>

</style>

<template>
    <div v-if="changeInset.visible">
                <div class="background"></div>
                <div class="product_FUNCTION"></div>
                <div class="neel_DESCRIPTION"></div>
                <div class="oldchangepoint"></div>
                <div class="oldneedsname"></div>
                <div class="newchangepoint"></div>
                <div class="newneedsname"></div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            outtime:false,//是否超时
            taskFinishedvisible: false,//弹窗
            taskId: "",//当前任务ID
            usetime: "",//实际用时
            reason: "",//超时原因
            testnotallow:false,//通过和不通过
            testnotallowtext:"",//测试不通过原因
        }
    },
    methods:{

    }
}
</script>