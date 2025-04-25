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
                <div class="full-config-item">
                    <h2>{{ item.name }}</h2>
                    <img :src="item.avatar" :alt="item.name" class="avatar">
                    <p>{{ item.bio }}</p>
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
                    id: 'user1',
                    name: '张三',
                    bio: '前端开发工程师',
                    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
                },
                {
                    id: 'user2',
                    name: '李四',
                    bio: 'UI设计师',
                    avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
                },
                {
                    id: 'user3',
                    name: '王五',
                    bio: '后端开发工程师',
                    avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
                },
                {
                    id: 'user4',
                    name: '赵六',
                    bio: '产品经理',
                    avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
                },
                {
                    id: 'user5',
                    name: '钱七',
                    bio: '测试工程师',
                    avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
                },
                {
                    id: 'user6',
                    name: '孙八',
                    bio: '运维工程师',
                    avatar: 'https://randomuser.me/api/portraits/women/6.jpg'
                },
            ],
            autoplay: 2500,
            direction: 'next'
        };
    },
    methods: {
        handleMouseEnter() {
            console.log('鼠标进入轮播区域');
            // 鼠标进入时暂停自动播放
            // this.$refs.lunbo3d.pause();
        },
        handleMouseLeave() {
            console.log('鼠标离开轮播区域');
            // 鼠标离开时恢复自动播放
            // this.$refs.lunbo3d.play();
        },
        handleDirectionChange(newDirection) {
            // 当用户手动切换方向时，更新自动播放的方向
            if (this.direction !== newDirection) {
                this.direction = newDirection;
                // 重新启动轮播以应用新方向
                // this.$nextTick(() => {
                //     this.$refs.lunbo3d.play();
                // });
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

    .full-config-item {
        background: white;
        padding: 20px;
        border-radius: 8px;
        width: 90%;
        height: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;

        &:hover {
            transform: translateY(-5px);
        }
    }

    .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin: 15px 0;
        object-fit: cover;
        border: 3px solid #f0f0f0;
    }

    h2 {
        margin: 0;
        color: #333;
        font-size: 1.5rem;
    }

    p {
        color: #666;
        text-align: center;
        margin: 10px 0 0;
    }
}
</style>