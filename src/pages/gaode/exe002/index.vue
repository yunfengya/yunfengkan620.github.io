<template>
    <div class="contain_box">
        <h1>待开发2</h1>
    </div>
</template>

<script>
export default {
    name: "index",
    data() {
        return {
            // 遮罩层，用于加载时显示的状态
            loading: true,
        };
    },
    mounted() {
        
    },
    beforeDestroy() {
        
    },
    methods: {
        
    },
};
</script>

<style scoped lang="scss">
/* 外部容器的样式，100% 占满父容器 */
.contain_box {
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
