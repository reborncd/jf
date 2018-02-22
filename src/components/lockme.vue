<style scoped>
    .lockme{
        position: fixed;
        left: 0;
        top:0;
        width: 100%;
        height: 100%;
        background: #1c2b36;
    }
    .wrapper{
        position: absolute;
        left:0;
        right: 0;
        top:0;
        bottom: 0;
        margin: auto;
        width: 200px;
        height: 190px;
    }
    .wrapper img{
        display: block;
        width: 96px;
        height: 96px;
        margin: 0 auto;
        -webkit-border-radius:50%;
        -moz-border-radius:50%;
        border-radius:50%;
    }
    .wrapper p.name{
        margin: 15px 0;
        text-align: center;
        font-size:18px;
        color: #7793a7;
    }
    .action-wrap{
        position: relative
    }
    .action-wrap input,.action-wrap span{
        float: left;
    }
    .action-wrap input{
        width: 160px;
        height: 34px;
        font-size: 12px;
        color: #555;
        padding-right: 15px;
        padding-left: 15px;
        border-radius: 50px 0 0 50px;
        -webkit-border-radius: 50px 0 0 50px;
        -moz-border-radius: 50px 0 0 50px;
        background: white;
        outline: none;
        border:none;
    }
    .action-wrap span{
        position: absolute;
        right: 0;
        top:1px;
        width: 40px;
        padding-right:15px;
        height: 32px;
        line-height: 32px;
        background: #27c24c;
        cursor: pointer;
        -webkit-border-radius:0 48% 48% 0;
        -moz-border-radius:0 48% 48% 0;
        border-radius:0 48% 48% 0;
        color: white;
        text-align: right;
    }
    .action-wrap span:hover{
        background: #1faf41;
        width: 41px;
    }
    .action-wrap span i{
        -webkit-transform: rotateY(180deg);
        -moz-transform: rotateY(180deg);
        -ms-transform: rotateY(180deg);
        -o-transform: rotateY(180deg);
        transform: rotateY(180deg);
    }
</style>

<template>
    <div class="lockme">
        <div class="wrapper">
            <img :src="src" alt="头像">
            <p class="name" v-text="name"></p>
            <div class="action-wrap">
                <input v-model="password" type="password" placeholder="Enter pwd to continue">
                <span><i class="el-icon-back"></i></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                src:"http://develop.yuntianyuan.net:9010/img/a0.jpg",
                name:"your name",
                password:""
            }
        },
        methods:{

        }
    }
</script>