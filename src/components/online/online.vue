<style scoped>
    @import "../../static/css/table.css";
    @import "../../static/css/console.css";

    .search .el-input {
        width: auto;
    }

    .back {
        position: absolute;
        left: 0;
        top: 0;
        font-size: 13px;
        cursor: pointer;
        line-height: 21px;
    }

    .back i.b {
        color: #606266;
        font-style: normal;
    }

    .el-date-editor--datetimerange.el-input__inner {
        width: 370px;
    }

    .el-textarea textarea {
        height: 100px;
    }

    .el-table td, .el-table th {
        padding: 5px 0;
    }

    .el-button {
        padding: 6px 10px;
    }

    .console-tab-content .add {
        position: absolute;
        font-size: 20px;
        height: 20px;
        cursor: pointer;
        top:0;
        bottom: 0;
        right: 5px;
        margin: auto;

    }
    .addCol{
        position: relative;
        padding: 0 30px 0 0!important;
    }
</style>

<template>
    <div class="rolelist common-card-wrap" style="height: 100%;">
        <el-card class="box-card">
            <div class="text item">
                <div class="content" v-if="!bugVisible">
                    <div class="action clear">
                        <el-select v-model="selectValue"  clearable
                                   size="mini">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.key"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select v-model="selectValue" clearable
                                   size="mini">
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
                            <div class="search i-b" @keyup="searchKeyword($event)">
                                <el-input
                                        placeholder="请输入检索关键字"
                                        suffix-icon="icon-sousuo iconfont"
                                        v-model="keyword"
                                        size="mini"
                                >
                                </el-input>
                            </div>
                        </div>
                    </div>
                    <div class="table-list">
                        <el-table :data="table.tableData" border style="width: 100%"
                                  :height="table.tableHeight" highlight-current-row
                                  @row-click="handleCurrentChange">
                            <el-table-column prop="aa" label="需求编号"></el-table-column>
                            <el-table-column prop="aa" label="预计上线日期" width="110"></el-table-column>
                            <el-table-column prop="aa" label="预期上线时间" width="110"></el-table-column>
                            <el-table-column prop="aa" label="系统名称"></el-table-column>
                            <el-table-column prop="aa" label="子系统"></el-table-column>
                            <el-table-column prop="aa" label="版本号"></el-table-column>
                            <el-table-column prop="aa" label="产品功能"></el-table-column>
                            <el-table-column prop="aa" label="上线类型"></el-table-column>
                            <el-table-column prop="aa" label="状态"></el-table-column>
                            <el-table-column prop="aa" label="更新时间"></el-table-column>
                            <el-table-column label="操作" width="130">
                                <template slot-scope="scope" class="action-wrap">
                                    <el-button @click="editRow(scope.row,scope)" size="small" type="primary">操作
                                    </el-button>
                                    <el-button @click="deleteRow(scope.row,scope)" size="small" type="danger">操作
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="console-tab-wrapper" v-if="tabs.consoleWrapperVisible">
                        <div class="console-action-wrapper">
                            <i class="el-icon-close close" @click="setConsoleVisible"></i>
                        </div>
                        <el-tabs v-model="tabs.activeName" type="card" @tab-click="handleClick">
                            <el-tab-pane label="详情页" name="info">
                                    <!--上线申请-->
                                    <div v-if="suibianxie" class="console-tab-content" >
                                        <el-form ref="form" :model="form" label-width="100px" label-position="left">
                                            <el-row :gutter="20">
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="需求编号">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="需求名称">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="申请人">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="需求来源">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="申请日期">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="计划投产日期">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="优先级">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="重要程度">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="24" :sm="24">
                                                    <el-form-item label="是否加急">
                                                        <el-radio disabled v-model="radio1" label="禁用">备选项</el-radio>
                                                        <el-radio disabled v-model="radio1" label="选中且禁用">备选项</el-radio>
                                                        <el-input
                                                                type="textarea"
                                                                :rows="2"
                                                                placeholder="请输入内容"
                                                                v-model="textarea">
                                                        </el-input>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="24" :sm="24">
                                                    <el-form-item label="需求描述">
                                                        BUG编号BUG编号BUG编号BUG编号
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="24" :sm="24">
                                                    <el-form-item label="产品功能">
                                                        BUG编号BUG编号BUG编号BUG编号
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>
                                        </el-form>
                                    </div>
                                    <!--上线申请-->
                                    <!--事业部-->
                                    <div v-if="suibianxie" class="console-tab-content">
                                        <el-form ref="form" :model="form" label-width="100px" label-position="left">
                                            <el-row :gutter="20">
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="涉及系统">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="上线类型">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="上线模块">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="上线内容">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="需求编号">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="需求名称">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="申请人">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="需求来源">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="申请日期">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="计划投产日期">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="优先级">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="重要程度">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="开发负责人">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="项目负责人">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="产品负责人">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="测试负责人">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="预计上线日期">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="预计上线时间">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="影响时间">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="是否停交易">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="24" :sm="24">
                                                    <el-form-item label="是否加急">
                                                        <el-radio disabled v-model="radio1" label="禁用">备选项</el-radio>
                                                        <el-radio disabled v-model="radio1" label="选中且禁用">备选项</el-radio>
                                                        <el-input
                                                                type="textarea"
                                                                :rows="2"
                                                                placeholder="请输入内容"
                                                                v-model="textarea"
                                                                disabled
                                                        >
                                                        </el-input>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="24" :sm="24">
                                                    <el-form-item label="需求描述">
                                                        BUG编号BUG编号BUG编号BUG编号
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="24" :sm="24">
                                                    <el-form-item label="产品功能">
                                                        BUG编号BUG编号BUG编号BUG编号
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="24" :sm="24">
                                                    <el-form-item label="操作手册">
                                                        BUG编号BUG编号BUG编号BUG编号
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>
                                        </el-form>
                                    </div>
                                    <!--事业部-->
                                    <!--质量管理部-->
                                    <div v-if="suibianxie" class="console-tab-content">
                                        <el-form ref="form" :model="form" label-width="100px" label-position="left">
                                            <el-row :gutter="20">
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="涉及系统">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>


                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="上线类型">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="是否加急">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="上线模块">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="上线内容">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="需求编号">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="需求名称">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="申请人">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="需求来源">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="申请日期">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="计划投产日期">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="优先级">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="重要程度">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="需求描述">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="产品功能">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="开发负责人">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="项目负责人">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="产品负责人">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="测试负责人">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="预计上线日期">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="预计上线时间">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="影响时间">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="是否停交易">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="24" :sm="24">
                                                    <el-form-item label="需求描述">
                                                        BUG编号BUG编号BUG编号BUG编号
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="24" :sm="24">
                                                    <el-form-item label="产品功能">
                                                        BUG编号BUG编号BUG编号BUG编号
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="24" :sm="24">
                                                    <el-form-item label="操作手册">
                                                        BUG编号BUG编号BUG编号BUG编号
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>
                                        </el-form>
                                    </div>
                                    <!--质量管理部-->
                                    <!--运维部-->
                                    <div v-if="suibianxie" class="console-tab-content">
                                        <el-form ref="form" :model="form" label-width="100px" label-position="left">
                                            <el-row :gutter="20">
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="涉及系统">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>


                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="上线类型">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="是否加急">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="上线模块">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="上线内容">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="需求编号">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="需求名称">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="申请人">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="需求来源">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="申请日期">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="计划投产日期">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="优先级">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="重要程度">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="需求描述">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="产品功能">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="开发负责人">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="项目负责人">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="产品负责人">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="测试负责人">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="预计上线日期">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="预计上线时间">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="影响时间">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="是否停交易">
                                                        102101654561321654131032
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="24" :sm="24">
                                                    <el-form-item label="是否加急">
                                                        <el-radio disabled v-model="radio1" label="禁用">备选项</el-radio>
                                                        <el-radio disabled v-model="radio1" label="选中且禁用">备选项</el-radio>
                                                        <el-input
                                                                type="textarea"
                                                                :rows="2"
                                                                placeholder="请输入内容"
                                                                v-model="textarea"
                                                                disabled
                                                        >
                                                        </el-input>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="24" :sm="24">
                                                    <el-form-item label="需求描述">
                                                        BUG编号BUG编号BUG编号BUG编号
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="24" :sm="24">
                                                    <el-form-item label="产品功能">
                                                        BUG编号BUG编号BUG编号BUG编号
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="24" :sm="24">
                                                    <el-form-item label="操作手册">
                                                        BUG编号BUG编号BUG编号BUG编号
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>
                                        </el-form>
                                    </div>
                                    <!--运维部-->
                            </el-tab-pane>
                            <el-tab-pane label="操作台" name="console">
                                <div class="console-action-wrapper">
                                    <i class="icon-more iconfont"
                                       @click="tabs.consoleActionVisible = !tabs.consoleActionVisible"></i>
                                    <div class="console-action fr" v-if="tabs.consoleActionVisible">
                                            <span v-for="item in tabs.consoleActionData.onlineact"
                                                  @click="consoleActionEvent(item.name,'onlineact')">{{item.name}}
                                            </span>
                                    </div>
                                </div>
                                <!--上线申请-->
                                <div class="console-tab-content" v-if="asd">
                                    <el-form :model="form" label-width="100px" label-position="left">
                                        <el-row :gutter="20">
                                            <el-col :span="13" :sm="13">
                                                <el-form-item label="状态">
                                                    <el-form-item label="213131"></el-form-item>
                                                </el-form-item>
                                            </el-col>

                                            <el-col :span="24" :sm="24" style="padding: 0">
                                                <el-col :span="12" :sm="12">
                                                    <el-form-item label="上线类型">
                                                        <el-select v-model="form.region" placeholder="请选择活动区域">
                                                            <el-option label="区域一" value="shanghai"></el-option>
                                                            <el-option label="区域二" value="beijing"></el-option>
                                                        </el-select>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="12" :sm="12">
                                                    <el-form-item label="是否加急">
                                                        <el-select clearable v-model="form.region" placeholder="请选择活动区域">
                                                            <el-option label="区域一" value="shanghai"></el-option>
                                                            <el-option label="区域二" value="beijing"></el-option>
                                                        </el-select>
                                                    </el-form-item>
                                                </el-col>
                                            </el-col>
                                            <!--新增按钮增加的内容区域-->
                                            <el-col :span="24" :sm="24" class="addCol">
                                                <el-col :span="12" :sm="12">
                                                    <el-form-item label="涉及系统">
                                                        <el-select clearable v-model="form.region" placeholder="请选择活动区域">
                                                            <el-option label="区域一" value="shanghai"></el-option>
                                                            <el-option label="区域二" value="beijing"></el-option>
                                                        </el-select>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="12" :sm="12">
                                                    <el-form-item label="上线系统">
                                                        <el-select clearable v-model="form.region" placeholder="请选择活动区域">
                                                            <el-option label="区域一" value="shanghai"></el-option>
                                                            <el-option label="区域二" value="beijing"></el-option>
                                                        </el-select>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="上线模块">
                                                        <el-input v-model="form.name"></el-input>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="上线内容">
                                                        <el-input v-model="form.name"></el-input>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" :sm="8">
                                                    <el-form-item label="操作手册">
                                                        <el-input v-model="form.name"></el-input>
                                                    </el-form-item>
                                                </el-col>
                                                <i class="el-icon-circle-plus-outline add"></i>
                                            </el-col>
                                            <!--新增按钮增加的内容区域-->
                                            <el-col :span="12" :sm="12">
                                                <el-form-item label="项目负责人">
                                                    <el-input v-model="form.name"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12" :sm="12">
                                                <el-form-item label="开发负责人">
                                                    <el-input v-model="form.name"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12" :sm="12">
                                                <el-form-item label="测试负责人">
                                                    <el-input v-model="form.name"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12" :sm="12">
                                                <el-form-item label="产品负责人">
                                                    <el-input v-model="form.name"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12" :sm="12">
                                                <el-form-item label="预计上线日期">
                                                    <el-date-picker
                                                            v-model="value1"
                                                            type="date"
                                                            placeholder="选择日期">
                                                    </el-date-picker>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12" :sm="12">
                                                <el-form-item label="预计上线时间">
                                                    <el-input v-model="form.name"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12" :sm="12">
                                                <el-form-item label="是否停交易">
                                                    <el-input v-model="form.name"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12" :sm="12">
                                                <el-form-item label="影响时间（分钟）" label-width="140px">
                                                    <el-input v-model="form.name"></el-input>
                                                </el-form-item>
                                            </el-col>

                                            <el-col :span="24" :sm="24">
                                                <el-form-item label="说明">
                                                    <el-input type="textarea" v-model="form.desc"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                    </el-form>
                                </div>
                                <!--上线申请-->
                                <!--事业部,质量管理部和运维部相同-->
                                <div class="console-tab-content">
                                    <el-form :model="form" label-width="100px" label-position="left">
                                        <el-row :gutter="20">
                                            <el-col :span="12" :sm="12">
                                                <el-form-item label="状态">
                                                    <el-form-item label="213131"></el-form-item>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12" :sm="12">
                                                <el-form-item label="发送人">
                                                    <el-form-item label="213131"></el-form-item>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="24" :sm="24">
                                                <el-form-item label="说明">
                                                    <el-input type="textarea" v-model="form.desc"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                    </el-form>
                                </div>
                                <!--事业部-->
                            </el-tab-pane>
                            <el-tab-pane label="全程跟踪" name="project">
                                <div class="console-tab-content">
                                    <el-form :model="form" label-width="180px" label-position="left">
                                        <el-row :gutter="20">
                                            <el-col :span="8" :sm="8">
                                                <el-form-item label="待技术管理部审核：">
                                                    <el-form-item label="213131"></el-form-item>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="8" :sm="8">
                                                <el-form-item label="发送人：" label-width="100px">
                                                    <el-form-item label="213131"></el-form-item>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="24" :sm="24">信息</el-col>
                                        </el-row>
                                    </el-form>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                bugVisible: false,
                table: {
                    tableData: [{
                        a: '2016-05-03',
                        aa: '这是内容',
                    }],
                    tableOriginData: [],
                    tableHeight: "",
                },
                keyword: "",
                options: [
                    {
                        "key": "与我相关",
                        "value": "1"
                    }, {
                        "key": "全部",
                        "value": "2"
                    }, {
                        "key": "订制中",
                        "value": "3"
                    }, {
                        "key": "制定方案",
                        "value": "4"
                    }, {
                        "key": "方案选择",
                        "value": "5"
                    }, {
                        "key": "追踪信息",
                        "value": "6"
                    }, {
                        "key": "已完成",
                        "value": "7"
                    }, {
                        "key": "已作废",
                        "value": "8"
                    }
                ],
                selectValue: "与我相关",
                page: {},
                form: {},
                error: {
                    disabled: true
                },
                dateComp: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }],
                    value: ""
                },
                tabs: {
                    activeName: 'info',
                    consoleActionData: {
                        "onlineact": [{
                            "name":"操作"
                        },{
                            "name":"操作",
                        },{
                            "name":"操作",
                        }]
                    },
                    consoleActionVisible: false,
                    consoleWrapperVisible: false,

                }
            }
        },
        mounted(){
            this.calculate();
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
            handleCurrentChange(val){
                this.tabs.activeTableInfo = val;
                if (!this.tabs.consoleWrapperVisible) {
                    this.tabs.consoleWrapperVisible = true;
                    setTimeout(() => {
                        this.calculate()
                    }, 0);
                }
            },
            handleSizeChange(val){
                console.log(val)
            },
            subForm(){

            },
            cancelForm(){

            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
        }
    }
</script>