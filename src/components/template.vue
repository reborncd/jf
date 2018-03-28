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
        acceptance(){
            //判断是否曾经未通过过，如果曾经未通过过，则通过时要填写通过理由
            let reason =  this.tabs.tabsData.fail;
            this.confirm("请选择验收结果",()=>{
                //验收通过
                let info = this.tabs.activeTableInfo;
                if(reason){
                    this.prompt("验收通过","请填写验收通过理由",(value)=> {
                        this.$maskin();
                        let params = new URLSearchParams();
                        params.append("BASE_NEEL_ID", info.base_NEET_ID);
                        params.append("OPER", "OK");
                        params.append("REJECT_RESON", value.value)
                        this.$axios.post("/base/baseAccept", params).then((res) => {
                            let data = res.data;
                            if (data.code == 200) {
                                this.$success("操作成功！");
                                this.$maskoff();
                                this.loadData();
                            }
                        })
                    })
                    return;
                }
                this.$maskin();
                let params = new URLSearchParams();
                params.append("BASE_NEEL_ID", info.base_NEET_ID);
                params.append("OPER","OK");
                this.$axios.post("/base/baseAccept", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$success("操作成功！");
                        this.$maskoff();
                        this.loadData();
                    }
                })
            },()=>{
                //验收不通过
                this.prompt("验收不通过","请填写不通过理由",(value)=>{
                    if(!value.value){
                        this.$warn("请填写不通过理由");
                        return;
                    }
                    let info = this.tabs.activeTableInfo;
                    this.$maskin();
                    let params = new URLSearchParams();
                    params.append("BASE_NEEL_ID", info.base_NEET_ID);
                    params.append("OPER","FAIL");
                    params.append("REJECT_RESON",value.value);
                    this.$axios.post("/base/baseAccept", params).then((res) => {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$success("操作成功！");
                            this.$maskoff();
                            this.loadData();
                        }
                    })
                })
            },["通过","不通过"])
        },
    }
}
</script>