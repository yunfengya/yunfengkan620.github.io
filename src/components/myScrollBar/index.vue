<template>
    <!-- 组件使用方式 
        <MyScrollbar
            :scrollbar-width="'8px'" 
            :scrollbar-height="'8px'" 
            :scrollbar-color="'#afb8c8'"
            :scrollbar-border-color="'transparent'"
            :scrollbar-track-color="'transparent'"
        ></MyScrollbar>
    -->
    <div class="scrollbar_components_box" ref="scrollContent" :style="scrollbarStyle">
        <slot></slot>
    </div>
</template>
  
<script>
export default {
    props: {
        scrollbarWidth: {
            type: String,
            default: '8px'
        },
        scrollbarHeight: {
            type: String,
            default: '8px'
        },
        scrollbarColor: {
            type: String,
            default: 'linear-gradient(45deg, #fc902b, #5bf818)'
        },
        scrollbarBorderColor: {
            type: String,
            default: 'transparent',// transparent #ffedde
        },
        scrollbarTrackColor: {
            type: String,
            default: 'transparent',// transparent #ffedde
        },
    },
    computed: {
        scrollbarStyle() {
            return {
                '--scrollbar-width': this.scrollbarWidth,
                '--scrollbar-height': this.scrollbarHeight,
                '--scrollbar-color': this.scrollbarColor,
                '--scrollbar-track-color': this.scrollbarTrackColor,
                '--scrollbar-border-color': this.scrollbarBorderColor
            };
        }
    }
};
</script>
  
<style scoped lang="scss">
.scrollbar_components_box {
    width: 100%;
    height: 100%;
    overflow: auto;

    /* 自定义滚动条样式 */
    /* 默认不显示 */
    &::-webkit-scrollbar {
        width: var(--scrollbar-width);
        /* 竖向滚动条的宽度 */
        height: var(--scrollbar-height);
        /* 横向滚动条的高度 */
    }

    &::-webkit-scrollbar-track {
        background: transparent;
        border-radius: var(--scrollbar-width);
        border: 1px solid transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: transparent;
        border: 1px solid transparent;
        border-radius: var(--scrollbar-width);
    }

    /* 鼠标滑过显示 */
    &:hover::-webkit-scrollbar {
        width: var(--scrollbar-width);
        /* 竖向滚动条的宽度 */
        height: var(--scrollbar-height);
        /* 横向滚动条的高度 */
    }

    &:hover::-webkit-scrollbar-track {
        background: var(--scrollbar-track-color);
        border-radius: var(--scrollbar-width);
        border: 1px solid var(--scrollbar-border-color);
    }

    &:hover::-webkit-scrollbar-thumb {
        cursor: pointer;
        background: var(--scrollbar-color);
        /* 从对角线开始渐变 */
        border: 1px solid var(--scrollbar-border-color);
        border-radius: var(--scrollbar-width);
    }

    /* 去除xy轴交叉色 */
    &::-webkit-scrollbar-corner {
        background-color: transparent;
    }
}
</style>
