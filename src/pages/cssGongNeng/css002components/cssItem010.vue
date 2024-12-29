<template>
    <div class="contain_box">
        <MyScrollBar 
            :scrollbar-width="'8px'" 
            :scrollbar-height="'8px'" 
            :scrollbar-color="'rgba(144, 147, 153, 0.3)'"
        >
            <!-- Your content goes here -->
            <p v-for="(item,index) in 50" :key="index" style="width:130%;">
                -.-.-.-.-.-----...---...---...-.-.-.-.-.-----...---...---...-.-.-.-.-.-----...---...---...-.-.-.-.-{{ item }}
            </p>
        </MyScrollBar>
    </div>
</template>
<script>
import MyScrollBar from '@/components/MyScrollBar/index.vue';
export default {
    name: "index",
    components: {
        MyScrollBar,
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
