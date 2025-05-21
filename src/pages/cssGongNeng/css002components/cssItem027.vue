<template>
    <div class="contain_box">
         <MyDraggableList v-for="(item1,index1) in allList" :key="index1" :list-id="item1.title" v-model="item1.itemList" @change="handleOrderChange">
            <div class="item_box" v-for="(item2,index2) in item1.itemList" :key="index2">{{item2}}</div>
        </MyDraggableList>
    </div>
</template>

<script>
import MyDraggableList from '@/components/MyDraggableList/index2.vue';
export default {
    name: "index",
    components: {
        MyDraggableList,
    },

    data() {
        return {
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
