<template>
    <div class="contain_box">
         <MyDraggableList v-model="dataList" @change="handleOrderChange">
            <div class="item_box" v-for="(item,index) in dataList" :key="index">{{item}}</div>
        </MyDraggableList>
    </div>
</template>

<script>
import MyDraggableList from '@/components/MyDraggableList';
export default {
    name: "index",
    components: {
        MyDraggableList,
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
        handleOrderChange(newOrder) {
            console.log('Order changed:', newOrder)
            // Update your data or perform other actions
        }
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
    // .draggable-container {
    //     display: flex;
    //     flex-wrap: wrap;
    //     width: 100%;
    // }
    .item_box{
        width: 120px;
        height: 80px;
        color: #23cc28;
        border: 1px solid #007acc;
        margin: 10px;
        cursor: pointer;
        user-select: none;
    }
}

</style>
