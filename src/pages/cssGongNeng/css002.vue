<template>
    <div class="statusBox" v-show="true">
        <ResizableDivsXY direction="horizontal" defaultPrimarySize="15%" minPrimarySize="10%" maxPrimarySize="50%">
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
import aaafirst from "./css002components/aaafirst";
import cssItem001 from "./css002components/cssItem001";
import cssItem002 from "./css002components/cssItem002";
import cssItem003 from "./css002components/cssItem003";
import cssItem004 from "./css002components/cssItem004";
import cssItem005 from "./css002components/cssItem005";
import cssItem006 from "./css002components/cssItem006";
import cssItem007 from "./css002components/cssItem007";
import cssItem008 from "./css002components/cssItem008";
import cssItem009 from "./css002components/cssItem009";
import cssItem010 from "./css002components/cssItem010";
import cssItem011 from "./css002components/cssItem011";
import cssItem012 from "./css002components/cssItem012";
import cssItem013 from "./css002components/cssItem013";
import cssItem014 from "./css002components/cssItem014";
import cssItem015 from "./css002components/cssItem015";
import cssItem016 from "./css002components/cssItem016";
import cssItem017 from "./css002components/cssItem017";
import cssItem018 from "./css002components/cssItem018";
import cssItem019 from "./css002components/cssItem019";
import cssItem020 from "./css002components/cssItem020";
import cssItem021 from "./css002components/cssItem021";
import cssItem022 from "./css002components/cssItem022";

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
        cssItem019,
        cssItem020,
        cssItem021,
        cssItem022,
    },
    data() {
        return {
            activeIndex: 0,
            activeName: "aaafirst",
            nameList: [
                { label: "测试", name: "aaafirst" },
                { label: "周下拉选择", name: "cssItem001" },
                { label: "qrcode使用", name: "cssItem002" },
                { label: "qrcode生成", name: "cssItem003" },
                { label: "大文件切片", name: "cssItem004" },
                { label: "excel下载", name: "cssItem005" },
                { label: "exceljs使用", name: "cssItem006" },
                { label: "放大移动效果", name: "cssItem007" },
                { label: "卡片复选禁用", name: "cssItem008" },
                { label: "卡片步骤", name: "cssItem009" },
                { label: "优美原生滚动条", name: "cssItem010" },
                { label: "输入框", name: "cssItem011" },
                { label: "封装下载各种文件", name: "cssItem012" },
                { label: "可拖动区域宽度", name: "cssItem013" },
                { label: "AI-GPT简单页面", name: "cssItem014" },
                { label: "office在线预览", name: "cssItem015" },
                { label: "table", name: "cssItem016" },
                { label: "X6 图编辑引擎 | AntV", name: "cssItem017" },
                { label: "3D轮播", name: "cssItem018" },
                { label: "element幻灯片", name: "cssItem019" },
                { label: "封装3D轮播", name: "cssItem020" },
                { label: "卡片轮播", name: "cssItem021" },
                { label: "堆叠卡片轮播", name: "cssItem022" },
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
    color: #36909e;
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
