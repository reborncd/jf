<template>
  <div class="rolelist common-card-wrap" style="height: 100%;"
       @click="$event.target.className == 'icon-more iconfont'?'':tabs.consoleActionVisible = false">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <p class="card-title por">
          <!--<span class="back fl clear" @click="errorVisible = !errorVsetTableDataisible" v-if="errorVisible">-->
          <span class="back fl clear" v-if="errorVisible" @click="backPage">
                        <i class="el-icon-arrow-left"></i>
                        <i class="b">返回</i></span>
          {{!errorVisible?'故障清单':'故障提交单'}}
        </p>
      </div>
      <div class="text item">
        <div class="content" v-if="!errorVisible">
          <div class="action clear">
            <el-button type="danger" @click="addPopup" size="mini">提交故障</el-button>
            <el-select v-model="selectValues" clearable placeholder="请选择状态" @change="statusOpt" size="mini" filterable>
              <el-option :key="index"
                v-for="(item, index) in selectValue"
                :label="item.value"
                :value="item.id">
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
                  @change='timeChange'
                >
                </el-date-picker>
              </div>
              <div class="search i-b" @keyup="searchKeyword($event)">
                <!--v-on:input="keyChange"-->
                <el-input placeholder="请输入检索关键字" suffix-icon="icon-sousuo iconfont" v-model="keyword" size="mini">
                </el-input>
              </div>
            </div>
          </div>
          <div class="table-list">
            <el-table :data="table.tableData" border style="width: 100%" :height="table.tableHeight" highlight-current-row
                      @row-click="handleCurrentChange" ref="err_table">
              <el-table-column prop="id" label="编号" width="180" show-overflow-tooltip></el-table-column>
              <el-table-column prop="description" label="描述" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span :title=scope.row.description class="tab-opt" style="">{{scope.row.description}}</span>
                </template>
              </el-table-column>
              <!--<el-table-column prop="os_TYPE" label="涉及系统"></el-table-column>-->
              <el-table-column prop="system_TYPE" label="子系统" width="110" show-overflow-tooltip></el-table-column>
              <el-table-column prop="reason" label="故障成因" show-overflow-tooltip></el-table-column>
              <el-table-column prop="create_TIME" label="提交日期" width="110" show-overflow-tooltip></el-table-column>
              <el-table-column prop="priperty" label="故障等级" width="80" show-overflow-tooltip></el-table-column>
              <el-table-column prop="status" label="状态" show-overflow-tooltip></el-table-column>
              <el-table-column prop="update_TIME" label="更新时间" show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
          <div class="console-tab-wrapper" v-if="tabs.consoleWrapperVisible">
            <div class="console-action-wrapper">
              <i class="el-icon-close close" @click="setConsoleVisible"></i>
            </div>
            <el-tabs v-model="tabs.activeName" type="card" @tab-click="tabClick">
              <el-tab-pane label="详情页" name="info">
                <div class="console-tab-content">
                  <el-form ref="form" :model="form" label-width="100px" label-position="left">
                    <el-row :gutter="20">
                      <el-col :span="12" :sm="12">
                        <el-form-item label="BUG编号">
                          {{tabs.form.id}}
                        </el-form-item>
                      </el-col>
                      <el-col :span="12" :sm="12">
                        <el-form-item label="故障等级">
                        	{{tabs.form.pripoerty}}
                        </el-form-item>
                      </el-col>
                      <el-col :span="12" :sm="12">
                        <el-form-item label="故障分析人员">
                          {{tabs.form.relationUser}}
                        </el-form-item>
                      </el-col>
                      <el-col :span="24" :sm="24">
                        <el-form-item label="故障描述">
                          {{tabs.form.description}}
			               <p>
			               	<a style="margin-right: 20px;color: #66b1ff" :key="index" v-for="(item,index) in tabs.downName" @click="downfile(item.id)" >{{item.name}}</a>
			               </p>
                        </el-form-item>

                      </el-col>
                      <el-col :span="24" :sm="24">
                        <el-form-item label="交易量影响">
                          {{tabs.form.sumEffect}}
                        </el-form-item>
                      </el-col>
                      <el-col :span="24" :sm="24">
                        <el-form-item label="故障复盘分析">
                          {{tabs.form.descriptionEx}}
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </div>
              </el-tab-pane>
              <el-tab-pane label="操作台" name="console">
                <div class="console-action-wrapper">
                  <!--<i class="icon-more iconfont"-->
                     <!--@click="tabs.consoleActionVisible = !tabs.consoleActionVisible" v-if="operate.status=='待审核'"></i>-->
                  <!--<div class="console-action fr" v-if="tabs.consoleActionVisible">-->
                        <!--<span v-for="(item, index) in tabs.consoleActionData.erract"-->
                              <!--@click="consoleActionEvent(item.name,'erract')">{{item.name}}</span>-->
                  <!--</div>-->
                </div>
                <div class="console-tab-content">
                  <el-form :model="form" label-width="100px" label-position="left">
                    <el-row :gutter="20">
                      <el-col :span="12" :sm="12">
                        <el-form-item label="状态">
                          <el-form-item label="">{{operate.status}}</el-form-item>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12" :sm="12">
                        <el-form-item label="发送人">
                          <el-form-item label="">{{operate.relation_USER}}</el-form-item>
                        </el-form-item>
                      </el-col>
                      <div class="opt-show" v-if="operate.status=='待审核' && operate.permission">
                        <el-col :span="12" :sm="12">
                          <el-form-item label="成因">
                              <el-select v-model="operate.operateTxt.reasonValue" filterable clearable style='width: 100%;'>
                                <el-option
                                        v-for="_item in operate.operateTxt.reasonSelect"
                                        :key="_item.ID"
                                        :label="_item.REASON_NAME"
                                        :value="_item.ID"
                                ></el-option>
                              </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12" :sm="12">
                          <el-form-item label="影响范围">
                            <el-input v-model="operate.operateTxt.effectScope">{{operate.operateTxt.effectScope}}</el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="24" :sm="12">
                          <el-form-item label="涉及系统">
                            <el-form-item label="">{{operate.system}}</el-form-item>
                          </el-form-item>

                        </el-col>
                        <el-col :span="24" :sm="12">
                          <el-form-item label="子系统" class='sunSystem' :key="index" v-for="(item,index) in operate.systemAll">
                            <el-select v-model="item.csty" placeholder="子系统" clearable style="width:90%" filterable>
                              <el-option
                                v-for="item in operate.subSystem"
                                :key="item.SYSTEM_ID"
                                :label="_item.SYSTEM_NAME"
                                :value="_item.SYSTEM_ID+','+_item.SYSTEM_NAME"
                              ></el-option>
                            </el-select>
                            <i
                              :class="index == 0 && operate.systemAll.length ==1?'el-icon-plus':index == operate.systemAll.length-1?'el-icon-plus':'el-icon-minus'"
                              @click="addsubStystem(index,$event)"
                              style="line-height: 40px;height: 40px;text-align: right;width: 8%; font-size: 20px;cursor: pointer;font-weight: bold">
                            </i>
                          </el-form-item>
                        </el-col>
                        <el-col :span="24" :sm="24">
                          <el-form-item label="解决方案">
                            <el-input type="textarea" v-model="operate.operateTxt.solution"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col align="center" v-if="operate.status=='待审核'">
                                <el-button type="" size="medium" value="驳回" name="'bh" @click="consoleActionEvent('驳回')">驳回</el-button>
                                <el-button type="primary" size="medium" value="确认" @click="consoleActionEvent('确认')">确认</el-button>
                        </el-col>
                      </div>
                    </el-row>
                  </el-form>
                </div>
              </el-tab-pane>
              <el-tab-pane label="全程跟踪" name="project">
                <div class="console-tab-content">
                  <el-form :model="form" label-width="100px" label-position="left">
                    <el-row :gutter="20">
                      <el-col :span="12" :sm="8">
                        <el-form-item label="状态">
                          <el-form-item label="">{{operate.status}}</el-form-item>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12" :sm="8">
                        <el-form-item label="发送人" label-width="100px">
                          <el-form-item label="">{{way.relation_USER}}</el-form-item>
                        </el-form-item>
                      </el-col>
                      <el-col class="col-div" :span="24" :sm="24">
                        <div class="infoDiv" >
                          <p :key="key" v-for="(item,key) in way.information">
                            {{key+1}}、
                            <span>{{item.record_START | date}}</span>
                            <em>{{item.record_DESC}}</em>
                          </p>
                        </div>
                      </el-col>
                    </el-row>
                  </el-form>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <!--故障提交单弹窗-->
        <div class="content" v-if="errorVisible" style='background: white;z-index: 10;'>
          <el-form :model="form" label-width="120px">
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="故障编号">
                  <el-input disabled v-model="popup.popTxt.id"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="故障等级">
                  <!--<el-input v-model="popup.priperty"></el-input>-->
                  <el-select v-model="popup.popTxt.priperty2" placeholder="故障等级" clearable filterable style="width: 100%">
                    <el-option
                      v-for="item in popup.priperty"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="故障分析人员">
                  <el-input v-model="popup.popTxt.relationUser" style="width: 100%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" :sm="12">
                <el-form-item label="">

                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
              <el-form-item label="故障描述" style="position: relative;">
                <el-input v-model="popup.popTxt.description" type="textarea"></el-input>
                <el-button type="primary">上传附件</el-button>
                <input type="file" @change="getFile($event)" placeholder="上传附件" class="upload-input"
                       style="width:78px;opacity: 0;position: absolute;left: 0;top: 63px;">
                <p :key="index" v-for ="(item,index) in popup.popTxt.uploadFiles">{{item}}
                  <i style="margin-left: 10px;cursor: pointer;color: red;"
                  	@click="popup.popTxt.fileList.splice(index,1);popup.popTxt.uploadFiles.splice(index,1)" class="el-icon-close"></i>
                </p>
                </el-upload>
              </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
              <el-form-item label="故障复盘分析">
                <el-input v-model="popup.popTxt.descriptionEx" type="textarea"></el-input>
              </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
              <el-form-item label="交易量影响">
                <el-input v-model="popup.popTxt.sumEffect" type="textarea"></el-input>
              </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div style="text-align: center">
            <el-button type="primary"
                       @click="tableAction($event)">分配人员
            </el-button>
            <el-button type="danger" @click="subForm">确 定</el-button>
          </div>
        </div>
        <!--分配-->
        <el-dialog title="分配" :visible="assign.assignvisible" width="40%"
                   append-to-body modal-append-to-body :before-close="closeDialog" class="assgin-dialog">
          <div slot="title">
            <h2>分配</h2>
            <el-input
                    class="search-input"
                    placeholder="请输入姓名"
                    v-model="assign.keyword"
                    @keyup.13="assignSearch($event)"
                    @change="assignSearch" clearable>
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
          <!--左侧选择全部部门-->
          <div class="assign-wrapper" v-if="assign.left">
            <!--正常状态下展示部门-->
            <ul v-if="!assign.leftSearch">
              <li :key="index" v-for="(item, index) in assign.searchData" v-if="item.users.length>0">
                <span class="deptTitle" @click="assign.assignDeptIndex = index" style="cursor: pointer">{{item.dept_name}}</span>
                <el-checkbox-group v-model="assign.checkList" v-show="index == assign.assignDeptIndex">
                  <el-checkbox v-for="_item in item.users" :key="_item.user_ID" :label="_item.user_ID+'-'+_item.user_NAME" class="check-item">
                    {{_item.user_NAME}}&nbsp;-&nbsp;{{_item.role_NAME}}
                  </el-checkbox>
                </el-checkbox-group>
              </li>
            </ul>
            <!--搜索状态下不展示部门-->
            <div v-if="assign.leftSearch">
              <el-checkbox-group v-model="assign.checkList">
                <el-checkbox v-for="item in assign.searchData" :key="item.user_ID" :label="item.user_ID+'-'+item.user_NAME"
                             class="check-item">
                  {{item.user_NAME}}&nbsp;-&nbsp;{{item.role_NAME}}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="assign.assignvisible = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="subAssign" size="mini">提交</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>

  </div>
