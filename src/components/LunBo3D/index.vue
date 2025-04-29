<template>
  <div 
    class="carousel-container"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- 主轮播容器 -->
    <div class="carousel" :style="containerStyle">
      <div class="carousel-inner" :style="innerStyle">
        <!-- 使用 v-for 渲染轮播项 -->
        <div 
          v-for="(item, index) in items" 
          :key="getKey(item, index)" 
          class="carousel-item"
          :style="getItemStyle(index)"
        >
          <!-- 使用作用域插槽让父组件自定义内容 -->
          <slot :item="item" :index="index">
            <!-- 默认内容 -->
            {{ item }}
          </slot>
        </div>
      </div>
    </div>
    
    <!-- 左右控制按钮 - 移到容器外部 -->
    <div v-if="showControls" class="controls">
      <button class="button prev" @click="rotatePrev">&lt;</button>
      <button class="button next" @click="rotateNext">&gt;</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Carousel3D",
  props: {
    items: {
      type: Array,
      default: () => [1, 2, 3, 4, 5, 6, 7]
    },
    autoplay: {
      type: Number,
      default: 2000
    },
    direction: {
      type: String,
      default: 'next',
      validator: value => ['next', 'prev'].includes(value)
    },
    showControls: {
      type: Boolean,
      default: true
    },
    baseRadius: {
      type: Number,
      default: 500
    },
    minRadius: {
      type: Number,
      default: 300
    },
    perspective: {
      type: Number,
      default: 4000
    },
    tiltAngle: {
      type: Number,
      default: -4
    },
    transitionDuration: {
      type: Number,
      default: 1000
    },
    width: {
      type: [String, Number],
      default: '80vw'
    },
    height: {
      type: [String, Number],
      default: '80vw'
    },
    maxWidth: {
      type: [String, Number],
      default: 260
    },
    maxHeight: {
      type: [String, Number],
      default: 260
    },
    backgroundColor: {
      type: String,
      default: '#9cabc8'
    }
  },
  data() {
    return {
      currentAngle: 0,
      autoRotateInterval: null,
      isHovering: false
    };
  },
  computed: {
    angleStep() {
      return 360 / this.items.length;
    },
    radius() {
      const minRadius = this.minRadius;
      return Math.max(this.baseRadius / (2 * Math.tan(Math.PI / this.items.length)) + 100, minRadius);
    },
    containerStyle() {
      return {
        width: typeof this.width === 'number' ? `${this.width}px` : this.width,
        height: typeof this.height === 'number' ? `${this.height}px` : this.height,
        maxWidth: typeof this.maxWidth === 'number' ? `${this.maxWidth}px` : this.maxWidth,
        maxHeight: typeof this.maxHeight === 'number' ? `${this.maxHeight}px` : this.maxHeight,
        perspective: `${this.perspective}px`
      };
    },
    innerStyle() {
      return {
        transform: `rotateX(${this.tiltAngle}deg) rotateY(${this.currentAngle}deg)`,
        transition: `transform ${this.transitionDuration}ms`
      };
    },
    autoRotateDirection() {
      return this.direction === 'next' ? 1 : -1;
    }
  },
  mounted() {
    this.updateCarousel();
    
    if (this.autoplay > 0) {
      this.startAutoRotate();
    }

    window.addEventListener('resize', this.updateCarousel);
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateCarousel);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    this.stopAutoRotate();
  },
  methods: {
    getKey(item, index) {
      return item.id !== undefined ? item.id : index;
    },
    getItemStyle(index) {
      return {
        transform: `rotateY(${index * this.angleStep}deg) translateZ(${this.radius}px)`
      };
    },
    updateCarousel() {
      // 更新逻辑
    },
    rotateCarousel(step) {
      this.currentAngle += step * this.angleStep;
    },
    rotatePrev() {
      this.$emit('prev');
      this.rotateCarousel(-1);
    },
    rotateNext() {
      this.$emit('next');
      this.rotateCarousel(1);
    },
    startAutoRotate() {
      this.stopAutoRotate();
      if (this.autoplay > 0) {
        this.autoRotateInterval = setInterval(() => {
          if (!this.isHovering) {  // 只有不在悬停状态时才自动旋转
            this.rotateCarousel(this.autoRotateDirection);
            this.$emit('autoplay');
          }
        }, this.autoplay);
      }
    },
    stopAutoRotate() {
      clearInterval(this.autoRotateInterval);
    },
    handleVisibilityChange() {
      if (document.visibilityState === 'visible') {
        this.startAutoRotate();
      } else {
        this.stopAutoRotate();
      }
    },
    handleMouseEnter() {
      this.isHovering = true;
      this.$emit('mouseenter');
    },
    handleMouseLeave() {
      this.isHovering = false;
      this.$emit('mouseleave');
    }
  }
};
</script>

<style scoped>
.carousel-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: v-bind(backgroundColor);
}

/* 轮播图样式 */
.carousel {
  position: relative;
  perspective: 4000px;
  width: 100%;
  height: 100%;
}

/* 轮播图内层样式 */
.carousel-inner {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 1s;
}

/* 每个轮播项的样式 */
.carousel-item {
  /* color: aqua; */
  border: 1px dashed aqua;
  /* border-radius: 20%; */
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 控制按钮样式 - 重新设计 */
.controls {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* 允许点击穿透到轮播图 */
}
.carousel-container:hover .button{
  opacity: 1;
}
.button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 18px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto; /* 恢复按钮点击事件 */
  border-radius: 50%;
  opacity: 0;
  transition: all 0.3s ease;
}

.button:hover {
  background: rgba(0, 0, 0, 0.8);
}

.button.prev {
  left: 10px;
}

.button.next {
  right: 10px;
}
</style>