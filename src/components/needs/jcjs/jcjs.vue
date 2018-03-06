<style scoped>
    @import "../../../static/css/table.css";
    @import "../../../static/css/console.css";

    .search .el-input {
        width: auto;
    }

    .el-table .cell button {
        display: block;
        margin: 5px auto;
    }

    .el-form-item {
        margin-bottom: 10px;
    }

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
<style>
    .jcjs .el-table td, .jcjs .el-table th {
        padding: 10px 0 !important;
    }
</style>
<template>
    <div class="jcjs common-card-wrap"
         @click="$event.target.className == 'icon-more iconfont'?'':tabs.consoleActionVisible = false">
        <el-card class="box-card">
            <div class="text item">
                <div class="content">
                    <div class="action clear">
                        <el-button type="danger" size="mini" @click="newneeds" v-if="tabs.addProject">立项</el-button>
                        <el-select v-model="selectValue" clearable size="mini">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.key"
                                    :value="item.value">
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
                                        @keyup.13="searchKeyword($event)"
                                >
                                </el-input>
                            </div>
                        </div>
                    </div>
                    <!--表格部分-->
                    <div class="table-list">
                        <el-table :data="table.tableData" border style="width: 100%"
                                  :height="table.tableHeight"
                                  highlight-current-row
                                  @current-change="handleCurrentChange">
                            <el-table-column prop="base_NEET_ID" label="需求编号" width="200"></el-table-column>
                            <el-table-column prop="start_DATE" label="申请日期" width="100"></el-table-column>
                            <el-table-column prop="end_DATE" label="预计完成日期" width="120"></el-table-column>
                            <el-table-column prop="neel_NAME" label="需求名称"></el-table-column>
                            <!--<el-table-column prop="aa" label="涉及系统"></el-table-column>-->
                            <el-table-column prop="rriority_NAME" label="优先级" width="80"></el-table-column>
                            <el-table-column prop="state_NAME" label="状态"></el-table-column>
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
                    <!--表格部分-->
                    <!--控制台部分-->
                    <div class="console-tab-wrapper" v-if="tabs.consoleWrapperVisible">
                        <div class="console-action-wrapper">
                            <i class="el-icon-close close" @click="setConsoleVisible"></i>
                        </div>
                        <el-tabs v-model="tabs.activeName" type="card">
                            <el-tab-pane label="详情页" name="info">
                                <div class="console-tab-content">
                                    <el-form label-width="100px" label-position="left">
                                        <el-row :gutter="20">
                                            <el-col :span="24">
                                                <el-form-item label="状态" style="color: red">
                                                    {{tabs.data_one.state_NAME}}
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12" v-if="tabs.data_one.oldcode">
                                                <el-form-item label="原需求编号">{{tabs.data_one.oldcode}}</el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="需求编号">{{tabs.data_one.base_NEET_ID}}</el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="申请人">{{tabs.data_one.apply_NAME}}</el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="需求名称">{{tabs.data_one.neel_NAME}}</el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="需求来源">{{tabs.data_one.user_NAME}}</el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="申请日期">{{tabs.data_one.start_DATE}}</el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="计划投产日期">{{tabs.data_one.end_DATE}}</el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="优先级">{{tabs.data_one.rriority_NAME}}</el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="重要程度">{{tabs.data_one.importance_NAME}}
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="24">
                                                <el-form-item label="是否加急">
                                                    <span style="margin-right: 40px;">{{tabs.data_one.jiaji}}</span>
                                                    <span style="color: red!important;">{{tabs.data_one.urgent}}</span>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="24" v-if="tabs.data_one.oldproduct">
                                                <el-form-item label="原产品功能">{{tabs.data_one.oldproduct}}</el-form-item>
                                            </el-col>
                                            <el-col :span="24">
                                                <el-form-item label="产品功能">{{tabs.data_one.product_FUNCTION}}</el-form-item>
                                            </el-col>
                                            <el-col :span="24" v-if="tabs.data_one.olddescribe">
                                                <el-form-item label="原产品功能">{{tabs.data_one.olddescribe}}</el-form-item>
                                            </el-col>
                                            <el-col :span="24">
                                                <el-form-item label="需求描述">{{tabs.data_one.neel_DESCRIPTION}}</el-form-item>
                                            </el-col>
                                            <el-col :span="24" v-if="tabs.data_one.reject_RESON" style="color: red">
                                                <el-form-item label="驳回原因">{{tabs.data_one.reject_RESON}}</el-form-item>
                                            </el-col>
                                            <el-col :span="24" v-if="testTask.allBugs">
                                                <el-form-item label="BUG清单" style="color:red">
                                                    <span @click="testTask.allBUGvisible = true"
                                                          style="cursor: pointer">请点击查看</span></el-form-item>
                                            </el-col>
                                            <el-col :span="12" v-if="tabs.data_one.code_start">
                                                <el-form-item label="开发开始时间">{{tabs.data_one.code_start | date}}
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12" v-if="tabs.data_one.code_end">
                                                <el-form-item label="开发完成时间">{{tabs.data_one.code_end | date}}
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12" v-if="tabs.data_one.test_start">
                                                <el-form-item label="测试开始时间">{{tabs.data_one.test_start | date}}
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12" v-if="tabs.data_one.test_end">
                                                <el-form-item label="测试完成时间">{{tabs.data_one.test_end | date}}
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                    </el-form>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="经理操作台" name="console">
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
                                    <div v-if="split.splitvisible">
                                        <el-form label-width="100px" label-position="left">
                                            <el-row :gutter="20" v-for="(item,index) in split.systemAll">
                                                <el-col :span="10">
                                                    <el-form-item label="涉及系统">
                                                        <el-select v-model="item.name" placeholder="请选择">
                                                            <el-option v-for="item in split.systemarr"
                                                                       :label="item.SYSTEM_NAME"
                                                                       :value="item.SYSTEM_NAME"></el-option>
                                                        </el-select>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8">
                                                    <el-input v-model="item.version"
                                                              placeholder="请输入版本号（格式如：v1.0）"></el-input>
                                                </el-col>
                                                <el-col :span="2">
                                                    <i :class="index == 0 && split.systemAll.length == 1?'el-icon-plus':index == split.systemAll.length-1?'el-icon-plus':'el-icon-minus'"
                                                       @click="systemEvent(index,$event)"
                                                       style="line-height: 40px;height: 40px;text-align: center;
                                                font-size: 20px;cursor: pointer;font-weight: bold">
                                                    </i></el-col>
                                            </el-row>
                                            <el-row :gutter="20">
                                                <el-col :span="10">
                                                    <el-form-item label="预计开始日期">
                                                        <el-date-picker type="date" placeholder="选择日期"
                                                                        v-model="split.startdate"
                                                                        style="width: 100%;"></el-date-picker>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="10">
                                                    <el-form-item label="预计结束日期">
                                                        <el-date-picker type="date" placeholder="选择日期"
                                                                        v-model="split.enddate"
                                                                        style="width: 100%;"></el-date-picker>
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>
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
                                                <el-table-column prop="BASE_INFO_ID" label="任务编码"></el-table-column>
                                                <el-table-column prop="end_data_format" label="完成日期"></el-table-column>
                                                <el-table-column prop="RESPONSIBLE_MODULE"
                                                                 label="负责模块"></el-table-column>
                                                <el-table-column prop="FACILITY_NAME" label="难易度"></el-table-column>
                                                <el-table-column prop="REQUIRED_TIME" label="预计用时"></el-table-column>
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
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="开发任务操作台" name="codetask" v-if="tabs.codetask">
                                <div class="console-tab-content">
                                    <div class="table-list" v-if="split.codetask.length >0">
                                        <div class="clear">
                                            <el-button style="float: left;margin: 10px 0" type="primary" size="mini"
                                                       @click="showCodeBUG">BUG清单
                                            </el-button>
                                        </div>
                                        <el-table :data="split.codetask" border style="width: 100%">
                                            <el-table-column prop="user_NAME" label="人员" width="80"></el-table-column>
                                            <el-table-column prop="system_NAME" label="系统名"
                                                             width="150"></el-table-column>
                                            <el-table-column prop="base_INFO_ID" label="任务编码"
                                                             width="200"></el-table-column>
                                            <el-table-column prop="end_DATE" :formatter="splitDataFormatter"
                                                             label="完成日期"></el-table-column>
                                            <el-table-column prop="responsible_MODULE" label="负责模块"></el-table-column>
                                            <el-table-column prop="facility_NAME" label="难易度"
                                                             width="70"></el-table-column>
                                            <el-table-column prop="required_TIME" label="预计用时（小时）"></el-table-column>
                                            <el-table-column prop="actual_TIME" label="实际用时（小时）"></el-table-column>
                                            <el-table-column prop="remark" label="备注"></el-table-column>
                                            <el-table-column label="操作">
                                                <template slot-scope="scope">
                                                    <el-button size="mini" type="primary"
                                                               v-if="!scope.row.start_DATE && tabs.codeActionData.indexOf('开始')>=0"
                                                               @click="splitCodeStart(scope.$index, scope.row)">开始
                                                    </el-button>
                                                    <el-button size="mini" type="primary"
                                                               v-if="scope.row.state_ID != 319 && scope.row.start_DATE && tabs.codeActionData.indexOf('完成')>=0"
                                                               @click="splitCodeFinish(scope.$index, scope.row)">完成
                                                    </el-button>
                                                    <span v-if="scope.row.state_ID == 319"
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
                                        <div>
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
                                                    <el-table-column prop="base_INFO_ID" label="任务编码"
                                                                     width="200"></el-table-column>
                                                    <el-table-column prop="end_DATE" :formatter="splitDataFormatter"
                                                                     label="完成日期"></el-table-column>
                                                    <el-table-column prop="responsible_MODULE"
                                                                     label="负责模块"></el-table-column>
                                                    <el-table-column prop="facility_NAME" label="难易度"
                                                                     width="70"></el-table-column>
                                                    <el-table-column prop="required_TIME"
                                                                     label="预计用时（小时）"></el-table-column>
                                                    <el-table-column prop="actual_TIME"
                                                                     label="实际用时（小时）"></el-table-column>
                                                    <el-table-column prop="remark" label="备注"></el-table-column>
                                                    <el-table-column label="操作" width="180">
                                                        <template slot-scope="scope">
                                                            <div style="text-align: center">
                                                                <el-button size="mini" type="primary"
                                                                           style="float: none;display: inline-block"
                                                                           v-if="scope.row.state_ID == 308 && tabs.testActionData.indexOf('开始')>=0"
                                                                           @click="testTaskStart(scope.$index, scope.row)">
                                                                    开始
                                                                </el-button>
                                                                <el-button size="mini" type="primary"
                                                                           style="float: none;display: inline-block"
                                                                           @click="goTestTask(scope.$index, scope.row)"
                                                                           v-if="scope.row.state_ID == 309">进入
                                                                </el-button>
                                                                <el-button size="mini" type="primary"
                                                                           style="float: none;display: inline-block"
                                                                           v-if="scope.row.state_ID == 309 && tabs.testActionData.indexOf('完成')>=0"
                                                                           @click="splitTestFinish(scope.$index, scope.row)">
                                                                    完成
                                                                </el-button>
                                                                <span v-if="scope.row.state_ID == 319"
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
                                                           @click="testTaskComplate(scope.row,scope.$index)"
                                                           class="el-icon-success"
                                                           v-if=" scope.row.TEST_STATE == 3"></i>
                                                        <i style="color: red;font-size: 20px" class="el-icon-error"
                                                           @click="testTaskNotAllow(scope.row,scope.$index)"
                                                           v-if=" scope.row.TEST_STATE == 3"></i>
                                                        <span v-if="scope.row.TEST_STATE == 1">已通过</span>
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
                            <el-tab-pane label="拆分任务详情" name="split" v-if="tabs.allSplittask">
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
                                                    <span style="display: inline-block;width: 30px">{{index+1}}.</span> <span>{{item.record_START | date}}</span>{{item.record_DESC}}
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
        <!--立项-->
        <el-dialog title="新增" :visible="addneeds.addvisible" width="60%"
                   append-to-body modal-append-to-body :before-close="closeDialog">
            <el-form label-width="100px">
                <el-row :md="24" :gutter="20">
                    <!--原需求编号-->
                    <el-col :span="24" :md="24" v-if="addneeds.addform.oldcode">
                        <el-form-item label="原需求编号">
                            <span style="color: #FF6600;cursor: pointer">{{addneeds.addform.oldcode}}</span>
                            <!--<el-input v-model="addneeds.addform.oldcode" disabled></el-input>-->
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="需求编号">
                            <el-input v-model="addneeds.addform.code" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="需求名称">
                            <el-input v-model="addneeds.addform.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="申请人">
                            <el-input v-model="addneeds.addform.sxname"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="需求来源">
                            <el-select v-model="addneeds.addform.fromdeptId" clearable placeholder="请选择部门"
                                       style="width: 49%;float: left;margin-right: 2%;" @change="fromdeptchange">
                                <el-option v-for="item in addneeds.addform.fromdeptArr" :label="item.dept_name"
                                           :value="item.dept_id"></el-option>
                            </el-select>
                            <el-select v-model="addneeds.addform.fromdeptroleId" clearable placeholder="请选择人员"
                                       style="width: 49%;float: left;">
                                <el-option v-for="item in addneeds.addform.fromdeptroleArr" :label="item.user_NAME"
                                           :value="item.user_ID"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="申请日期">
                            <el-date-picker type="date" placeholder="选择日期" v-model="addneeds.addform.shenqingdate"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="计划投产日期">
                            <el-date-picker type="date" placeholder="选择日期" v-model="addneeds.addform.jihuadate"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="优先级">
                            <el-select v-model="addneeds.addform.level" clearable placeholder="请选择优先级"
                                       style="width: 100%;">
                                <el-option v-for="item in addneeds.addform.levelArr" :label="item.rriority_NAME"
                                           :value="item.rriority_ID"></el-option>
                            </el-select>
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
                                    <el-radio v-model="addneeds.addform.jiaji" label="0">否</el-radio>
                                    <el-radio v-model="addneeds.addform.jiaji" label="1">是</el-radio>
                                </el-col>
                                <el-col :span="18" :md="18">
                                    <el-input placeholder="请填写加急原因" v-model="addneeds.addform.jiajireason"
                                              v-if="addneeds.addform.jiaji ==1?true:false"></el-input>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                    <!--原产品功能-->
                    <el-col :span="24" :md="24" v-if="addneeds.addform.oldgongneng">
                        <el-form-item label="原产品功能">
                            {{addneeds.addform.oldgongneng}}
                            <!--<el-input v-model="addneeds.addform.oldgongneng" disabled></el-input>-->
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :md="24">
                        <el-form-item label="产品功能">
                            <el-input v-model="addneeds.addform.gongneng"></el-input>
                        </el-form-item>
                    </el-col>
                    <!--原需求描述-->
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
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addneeds.addvisible = false" size="mini">取 消</el-button>
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
                        @keyup.13="assignSearch"
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
                    <el-col :span="12">
                        <el-radio v-model="split.splitradio" label="1">测试任务</el-radio>
                        <el-radio v-model="split.splitradio" label="2">开发任务</el-radio>
                        <el-select v-model="split.choosesysyem" placeholder="请选择" v-if="split.splitradio == 2">
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
                <el-form-item label="难易度">
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
        <!--拆分任务详情-->
        <el-dialog title="拆分任务详情" :visible="split.hasSplitvisible" width="80%"
                   append-to-body modal-append-to-body
                   :before-close="closeDialog">
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
                    <el-table-column prop="base_INFO_ID" label="任务编码" width="190"></el-table-column>
                    <el-table-column prop="end_DATE" :formatter="splitDataFormatter"
                                     label="完成日期"></el-table-column>
                    <el-table-column prop="responsible_MODULE" label="负责模块"></el-table-column>
                    <el-table-column prop="facility_NAME" label="难易度" width="80"></el-table-column>
                    <el-table-column prop="required_TIME" label="预计用时（小时）" width="100"></el-table-column>
                    <el-table-column prop="actual_TIME" label="实际用时（小时）" width="100"></el-table-column>
                    <el-table-column label="状态" width="80">
                        <template slot-scope="scope">
                            <div style="text-align: center">
                                <span v-if="scope.row.state_ID ==306" style="color: red">待开发</span>
                                <span v-if="scope.row.state_ID ==307" style="color: red">开发中</span>
                                <span v-if="scope.row.state_ID ==308" style="color: red">待测试</span>
                                <span v-if="scope.row.state_ID ==309" style="color: red">测试中</span>
                                <span v-if="scope.row.state_ID == 319" style="color: green">已完成</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
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
                    <el-table-column type="selection" width="55" :selectable="AssigncheckedAble"></el-table-column>
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
        <!--展示给开发人员的bug-->
        <el-dialog title="当前BUG" :visible="testTask.codeBUGlistvisible"
                   append-to-body modal-append-to-body width="85%"
                   :before-close="closeDialog">
            <div class="table-list">
                <el-table :data="testTask.codeBUGData" border style="width: 100%">
                    <el-table-column prop="base_BUG_ID" label="编号" width="190"></el-table-column>
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
                                           v-if="scope.row.bug_STATE !=1 && tabs.codeActionData.indexOf('完成')>=0"
                                           @click="codeBUGAction(scope.$index, scope.row,'完成')">完成
                                </el-button>
                                <el-button size="mini" type="danger" style="display: inline-block;float: none"
                                           v-if="scope.row.bug_STATE !=1 && tabs.codeActionData.indexOf('转接')>=0"
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
        <!--所有的bug清单-->
        <el-dialog title="BUG清单" :visible="testTask.allBUGvisible" width="80%"
                   append-to-body modal-append-to-body
                   :before-close="closeDialog">
            <div class="table-list">
                <el-table :data="testTask.allBugs" border style="width: 100%">
                    <el-table-column prop="base_BUG_ID" label="序号" width="190"></el-table-column>
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
        <!--测试点击完成-->
        <el-dialog title="您已超出任务规定时间" :visible="testFinished.taskFinishedvisible" width="60%"
                   append-to-body modal-append-to-body
                   :before-close="closeDialog">
            <el-form label-width="120px">
                <el-form-item label="请填写实际用时">
                    <el-input v-model="testFinished.usetime"></el-input>
                </el-form-item>
                <el-form-item label="请填写超时原因">
                    <el-input v-model="testFinished.reason"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="testFinished.taskFinishedvisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="testSubTask" size="mini">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                addneeds: {
                    addvisible: false,
                    addType: '',//判断性质呢过类型，add 为重新立项，change 为新建变更 changeinset 为需求内变更
                    addform: {
                        "sjxt": "",//涉及系统
                        "oldcode": "",//原需求编号
                        "code": "",//需求编号
                        "name": "",//需求名称
                        "sxname": "",//申请人
                        "fromdeptId": "",//选择的需求来源部门ID
                        "fromdeptArr": "",//部门数组
                        "fromdeptroleId": "",//选择的需求来源人
                        "fromdeptroleArr": "",//择的需求来源人数组
                        "zhongyaochegndu": "",//重要程度
                        "zhongyaochegnduArr": "",//重要程度数组
                        "level": "",//优先级
                        "levelArr": "",//优先级数组
                        "shenqingdate": "",//申请日期
                        "jihuadate": "",//计划投产日期
                        "jiaji": "",//是否加急
                        "jiajireason": "",//加急的原因
                        "oldgongneng": "",//原产品功能
                        "gongneng": "",//产品功能
                        "oldneedsname": "",//原需求描述
                        "needsname": "",//需求描述
                    }
                },
                assign: {
                    assignvisible: false,
                    keyword: "",
                    left: true,
                    right: false,
                    checkList: [],
                    leftlistdata: [],
                    leftSearch: false,
                    rightlistdata: [],
                    searchData: []
                },
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
                    usertime: "",//预计用时
                    names: [],//放置姓名的数组
                    ids: [],//放置id的数组
                    usetime: "",//预计用时
                },
                table: {
                    tableData: [],
                    tableOriginData: [],
                    tableHeight: "",
                },
                dateValue: "",
                keyword: "",
                options: [
                    {
                        "key": "与我相关",
                        "value": "1"
                    }, {
                        "key": "全部",
                        "value": "2"
                    }, {
                        "key": "带技术部审核",
                        "value": "3"
                    }, {
                        "key": "待开发部审核",
                        "value": "4"
                    }, {
                        "key": "待产品部审核",
                        "value": "5"
                    }, {
                        "key": "开发计划制定",
                        "value": "6"
                    }, {
                        "key": "开发执行",
                        "value": "7"
                    }, {
                        "key": "开发挂起",
                        "value": "8"
                    }, {
                        "key": "验收中",
                        "value": "9"
                    }, {
                        "key": "需求完成",
                        "value": "10"
                    }, {
                        "key": "需求关闭",
                        "value": "11"
                    }
                ],
                selectValue: "与我相关",
                dateComp: {},
                tabs: {
                    addProject: false,//立项权限判断
                    codetask: false,//开发的栏目判断（开始结束任务）
                    testtask: false,//测试的栏目判断（开始结束任务）
                    allSplittask: false,//测试的栏目判断（技术经理能看到所有的项目）
                    activeName: "info",//控制台的选中项
                    consoleWrapperVisible: false,//控制台的显示
                    consoleActionVisible: false,//控制台的操作显示/隐藏
                    originActionData:[],//原所有操作
                    consoleActionData: [],//所有操作
                    codeActionData: [],//开发人员的操作权限
                    testActionData: [],//测试人员的操作权限
                    rejectType: "",//驳回操作的特殊判断，“jl 为技术经理的驳回，gl 为管理部的驳回”
                    activeTableInfo: "",//当前选中的信息表格
                    data_one: {//控制台的信息页展示内容
                        apply_NAME: "",//申请人姓名
                        state_NAME: "",//当前状态
                        base_NEET_ID: "",//需求ID
                        importance_NAME: "",//优先级
                        neel_DESCRIPTION: "",//需求描述
                        neel_NAME: "",//需求名称
                        product_FUNCTION: "",//产品说明
                        rriority_NAME: "",//紧急程度
                        urgent: "",//加急原因
                        dept_NAME: "",//需求来源部门
                        user_NAME: "",//需求来源姓名
                        jiaji: "",//是否加急
                        start_DATE: "",//申请日期
                        end_DATE: "",//计划投产日期
                        reject: "",//驳回理由
                        code_start: "",//开发开始时间
                        code_end: "",//开发结束时间
                        test_start: "",//测试开始时间
                        test_end: "",//测试结束时间
                        oldcode:"",//原需求编号
                        oldproduct:"",//原产品功能
                        olddescribe:"",//原需求描述
                    },
                    state_NAME: "",//状态
                    user_NAME: "",//负责人
                    genzong: ""
                },
                taskFinished: {
                    taskFinishedvisible: false,
                    taskId: "",//当前任务ID
                    usetime: "",//实际用时
                    reason: "",//超时原因
                },
                testFinished: {
                    taskFinishedvisible: false,
                    taskId: "",//当前任务ID
                    usetime: "",//实际用时
                    reason: "",//超时原因
                },
                //测试任务操作台的内容
                testTask: {
                    hasTask: false,//判断是否有测试任务
                    typevalue: "",//用例类型选择的值（汉字）
                    showTaskStep: false,//展示步骤的表格
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

            }
        },
        filters: {
            date: function (time) {
                let d = new Date(time);
                let year = d.getFullYear();
                let month = d.getMonth() + 1<10?'0' + d.getMonth() : '' + d.getMonth();
                let day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
                let hour = d.getHours()< 10 ? '0' + d.getHours() : '' + d.getHours();
                let minutes = d.getMinutes() <10 ? '0' + d.getMinutes() : '' + d.getMinutes();
                let seconds = d.getSeconds() <10 ? '0' + d.getSeconds() : '' + d.getSeconds();
                return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
            },
        },
        mounted(){
            this.loadData();
        },
        methods: {
            submitUpload(){
                this.$refs.upload.submit()
            },
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
                //控制台的内容区域高度
            },
            calculateTableHeight(type){
                let height = document.querySelector(".mainr").offsetHeight;
                let actionHeight = document.querySelector(".content .action").offsetHeight;
                //true代表没有控制台
                if (!type) {
                    //----------------------------------------------body的上下padding--table的margin-top
                    this.table.tableHeight = height - 36 - actionHeight - 20 - 20;
                } else {
                    this.table.tableHeight = height * 0.3;
                }
            },
            calculateTabsHeight(){
                let card_body = document.querySelector(".box-card .el-card__body");
                let actionHeight = document.querySelector(".content .action").offsetHeight;
                let allTabContent = document.querySelectorAll(".console-tab-content");
                for (let i of allTabContent) {
                    //---------------el-card__body的可用内容高---------顶部操作栏的高---------表格部分的高------tab的头和margin的高----------操作台border
                    i.style.height = (parseInt(card_body.style.height) - 20 ) - actionHeight - (this.table.tableHeight + 20) - (20 + 40) - 2 + "px";
                }
            },
            setConsoleVisible(){
                this.tabs.consoleWrapperVisible = false;
                this.calculateTableHeight(false)
            },
            loadData(){
                //初始化栏目展示情况
                this.tabs.codetask = false;
                this.tabs.testtask = false;
                this.tabs.allSplittask = false;
                //初始化当前活动的控制台
                this.tabs.activeName = "info";
                //初始化控制台的可视情况
                this.tabs.consoleWrapperVisible = false;
                //清楚新增立项的表单
                this.clearAddData();
                //加载权限
                this.setActionBtn();
                this.calculate();
                this.$maskin();
                let params = new URLSearchParams();
                this.$axios.post("/base/queryAll", params).then((res) => {
                    let data = res.data
                    this.setTableData(data);
                })
            },
            //加载权限操作
            setActionBtn(){
                let store = localStorage.getItem("POWER");
                let power = (new Function("return" + store))();
                let activeRoute = localStorage.getItem("ACTIVEMENU");
                if (this.$route.name == activeRoute) {
                    let arr = [];
                    let roleArr_temp = [];
                    for (let i of power) {
//                        console.log(i)
                        if (i.menu_fname == activeRoute) {
                            //针对相同操作但是不同权限
                            if (i.act.split("-")[0] != "开始" && i.act.split("-")[0] != "完成" && i.act.split("-")[0] != "立项") {
                                arr.push({"name": i.act.split("-")[0], "role": i.act.split("-")[1]});
                            } else {
                                //判断是测试的操作还是开发的操作
                                let type = i.act.split("-")[1];
                                if (type == "开发") {
                                    this.tabs.codeActionData.push(i.act.split("-")[0])
                                } else if (type == "测试") {
                                    this.tabs.testActionData.push(i.act.split("-")[0])
                                }
                            }
                            if (i.act == "驳回-技术经理") {
                                this.tabs.rejectType = "jl"
                            }
                            if (i.act == "驳回-技术管理部") {
                                this.tabs.rejectType = "gl"
                            }
                            //判断是否有立项权限
                            if (i.act.split("-")[0].indexOf("立项") >= 0) {
                                this.tabs.addProject = true;
                            }
                            if(i.act == "转接-开发"){
                                this.tabs.codeActionData.push("转接");
                            }
                        }
                        roleArr_temp.push(i.act.split("-")[1]);
                    }
                    let roleArr = this.$unique(roleArr_temp);
                    this.$set(this.tabs, "consoleActionData", arr);
                    //初始化操作
                    this.tabs.codetask = false;//开发的栏目判断（开始任务）
                    this.tabs.testtask = false;//测试的栏目判断（开始任务）
                    //根据角色详情判断操作台展示
                    if (roleArr.indexOf("开发") >= 0) {
                        this.tabs.codetask = true;
                    }
                    if (roleArr.indexOf("测试") >= 0) {
                        this.tabs.testtask = true;
                    }
                    if (roleArr.indexOf("技术经理") >= 0) {
                        this.tabs.allSplittask = true;
                    }
                }
            },
            setTableData(data){
                if (data.code == 200) {
                    let arr = [];
                    for (let i of data.result) {
                        if (i.start_DATE) {
                            let start = this.$format(i.start_DATE);
                            i.start_DATE = `${start.year}-${start.mouth}-${start.day}`;
                        }
                        if (i.end_DATE) {
                            let end = this.$format(i.end_DATE);
                            i.end_DATE = `${end.year}-${end.mouth}-${end.day}`;
                        }
                        arr.push(i)
                    }
                    this.$set(this.table, "tableData", arr);
                    this.$set(this.table, "tableOriginData", arr);
                    this.$maskoff();
                }
            },
            //新建弹窗
            newneeds(){
                this.addneeds.addType = "add";//当前是重新建立变更
                this.addneeds.addvisible = true;
                let params = new URLSearchParams();
                this.$axios.post("/base/baseSaveFront", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        let deptArr = [];
                        for (let i of data.result.depts) {
                            deptArr.push(i);
                        }
                        this.addneeds.addform.code = data.result.BASE_NEET_ID;
                        this.$set(this.addneeds.addform, "fromdeptArr", deptArr);
                        this.$set(this.addneeds.addform, "zhongyaochegnduArr", data.result.importance);
                        this.$set(this.addneeds.addform, "levelArr", data.result.priority);
                    }
                })
            },
            //新需求来源二级联动
            fromdeptchange(val){
                this.addneeds.addform.fromdeptroleArr = [];
                this.addneeds.addform.fromdeptroleId = "";
                let deptroleArr = [];
                for (let i of this.addneeds.addform.fromdeptArr) {
                    if (val == i.dept_id) {
                        for (let j of i.users) {
                            let obj = {
                                "user_NAME": j.user_NAME,
                                "user_ID": j.user_ID
                            };
                            deptroleArr.push(obj)
                        }
                    }
                }
                this.$set(this.addneeds.addform, "fromdeptroleArr", deptroleArr);
            },
            //提交新增
            subaddForm(){
                let url = "";
                let params = new URLSearchParams();
                params.append("BASE_NEET_ID", this.addneeds.addform.code);	//需求编码
                params.append("NEEL_NAME", this.addneeds.addform.name);	//需求名称
                params.append("START_DATE", this.addneeds.addform.shenqingdate);	//申请日期
                params.append("END_DATE", this.addneeds.addform.jihuadate);//计划投产日期
                params.append("PRODUCT_FUNCTION", this.addneeds.addform.gongneng);//产品功能
                params.append("USER_ID", this.addneeds.addform.fromdeptroleId);//需求来源
                params.append("RRIORITY", this.addneeds.addform.level);//（t_communal;）优先级ID 101：紧急 102：中等 103：一般
                params.append("IMPORTANCE", this.addneeds.addform.zhongyaochegndu);//重要程度ID 201：普通  202：重要
                params.append("NEEL_DESCRIPTION", this.addneeds.addform.needsname);//需求描述
                params.append("APPLY_NAME", this.addneeds.addform.sxname);//申请人名
                if (this.addneeds.addform.jiaji) {
                    params.append("URGENT", this.addneeds.addform.jiajireason);//加急描述
                }
                if(this.addneeds.addType = "change"){
                    params.append("BASE_NEET_FID",this.addneeds.addform.oldcode);
                    url = "/base/newUpdate"
                }else if (this.addneeds.addType = "add"){
                    url = "/base/saveBaseConstruct"
                }
                this.$axios.post(url,params).then((res)=>{
                    let data = res.data;
                    if(data.code == 200){
                        this.$success("操作成功！");
                        //清空新增的数据
                        this.addneeds.addvisible = false;
                        this.clearAddData();
                        this.loadData();
                    }
                })
            },
            //清除新增立项的表单
            clearAddData(){
                for (let i in this.addneeds.addform) {
                    this.addneeds.addform[i] = "";
                }
            },
            //搜索关键字
            searchKeyword(){
                this.$maskin();
                if (this.keyword != "") {
                    let arr = [];
                    for (let i of this.table.tableOriginData) {
                        if (JSON.stringify(i).indexOf(this.keyword) >= 0) {
                            arr.push(i)
                        }
                    }
                    this.$set(this.table, "tableData", arr)
                } else {
                    this.$set(this.table, "tableData", this.table.tableOriginData)
                }
                this.$maskoff();
            },
            closeDialog(){
                this.addneeds.addvisible = false;//新建项目的弹窗
                this.assign.assignvisible = false;//分配任务的弹窗
                this.split.splitaddvisible = false;//拆分任务添加人员的弹窗
                this.taskFinished.taskFinishedvisible = false;//开发人员超时填写原因和实际用时的弹窗
                this.split.hasSplitvisible = false;//查看已拆分任务详情
                this.testTask.addvisible = false;//测试新增步骤弹窗
                this.testTask.buglistvisible = false;//测试的bug待分配弹窗
                this.testTask.codeBUGlistvisible = false;//开发人员查看bug的弹窗
                this.testTask.codeBUGlistvisible = false;//开发转接bug弹窗
                this.testTask.allBUGvisible = false;//bug清单的展示弹窗
                this.testFinished.taskFinishedvisible = false;//测试人员超时填写原因和实际用时的弹窗
            },
            split_splitaddvisible(){
                this.split.splitaddvisible = false
            },
            handleSizeChange(val){

            },
            //点击表格列表展示控制台
            handleCurrentChange(val){
                this.split.splitvisible = false;
                this.tabs.activeName = "info";
                this.testTask.typevalue = "";
                this.testTask.type = "";
                this.$maskin();
                this.tabs.activeTableInfo = val;
                if (!this.tabs.consoleWrapperVisible) {
                    this.tabs.consoleWrapperVisible = true;
                    setTimeout(() => {
                        this.calculate()
                    }, 0);
                }
                if (val.base_NEET_ID) {
                    this.loadCheckTableData(val)
                }
            },
            //请求点击的数据信息
            loadCheckTableData(val){
                let params = new URLSearchParams();
                params.append("BASE_NEET_ID", val.base_NEET_ID);
                this.$axios.post("/base/queryBaseMessage", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        //以下是设置展示数据
                        this.tabs.data_one.state_NAME = data.result.base.state_NAME;
                        this.tabs.data_one.apply_NAME = data.result.base.apply_NAME;
                        this.tabs.data_one.base_NEET_ID = data.result.base.base_NEET_ID;
                        this.tabs.data_one.importance_NAME = data.result.base.importance_NAME;
                        this.tabs.data_one.neel_DESCRIPTION = data.result.base.neel_DESCRIPTION;
                        this.tabs.data_one.neel_NAME = data.result.base.neel_NAME;
                        this.tabs.data_one.product_FUNCTION = data.result.base.product_FUNCTION;
                        this.tabs.data_one.rriority_NAME = data.result.base.rriority_NAME;
                        this.tabs.data_one.urgent = data.result.base.urgent;
                        //判断是否有驳回理由
                        this.tabs.data_one.reject_RESON =
                            data.result.base.reject_RESON ? data.result.base.reject_RESON : false;
                        if (!data.result.base.dept_NAME || !data.result.base.user_NAME) {
                            this.tabs.data_one.user_NAME = "";
                        } else {
                            this.tabs.data_one.user_NAME = data.result.base.dept_NAME + "  ——  " + data.result.base.user_NAME;
                        }
                        this.tabs.data_one.jiaji = data.result.base.urgent ? '是' : '否';
                        if (data.result.base.start_DATE) {
                            let start = this.$format(data.result.base.start_DATE);
                            this.tabs.data_one.start_DATE = `${start.year}-${start.mouth}-${start.day}`;
                        }
                        if (data.result.base.end_DATE) {
                            let end = this.$format(data.result.base.end_DATE);
                            this.tabs.data_one.end_DATE = `${end.year}-${end.mouth}-${end.day}`;
                        }
                        //判断是否有完成时间，有则展示
                        if (data.result.base.code_START_DATETIME
                            && data.result.base.code_END_DATETIME
                            && data.result.base.test_END_DATETIME
                            && data.result.base.test_START_DATETIME) {
                            this.tabs.data_one.code_start = data.result.base.code_START_DATETIME;
                            this.tabs.data_one.code_end = data.result.base.code_END_DATETIME;
                            this.tabs.data_one.test_start = data.result.base.test_START_DATETIME;
                            this.tabs.data_one.test_end = data.result.base.test_END_DATETIME;
                        }
                        //设置全程跟踪数据
                        this.tabs.state_NAME = data.result.base.state_NAME;
                        this.tabs.user_NAME = data.result.base.apply_NAME;
                        this.$set(this.tabs, "genzong", data.result.records);
                        //判断当前任务是否被拆分过
                        data.result.systemDepts.length > 0 ?
                            this.$set(this.split, "hasSplitTaskDataByGroup", data.result.systemDepts) : this.$set(this.split, "hasSplitTaskDataByGroup", []);
                        //是否有开发任务
                        data.result.codeInfos.length > 0 ?
                            this.$set(this.split, "codetask", data.result.codeInfos) : this.$set(this.split, "codetask", []);
                        //是否有测试任务
                        this.testTask.testTaskActiveInfo = "";
                        if (data.result.testInfos.length > 0) {
                            this.$set(this.testTask, "testSplitData", data.result.testInfos);
                            this.testTask.hasTask = true;
                        } else {
                            this.$set(this.testTask, "testSplitData", []);
                            this.testTask.hasTask = false;
                        }
                        //判断用例类型
                        data.result.types ?
                            this.$set(this.testTask, "typeArr", data.result.types) :
                            this.$set(this.testTask, "typeArr", []);
                        data.result.TYPE_NAME ? this.testTask.typevalue = data.result.TYPE_NAME : data.result.type_name = "";
                        //展示所有的bug清单
                        this.$set(this.testTask, "allBugs", data.result.bugs);
                        this.$maskoff();
                    }
                })
            },
            //操作台的事件判断-------------------------
            consoleActionEvent(val){
                this.tabs.consoleActionVisible = false;
                switch (val.name) {
                    case "撤回":
                        this.back();
                        break;
                    case "新建变更":
                        this.newchange();
                        break;
                    case "需求内变更":
                        this.changeinset();
                        break;
                    case "分配任务":
                        this.getAssign();
                        break;
                    case "驳回":
                        this.rejected();
                        break;
                    case "拆分任务":
                        this.splitTask();
                        break;
                    case "验收":
                        this.acceptance();
                        break;
                }
            },
            //操作台的事件---------------------------
            //验收操作
            acceptance(){
                let info = this.tabs.activeTableInfo;
                if(info.state_ID == 311){
                    this.$warn("该需求已验收！");
                    return;
                }
                this.$maskin();
                let params = new URLSearchParams();
                params.append("BASE_NEEL_ID", info.base_NEET_ID);
                this.$axios.post("/base/baseAccept", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$success("操作成功！");
                        this.$maskoff();
                        this.loadData();
                    }
                })
            },
            //基础开发的撤回操作
            back(){
                let info = this.tabs.activeTableInfo;
                if (info.state_ID !== 303) {
                    this.$warn("只有待技术管理部审核状态才能进行撤回操作");
                    return;
                }
                this.confirm("确定进行撤回操作吗？", () => {
                    let params = new URLSearchParams();
                    let info = this.tabs.activeTableInfo;//设置当前信息
                    params.append("BASE_ID", info.base_NEET_ID);
                    this.$axios.post("/base/baseRegret", params).then((res) => {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$success("操作成功！");
                            this.loadData();
                        }
                    })
                })
            },
            //新建变更
            newchange(){
                this.$maskin();
                this.addneeds.addType = "change";//当前是新建变更
                let params = new URLSearchParams();
                params.append("BASE_NELL_ID",this.tabs.activeTableInfo.base_NEET_ID);
                this.$axios.post("/base/checkBaseUpdate",params).then((res)=>{
                    let data = res.data;
                    if(data.code == 200){
                        let base = data.result.base;
                        this.addneeds.addform.oldcode = base.base_NEET_ID;//原需求编号
                        this.addneeds.addform.code = data.result.BASE_NEET_ID;//需求编号
                        this.addneeds.addform.fromdeptArr = data.result.depts;//部门数组
                        this.addneeds.addform.levelArr = data.result.priority;//优先级
                        this.addneeds.addform.zhongyaochegnduArr = data.result.importance;//重要程度
                        this.addneeds.addform.gongneng = "";
                        this.addneeds.addform.oldgongneng = base.product_FUNCTION;//原需求功能
                        this.addneeds.addform.oldneedsname = base.neel_DESCRIPTION;//原需求描述
                        this.addneeds.addvisible = true;
                        this.$maskoff();
//                        this.addneeds.addform.needsname = "";
//                        this.addneeds.addform.name = base.neel_NAME;
//                        this.addneeds.addform.sxname = base.apply_NAME;//申请人
//                        this.addneeds.addform.fromdeptId = parseInt(base.dept_ID);//选择的部门ID
//                        for(let i of data.result.depts){
//                            if(i.dept_id == base.dept_ID){
//                                this.addneeds.addform.fromdeptroleArr = i.users;//设置当前部门的人员
//                            }
//                        }
//                        this.addneeds.addform.fromdeptroleId = base.user_ID;//选择的人员ID
//                        this.addneeds.addform.shenqingdate = base.start_DATE;
//                        this.addneeds.addform.jihuadate = base.end_DATE;
//                        this.addneeds.addform.level = base.rriority;//选择的优先级
//                        this.addneeds.addform.zhongyaochegndu = base.importance;//选择的重要程度
//                        this.addneeds.addform.jiaji = base.urgent?'1':'0';//是否加急
//                        this.addneeds.addform.jiajireason = base.urgent;//加急原因
                    }
                })
            },
            //需求内变更
            changeinset(){
                this.addneeds.addType = "changeinset";//当前是新建变更
                let params = new URLSearchParams();
                params.append("BASE_NELL_ID",this.tabs.activeTableInfo.base_NEET_ID);
                this.$axios.post("/base/checkBaseUpdate",params).then((res)=>{
                    let data = res.data;
                    if(data.code == 200){

                    }
                })
            },
            //分配任务
            getAssign(){
                let info = this.tabs.activeTableInfo;
                if (info.state_ID != 303 && info.state_ID != 304) {
                    this.$warn("只有待技术管理部审核或被技术经理驳回状态才能进行分配操作");
                    return;
                }
                this.assign.eyword = "";
                this.assign.checkList = [];
                this.assign.assignvisible = true;
                let params = new URLSearchParams();
                if (info.state_ID == 304) {
                    params.append("TASK_ID", info.base_NEET_ID);
                }
                this.$axios.post("/base/queryUserByDemand", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {

                        this.$set(this.assign, "searchData", data.result.allDept);
                        this.$set(this.assign, "leftlistdata", data.result.allDept);
                        this.$set(this.assign, "rightlistdata", data.result.dept.users);
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
                    params.append("BASE_ID", info.base_NEET_ID);
                    params.append("OLD_STATE", info.state_ID);
                    // OPER 操作(confirm:确认  reject:驳回)
//                    params.append("OPER","confirm");
                    this.$axios.post("/base/checkBase", params).then((res) => {
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
            //驳回
            rejected(){
                let info = this.tabs.activeTableInfo;
                if (this.tabs.rejectType == "jl") {
                    //当前是技术经理的驳回
                    if (info.state_ID == 303) {
                        this.$warn("请待技术管理部分配后才能操作");
                        return
                    }
                }
                if (info.state_ID != 303 && info.state_ID != 305) {
                    this.$warn("当期状态无法进行驳回操作！");
                    return;
                }
                this.prompt("确定进行驳回操作？", "请填写驳回理由", (val) => {
                    if (val.value == "") {
                        this.$warn("请填写驳回理由");
                        return;
                    }
                    let params = new URLSearchParams();
                    params.append("BASE_ID", info.base_NEET_ID);
                    params.append("RESON", val.value);
                    params.append("OLD_STATE", info.state_ID);
                    this.$axios.post("/base/baseReject", params).then((res) => {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$success("操作成功！");
                            this.loadData();
                        }
                    })
                })
            },
            //拆分任务
            splitTask(){
                let info = this.tabs.activeTableInfo;
                let params = new URLSearchParams();
                params.append("BASE_ID", info.base_NEET_ID);
                this.$axios.post("/base/baseInfoCheck", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {

                        this.split.splitvisible = true;
                        this.$set(this.split, "level", data.result.facility);//设置难易度集合
                        this.$set(this.split, "systemarr", data.result.system);//设置系统集合
                        this.$set(this.split, "personlist", data.result.dept.users);//设置人员集合
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
                    if (this.split.systemAll[index].version.indexOf("v") < 0) {
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
                let systemChooseArr = this.split.systemAll
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
                this.$axios.post("/base/BaseInfoID", params).then((res) => {
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
                if (!this.split.levelchoosen) {
                    this.$warn("请选择难易度");
                    return;
                }
                if (!this.split.usetime) {
                    this.$warn("请填写用时");
                    return;
                }
                let end_data = this.$format(new Date(this.split.finishdate));
                let obj = {
                    BASE_INFO_ID: this.split.taskcode,
                    USER_NAME: this.split.person.split("-")[1],
                    SYSTEM_NAME: this.split.choosesysyem,
                    RESPONSIBLE_MODULE: this.split.model,
                    FACILITY_ID: this.split.levelchoosen.split("-")[0],
                    FACILITY_NAME: this.split.levelchoosen.split("-")[1],
                    END_DATE: this.split.finishdate,
                    end_data_format: `${end_data.year}-${end_data.mouth}-${end_data.day}`,
                    REQUIRED_TIME: this.split.usetime
                };
                this.split.ids.push(this.split.person.split("-")[0]);
                this.split.names.push(this.split.person.split("-")[1]);
                this.split.tableData.push(obj);
                this.split.splitaddvisible = false;
                this.clearSplitAddPerson()
            },
            //拆分任务删除人员操作
            splitDelete(index){
                this.split.tableData.splice(index, 1);
                this.split.names.splice(index, 1);
                this.split.ids.splice(index, 1)
            },
            clearSplitAddPerson(){
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
                let endTime = this.split.enddate;//预计结束日期
                let startTime = this.split.startdate;//预计开始日期
                if (!startTime) {
                    this.$warn("请选择预计开始日期");
                    return;
                }
                if (!endTime) {
                    this.$warn("请选择预计结束日期");
                    return;
                }
                if (this.split.tableData.length == 0) {
                    this.$warn("请选择分配人员");
                    return;
                }
                this.$maskin();
                let params = new URLSearchParams();
                let info = this.tabs.activeTableInfo;
                let BASE_ID = info.base_NEET_ID;//需求ID
                let OLD_STATE = info.state_ID;//当前状态码
                params.append("BASE_ID", BASE_ID)
                params.append("OLD_STATE", OLD_STATE)
                params.append("endTime", endTime)
                params.append("startTime", startTime)
                params.append("names", this.split.names)
                params.append("ids", this.split.ids)
                params.append("bics", JSON.stringify(this.split.tableData));
                this.$axios.post("/base/addInfos", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$success("操作成功！");
                        this.loadData();
                        this.$maskoff()
                    }
                });
            },
            //开发的开始操作
            splitCodeStart(index, val){
                let info = this.tabs.activeTableInfo;
                let params = new URLSearchParams();
                params.append("BASE_ID", info.base_NEET_ID);
                params.append("BASE_INFO_ID", val.base_INFO_ID);
                params.append("OLD_STATE", val.state_ID);
                this.$axios.post("/base/beginInfo", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$success("操作成功！")
                        this.loadData();
                    }
                })
            },
            //开发的完成操作
            splitCodeFinish(index, val){
                let info = this.tabs.activeTableInfo;
                let nowData = new Date();
                let params = new URLSearchParams();
                params.append("BASE_ID", info.base_NEET_ID);//需求ID
                params.append("BASE_INFO_ID", val.base_INFO_ID);//拆分任务ID
                if (nowData.getTime() <= val.end_DATE) {
                    //在预计时间内完成
                    this.sendFinished(params)
                } else {
                    this.taskFinished.usetime = "";
                    this.taskFinished.reason = "";
                    this.taskFinished.taskFinishedvisible = true;
                    this.taskFinished.taskId = val.base_INFO_ID;
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
                    returnl
                }
                params.append("BASE_ID", info.base_NEET_ID);//需求ID
                params.append("REMARK", this.taskFinished.reason);//原因
                params.append("ACTUAL_TIME", this.taskFinished.usetime);//实际用时
                params.append("BASE_INFO_ID", this.taskFinished.taskId);//当前拆分任务ID
                this.taskFinished.taskFinishedvisible = false;
                this.sendFinished(params)
            },
            //调用完成借口
            sendFinished(params){
                this.$axios.post("/base/completeInfo", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.taskFinished.taskFinishedvisible = false;
                        this.taskFinished.taskId = "";
                        this.$success("操作成功！");
                        this.loadData();
                    }
                })
            },
            //拆分任务点击事件
            splitTaskClick(val){
                this.$set(this.split, "hasSplitTaskData", []);
                //为空时不展示内容
                if (!val.infos || val.infos.length == 0) {
                    return;
                }
                this.split.hasSplitvisible = true;
                this.$set(this.split, "hasSplitTaskData", val.infos)
            },
            //测试选择用例类型
            chooseTestType(){
                if (!this.testTask.type) {
                    this.$warn("请选择用例类型");
                    return;
                }
                let info = this.tabs.activeTableInfo;
                let params = new URLSearchParams();
                params.append("BASE_ID", info.base_NEET_ID);
                params.append("TYPE_NAME", this.testTask.type);
                this.$axios.post("/base/confirmType", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.testTask.typevalue = this.testTask.type;
                    }
                })
            },
            //测试点击开始
            testTaskStart(index, val){
                if (!this.testTask.typevalue) {
                    this.$warn("请先选择用例类型");
                    return;
                }
                this.$maskin();
                let info = this.tabs.activeTableInfo;
                let params = new URLSearchParams();
                params.append("BASE_ID", info.base_NEET_ID);
                params.append("BASE_INFO_ID", val.base_INFO_ID);
                params.append("OLD_STATE", val.state_ID);
                this.$axios.post("/base/beginInfo", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$success("操作成功！");
                        this.loadCheckTableData(val);
                        this.$maskoff()
                    }
                })
            },
            //测试点击完成
            splitTestFinish(index, val){
                console.log(val)
                let nowtime = new Date();
                let params = new URLSearchParams();
                if (nowtime.getTime() < val.end_DATE) {
                    this.$maskin();
                    let info = this.tabs.activeTableInfo;
                    let tastid = val.base_INFO_ID;
                    params.append("BASE_ID", info.base_NEET_ID);
                    params.append("BASE_INFO_ID", tastid);
                    this.$axios.post("/base/completeTestInfo", params).then((res) => {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$success("操作成功！");
                            this.loadCheckTableData(val);
                        }
                    })
                } else {
                    this.testFinished.usetime = "";
                    this.testFinished.reason = "";
                    this.testFinished.taskFinishedvisible = true;
                    this.testFinished.taskId = val.base_INFO_ID;
                }
            },
            //测试填写超时原因提交
            testSubTask(){
                if (!this.testFinished.usetime) {
                    this.$warn("请填写实际用时");
                    return;
                }
                if (!this.testFinished.reason) {
                    this.$warn("请填写超时原因");
                    return;
                }
                console.log(this.testFinished);
                let params = new URLSearchParams();
                let info = this.tabs.activeTableInfo;
                params.append("BASE_ID", info.base_NEET_ID);
                params.append("BASE_INFO_ID", this.testFinished.taskId);
                params.append("ACTUAL_TIME", this.testFinished.usetime);
                params.append("REMARK", this.testFinished.reason);
                this.$axios.post("/base/completeTestInfo", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$success("操作成功！");
                        this.testFinished.taskId = "";
                        this.testFinished.taskFinishedvisible = false;
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
                params.append("TASK_ID", val.base_INFO_ID);
                this.$axios.post("/base/queryTestRecord", params).then((res) => {
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
                params.append("TASK_ID", info.base_INFO_ID);
                params.append("btcs", JSON.stringify(arr));
                this.$axios.post("/base/addTestRecord", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$success("操作成功！");
                        this.$set(this.testTask, "tableData", data.result.btcs);
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
                    this.$axios.post("/base/updateTestRecord", params).then((res) => {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$success("操作成功！");
                            this.$set(this.testTask.tableData[index], "TEST_STATE", 1);
                            this.$maskoff();
                        }
                    })
                })
            },
            //测试不通过
            testTaskNotAllow(val, index){
                this.prompt("不通过", "请填写不通过原因", ({value}) => {
                    let text = {value}.value;
                    if (!text) {
                        this.$warn("请填写不通过原因");
                    }
                    let params = new URLSearchParams();
                    params.append("TEST_STATE", 0);
                    params.append("TEST_DESC", text);
                    params.append("TEST_ID", val.TEST_ID);
                    this.$axios.post("/base/updateTestRecord", params).then((res) => {
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
                let info = this.testTask.testTaskActiveInfo;
                let params = new URLSearchParams();
                params.append("TASK_ID", info.base_INFO_ID);
                this.$axios.post("/base/queryTestBug", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$set(this.testTask, "buglistTableData", data.result.testBugs);
                        this.testTask.buglistvisible = true;
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
                this.$axios.post("/base/queryPersonByDept", params).then((res) => {
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
                this.$set(this.testTask, "BUGActiveData", []);
                this.testTask.assignvisible = false;
            },
            //关闭开发选择转接人员
            closeAssign_code(){
                this.testTask.assignvisible_code = false;
            },
            //选中人员后进行分配操作(开发的转接bug同样在此处)
            assignpersonAction(e, code){
                console.log(code)
                if (!code) {
                    console.log(this.testTask.assignPerson)
                    if (!this.testTask.assignPerson) {
                        this.$warn("请选择人员");
                        return;
                    }
                    //当前是测试人员的操作
                    let param = new URLSearchParams();
                    let choosen = this.testTask.assignPerson;
                    let name = choosen.split(",")[1];
                    let id = choosen.split(",")[0];
                    let arr = [];//选中的问题的数组
                    for (let i of this.testTask.BUGActiveData) {
                        arr.push(i.TEST_ID)
                    }
                    let need_id = this.tabs.activeTableInfo.base_NEET_ID;//需求ID
                    param.append("PERSON_NAME", name);
                    param.append("PERSON_ID", id);
                    param.append("ids", arr);
                    param.append("BASE_ID", need_id);
                    this.$axios.post("/base/addBug", param).then((res) => {
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
                    console.log(this.testTask.assignPerson_code)
                    if (!this.testTask.assignPerson_code) {
                        this.$warn("请选择人员");
                        return;
                    }
                    //当前是开发的操作
                    let params = new URLSearchParams();
                    let BUG_ID = this.testTask.bugid_code;
                    let BASE_ID = this.tabs.activeTableInfo.base_NEET_ID;
                    let PERSON_ID = this.testTask.assignPerson_code.split(",")[0];
                    let PERSON_NAME = this.testTask.assignPerson_code.split(",")[1];
                    params.append("BUG_ID", BUG_ID);
                    params.append("BASE_ID", BASE_ID);
                    params.append("PERSON_ID", PERSON_ID);
                    params.append("PERSON_NAME", PERSON_NAME);
                    this.$axios.post("/base/updateBugState", params).then((res) => {
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
            AssigncheckedAble(val){
                return val.ASSIGNOR_PERSON_NAME ? false : true
            },
            //展示给开发人员的bug
            showCodeBUG(){
                let info = this.tabs.activeTableInfo;
                let params = new URLSearchParams();
                params.append("BASE_ID", info.base_NEET_ID);
                this.$axios.post("/base/queryBugByCode", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$set(this.testTask, "codeBUGData", data.result.bugs);
                        this.testTask.codeBUGlistvisible = true;
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
                    params.append("BUG_ID", val.base_BUG_ID);
                    params.append("BASE_ID", info.base_NEET_ID);
                    this.$axios.post("/base/updateBugState", params).then((res) => {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$success("操作成功！");
                            this.$maskoff();
                            this.showCodeBUG();
                        }
                    })
                } else {
                    this.testTask.bugid_code = val.base_BUG_ID;
                    let params = new URLSearchParams();
                    this.$axios.post("/base/queryPersonByDept", params).then((res) => {
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