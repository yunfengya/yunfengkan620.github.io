<template>
    <div class="statusBox" v-show="true">
        <el-row class="elRow">
            <div style="width:100%;height:100%;" @wheel="handleScroll">
                <el-scrollbar class="scrollbar_top" ref="scrollbar">
                    <div v-for="(item, index) in nameList" :key="index" :class="activeIndex == index ? 'activeItem' : ''"
                        class="itemDiv" @click="chooseItem(index, item.name)">
                        {{ item.label }}
                    </div>
                </el-scrollbar>
            </div>
        </el-row>
        <keep-alive>
            <component :is="activeName" :ref="activeName"></component>
        </keep-alive>
    </div>
</template>
<script>
import echartItem001 from "./echart001components/echartItem001";
import echartItem002 from "./echart001components/echartItem002";

export default {
    name: "echart001",
    props: [""],
    components: {
        echartItem001,
        echartItem002,
    },
    data() {
        return {
            activeIndex: 0,
            activeName: "echartItem001",
            nameList: [
                { label: "pie模版", name: "echartItem001" },
                { label: "echartItem002", name: "echartItem002" },
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
        // 滚轮横向滚动
        handleScroll(event) {
            // 获取 <el-scrollbar> 的原生滚动容器
            const scrollbar = this.$refs.scrollbar.$refs.wrap;
            // 阻止纵向默认滚动
            event.preventDefault();
            // 根据滚轮的 deltaY 实现横向滚动
            scrollbar.scrollLeft += event.deltaY;
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
    height: calc(100vh - 0rem);
    // background-color: #e1e1e1;
    background-color: rgba(57, 77, 102,.5);
}

.elRow {
    height: 4.2rem;
    width: 100%;
    // display: flex;
    ::v-deep .scrollbar_top {
        width: 100%;
        height: 100% !important;
        .el-scrollbar__wrap{
            overflow: hidden;
            width: 100%;
            height: 100% !important;
            .el-scrollbar__view {
                width: 100%;
                height: 100% !important;
                display: flex;
            }
        }
        .el-scrollbar__thumb{
            background-color: #bdf7bb;
        }
    }
}

.itemDiv {
    flex-shrink: 0;
    width: 13rem;
    height: 4.2rem;
    text-align: center;
    line-height: 4.2rem;
    color: #36909e;
    font-size: 1.6rem;
    // float: left;
    margin-right: 0.6rem;
    background-color: #23477d;
    // background: url("~@/assets/images/equipment/wxz.png") no-repeat;
    // background-size: 100% 100%;
    cursor: pointer;
}

.activeItem {
    font-weight: bold;
    color: #17e1ff;
    background-color: #2b599e;
    // background: url("~@/assets/images/equipment/xz.png") no-repeat;
    // background-size: 100% 100%;
}
</style>
