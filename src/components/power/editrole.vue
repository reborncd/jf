<style scoped>
    .option-content {
        padding-left: 15px;
    }

    .option-wrap.info {
        width: 445px;
    }

    .option-wrap .option-title {
        padding-left: 15px;
        position: relative;
        margin-bottom: 15px;
    }

    .option-title i {
        position: absolute;
        left: 4px;
        top: 11px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #ccc;
    }

    .option-title span {
        font-size: 18px;
        font-weight: 400;
    }

    .option-content .subtitle {
        color: #999999;
        margin-bottom: 15px;
    }

    .option-content .label-content {
        width: 570px;
    }

    .option-content .label-content:after {
        content: '';
        display: block;
        clear: both;
    }

    .option-content .el-checkbox {
        float: left;
        width: 190px;
        margin: 0 0 10px;
    }

    .btn-wrap {
        text-align: center;
    }

    /*.btn-wrap button {*/
    /*margin: 14px;*/
    /*width: 200px;*/
    /*height: 40px;*/
    /*}*/

    .el-form-item {
        margin-bottom: 10px;
    }

    /*选择框的样式*/
    .tree-wrapper {
        float: left;
        width: 49%;
        margin-right: 1%;
        border: 1px solid #ccc;
        padding: 10px;
        overflow-y: auto;
    }

    .tree-wrapper label {
        display: block;
        margin: 3px 0;
    }
</style>

