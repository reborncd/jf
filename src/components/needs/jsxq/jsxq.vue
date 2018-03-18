<style scoped>
    @import "../../../static/css/table.css";
    @import "../../../static/css/console.css";

    .genzong span {
        color: #4f4f4f;
        margin: 0 8px;
    }

    .assgin-dialog h2 {
        margin-bottom: 10px;
        font-size: 20px;
    }

    .assgin-dialog .tab span {
        float: left;
        width: 50%;
        text-align: center;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
    }

    .assgin-dialog .tab span.active {
        color: dodgerblue;
    }

    /*.assign-wrapper {*/
    /*height: 300px;*/
    /*overflow-y: auto;*/
    /*}*/
    .assign-wrapper li {
        margin-bottom: 6px;
        padding: 0 10px;
        min-height: 70px;
    }

    .assign-wrapper li .deptTitle {
        display: block;
        width: 100%;
        line-height: 34px;
        border: 1px solid #ccc;
        text-align: center;
        font-size: 14px;
        margin: 5px auto;
    }

    .assign-wrapper .check-item {
        margin: 5px 0;
        display: block;
    }

    .testTask_bugtable table.el-table__header th {
        background: white !important;
    }
</style>
<template>
    <div class="jsxq common-card-wrap"
         @click="$event.target.className == 'icon-more iconfont'?'':tabs.consoleActionVisible = false">
        <el-card class="box-card">
            <div class="text item">
                <div class="content">
                    <div class="action clear">
                        <el-button type="danger" size="mini" @click="start_addneeds" v-if="addneeds.addif">新增</el-button>
                        <el-select v-model="selectValue" clearable size="mini" @change="">
                            <el-option
                                    v-for="item in states"
                                    :key="item.state_ID"
                                    :label="item.state_NAME"
                                    :value="item.state_ID">
                            </el-option>
                        </el-select>
                        <div class="fr">
                            <div style="margin-right: 10px;" class="i-b">
                                <el-date-picker
                                        v-model="dateComp.value"
                                        type="datetimerange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        align="right"
                                        size="mini"
                                        :picker-options="dateComp"
                                >
                                </el-date-picker>
                            </div>
                            <div class="search i-b">
                                <el-input
                                        placeholder="请输入检索关键字"
                                        suffix-icon="icon-sousuo iconfont"
                                        v-model="keyword"
                                        size="mini"
                                        clearable
                                >
                                </el-input>
                            </div>
                        </div>
                    </div>
                    <div class="table-list">
                        <el-table :data="table.tableData" border style="width: 100%"
                                  :height="table.tableHeight" ref="jsxq_table"
                                  highlight-current-row
                                  @row-click="handleCurrentChange">
                            <el-table-column prop="technology_NEEL_ID" label="需求编号" width="200"></el-table-column>
                            <el-table-column prop="start_DATE" label="申请日期" width="100"></el-table-column>
                            <el-table-column prop="end_DATE" label="计划投产日期" width="120"></el-table-column>
                            <el-table-column prop="neel_NAME" label="需求名称"></el-table-column>
                            <!--<el-table-column prop="system_NAME" label="涉及系统"></el-table-column>-->
                            <el-table-column prop="state_NAME" label="状态"></el-table-column>
                            <el-table-column prop="rriority_NAME" label="优先级" width="80"></el-table-column>
                            <!--<el-table-column label="操作">-->
                            <!--<template slot-scope="scope">-->
                            <!--<el-button size="mini" type="primary"-->
                            <!--v-if="!scope.row.start_DATE"-->
                            <!--@click="splitCodeStart(scope.$index, scope.row)">驳回-->
                            <!--</el-button>-->
                            <!--</template>-->
                            <!--</el-table-column>-->
                        </el-table>
                    </div>
                    <!--控制台部分-->
                    <div class="console-tab-wrapper" v-if="tabs.consoleWrapperVisible">
                        <div class="console-action-wrapper">
                            <i class="el-icon-close close" @click="setConsoleVisible"></i>
                        </div>
                        <el-tabs v-model="tabs.activeName" type="card" @tab-click="tabClick">
                            <el-tab-pane label="详情页" name="info">
                                <div class="console-tab-content">
                                    <el-form label-width="100px" label-position="left">
                                        <el-row :gutter="20">
                                            <el-col :span="24">
                                                <el-form-item label="状态" style="color: red">
                                                    {{tabs.tabsData.state_NAME}}
                                                </el-form-item>
                                            </el-col>
                                            <!--需求编号-->
                                            <el-col :span="24" v-if="tabs.tabsData.newtechnology_NEEL_ID">
                                                <el-form-item label="新需求编号" style="color: #ffa005;cursor: pointer;">
                                                   <span @click="goNeedList($event,tabs.tabsData.newtechnology_NEEL_ID,'new')">
                                                        {{tabs.tabsData.newtechnology_NEEL_ID}}
                                                   </span>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="24" v-if="tabs.tabsData.oldtechnology_NEEL_ID">
                                                <el-form-item label="原需求编号" style="color: #ffa005;cursor: pointer;">
                                                    <span @click="goNeedList($event,tabs.tabsData.oldtechnology_NEEL_ID,'old')">
                                                        {{tabs.tabsData.oldtechnology_NEEL_ID}}
                                                    </span>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="需求编号">{{tabs.tabsData.technology_NEEL_ID}}
                                                </el-form-item>
                                            </el-col>
                                            <!--需求编号-->

                                            <el-col :span="12">
                                                <el-form-item label="需求名称">{{tabs.tabsData.neel_NAME}}</el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="需求类型">{{tabs.tabsData.type}}</el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="成果类型">{{tabs.tabsData.result}}</el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="需求影响面">{{tabs.tabsData.influece}}</el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="优先级评定">{{tabs.tabsData.rriority_NAME}}
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="需求划分归属">{{tabs.tabsData.ascription}}</el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="涉及产品线">{{tabs.tabsData.prduct_LINE}}</el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="申请日期">{{tabs.tabsData.start_DATE}}</el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="期望上线日期">{{tabs.tabsData.end_DATE}}</el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="需求来源">{{tabs.tabsData.neel_SOURCE}}</el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="产品负责人">{{tabs.tabsData.user_NAME}}</el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="重要程度">{{tabs.tabsData.importance_NAME}}
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="24">
                                                <el-form-item label="是否加急">
                                                    <span style="margin-right: 20px;">{{tabs.tabsData.urgent}}</span>
                                                    <span style="color: red!important;">{{tabs.tabsData.urgent_NAME}}</span>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="24">
                                                <el-form-item label="需求背景">{{tabs.tabsData.background}}</el-form-item>
                                            </el-col>

                                            <!---------------------------产品改造点和产品描述-->
                                            <el-col :span="24" v-if="tabs.tabsData.product_FUNCTION">
                                                <el-form-item label="产品改造点">{{tabs.tabsData.product_FUNCTION}}
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="24" v-if="tabs.tabsData.neel_DESCRIPTION">
                                                <el-form-item label="需求描述">{{tabs.tabsData.neel_DESCRIPTION}}
                                                </el-form-item>
                                            </el-col>

                                            <!---------------------------原产品改造点和产品描述-->
                                            <el-col :span="24" v-if="tabs.tabsData.oldproduct_FUNCTION"
                                                    style="color: #ffa005">
                                                <el-form-item label="原产品改造点">{{tabs.tabsData.oldproduct_FUNCTION}}
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="24" v-if="tabs.tabsData.oldneel_DESCRIPTION"
                                                    style="color: #ffa005">
                                                <el-form-item label="原需求描述">{{tabs.tabsData.oldneel_DESCRIPTION}}
                                                </el-form-item>
                                            </el-col>

                                            <!---------------------------新产品改造点和产品描述-->
                                            <el-col :span="24" v-if="tabs.tabsData.newproduct_FUNCTION"
                                                    style="color: #ffa005">
                                                <el-form-item label="新产品改造点">{{tabs.tabsData.newproduct_FUNCTION}}
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="24" v-if="tabs.tabsData.newneel_DESCRIPTION"
                                                    style="color: #ffa005">
                                                <el-form-item label="新产品描述">{{tabs.tabsData.newneel_DESCRIPTION}}
                                                </el-form-item>
                                            </el-col>

                                            <el-col :span="24" v-if="">
                                                <el-form-item label="驳回原因">
                                                    <span style="color: red!important;">{{tabs.tabsData.remark}}</span>
                                                </el-form-item>
                                            </el-col>

                                            <!----------------------------------需判断部分------------------------>
                                            <!--当前用例模板-->
                                            <el-col :span="24" v-if="testTask.uploadFile.length">
                                                <el-form-item label="当前用例模板" >
                                                    <span style="cursor: pointer;color: orangered" @click="testTask.modelvisible = true">点击可查看</span>
                                                </el-form-item>
                                            </el-col>
                                            <!--开发手册-->
                                            <el-col :span="24" v-if="codeupload.uploadFile.length">
                                                <el-form-item label="开发手册" >
                                                    <span style="cursor: pointer;color: orangered" @click="codeupload.modelvisible = true">点击可查看</span>
                                                </el-form-item>
                                            </el-col>
                                            <!--bug清单-->
                                            <el-col :span="24" v-if="testTask.allBugs.length">
                                                <el-form-item label="BUG清单" style="color:red">
                                                    <span @click="testTask.allBUGvisible = true"
                                                          style="cursor: pointer">请点击查看</span></el-form-item>
                                            </el-col>
                                            <!----------------------------------需判断部分------------------------>

                                        </el-row>
                                    </el-form>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="操作台" name="console">
                                <div class="console-tab-content">
                                    <div class="console-action-wrapper">
                                        <i class="icon-more iconfont"
                                           @click="tabs.consoleActionVisible = !tabs.consoleActionVisible"></i>
                                        <div class="console-action fr" v-if="tabs.consoleActionVisible">
                                            <span v-for="item in tabs.consoleActionData"
                                                  @click="consoleActionEvent(item)">{{item.name}}
                                            </span>
                                        </div>
                                    </div>
                                    <!--状态记录和发送人-->
                                    <el-form label-width="100px" label-position="left">
                                        <el-row :gutter="20">
                                            <el-col :span="8">
                                                <el-form-item label="状态">需求编号</el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="发送人">申请人</el-form-item>
                                            </el-col>
                                        </el-row>
                                    </el-form>
                                    <!--拆分任务-->
                                    <div v-if="split.splitvisible">
                                        <el-form label-width="100px" label-position="left">
                                            <el-row :gutter="20" v-for="(item,index) in split.systemAll">
                                                <el-col :span="10">
                                                    <el-form-item label="系统名">
                                                        <el-select v-model="item.name" placeholder="请选择" clearable>
                                                            <el-option v-for="item in split.systemarr"
                                                                       :label="item.SYSTEM_NAME"
                                                                       :value="item.SYSTEM_NAME"></el-option>
                                                        </el-select>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8">
                                                    <el-input v-model="item.version"
                                                              placeholder="请输入版本号（格式如：v1.0 或 V1.0）"></el-input>
                                                </el-col>
                                                <el-col :span="2">
                                                    <i :class="index == 0 && split.systemAll.length == 1?'el-icon-plus':index == split.systemAll.length-1?'el-icon-plus':'el-icon-minus'"
                                                       @click="systemEvent(index,$event)"
                                                       style="line-height: 40px;height: 40px;text-align: center;
                                                font-size: 20px;cursor: pointer;font-weight: bold">
                                                    </i></el-col>
                                            </el-row>
                                            <!--<el-row :gutter="20">-->
                                                <!--<el-col :span="10">-->
                                                    <!--<el-form-item label="预计开始日期">-->
                                                        <!--<el-date-picker type="date" placeholder="选择日期"-->
                                                                        <!--v-model="split.startdate"-->
                                                                        <!--style="width: 100%;"></el-date-picker>-->
                                                    <!--</el-form-item>-->
                                                <!--</el-col>-->
                                                <!--<el-col :span="10">-->
                                                    <!--<el-form-item label="预计结束日期">-->
                                                        <!--<el-date-picker type="date" placeholder="选择日期"-->
                                                                        <!--v-model="split.enddate"-->
                                                                        <!--style="width: 100%;"></el-date-picker>-->
                                                    <!--</el-form-item>-->
                                                <!--</el-col>-->
                                            <!--</el-row>-->
                                        </el-form>
                                        <div style="margin: 10px 0" class="clear">
                                            <el-button style="float: right;" type="primary" @click="addsplitperson"
                                                       size="mini">新增人员
                                            </el-button>
                                        </div>
                                        <div class="table-list">
                                            <el-table :data="split.tableData" border style="width: 100%">
                                                <el-table-column prop="USER_NAME" label="人员"></el-table-column>
                                                <el-table-column prop="SYSTEM_NAME" label="系统名"></el-table-column>
                                                <el-table-column prop="TASK_ID" label="任务编码"
                                                                 width="190"></el-table-column>
                                                <el-table-column prop="end_data_format" label="完成日期"
                                                                 width="120"></el-table-column>
                                                <el-table-column prop="RESPONSIBLE_MODULE"
                                                                 label="负责模块"></el-table-column>
                                                <el-table-column prop="FACILITY_NAME" label="难易度"
                                                                 width="80"></el-table-column>
                                                <el-table-column prop="EXPECT_TIME" label="预计用时"
                                                                 width="80"></el-table-column>
                                                <el-table-column label="操作">
                                                    <template slot-scope="scope">
                                                        <el-button size="mini" type="danger"
                                                                   @click="splitDelete(scope.$index, scope.row)">删除
                                                        </el-button>
                                                    </template>
                                                </el-table-column>
                                            </el-table>
                                        </div>
                                        <div class="clear">
                                            <el-button style="float: none;margin: 10px auto;display: block"
                                                       type="primary"
                                                       @click="splitSubmit">提交
                                            </el-button>
                                        </div>
                                    </div>
                                    <!--挂起转接操作-->
                                    <div v-if="hang.hangvisible">
                                        <div class="table-list" style="margin-top: 30px;">
                                            <el-table :data="hang.hangtableData" height="280" border
                                                      style="width: 100%">
                                                <!--@selection-change="hangcheckednChange"-->
                                                <!--<el-table-column type="selection" width="55"></el-table-column>-->
                                                <el-table-column label="任务类型" width="100">
                                                    <template slot-scope="scope">
                                                        <div style="text-align: center">
                                                            <span v-if="!scope.row.system_NAME">测试任务</span>
                                                            <span v-if="scope.row.system_NAME">开发任务</span>
                                                        </div>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="user_NAME" label="人员"
                                                                 width="80"></el-table-column>
                                                <el-table-column prop="system_NAME" label="系统名"></el-table-column>
                                                <!--<el-table-column prop="task_ID" label="任务编码"-->
                                                <!--width="190"></el-table-column>-->
                                                <el-table-column prop="end_DATE" :formatter="splitDataFormatter"
                                                                 width="120" label="完成日期"></el-table-column>
                                                <el-table-column prop="responsible_MODULE"
                                                                 label="负责模块"></el-table-column>
                                                <el-table-column prop="facility_NAME" label="难易度"
                                                                 width="70"></el-table-column>
                                                <el-table-column prop="expect_TIME" label="预计用时（小时）"
                                                                 width="80"></el-table-column>
                                                <el-table-column prop="actual_TIME" label="实际用时（小时）"
                                                                 width="80"></el-table-column>
                                                <el-table-column prop="signremark" label="挂起原因"></el-table-column>
                                                <el-table-column prop="personnel_REMARK" label="转接原因"></el-table-column>
                                                <el-table-column label="状态" width="80">
                                                    <template slot-scope="scope">
                                                        <div style="text-align: center">
                                                            <span v-if="scope.row.state_ID ==306"
                                                                  style="color: red">待开发</span>
                                                            <span v-if="scope.row.state_ID ==308"
                                                                  style="color: red">开发中</span>
                                                            <span v-if="scope.row.state_ID ==307"
                                                                  style="color: red">待测试</span>
                                                            <span v-if="scope.row.state_ID ==312"
                                                                  style="color: red">测试中</span>
                                                            <span v-if="scope.row.state_ID == 313" style="color: green">已完成</span>
                                                        </div>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column label="操作" width="160">
                                                    <template slot-scope="scope">
                                                        <div style="text-align: center">
                                                            <el-button type="primary" size="mini"
                                                                       v-if="scope.row.sign == 1"
                                                                       @click="hangAction(scope.row,scope.$index)">挂起
                                                            </el-button>
                                                            <el-button type="primary" size="mini"
                                                                       v-if="scope.row.sign == 1 && scope.row.system_NAME"
                                                                       @click="transferAction(scope.row,scope.$index)">
                                                                转接
                                                            </el-button>
                                                            <el-button type="primary" size="mini"
                                                                       v-if="scope.row.sign == 0 "
                                                                       @click=restore(scope.row)>恢复
                                                            </el-button>
                                                        </div>
                                                    </template>
                                                </el-table-column>
                                            </el-table>
                                        </div>
                                    </div>
                                    <!--技术管理部评审-->
                                    <el-form v-if="ifPing.visible" label-width="120px" label-position="left">
                                        <el-row :gutter="20">
                                            <el-col :span="12">
                                                <el-form-item label="优先级评定">
                                                    <el-select v-model="ifPing.rriority" clearable
                                                               placeholder="请选择优先级评定" style="width: 100%">
                                                        <el-option v-for="item in ifPing.rriorityArr"
                                                                   :label="item.RRIORITY_NAME"
                                                                   :value="item.RRIORITY_ID"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="需求评审结果">
                                                    <el-select v-model="ifPing.checks" clearable placeholder="请选择需求评审结果"
                                                               style="width: 100%">
                                                        <el-option v-for="item in ifPing.checksArr"
                                                                   :label="item.CHECK_NAME"
                                                                   :value="item.CHECK_ID+'-'+item.CHECK_NAME"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="评审时间">
                                                    <el-date-picker type="date" placeholder="选择评审日期"
                                                                    v-model="ifPing.date"
                                                                    style="width: 100%;"></el-date-picker>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="参会人">
                                                    <el-input v-model="ifPing.person"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row :gutter="20">
                                            <el-col :span="24">
                                                <el-button style="display: block;margin: 10px auto;" @click="subPing"
                                                           size="mini" type="primary">提交审批
                                                </el-button>
                                            </el-col>
                                        </el-row>
                                    </el-form>
                                    <!--技术经理评审-->
                                    <el-form v-if="review.reviewvisible" label-width="120px" label-position="left">
                                        <el-row :span="24" :gutter="20" style="margin-top: 20px;">
                                            <el-col :span="12" :md="12">
                                                <el-form-item label="预计开始时间">
                                                    <el-date-picker type="date" placeholder="选择日期"
                                                                    v-model="review.startDate"
                                                                    style="width: 100%;"></el-date-picker>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12" :md="12">
                                                <el-form-item label="预计完成时间">
                                                    <el-date-picker type="date" placeholder="选择日期"
                                                                    v-model="review.endDate"
                                                                    style="width: 100%;"></el-date-picker>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12" :md="12">
                                                <el-form-item label="分析时间">
                                                    <el-date-picker type="date" placeholder="选择日期"
                                                                    v-model="review.fxDate"
                                                                    style="width: 100%;"></el-date-picker>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12" :md="12">
                                                <el-form-item label="需求分析结果">
                                                    <el-select v-model="review.result" clearable placeholder="请选择需求分析结果"
                                                               style="width: 100%;">
                                                        <el-option v-for="item in review.resultArr" :label="item"
                                                                   :value="item"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="24" :md="24">
                                                <el-form-item label="风险点">
                                                    <el-input type="textarea" v-model="review.risk"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <div style="text-align: center">
                                            <el-button size="mini" type="primary" style="float: none"
                                                       @click="reviewSub">提交分析结果
                                            </el-button>
                                        </div>
                                    </el-form>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="开发任务操作台" name="codetask" v-if="tabs.codetask">
                                <div class="console-tab-content">
                                    <div class="table-list" v-if="split.codetask.length >0">
                                        <div class="clear">
                                            <el-button style="float: left;margin: 10px 0" type="primary" size="mini"
                                                       @click="showCodeBUG">BUG清单
                                            </el-button>
                                            <!--上传手册-->
                                            <div style="float: left;overflow: hidden;position: relative;margin: 10px">
                                                <el-button type="primary" size="mini">上传手册</el-button>
                                                <input type="file" @change="uploadModel($event,'CODE')"
                                                       style="position: absolute;width: 80px;height: 28px;opacity: 0;left: 0;top: 0;">
                                            </div>
                                        </div>
                                        <el-table :data="split.codetask" border style="width: 100%">
                                            <el-table-column prop="user_NAME" label="人员" width="80"></el-table-column>
                                            <el-table-column prop="system_NAME" label="系统名"
                                                             width="150"></el-table-column>
                                            <el-table-column prop="task_ID" label="任务编码"
                                                             width="200"></el-table-column>
                                            <el-table-column prop="end_DATE" :formatter="splitDataFormatter"
                                                             width="120" label="完成日期"></el-table-column>
                                            <el-table-column prop="responsible_MODULE" label="负责模块"></el-table-column>
                                            <el-table-column prop="facility_NAME" label="难易度"
                                                             width="70"></el-table-column>
                                            <el-table-column prop="expect_TIME" label="预计用时（小时）"></el-table-column>
                                            <el-table-column prop="actual_TIME" label="实际用时（小时）"></el-table-column>
                                            <el-table-column prop="remark" label="备注"></el-table-column>
                                            <el-table-column label="操作">
                                                <template slot-scope="scope">
                                                    <el-button size="mini" type="primary"
                                                               v-if="scope.row.state_ID == 306"
                                                               @click="splitCodeStart(scope.$index, scope.row)">开始
                                                    </el-button>
                                                    <el-button size="mini" type="primary"
                                                               v-if="scope.row.state_ID == 308"
                                                               @click="splitCodeFinish(scope.$index, scope.row)">完成
                                                    </el-button>
                                                    <span v-if="scope.row.state_ID == 313"
                                                          style="color: green">已完成</span>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="测试任务操作台" name="testtask" v-if="tabs.testtask">
                                <div class="console-tab-content">
                                    <!--选择用例类型和展示任务-->
                                    <div v-if="testTask.hasTask">
                                        <span style="display: inline-block;margin: 20px 20px 20px 0">用例类型</span>
                                        <el-select v-model="testTask.type" placeholder="请选择用例类型"
                                                   v-if="!testTask.typevalue" size="mini" style="margin-right: 10px;">
                                            <el-option
                                                    v-for="item in testTask.typeArr"
                                                    :label="item.TYPE_NAME"
                                                    :value="item.TYPE_NAME">
                                            </el-option>
                                        </el-select>
                                        <span style="color:red">{{testTask.typevalue}}</span>
                                        <el-button type="primary" v-if="!testTask.typevalue" @click="chooseTestType"
                                                   size="mini">确定
                                        </el-button>
                                        <!--上传用例模板-->
                                        <div style="display: inline-block;overflow: hidden;
                                        vertical-align: middle;position: relative;margin-left: 10px;">
                                            <el-button type="primary" size="mini">上传用例模板</el-button>
                                            <input type="file" @change="uploadModel($event,'TEST')"
                                                   style="position: absolute;width: 104px;height: 28px;opacity: 0;left: 0;top: 0;">
                                        </div>
                                        <!--测试的拆分任务-->
                                        <div class="test-task-wrap">
                                            <div class="clear">
                                                <el-button style="float: left;" type="primary"
                                                           @click="testTask.testtaskvisible = !testTask.testtaskvisible"
                                                           size="mini">
                                                    {{testTask.testtaskvisible?'收起':'展开'}}
                                                </el-button>
                                            </div>
                                            <div class="table-list" v-if="testTask.testSplitData.length >0"
                                                 style="margin-top: 10px;">
                                                <el-table :data="testTask.testSplitData" border style="width: 100%"
                                                          v-show="testTask.testtaskvisible">
                                                    <el-table-column prop="user_NAME" label="人员"
                                                                     width="80"></el-table-column>
                                                    <el-table-column prop="task_ID" label="任务编码"
                                                                     width="200"></el-table-column>
                                                    <el-table-column prop="end_DATE" :formatter="splitDataFormatter"
                                                                     label="完成日期"></el-table-column>
                                                    <el-table-column prop="responsible_MODULE"
                                                                     label="负责模块"></el-table-column>
                                                    <el-table-column prop="facility_NAME" label="难易度"
                                                                     width="70"></el-table-column>
                                                    <el-table-column prop="expect_TIME"
                                                                     label="预计用时（小时）"></el-table-column>
                                                    <el-table-column prop="actual_TIME"
                                                                     label="实际用时（小时）"></el-table-column>
                                                    <el-table-column prop="remark" label="备注"></el-table-column>
                                                    <el-table-column label="操作" width="180">
                                                        <template slot-scope="scope">
                                                            <div style="text-align: center">
                                                                <el-button size="mini" type="primary"
                                                                           style="float: none;display: inline-block"
                                                                           v-if="scope.row.state_ID == 307"
                                                                           @click="testTaskStart(scope.$index, scope.row)">
                                                                    开始
                                                                </el-button>
                                                                <el-button size="mini" type="primary"
                                                                           style="float: none;display: inline-block"
                                                                           @click="goTestTask(scope.$index, scope.row)"
                                                                           v-if="scope.row.state_ID == 312">进入
                                                                </el-button>
                                                                <el-button size="mini" type="primary"
                                                                           style="float: none;display: inline-block"
                                                                           v-if="scope.row.state_ID == 312"
                                                                           @click="splitTestFinish(scope.$index, scope.row)">
                                                                    完成
                                                                </el-button>
                                                                <span v-if="scope.row.state_ID == 313"
                                                                      style="color: green">已完成</span>
                                                            </div>
                                                        </template>
                                                    </el-table-column>
                                                </el-table>
                                            </div>
                                        </div>
                                    </div>
                                    <!--点击进入显示和添加步骤-->
                                    <div v-if="testTask.showTaskStep">
                                        <div class="table-list">
                                            <div class="clear" style="margin-bottom: 10px;">
                                                <el-button size="mini" type="primary" style="float: left;"
                                                           @click="loadbuglist">问题汇总
                                                </el-button>
                                                <el-button size="mini" type="primary" style="float: right;"
                                                           @click="testTask.addvisible = true">新增
                                                </el-button>
                                            </div>
                                            <el-table :data="testTask.tableData" border style="width: 100%">
                                                <el-table-column type="index" label="编号" width="180"></el-table-column>
                                                <el-table-column prop="TEST_STEP" label="步骤"></el-table-column>
                                                <el-table-column prop="TEST_EXPECT" label="预期"></el-table-column>
                                                <el-table-column label="操作" width=100>
                                                    <template slot-scope="scope">
                                                        <el-button size="mini" type="danger"
                                                                   v-if="scope.row.TEST_STATE == undefined"
                                                                   @click="testTaskDel(scope.$index, scope.row)">删除
                                                        </el-button>
                                                        <i style="color: green;font-size: 20px"
                                                           @click="testTaskComplate(scope.row, scope.$index)"
                                                           class="el-icon-success"
                                                           v-if=" scope.row.TEST_STATE == 3"></i>
                                                        <i style="color: red;font-size: 20px" class="el-icon-error"
                                                           @click="testTaskNotAllow(scope.row, scope.$index)"
                                                           v-if=" scope.row.TEST_STATE == 3"></i>
                                                        <span v-if="scope.row.TEST_STATE == 1"
                                                              style="color: green;">已通过</span>
                                                        <span style="color: red"
                                                              v-if="scope.row.TEST_STATE == 0">不通过</span>
                                                        <span style="color: green"
                                                              v-if="scope.row.TEST_STATE == 2">已指派</span>
                                                    </template>
                                                </el-table-column>
                                            </el-table>
                                            <div class="clear" style="margin: 10px 0;">
                                                <el-button size="mini" type="primary" @click="subTestTask">提交
                                                </el-button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="拆分项目详情" name="split" v-if="tabs.allSplittask">
                                <div class="console-tab-content">
                                    <!--判断当前是否被拆分过任务-->
                                    <div class="table-list" v-if="split.hasSplitTaskDataByGroup.length>0">
                                        <el-table :data="split.hasSplitTaskDataByGroup" border style="width: 100%"
                                                  highlight-current-row
                                                  @row-click="splitTaskClick">
                                            <el-table-column prop="DEPT_NAME" label="部门"></el-table-column>
                                            <el-table-column prop="PROJECT" label="任务编码"></el-table-column>
                                            <el-table-column prop="SYSTEM_NAME" label="涉及系统"></el-table-column>
                                            <el-table-column prop="allTime" label="实际用时（小时）"
                                                             width="100"></el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="全程跟踪" name="log">
                                <div class="console-tab-content">
                                    <el-form label-width="60px" label-position="left">
                                        <el-row :gutter="20">
                                            <el-col :span="10" :sm="10">
                                                <el-form-item label="状态：">
                                                    <span style="color: red">{{tabs.state_NAME}}</span>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="6" :sm="6">
                                                <el-form-item label="发送人：" label-width="100px">
                                                    {{tabs.user_NAME}}
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="24" :sm="24">
                                                <p v-for="(item,index) in tabs.genzong" class="genzong">
                                                    <span style="display: inline-block;width: 30px">{{index+1}}.</span>
                                                    <span>{{item.record_START | date}}</span>{{item.record_DESC}}
                                                </p>
                                            </el-col>
                                        </el-row>
                                    </el-form>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="实时统计" name="count">
                                <div class="console-tab-content">
                                    a
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                    <!--控制台部分-->
                </div>
            </div>
        </el-card>
        <!--新增-->
        <el-dialog title="新增" :visible="addneeds.addvisible" width="80%"
                   append-to-body modal-append-to-body :before-close="clearAddData">
            <el-form label-width="100px">
                <el-row :md="24" :gutter="20">
                    <!--原需求编号-->
                    <el-col :span="24" :md="24" v-if="addneeds.addform.oldcode">
                        <el-form-item label="原需求编号">
                            <span style="color: #FF6600;cursor: pointer">{{addneeds.addform.oldcode}}</span>
                        </el-form-item>
                    </el-col>
                    <!--需求编号-->
                    <el-col :span="12" :md="12">
                        <el-form-item label="需求类型">
                            <el-select :disabled="addneeds.notAllowChooseType" v-model="addneeds.addform.needstype" clearable
                                       placeholder="请选择需求类型"
                                       style="width: 100%" @change="changeType">
                                <el-option v-for="item in addneeds.addform.needstypeArr" :label="item.neel_TYPE_NAME"
                                           :value="item.neel_TYPE_ID"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="需求编号">
                            <el-input v-model="addneeds.addform.code" disabled
                                      v-if="!addneeds.addform.codeArr"></el-input>
                            <el-select :disabled="addneeds.notAllowChooseType" v-if="addneeds.addform.codeArr" v-model="addneeds.addform.code" clearable
                                       placeholder="请选择需求类型"
                                       style="width: 100%">
                                <el-option v-for="item in addneeds.addform.codeArr" :label="item"
                                           :value="item"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="需求名称">
                            <el-input v-model="addneeds.addform.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="成果类型">
                            <el-select v-model="addneeds.addform.resulttype" clearable placeholder="请选择成果类型"
                                       style="width: 100%">
                                <el-option v-for="item in addneeds.addform.resulttypeArr" :label="item"
                                           :value="item"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="需求影响面">
                            <el-select v-model="addneeds.addform.affect" clearable placeholder="请选择影响面"
                                       style="width: 100%">
                                <el-option v-for="item in addneeds.addform.affectArr" :label="item"
                                           :value="item"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="优先级评定">
                            <el-select v-model="addneeds.addform.level" clearable placeholder="请选择优先级"
                                       style="width: 100%;">
                                <el-option v-for="item in addneeds.addform.levelArr" :label="item.rriority_NAME"
                                           :value="item.rriority_ID"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="需求划分归属">
                            <el-select v-model="addneeds.addform.attribution" clearable placeholder="请选择需求划分归属"
                                       style="width: 100%;">
                                <el-option v-for="item in addneeds.addform.attributionArr" :label="item"
                                           :value="item"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="涉及产品线">
                            <el-input v-model="addneeds.addform.productline" placeholder="请填写涉及产品线"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="申请日期">
                            <el-date-picker type="date" placeholder="选择日期" v-model="addneeds.addform.shenqingdate"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="期望上线日期">
                            <el-date-picker type="date" placeholder="选择日期" v-model="addneeds.addform.designdate"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="需求提出部门">
                            <el-select v-model="addneeds.addform.fromdeptId" clearable placeholder="请选择部门"
                                       style="width: 100%" @change="fromdeptchange">
                                <el-option v-for="item in addneeds.addform.fromdeptArr" :label="item.dept_name"
                                           :value="item.dept_id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="需求提出人">
                            <el-select v-model="addneeds.addform.fromdeptroleId" clearable placeholder="请选择人员"
                                       style="width: 100%;">
                                <el-option v-for="item in addneeds.addform.fromdeptroleArr" :label="item.user_NAME"
                                           :value="item.user_ID"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="产品负责人">
                            <el-input v-model="addneeds.addform.sxname"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="重要程度">
                            <el-select v-model="addneeds.addform.zhongyaochegndu" clearable placeholder="请选择重要程度"
                                       style="width: 100%;">
                                <el-option v-for="item in addneeds.addform.zhongyaochegnduArr"
                                           :label="item.importance_NAME" :value="item.importance_ID"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :md="24">
                        <el-form-item label="是否加急" style="height: 42px">
                            <el-row :span="24">
                                <el-col :span="6" :md="6">
                                    <el-radio v-model="addneeds.addform.urgent" label="0">否</el-radio>
                                    <el-radio v-model="addneeds.addform.urgent" label="1">是</el-radio>
                                </el-col>
                                <el-col :span="18" :md="18">
                                    <el-input placeholder="请填写加急原因" v-model="addneeds.addform.urgentreason"
                                              v-if="addneeds.addform.urgent ==1"></el-input>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :md="24">
                        <el-form-item label="需求背景">
                            <el-input v-model="addneeds.addform.reform"></el-input>
                        </el-form-item>
                    </el-col>

                    <!--产品改造点-->
                    <el-col :span="24" :md="24">
                        <el-form-item label="产品改造点">
                            <el-input v-model="addneeds.addform.changepoint"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :md="24" v-if="addneeds.addform.oldchangepoint">
                        <el-form-item label="原产品改造点">
                            <el-input v-model="addneeds.addform.oldchangepoint"></el-input>
                        </el-form-item>
                    </el-col>
                    <!--产品改造点-->

                    <!--需求描述-->
                    <el-col :span="24" :md="24" v-if="addneeds.addform.oldneedsname">
                        <el-form-item label="原需求描述">
                            {{addneeds.addform.oldneedsname}}
                            <!--<el-input type="textarea" v-model="addneeds.addform.oldneedsname" disabled></el-input>-->
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :md="24">
                        <el-form-item label="需求描述">
                            <el-input type="textarea" v-model="addneeds.addform.needsname"></el-input>
                        </el-form-item>
                    </el-col>
                    <!--需求描述-->

                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="clearAddData" size="mini">取 消</el-button>
                <el-button type="primary" @click="subaddForm" size="mini">确 定</el-button>
            </div>
        </el-dialog>
        <!--分配-->
        <el-dialog title="分配" :visible="assign.assignvisible" width="30%"
                   append-to-body modal-append-to-body :before-close="closeDialog" class="assgin-dialog">
            <div slot="title">
                <h2>分配</h2>
                <div class="tab clear">
                    <span :class="{'active':assign.left}"
                          @click="assign.left = true;assign.right = false;assign.searchData = assign.leftlistdata;assign.leftSearch = false">全部部门</span>
                    <span :class="{'active':assign.right}"
                          @click="assign.left = false;assign.right = true;assign.searchData = assign.rightlistdata;assign.leftSearch = true">本部门</span>
                </div>
                <el-input
                        class="search-input"
                        placeholder="请输入姓名"
                        v-model="assign.keyword"
                        @keyup.13="assignSearch($event)"
                        @change="assignSearch" clearable>
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </div>
            <div class="assign-wrapper" v-if="assign.left">
                <ul v-if="!assign.leftSearch">
                    <li v-for="item in assign.searchData" v-if="item.users.length>0">
                        <span class="deptTitle">{{item.dept_name}}</span>
                        <el-checkbox-group v-model="assign.checkList">
                            <el-checkbox v-for="_item in item.users" :label="_item.user_ID+'-'+_item.user_NAME"
                                         class="check-item">
                                {{_item.user_NAME}}
                            </el-checkbox>
                        </el-checkbox-group>
                    </li>
                </ul>
                <div v-if="assign.leftSearch">
                    <el-checkbox-group v-model="assign.checkList">
                        <el-checkbox v-for="item in assign.searchData" :label="item.user_ID+'-'+item.user_NAME"
                                     class="check-item">
                            {{item.user_NAME}}
                        </el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
            <div class="assign-wrapper" v-if="assign.right">
                <el-checkbox-group v-model="assign.checkList">
                    <el-checkbox v-for="item in assign.searchData" :label="item.user_ID+'-'+item.user_NAME"
                                 class="check-item">
                        {{item.user_NAME}}
                    </el-checkbox>
                </el-checkbox-group>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="assign.assignvisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="subAssign" size="mini">提交</el-button>
            </div>
        </el-dialog>
        <!--拆分任务-->
        <el-dialog title="新增拆分任务人员" :visible="split.splitaddvisible" width="60%"
                   append-to-body modal-append-to-body :before-close="closeDialog">
            <el-form label-width="100px">
                <el-form-item label="任务编码">
                    <el-input v-model="split.taskcode" disabled></el-input>
                </el-form-item>
                <el-form-item label="系统名">
                    <el-col :span="24">
                        <el-radio v-model="split.splitradio" label="1">测试任务</el-radio>
                        <el-radio v-model="split.splitradio" label="2">开发任务</el-radio>
                        <el-select style="margin-left: 20px;" v-model="split.choosesysyem"
                                   placeholder="请选择" v-if="split.splitradio == 2">
                            <el-option v-for="item in split.systemAll" :label="item.name+item.version"
                                       clearable :value="item.name+item.version"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="人员">
                    <el-select v-model="split.person" placeholder="请选择人员"
                               style="width: 100%">
                        <el-option v-for="item in split.personlist" :label="item.user_NAME"
                                   :value="item.user_ID+'-'+item.user_NAME"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="完成日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="split.finishdate"
                                    style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="负责模块">
                    <el-input v-model="split.model" placeholder="请输入负责模块"></el-input>
                </el-form-item>
                <el-form-item label="难易度" v-if="split.splitradio == 2">
                    <el-select v-model="split.levelchoosen" placeholder="请选择难易度"
                               style="width: 100%">
                        <el-option v-for="item in split.level" :label="item.FACILITY_NAME"
                                   :value="item.FACILITY_ID+'-'+item.FACILITY_NAME"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="预计用时">
                    <el-col :span="24">
                        <el-input v-model="split.usetime" placeholder="请输入预计用时（小时）"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="split.splitaddvisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="splitSub" size="mini">确定</el-button>
            </div>
        </el-dialog>
        <!--开发点击完成-->
        <el-dialog title="您已超出任务规定时间" :visible="taskFinished.taskFinishedvisible" width="60%"
                   append-to-body modal-append-to-body
                   :before-close="closeDialog">
            <el-form label-width="120px">
                <el-form-item label="请填写实际用时">
                    <el-input v-model="taskFinished.usetime"></el-input>
                </el-form-item>
                <el-form-item label="请填写超时原因">
                    <el-input v-model="taskFinished.reason"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="taskFinished.taskFinishedvisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="subFinishTask" size="mini">确定</el-button>
            </div>
        </el-dialog>
        <!--测试新增步骤-->
        <el-dialog title="新增步骤" :visible="testTask.addvisible" width="60%"
                   append-to-body modal-append-to-body
                   :before-close="closeDialog">
            <el-form label-width="100px"
                     label-position="left">
                <el-form-item label="步骤">
                    <el-input v-model="testTask.step"></el-input>
                </el-form-item>
                <el-form-item label="预期">
                    <el-input v-model="testTask.result"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="testTask.addvisible = false;testTask.step = '';testTask.result = ''" size="mini">取
                    消
                </el-button>
                <el-button type="primary" @click="addTestStep" size="mini">确定</el-button>
            </div>
        </el-dialog>
        <!--问题汇总-->
        <el-dialog title="问题汇总" :visible="testTask.buglistvisible" width="60%"
                   append-to-body modal-append-to-body
                   :before-close="closeDialog">
            <div class="table-list">
                <div class="clear">
                    <el-button style="float: right;margin: 10px 0" type="primary" size="mini" @click="bugListAssign">
                        分配
                    </el-button>
                </div>
                <el-table :data="testTask.buglistTableData" ref="testTask_bug" border style="width: 100%"
                          class="testTask_bugtable"
                          @selection-change="buglistChange">
                    <el-table-column type="selection" width="55" :selectable="assignCheckedAble"></el-table-column>
                    <el-table-column type="index" label="编号" width="180"></el-table-column>
                    <el-table-column prop="ASSIGNOR_PERSON_NAME" label="人员"></el-table-column>
                    <el-table-column prop="TEST_DESC" label="问题描述"></el-table-column>
                    <el-table-column prop="TEST_EXPECT" label="预期效果"></el-table-column>
                </el-table>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="testTask.buglistvisible = false" size="mini">取消</el-button>
            </div>
            <el-dialog title="请选择分配人员" :visible="testTask.assignvisible" width="40%"
                       append-to-body modal-append-to-body :before-close="closeAssign">
                <el-select v-model="testTask.assignPerson" placeholder="请选择" style="float: none;display: block;">
                    <el-option
                            v-for="item in testTask.assignArr"
                            :label="item.user_NAME"
                            :value="item.user_ID+','+item.user_NAME">
                    </el-option>
                </el-select>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="assignpersonAction" size="mini" type="primary">确定</el-button>
                </div>
            </el-dialog>
        </el-dialog>
        <!--拆分项目详情-->
        <el-dialog title="拆分项目详情和分析结果" :visible="split.hasSplitvisible" width="80%"
                   append-to-body modal-append-to-body
                   :before-close="closeDialog">
            <el-form label-width="120px">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="分析结果">{{split.reviewData.ANALYSIS_RESULT}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="分析时间">{{split.reviewData.ANALYSIS_TIME | date_y_m_d}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label=" 预期开始时间">{{split.reviewData.EXPECT_START | date_y_m_d}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label=" 预期结束时间">{{split.reviewData.EXPECT_END | date_y_m_d}}</el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label=" 风险点">{{split.reviewData.TASK_RISK}}</el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="table-list">
                <el-table :data="split.hasSplitTaskData" height="280" border style="width: 100%">
                    <el-table-column label="任务类型">
                        <template slot-scope="scope">
                            <div style="text-align: center">
                                <span v-if="!scope.row.system_NAME">测试任务</span>
                                <span v-if="scope.row.system_NAME">开发任务</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="user_NAME" label="人员" width="150"></el-table-column>
                    <el-table-column prop="system_NAME" label="系统名"></el-table-column>
                    <el-table-column prop="task_ID" label="任务编码" width="190"></el-table-column>
                    <el-table-column prop="end_DATE" :formatter="splitDataFormatter"
                                     width="120" label="完成日期"></el-table-column>
                    <el-table-column prop="responsible_MODULE" label="负责模块"></el-table-column>
                    <el-table-column prop="facility_NAME" label="难易度" width="80"></el-table-column>
                    <el-table-column prop="expect_TIME" label="预计用时（小时）" width="100"></el-table-column>
                    <el-table-column prop="actual_TIME" label="实际用时（小时）" width="100"></el-table-column>
                    <el-table-column label="状态" width="80">
                        <template slot-scope="scope">
                            <div style="text-align: center">
                                <span v-if="scope.row.state_ID ==306" style="color: red">待开发</span>
                                <span v-if="scope.row.state_ID ==308" style="color: red">开发中</span>
                                <span v-if="scope.row.state_ID ==307" style="color: red">待测试</span>
                                <span v-if="scope.row.state_ID ==312" style="color: red">测试中</span>
                                <span v-if="scope.row.state_ID == 313" style="color: green">已完成</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-dialog>
        <!--所有的bug清单-->
        <el-dialog title="BUG清单" :visible="testTask.allBUGvisible" width="80%"
                   append-to-body modal-append-to-body
                   :before-close="closeDialog">
            <div class="table-list">
                <el-table :data="testTask.allBugs" border style="width: 100%">
                    <el-table-column prop="bug_ID" label="序号" width="190"></el-table-column>
                    <el-table-column prop="start_DATE" label="提交日期" width="110"></el-table-column>
                    <el-table-column prop="start_TIME" label="提交时间"></el-table-column>
                    <el-table-column prop="assignor_NAME" label="提交人"></el-table-column>
                    <el-table-column prop="desired_RESULT" label="预期效果"></el-table-column>
                    <el-table-column prop="problem_DESCRIPTION" label="问题描述"></el-table-column>
                    <el-table-column prop="assignor_PERSON_NAME" label="指派人"></el-table-column>
                    <el-table-column prop="user_NAME" label="完成人"></el-table-column>
                </el-table>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="testTask.allBUGvisible = false;" size="mini">取
                    消
                </el-button>
            </div>
        </el-dialog>
        <!--展示给开发人员的bug-->
        <el-dialog title="当前BUG" :visible="testTask.codeBUGlistvisible"
                   append-to-body modal-append-to-body width="85%"
                   :before-close="closeDialog">
            <div class="table-list">
                <el-table :data="testTask.codeBUGData" border style="width: 100%">
                    <el-table-column prop="bug_ID" label="编号" width="190"></el-table-column>
                    <el-table-column prop="start_DATE" label="提交日期" width="110"></el-table-column>
                    <el-table-column prop="start_TIME" label="提交时间"></el-table-column>
                    <el-table-column prop="assignor_NAME" label="提交人"></el-table-column>
                    <el-table-column prop="desired_RESULT" label="预期效果"></el-table-column>
                    <el-table-column prop="problem_DESCRIPTION" label="问题描述"></el-table-column>
                    <el-table-column prop="assignor_PERSON_NAME" label="指派人"></el-table-column>
                    <el-table-column prop="user_NAME" label="完成人"></el-table-column>
                    <el-table-column label="操作" width="160">
                        <template slot-scope="scope">
                            <div style="text-align: center">
                                <el-button size="mini" type="primary" style="display: inline-block;float: none"
                                           v-if="scope.row.bug_STATE ==0"
                                           @click="codeBUGAction(scope.$index, scope.row,'完成')">完成
                                </el-button>
                                <el-button size="mini" type="danger" style="display: inline-block;float: none"
                                           v-if="scope.row.bug_STATE ==0"
                                           @click="codeBUGAction(scope.$index, scope.row,'转接')">转接
                                </el-button>
                                <span v-if="scope.row.bug_STATE ==1" style="color: green">已完成</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-dialog title="请选择转接人员" :visible="testTask.assignvisible_code" width="40%"
                       append-to-body modal-append-to-body :before-close="closeAssign_code">
                <el-select v-model="testTask.assignPerson_code" placeholder="请选择" style="float: none;display: block;">
                    <el-option
                            v-for="item in testTask.assignArr_code"
                            :label="item.user_NAME"
                            :value="item.user_ID+','+item.user_NAME">
                    </el-option>
                </el-select>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="assignpersonAction($event,'code')" size="mini" type="primary">确定</el-button>
                </div>
            </el-dialog>
        </el-dialog>
        <el-dialog title="请选择转接人员" :visible="transfer.transfervisible">
            <el-select v-model="transfer.people" placeholder="请选择转接人员">
                <el-option
                        v-for="item in transfer.peopleArr"
                        :label="item.user_NAME"
                        :value="item.user_ID">
                </el-option>
            </el-select>
            <div slot="footer" class="dialog-footer"
                 append-to-body modal-append-to-body width="85%" :before-close="closeDialog">
                <el-button @click="transfer.transfervisible = false;transfer.people = ''" size="mini">取消</el-button>
                <el-button @click="transferSub($event,'code')" size="mini" type="primary">确定</el-button>
            </div>
        </el-dialog>


        <!--开发手册的弹窗-->
        <el-dialog title="开发手册" :visible="codeupload.modelvisible" width="60%"
                   append-to-body modal-append-to-body
                   :before-close="closeDialog">
            <div class="table-list">
                <el-table :data="codeupload.uploadFile" border style="width: 100%">
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
        <!--用例模板的弹窗-->
        <el-dialog title="用例模板" :visible="testTask.modelvisible" width="60%"
                   append-to-body modal-append-to-body
                   :before-close="closeDialog">
            <div class="table-list">
                <el-table :data="testTask.uploadFile" border style="width: 100%">
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


        <!--挂起的实际用时-->
        <el-dialog title="挂起" :visible="hang.dialogvisible" width="60%"
                   append-to-body modal-append-to-body
                   :before-close="closeDialog">
            <el-form label-width="120px">
                <el-form-item label="请填写实际用时">
                    <el-input v-model="hang.usetime"></el-input>
                </el-form-item>
                <el-form-item label="请填写挂起原因">
                    <el-input v-model="hang.reason"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="hang.dialogvisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="hangsub" size="mini">确定</el-button>
            </div>
        </el-dialog>
        <!--转接的实际用时-->
        <el-dialog title="转接" :visible="transfer.dialogvisible" width="60%"
                   append-to-body modal-append-to-body
                   :before-close="closeDialog">
            <el-form label-width="120px">
                <el-form-item label="请选择转接人员">
                    <el-select v-model="transfer.person" placeholder="请选择人员"
                               style="width: 100%">
                        <el-option v-for="item in transfer.personArr" :label="item.user_NAME"
                                   :value="item.user_ID+'-'+item.user_NAME"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="请填写实际用时">
                    <el-input v-model="transfer.usetime"></el-input>
                </el-form-item>
                <el-form-item label="请填写转接原因">
                    <el-input v-model="transfer.reason"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="transfer.dialogvisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="transferSub" size="mini">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                addneeds: {
                    addif:false,//新增按钮的判断
                    notAllowChooseType: false,//是否能修改需求类型
                    addvisible: false,
                    addProject: true,
                    addType: '',//判断性质呢过类型，add 为重新新增，change 为新建变更 changeinset 为需求内变更,edit表示被驳回后编辑
                    addform: {
                        //需求编号随选择变化
                        "code": "",//需求编号
                        "oldcode": "",//原需求编号
                        "newcode": "",//新需求编号
                        "codeArr": [],//需求编号数组
                        "sjxt": "",//涉及系统
                        "name": "",//需求名称
                        "sxname": "",//提出人
                        "fromdeptId": "",//选择的需求来源部门ID
                        "fromdeptArr": "",//部门数组
                        "fromdeptroleId": "",//选择的需求来源人
                        "fromdeptroleArr": "",//择的需求来源人数组
                        "zhongyaochegndu": "",//重要程度
                        "zhongyaochegnduArr": "",//重要程度数组
                        "level": "",//优先级
                        "levelArr": "",//优先级数组
                        "shenqingdate": "",//申请日期
                        "designdate": "",//期望上线投产日期
                        "oldneedsname": "",//原需求描述
                        "needsname": "",//需求描述
                        "newneedsname": "",//新需求描述
                        "code_start": "",//开发开始时间
                        "code_end": "",//开发结束时间
                        "test_start": "",//测试开始时间
                        "test_end": "",//测试结束时间
                        "urgent": "",//是否加急0不加急1加急
                        "urgentreason": "",//加急原因
                        // ------------------------------新增的
                        "needstypeArr": [],//需求类型
                        "needstype": [],//需求类型
                        "resulttypeArr": [],//成果类型
                        "resulttype": [],//成果类型
                        "affectArr": [],//影响面
                        "affect": [],//影响面
                        "attributionArr": [],//归属划分
                        "attribution": [],//归属划分
                        "productline": "",//涉及产品线
                        "reform": "",//需求背景
                        "changepoint": "",//产品改造点
                        "oldchangepoint": "",//原产品改造点
                        "newchangepoint": "",//新产品改造点
                    }
                },
                //分配操作
                assign: {
                    assignvisible: false,//分配的弹窗
                    keyword: "",//分配的搜索人员
                    left: true,//左侧的显示
                    right: false,//右侧的显示
                    checkList: [],//选择的数据
                    leftlistdata: [],//左侧显示的数据
                    rightlistdata: [],//右侧显示的数据
                    leftSearch: false,//左侧搜索出来的结构展示
                    searchData: [],//左侧特殊结构，显示出来的搜索结果存放处
                },
                //拆分任务
                split: {
                    hasSplitvisible: false,
                    hasSplitTaskDataByGroup: [],//展示拆分任务的分组
                    hasSplitTaskData: [],//展示当前的分组拆分任务
                    codetask: [],//开发的任务
                    systemAll: [{
                        "name": "", "version": ""
                    }],//所有选择的系统集合
                    splitradio: "",//拆分任务类型（1为测试任务，2为开发任务）
                    splitvisible: false,
                    splitaddvisible: false,//新增人员的显示框
                    choosesysyem: "",//选择的系统值
                    systemarr: [],//所填写过的的系统数组,
                    levelchoosen: "",//难易度选择的值,
                    level: [],//难易度数组
                    version: "",//版本号
                    startdate: "",//预计开始日期
                    enddate: "",//预计结束日期
                    finishdate: "",//完成日期
                    tableData: [],//拆分任务的表数据
                    model: "",//负责模块
                    taskcode: "",//任务编码
                    personlist: [],//课选择人员的人员数组
                    person: "",//选择的人员
                    names: [],//放置姓名的数组
                    ids: [],//放置id的数组
                    usetime: "",//预计用时
                    //拆分项目详情的分析结果
                    reviewData: {
                        TASK_RISK: "",//风险点
                        ANALYSIS_RESULT: "",//分析结果
                        ANALYSIS_TIME: "",//分析时间
                        EXPECT_END: "",//预期结束时间
                        EXPECT_START: "",//预期开始时间
                    },
                },
                states: [],//状态筛选
                selectValue: "",//选择的筛选的值
                dateComp: {},//日期筛选的值
                keyword: "",//搜索关键词
                table: {
                    tableHeight: "",//表格高度
                    tableData: [],//表格展示数据
                    tableOriginData: [],//表格源数据
                },
                tabs: {
                    state_NAME: "",//当前状态
                    user_NAME: "",//当前负责人
                    activeTableInfo: "",//当前选中的信息表格
                    activeName: "info",
                    codetask: false,//开发人员操作台
                    testtask: false,//测试人员操作台
                    allSplittask: false,//测试的栏目判断（技术经理能看到所有的项目）
                    consoleWrapperVisible: false,//控制台的显示
                    consoleActionVisible: false,//控制台的操作显示/隐藏
                    consoleActionData: [],//操作的权限数据
                    codeActionData: [],//开发的权限数据
                    testActionData: [],//测试的权限数据
                    tabsData: {
                        state_NAME: "",//当前状态

                        technology_NEEL_ID: "",//需求编号
                        newtechnology_NEEL_ID: "",//新需求编号
                        oldtechnology_NEEL_ID: "",//原需求编号

                        neel_NAME: "",//需求名称
                        type: "",//需求类型
                        result: "",//成果类型
                        influece: "",//需求影响面
                        rriority_NAME: "",//优先级评定
                        ascription: "",//需求划分归属
                        prduct_LINE: "",//涉及产品线
                        start_DATE: "",//申请日期
                        end_DATE: "",//期望上线日期
                        neel_SOURCE: "",//需求来源部门和人员
                        user_NAME: "",//产品负责人
                        importance_NAME: "",//重要程度
                        urgent: "",//是否加急
                        urgent_NAME: "",//加急原因
                        background: "",//需求背景

                        product_FUNCTION: "",//产品改造点
                        newproduct_FUNCTION: "",//新产品改造点
                        oldproduct_FUNCTION: "",//旧产品改造点

                        neel_DESCRIPTION: "",//需求描述
                        newneel_DESCRIPTION: "",//新需求描述
                        oldneel_DESCRIPTION: "",//旧需求描述

                        fali: "",//验收不通过
                        remark: "",//驳回理由
                        code_start: "",//开发开始时间
                        code_end: "",//开发结束时间
                        test_start: "",//测试开始时间
                        test_end: "",//测试结束时间
                        oldcode: "",//原需求编号
                    },
                },
                //测试任务操作台的内容
                testTask: {
                    modelvisible: false,//用例模板的可见
                    hasTask: false,//判断是否有测试任务
                    typevalue: "",//用例类型选择的值（汉字）
                    showTaskStep: false,//展示步骤的表格
                    uploadFile: [],//上传的文件
                    testtaskvisible: true,//拆分后的任务的表格
                    testSplitData: [],//测试被分配的任务的表格信息
                    typeArr: [],//测试任务用例类型
                    type: "",//用例类型选择的值
                    testTaskActiveInfo: "",//当前正在进行的任务
                    tableData: [],//表格内容
                    addvisible: false,//弹窗的展示
                    step: "",//步骤
                    result: "",//预期效果,
                    fileList: "",//提交的文件列表
                    buglistvisible: false,//bug清单的展示
                    buglistTableData: [],//问题汇总的信息
                    BUGActiveData: [],//选中的待分配的bug
                    assignvisible: false,//分配给人员弹窗
                    assignArr: [],//可以分配的人员的数组
                    assignPerson: "",//分配给人员的信息
                    codeBUGlistvisible: false,//展示开发人员的bug的弹窗
                    codeBUGData: [],//开发人员的BUG的数据
                    assignvisible_code: false,//开发转接人员的弹窗
                    assignArr_code: [],//开发人员调用转接人员的数组
                    assignPerson_code: "",//开发选择转接人员
                    bugid_code: "",//开发人员转接的bugid
                    allBugs: [],//所有的bug信息
                    allBUGvisible: false,//BUG清单的展示
                },
                //开发和测试点击完成时超时情况的数据
                taskFinished: {
                    taskFinishedvisible: false,
                    taskId: "",//当前任务ID
                    usetime: "",//实际用时
                    reason: "",//超时原因
                },
                //挂起对应操作
                hang: {
                    hangvisible: false,//挂起操作栏
                    dialogvisible: false,//挂起的弹窗
                    hangtableData: [],//表格数据
                    hangActiveData: [],//选中的挂起信息
                    usetime: "",//实际用时
                    reason: "",//挂起原因
                    task_id: "",//任务ID
                    sign: "",//
                },
                //转接操作
                transfer: {
                    dialogvisible: false,
                    personArr: [],//人员数组
                    person: "",//选择的人员
                    reason: "",//理由
                    usetime: "",//实际用时
                    task_id: "",//任务ID
                    sign: "",//状态
                },
                //需求审批
                ifPing: {
                    visible: false,
                    rriority: "",//优先级的值
                    rriorityArr: [],//优先级数组
                    checksArr: [],//评审结果数组
                    checks: "",//评审结果数组
                    date: "",//评审日期
                    person: "",//参会人
                },
                //技术经理评审
                review: {
                    reviewvisible: false,//
                    fxDate: "",//分析时间
                    risk: "",//风险点
                    resultArr: [],//分析结果数组
                    result: "",//分析结果
                    startDate: "",//开始时间
                    endDate: "",//结束时间
                },
                //开发的上传脚本
                codeupload: {
                    uploadFile: [],//上传的文件信息
                    modelvisible: false,
                },
            }
        },
        mounted(){
            this.loadData();
        },
        filters: {
            date(time) {
                let d = new Date(time);
                let year = d.getFullYear();
                let month = (d.getMonth() + 1) < 10 ? '0' + d.getMonth() : '' + d.getMonth() + 1;
                let day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
                let hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours();
                let minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes();
                let seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : '' + d.getSeconds();
                return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
            },
            date_y_m_d(time){
                let d = new Date(time);
                let year = d.getFullYear();
                let month = (d.getMonth() + 1) < 10 ? '0' + d.getMonth() : '' + d.getMonth() + 1;
                let day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
                return year + '-' + month + '-' + day
            }
        },
        methods: {
            calculate(){
                let height = document.querySelector(".mainr").offsetHeight;
//                let card_header_height = document.querySelector(".el-card__header").offsetHeight;
                let card_body = document.querySelector(".box-card .el-card__body");
                card_body.style.height = height - 36 + "px";
                //表格高度
                this.calculateTableHeight(this.tabs.consoleWrapperVisible);
                //tab高度
                if (this.tabs.consoleWrapperVisible) {
                    this.calculateTabsHeight();
                }
            },
            //计算表格高度
            calculateTableHeight(type){
                let height = document.querySelector(".mainr").offsetHeight;
                let actionHeight = document.querySelector(".content .action").offsetHeight;
                //true代表没有控制台
                if (!type) {
                    //----------------------------------------------body的上下padding--table的margin-top-table上border
                    this.table.tableHeight = height - 36 - actionHeight - 20 - 20 - 1;
                } else {
                    this.table.tableHeight = height * 0.3;
                }
            },
            //计算操作台的高度
            calculateTabsHeight(){
                let card_body = document.querySelector(".box-card .el-card__body");
                let actionHeight = document.querySelector(".content .action").offsetHeight;
                let allTabContent = document.querySelectorAll(".console-tab-content");
                for (let i of allTabContent) {
                    //---------------el-card__body的可用内容高---------顶部操作栏的高---------表格部分的高------tab的头和margin的高----------操作台border
                    i.style.height = (parseInt(card_body.style.height) - 20 ) - actionHeight - (this.table.tableHeight + 20) - (20 + 40) - 2 + "px";
                }
            },
            //关闭控制台
            setConsoleVisible(){
                this.tabs.consoleWrapperVisible = false;
                this.calculateTableHeight(false)
            },
            //控制台选项卡点击时间
            tabClick(val){
                this.calculateTabsHeight();
            },
            //加载列表数据和
            loadData(){
                //初始化栏目展示情况
                this.tabs.codetask = false;
                this.tabs.testtask = false;
                this.tabs.allSplittask = false;
                this.tabs.activeName = "info";
                //初始化控制台的可视情况
                this.tabs.consoleWrapperVisible = false;
                this.$maskin();
                this.calculate();
                let params = new URLSearchParams();
                this.$axios.post("/demand/getdemandTechnology", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.table.tableData = data.result.technologyList;
                        this.table.tableOriginData = data.result.technologyList;
                        //加载状态筛选
                        this.states = data.result.states;
                        //判断新增权限
                        if(data.result.DEPT_SAVE){
                            this.addneeds.addif = true;
                        }
//                        if(this.$route.params.neelId){
//                            let id = this.$route.params.neelId;
//                            for(let i of data){
//                                if(i.technology_NEEL_ID == id){
//                                    this.handleCurrentChange(i);
//                                    this.$refs.jsxq_table.setCurrentRow(i);
//                                    break;
//                                }
//                            }
//                            return;
//                        }
                        this.$maskoff();
                    }
                })
            },
            //关闭弹窗
            closeDialog(){
                this.addneeds.addvisible = false;//关闭新增的弹窗
                this.assign.assignvisible = false;//分配的弹窗
                this.split.splitaddvisible = false;//拆分任务添加人员的弹窗
                this.taskFinished.taskFinishedvisible = false;//开发人员超时填写原因和实际用时的弹窗
                this.split.hasSplitvisible = false;//查看已拆分任务详情
                this.testTask.addvisible = false;//测试新增步骤弹窗
                this.testTask.buglistvisible = false;//测试的bug待分配弹窗
                this.testTask.codeBUGlistvisible = false;//开发人员查看bug的弹窗
                this.testTask.codeBUGlistvisible = false;//开发转接bug弹窗
                this.testTask.allBUGvisible = false;//bug清单的展示弹窗
                this.transfer.transfervisible = false;//转接显示人员的弹窗
                this.testTask.modelvisible = false;//用例模板的弹窗
                this.codeupload.modelvisible = false;//开发手册的弹窗
                this.hang.dialogvisible = false;//挂起原因
            },
            //----------------------------------------------表格点击事件
            //初始化操作
            resetAllStatus(){
                //初始化当前活动的控制台
                this.tabs.activeName = "info";
                //初始化栏目展示情况
                this.tabs.codetask = false;//开发控制台
                this.tabs.testtask = false;//测试控制台
                this.tabs.allSplittask = false;//所有的拆分项目详情
                //初始化技术管理部评审
                this.ifPing.visible = false;
                //初始化技术经理审批
                this.review.reviewvisible = false;
                //清空拆分任务信息
                this.clearSplitSub();
                //初始化用例类型
                this.testTask.typevalue = "";
                this.testTask.type = "";
                //初始化测试控制台的界面
                this.resetTestEnter();
                //初始化挂起转接操作台
                this.hang.hangvisible = false
            },
            handleCurrentChange(val){
                //点击时初始化操作
                this.resetAllStatus();
                this.tabs.activeTableInfo = val;
                if (!this.tabs.consoleWrapperVisible) {
                    this.tabs.consoleWrapperVisible = true;
                    setTimeout(() => {
                        this.calculate()
                    }, 0);
                }
                this.loadTabsData(val);
            },
            //加载控制台信息
            loadTabsData(val){
                this.$maskin();
                let params = new URLSearchParams();
                params.append("TECHNOLOGY_NEEL_ID", val.technology_NEEL_ID);
                params.append("STATE", this.tabs.activeTableInfo.state);
                this.$axios.post("/demand/technologyId", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        //以下是初始化其需要根据状态变化而展示数据
                        this.tabs.tabsData.oldtechnology_NEEL_ID = "";//原需求ID
                        this.tabs.tabsData.newtechnology_NEEL_ID = "";//新需求ID
                        this.tabs.tabsData.oldproduct_FUNCTION = "";//原产品功能
                        this.tabs.tabsData.newproduct_FUNCTION = "";//新产品功能
                        this.tabs.tabsData.oldneel_DESCRIPTION = "";//原需求描述
                        this.tabs.tabsData.newneel_DESCRIPTION = "";//新需求描述


                        let info = data.result.technology;
                        //---------------加载详情页基本信息（新创建时的基本信息）
                        this.tabs.tabsData.state_NAME = info.state_NAME;//当前状态
                        this.tabs.tabsData.technology_NEEL_ID = info.technology_NEEL_ID;//需求编号
                        this.tabs.tabsData.neel_NAME = info.neel_NAME;//需求名称
                        this.tabs.tabsData.neel_SOURCE = info.neel_SOURCE;//需求来源部门和人员
                        this.tabs.tabsData.start_DATE = info.start_DATE;//申请日期
                        this.tabs.tabsData.end_DATE = info.end_DATE;//期望上线日期
                        this.tabs.tabsData.user_NAME = info.user_NAME;//产品负责人
                        this.tabs.tabsData.urgent = info.urgent == 1 ? "是" : "否";//是否加急
                        this.tabs.tabsData.urgent_NAME = info.urgent_NAME;//加急原因
                        this.tabs.tabsData.product_FUNCTION = info.product_FUNCTION;//产品改造点
                        this.tabs.tabsData.neel_DESCRIPTION = info.neel_DESCRIPTION;//需求描述
                        this.tabs.tabsData.rriority_NAME = info.rriority_NAME;//优先级评定
                        this.tabs.tabsData.importance_NAME = info.importance_NAME;//重要程度

                        //---------新增内容
                        this.tabs.tabsData.type = info.neel_TYPE_NAME;//需求类型
                        this.tabs.tabsData.background = info.background;//需求背景
                        this.tabs.tabsData.result = info.result;//成果类型
                        this.tabs.tabsData.influece = info.influece;//需求影响面
                        this.tabs.tabsData.ascription = info.ascription;//需求划分归属
                        this.tabs.tabsData.prduct_LINE = info.prduct_LINE;//涉及产品线

                        //判断是否被驳回过，展示驳回理由
                        info.remark?this.tabs.tabsData.remark = info.remark : ""


                        //-----------------------------判断开发和测试控制台的加载--------------
                        if (data.result.codeTask && data.result.codeTask.length) {
                            this.tabs.codetask = true;
                            //是否有开发任务
                            data.result.codeTask.length > 0 ?
                                this.$set(this.split, "codetask", data.result.codeTask) : this.$set(this.split, "codetask", []);
                        }
                        if (data.result.testTask) {
                            //是否有测试任务
                            this.testTask.testTaskActiveInfo = "";
                            if (data.result.testTask.length > 0) {
                                this.$set(this.testTask, "testSplitData", data.result.testTask);
                                this.tabs.testtask = true;
                                this.testTask.hasTask = true;
                            } else {
                                this.$set(this.testTask, "testSplitData", []);
                                this.testTask.hasTask = false;
                            }
                        }

                        //----------------判断是否上传了用例模板
                        if (data.result.testFiles) {
                            this.$set(this.testTask, "uploadFile", data.result.testFiles);
                        }

                        //----------------判断是否上传了开发手册
                        if (data.result.codeFiles) {
                            this.$set(this.codeupload, "uploadFile", data.result.codeFiles);
                        }

                        //当前变更已被新建，要展示新的需求ID，描述和改造点
                        if (info.oletechnology_NEEL_ID && info.state == 320) {
                            this.tabs.tabsData.newtechnology_NEEL_ID = info.oletechnology_NEEL_ID;//新需求ID
                            this.tabs.tabsData.newproduct_FUNCTION = info.oleproduct_FUNCTION;//新产品产品改造点
                            this.tabs.tabsData.newneel_DESCRIPTION = info.oleneel_DESCRIPTION;//新需求描述
                        }else{
                            //当前是新建后的新的变更，要展示旧的需求ID，描述和改造点
                            this.tabs.tabsData.oldtechnology_NEEL_ID = info.oletechnology_NEEL_ID;//旧需求ID
                            this.tabs.tabsData.oldproduct_FUNCTION = info.product_NEW_FUNCTION;//旧的产品产品改造点
                            this.tabs.tabsData.oldneel_DESCRIPTION = info.neel_NEW_DESCRIPTION;//旧需求描述
                        }


                        //-----------------------------设置权限
                        this.setConsoleAction(data.result);

                        //----------------------加载详情页的bug列表
                        if (data.result.bugs.length) {
                            this.$set(this.testTask, "allBugs", data.result.bugs);
                        }

                        //------------------------设置全程跟踪数据
                        this.tabs.state_NAME = info.state_NAME;
//                        this.tabs.user_NAME = info.apply_NAME;
                        this.$set(this.tabs, "genzong", data.result.records);

                        //-----------------判断当前任务是否被拆分过（只有技术管理部和技术经理才能看到所有的拆分任务）
                        if (data.result.systemDepts && data.result.systemDepts.length > 0) {
                            this.tabs.allSplittask = true;
                            console.log(data.result.systemDepts)
                            //计算合计用时
                            let num = 0;
                            for (let i of data.result.systemDepts) {
                                if (i.allTime) {
                                    num += parseInt(i.allTime);
                                }
                            }
                            this.split.allUseTime = num + "小时"
                            this.$set(this.split, "hasSplitTaskDataByGroup", data.result.systemDepts)
                        } else {
                            this.$set(this.split, "hasSplitTaskDataByGroup", []);
                        }

                        //---------------------------------判断用例类型
                        //未选择过
                        data.result.types ?
                            this.$set(this.testTask, "typeArr", data.result.types) :
                            this.$set(this.testTask, "typeArr", []);
                        //选择过则展示
                        data.result.TYPE_NAME ? this.testTask.typevalue = data.result.TYPE_NAME : data.result.TYPE_NAME = "";

                        this.$maskoff();
                    }
                })
            },
            //根据当需求状态返回当前操作的判断
            setConsoleAction(data){
                let arr = [];
                for (let i in data) {
                    if (data.hasOwnProperty(i) && typeof data[i] == "string") {
                        if (i == "TYPE_NAME") {
                            continue;
                        }
                        //技术管理部评审加载数据
                        if (i == "REVIEW") {
                            this.$set(this.ifPing, "rriorityArr", data.rriority);//优先级
                            this.$set(this.ifPing, "checksArr", data.checks);//评审结果
                        }
                        arr.push({"key": i, "name": data[i]})
                    }
                }
                this.$set(this.tabs, "consoleActionData", arr);
            },
            //新建需求前拉数据
            start_addneeds(){
                this.$maskin();
                this.addneeds.addType = "add";//当前是重新建立变更
                let params = new URLSearchParams();
                this.$axios.post("/demand/gettypelist", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.addneeds.addform.code = data.result.technology_NEEL_ID;//需求编号
                        this.addneeds.addform.sxname = data.result.USERNAME;//产品提出人
                        this.$set(this.addneeds.addform, "fromdeptArr", data.result.depts);//来源部门数组
                        this.$set(this.addneeds.addform, "zhongyaochegnduArr", data.result.importance);//重要程度
                        this.$set(this.addneeds.addform, "levelArr", data.result.rrioritylist);//优先级
                        this.$set(this.addneeds.addform, "needstypeArr", data.result.baseTypeName);//需求类型
                        this.$set(this.addneeds.addform, "affectArr", data.result.influece);//影响面
                        this.$set(this.addneeds.addform, "resulttypeArr", data.result.result);//成果类型
                        this.$set(this.addneeds.addform, "attributionArr", data.result.ascription);//需求归属划分
                        this.addneeds.addvisible = true;
                        this.$maskoff();
                    }
                })
            },
            //获取需求编号
            changeType(){
                this.addneeds.addform.code = "";
                this.$set(this.addneeds.addform, "codeArr", "");
                this.addneeds.addform.codeChoosen = "";
                if (this.addneeds.addform.needstype) {
                    let params = new URLSearchParams();
                    params.append("NEEL_TYPE_ID", this.addneeds.addform.needstype);
                    this.$axios.post("/demand/technologyID", params).then((res) => {
                        let data = res.data;
                        if (data.code == 200) {
                            if (typeof data.result.rt != "string") {
                                this.addneeds.addform.code = "";
                                this.$set(this.addneeds.addform, "codeArr", data.result.rt);
                            } else {
                                this.addneeds.addform.code = data.result.rt;
                            }
                        }
                    })
                }
            },
            //提交新建需求
            subaddForm(){
                let url = "";
                if (!this.addneeds.addform.name) {
                    this.$warn("请填写需求名称");
                    return;
                }
                if (!this.addneeds.addform.needstype) {
                    this.$warn("请选择需求类型");
                    return;
                }
                if (!this.addneeds.addform.resulttype) {
                    this.$warn("请选择成果类型");
                    return;
                }
                if (!this.addneeds.addform.affect) {
                    this.$warn("请选择需求影响面");
                    return;
                }
                if (!this.addneeds.addform.level) {
                    this.$warn("请选择优先级");
                    return;
                }
                if (!this.addneeds.addform.attribution) {
                    this.$warn("请选择需求划分归属");
                    return;
                }
                if (!this.addneeds.addform.productline) {
                    this.$warn("请填写涉及产品线");
                    return;
                }
                if (!this.addneeds.addform.shenqingdate) {
                    this.$warn("请填写申请日期");
                    return;
                }
                if (!this.addneeds.addform.designdate) {
                    this.$warn("请填写期望上线日期");
                    return;
                }
                if (!this.addneeds.addform.fromdeptId) {
                    this.$warn("请选择提出部门");
                    return;
                }
                if (!this.addneeds.addform.fromdeptroleId) {
                    this.$warn("请选择提出人");
                    return;
                }
                if (!this.addneeds.addform.sxname) {
                    this.$warn("请填写负责人");
                    return;
                }
                if (!this.addneeds.urgent == "") {
                    this.$warn("请选择是否加急");
                    return;
                }
                if (!this.addneeds.urgent == "1" && this.addneeds.urgentreason == "") {
                    this.$warn("请填写加急原因");
                    return;
                }
                if (!this.addneeds.addform.zhongyaochegndu) {
                    this.$warn("请填写重要程度");
                    return;
                }
                if (!this.addneeds.addform.reform) {
                    this.$warn("请填写需求背景");
                    return;
                }
                if (!this.addneeds.addform.changepoint) {
                    this.$warn("请填写产品改造点");
                    return;
                }
                if (!this.addneeds.addform.needsname) {
                    this.$warn("请填写需求描述");
                    return;
                }
                this.$maskin();
                let params = new URLSearchParams();
                params.append("NEEL_TYPE", this.addneeds.addform.needstype);//需求类型
                params.append("TECHNOLOGY_NEEL_ID", this.addneeds.addform.code);	//需求编码
                params.append("NEEL_NAME", this.addneeds.addform.name);	//需求名称
                params.append("START_DATES", this.addneeds.addform.shenqingdate);//申请日期
                params.append("END_DATES", this.addneeds.addform.designdate);//计划投产日期
                params.append("PRODUCT_FUNCTION", this.addneeds.addform.changepoint);//产品改造点
                params.append("NEEL_SOURCE_DEPT_ID", this.addneeds.addform.fromdeptId);//需求来源部门
                params.append("NEEL_SOURCE_USER_ID", this.addneeds.addform.fromdeptroleId);//需求来源人员
                params.append("RRIORITY", this.addneeds.addform.level);//（t_communal;）优先级ID 101：紧急 102：中等 103：一般
                params.append("IMPORTANCE", this.addneeds.addform.zhongyaochegndu);//重要程度ID 201：普通  202：重要
                params.append("NEEL_DESCRIPTION", this.addneeds.addform.needsname);//需求描述
                params.append("USER_NAME", this.addneeds.addform.sxname);//产品负责人
                params.append("URGENT", this.addneeds.addform.urgent);//是否加急0不加急，1加急
                params.append("URGENT_NAME", this.addneeds.addform.urgentreason);//加急原因
                //------------------新增
                params.append("INFLUECE", this.addneeds.addform.affect);//需求影响面
                params.append("RESULT", this.addneeds.addform.resulttype);//成果类型
                params.append("ASCRIPTION", this.addneeds.addform.attribution);//需求划分归属
                params.append("PRDUCT_LINE", this.addneeds.addform.productline);//涉及产品线
                params.append("BACKGROUND", this.addneeds.addform.reform);//需求背景
                //------------------新增
                //加急的判断
                if (this.addneeds.addform.urgent) {
                    params.append("URGENT", this.addneeds.addform.urgentreason);//加急描述
                }
                if (this.addneeds.addType == "change") {
                    //新建变更
                    params.append("OLETECHNOLOGY_NEEL_ID", this.addneeds.addform.oldcode);//旧需求ID
                    url = "/demand/insertinserttechnolog"
                } else if (this.addneeds.addType == "add") {
                    //新建
                    url = "/demand/settechnologyadd"
                } else if (this.addneeds.addType == "changeinset") {
                    //需求内变更
                    url = ""
                } else if (this.addneeds.addType == "edit") {
                    //修改编辑
                    url = "/demand/updatetechnology";
                }
                this.$axios.post(url, params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$success("操作成功！");
                        this.clearAddData();
                        this.loadData();
                    }
                });
            },
            //清楚新增表格的数据
            clearAddData(){
                this.addneeds.addvisible = false;
                this.addneeds.notAllowChooseType = false;
                for (let i in this.addneeds.addform) {
                    if(this.addneeds.addform.hasOwnProperty(i)){
                        this.addneeds.addform[i] = ""
                    }
                }
            },
            //新建时部门change事件
            fromdeptchange(){
                this.addneeds.addform.fromdeptroleId = "";
                let choosenId = this.addneeds.addform.fromdeptId;
                for (let i of this.addneeds.addform.fromdeptArr) {
                    if (i.dept_id == choosenId) {
                        this.$set(this.addneeds.addform, "fromdeptroleArr", i.users)
                    }
                }
            },
            //点击新需求和旧需求进行跳转
            goNeedList(e, code, type){
                for (let i of this.table.tableOriginData) {
                    if (i.technology_NEEL_ID == code) {
                        this.handleCurrentChange(i);
                        this.$refs.jsxq_table.setCurrentRow(i)
                    }
                }
            },
            //------------------------------------拆分任务详情点击事件，展示数据
            splitTaskClick(val){
                this.$set(this.split, "hasSplitTaskData", []);
                //为空时不展示内容
                if (!val.infos || val.infos.length == 0) {
                    return;
                }
                this.split.hasSplitvisible = true;
                this.$set(this.split, "hasSplitTaskData", val.infos);

                this.split.reviewData.TASK_RISK = val.TASK_RISK;//风险点
                this.split.reviewData.ANALYSIS_RESULT = val.ANALYSIS_RESULT;//分析结果
                this.split.reviewData.ANALYSIS_TIME = val.ANALYSIS_TIME;//分析时间
                this.split.reviewData.EXPECT_END = val.EXPECT_END;//预期结束时间
                this.split.reviewData.EXPECT_START = val.EXPECT_START;//预期开始时间
            },
            //----------------------------------操作台的权限点击事件--------------------------------
            consoleActionEvent(val){
                switch (val.key) {
                    case "REVIEW":
                        //技术管理部需求评审
                        this.ping();
                        break;
                    case "PERSONCHECK":
                        //技术经理需求分析
                        this.beginreview();
                        break;
                    case "EDIT":
                        //技术经理的审批前修改
                        this.editNeed();
                        break;
                    case "NEWUPDATE":
                        //新建变更
                        this.newchange("change");
                        break;
                    case "ASSIGN":
                        //分配
                        this.getAssign();
                        break;
                    case "SPLIT":
                        //拆分任务
                        this.hang.hangvisible = false;//关闭掉挂起控制台
                        this.splitTask();
                        break;
                    case "CONFRIM":
                        //验收操作
                        this.acceptance();
                        break;
                    case "KBJ":
                        //编辑操作
                        this.editNeed();
                        break;
                    case "KCH":
                        //撤回操作
                        this.backNeed();
                        break;
                    case "DRAW":
                        //驳回操作
                        this.rejected();
                        break;
                    case "SIGN":
                        //点击挂起加载数据
                        this.split.splitvisible = false;//关闭掉拆分任务控制台
                        this.loadHangData();
                        break;
                }
            },
            //---------------------------------------------编辑操作
            editNeed(){
                this.$maskin();
                let params = new URLSearchParams();
                params.append("TECHNOLOGY_NEEL_ID", this.tabs.activeTableInfo.technology_NEEL_ID);
                this.$axios.post("/demand/updatetechFront", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        let info = data.result.technology;
                        //加载数据
                        this.addneeds.addform.code = info.technology_NEEL_ID;//需求编号
                        this.addneeds.addform.needstype = info.neel_TYPE;//需求类型
                        //不能再次修改类型
                        this.addneeds.notAllowChooseType = true;
                        this.addneeds.addform.name = info.neel_NAME;//需求名称
                        this.addneeds.addform.needstypeArr = data.result.baseTypeName;//需求类型
                        this.addneeds.addform.resulttypeArr = data.result.result;//成果类型
                        this.addneeds.addform.resulttype = info.result;//成果类型
                        this.addneeds.addform.affectArr = data.result.influece;//需求影响面
                        this.addneeds.addform.affect = info.influece;//需求影响面
                        this.addneeds.addform.levelArr = data.result.rrioritylist;//优先级评定
                        this.addneeds.addform.level = info.rriority;//优先级评定
                        this.addneeds.addform.attributionArr = data.result.ascription;//需求划分归属
                        this.addneeds.addform.attribution = info.ascription;//需求划分归属
                        this.addneeds.addform.productline = info.prduct_LINE;//涉及产品线
                        this.addneeds.addform.shenqingdate = new Date(info.start_DATE);//申请日期
                        this.addneeds.addform.designdate = new Date(info.end_DATE);//期望上线日期
                        this.addneeds.addform.fromdeptArr = data.result.depts;//需求提出部门
                        this.addneeds.addform.fromdeptId = parseInt(info.neel_SOURCE_DEPT_ID);//需求提出部门
                        this.fromdeptchange(info.dept_ID);
                        this.addneeds.addform.fromdeptroleId = info.neel_SOURCE_USER_ID;//需求提出人
                        this.addneeds.addform.sxname = info.user_NAME;//产品负责人
                        this.addneeds.addform.zhongyaochegnduArr = data.result.importance;//重要程度
                        this.addneeds.addform.zhongyaochegndu = info.importance;//重要程度
                        this.addneeds.addform.urgent = info.urgent == 1 ? "1" : "0";//是否加急
                        this.addneeds.addform.urgentreason = info.urgent_NAME;//加急原因
                        this.addneeds.addform.reform = info.background;//需求背景
                        this.addneeds.addform.changepoint = info.product_FUNCTION;//产品改造点
                        this.addneeds.addform.needsname = info.neel_DESCRIPTION;//需求描述
                        this.addneeds.addType = "edit";//当前是编辑状态
                        //显示弹窗
                        this.addneeds.addvisible = true;
                        this.$maskoff();
                    }
                })
            },
            //------------------------------------技术管理部审批
            ping(){
                this.ifPing.visible = true;
                this.ifPing.rriority = "";//初始化优先级的值
                this.ifPing.checks = "";//初始化评审结果
                this.ifPing.date = "";//初始化评审日期
                this.ifPing.person = "";//初始化参会人
            },
            //技术管理部审批提交
            subPing(){
                let ping = this.ifPing;
                if (!ping.rriority) {
                    this.$warn("请选择优先级");
                    return;
                }
                if (!ping.checks) {
                    this.$warn("请选择评审结果");
                    return;
                }
                if (!ping.date) {
                    this.$warn("请选择评审时间");
                    return;
                }
                if (!ping.person) {
                    this.$warn("请填写参会人");
                    return;
                }
                this.$maskin();
                let params = new URLSearchParams();
                params.append("TECHNOLOGY_NEEL_ID", this.tabs.activeTableInfo.technology_NEEL_ID);
                params.append("CHECK_TYPE", ping.checks.split("-")[1]);
                params.append("CHECK_ID", ping.checks.split("-")[0]);
                params.append("CHECK_TIME", ping.date);
                params.append("CHECK_NAME", ping.person);
                this.$axios.post("/demand/reviewBase", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$success("操作成功！");
                        this.ifPing.visible = false;
                        this.loadTabsData(this.tabs.activeTableInfo)
                    }
                })
            },
            //-----------------------------------------技术经理需求分析
            //开启需求分析功能
            beginreview(){
                this.$maskin();
                let params = new URLSearchParams();
                this.$axios.post("/demand/personCheckFront", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        let review = this.review;
                        for (let i in review) {
                            if (review.hasOwnProperty(i)) {
                                review[i] = ""
                            }
                        }
                        this.review.reviewvisible = true;
                        this.$set(this.review, "resultArr", data.result);
                        this.$maskoff();
                    }
                })
            },
            //提交需求分析
            reviewSub(){
                if (!this.review.startDate) {
                    this.$warn("请选择预计开始日期");
                    return;
                }
                if (!this.review.endDate) {
                    this.$warn("请选择预计完成日期");
                    return;
                }
                if (!this.review.fxDate) {
                    this.$warn("请选择分析日期");
                    return;
                }
                if (!this.review.result) {
                    this.$warn("请选择分析结果");
                    return;
                }
                if (!this.review.risk) {
                    this.$warn("请填写风险点");
                    return;
                }
                this.$maskin();
                let params = new URLSearchParams();
                params.append("TECHNOLOGY_NEEL_ID", this.tabs.activeTableInfo.technology_NEEL_ID);
                params.append("EXPECT_START", this.review.startDate);
                params.append("EXPECT_END", this.review.endDate);//
                params.append("ANALYSIS_TIME", this.review.fxDate);//分析时间
                params.append("ANALYSIS_RESULT", this.review.result);//分析结果
                params.append("TASK_RISK", this.review.risk);//风险点
                this.$axios.post("/demand/personCheck", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$success("操作成功！");
                        let review = this.review;
                        for (let i in review) {
                            if (review.hasOwnProperty(i)) {
                                review[i] = ""
                            }
                        }
                        this.review.reviewvisible = false;
                        this.$maskoff();
                        this.loadTabsData(this.tabs.activeTableInfo);
                    }
                })
            },
            //新建变更和需求内变更
            newchange(type){
                this.$maskin();
                if (type == "change") {
                    this.addneeds.addType = "change";//当前是新建变更
                } else {
                    this.addneeds.addType = "changeinset";//当前是新建变更
                }
                let params = new URLSearchParams();
                params.append("TECHNOLOGY_NEEL_ID", this.tabs.activeTableInfo.technology_NEEL_ID);
                this.$axios.post("/demand/updatetechFront", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        let info = data.result.technology;
                        this.addneeds.addform.sxname = data.result.USERNAME;//产品提出人
                        this.addneeds.addform.oldcode = info.technology_NEEL_ID;
                        this.$set(this.addneeds.addform, "fromdeptArr", data.result.depts);//来源部门数组
                        this.$set(this.addneeds.addform, "zhongyaochegnduArr", data.result.importance);//重要程度
                        this.$set(this.addneeds.addform, "levelArr", data.result.rrioritylist);//优先级
                        this.$set(this.addneeds.addform, "needstypeArr", data.result.baseTypeName);//需求类型
                        this.$set(this.addneeds.addform, "affectArr", data.result.influece);//影响面
                        this.$set(this.addneeds.addform, "resulttypeArr", data.result.result);//成果类型
                        this.$set(this.addneeds.addform, "attributionArr", data.result.ascription);//需求归属划分

                        if (type == "changeinset") {
                            //需求内变更需展示
                            this.addneeds.addform.oldchangepoint = info.product_FUNCTION;//原需求改造点
                            this.addneeds.addform.oldneedsname = info.neel_DESCRIPTION;//原需求描述
                        } else {
                            //新建变更无需展示
                            this.addneeds.addform.oldchangepoint = "";
                            this.addneeds.addform.oldneedsname = "";
                        }
                        this.addneeds.addvisible = true;
                        this.$maskoff();
                    }
                })
            },
            //------------------------------------------点击挂起加载任务数据
            loadHangData(){
                this.$maskin();
                let params = new URLSearchParams();
                params.append("TECHNOLOGY_NEEL_ID", this.tabs.activeTableInfo.technology_NEEL_ID);
                this.$axios.post("/demand/gettechnologyoleid", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.hang.hangvisible = true;
                        this.$set(this.hang, "hangtableData", data.result);
                        this.$maskoff();
                    }
                })
            },
            //挂起点击操作
            //sing:0挂起，1恢复
            hangAction(val){
                this.hang.task_id = val.task_ID;
                this.hang.sign = val.sign;
                this.hang.dialogvisible = true;
            },
            //挂起提交
            hangsub(){
                if (!this.hang.usetime) {
                    this.$warn("请填写实际用时");
                    return;
                }
                if (!this.hang.reason) {
                    this.$warn("请填写挂起原因");
                    return;
                }
                this.$maskin();
                let params = new URLSearchParams();
                params.append("ACTUAL_TIME", this.hang.usetime);//实际用时
                params.append("SIGN_REAMRK", this.hang.reason);//原因
                params.append("TASK_ID", this.hang.task_id);//任务ID
                params.append("TECHNOLOGY_NEEL_ID", this.tabs.activeTableInfo.technology_NEEL_ID);//需求ID
                params.append("SIGN", this.hang.sign);
                this.$axios.post("/demand/hanguptechnologyProject", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.hang.usetime = "";
                        this.hang.reason = "";
                        this.hang.dialogvisible = false;
                        this.$success("操作成功！");
                        this.loadHangData();
                        this.$maskoff();
                    }
                })
            },
            //恢复操作
            restore(row){
                this.$maskin();
                let params = new URLSearchParams();
                params.append("TECHNOLOGY_NEEL_ID", this.tabs.activeTableInfo.technology_NEEL_ID);
                params.append("TASK_ID", row.task_ID);
                params.append("SIGN", row.sign);
                this.$axios.post("/demand/hanguptechnologyProject", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$success("操作成功！");
                        this.loadHangData();
                        this.$maskoff();
                    }
                })
            },
            //转接操作
            transferAction(row){
                this.$maskin();
                let params = new URLSearchParams();
                this.$axios.post("/demand/queryPersonByDept", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.transfer.task_id = row.task_ID;
                        this.transfer.sign = row.sign;
                        this.$set(this.transfer, "personArr", data.result.dept.users);
                        this.transfer.dialogvisible = true;
                        this.$maskoff();
                    }
                })
            },
            //提交转接操作
            transferSub(){
                this.$maskin();
                let info = this.transfer;
                let params = new URLSearchParams();
                params.append("TASK_ID", info.task_id);//拆分任务ID
                params.append("ACTUAL_TIME", info.usetime);
                params.append("PERSONNEL_ID", info.person.split("-")[0]);
                params.append("PERSON_NAME", info.person.split("-")[1]);
                params.append("PERSONNEL_REMARK", info.reason);//原因
                params.append("SIGN", info.sign);
                params.append("TECHNOLOGY_NEEL_ID", this.tabs.activeTableInfo.technology_NEEL_ID);//需求ID
                this.$axios.post("/demand/transfertechnologyProject", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        //清除数据
                        this.transfer.usetime = "";
                        this.transfer.reason = "";
                        this.transfer.person = "";
                        this.transfer.dialogvisible = false;
                        this.$success("操作成功！");
                        //转接过后存在任务消失或新增现象，不能局部刷新，要重新拉取数据
                        this.handleCurrentChange(this.tabs.activeTableInfo);
                    }
                })
            },
            //--------------------------------- 撤回操作
            backNeed(){
                this.confirm("是否进行撤回操作？", () => {
                    this.$maskin();
                    let params = new URLSearchParams();
                    params.append("TECHNOLOGY_NEEL_ID", this.tabs.activeTableInfo.technology_NEEL_ID);
                    this.$axios.post("/demand/uptechnologyl", params).thne((res) => {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$success("操作成功！");
                            this.$maskoff();
                            this.loadData();
                        }
                    })
                })
            },
            //--------------------------------- 驳回操作
            rejected(){
                this.prompt("驳回", "请填写驳回原因", ({value}) => {
                    if (!{value}.value) {
                        this.$warn("请填写驳回原因");
                        return;
                    }
                    this.$maskin();
                    let params = new URLSearchParams();
                    params.append("REMARK", {value}.value);
                    params.append("TECHNOLOGY_NEEL_ID", this.tabs.activeTableInfo.technology_NEEL_ID);
                    params.append("STATE", this.tabs.activeTableInfo.state);
                    this.$axios.post("/demand/UptechnologyId", params).then((res) => {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$success("操作成功！");
                            this.$maskoff();
                            this.loadData();
                        }
                    })
                })
            },
            //----------------------------------验收操作
            //验收操作
            acceptance(){
                this.confirm("请选择验收结果", () => {
                    //验收通过
                    let info = this.tabs.activeTableInfo;
                    this.$maskin();
                    let params = new URLSearchParams();
                    params.append("TECHNOLOGY_NEEL_ID", info.technology_NEEL_ID);
                    params.append("STATE", info.state);
                    params.append("OPER", "OK");
                    this.$axios.post("/demand/baseAccept", params).then((res) => {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$success("操作成功！");
                            this.$maskoff();
                            this.loadData();
                        }
                    })
                }, () => {
                    //验收不通过
                    this.prompt("验收不通过", "请填写不通过理由", (value) => {
                        if (!value.value) {
                            this.$warn("请填写不通过理由");
                            return;
                        }
                        let info = this.tabs.activeTableInfo;
                        this.$maskin();
                        let params = new URLSearchParams();
                        params.append("TECHNOLOGY_NEEL_ID", info.technology_NEEL_ID);
                        params.append("OPER", "FAIL");
                        params.append("REJECT_RESON", value.value);
                        params.append("STATE", info.state);
                        this.$axios.post("/demand/baseAccept", params).then((res) => {
                            let data = res.data;
                            if (data.code == 200) {
                                this.$success("操作成功！");
                                this.$maskoff();
                                this.loadData();
                            }
                        })
                    })
                }, ["通过", "不通过"])
            },
            //------------------------------------分配任务
            getAssign(){
                let info = this.tabs.activeTableInfo;
                this.assign.eyword = "";
                this.assign.checkList = [];
                this.assign.assignvisible = true;
                this.$maskin();
                let params = new URLSearchParams();
                if (info.state == 304) {
                    params.append("TASK_ID", info.technology_NEEL_ID);
                }
                this.$axios.post("/demand/queryUserByDemand", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$set(this.assign, "searchData", data.result.allDept);
                        this.$set(this.assign, "leftlistdata", data.result.allDept);
                        this.$set(this.assign, "rightlistdata", data.result.dept.users);
                        this.$maskoff()
                    }
                })
            },
            //分配任务搜索功能
            assignSearch(){
                let keyword = this.assign.keyword;
                let type;
                if (this.assign.left) {
                    type = "left"
                } else {
                    type = "right"
                }
                //搜索关键字判断
                if (keyword == "") {
                    //为空
                    this.assign.leftSearch = false;
                    this.$set(this.assign, "searchData", type == "left" ? this.assign.leftlistdata : this.assign.rightlistdata)
                } else {
                    //不为空
                    let arr = [];
                    if (type == "left") {
                        for (let i of this.assign.leftlistdata) {
                            for (let j of i.users) {
                                if (j.user_NAME.indexOf(keyword) >= 0) {
                                    arr.push(j)
                                }
                            }
                        }
                        this.assign.leftSearch = true;
                    } else {
                        for (let i of this.assign.rightlistdata) {
                            if (i.user_NAME.indexOf(keyword) >= 0) {
                                arr.push(i)
                            }
                        }
                    }
                    this.$set(this.assign, "searchData", arr);
                }
            },
            //提交分配任务
            subAssign(){
                let result = this.assign.checkList;
                if (result.length == 0) {
                    this.$warn("当前没有选择任何人员");
                } else {
                    let temp = [];
                    let idArr = [];
                    let nameArr = [];
                    for (let i of result) {
                        temp.push(i.split("-"))
                    }
                    for (let i of temp) {
                        idArr.push(i[0]);
                        nameArr.push(i[1]);
                    }
                    let info = this.tabs.activeTableInfo;
                    let params = new URLSearchParams();
                    params.append("names", nameArr);
                    params.append("ids", idArr);
                    params.append("TECHNOLOGY_NEEL_ID", info.technology_NEEL_ID);
                    params.append("OLD_STATE", info.state);
                    // OPER 操作(confirm:确认  reject:驳回)
//                    params.append("OPER","confirm");
                    this.$axios.post("/demand/checkBase", params).then((res) => {
                        let data = res.data;
                        if (data.code == 200) {
                            this.assign.assignvisible = false;
                            this.$success("操作成功");
                            this.loadData();
                            this.calculate();
                        }
                    })
                }
            },
            //------------------------------------拆分任务
            splitTask(){
                this.$maskin();
                let info = this.tabs.activeTableInfo;
                let params = new URLSearchParams();
                params.append("TECHNOLOGY_NEEL_ID", info.technology_NEEL_ID);
                //获取下拉框数据和判断当前用户是否有权限操作
                this.$axios.post("/demand/techInfoCheck", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.split.splitvisible = true;
                        if (data.message) {
                            this.$warn(data.message)
                        } else {
                            this.$set(this.split, "systemarr", data.result.system);//设置系统集合
                        }
                        this.$set(this.split, "level", data.result.facility);//设置难易度集合
                        this.$set(this.split, "personlist", data.result.dept.users);//设置人员集合
                        this.$maskoff();
                    }
                })
            },
            //拆分任务时间过滤器
            splitDataFormatter(row, col){
                let date = this.$format(row.end_DATE);
                return `${date.year}-${date.mouth}-${date.day}`
            },
            //新增涉及系统
            systemEvent(index, e){
                let className = e.target.className;
                if (className == "el-icon-plus") {
                    //当期是新增操作
                    if (this.split.systemAll[index].name == "") {
                        this.$warn("请选择系统");
                        return;
                    }
                    if (this.split.systemAll[index].version == "") {
                        this.$warn("请填写版本号");
                        return;
                    }
                    if (this.split.systemAll[index].version.split("v").length !=2 ||
                        this.split.systemAll[index].version.split("V").length !=2 ) {
                        this.$warn("版本号格式有误");
                        return;
                    }
                    this.split.systemAll.push({"name": "", "version": ""})
                } else {
                    //当前是删除操作
                    this.split.systemAll.splice(index, 1)
                }
            },
            //查分任务新增人员弹窗
            addsplitperson(){
                let systemChooseArr = this.split.systemAll;
                if (systemChooseArr.length != 1) {
                    if (systemChooseArr[systemChooseArr.length - 1].name == "" || systemChooseArr[systemChooseArr.length - 1].version == "") {
                        this.split.systemAll.pop()
                    }
                } else {
                    if (systemChooseArr[systemChooseArr.length - 1].name == "" || systemChooseArr[systemChooseArr.length - 1].version == "") {
                        this.$warn("请先选择系统并填写完整信息");
                        return
                    }
                }
                let params = new URLSearchParams();
                //获取任务ID
                this.$axios.post("/demand/techInfoID", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.split.splitaddvisible = true;
                        this.split.taskcode = data.result;
                    }
                })
            },
            //拆分任务新增人员操作
            splitSub(){
                if (this.split.splitradio == "" && this.split.splitradio != 1) {
                    this.$warn("请选择系统名");
                }
                if (this.split.splitradio != 1) {
                    //1为测试任务，不需要选择系统名
                    if (!this.split.choosesysyem) {
                        this.$warn("请选择系统名");
                        return;
                    }
                }
                if (!this.split.person) {
                    this.$warn("请选择分配人员");
                    return;
                }
                if (!this.split.finishdate) {
                    this.$warn("请选择完成日期");
                    return;
                }
                if (!this.split.model) {
                    this.$warn("请填写负责模块");
                    return;
                }
                if (!this.split.levelchoosen && this.split.splitradio != 1) {
                    this.$warn("请选择难易度");
                    return;
                }
                if (!this.split.usetime) {
                    this.$warn("请填写用时");
                    return;
                }
                let end_data = this.$format(new Date(this.split.finishdate));
                let obj = {
                    TASK_ID: this.split.taskcode,//任务编码
                    USER_NAME: this.split.person.split("-")[1],//选择的人名
                    SYSTEM_NAME: this.split.choosesysyem,//选择的系统
                    RESPONSIBLE_MODULE: this.split.model,//模块
                    FACILITY: this.split.splitradio != 1?
                        this.split.levelchoosen.split("-")[0]:"",//难度ID
                    FACILITY_NAME: this.split.splitradio != 1?
                        this.split.levelchoosen.split("-")[1]:"",//难度等级
                    END_DATE: this.split.finishdate,//结束日期
                    end_data_format: `${end_data.year}-${end_data.mouth}-${end_data.day}`,//时间
                    EXPECT_TIME: this.split.usetime//预计用时
                };
                this.split.ids.push(this.split.person.split("-")[0]);
                this.split.names.push(this.split.person.split("-")[1]);
                this.split.tableData.push(obj);
                this.split.splitaddvisible = false;
                this.clearSplitAddPerson();
            },
            //拆分任务删除人员操作
            splitDelete(index){
                this.split.tableData.splice(index, 1);
                this.split.names.splice(index, 1);
                this.split.ids.splice(index, 1)
            },
            clearSplitAddPerson(){
                this.split.splitradio = "";//清空任务类型
                this.split.person = "";//清空选择的人
                this.split.choosesysyem = "";//清空选择的系统值
                this.split.levelchoosen = "";//清空难易度选择的值
                this.split.finishdate = "";//清空完成日期
                this.split.model = "";//清空负责模块
                this.split.taskcode = "";//清空任务编码
                this.split.person = "";//清空选择的人员
                this.split.usetime = "";//清空预计用时
            },
            //提交拆分任务结果
            splitSubmit(){
//                let endTime = this.split.enddate;//预计结束日期
//                let startTime = this.split.startdate;//预计开始日期
//                if (!startTime) {
//                    this.$warn("请选择预计开始日期");
//                    return;
//                }
//                if (!endTime) {
//                    this.$warn("请选择预计结束日期");
//                    return;
//                }
                if (this.split.tableData.length == 0) {
                    this.$warn("请选择分配人员");
                    return;
                }
                this.$maskin();
                let params = new URLSearchParams();
                let info = this.tabs.activeTableInfo;
                let TECH_ID = info.technology_NEEL_ID;//需求ID
                let OLD_STATE = info.state;//当前状态码
                params.append("TECHNOLOGY_NEEL_ID", TECH_ID);
                params.append("OLD_STATE", OLD_STATE);
//                params.append("endTime", endTime);
//                params.append("startTime", startTime);
                params.append("names", this.split.names);
                params.append("ids", this.split.ids);
                params.append("bics", JSON.stringify(this.split.tableData));
                this.$axios.post("/demand/addInfos", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$success("操作成功！");
                        this.loadData();
                        this.$maskoff()
                    }
                });
            },
            //清空拆分任务信息
            clearSplitSub(){
                this.split.splitvisible = false;//关闭操作台
                this.$set(this.split, "systemAll", [{
                    "name": "", "version": ""
                }]);//清空系统
                this.split.startdate = "";//开始时间
                this.split.enddate = "";//结束时间
                this.split.tableData = [];//人员信息
            },
            //-----------------------------------开发的任务
            //开发的开始操作
            splitCodeStart(index, val){
                this.$maskin();
                let info = this.tabs.activeTableInfo;
                let params = new URLSearchParams();
                params.append("TECHNOLOGY_NEEL_ID", info.technology_NEEL_ID);
                params.append("TASK_ID", val.task_ID);
                params.append("STATE_ID", val.state_ID);
                this.$axios.post("/demand/technologyTestto", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$success("操作成功！");
                        this.$maskoff()
                        this.loadData();
                    }
                })
            },
            //开发的完成操作
            splitCodeFinish(index, val){
                let info = this.tabs.activeTableInfo;
                let nowData = new Date();
                let params = new URLSearchParams();
                params.append("TECHNOLOGY_NEEL_ID", info.technology_NEEL_ID);//需求ID
                params.append("TASK_ID", val.task_ID);//拆分任务ID
                params.append("STATE_ID", info.state);
                if (nowData.getTime() <= val.end_DATE) {
                    //在预计时间内完成
                    this.$maskin();
                    this.sendFinished(params)
                } else {
                    this.taskFinished.usetime = "";
                    this.taskFinished.reason = "";
                    this.taskFinished.taskFinishedvisible = true;
                    this.taskFinished.taskId = val.task_ID;
                }
            },
            //完成提交操作
            subFinishTask(){
                let info = this.tabs.activeTableInfo;
                let params = new URLSearchParams();
                if (!this.taskFinished.usetime) {
                    this.$warn("请填写实际用时");
                    return;
                }
                if (!this.taskFinished.reason) {
                    this.$warn("请填写超时原因");
                    return;
                }
                params.append("TECHNOLOGY_NEEL_ID", info.technology_NEEL_ID);//需求ID
                params.append("TASK_ID", this.taskFinished.taskId);//拆分任务ID
                params.append("REMARK", this.taskFinished.reason);//原因
                params.append("ACTUAL_TIME", this.taskFinished.usetime);//实际用时
                this.taskFinished.taskFinishedvisible = false;
                this.$maskin();
                this.sendFinished(params);
            },
            //调用完成接口
            sendFinished(params){
                this.$axios.post("/demand/technologyTestwan", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.taskFinished.taskFinishedvisible = false;
                        this.taskFinished.taskId = "";
                        this.$success("操作成功！");
                        this.$maskoff()
                        this.loadData();
                    }
                })
            },
            //展示给开发人员的bug
            showCodeBUG(){
                let info = this.tabs.activeTableInfo;
                let params = new URLSearchParams();
                params.append("BASE_ID", info.base_NEET_ID);
                this.$axios.post("/base/queryBugByCode", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        if (data.result.bugs.length) {
                            this.$set(this.testTask, "codeBUGData", data.result.bugs);
                            this.testTask.codeBUGlistvisible = true;
                        } else {
                            this.$success("当前无BUG待处理");
                        }
                    }
                })
            },
            //---------------------------------测试的任务操作
            //选择用例类型
            chooseTestType(){
                if (!this.testTask.type) {
                    this.$warn("请选择用例类型");
                    return;
                }
                let info = this.tabs.activeTableInfo;
                let params = new URLSearchParams();
                params.append("TECHNOLOGY_NEEL_ID", info.technology_NEEL_ID);
                params.append("TYPE_NAME", this.testTask.type);
                this.$axios.post("/demand/confirmType", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.testTask.typevalue = this.testTask.type;
                    }
                })
            },
            //上传用例模板和开发的手册
            uploadModel(e, type){
                this.$maskin();
                let file = e.target.files[0];
                let params = new FormData();
                params.append("token", localStorage.getItem("token"));
                params.append("TYPE", type);
                params.append("TECHNOLOGY_NEEL_ID", this.tabs.activeTableInfo.technology_NEEL_ID);
                params.append("file", file);
                this.$axios.post("/demand/upload", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$success("上传成功！");
                        type == "TEST" ?
                            this.testTask.uploadFile.push({
                                "id": data.id,
                                "name": data.name,
                                "size_STRING": parseInt(file.size / 1024) + "kB"
                            }) :
                            this.codeupload.uploadFile.push({
                                "id": data.id,
                                "name": data.name,
                                "size_STRING": parseInt(file.size / 1024) + "kB"
                            })
                        this.$maskoff();
                    }
                });
            },
            //上传用例模板和开发的手册
            //测试点击开始
            testTaskStart(index, val){
                if (!this.testTask.typevalue) {
                    this.$warn("请先选择用例类型");
                    return;
                }
                this.$maskin();
                let info = this.tabs.activeTableInfo;
                let params = new URLSearchParams();
                params.append("TECHNOLOGY_NEEL_ID", info.technology_NEEL_ID);
                params.append("TASK_ID", val.task_ID);
                params.append("STATE_ID", val.state_ID);
                this.$axios.post("/demand/technologyTestto", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$success("操作成功！");
                        this.loadTabsData(val);
                    }
                })
            },
            //下载用例模板和手册
            downloadModel(val){
                this.$axios.get(`/demand/download/?ID=${val.id}&token=${localStorage.getItem('token')}`);
            },
            //测试点击完成
            splitTestFinish(index, val){
                let nowtime = new Date();
                let params = new URLSearchParams();
                if (nowtime.getTime() < val.end_DATE) {
                    this.$maskin();
                    let info = this.tabs.activeTableInfo;
                    let tastid = val.task_ID;
                    params.append("TECHNOLOGY_NEEL_ID", info.technology_NEEL_ID);
                    params.append("TASK_ID", tastid);
                    this.$axios.post("/demand/technologyTestwan", params).then((res) => {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$success("操作成功！");
                            this.testTask.showTaskStep = false;
                            this.loadData();
                        }
                    })
                } else {
                    this.taskFinished.usetime = "";
                    this.taskFinished.reason = "";
                    this.taskFinished.taskFinishedvisible = true;
                    this.taskFinished.taskId = val.task_ID;
                }
            },
            //测试填写超时原因提交
            testSubTask(){
                if (!this.taskFinished.usetime) {
                    this.$warn("请填写实际用时");
                    return;
                }
                if (!this.taskFinished.reason) {
                    this.$warn("请填写超时原因");
                    return;
                }
                let params = new URLSearchParams();
                let info = this.tabs.activeTableInfo;
                params.append("TECHNOLOGY_NEEL_ID", info.technology_NEEL_ID);
                params.append("TASK_ID", this.taskFinished.taskId);
                params.append("ACTUAL_TIME", this.taskFinished.usetime);
                params.append("REMARK", this.taskFinished.reason);
                this.$axios.post("/demand/technologyTestwan", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$success("操作成功！");
                        this.taskFinished.taskId = "";
                        this.taskFinished.taskFinishedvisible = false;
                        this.testTask.showTaskStep = false;
                        this.loadData()
                    }
                })
            },
            //进入测试任务
            goTestTask(index, val){
                this.$maskin();
                this.testTask.testtaskvisible = false;
                this.testTask.testTaskActiveInfo = val;
                let params = new URLSearchParams();
                params.append("TASK_ID", val.task_ID);
                this.$axios.post("/demand/queryTestRecord", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.testTask.showTaskStep = true;
                        if (data.result.btcs) {
                            this.$set(this.testTask, "tableData", data.result.btcs)
                        }
                        this.$maskoff()
                    }
                })
            },
            //初始化到测试控制台点击进入之前
            resetTestEnter(){
                this.testTask.testtaskvisible = true;
                this.testTask.showTaskStep = false;
            },
            //测试新增步骤
            addTestStep(){
                if (!this.testTask.step) {
                    this.$warn("请填写步骤");
                    return;
                }
                if (!this.testTask.result) {
                    this.$warn("请填写预期");
                    return;
                }
                let subObj = {
                    "TEST_STEP": this.testTask.step,
                    "TEST_EXPECT": this.testTask.result,
                };
                this.testTask.tableData.push(subObj);
                this.testTask.step = "";
                this.testTask.result = "";
                this.testTask.addvisible = false;
            },
            //删除新增的步骤
            testTaskDel(index, val){
                this.testTask.tableData.splice(index, 1);
            },
            //提交步骤
            subTestTask(){
                if (!this.testTask.tableData.length) {
                    this.$warn("请添加步骤");
                    return;
                }
                let arr = [];
                for (let i of this.testTask.tableData) {
                    if (i.TEST_STATE == undefined) {
                        arr.push(i)
                    }
                }
                if (arr.length == 0) {
                    this.$warn("请添加步骤");
                    return;
                }
                this.$maskin();
                let info = this.testTask.testTaskActiveInfo;
                let params = new URLSearchParams();
                params.append("TASK_ID", info.task_ID);
                params.append("btcs", JSON.stringify(arr));
                this.$axios.post("/demand/addTestRecord", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$success("操作成功！");
                        this.$set(this.testTask, "tableData", data.result.btcs);
                        this.loadTabsData(this.tabs.activeTableInfo)
                        this.$maskoff();
                    }
                })
            },
            //测试通过
            testTaskComplate(val, index){
                this.confirm("是否通过该项测试？", () => {
                    this.$maskin();
                    let params = new URLSearchParams();
                    params.append("TEST_STATE", 1);
                    params.append("TEST_ID", val.TEST_ID);
                    this.$axios.post("/demand/updateTestRecord", params).then((res) => {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$success("操作成功！");
                            this.$set(this.testTask.tableData[index], "TEST_STATE", 1);
                            this.$maskoff();
                        }
                    })
                });
            },
            //测试不通过
            testTaskNotAllow(val, index){
                this.prompt("不通过", "请填写不通过原因", ({value}) => {
                    let text = {value}.value;
                    if (!text) {
                        this.$warn("请填写不通过原因");
                        return;
                    }
                    let params = new URLSearchParams();
                    params.append("TEST_STATE", 0);
                    params.append("TEST_DESC", text);
                    params.append("TEST_ID", val.TEST_ID);
                    this.$axios.post("/demand/updateTestRecord", params).then((res) => {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$success("操作成功！");
                            this.$set(this.testTask.tableData[index], "TEST_STATE", 0);
                            this.$maskoff();
                        }
                    })
                })
            },
            //问题汇总
            loadbuglist(){
                this.$maskin();
                let info = this.testTask.testTaskActiveInfo;
                let params = new URLSearchParams();
                params.append("TASK_ID", info.task_ID);
                this.$axios.post("/demand/queryTestBug", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$set(this.testTask, "buglistTableData", data.result.testBugs);
                        this.testTask.buglistvisible = true;
                        this.$maskoff()
                    }
                })
            },
            //bug分配给人员
            bugListAssign(){
                if (this.testTask.BUGActiveData.length == 0) {
                    this.$warn("请选择待分配问题");
                    return;
                }
                let params = new URLSearchParams();
                this.$axios.post("/demand/queryPersonByDept", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$set(this.testTask, "assignArr", data.result.dept.users);
                        this.testTask.assignvisible = true;
                    }
                });
            },
            //bug列表选中事件
            buglistChange(val){
                this.$set(this.testTask, "BUGActiveData", val)
            },
            //关闭选择人员的弹窗
            closeAssign(){
                this.testTask.assignvisible = false;
            },
            //关闭开发选择转接人员
            closeAssign_code(){
                this.testTask.assignvisible_code = false;
            },
            //选中人员后进行分配操作(开发的转接bug同样在此处)
            assignpersonAction(e, code){
                if (!code) {
                    //-----------------当前是测试人员的操作
                    if (!this.testTask.assignPerson) {
                        this.$warn("请选择人员");
                        return;
                    }
                    let param = new URLSearchParams();
                    let choosen = this.testTask.assignPerson;
                    let name = choosen.split(",")[1];
                    let id = choosen.split(",")[0];
                    let arr = [];//选中的问题的数组
                    for (let i of this.testTask.BUGActiveData) {
                        arr.push(i.TEST_ID)
                    }
                    let need_id = this.tabs.activeTableInfo.technology_NEEL_ID;//需求ID
                    param.append("PERSON_NAME", name);
                    param.append("PERSON_ID", id);
                    param.append("ids", arr);
                    param.append("TECHNOLOGY_NEEL_ID", need_id);
                    this.$axios.post("/demand/addBug", param).then((res) => {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$success("操作成功！");
                            this.loadbuglist();
                            this.goTestTask("", this.testTask.testTaskActiveInfo)
                            this.testTask.assignPerson = "";//清空选中的人员
                            this.testTask.assignvisible = false;
                        }
                    });
                } else {
                    //-----------------当前是开发的操作
                    if (!this.testTask.assignPerson_code) {
                        this.$warn("请选择人员");
                        return;
                    }
                    let params = new URLSearchParams();
                    let BUG_ID = this.testTask.bugid_code;
                    let TECH_ID = this.tabs.activeTableInfo.technology_NEEL_ID;
                    let PERSON_ID = this.testTask.assignPerson_code.split(",")[0];
                    let PERSON_NAME = this.testTask.assignPerson_code.split(",")[1];
                    params.append("BUG_ID", BUG_ID);
                    params.append("TECHNOLOGY_NEEL_ID", TECH_ID);
                    params.append("PERSON_ID", PERSON_ID);
                    params.append("PERSON_NAME", PERSON_NAME);
                    this.$axios.post("/demand/updateBugState", params).then((res) => {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$success("操作成功！");
                            this.testTask.assignArr_code = false;
                            this.testTask.assignvisible_code = false;
                            this.testTask.assignPerson_code = "";
                            this.$set(this.testTask, "codeBUGData", data.result.bugs)
                        }
                    })
                }
            },
            //分配问题时是否能被选中
            assignCheckedAble(val){
                return val.ASSIGNOR_PERSON_NAME ? false : true
            },
            //展示给开发人员的bug
            showCodeBUG(){
                this.$maskin();
                let info = this.tabs.activeTableInfo;
                let params = new URLSearchParams();
                params.append("TECHNOLOGY_NEEL_ID", info.technology_NEEL_ID);
                this.$axios.post("/demand/queryBugByCode", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        if (data.result.bugs.length) {
                            this.$set(this.testTask, "codeBUGData", data.result.bugs);
                            this.testTask.codeBUGlistvisible = true;
                        } else {
                            this.$success("当前无BUG待处理");
                        }
                        this.$maskoff()
                    }
                })
            },
            //开发的完成和转接操作
            codeBUGAction(index, val, type){
                let info = this.tabs.activeTableInfo;
                let params = new URLSearchParams();
                if (type == "完成") {
                    this.$maskin();
                    params.append("BUG_STATE", 1);
                    params.append("BUG_ID", val.bug_ID);
                    params.append("TECHNOLOGY_NEEL_ID", info.technology_NEEL_ID);
                    this.$axios.post("/demand/updateBugState", params).then((res) => {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$success("操作成功！");
                            this.$maskoff();
                            this.loadTabsData(this.tabs.activeTableInfo)
                            this.showCodeBUG();
                        }
                    })
                } else {
                    this.testTask.bugid_code = val.bug_ID;
                    let params = new URLSearchParams();
                    this.$axios.post("/demand/queryPersonByDept", params).then((res) => {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$set(this.testTask, "assignArr_code", data.result.dept.users);
                            this.testTask.assignvisible_code = true;
                        }
                    });
                }
            },
        }
    }
</script>