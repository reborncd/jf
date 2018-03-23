<style scoped>

</style>

<template>
    <div v-if="changeInset.visible">
        <el-form label-width="100px" label-position="left">
            <el-row :gutter="20" v-for="(item,index) in split.systemAll">
                <el-col :span="8">
                    <el-form-item label="涉及系统">
                        <el-select v-model="item.name" placeholder="请选择系统" style="width:100%"
                                   @change="splitSystemChange($event,index)">
                            <el-option v-for="item in split.systemFarr"
                                       :label="item.system_NAME" :value="item.systemson"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-select v-model="item.version" placeholder="请选择系统" style="width:100%">
                        <el-option v-for="item in split.systemCarr"
                                   :label="item.system" :value="item.system_ID+','+item.system"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="2">
                    <i :class="index == 0 && split.systemAll.length == 1?
                                                    'el-icon-plus':index == split.systemAll.length-1?'el-icon-plus':'el-icon-minus'"
                       @click="systemEvent(index,$event)" style="line-height: 40px;height: 40px;text-align: center;
                                                font-size: 20px;cursor: pointer;font-weight: bold">
                    </i>
                </el-col>
            </el-row>
        </el-form>
        <div class="table-list">
            <el-table :data="changeInset.tableData" border style="width: 100%">
                <el-table-column prop="user_NAME" label="人员"></el-table-column>
                <el-table-column prop="system_NAME" label="系统名"></el-table-column>
                <el-table-column prop="base_INFO_ID" label="任务编码" width="190"></el-table-column>
                <el-table-column prop="end_DATE" :formatter="changeInsetMatter" label="完成日期" width="120"></el-table-column>
                <el-table-column prop="responsible_MODULE" label="负责模块"></el-table-column>
                <el-table-column prop="facility_NAME" label="难易度"></el-table-column>
                <el-table-column prop="required_TIME" label="预计用时"></el-table-column>
                <el-table-column prop="ACTUAL_TIME" label="实际用时"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" v-if="scope.row.state_ID !=319"
                                   @click="editChangeInset(scope.$index, scope.row)">编辑
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="text-align: center;margin-top: 20px;">
                <el-button style="float: none" type="primary" @click="subChangeInset">提交</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            changeInset:{
                index:"",//当前选择的索引
                splitaddvisible:false,
                visible :false,
                tableData:[],//表格数据
                allsystem:[],//可选择的现有的子系统
                oldSystem:[],//之前选择的系统
                systemAll: [{"name":"","version":""}],//所有选择的系统集合
                level:[],//难易度
                system_NAME:"",//系统名
                choosesysyem:"",//选择的系统
                finishdate:"",//完成日期
                model:"",//负责模块
                person:"",//人员
                levelchoosen:"",//选择的难易度
                taskcode:"",//任务编码
                usetime:"",//预计用时
                truetime:"",//实际用时
                subData:[],//提交的变更的信息
            }
        }
    },
    methods:{

    }
}
</script>