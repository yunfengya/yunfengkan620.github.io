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
import page001 from "./page001";
import demo from "./demo";

export default {
    name: "error404",
    props: [""],
    components: {
        page001,
        demo,
    },
    data() {
        return {
            activeIndex: 0,
            activeName: "page001",
            nameList: [
                { label: "page001", name: "page001" },
                { label: "demo", name: "demo" },
                { label: "demo", name: "demo" },
                { label: "demo", name: "demo" },
                { label: "demo", name: "demo" },
                { label: "demo", name: "demo" },
                { label: "demo", name: "demo" },
                { label: "demo", name: "demo" },
                { label: "demo", name: "demo" },
                { label: "demo", name: "demo" },
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
    // background-color: #d9d8d8;
    background-color: #1f3e6f;
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
