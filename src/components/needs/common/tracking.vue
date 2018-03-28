<style scoped>
    /*全程跟踪视图模式*/
    .tracking-wrapper li{
        margin-top:20px;
        position: relative;
        width: 25%;
    }
    .tracking-wrapper li .content{
        width: 85%;
        /* border: 2px solid #ccc; */
        text-align: center;
        line-height: 30px;
        border-radius: 5px;
        overflow: hidden;
        box-shadow: 3px 5px 14px #ccc;
    }
    .tracking-wrapper li .content .action{
        background: #404d5d;
        color: white;
    }
    .tracking-wrapper li .content .date{
        border-bottom:1px solid #ccc;
        background: #ecf5ff;
    }
    .tracking-wrapper li .info-wrapper{
        height: 100px;
        overflow-y: auto;
        background: #ecf5ff;
    }
    .tracking-wrapper li .content .info{
        width: 90%;
        margin: 0 auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 13px;
        line-height: 1;
        padding: 5px;
    }
    .tracking-wrapper li .content.border-dashed{
        border:1px dashed #cecece;
    }
    .tracking-wrapper li .icon-wrapper{
        width: 15%;
        line-height: 160px;
        text-align: center
    }
    .tracking-wrapper li i{
        color: #409eff;
        font-size: 25px;
        -webkit-transform: rotateY(180deg);
        -moz-transform: rotateY(180deg);
        -ms-transform: rotateY(180deg);
        -o-transform: rotateY(180deg);
        transform: rotateY(180deg);
    }
    .tracking-wrapper li .date{
        font-size: 13px;
        line-height: 30px;
    }
    .hover-wrap{
        position: absolute;
        left: 10px;
        top: 10px;
        width: 500px;
        padding:20px;
        background: white;
        z-index: 8888;
        border: 1px solid #f4f4f4;
        box-shadow:  0 0 10px #f4f4f4;
    }
    .tracking-wrapper li.not{
        opacity: 0.5;
    }
</style>

<template>
    <div>
        <ul class="tracking-wrapper clear">
            <li class="fl clear" v-for="(item, index) in tracking.data"
                @mouseover="tracking.hoverIndex = index;" @mouseleave="tracking.hoverIndex = ''"
                :class="{'not':item.view_TYPE == 2}">
                <div class="content fl">
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