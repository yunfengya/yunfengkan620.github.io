<template>
    <div class="bee" :style="beeStyle"></div>
</template>
  
<script>
export default {
    data() {
        return {
            bodyWidth: window.innerWidth,
            bodyHeight: window.innerHeight,
            beeWidth: 200,   // 小蜜蜂的宽度
            beeHeight: 100,  // 小蜜蜂的高度
            x: 0,
            y: 0,
            duration: 2000   // 动画的持续时间
        };
    },
    computed: {
        // 动态生成小蜜蜂的样式
        beeStyle() {
            return {
                transform: `translate(${this.x}px, ${this.y}px)`,
                transition: `transform ${this.duration}ms linear`,
                width: this.beeWidth + 'px',
                height: this.beeHeight + 'px',
                backgroundImage: `url(${require('@/assets/dog.gif')})`, // 使用 require 来解析图片路径
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat'
            };
        }
    },
    mounted() {
        // 组件挂载后开始移动小蜜蜂
        this.moveBee();
        window.addEventListener('resize', this.updateWindowSize); // 窗口调整时更新宽高
    },
    beforeDestroy() {
        // 组件销毁时移除监听器
        window.removeEventListener('resize', this.updateWindowSize);
    },
    methods: {
        // 生成随机位置
        randomPosition() {
            return {
                x: Math.random() * (this.bodyWidth - this.beeWidth),
                y: Math.random() * (this.bodyHeight - this.beeHeight) // 确保小蜜蜂不会超出底部
            };
        },
        // 生成随机动画持续时间
        randomDuration() {
            return Math.random() * 2000 + 4000; // 随机2到4秒的动画时间
        },
        // 移动小蜜蜂
        moveBee() {
            const position = this.randomPosition();
            this.duration = this.randomDuration();
            this.x = position.x;
            this.y = position.y;
            setTimeout(this.moveBee, this.duration); // 持续执行移动操作
        },
        // 更新窗口大小，确保动画范围调整
        updateWindowSize() {
            this.bodyWidth = window.innerWidth;
            this.bodyHeight = window.innerHeight;
        }
    }
};
</script>
  
<style scoped>
.bee {
    position: fixed;
    min-width: 200px;
    min-height: 100px;
    background-size: contain;
    /* 确保小蜜蜂不会被拉伸 */
}
</style>
  