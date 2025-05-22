<template>
    <div class="statusBox" v-show="true">
        <ResizableDivsXY direction="horizontal" defaultPrimarySize="20%" minPrimarySize="10%" maxPrimarySize="70%">
            <template v-slot:div1>
                <MyScrollBar :scrollbar-width="'8px'" :scrollbar-height="'8px'" :scrollbar-color="'rgba(144, 147, 153, 0.6)'"
                    style="display: flex;flex-direction: row;flex-wrap:wrap;align-content: flex-start;"
                >
                    <div v-for="(item, index) in nameList" :key="index" :class="activeIndex == index ? 'activeItem' : ''"
                        class="itemDiv" @click="chooseItem(index, item.name)">
                        {{ item.label }}
                    </div>
                </MyScrollBar>
            </template>
            <template v-slot:div2>
                <MyScrollBar :scrollbar-width="'8px'" :scrollbar-height="'8px'" :scrollbar-color="'rgba(144, 147, 153, 0.6)'">
                    <!-- 
                        include="cssItem001,cssItem002" 缓存哪些
                        不写默认缓存所有
                    -->
                    <keep-alive include="cssItem001">
                        <component :is="activeName" :ref="activeName"></component>
                    </keep-alive>
                </MyScrollBar>
            </template>
        </ResizableDivsXY>
    </div>
</template>
<script>
import ResizableDivsXY from "@/components/ResizableDivs/ResizableDivsXY";
import MyScrollBar from '@/components/myScrollBar/index.vue';
import aaafirst from "./css001components/aaafirst";
import cssItem001 from "./css001components/cssItem001";
import cssItem002 from "./css001components/cssItem002";
import cssItem003 from "./css001components/cssItem003";
import cssItem004 from "./css001components/cssItem004";
import cssItem005 from "./css001components/cssItem005";
import cssItem006 from "./css001components/cssItem006";
import cssItem007 from "./css001components/cssItem007";
import cssItem008 from "./css001components/cssItem008";
import cssItem008second from "./css001components/cssItem008second";
import cssItem009 from "./css001components/cssItem009";
import cssItem010 from "./css001components/cssItem010";
import cssItem011 from "./css001components/cssItem011";
import cssItem012 from "./css001components/cssItem012";
import cssItem013 from "./css001components/cssItem013";
import cssItem014 from "./css001components/cssItem014";
import cssItem015 from "./css001components/cssItem015";
import cssItem016 from "./css001components/cssItem016";
import cssItem017 from "./css001components/cssItem017";
import cssItem018 from "./css001components/cssItem018";

export default {
    name: "index",
    props: [""],
    components: {
        ResizableDivsXY,
        MyScrollBar,
        aaafirst,
        cssItem001,
        cssItem002,
        cssItem003,
        cssItem004,
        cssItem005,
        cssItem006,
        cssItem007,
        cssItem008,
        cssItem008second,
        cssItem009,
        cssItem010,
        cssItem011,
        cssItem012,
        cssItem013,
        cssItem014,
        cssItem015,
        cssItem016,
        cssItem017,
        cssItem018,
    },
    data() {
        return {
            activeIndex: 0,
            activeName: "aaafirst",
            nameList: [
                { label: "测试", name: "aaafirst" },
                { label: "跑马灯", name: "cssItem001" },
                { label: "小球运动", name: "cssItem002" },
                { label: "文字分割", name: "cssItem003" },
                { label: "刮刮乐", name: "cssItem004" },
                { label: "数字签名", name: "cssItem005" },
                { label: "钢琴", name: "cssItem006" },
                { label: "DVD公告", name: "cssItem007" },
                { label: "3D轮播", name: "cssItem008" },
                { label: "3D轮播2", name: "cssItem008second" },
                { label: "屏幕录制", name: "cssItem009" },
                { label: "轮播倒影", name: "cssItem010" },
                { label: "电量", name: "cssItem011" },
                { label: "s型流程线", name: "cssItem012" },
                { label: "柱子动画", name: "cssItem013" },
                { label: "卡片悬浮发光", name: "cssItem014" },
                { label: "9宫格抽奖", name: "cssItem015" },
                { label: "大转盘抽奖", name: "cssItem016" },
                { label: "蜡烛", name: "cssItem017" },
                { label: "涟漪动效", name: "cssItem018" },
            ],
        };
    },
    created() { },
    mounted() { },
    methods: {
        chooseItem(idnex, name) {
            this.activeIndex = idnex;
            this.activeName = name;
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.statusBox {
    // padding: 1rem 1rem;
    // height: calc(100vh - 2rem);
    padding: 0rem;
    height: calc(100vh - 20px - 54px);
    border: 1px solid #000;
    // background-color: #e1e1e1;
    // background-color: rgba(57, 77, 102,.5);
}

.itemDiv {
    flex-shrink: 0;
    min-width: 6rem;
    height: 2.2rem;
    text-align: center;
    line-height: 2.2rem;
    color: #babcbc;
    font-size: 1.4rem;
    // float: left;
    margin-right: 0.6rem;
    margin-bottom: 0.6rem;
    padding: 0 0.4rem;
    background-color: #23477d;
    // background: url("~@/assets/images/equipment/wxz.png") no-repeat;
    // background-size: 100% 100%;
    cursor: pointer;
}

.activeItem {
    // font-weight: bold;
    font-weight: 600;
    color: #17e1ff;
    background-color: #2b599e;
    // background: url("~@/assets/images/equipment/xz.png") no-repeat;
    // background-size: 100% 100%;
}
</style>
