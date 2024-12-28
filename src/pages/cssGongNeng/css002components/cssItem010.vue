<template>
    <div class="contain_box">
        <MyScrollbar>
            <!-- Your content goes here -->
            <p v-for="item in 50" :key="item" style="width:130%">{{ item }}</p>
        </MyScrollbar>
    </div>
</template>
<script>
import MyScrollbar from '@/components/myScrollBar/index.vue';
export default {
    name: "index",
    components: {
        MyScrollbar,
    },
    data() {
        return {
            
        };
    },
    mounted() {
        
    },
    beforeDestroy() {
        
    },
    methods: {
        
    }
};
</script>

<style scoped lang="scss">
/* 容器样式 */
.contain_box {
    width: 100%;
    height: calc(100vh - 14.2rem);
    /* 视口的高度减去顶部的导航栏高度 */
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;
    /* 外框样式 */
}

</style>
