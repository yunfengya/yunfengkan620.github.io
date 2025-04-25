<template>
    <div class="contain_box">
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
            backgroundColor="#f0f0f0"
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