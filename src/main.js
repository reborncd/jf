﻿import Vue from 'vue'
import ElementUI from 'element-ui'
import './static/css/common.css'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import  "./static/css/iconfont.css"
import App from './App.vue'
import router from "./router.js";
import axios from "axios";
import echarts from  'echarts'

Vue.use(ElementUI);
Vue.config.productionTip = false;
//----------------------------------------------------
//路由跳转
//----------------------------------------------------
Vue.prototype.$go = function (route, query, params,name) {
    this.$router.push({"name":name,'path': route, "query": query, "params": params});
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
Vue.prototype.confirm = function (msg, success, cancel, btn) {
    this.$confirm(msg, '提示', {
        confirmButtonText: btn ? btn[0] : "确定",
        cancelButtonText: btn ? btn[1] : '取消',
        lockScroll: false,
        type: 'warning'
    }).then(() => {
        success()
    }).catch(() => {
        cancel ? cancel() : ""
    });
};
Vue.prototype.prompt = function (title, msg, success, cancel) {
    this.$prompt(msg, title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
    }).then(({value}) => {
        success({value})
    }).catch(() => {
        cancel()
    });
};
//数组去重
Vue.prototype.$unique = (arr) => {
    let res = [];
    let json = {};
    for (let i = 0; i < arr.length; i++) {
        if (!json[arr[i]]) {
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
Vue.prototype.$echarts = echarts;
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
        "mouth": mouth < 10 ? "0" + mouth : mouth,
        "day": day < 10 ? "0" + day : day,
        "hour": hour < 10 ? "0" + day : day,
        "min": min < 10 ? "0" + day : day,
        "second": second < 10 ? "0" + day : day,
    }
};
//---------------------------------------------------
// axios配置------------------------------------------
//----------------------------------------------------
let instance = axios.create({
    //baseURL: "http://172.16.3.95:8080/JiFu_Project",//薛
    //baseURL: "http://172.16.1.200:8080/JiFu_Project",//安
    //baseURL:"http://172.16.2.124:8082",//欧
    //baseURL: "http://172.16.2.8:8989/JiFu_Project",//康
    baseURL:"http://192.168.1.106:8080",
    //baseURL:"http://192.168.1.179:8082",
    //baseURL:"http://127.0.0.1:8082",
    //baseURL:"http://192.180.4.150:8082",
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    }
});
instance.defaults.withCredentials = true;
//请求拦截器
instance.interceptors.request.use(function (config) {
    // 每次请求都添加一个token
    if (config.method == "post" && localStorage.getItem("token") &&
        config.data.constructor.name == "URLSearchParams") {
        let token = localStorage.getItem("token");
        // config.data+="&token="+"1234";
        config.data += `&token=${token}`;
    }
    return config;
}, function (err) {
    Vue.prototype.$warn("网络异常，请稍后再试");
    Vue.prototype.$maskoff();
});

//下载拦截器
const downloadUrl = (url) => {
    let iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = url;
    iframe.onload = function () {
        document.body.removeChild(iframe)
    };
    document.body.appendChild(iframe)
};
//响应拦截器
instance.interceptors.response.use(function (response) {
    //下载拦截
    if (response.headers && (response.headers['content-type'] === 'application/x-msdownload'
        || response.headers['content-type'] === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        || response.headers['content-type'] === 'application/octet-stream;charset=UTF-8')) {
        downloadUrl(response.request.responseURL);
        return
    }

    //验证token是否失效
    if (response.data.token) {
        console.log(response.data.token);
        Vue.prototype.$warn("登录失效，请重新登陆");
        Vue.prototype.$goLogin();
        Vue.prototype.$maskoff();
    }
    if (response.data.code == 205) {
        Vue.prototype.$warn(response.data.message);
        Vue.prototype.$maskoff();
    }
    console.log(response.data.code);
    if (response.data.code == 210) {
        Vue.prototype.$warn("您当前无权限操作，请重新登录尝试");
        Vue.prototype.$maskoff();
    }
    return response;
}, function (error) {
    Vue.prototype.$warn("网络异常，请稍后再试");
    Vue.prototype.$maskoff();
});
Vue.prototype.$axios = instance;

//--------正则匹配
Vue.prototype.$reg = {
        "email": /^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i,
        "en": /[a-zA-Z]/,
        "cn": /[\u4e00-\u9fa5]/,
        "number": /^[0-9]*$/,
        "phone": /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/,
        "en_num": /^[A-Za-z0-9]+$/,
};
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    render: function (c) {
        return c(App)
    },
});