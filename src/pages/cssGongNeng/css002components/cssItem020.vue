<template>
    <div class="contain_box">
        <!-- 
            fullConfigItems : 轮播图数据源          (数组)
            autoplay : 是否自动播放             （毫秒 值为 0 或 false 时禁用自动轮播）
            direction : 播放方向                （值: 'next' 或 'prev'）
            showControls : 是否显示控件         （布尔值 上一页/下一页按钮）
            baseRadius : 基础半径               （半径，值越大，轮播项的分布越分散）
            minRadius : 最小半径                （控制轮播项在缩放时的最小半径，用于调整近大远小的效果）
            perspective : 透视距离              （值越小，透视效果越强（类似近距离观察）值越大，透视效果越弱（类似远距离观察））
            tiltAngle : 倾斜角度                （正数：向前倾斜     负数：向后倾斜     0：无倾斜）
            transitionDuration : 过渡时间       （过渡时间 旋转过程的慢动作，单位毫秒）
            width : 容器宽度                    （容器宽度）
            height : 容器高度                 （容器高度）
            maxWidth : 最大宽度                 （最大宽度）
            maxHeight : 最大高度                （最大高度）
            backgroundColor : 背景颜色          （最大容器的 背景颜色）
            handleMouseEnter : 鼠标进入事件
            handleMouseLeave : 鼠标离开事件
            handleDirectionChange : 方向改变事件
            handleDirectionChange : 方向改变事件
         -->

         <!-- 
            数据源（items）
            动画行为（autoplay、direction、transitionDuration）
            3D 效果（baseRadius、perspective、tiltAngle）
            样式布局（尺寸、背景色）
          -->
        <LunBo3D 
            ref="lunbo3d"
            :items="fullConfigItems"
            :autoplay="autoplay"
            :direction="direction"
            :showControls="true"
            :baseRadius="600"
            :minRadius="400"
            :perspective="3500"
            :tiltAngle="-5"
            :transitionDuration="800"
            width="90vw"
            height="400px"
            :maxWidth="300"
            :maxHeight="300"
            backgroundColor="#d1d0d0"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave"
            @prev="handleDirectionChange('prev')"
            @next="handleDirectionChange('next')"
        >
            <template v-slot="{ item }">
                <!-- 自定义插槽内容 -->
                <div class="card_item">
                    {{ item.name }}
                </div>
            </template>
        </LunBo3D>
    </div>
</template>

<script>
import LunBo3D from "@/components/LunBo3D/index.vue"
export default {
    name: "index",
    components: {
        LunBo3D
    },
    data() {
        return {
            fullConfigItems: [
                {
                    name: '1111',
                },
                {
                    name: '2222',
                },
                {
                    name: '3333',
                },
                {
                    name: '4444',
                },
                {
                    name: '5555',
                },
                {
                    name: '6666',
                },
            ],
            autoplay: 2500,
            direction: 'next'
        };
    },
    methods: {
        handleMouseEnter() {
            // console.log('鼠标进入轮播区域');
        },
        handleMouseLeave() {
            // console.log('鼠标离开轮播区域');
        },
        handleDirectionChange(newDirection) {
            // 当用户手动切换方向时，更新自动播放的方向
            if (this.direction !== newDirection) {
                this.direction = newDirection;
            }
        }
    }
};
</script>

<style scoped lang="scss">
/* 容器样式 */
.contain_box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .card_item {
        width: 100%;
        height: 100%;
        background-color: #b8b5b5;
        border: 1px dashed aqua;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
        &:hover {
            transform: translateY(-5px);
        }
    }
}
</style>