<template>
    <div class="statusBox" v-show="true">
        <el-row class="elRow">
            <el-scrollbar class="scrollbar_top">
                <div v-for="(item, index) in nameList" :key="index" :class="activeIndex == index ? 'activeItem' : ''"
                    class="itemDiv" @click="chooseItem(index, item.name)">
                    {{ item.label }}
                </div>
            </el-scrollbar>
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
                { label: "echartItem001", name: "echartItem001" },
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
    background-color: #e1e1e1;
    // background-color: #1f3e6f;
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
    margin-right: 1.2rem;
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
