<style scoped>
    /*全程跟踪视图模式*/
    .tracking-wrapper li{
        margin-top:20px;
        position: relative;
        width: 20%;
    }
    .tracking-wrapper li .content{
        width: 85%;
        border:2px solid #ccc;
        text-align: center;
        line-height: 30px;
    }
    .tracking-wrapper li .content .action{
        background:#ccccff;
    }
    .tracking-wrapper li .content .action,
    .tracking-wrapper li .content .date{
        padding: 0 10px;
        border-bottom:2px solid #ccc;
    }
    .tracking-wrapper li .info-wrapper{
        height: 250px;
        overflow-y: auto;
    }
    .tracking-wrapper li .content .info{
        width:90%;
        margin: 0 auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .tracking-wrapper li .content.border-dashed{
        border:2px dashed #cecece;
    }
    .tracking-wrapper li .content.border-dashed .action,
    .tracking-wrapper li .content.border-dashed .date{
        border-bottom:2px dashed #ccc;
    }
    .tracking-wrapper li .icon-wrapper{
        width: 15%;
        line-height: 300px;
        text-align: center
    }
    .tracking-wrapper li i{
        color: red;
        font-size: 25px;
        -webkit-transform: rotateY(180deg);
        -moz-transform: rotateY(180deg);
        -ms-transform: rotateY(180deg);
        -o-transform: rotateY(180deg);
        transform: rotateY(180deg);
    }
    .hover-wrap{
        position: absolute;
        left: 10px;
        top: 10px;
        width: 500px;
        padding:20px;
        background: white;
        z-index: 8888;
        border: 2px solid #f4f4f4;
        box-shadow:  0 0 10px #f4f4f4;
    }
</style>

<template>
    <div>
        <ul class="tracking-wrapper clear">
            <li class="fl clear" v-for="(item, index) in tracking.data"
                @mouseover="tracking.hoverIndex = index;" @mouseleave="tracking.hoverIndex = ''">
                <div class="content fl" :class="{'border-dashed':item.view_TYPE == 2}">
                    <p class="action">{{item.view_SUBJECT}}</p>
                    <p class="date">{{item.view_DATE}}</p>
                    <div class="info-wrapper">
                        <p class="info" v-for="_item in item.view_DESC" :title="_item">{{_item}}</p>
                    </div>
                </div>
                <div class="fl icon-wrapper"><i class="iconfont icon-right-arrow" v-if="index != tracking.data.length-1"></i></div>
                <!--<div v-if="index == tracking.hoverIndex && tracking.hoverIndex != ''" class="hover-wrap">-->
                    <!--<p  class="genzong" v-for="_item in item.infos"><span style="display: inline-block;width: 30px;">{{index+1}}.</span> {{_item}}</p>-->
                <!--</div>-->
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props:["tracking"],
        data(){
            return {

            }
        },
        methods: {

        }
    }
</script>