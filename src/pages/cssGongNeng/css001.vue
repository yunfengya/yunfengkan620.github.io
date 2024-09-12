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
        <!-- 
            include="cssItem001,cssItem002" 缓存哪些
            不写默认缓存所有
         -->
        <keep-alive include="cssItem001,cssItem002">
            <component :is="activeName" :ref="activeName"></component>
        </keep-alive>
    </div>
</template>
<script>
import aaafirst from "./css001components/aaafirst";
import cssItem001 from "./css001components/cssItem001";
import cssItem002 from "./css001components/cssItem002";
import cssItem003 from "./css001components/cssItem003";
import cssItem004 from "./css001components/cssItem004";
import cssItem005 from "./css001components/cssItem005";
import cssItem006 from "./css001components/cssItem006";
import cssItem007 from "./css001components/cssItem007";

export default {
    name: "index",
    props: [""],
    components: {
        aaafirst,
        cssItem001,
        cssItem002,
        cssItem003,
        cssItem004,
        cssItem005,
        cssItem006,
        cssItem007,
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
    // background-color: rgba(57, 77, 102,.5);
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
            background-color: #53c2d3;
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
