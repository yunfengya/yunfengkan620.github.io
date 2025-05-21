<template>
    <div class="contain_box">
        <h1>单个表格拖拽组件</h1>
        <Draggable v-model="dataList" :animation="200" class="Draggable_box1" @end="onDragEnd">
            <div class="item_box" v-for="(item,index) in dataList" :key="index">{{item}}</div>
        </Draggable>
        <h1>多个表格拖拽组件</h1>
        <Draggable v-for="(item1) in allList" :key="item1.title" v-model="item1.itemList" :animation="200" class="Draggable_box2" @end="onDragEndAll">
            <div class="item_box" v-for="(item2,index2) in item1.itemList" :key="index2">{{item2}}</div>
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
            ],


            allList:[
                {
                    title:'a',
                    itemList:[
                        { id: '1', name: "11111", },
                        { id: '2', name: "22222", },
                        { id: '3', name: "33333", },
                        { id: '4', name: "44444", },
                        { id: '5', name: "55555", },
                        { id: '6', name: "66666", },
                        { id: '7', name: "77777", },
                        { id: '8', name: "88888", },
                    ]
                },
                {
                    title:'b',
                    itemList:[
                        { id: '1yy', name: "11111yy", },
                        { id: '2yy', name: "22222yy", },
                        { id: '3yy', name: "33333yy", },
                        { id: '4yy', name: "44444yy", },
                        { id: '5yy', name: "55555yy", },
                        { id: '6yy', name: "66666yy", },
                        { id: '7yy', name: "77777yy", },
                        { id: '8yy', name: "88888yy", },
                    ]
                },
            ],
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
        onDragEndAll() {
            // 拖拽结束后，dataList 已经被更新
            console.log('排序后数据：', this.allList);
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
    .Draggable_box1 {
        margin: 10px;
        border: 1px solid #e606fb;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }
    .Draggable_box2 {
        margin: 10px;
        border: 1px solid #fb8006;
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
