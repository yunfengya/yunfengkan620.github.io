<template>
    <div class="contain_box">
        <!-- page start -->
        <div class="easy-layout-page">
            <!-- left start -->
            <div class="layout-left">
                <div v-for="(i, index) in list" @click="check(i.cssName)" :key="index"
                    :class="`card-box ${i.cssName} ${checkClass == i.cssName ? 'active' : ''}`">
                    {{ i.cssName }}
                </div>
            </div>
            <!-- left end -->
            <!-- left right -->
            <div class="layout-right" :class="checkClass"></div>
            <!-- left right -->
        </div>
        <!-- page end -->
    </div>
</template>

<script>
export default {
    name: "index",
    data() {
        return {
            checkClass: '',
            list: [
                {
                    label: '',
                    cssName: 'easy-bg-style1'
                }, {
                    label: '',
                    cssName: 'easy-bg-style2'
                }, {
                    label: '',
                    cssName: 'easy-bg-style3'
                }, {
                    label: '',
                    cssName: 'easy-bg-style4'
                }, {
                    label: '',
                    cssName: 'easy-bg-style5'
                }, {
                    label: '',
                    cssName: 'easy-bg-style6'
                }, {
                    label: '',
                    cssName: 'easy-bg-style7'
                }, {
                    label: '',
                    cssName: 'easy-bg-style8'
                }, {
                    label: '',
                    cssName: 'easy-bg-style9'
                }, {
                    label: '',
                    cssName: 'easy-bg-style10'
                }, {
                    label: '',
                    cssName: 'easy-bg-style11'
                }, {
                    label: '',
                    cssName: 'easy-bg-style12'
                }, {
                    label: '',
                    cssName: 'easy-bg-style13'
                }, {
                    label: '',
                    cssName: 'easy-bg-style14'
                }, {
                    label: '',
                    cssName: 'easy-bg-style15'
                }, {
                    label: '',
                    cssName: 'easy-bg-style16'
                }, {
                    label: '',
                    cssName: 'easy-bg-style17'
                }, {
                    label: '',
                    cssName: 'easy-bg-style18'
                }, {
                    label: '',
                    cssName: 'easy-bg-style19'
                }, {
                    label: '',
                    cssName: 'easy-bg-style20'
                }, {
                    label: '',
                    cssName: 'easy-bg-style21'
                }
            ]
        };
    },
    mounted() {
        this.checkClass = this.list[0].cssName
    },
    beforeDestroy() {

    },
    methods: {
        check(i) {
            this.checkClass = i
        }
    }
};
</script>

