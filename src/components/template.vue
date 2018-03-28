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
            zqvisible:true,//周期
            gsvisible:true,//工时
        }
    },
    methods:{
      asd(){
          let yaxis = []; //y轴显示
          let startTime = []; //预期开始时间
          let endTime = []; //预期结束时间
          let actualTime = []; //实际完成时间
          let timeInfo=[]; //所有信息
          let deptName=[];//部门
          let allTime=[];//实际用时
          let requiredTime=[];//总用时
          let leaveTime=[];//剩余用时
          this.$set(this.sstj,"yaxis",yaxis);
          this.$set(this.sstj,"startTime",startTime);
          this.$set(this.sstj,"endTime",endTime);
          this.$set(this.sstj,"actualTime",actualTime);
          this.$set(this.sstj,"timeInfo",timeInfo);
          this.$set(this.sstj,"deptName",deptName);
          this.$set(this.sstj,"requiredTime",requiredTime);
          this.$set(this.sstj,"leaveTime",leaveTime);
          this.$set(this.sstj,"allTime",allTime);

      }
    }
}
</script>