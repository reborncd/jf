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
                        <el-button type="danger" size="mini" @click="start_addneeds">新增</el-button>
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
                                >
                                </el-input>
                            </div>
                        </div>
                    </div>
                    <div class="table-list">
                        <el-table :data="table.tableData" border style="width: 100%"
                                  :height="table.tableHeight"
                                  highlight-current-row
                                  @row-click="handleCurrentChange">
                            <el-table-column prop="technology_NEEL_ID" label="需求编号" width="200"></el-table-column>
                            <el-table-column prop="start_DATE" label="申请日期" width="100"></el-table-column>
                            <el-table-column prop="end_DATE" label="计划投产日期" width="120"></el-table-column>
                            <el-table-column prop="neel_NAME" label="需求名称"></el-table-column>
                            <el-table-column prop="system_NAME" label="涉及系统"></el-table-column>
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
                        <el-tabs v-model="tabs.activeName" type="card">
                            <el-tab-pane label="详情页" name="info">
                                <div class="console-tab-content">
                                    <el-form label-width="100px" label-position="left">
                                        <el-row :gutter="20">
                                            <!--<el-col :span="24">-->
                                                <!--<el-form-item label="涉及系统" style="color: red">-->
                                                    <!--{{tabs.dataList.system_NAME}}-->
                                                <!--</el-form-item>-->
                                            <!--</el-col>-->
                                            <el-col :span="24">
                                                <el-form-item label="状态" style="color: red">
                                                    {{tabs.dataList.state_NAME}}
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="需求编号">{{tabs.dataList.technology_NEEL_ID}}</el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="申请人">{{tabs.dataList.user_NAME}}</el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="需求名称">{{tabs.dataList.neel_NAME}}</el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="需求来源">{{tabs.dataList.neel_SOURCE}}</el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="申请日期">{{tabs.dataList.start_DATE}}</el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="计划投产日期">{{tabs.dataList.end_DATE}}</el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="优先级">{{tabs.dataList.rriority_NAME}}</el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="重要程度">{{tabs.dataList.importance_NAME}}
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="24">
                                                <el-form-item label="是否加急">
                                                    <span style="margin-right: 40px;">{{tabs.dataList.urgent}}</span>
                                                    <span style="color: red!important;">{{tabs.dataList.urgent_NAME}}</span>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="24">
                                                <el-form-item label="产品功能">{{tabs.dataList.product_FUNCTION}}</el-form-item>
                                            </el-col>
                                            <el-col :span="24">
                                                <el-form-item label="需求描述">{{tabs.dataList.neel_DESCRIPTION}}</el-form-item>
                                            </el-col>
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
                                                  @click="consoleActionEvent(item)">{{item.value}}
                                            </span>
                                        </div>
                                    </div>
                                    <div v-if="split.splitvisible">
                                        <el-form label-width="100px" label-position="left">
                                            <el-row :gutter="20" v-for="(item,index) in split.systemAll">
                                                <el-col :span="10">
                                                    <el-form-item label="涉及系统">
                                                        <el-select v-model="item.name" placeholder="请选择" clearable>
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
                                                <el-table-column prop="FACILITY_NAME" label="难易度" width="80"></el-table-column>
                                                <el-table-column prop="REQUIRED_TIME" label="预计用时" width="80"></el-table-column>
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
                                            <el-table-column prop="task_ID" label="任务编码"
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
                                                               v-if="!scope.row.start_DATE"
                                                               @click="splitCodeStart(scope.$index, scope.row)">开始
                                                    </el-button>
                                                    <el-button size="mini" type="primary"
                                                               v-if="scope.row.state_ID != 319 && scope.row.start_DATE"
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
                                                                           v-if="scope.row.state_ID == 308"
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
                                                                           v-if="scope.row.state_ID == 309"
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
                                                           @click="testTaskComplate(scope.row, scope.$index)"
                                                           class="el-icon-success"
                                                           v-if=" scope.row.TEST_STATE == 3"></i>
                                                        <i style="color: red;font-size: 20px" class="el-icon-error"
                                                           @click="testTaskNotAllow(scope.row, scope.$index)"
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
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="全程跟踪" name="log">
                                <div class="console-tab-content">
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
                    <!--<el-col :span="12" :md="12">-->
                        <!--<el-form-item label="涉及系统">-->
                            <!--<el-select v-model="addneeds.addform.system" clearable placeholder="请选择涉及系统"-->
                                       <!--style="width: 100%;">-->
                                <!--<el-option v-for="item in addneeds.addform.systemArr" :label="item.rriority_NAME"-->
                                           <!--:value="item.rriority_ID"></el-option>-->
                            <!--</el-select>-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--<el-col :span="24" :md="24" v-if="addneeds.addform.oldcode">-->
                        <!--<el-form-item label="原需求编号">-->
                            <!--<span style="color: #FF6600;cursor: pointer">{{addneeds.addform.oldcode}}</span>-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                    <el-col :span="12" :md="12">
                        <el-form-item label="需求类型">
                            <el-select v-model="addneeds.addform.type" clearable placeholder="请选择需求类型"
                                       @change="changeType"
                                       style="width: 100%;">
                                <el-option v-for="item in addneeds.addform.typeArr" :label="item.neel_TYPE_NAME"
                                           :value="item.neel_TYPE_ID"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12" v-if="addneeds.addform.code">
                        <el-form-item label="需求编号">
                            <el-input v-model="addneeds.addform.code" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12" v-if="!addneeds.addform.code">
                        <el-form-item label="需求编号">
                            <el-select v-model="addneeds.addform.codeChoosen" clearable placeholder="请选择需求编号"
                                       style="width: 100%">
                                <el-option v-for="item in addneeds.addform.codeArr"
                                           :label="item.value"
                                           :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="需求名称">
                            <el-input v-model="addneeds.addform.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="重要程度">
                            <el-select v-model="addneeds.addform.importance" clearable placeholder="请选择重要程度"
                                       style="width: 100%;">
                                <el-option v-for="item in addneeds.addform.importanceArr"
                                           :label="item.importance_NAME" :value="item.importance_ID"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="申请人">
                            <el-input v-model="addneeds.addform.apply_name"></el-input>
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
                            <el-date-picker type="date" placeholder="选择日期" v-model="addneeds.addform.start_date"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12">
                        <el-form-item label="计划投产日期">
                            <el-date-picker type="date" placeholder="选择日期" v-model="addneeds.addform.end_date"
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
                    <el-col :span="24" :md="24">
                        <el-form-item label="是否加急" style="height: 42px">
                            <el-row :span="24">
                                <el-col :span="6" :md="6">
                                    <el-radio v-model="addneeds.addform.urgent" label="0">否</el-radio>
                                    <el-radio v-model="addneeds.addform.urgent" label="1">是</el-radio>
                                </el-col>
                                <el-col :span="18" :md="18">
                                    <el-input placeholder="请填写加急原因" v-model="addneeds.addform.urgentreason"
                                              v-if="addneeds.addform.urgent ==1?true:false"></el-input>
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
                            <el-input v-model="addneeds.addform.function"></el-input>
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
                            <el-input type="textarea" v-model="addneeds.addform.describe"></el-input>
                        </el-form-item>
                    </el-col>
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
    </div>
