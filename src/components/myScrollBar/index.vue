<template>
    <!-- 组件使用方式 
        <MyScrollbar
            :scrollbar-width="'8px'" 
            :scrollbar-height="'8px'" 
            :scrollbar-color="'rgba(144, 147, 153, 0.3)'"
            :scrollbar-border-color="'transparent'"
            :scrollbar-track-color="'transparent'"
            :autoScroll="true"
            :alwaysShowScrollbar="true"
        ></MyScrollbar>
    -->
    <div 
        class="scrollbar_components_box" 
        ref="scrollContent" 
        :style="scrollbarStyle"
        :class="{ 'always-show-scrollbar': alwaysShowScrollbar }"
        @mouseenter="stopScroll" 
        @mouseleave="startScroll"
    >
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
            // default: 'linear-gradient(45deg, #fc902b, #5bf818)'
            default: 'rgba(144, 147, 153, 0.3)'
        },
        scrollbarBorderColor: {
            type: String,
            default: 'transparent',// transparent #ffedde
        },
        scrollbarTrackColor: {
            type: String,
            default: 'transparent',// transparent #ffedde
        },
        autoScroll: {
            type: Boolean,
            default: false, // 是否开启自动滚动功能
        },
        alwaysShowScrollbar: {
            type: Boolean,
            default: false, // 是否始终显示滚动条，不管是否鼠标是否滑过 //如果alwaysShowScrollbar为false，鼠标滑过才显示滚动条
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
    },
    data() {
        return {
            scrolltimer: "",
        };
    },
    mounted() {
        this.startScroll();
    },
    activated() {
        this.startScroll();
    },
    beforeDestroy() {
        this.stopScroll();
    },
    deactivated() {
        this.stopScroll();
    },
    methods: {
        startScroll() {
            if (this.autoScroll){
                const scrollDom = this.$refs.scrollContent;
                this.scrolltimer = window.setInterval(() => {
                    scrollDom.scrollTop += 1.5;
                    if (scrollDom.clientHeight + scrollDom.scrollTop >= scrollDom.scrollHeight){
                        scrollDom.scrollTop = 0;
                    }
                }, 150);
            }
        },
        stopScroll() {
            window.clearInterval(this.scrolltimer);
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
    /* 如果alwaysShowScrollbar为false，鼠标滑过才显示滚动条 */
    &.always-show-scrollbar::-webkit-scrollbar-thumb {
        cursor: pointer;
        background: var(--scrollbar-color);
        border: 1px solid var(--scrollbar-border-color);
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