<template>
    <div class="editrole common-card-wrap" style="height: 100%;">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="card-title">{{title}}</span>
            </div>
            <div class="text item">
                <div class="option-wrap info">
                    <h5 class="option-title"><i></i><span>基本信息</span></h5>
                    <div class="option-content">
                        <el-form label-width="100px" label-position="left">
                            <el-form-item label="所属部门">
                                <el-select clearable v-model="role_dept" style="width: 100%" placeholder="请选择部门"
                                           @change="deptChange">
                                    <el-option v-for="item in role_arr" :label="item.dept_name"
                                               :value="item.dept_id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="已存在角色">
                                <el-select clearable v-model="a" style="width: 100%" placeholder="请选择部门">
                                    <el-option v-for="item in live_arr" :label="item.role_NAME"
                                               :value="item.role_ID"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="角色名称">
                                <el-input v-model="role_name" placeholder="请填写角色名称"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <div class="option-wrap">
                    <h5 class="option-title"><i></i><span>权限配置</span></h5>
                    <div class="clear">
                        <div class="tree-wrapper lefttreewarp">
                            <el-checkbox v-model="leftcheckAll" @change="leftcheckAllEvent">全选</el-checkbox>
                            <el-tree
                                    :data="left"
                                    show-checkbox
                                    default-expand-all
                                    node-key="menu_id"
                                    ref="lefttree"
                                    highlight-current
                                    :expand-on-click-node="expand"
                                    @node-click="leftclick"
                                    @check-change="leftchange">
                            </el-tree>
                        </div>
                        <div class="tree-wrapper middletreewarp">
                            <el-checkbox v-model="middlecheckAll" @change="middlecheckAllEvent">全选</el-checkbox>
                            <el-tree
                                    :data="middleData"
                                    show-checkbox
                                    default-expand-all
                                    node-key="menu_id"
                                    ref="middletree"
                                    highlight-current
                                    @node-click="middleclick"
                                    @check-change="middlechange">
                            </el-tree>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btn-wrap" style="margin-top: 20px;">
                <el-button type="primary" size="mini" @click="submit">提交</el-button>
                <el-button type="danger" size="mini">返回</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                a: "",//无意义
                title: "",//区分编辑和新增的标题
                role_name: "",//角色名称
                role_dept: "",//选择的部门的ID
                role_arr: "",//部门的数组
                live_arr: "",//展示已有角色的数组
                left: [],//左侧的所有数据
                middle: [],//中间放的数组，包括选中的
                leftSubData: [],//提交的左侧树形菜单
                leftAllLength: 0,//左侧菜单的总共长度
                middleData: [],//中间的数据，存放选中的操作
                leftcheckAll: false,//左边全选状态
                middlecheckAll: false,//中间全选状态
                expand: false,///树形左侧点中禁用展开操作
                leftActiveData: "",//树形左侧点中的数据
            }
        },
        created(){
            if (this.$route.query && this.$route.query.id) {
                //当前是编辑操作
                this.title = "编辑角色";
            } else {
                this.title = "新增角色";
            }
        },
        mounted(){
            this.calculate();
            this.loadData();
        },
        methods: {
            calculate(){
                let height = document.querySelector(".mainr").offsetHeight;
                let card_header_height = document.querySelector(".el-card__header").offsetHeight;
                let card_body = document.querySelector(".box-card .el-card__body");
                let treeWrap = document.querySelectorAll(".tree-wrapper");
                card_body.style.height = height - 36 - card_header_height + "px";
                for (let i of treeWrap) {
                    i.style.height = height - 36 - card_header_height - 20 - 132 - 10 - 39 - 48 - 52 + "px";
                }
            },
            loadData(){
                this.$maskin();
                let params = new URLSearchParams();
                let roleId = this.$route.query.id;
                if (roleId) {
                    params.append("ROLE_ID", roleId)
                }
                this.$axios.post("role/queryRoleMenu", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        //加载所属部门
                        this.role_arr = data.result.deptRoles;
                        let arr = [];
                        for (let i of data.result.rootMenu) {
                            let fobj = {
                                "label": i.menu_name,
                                "menu_id": i.menu_id,
                                "children": [],
                                "action": []
                            };
                            if (roleId) {
                                //判断左侧选择的数据
                                // （如果任何一个子项被选中就会带上上级menu_id，所以在此判断去除掉上级id的干扰，因为如果带上上级id则子项就会被全部选中）
                                for (let j of data.result.menus) {
                                    if (j == i.menu_id) {
                                        let _index = data.result.menus.indexOf(i.menu_id);
                                        data.result.menus.splice(_index, 1)
                                    }
                                }
                            }
                            this.leftAllLength++;
                            if (i.childMenus) {
                                //如果当下有子菜单
                                for (let j of i.childMenus) {
                                    let obj = {
                                        "label": j.menu_name,
                                        "fmenu_id": i.menu_id,
                                        "menu_id": j.menu_id,
                                        "menu_sign": j.menu_sign,
                                        "childMenus": j.childMenus
                                    };
                                    if (j.menu_action != 0) {
                                        //当前的子内容是代表页面，放入left的children做展示
                                        fobj.children.push(obj);
                                        this.leftAllLength++;
                                    } else {
                                        //当前的子内容是代表操作，放入left中作为middle的展示内容
                                        fobj.action.push(obj)
                                    }
                                }
                            }
                            arr.push(fobj)
                        }
                        this.left = arr;
                        //当前是编辑操作，将选中的值放入this.middle中
                        if (roleId) {
                            //当前是编辑回显选择部门操作
                            this.role_dept = data.result.role.DEPT_ID;
                            this.deptChange();
                            this.role_name = data.result.role.ROLE_NAME;
                            //加载左侧被选中
                            this.$refs.lefttree.setCheckedKeys(data.result.menus);
                            //加载右侧回显数据
                            //我都不知道该怎么写注释，有疑问请联系我
                            let middlearr = [];
                            for (let i of this.left) {
                                let loop_arr = [];
                                let middleobj = {
                                    "arr": [],
                                    "keys": []
                                };
                                if (i.children.length) {
                                    loop_arr = i.children
                                } else {
                                    loop_arr = i.action
                                }
                                for (let j of loop_arr) {
                                    if (j.childMenus) {
                                        for (let m of j.childMenus) {
                                            let obj = {
                                                "label": m.menu_name,
                                                "menu_id": m.menu_id,
                                                "fmenu_id": j.menu_id,
                                            }
                                            if (m.menu_sign) {
                                                middleobj.keys.push(m.menu_id)
                                            }
                                            middleobj.arr.push(obj)
                                        }
                                    }
                                    if (j.menu_sign) {
                                        middlearr[j.menu_id] = middleobj
                                    }
                                }
                            }
                            this.middle = middlearr;
                        }
                        this.$maskoff();
                    }
                })
            },
            deptChange(){
                for (let i of this.role_arr) {
                    if (i.dept_id == this.role_dept) {
                        this.$set(this, "live_arr", i.roles)
                    }
                }
            },
            leftclick(val){
                //左侧点击事件
                this.middlecheckAll = false;//置空全选
                this.leftActiveData = val;//选中时记录下当前选中的左侧
                this.middleData = [];//清空右侧
                this.$refs.middletree.setCheckedKeys([]);//清空右侧选择的数据
                //点击事件当点击父级时也会触发，会出现父级没有页面和父级有页面情况
                let fobj = {
                    "arr": [],
                    "keys": []
                };
                if (val.fmenu_id && val.childMenus) {
                    //当前点击的是二级页面，应该只出现操作按钮
                    for (let i of val.childMenus) {
                        let obj = {
                            "label": i.menu_name,
                            "menu_id": i.menu_id,
                            "fmenu_id": val.menu_id
                        };
                        fobj.arr.push(obj)
                    }
                } else if (val.action && !val.children.length) {
                    //当前是父级菜单且没有子页面,只有操作
                    for (let i of val.action) {
                        let obj = {
                            "label": i.label,
                            "menu_id": i.menu_id,
                            "fmenu_id": val.menu_id
                        };
                        fobj.arr.push(obj)
                    }
                }
                //共有的操作
                if (!this.middle[val.menu_id]) {
                    //如果之前没有点击过此项，将其添加进入middle中，key为自己的id，
                    this.$set(this.middle, val.menu_id, fobj)
                } else {
                    //之前已经点则做回显,取回之前记录的点击key并设置
                    let c = this.middle[val.menu_id].keys;
                    this.$refs.middletree.setCheckedKeys(c);
                }
                //设置middle的临时展示数据
                this.middleData = this.middle[val.menu_id].arr;
            },
            leftchange(val, status){
                //左侧选中事件
                if (!status && this.middle[val.menu_id]) {
                    //取消了当前的权限
                    this.$set(this.middle[val.menu_id], "keys", []);//从数组中去除
                    this.$refs.middletree.setCheckedKeys([]);//右侧设置为空
                }
                this.leftSubData = this.$refs.lefttree.getCheckedKeys();//设置左侧菜单
                this.leftAllLength == this.leftSubData ?
                    this.leftcheckAll = true : this.leftcheckAll = false

            },
            leftcheckAllEvent(){
                if (this.leftcheckAll) {
                    //全选中
                    let arr = [];
                    for (let i of this.left) {
                        arr.push(i.menu_id);
                        for (let j of i.children) {
                            arr.push(j.menu_id)
                        }
                    }
                    this.leftSubData = arr;
                    this.$refs.lefttree.setCheckedKeys(arr);
                } else {
                    //非全选
                    this.leftSubData = [];
                    this.$refs.lefttree.setCheckedKeys([]);
                }
            },
            middleclick(){

            },
            middlechange(val, status){
                //每次点击都获取一遍右边的选中项并设置到key中
                let c = this.$refs.middletree.getCheckedKeys();
                this.$set(this.middle[val.fmenu_id], "keys", c);
                //全选按钮的选中与否
                if (this.leftActiveData.action) {
                    c.length == this.leftActiveData.action.length ?
                        this.middlecheckAll = true : this.middlecheckAll = false;
                } else {
                    c.length == this.leftActiveData.childMenus.length ?
                        this.middlecheckAll = true : this.middlecheckAll = false;
                }

                //如果点击的时候左边未被先选中则需要选中且要先拉一边左边选中的再添加进去
                let lc = this.$refs.lefttree.getCheckedKeys();
                if (lc.indexOf(val.fmenu_id) < 0) {
                    lc.push(val.fmenu_id);
                }
                this.$refs.lefttree.setCheckedKeys(lc);
            },
            middlecheckAllEvent(e){
                if (this.middlecheckAll) {
                    //当前是选中状态
                    if (this.leftActiveData) {
                        let forEachArr = this.leftActiveData.action ? this.leftActiveData.action : this.leftActiveData.childMenus;
                        let arr = [];
                        for (let i of forEachArr) {
                            arr.push(i.menu_id);
                        }
                        this.$refs.middletree.setCheckedKeys(arr);//设置所有选中状态
                    }
                } else {
                    //当前是取消全选状态
                    this.$refs.middletree.setCheckedKeys([]);
                }

            },
            submit(){
                let ROLE_NAME = this.role_name;
                let DEPT_ID = this.role_dept;
                if (!ROLE_NAME) {
                    this.$warn("请填写角色名称");
                    return;
                }
                if (!DEPT_ID) {
                    this.$warn("请选择所属部门");
                    return;
                }
                let middle = [];
                for (let i of this.middle) {
                    if (i) {
                        for (let j of i.keys) {
                            middle.push(j)
                        }
                    }
                }
                let left = [];
                for (let i of this.left) {
                    for (let j of this.leftSubData) {
                        if (j == i.menu_id) {
                            left.push(j)
                        } else {
                            for (let l of i.children) {
                                if (j == l.menu_id) {
                                    left.push(l.fmenu_id)
                                    left.push(l.menu_id)
                                }
                            }
                        }
                    }
                }
                let m = this.$unique(middle);
                let l = this.$unique(left);
                let params = new URLSearchParams();
                params.append("ROLE_NAME", ROLE_NAME);
                params.append("DEPT_ID", DEPT_ID);
                params.append("menus", m.concat(l));
                this.$axios.post("/role/addRole", params).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$success("操作成功！");
                        this.$back()
                    }
                })
            }
        }
    }
</script>