import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
let option = {
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/login'
        }, {
            path: '/login',
            component: resolve => require(['./components/account/login.vue'], resolve)
        }, {
            path: '/register',
            component: resolve => require(['./components/account/register.vue'], resolve)
        }, {
            path: '/backpassword',
            component: resolve => require(['./components/account/backPassword.vue'], resolve)
        }, {
            path: '/add',
            component: resolve => require(['./components/add.vue'], resolve)
        },{
            path: '/home',
            component: resolve => require(['./components/home/home.vue'], resolve),
            children: [
                {
                    path: '/',
                    redirect: 'index'
                },
                {
                    path: 'resetPassword',
                    component: resolve => require(['./components/account/resetPassword.vue'], resolve)
                }, {
                    path: 'userCenter',
                    component: resolve => require(['./components/account/userCenter.vue'], resolve)
                }, {
                    path: 'index',
                    component: resolve => require(['./components/home/homeIndex.vue'], resolve)
                },{
                    path: 'workreport',
                    component: resolve => require(['./components/needs/workreport.vue'], resolve)
                },{
                    path: 'addrole',
                    component: resolve => require(['./components/power/editrole.vue'], resolve),
                },{
                    path: 'editrole',
                    component: resolve => require(['./components/power/editrole.vue'], resolve),
                },{
                    path: 'rolemanage',
                    name:"角色管理",
                    component: resolve => require(['./components/power/rolemanage.vue'], resolve)
                },{
                    path: 'rolelist',
                    name:"人员配置",
                    component: resolve => require(['./components/power/rolelist.vue'], resolve)
                },{
                    path: 'power',
                    component: resolve => require(['./components/power/power.vue'], resolve)
                },{
                    path: 'deptlist',
                    name:"部门编辑",
                    component: resolve => require(['./components/power/deptlist.vue'], resolve)
                },{
                    path: 'log',
                    component: resolve => require(['./components/account/log.vue'], resolve)
                },{
                    path: 'ywxq',
                    name:"业务需求",
                    component: resolve => require(['./components/needs/ywxq/ywxq.vue'], resolve)
                },{
                    path: 'jsxq',
                    name:"技术需求",
                    component: resolve => require(['./components/needs/jsxq/jsxq.vue'], resolve)
                },{
                    path: 'jcjs',
                    name:"基础建设",
                    component: resolve => require(['./components/needs/jcjs/jcjs.vue'], resolve)
                },{
                    path: 'rcrw',
                    name:"日常任务",
                    component: resolve => require(['./components/needs/jcjs/jcjs.vue'], resolve)
                },{
                    path: 'errorlist',
                    name:"故障列表",
                    component: resolve => require(['./components/problem/errorlist.vue'], resolve)
                },{
                    path: 'buglist',
                    name:"BUG列表",
                    component: resolve => require(['./components/problem/buglist.vue'], resolve)
                },{
                    path: "online",
                    name:"上线管理",
                    component: resolve => require(['./components/online/online.vue'], resolve)
                },{
                    path: "flow",
                    component: resolve => require(['./components/flow/flow.vue'], resolve)
                },{
                    path: "zlk",
                    name:"资料库",
                    component: resolve => require(['./components/zlk/zlk.vue'], resolve)
                }
            ]
        }, {
            path: '/test',
            component: resolve => require(['./components/test.vue'], resolve)
        }

    ]
};
let router = new Router(option);
router.beforeEach((to, from, next) => {
    localStorage.setItem("ACTIVEMENU","");
    if(to.name){
        localStorage.setItem("ACTIVEMENU",to.name);
    }
    next();
//     console.log(next)
//     let type = localStorage.getItem("TYPE");
//     let token = localStorage.getItem("token");
    // if (token) {
    //     switch (type) {
    //         case "REMEMBER":
    //             next();
    //             break;
    //         case "AUTO":
    //             next({'path': "/home"});
    //             break;
    //         case "":
    //             next();
    //             break;
    //         default:
    //             next();
    //             break;
    //     }
    // } else {
    //     next()
    // }
});
export default router;