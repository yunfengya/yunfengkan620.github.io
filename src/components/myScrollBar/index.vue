<template>
    <div class="scrollbar_components_box" ref="scrollContent">
        <slot></slot>
    </div>
</template>
  
<script>
export default {
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
  
<style scoped>
.scrollbar_components_box {
    width: 100%;
    height: 100%;
    overflow: auto;
}

/* 自定义滚动条样式 */
/* 默认不显示 */
.scrollbar_components_box::-webkit-scrollbar {
    width: 8px;
    /* 竖向滚动条的宽度 */
    height: 8px;
    /* 横向滚动条的高度 */
}

.scrollbar_components_box::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 8px;
    border: 1px solid transparent;
}

.scrollbar_components_box::-webkit-scrollbar-thumb {
    background: transparent;
    border: 1px solid transparent;
    border-radius: 8px;
}

/* 鼠标滑过显示 */
.scrollbar_components_box:hover::-webkit-scrollbar {
    width: 8px;
    /* 竖向滚动条的宽度 */
    height: 8px;
    /* 横向滚动条的高度 */
}

.scrollbar_components_box:hover::-webkit-scrollbar-track {
    background: #ffe4cb;
    border-radius: 8px;
    border: 1px solid #ffedde;
}

.scrollbar_components_box:hover::-webkit-scrollbar-thumb {
    cursor: pointer;
    background: linear-gradient(45deg, #fc902b, #5bf818);
    /* 从对角线开始渐变 */
    border: 1px solid #ffedde;
    border-radius: 8px;
}

/* 去除xy轴交叉色 */
.scrollbar_components_box::-webkit-scrollbar-corner {
    background-color: transparent;
}
</style>
  