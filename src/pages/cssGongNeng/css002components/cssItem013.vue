<template>
    <div class="contain_box">
        <ResizableDivs
            defaultDiv1Width="30%"
            minDiv1Width="20%"
            maxDiv1Width="50%"
            >
            <template v-slot:div1>
                <div class="content">
                    <p>这是第一个 Div 的内容。</p>
                </div>
            </template>
            <template v-slot:div2>
                <div class="content">
                    <p>这是第二个 Div 的内容。</p>
                </div>
            </template>
        </ResizableDivs>
    </div>
</template>

<script>
import ResizableDivs from '@/components/ResizableDivs/index';
export default {
    name: "index",
    components:{
        ResizableDivs
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
    height: calc(100vh - 4.2rem);
    /* 视口的高度减去顶部的导航栏高度 */
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;
    /* 外框样式 */
}

</style>
