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
                { id: 9, name: "钱十一", age: 28 },
                { id: 10, name: "孙十二", age: 29 },
                { id: 11, name: "赵十三", age: 30 },
                { id: 12, name: "孙十四", age: 31 },
                { id: 13, name: "周十五", age: 32 },
                { id: 14, name: "吴十六", age: 33 },
                { id: 15, name: "郑十七", age: 34 },
                { id: 16, name: "钱十八", age: 35 },
                { id: 17, name: "孙十九", age: 36 },
                { id: 18, name: "赵二十", age: 37 },
                { id: 19, name: "孙二十一", age: 38 },
                { id: 20, name: "周二十二", age: 39 },
                { id: 21, name: "吴二十三", age: 40 },
                { id: 22, name: "郑二十四", age: 41 },
                { id: 23, name: "钱二十五", age: 42 },
                { id: 24, name: "孙二十六", age: 43 },
                { id: 25, name: "赵二十七", age: 44 },
                { id: 26, name: "孙二十八", age: 45 },
                { id: 27, name: "周二十九", age: 46 },
                { id: 28, name: "吴三十", age: 47 },
                { id: 29, name: "郑三十一", age: 48 },
                { id: 30, name: "钱三十二", age: 49 }
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
