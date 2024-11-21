<template>
    <div class="zoomable" ref="zoomable" @wheel="handleWheel">
        <el-scrollbar class="scrollbar_top" ref="scrollbar">
            <div class="content" :style="contentStyle">
                <slot></slot>
            </div>
        </el-scrollbar>
    </div>
</template>
  
<script>
import { Scrollbar } from 'element-ui';

export default {
    name: 'Zoomable',
    components: {
        'el-scrollbar': Scrollbar,
    },
    data() {
        return {
            scale: 1,
            originX: 0,
            originY: 0,
            naturalWidth: 0,
            naturalHeight: 0,
        };
    },
    computed: {
        contentStyle() {
            return {
                transform: `scale(${this.scale})`,
                transformOrigin: `${this.originX}px ${this.originY}px`,
                width: `${this.naturalWidth}px`,
                height: `${this.naturalHeight}px`,
            };
        },
    },
    methods: {
        handleWheel(e) {
            e.preventDefault();

            // 获取鼠标在元素上的位置
            const rect = this.$refs.zoomable.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // 计算新的缩放级别
            const deltaScale = e.deltaY < 0 ? 0.1 : -0.1;
            const newScale = Math.min(Math.max(this.scale + deltaScale, 1), 2);//缩放级别是 最小1倍 ~ 最大2倍

            // 计算新的原点位置
            const newOriginX = x / newScale;
            const newOriginY = y / newScale;

            // 更新数据
            this.scale = newScale;
            this.originX = newOriginX;
            this.originY = newOriginY;

            // 更新图片的大小
            this.naturalWidth = this.$refs.zoomable.offsetWidth * this.scale;
            this.naturalHeight = this.$refs.zoomable.offsetHeight * this.scale;

            // 更新滚动条的大小
            this.$nextTick(() => {
                this.$refs.scrollbar.update();
                this.$nextTick(() => {
                    this.$refs.scrollbar.update();
                });
            });
        },

    },
    mounted() {
        // 初始化图片的大小
        this.naturalWidth = this.$refs.zoomable.offsetWidth;
        this.naturalHeight = this.$refs.zoomable.offsetHeight;
    },
};
</script>
  
<style scoped lang="scss">
.zoomable {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

::v-deep .scrollbar_top {
    width: 100%;
    height: 100% !important;

    .el-scrollbar__wrap {
        overflow: hidden;
        width: 100%;
        height: 100% !important;

        .el-scrollbar__view {
            width: 100%;
            height: 100% !important;

            .content {
                width: 100%;
                height: 100%;
            }
        }
    }

    .el-scrollbar__thumb {
        background-color: #53c2d3;
    }
}
</style>
  