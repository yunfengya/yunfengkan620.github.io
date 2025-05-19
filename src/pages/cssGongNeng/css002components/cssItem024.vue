<template>
    <div class="contain_box">
        <div v-dialogDrag class="dragDiv">自定义指令，可拖动元素</div>
    </div>
</template>

<script>
export default {
    name: "index",
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
    height: 100%;
    // background-color: rgb(177, 175, 175);
}
.dragDiv {
    background-color: #b0adad;
    width: 120px;
    height: 120px;
    cursor: move;
    z-index: 999999;
    position: absolute;
    bottom: 4rem;
    right: 6rem;
}

</style>
