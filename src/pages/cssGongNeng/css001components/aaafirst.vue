<template>
    <div class="contain_box">
        <!-- 主轮播容器 -->
        <div class="carousel">
            <div class="carousel-inner">
                <!-- 使用 v-for 渲染轮播项 -->
                <div v-for="(item, index) in items" :key="index" class="carousel-item"
                    :style="{ backgroundImage: `url(${item})` }"></div>
            </div>
            <!-- 左右控制按钮 -->
            <div class="controls">
                <button class="button" id="prev">&lt;</button>
                <button class="button" id="next">&gt;</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CarouselComponent",
    data() {
        return {
            items: [
                require('../../../assets/lunbo2.png'),
                require('../../../assets/lunbo2.png'),
                require('../../../assets/lunbo2.png'),
                require('../../../assets/lunbo2.png'),
                require('../../../assets/lunbo2.png'),
                require('../../../assets/lunbo2.png'),
                require('../../../assets/lunbo2.png'),
            ],
            currentAngle: 0, // 当前旋转角度
            angleStep: 360 / 7, // 每张图片的旋转角度
            baseRadius: 500, // 圆环的基础半径，控制视觉距离
            autoRotateDirection: 1, // 自动旋转方向
            autoRotateInterval: null // 自动旋转的定时器
        };
    },
    mounted() {
        // 初始化轮播图
        this.updateCarousel();
        this.startAutoRotate();

        // 监听窗口大小变化，更新轮播
        window.addEventListener('resize', this.updateCarousel);
        // 监听页面可见性变化，暂停或恢复自动旋转
        document.addEventListener('visibilitychange', this.handleVisibilityChange);

        // 添加按钮点击事件
        const prevButton = this.$el.querySelector('#prev');
        const nextButton = this.$el.querySelector('#next');
        prevButton.addEventListener('click', this.rotatePrev);
        nextButton.addEventListener('click', this.rotateNext);

        // 鼠标进入和离开时，暂停和恢复自动旋转
        const carouselElement = this.$el.querySelector('.carousel');
        carouselElement.addEventListener('mouseenter', this.stopAutoRotate);
        carouselElement.addEventListener('mouseleave', this.startAutoRotate);
    },
    beforeDestroy() {
        // 移除事件监听器和定时器
        window.removeEventListener('resize', this.updateCarousel);
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
        clearInterval(this.autoRotateInterval);
    },
    methods: {
        // 更新轮播图的每个项的位置和旋转角度
        updateCarousel() {
            const items = this.$el.querySelectorAll('.carousel-item');
            const minRadius = 300; // 最小半径，以确保图片不重叠
            // 图片之间间隔 120
            const radius = Math.max(this.baseRadius / (2 * Math.tan(Math.PI / items.length)) + 100, minRadius); // 计算间隔

            // 更新每个轮播项的变换样式
            items.forEach((item, index) => {
                item.style.transform = `rotateY(${index * this.angleStep}deg) translateZ(${radius}px)`;
            });

            // 更新内层轮播图的旋转
            this.$el.querySelector('.carousel-inner').style.transform = `rotateX(-4deg) rotateY(${this.currentAngle}deg)`;
        },
        // 旋转轮播图，更新位置
        rotateCarousel(step) {
            this.currentAngle += step * this.angleStep; // 增加或减少旋转角度
            // 抬起角度 rotateX(-4deg)
            this.$el.querySelector('.carousel-inner').style.transform = `rotateX(-4deg) rotateY(${this.currentAngle}deg)`;
        },
        // 旋转到前一张图片
        rotatePrev() {
            this.autoRotateDirection = -1; // 改变自动旋转方向
            this.rotateCarousel(-1); // 向前旋转
        },
        // 旋转到后一张图片
        rotateNext() {
            this.autoRotateDirection = 1; // 改变自动旋转方向
            this.rotateCarousel(1); // 向后旋转
        },
        // 开始自动旋转
        startAutoRotate() {
            this.stopAutoRotate(); // 清除之前的定时器，避免多个定时器干扰
            this.autoRotateInterval = setInterval(() => this.rotateCarousel(this.autoRotateDirection), 2000);
        },
        // 停止自动旋转
        stopAutoRotate() {
            clearInterval(this.autoRotateInterval);
        },
        // 处理页面可见性变化的回调函数
        handleVisibilityChange() {
            if (document.visibilityState === 'visible') {
                this.startAutoRotate(); // 页面重新可见时，重新启动自动旋转
            } else {
                this.stopAutoRotate(); // 页面不可见时，停止自动旋转
            }
        }
    }
};
</script>

<style scoped>
/* 容器样式 */
.contain_box {
    width: 100%;
    height: calc(100vh - 4.2rem);
    /* 视口的高度减去顶部的导航栏高度 */
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;
    /* 外框样式 */
    background-image: url('@/assets/bgc.jpg');
    background-size: 100% 100%;
}

/* 轮播图样式 */
.carousel {
    position: relative;
    width: 80vw;
    /* 适应视口宽度 */
    height: 80vw;
    /* 保持长宽比 */
    max-width: 260px;
    /* 设置最大宽度 */
    max-height: 260px;
    /* 设置最大高度 */
    perspective: 4000px;
    /* 增加透视效果 */
}

/* 轮播图内层样式 */
.carousel-inner {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 1s;
    /* 旋转平滑过渡 */
    transform: rotateX(-4deg);
    /* 旋转角度 */
}

/* 每个轮播项的样式 */
.carousel-item {
    border: 1px solid #f9e006;
    /* 每个轮播项的边框 */
    position: absolute;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    background-position: center;
    transform: rotateY(0deg) translateZ(0px);
}

/* 控制按钮样式 */
.controls {
    position: absolute;
    top: 50%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    transform: translateY(-50%);
}

.button {
    background: rgba(0, 0, 0, 0.5);
    /* 按钮背景 */
    color: white;
    /* 按钮文字颜色 */
    border: none;
    /* 无边框 */
    padding: 10px;
    cursor: pointer;
    /* 鼠标样式 */
    font-size: 18px;
    /* 文字大小 */
    width: 40px;
    /* 按钮宽度 */
    height: 40px;
    /* 按钮高度 */
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
