<template>
    <div class="contain_box">
        <Draggable v-model="dataList" :animation="200" class="Draggable-container" @end="onDragEnd">
            <div class="item_box" v-for="(item,index) in dataList" :key="index">{{item}}</div>
        </Draggable>
    </div>
</template>

<script>
// npm install vuedraggable --save    Vue 的拖拽插件，比如 vuedraggable
// 文档 https://www.npmjs.com/package/vuedraggable
import Draggable from 'vuedraggable';
export default {
    name: "index",
    components: {
        Draggable,
    },

    data() {
        return {
            dataList:[
                { id: 1, name: "张三", age: 20 },
                { id: 2, name: "李四", age: 21 },
                { id: 3, name: "王五", age: 22 },
                { id: 4, name: "赵六", age: 23 },
                { id: 5, name: "孙七", age: 24 },
                { id: 6, name: "周八", age: 25 },
                { id: 7, name: "吴九", age: 26 },
                { id: 8, name: "郑十", age: 27 },
            ]
        };
    },
    mounted() {
        
    },
    beforeDestroy() {
        
    },
    methods: {
        onDragEnd() {
            // 拖拽结束后，dataList 已经被更新
            console.log('排序后数据：', this.dataList);
        },
    }
};
</script>

<style scoped lang="scss">
/* 容器样式 */
.contain_box {
    width: 100%;
    height: 100%;
    // background-color: rgb(177, 175, 175);
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    .Draggable-container {
        border: 1px solid #e606fb;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }
    .item_box{
        width: 120px;
        height: 80px;
        color: #1ec600;
        border: 1px solid #6b6b6b;
        margin: 10px;
        cursor: pointer;
        user-select: none;
    }
}

</style>
