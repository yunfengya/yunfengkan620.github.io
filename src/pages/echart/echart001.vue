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
import demoEcharts from "./echart001components/demoEcharts";
import echartItem001 from "./echart001components/echartItem001";
import echartItem002 from "./echart001components/echartItem002";
import echartItem003 from "./echart001components/echartItem003";
import echartItem004 from "./echart001components/echartItem004";

export default {
    name: "echart001",
    props: [""],
    components: {
        ResizableDivsXY,
        MyScrollBar,
        demoEcharts,
        echartItem001,
        echartItem002,
        echartItem003,
        echartItem004,
    },
    data() {
        return {
            activeIndex: 0,
            activeName: "demoEcharts",
            nameList: [
                { label: "demoEcharts", name: "demoEcharts" },
                { label: "常规环图", name: "echartItem001" },
                { label: "echartItem002", name: "echartItem002" },
                { label: "堆叠柱图，判断每个色块颜色", name: "echartItem003" },
                { label: "热力图，判断每个色块颜色", name: "echartItem004" },
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