<style scoped lang="scss">
/* 容器样式 */
.contain_box {
    width: 100%;
    height: calc(100vh - 4.2rem - 6.7rem);
    /* 视口的高度减去顶部的导航栏高度 */
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;

    /* 外框样式 */
    // css start ----------------------------------
    .easy-layout-page {
        display: flex;
        width: 100%;
        height: 100%;

        * {
            box-sizing: border-box;
            flex-shrink: 0;
        }

        .layout-left {
            width: 180px;
            height: 100%;
            flex-shrink: 0;
            padding: 10px;
            background: #18212d;
            overflow: auto;

            .active {
                border: 1px solid #00cdff !important;
                color: #00cdff !important;
                box-shadow: 0px 2px 8px rgba(#00cdff, 0.5);
            }

            .card-box {
                // width: 100%;
                width: 120%;
                height: 70px;
                border: 1px solid #2f3742;
                margin-bottom: 15px;
                border-radius: 5px;
                cursor: pointer;
                line-height: 70px;
                text-align: center;
                color: #9daeba;
                font-size: 12px;
            }

            /* 自定义滚动条样式css  */
            &::-webkit-scrollbar {
                width: 8px;//竖向滚动条的宽度
                height: 8px;//横向滚动条的高度
            }

            &::-webkit-scrollbar-track {
                background: #24978d;
                border-radius: 1px;
                border-right: 1px solid #2f3742;
            }

            &::-webkit-scrollbar-thumb {
                background: #3af1e2;
                border-radius: 2px;
            }
            //去除xy轴交叉色
            &::-webkit-scrollbar-corner {
                background-color: transparent;
            }
        }

        .layout-right {
            width: 0px;
            height: 100%;
            flex-grow: 1;
        }

    }

    // 背景样式1 
    .easy-bg-style1 {
        $lineColor: #022856;
        $nodeColor: #036389;
        $bgColor: #041b41;
        background: radial-gradient($nodeColor 2px, transparent 3px),
            radial-gradient($nodeColor 3px, transparent 3px),
            linear-gradient($bgColor 3px, transparent 0),
            linear-gradient(45deg, transparent 74px, transparent 75px, $lineColor 75px, $lineColor 76px, transparent 77px, transparent 109px),
            linear-gradient(-45deg, transparent 75px, transparent 76px, $lineColor 76px, $lineColor 77px, transparent 78px, transparent 109px),
            $bgColor;
        background-size: 109px 109px, 109px 109px, 100% 6px, 109px 109px, 109px 109px;
        background-position: 54px 55px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
    }

    // 背景样式2 
    .easy-bg-style2 {
        $bgColor: #041b41;
        $nodeColor: #09306b;
        background-color: $bgColor;
        background: radial-gradient(circle, transparent 20%, $bgColor 20%, $bgColor 80%, transparent 80%, transparent),
            radial-gradient(circle, transparent 20%, $bgColor 20%, $bgColor 80%, transparent 80%, transparent) 25px 25px,
            linear-gradient($nodeColor 2px, transparent 2px) 0 -1px,
            linear-gradient(90deg, $nodeColor 2px, $bgColor 2px) -1px 0;
        background-size: 50px 50px, 50px 50px, 25px 25px, 25px 25px;
    }

    // 背景样式-style3
    .easy-bg-style3 {
        $bgColor: #041b41;
        $nodeColor: #012456;
        $size: 15px;
        background-color: $bgColor;
        background-image: linear-gradient(135deg, $nodeColor 25%, transparent 25%),
            linear-gradient(225deg, $nodeColor 25%, transparent 25%),
            linear-gradient(45deg, $nodeColor 25%, transparent 25%),
            linear-gradient(315deg, $nodeColor 25%, $bgColor 25%);
        background-position: $size 0, $size 0, 0 0, 0 0;
        background-size: $size $size;
        background-repeat: repeat;
    }

    // 背景样式-style4
    .easy-bg-style4 {
        $bgColor: #041b41;
        $nodeColor: #03aabd;
        background-color: $bgColor;
        background-image: radial-gradient(white, rgba($nodeColor, .2) 2px, transparent 40px),
            radial-gradient(white, rgba($nodeColor, .15) 1px, transparent 30px),
            radial-gradient(white, rgba($nodeColor, .1) 2px, transparent 40px),
            radial-gradient(rgba($nodeColor, .4), rgba($nodeColor, .1) 2px, transparent 30px);
        background-size: 550px 550px, 350px 350px, 250px 250px, 150px 150px;
        background-position: 0 0, 40px 60px, 130px 270px, 70px 100px;
    }

    // 背景样式-style5
    .easy-bg-style5 {
        $bgColor: #041b41;
        $nodeColor: #fff;
        background: radial-gradient($bgColor 15%, transparent 16%) 0 0,
            radial-gradient($bgColor 15%, transparent 16%) 8px 8px,
            radial-gradient(rgba($nodeColor, .1) 15%, transparent 20%) 0 1px,
            radial-gradient(rgba($nodeColor, .1) 15%, transparent 20%) 8px 9px;
        background-color: $bgColor;
        background-size: 14px 14px;
    }

    // 背景样式-style6
    .easy-bg-style6 {
        $bgColor: #03183c;
        $nodeColor: #012456;
        $size: 30px;
        background-color: $bgColor;
        background-image: linear-gradient(45deg, $nodeColor 25%, transparent 25%, transparent 75%, $nodeColor 75%, $nodeColor),
            linear-gradient(45deg, $nodeColor 25%, transparent 25%, transparent 75%, $nodeColor 75%, $nodeColor);
        background-size: $size $size;
        background-position: 0 0, $size/2 $size/2;
    }

    // 背景样式-style7
    .easy-bg-style7 {
        $bgColor: #041b41;
        $lineColor: #0b224a;
        $gridLineColor: #0d2755;
        background-color: $bgColor;
        background-image: linear-gradient($gridLineColor 2px, transparent 2px),
            linear-gradient(90deg, $gridLineColor 2px, transparent 2px),
            linear-gradient(rgba($lineColor, 1) 1px, transparent 1px),
            linear-gradient(90deg, rgba($lineColor, 1) 1px, transparent 1px);
        background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
        background-position: -2px -2px, -2px -2px, -1px -1px, -1px -1px;
    }

    // 背景样式-style8
    .easy-bg-style8 {
        $bgColor: #041b41;
        $lineColor: #0b224a;
        background-color: $bgColor;
        background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba($lineColor, .5) 10px, rgba($lineColor, .5) 20px);
    }

    // 背景样式-style9
    .easy-bg-style9 {
        $bgColor: #041b41;
        $lineColor: #0b224a;
        background-color: $bgColor;
        background-image: linear-gradient(90deg, transparent 50%, rgba($lineColor, .5) 50%);
        background-size: 20px 20px;
    }

    // 背景样式-style10
    .easy-bg-style10 {
        $bgColor: #041b41;
        $lineColor: #0b224a;
        background-color: $bgColor;
        background-image: linear-gradient(transparent 50%, rgba($lineColor, .5) 50%);
        background-size: 20px 20px;
    }

    // 背景样式-style11
    .easy-bg-style11 {
        $bgSColor: #041b41;
        $bgQColor: #0b224a;
        background: radial-gradient(circle farthest-side at 0% 50%, $bgQColor 23.5%, rgba(240, 166, 17, 0) 0)21px 30px,
            radial-gradient(circle farthest-side at 0% 50%, $bgSColor 24%, rgba(240, 166, 17, 0) 0)19px 30px,
            linear-gradient($bgQColor 14%, rgba(240, 166, 17, 0) 0, rgba(240, 166, 17, 0) 85%, $bgQColor 0)0 0,
            linear-gradient(150deg, $bgQColor 24%, $bgSColor 0, $bgSColor 26%, rgba(240, 166, 17, 0) 0, rgba(240, 166, 17, 0) 74%, $bgSColor 0, $bgSColor 76%, $bgQColor 0)0 0,
            linear-gradient(30deg, $bgQColor 24%, $bgSColor 0, $bgSColor 26%, rgba(240, 166, 17, 0) 0, rgba(240, 166, 17, 0) 74%, $bgSColor 0, $bgSColor 76%, $bgQColor 0)0 0,
            linear-gradient(90deg, $bgSColor 2%, $bgQColor 0, $bgQColor 98%, $bgSColor 0%)0 0 $bgQColor;
        background-size: 40px 60px;
    }

    // 背景样式-style12
    .easy-bg-style12 {
        $bgColor: #041b41;
        $lineColor: #0d2755;
        background-color: $bgColor;
        background-image: linear-gradient($lineColor 1px, transparent 1px),
            linear-gradient(to right, $lineColor 1px, $bgColor 1px);
        background-size: 20px 20px;
    }

    // 背景样式-style13
    .easy-bg-style13 {
        $bg1Color: #041b41;
        $bg2Color: #0d2755;
        background: linear-gradient(45deg, $bg1Color 50%, $bg2Color 50%);
        background-size: 30px 30px;
    }

    // 背景样式-style14
    .easy-bg-style14 {
        $bg1Color: #041b41;
        $bg2Color: #0d2755;
        background: linear-gradient($bg1Color 70%, $bg2Color 0%);
        background-size: 100% 20px;
    }

    // 背景样式-style15
    .easy-bg-style15 {
        $bg1Color: #041b41;
        $bg2Color: #0d2755;
        $size: 20px;
        background: $bg1Color;
        background-image: radial-gradient($bg2Color 30%, transparent 0),
            radial-gradient($bg2Color 30%, transparent 0);
        background-size: $size $size;
        background-position: 0 0, $size/2 $size/2;
    }

    // 背景样式-style16
    .easy-bg-style16 {
        $bg1Color: #041b41;
        $bg2Color: #0d2755;
        background: repeating-conic-gradient($bg2Color, $bg1Color, $bg2Color 0.1deg);
    }

    // 背景样式-style17
    .easy-bg-style17 {
        $bg1Color: #041b41;
        $bg2Color: #0d2755;
        background-image: repeating-radial-gradient(circle at center center, $bg1Color, $bg2Color 5px);
    }

    // 背景样式-style18
    .easy-bg-style18 {
        $bg1Color: #041b41;
        $bg2Color: #0d2755;
        $size: 40px;
        background-color: $bg1Color;
        background-image: radial-gradient(closest-side, transparent 98%, rgba($bg2Color, 0.3) 99%),
            radial-gradient(closest-side, transparent 98%, rgba($bg2Color, 0.3) 99%);
        background-position: 0 0, $size/2 $size/2;
        background-size: $size $size;
    }

    // 背景样式-style19
    .easy-bg-style19 {
        $bg1Color: #041b41;
        $bg2Color: #0d2755;
        $size: 10px;
        background: $bg1Color;
        background-image: radial-gradient($bg2Color 20%, rgba(0, 0, 0, 0) 0%);
        background-size: $size $size;
    }

    // 背景样式-style20
    .easy-bg-style20 {
        $bg1Color: #041b41;
        $bg2Color: #0d2755;
        background: radial-gradient(circle at 0% 50%, rgba(0, 0, 0, 0) 9px, $bg2Color 10px, rgba(0, 0, 0, 0) 11px) 0px 10px,
            radial-gradient(at 100% 100%, rgba(0, 0, 0, 0) 9px, $bg2Color 10px, rgba(0, 0, 0, 0) 11px), $bg1Color;
        background-size: 20px 20px;
    }

    // 背景样式-style21
    .easy-bg-style21 {
        $bg1Color: #041b41;
        $bg2Color: #0d2755;
        background: repeating-conic-gradient($bg2Color, $bg1Color, $bg2Color 30deg);
    }
}</style>
