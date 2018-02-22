<style scoped>
    .form {
        width: 600px;
        padding-top: 50px;
    }

    .form>>>input{
        width: 350px;
        /*margin-right: 10px;*/
    }

    .form .is-disabled {
        width: auto;
    }

    .form #upload {
        position: absolute;
        left: 0;
        top: 6px;
        width: 80px;
        height: 32px;
        opacity: 0;
    }

    .reset-wrap {
        width: 430px;
        text-align: center;
    }

    .reset-wrap button {
        margin: 0 15px
    }
    .two>>>input{
        width: auto;
    }

</style>

<template>
    <div>
        <div class="form" v-if="userInfo">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="用户名称">
                    <el-input v-model="form.account" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input v-model="form.phone" :disabled="true"></el-input>
                    <el-button @click.prevent="changePhone">修改手机号码</el-button>
                </el-form-item>
                <el-form-item label="所属部门">
                    <el-input v-model="form.department.dept_name" :disabled="form.departmentAble"></el-input>
                </el-form-item>
                <el-form-item label="个人职务">
                    <el-input v-model="form.department.dept_name" :disabled="form.departmentAble"></el-input>
                </el-form-item>
                <el-form-item label="开发语言">
                    <el-input v-model="form.department.dept_name" :disabled="form.departmentAble"></el-input>
                </el-form-item>
                <el-form-item label="在职时间">
                    <el-input v-model="form.department.dept_name" :disabled="form.departmentAble"></el-input>
                </el-form-item>
                <el-form-item label="直属上级" class="two">

                </el-form-item>

                <!--<el-form-item label="所属部门">-->
                <!--<el-input v-model="form.department" :disabled="form.departmentAble"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="个人职务">-->
                <!--<el-input v-model="form.position" :disabled="form.positionAble"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="上传头像">-->
                <!--<el-button size="small" type="primary">点击上传</el-button>-->
                <!--<input type="file" id="upload">-->
                <!--</el-form-item>-->
                <el-form-item>
                    <el-button type="primary" @click="">操作日志</el-button>
                    <el-button>返回</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div v-if="resetPhone">
            <div class="form ">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="用户名称">
                        <el-input v-model="form.account" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="登陆密码">
                        <el-input v-model="reset.password" :disabled="false" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="新手机号">
                        <el-input v-model="reset.phone" :disabled="false"></el-input>
                    </el-form-item>
                </el-form>
                <div class="reset-wrap">
                    <el-button type="primary" @click="resetSub">确定</el-button>
                    <el-button @click="back">返回</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted(){
            let params = new URLSearchParams();
            this.$axios.post('/user/userMessage', params).then((res) => {
                let data = res.data;
                if (data.result == 1) {
                    this.form.name = data.user.user_NAME;
                    this.form.account = data.user.user_ACCOUNT;
                    this.form.phone = data.user.user_PHONE;
                    this.form.department = data.user.dept ? data.user.dept : "";
                    this.form.roles = data.user.roles.length > 0 ? data.user.roles : "";
                    this.form.roles_value = data.user.roles[0].role_NAME
                }
            })
        },
        data(){
            return {
                resetPhone: false,
                userInfo: true,
                form: {
                    account: '',
                    name: '',
                    phone: '',
                    department: '',
                    roles: '',
                    departmentAble: true,
                    positionAble: false,
                    roles_value: ""
                },
                reset: {
                    password: "",
                    phone: ""
                }

            }
        },
        methods: {
            changePhone(){
                this.resetPhone = !this.resetPhone;
                this.userInfo = !this.userInfo;
                this.reset.password = "";
                this.reset.phone = "";
            },
            back(){
                this.changePhone()
            },
            resetSub(){
                let reg = {
                    phone: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
                    password: /^[A-Za-z0-9]+$/,
                };
                let params = new URLSearchParams();
                params.append('oldPwd', this.reset.password);
                params.append('newPhone', this.reset.phone);
                if (this.reset.password == "") {
                    this.$warn("请输入密码");
                    return
                }
                if (this.reset.phone == "") {
                    this.$warn("请输入手机号码");
                    return
                }
                if (!reg.password.test(this.reset.password)) {
                    this.$warn("密码格式有误");
                    return
                }
                if (!reg.phone.test(this.reset.phone)) {
                    this.$warn("手机格式有误");
                    return
                }
                this.$axios.post("/user/updatePhone", params).then((res) => {
                    let data = res.data;
                    if (data.result == 1) {
                        this.alert("修改成功", () => {
                            this.back()
                        })
                    } else if (data.result == 0) {
                        this.$warn(data.message);
                    }
                })
            }
        }
    }
</script>