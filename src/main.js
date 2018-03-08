import Vue from 'vue'
import ElementUI from 'element-ui'
import './static/css/common.css'
import '../element-ui/lib/theme-chalk/index.css'
import  "./static/css/iconfont.css"
import App from './App.vue'
import router from "./router.js";
import axios from "axios";
// import echarts from  'echarts'

Vue.use(ElementUI);
Vue.config.productionTip = false;
//----------------------------------------------------
//路由跳转
//----------------------------------------------------
Vue.prototype.$go = function (route,params) {
    this.$router.push({'path': route,"query":params})
};
Vue.prototype.$back = function (route) {
    this.$router.go(-1)
};

//验证token返回登录----------------------------------------------------
Vue.prototype.$goLogin = function () {
    this.alert("登录失效，请重新登录");
    setTimeout(() => {
        this.$go("/login")
    }, 2000)
};
//----------------------------------------------------
//定义弹窗----------------------------------------------------
//----------------------------------------------------
Vue.prototype.alert = function (msg, callback, option) {
    if (option) {
        this.$alert(msg, '提示', {
            confirmButtonText: '确定',
            lockScroll: false,
            callback: callback ? callback() : "",
            option
        });
    } else {
        this.$alert(msg, '提示', {
            confirmButtonText: '确定',
            lockScroll: false,
            callback: callback ? callback() : "",
        });
    }
};
Vue.prototype.confirm = function (msg, success, cancel) {
    this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        lockScroll: false,
        type: 'warning'
    }).then(() => {
        success()
    }).catch(() => {
        cancel?cancel():""
    });
};
Vue.prototype.prompt = function (title,msg,success,cancel) {
    this.$prompt(msg, title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
    }).then(({ value }) => {
      success({ value })
    }).catch(() => {
        cancel()
    });
};
//数组去重
Vue.prototype.$unique = (arr)=>{
    let res = [];
    let json = {};
    for(let i = 0; i < arr.length; i++){
        if(!json[arr[i]]){
            res.push(arr[i]);
            json[arr[i]] = 1;
        }
    }
    return res;
};
Vue.prototype.$success = function (msg) {
    this.$message({
        message: msg,
        type: 'success'
    });
};
Vue.prototype.$warn = function (msg) {
    this.$message({
        message: msg,
        type: 'warning'
    });
};
Vue.prototype.$err = function (msg) {
    this.$message.error(msg);
};
//----------------------------------------------------
//使用echarts----------------------------------------------------
//----------------------------------------------------
// Vue.prototype.$echarts = echarts;
//----------------------------------------------------
//蒙版
//----------------------------------------------------
Vue.prototype.$maskin = (type) => {
    let mask = document.getElementById("mask");
    let load = document.getElementById("loading");
    mask.style.display = "block";
    // if(type){
    load.style.display = "block";
    // }
};
Vue.prototype.$maskoff = () => {
    let mask = document.getElementById("mask");
    let load = document.getElementById("loading");
    mask.style.display = "none";
    load.style.display = "none"
};
//日期格式化----------------------------------------------------
Vue.prototype.$format = (time) => {
    let date = new Date(time);
    let year = date.getFullYear();
    let mouth = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();
    let second = date.getSeconds();
    return {
        "year": year,
        "mouth": mouth,
        "day": day.length == 1 ? "0" + day : day,
        "hour": hour.length == 1 ? "0" + day : day,
        "min": min.length == 1 ? "0" + day : day,
        "second": second.length == 1 ? "0" + day : day,
    }
};
//---------------------------------------------------
// axios配置------------------------------------------
//----------------------------------------------------
let instance = axios.create({
	baseURL:"http://irany.free.ngrok.cc",
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    }
});
instance.defaults.withCredentials = true;
//请求拦截器
instance.interceptors.request.use(function (config) {
    // 每次请求都添加一个token
    if(localStorage.getItem("token") && config.data.constructor.name == "URLSearchParams"){
        let token = localStorage.getItem("token");
        // config.data+="&token="+"1234";
        config.data+=`&token=${token}`;
    }
    return config;
}, function (err) {
    return Promise.reject(err);
});
//响应拦截器
instance.interceptors.response.use(function (response) {
//     //验证token是否失效
//     if(response.data.token){
//         Vue.prototype.$goLogin();
//         return;
//     }else
if(response.data.code !=200){
        Vue.prototype.$warn(response.data.message);
        Vue.prototype.$maskoff()
    }
    return response;
// }, function (error) {
//     // 对响应错误做点什么
//     return Promise.reject(error);
});
//搜索功能
Vue.prototype.$axios = instance;
Vue.prototype.$needsStatus =  (status)=>{
    let result = "";
    switch (status){
        case 301:
            result = "已提交";
            break;
        case 302:
            result = "已撤回";
            break;
        case 303:
            result = "待技术管理部审核";
            break;
        case 304:
            result = "被驳回";
            break;
        case 305:
            result = "待技术经理审核";
            break;
        case 306:
            result = "待开发";
            break;
        case 307:
            result = "开发中";
            break;
        case 308:
            result = "待测试";
            break;
        case 309:
            result = "测试中";
            break;
        case 310:
            result = "待验收";
            break;
        case 311:
            result = "已验收";
            break;
        case 312:
            result = "待上线";
            break;
        case 313:
            result = "已上线";
            break;
        case 314:
            result = "已变更需求";
            break;
        case 317:
            result = "被技术管理部驳回";
            break;
    }
};
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    render: function (c) {
        return c(App)
    },
});