</template>
<script>
  export default {
    data(){
      return {
        errorVisible: false,
        table: {
          tableData: [],
          tableOriginData: [],
          tableHeight: "",
        },
        operate: {
          id: '',
          status: '',//状态
            relation_USER: '',//发送人
          system: '',//涉及系统
          systemAll: [{"fsty": "", "csty": ""}],
          subSystem: [],//子系统
          operateTxt:{
          'reasonValue': '',//成因
          'reasonSelect':'',
          'effectScope': '',//影响范围
          'solution': '',//解决方案
          },
            fpvisible:true,//分配弹窗显示
            permission:false
        },
        way: {
          status: '',
          sender: '',
          information: ''
        },
        keyword: "",
        options: [],
        selectValues: [],
        selectValue: [
          {
            'id': 1,
            "value": '待审核'
          }, {
            'id': '2',
            "value": '已完成'
          },
          {
            'id': '4',
            "value": '已驳回'
          },
        ],
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
          activeTableInfo: "",
          form: {
            id: "",
            pripoerty: '',
            relationUser: "",
            description: "",
            sumEffect: "",
            descriptionEx: "",
            downName:[]
          },
          activeName: 'info',
          consoleActionData: {
            "erract": [{
              "name": "驳回"
            }, {
              "name": "确认"
            }]
          },
          consoleActionVisible: false,
          consoleWrapperVisible: false,

        },
        popup: {
            fppeople:'',//分配人员
          priperty: [
            {
              'name': '紧急',
              "value": "101"
            },
            {
              'name': '中等',
              "value": "102"
            },
            {
              'name': '一般',
              "value": "103"
            }],
         popTxt:{
              'id':'',//问题编号
	          'priperty2':'',//故障等级
	          'relationUser': "",			//故障分析人员
	          'description': "",				//故障描述
	          'descriptionEx': "",			//故障复盘分析
	          'sumEffect': "",				//交易量影响
	          'uploadFiles':[],              // 上传成功的文件数组
	          'fileList':[],                //上传附件
         }

        },
          split:{
              splitaddvisible:false
          },
          assign: {
              assignvisible: false,//分配的弹窗
              keyword: "",//分配的搜索人员
              left: true,//左侧的显示
              right: false,//右侧的显示
              checkList: [],//选择的数据
              leftOriginData: [],//左侧显示的数据
//                    rightlistdata: [],//右侧显示的数据
              leftSearch: false,//左侧搜索出来的结构展示
              searchData: [],//左侧特殊结构，显示出来的搜索结果存放处
              assignDeptIndex:"",//当前选中的部门索引
          },
          activeinfo:'',
        errorVsetTableDataisible: false,
      }
    },
     filters: {
         date(time) {
             let d = new Date(time);
             let year = d.getFullYear();
             let month = (d.getMonth() + 1)<10?'0' + (d.getMonth()+1) : '' + d.getMonth()+ 1;
             let day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
             let hour = d.getHours()< 10 ? '0' + d.getHours() : '' + d.getHours();
             let minutes = d.getMinutes() <10 ? '0' + d.getMinutes() : '' + d.getMinutes();
             let seconds = d.getSeconds() <10 ? '0' + d.getSeconds() : '' + d.getSeconds();
             return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
         },
    },
    mounted(){
      this.calculate();
      this.loadData();
    },
    methods: {
      calculate(){
        let height = document.querySelector(".mainr").offsetHeight;
        let card_body = document.querySelector(".box-card .el-card__body");
        card_body.style.height = height - 36 - 48 + "px";//此处需减去卡片头部
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
          //-----------------------body的上下padding--table的margin-top-卡片头部
          this.table.tableHeight = height - 36 - actionHeight - 20 - 20 - 48 - 2;
        } else {
          this.table.tableHeight = height * 0.3;
        }
      },
      calculateTabsHeight(){
        let card_body = document.querySelector(".box-card .el-card__body");
        let actionHeight = document.querySelector(".content .action").offsetHeight;
        let allTabContent = document.querySelectorAll(".console-tab-content");
        for (let i of allTabContent) {
          //---------------el-card__body的可用内容高---------顶部操作栏的高---------表格部分的高------tab的头和margin的高----------操作台border-卡片头部
          i.style.height = (parseInt(card_body.style.height) - 20 ) - actionHeight - (this.table.tableHeight + 20) - (20 + 40) - 2 + "px";
        }
      },
      loadData(){
      	//清除新增新增的表单
        this.clearAddData();
        let params = new URLSearchParams();
        this.$maskin();
        this.$axios.post("/fault/query?type=1", params).then((res) => {
          let data = res.data;
          this.setTableData(data);
          this.$maskoff();
        })
      },
      setTableData(data){
        if (data.code == 200) {
          let arr = [];
          for (let i of data.result) {
            if (i.update_TIME) {
              let update = this.$format(i.update_TIME);
              i.update_TIME = `${update.year}-${update.mouth}-${update.day}`;
            }
            if (i.create_TIME) {
              let create = this.$format(i.create_TIME);
              i.create_TIME = `${create.year}-${create.mouth}-${create.day}`;
            }
            if (i.status == 1) {
              i.status = '待审核'
            }
            if (i.status == 2) {
              i.status = '已完成'
            }
            if (i.status == 4) {
              i.status = '已驳回'
            }
            if (i.priperty == 101) {
              i.priperty = '紧急'
            }
            if (i.priperty == 102) {
              i.priperty = '中等'
            }
            if (i.priperty == 103) {
              i.priperty = '一般'
            }
            if(i.reason){
                if(i.reason==1){
                    i.reason='程序问题'
                }
                if(i.reason==2){
                    i.reason='硬件环境'
                }
                if(i.reason==3){
                    i.reason='网络故障'
                }
                if(i.reason==4){
                    i.reason='人为错误'
                }
            }

            arr.push(i)
          }
          this.$set(this.table, "tableData", arr);
          this.$set(this.table, "tableOriginData", arr);
          if (this.$route.params.neelId) {
            let id = this.$route.params.neelId;
            for (let i = 0; i < data.result.length; i++) {
              if (data.result[i].id == id) {
                setTimeout(() => {
                  this.tabs.index = i;
                  this.$refs.err_table.setCurrentRow(data.result[i]);
                  this.handleCurrentChange(data.result[i]);
                }, 0);
                break;
              }
            }
            return;
          }
          this.$maskoff();
        }
      },
      tableAction(e){
          //阻止事件冒泡
          e.stopPropagation();
          this.getAssign();
      },
      getAssign(){
          this.assign.keyword = "";//初始化关键字
          this.assign.assignDeptIndex = "";//初始化选中的索引
          this.assign.leftSearch = false;//关闭搜索结果的展示
          this.assign.assignvisible = true;
          let params = new URLSearchParams();
          this.$axios.post("/fault/queryUserByDemand", params).then((res) => {
              let data = res.data;
              if (data.code == 200) {
                  this.$set(this.assign, "searchData", data.result.users);
                  this.$set(this.assign, "leftOriginData", data.result.users);
              }
          })
      },
      //-----------------------------------分配任务搜索功能
      assignSearch(){
          let keyword = this.assign.keyword;
          //搜索关键字判断
          if (keyword == "") {
              //为空
              this.assign.leftSearch = false;
              this.$set(this.assign, "searchData",this.assign.leftOriginData)
          } else {
              //不为空
              let arr = [];
              for (let i of this.assign.leftOriginData) {
                  for (let j of i.users) {
                      if (j.user_NAME.indexOf(keyword) >= 0) {
                          arr.push(j)
                      }
                  }
              }
              this.assign.leftSearch = true;
              this.$set(this.assign, "searchData", arr);
          }
      },
      //-----------------------------------提交分配任务
      subAssign(){
            let result = this.assign.checkList;
            debugger;
            if (result.length == 0) {
                this.$warn("当前没有选择任何人员");
            } else {
                let arr = [];
                for(let i of result){
                    arr.push(i.split("-")[0])
                }
                this.$set(this.popup,"fppeople",arr);
                this.assign.assignvisible = false;
            }
        },
      //故障bug状态选择
      statusOpt(val){
      	this.setConsoleVisible()
        let params = new URLSearchParams();
        params.append("status", val);
        this.$axios.post("/fault/query?type=1", params).then((res) => {
          let data = res.data;
          if (data.code == 200) {
            let arr = [];
          for (let i of data.result) {
            if (i.update_TIME) {
              let update = this.$format(i.update_TIME);
              i.update_TIME = `${update.year}-${update.mouth}-${update.day}`;
            }
            if (i.create_TIME) {
              let create = this.$format(i.create_TIME);
              i.create_TIME = `${create.year}-${create.mouth}-${create.day}`;
            }
            if (i.status == 1) {
              i.status = '待审核'
            }
            if (i.status == 2) {
              i.status = '已完成'
            }
            if (i.status == 3) {
              i.status = '已作废'
            }
            if (i.status == 4) {
              i.status = '已驳回'
            }
            if (i.priperty == 101) {
              i.priperty = '紧急'
            }
            if (i.priperty == 102) {
              i.priperty = '中等'
            }
            if (i.priperty == 103) {
              i.priperty = '一般'
            }
            arr.push(i)
          }
          this.$set(this.table, "tableData", arr);
          }
        })
      },
      //时间搜索
      timeChange(val){
      	this.setConsoleVisible()
        let startTime = val[0]
        let endTime = val[1]
        startTime = Date.parse(startTime);
        endTime = Date.parse(endTime);
        let params = new URLSearchParams();
        params.append("startTime", startTime);
        params.append("endTime", endTime);
        this.$axios.post("/fault/query?type=1", params).then((res) => {
          let data = res.data;
          if (data.code == 200) {
            let arr = [];
          for (let i of data.result) {
            if (i.update_TIME) {
              let update = this.$format(i.update_TIME);
              i.update_TIME = `${update.year}-${update.mouth}-${update.day}`;
            }
            if (i.create_TIME) {
              let create = this.$format(i.create_TIME);
              i.create_TIME = `${create.year}-${create.mouth}-${create.day}`;
            }
            switch(i.status ){
            	 case 1:
                 i.status = '待审核'
                  break;
                  case 2:
                 i.status = '已完成'
                  break;
                  case 3:
                 i.status = '已作废'
                  break;
                  case 4:
                 i.status = '已驳回'
                  break;
            }
            if (i.priperty == 101) {
              i.priperty = '紧急'
            }
            if (i.priperty == 102) {
              i.priperty = '中等'
            }
            if (i.priperty == 103) {
              i.priperty = '一般'
            }
            arr.push(i)
          }
          this.$set(this.table, "tableData", arr);
          }
        })
      },
      //详情显示
      handleCurrentChange(val){
      	this.clearAddData();
        this.tabs.activeTableInfo = val;
        if (!this.tabs.consoleWrapperVisible) {
          this.tabs.consoleWrapperVisible = true;
          setTimeout(() => {
            this.calculate()
          }, 0);
        }
        this.loadTabsData(val);
      },
      loadTabsData(val){
          this.activeinfo=val
          this.$maskin();
          this.clearAddData()
          this.operate.id=val.status;
          let params = new URLSearchParams();
          params.append("id", val.id);
          this.$axios.post("/fault/get", params).then((res) => {
            let data = res.data;
            if (data.code == 200) {
              //以下是设置展示数据
               switch (data.result.fault.priperty) {
                case 101:
                  this.tabs.form.pripoerty='紧急'
                  break;
                case 102:
                  this.tabs.form.pripoerty = '中等'
                  break;
                case 103:
                  this.tabs.form.pripoerty = '一般'
                  break;
              }
              this.tabs.form.id = data.result.fault.id;
              this.form.pripoerty = data.result.fault.priperty;
              this.tabs.form.relationUser = data.result.fault.relation_USER;
              this.tabs.form.description = data.result.fault.description;
              this.tabs.form.sumEffect = data.result.fault.sum_EFFECT; //交易量影响
              this.tabs.form.descriptionEx = data.result.fault.description_EX;
              this.operate.status =val.status
              this.operate.relation_USER = data.result.fault.relation_USER;
              this.operate.permission = data.result.permission;
              this.way.relation_USER = data.result.fault.relation_USER;
              let arr = [];
              let reason=[]
              //
                for(let i of data.result.reasons.reasons){
                    reason.push(i)
                }
                this.$set(this.operate.operateTxt, "reasonSelect", reason);
              if (data.result.process.result.length > 0) {
                for (let i of data.result.process.result) {
                    arr.push(i);
                }

                this.$set(this.way, "information", arr);
              }
              else {
                arr = [];
                this.$set(this.way, "information", arr);
              }
              //操作台涉及系统
              this.operate.system = data.result.systemDept && data.result.systemDept.SYSTEM_NAME || '';
//           操作台子系统显示
              let subSystems = [];
              for (let i of data.result.systems.result) {
                let obj = {
                    "SYSTEM_NAME":i.SYSTEM_NAME,
                    "SYSTEM_ID":i.SYSTEM_ID
                  }
                subSystems.push(obj);
              }
              this.$set(this.operate, "subSystem", subSystems);

              //显示下载附件
              if(data.result.attachment.length>0){
              	let down=[]
              	for(let i of data.result.attachment){
              		if(i.id){
              			down.push(i);
              		}
              		 this.$set(this.tabs, "downName", down);
              	}
              }
                this.$maskoff();
            }

          })
      },
      //搜索
      searchKeyword(e){
      	this.tabs.consoleActionVisible = false
        if (e.keyCode == 13) {
          this.keyword = this.keyword.replace(/(^\s*)|(\s*$)/g, "");
          let params = new URLSearchParams();
          params.append("key", this.keyword);
          this.$axios.post("/fault/query?type=1", params).then((res) => {
            let data = res.data;
            if (data.code == 200) {
              let arr = [];
          for (let i of data.result) {
            if (i.update_TIME) {
              let update = this.$format(i.update_TIME);
              i.update_TIME = `${update.year}-${update.mouth}-${update.day}`;
            }
            if (i.create_TIME) {
              let create = this.$format(i.create_TIME);
              i.create_TIME = `${create.year}-${create.mouth}-${create.day}`;
            }
            switch(i.status ){
            	 case 1:
                 i.status = '待审核'
                  break;
                  case 2:
                 i.status = '已完成'
                  break;
                  case 3:
                 i.status = '已作废'
                  break;
                  case 4:
                 i.status = '已驳回'
                  break;
            }
            if (i.priperty == 101) {
              i.priperty = '紧急'
            }
            if (i.priperty == 102) {
              i.priperty = '中等'
            }
            if (i.priperty == 103) {
              i.priperty = '一般'
            }
            arr.push(i)
          }
          this.$set(this.table, "tableData", arr);
            }
          })
        }
      },
      getFile(e){
        //上传附件
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        };
        if(!e.target.files[0]){
        	return;
        }
         let params = new FormData();
         params.append("token",this.$getToken())
         params.append("file",e.target.files[0]);
         this.$axios.post("/fault/upload", params,config).then((res)=>{
         	let data =res.data;
         	if(data.code == 200){
         		if(typeof this.popup.popTxt.uploadFiles =="string"){
         		this.$set(this.popup.popTxt,"uploadFiles",[])
         		this.$set(this.popup.popTxt,"fileList",[])
         		}
         		this.popup.popTxt.uploadFiles.push(data.result.name)
         		this.popup.popTxt.fileList.push(data.result.id)
            document.querySelector(".upload-input").value = "";
         	}
         })
      },
      //下载附件
      downfile(val){
      	let token=localStorage.getItem("token")
//    	window.open("http://192.168.43.216:8082/fault/download?token="+token+"&id="+val);
      	this.$axios.get("/fault/download?token="+token+"&id="+val+'&type=2')
      },
      addPopup(){
          let params = new FormData();
          params.append("status", 1);
          params.append("token", this.$getToken());
          this.$axios.post("/fault/getNo",params).then((res) => {
              let data = res.data;
              this.popup.popTxt.id=data.id;
          })
      	this.setConsoleVisible()
      	this.errorVisible=!this.errorVisible;
      	this.clearAddData();
      },
      //提交故障单
      subForm(){
        //提交故障提交单
        if (!this.popup.popTxt.priperty2) {
//        this.$warn('请选择故障等级');
					this.$warn('请填写完整信息');
          return;
        }
        if (!this.popup.popTxt.relationUser) {
//        this.$warn('请填写故障分析人员');
					this.$warn('请填写完整信息');
          return;
        }
        if (!this.popup.popTxt.description) {
//        this.$warn('请填写故障描述');
					this.$warn('请填写完整信息');
          return;
        }
          if (!this.popup.popTxt.descriptionEx) {
//        this.$warn('请填写故障描述');
              this.$warn('请填写完整信息');
              return;
          }
          if (!this.popup.popTxt.sumEffect) {
//        this.$warn('请填写故障描述');
              this.$warn('请填写完整信息');
              return;
          }
        let params = new FormData();
        params.append("token",this.$getToken())
        params.append("priperty", this.popup.popTxt.priperty2);	//故障等级
        params.append("relationUser", this.popup.popTxt.relationUser);	//故障分析人员
        params.append("description", this.popup.popTxt.description);//故障描述
        params.append("descriptionEx", this.popup.popTxt.descriptionEx);//故障复盘分析
        params.append("sumEffect", this.popup.popTxt.sumEffect);//交易量影响
        params.append("type", 1);//类型
        params.append("id",this.popup.popTxt.id);//问题ID
        params.append("userId", this.popup.fppeople);//分配人id
		params.append("attachmentId", JSON.stringify(this.popup.popTxt.fileList));
        this.$axios.post("/fault/submit", params).then((res) => {
          let data = res.data;
          if (data.code == 200) {
            this.$success("操作成功！");
            this.errorVisible = false;
            this.clearAddData();
            this.loadData();
            this.assign.checkList = [];//初始化选中的数据
          }
        });
      },
      //控制台切换
      tabClick(val){
        this.calculateTabsHeight();
    },
      closeDialog(){
            this.assign.assignvisible = false;//分配任务的弹窗
            this.split.splitaddvisible = false;//拆分任务添加人员的弹窗
        },
     //清除新增新增的表单
      clearAddData(){
        for (let i in this.popup.popTxt) {
            this.popup.popTxt[i] = "";
        }
        for (let i in this.operate.operateTxt) {
            this.operate.operateTxt[i] = "";
        }
        let len=this.operate.systemAll.length-1
        for (let i of this.operate.systemAll) {
            i.csty=''
        }
        this.operate.systemAll.splice(0,len)
        this.operate.system='';
        this.tabs.downName=''
    },
      //添加系统
      addsubStystem(index, e){
        let type = e.target.className
        if (type == "el-icon-plus") {
          if (!this.operate.systemAll[index].csty) {
            this.$warn("请先选择子系统");
            return
          }
          this.operate.systemAll.push({"fsty": "", "csty": ""});
        } else {
          this.operate.systemAll.splice(index, 1)
        }
      },
      setConsoleVisible(){
        this.clearAddData()
        this.tabs.consoleWrapperVisible = false;
        this.calculateTableHeight(false)
      },
      //驳回 确认操作
      consoleActionEvent(val, f){
        if (val == '确认') {
       if (!this.operate.operateTxt.reasonValue) {
//          this.$warn("请填写成因")
           this.$warn('请填写完整信息');
            return
          }
          if (!this.operate.operateTxt.effectScope) {
//          this.$warn("请填写影响范围")
              this.$warn('请填写完整信息');
            return
          }
            if (!this.operate.operateTxt.solution) {
//          this.$warn("请填写影响范围")
                this.$warn('请填写完整信息');
                return
            }
          let nameArr = []
          let idArr = []
          for (let i of this.operate.systemAll) {
            let idTxt = i.csty.split(",")[0];//子系统id
            if (idArr.indexOf(idTxt) == -1) {
              idArr.push(i.csty.split(",")[0])
              nameArr.push(i.csty.split(",")[1])
            }
            else {
              this.$warn('请选择不同的子系统')
              return
            }
          }
          if (idArr[0] == '') {
            this.$warn('请选择子系统')
            return
          }
         /* if (!this.operate.solution) {
//          this.$warn("请填写解决方案")
						this.$warn('请填写完整信息');
            return
          }*/
          let params = new URLSearchParams();
          params.append("id", this.tabs.form.id);	//id
          params.append("reason", this.operate.operateTxt.reasonValue);	//成因
          params.append("effectScope", this.operate.operateTxt.effectScope);	//影响范围
          params.append("solution", this.operate.operateTxt.solution);//解决方案
          params.append("systemTypeId", idArr);//子系统id
          params.append("systemType", nameArr);//子系统名称
          params.append("type", 1);//子系统id
          this.$axios.post("/fault/audit", params).then((res) => {
            if (res.status == 200) {
              this.$success("操作成功！");
                this.operate.status='已完成'
//                this.operate.id='已完成'
              this.errorVisible = false;
              this.loadData();
            }
          })
        }
        if (val == '驳回') {
          let params = new URLSearchParams();
          params.append("id", this.tabs.form.id);
          this.$axios.post("/fault/reject", params).then((res) => {
            if (res.status == 200) {
              this.$success("操作成功！");
              this.errorVisible = false;
              this.operate.status='已驳回'
//                this.operate.id='已驳回'
              this.clearAddData();
              this.loadData();
            }
            else {
              this.warn(data.message);
            }
          })
        }

      },
      //返回
      backPage(val){
        this.loadData();
        this.clearAddData();
        this.errorVisible = false
      }
    }
  }
</script>
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
    display: inline-block;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    cursor: pointer;
    vertical-align: middle;
    /*margin-left:10px;*/
  }

  .col-div {
    position: relative;
  }

  .infoDiv {
    position: absolute;
    top: 1px;
    left: 10px;

  }
  .tab-opt{
    display: inline-block;
    width: 90px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
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
</style>
