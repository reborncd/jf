<style scoped>

</style>

<template>
    <div v-if="changeInset.visible">
        <el-dialog title="BUG附件" :visible="testTask.bugfilevisible" width="60%"
                   append-to-body modal-append-to-body
                   :before-close="closeDialog">
            <div class="table-list">
                <el-table :data="testTask.bugfiles" border style="width: 100%">
                    <el-table-column prop="name" label="文件名"></el-table-column>
                    <!--<el-table-column prop="size_STRING" label="大小" width="100"></el-table-column>-->
                    <el-table-column label="操作" width="80">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="downloadModel(scope.row)">下载</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-dialog>
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