</template>

<script>
    export default {
        data(){
            return {
                addneeds: {
                    addvisible: false,
                    addProject: true,
                    addform:{
                        "system": "",//涉及系统
                        "systemArr": [],//涉及系统数组
                        "type":"",//选择的需求类型
                        "typeArr":[],//需求类型数组
                        "code": "",//需求编号
                        "codeChoosen":"",//选择的需求编号
                        "codeArr":[],//编号数组
                        "name": "",//需求名称
                        "apply_name": "",//申请人
                        "fromdeptId": "",//来源部门ID
                        "fromdeptArr": "",//部门数组
                        "fromdeptroleId": "",//需求来源人ID
                        "fromdeptroleArr": "",//需求来源人数组
                        "importance": "",//重要程度
                        "importanceArr": "",//重要程度数组
                        "level": "",//优先级
                        "levelArr": "",//优先级数组
                        "start_date": "",//申请日期
                        "end_date": "",//计划投产日期
                        "urgent": "",//是否加急
                        "urgentreason": "",//加急的原因
                        "function": "",//产品功能
                        "describe": "",//需求描述

                        "oldcode": "",//原需求编号
                        "oldgongneng": "",//原产品功能
                        "oldneedsname": "",//原需求描述
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
                    usertime: "",//预计用时
                    names: [],//放置姓名的数组
                    ids: [],//放置id的数组
                    usetime: "",//预计用时
                },
                options: [],
                selectValue:"",//选择的筛选的值
                dateComp:{},//日期筛选的值
                keyword:"",//搜索关键词
                table: {
                    tableHeight: "",//表格高度
                    tableData: [],//表格展示数据
                    tableOriginData: [],//表格源数据
                },
                tabs: {
                    activeTableInfo: "",//当前选中的信息表格
                    activeName:"info",
                    codetask:false,//开发人员操作台
                    testtask:false,//测试人员操作台
                    consoleWrapperVisible: false,//控制台的显示
                    consoleActionVisible: false,//控制台的操作显示/隐藏
                    consoleActionData:[],//操作的权限数据
                    codeActionData:[],//开发的权限数据
                    testActionData:[],//测试的权限数据
                    dataList:{
                        system_NAME:"",//涉及系统
                        state_NAME: "",//当前状态
                        technology_NEEL_ID:"",//需求编号
                        user_NAME: "",//申请人
                        neel_NAME: "",//需求名称
                        neel_SOURCE: "",//需求来源部门
                        start_DATE: "",//申请日期
                        end_DATE: "",//计划投产日期
                        rriority_NAME: "",//优先级
                        importance_NAME: "",//重要程度
                        urgent: "",//是否加急
                        urgent_NAME: "",//加急原因
                        product_FUNCTION:"",//产品功能
                        neel_DESCRIPTION:"",//需求描述


                        reject: "",//驳回理由
                        code_start: "",//开发开始时间
                        code_end: "",//开发结束时间
                        test_start: "",//测试开始时间
                        test_end: "",//测试结束时间
                        oldcode:"",//原需求编号
                    },
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
                taskFinished: {
                    taskFinishedvisible: false,
                    taskId: "",//当前任务ID
                    usetime: "",//实际用时
                    reason: "",//超时原因
                },
            }
        },
        mounted(){
            this.loadData();
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
                    this.table.tableHeight = height - 36 - actionHeight - 20 - 20-1;
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
            loadData(){
                //初始化栏目展示情况
                this.tabs.codetask = false;
                this.tabs.testtask = false;
                this.tabs.activeName = "info";
                //初始化控制台的可视情况
                this.tabs.consoleWrapperVisible = false;
                this.$maskin();
                this.calculate();
                let params = new URLSearchParams();
                this.$axios.post("/demand/getdemandTechnology",params).then((res)=>{
                    let data = res.data;
                    if(data.code == 200){
                        this.table.tableData = data.result;
                        this.table.tableOriginData = data.result;
                        this.loadPower();
                        this.$maskoff();
                    }
                })
            },
            //加载权限
            loadPower(){
                let store = localStorage.getItem("POWER");
                let power = (new Function("return" + store))();
                let activeRoute = localStorage.getItem("ACTIVEMENU");
                //加载控制台的展示
                if (this.$route.name == activeRoute) {
                    let roleArr_temp = [];
                    for(let i of power){
                        if(i.menu_fname == activeRoute){
                            roleArr_temp.push(i.act.split("-")[1])
                        }
                    }
                    let roleArr = this.$unique(roleArr_temp);
                    for(let i of roleArr){
                        if(i.indexOf("开发") !=-1){
                            this.tabs.codetask = true;
                        }
                        if(i.indexOf("测试") !=-1){
                            this.tabs.testtask = true;
                        }
                    }
                }
            },
            //关闭弹窗
            closeDialog(){
                this.addneeds.addvisible = false;//关闭新增的弹窗
                this.assign.assignvisible = false;//分配的弹窗
            },
            //表格点击事件
            handleCurrentChange(val){
                //清空拆分任务信息
                this.clearSplitSub()
                this.tabs.activeName= "info";
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
                params.append("TECHNOLOGY_NEEL_ID",val.technology_NEEL_ID);
                params.append("STATE",val.state);
                this.$axios.post("/demand/technologyId",params).then((res)=>{
                    let data = res.data;
                    if(data.code == 200){
                        let info = data.result.technology;
                        this.tabs.dataList.system_NAME=info.system_NAME;//涉及系统
                        this.tabs.dataList.state_NAME=info.state_NAME;//当前状态
                        this.tabs.dataList.technology_NEEL_ID=info.technology_NEEL_ID;//需求编号
                        this.tabs.dataList.user_NAME=info.user_NAME;//申请人
                        this.tabs.dataList.neel_NAME=info.neel_NAME;//需求名称
                        this.tabs.dataList.neel_SOURCE=info.neel_SOURCE;//需求来源部门
                        this.tabs.dataList.start_DATE=info.start_DATE;//申请日期
                        this.tabs.dataList.end_DATE=info.end_DATE;//计划投产日期
                        this.tabs.dataList.rriority_NAME=info.rriority_NAME;//优先级
                        this.tabs.dataList.importance_NAME=info.importance_NAME;//重要程度
                        this.tabs.dataList.urgent=info.urgent?"否":"是";//是否加急
                        this.tabs.dataList.urgent_NAME=info.urgent_NAME;//加急原因
                        this.tabs.dataList.product_FUNCTION=info.product_FUNCTION;//产品功能
                        this.tabs.dataList.neel_DESCRIPTION=info.neel_DESCRIPTION;//需求描述
                        //设置当前状态的权限
                        this.setConsoleAction(data.result);
//                       //是否有开发任务
                        data.result.codeTask.length > 0 ?
                            this.$set(this.split, "codetask", data.result.codeTask) : this.$set(this.split, "codetask", []);
                        //是否有测试任务
                        this.testTask.testTaskActiveInfo = "";
                        if (data.result.testTask.length > 0) {
                            this.$set(this.testTask, "testSplitData", data.result.testTask);
                            this.testTask.hasTask = true;
                        } else {
                            this.$set(this.testTask, "testSplitData", []);
                            this.testTask.hasTask = false;
                        }
                        //加载用例类型
                        data.result.types ?
                            this.$set(this.testTask, "typeArr", data.result.types) :
                            this.$set(this.testTask, "typeArr", []);
                        data.result.TYPE_NAME ? this.testTask.typevalue = data.result.TYPE_NAME : data.result.type_name = "";
                        this.$maskoff();
                    }
                })
            },
            //根据当需求状态返回当前操作的判断
            setConsoleAction(data){
                //删除多余数据
                let arr = [];
                let code = [];
                let test = [];
                for(let i in data){
                    if(data.hasOwnProperty(i) && typeof data[i] == "string"){
                        if(data[i].split("-")[1].indexOf("开发") ==-1 && data[i].split("-")[1].indexOf("测试") ==-1){
                            //当时开发或测试的时候不将开始结束按钮放入操作台中
                            arr.push({"key":i,"value":data[i].split("-")[0]});
                        }
                        else if(data[i].split("-")[1].indexOf("开发")>=0){
                            //当时开发或测试的时候不将开始结束按钮放入操作台中
                            code.push({"key":i,"value":data[i].split("-")[0]});
                        }
                        else if(data[i].split("-")[1].indexOf("测试")>=0){
                            test.push({"key":i,"value":data[i].split("-")[0]});
                        }
                    }
                }
                this.$set(this.tabs,"consoleActionData",arr);
                this.$set(this.tabs,"codeActionData",code);
                this.$set(this.tabs,"testActionData",test);
            },
            //新建需求前拉数据
            start_addneeds(){
                this.$maskin();
                let params = new URLSearchParams();
                this.$axios.post("/demand/gettypelist",params).then((res)=>{
                    let data = res.data;
                    if(data.code == 200){
                        this.$set(this.addneeds.addform, "fromdeptArr", data.result.depts);
                        this.$set(this.addneeds.addform, "importanceArr", data.result.importance);
                        this.$set(this.addneeds.addform, "levelArr", data.result.rrioritylist);
                        this.$set(this.addneeds.addform, "typeArr", data.result.typelist);
                        this.addneeds.addform.apply_name = data.result.USERNAME;
                        this.addneeds.addvisible = true;
                        this.$maskoff();
                    }
                })
            },
            //获取需求编号
            changeType(){
                this.addneeds.addform.code = "";
                this.$set(this.addneeds.addform,"codeArr",[]);
                this.addneeds.addform.codeChoosen = "";
                if(this.addneeds.addform.type){
                    let params = new URLSearchParams();
                    params.append("NEEL_TYPE_ID",this.addneeds.addform.type);
                    this.$axios.post("/demand/technologyID",params).then((res)=>{
                        let data = res.data;
                        if(data.code == 200){
                            if(typeof data.result.rt != "string"){
                                this.addneeds.addform.code = "";
                                let arr = [];
                                for(let i of data.result.rt){
                                    let obj = {
                                        "value":i
                                    };
                                    arr.push(obj)
                                }
                                this.$set(this.addneeds.addform,"codeArr",arr);
                            }else{
                                this.addneeds.addform.code = data.result.rt;
                                console.log(data.result.rt)
                            }
                        }
                    })
                }
            },
            //提交新建需求
            subaddForm(){
                if(!this.addneeds.addform.type){
                    this.$warn("请选择需求类型");
                    return;
                }
                if(!this.addneeds.addform.codeChoosen && this.addneeds.addform.type == 701){
                    this.$warn("请选择需求编号");
                    return;
                }
                if(!this.addneeds.addform.importance){
                    this.$warn("请选择重要程度");
                    return;
                }
                if(!this.addneeds.addform.apply_name){
                    this.$warn("请填写申请人");
                    return;
                }
                if(!this.addneeds.addform.fromdeptId){
                    this.$warn("请选择部门");
                    return;
                }
                if(!this.addneeds.addform.fromdeptroleId){
                    this.$warn("请选择角色");
                    return;
                }
                if(!this.addneeds.addform.start_date){
                    this.$warn("请选择申请日期");
                    return;
                }
                if(!this.addneeds.addform.end_date){
                    this.$warn("请选择投产日期");
                    return;
                }
                if(!this.addneeds.addform.level){
                    this.$warn("请选择难易度");
                    return;
                }
                if(!this.addneeds.addform.urgent == 0){
                    this.$warn("请选择是否加急");
                    return;
                }
                if(!this.addneeds.addform.urgentreason && this.addneeds.addform.urgent == 1){
                    this.$warn("请填写加急原因");
                    return;
                }
                if(!this.addneeds.addform.function){
                    this.$warn("请填写产品功能");
                    return;
                }
                if(!this.addneeds.addform.describe){
                    this.$warn("请填写需求描述");
                    return;
                }
                let params = new URLSearchParams();
                params.append("NEEL_TYPE",this.addneeds.addform.type);//类型
                params.append("TECHNOLOGY_NEEL_ID",this.addneeds.addform.code?
                    this.addneeds.addform.code:this.addneeds.addform.codeChoosen);//选择的需求编码
                params.append("NEEL_NAME",this.addneeds.addform.name);//需求名称
                params.append("IMPORTANCE",this.addneeds.addform.importance);//重要程度
                params.append("USER_NAME",this.addneeds.addform.apply_name);//申请人
                params.append("NEEL_SOURCE_DEPT_ID",this.addneeds.addform.fromdeptId);//部门ID
                params.append("NEEL_SOURCE_USER_ID",this.addneeds.addform.fromdeptroleId);//角色ID
                params.append("START_DATES",this.addneeds.addform.start_date);//申请日期
                params.append("END_DATES",this.addneeds.addform.end_date);//计划投产日期
                params.append("RRIORITY",this.addneeds.addform.level);//难易度
                params.append("URGENT",this.addneeds.addform.urgent);//是否加急0不加急，1加急
                params.append("URGENT_NAME",this.addneeds.addform.urgentreason);//加急原因
                params.append("PRODUCT_FUNCTION",this.addneeds.addform.function);//产品功能
                params.append("NEEL_DESCRIPTION",this.addneeds.addform.describe);//需求描述
                params.append("STATE",303);
                this.$axios.post("/demand/settechnologyadd",params).then((res)=>{
                    let data =res.data;
                    if(data.code == 200){
                        this.$success("操作成功！");
                        this.clearAddData();
                        this.loadData();
                    }
                });
            },
            //清楚新增表格的数据
            clearAddData(){
                this.addneeds.addvisible = false;
                for(let i in this.addneeds.addform){
                    this.addneeds.addform[i] = ""
                }
            },
            //新建时部门change事件
            fromdeptchange(){
                this.addneeds.addform.fromdeptroleId = "";
                let choosenId = this.addneeds.addform.fromdeptId;
                for(let i of this.addneeds.addform.fromdeptArr){
                    if(i.dept_id == choosenId){
                        this.$set(this.addneeds.addform,"fromdeptroleArr",i.users)
                    }
                }
            },
            //----------------------------------操作台的权限点击事件---------------------
            consoleActionEvent(val){
                console.log(val);
                switch (val.key){
                    case "TEC_SAVE":
                        //分配
                        this.getAssign();
                        break;
                    case "MANAGER_SPLIT":
                        //拆分任务
                        this.splitTask();
                        break;
                }
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
                        if(data.message){
                            this.$warn(data.message)
                        }else{
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
                    TASK_ID: this.split.taskcode,//任务编码
                    USER_NAME: this.split.person.split("-")[1],//选择的人名
                    SYSTEM_NAME: this.split.choosesysyem,//选择的系统
                    RESPONSIBLE_MODULE: this.split.model,//模块
                    FACILITY: this.split.levelchoosen.split("-")[0],//难度ID
                    FACILITY_NAME: this.split.levelchoosen.split("-")[1],//难度等级
                    END_DATES: this.split.finishdate,//结束日期
                    end_data_format: `${end_data.year}-${end_data.mouth}-${end_data.day}`,//时间
                    REQUIRED_TIME: this.split.usetime//预计用时
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
                let TECH_ID = info.technology_NEEL_ID;//需求ID
                let OLD_STATE = info.state;//当前状态码
                params.append("TECHNOLOGY_NEEL_ID", TECH_ID);
                params.append("OLD_STATE", OLD_STATE);
                params.append("endTime", endTime);
                params.append("startTime", startTime);
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
                this.$set(this.split,"systemAll",[{
                    "name": "", "version": ""
                }]);//清空系统
                this.split.startdate = "";//开始时间
                this.split.enddate = "";//结束时间
                this.split.tableData = [];//人员信息
            },
            //-----------------------------------开发的任务
            //开发的开始操作
            splitCodeStart(index, val){
                let info = this.tabs.activeTableInfo;
                let params = new URLSearchParams();
                params.append("TECHNOLOGY_NEEL_ID", info.technology_NEEL_ID);
                params.append("TASK_ID", val.task_ID);
                params.append("STATE_ID", val.state_ID);
                this.$axios.post("/demand/technologyTestto", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$success("操作成功！");
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
            //调用完成接口
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
            //展示给开发人员的bug
            showCodeBUG(){
                let info = this.tabs.activeTableInfo;
                let params = new URLSearchParams();
                params.append("BASE_ID", info.base_NEET_ID);
                this.$axios.post("/base/queryBugByCode", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        if(data.result.bugs.length){
                            this.$set(this.testTask, "codeBUGData", data.result.bugs);
                            this.testTask.codeBUGlistvisible = true;
                        }else{
                            this.$success("当前无BUG待处理");
                        }
                    }
                })
            },
            //-----------------------------------------测试的任务操作
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
        }
    }
</script>