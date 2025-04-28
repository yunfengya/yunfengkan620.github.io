<template>
  <div class="carousel-container">
    <div class="carousel-wrapper">
      <div 
        v-for="(item, index) in visibleItems" 
        :key="item.id" 
        class="carousel-item"
        :class="getItemClass(index)"
        :style="{ backgroundColor: item.color }"
        @click="goTo(index)"
      >
        <div class="item-content">{{ item.title }}</div>
      </div>
    </div>
    
    <button class="nav-button prev-button" @click="prev">‹</button>
    <button class="nav-button next-button" @click="next">›</button>
  </div>
</template>

<script>
export default {
  props: {
    visibleCount: {
      type: Number,
      default: 5,
      validator: value => value >= 1
    }
  },
  data() {
    return {
      currentIndex: 0,
      items: [
        { id: 1, color: '#FF5733', title: '项目1' },
        { id: 2, color: '#33FF57', title: '项目2' },
        { id: 3, color: '#3357FF', title: '项目3' },
        { id: 4, color: '#F333FF', title: '项目4' },
        { id: 5, color: '#33FFF5', title: '项目5' },
        { id: 6, color: '#FF33A1', title: '项目6' },
        { id: 7, color: '#33FFA1', title: '项目7' },
        // 更多项目...
      ]
    }
  },
  computed: {
    visibleItems() {
      const result = [];
      const centerOffset = Math.floor(this.items.length / 2);
      
      for (let i = -centerOffset; i <= centerOffset; i++) {
        let index = (this.currentIndex + i + this.items.length) % this.items.length;
        result.push(this.items[index]);
        
        // 如果项目数量不足，停止添加
        if (result.length >= this.items.length) {
          break;
        }
      }
      
      return result;
    },
    centerIndex() {
      return Math.floor(this.items.length / 2);
    }
  },
  methods: {
    getItemClass(index) {
      const center = this.centerIndex;
      const distance = Math.abs(index - center);
      
      // 确保中间卡片总是active
      const isActive = index === center;
      
      return {
        'active': isActive,
        'near': distance === 1,
        'far': distance === 2,
        'hidden': distance > 2
      };
    },
    prev() {
      this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    },
    next() {
      this.currentIndex = (this.currentIndex + 1) % this.items.length;
    },
    goTo(index) {
      const centerIndex = this.centerIndex;
      const diff = index - centerIndex;
      this.currentIndex = (this.currentIndex + diff + this.items.length) % this.items.length;
    }
  }
}
</script>

<style scoped>
/* 样式保持不变 */
.carousel-container {
  position: relative;
  width: 100%;
  height: 50vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 2%;
}

.carousel-item {
  flex-shrink: 0;
  position: relative;
  width: 15%;
  height: 60%;
  transition: all 0.5s ease;
  cursor: pointer;
  z-index: 1;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-content {
  color: white;
  font-size: 2vw;
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

/* 中心项目样式 */
.carousel-item.active {
  width: 20%;
  height: 70%;
  z-index: 5;
  transform: none;
}

/* 邻近项目样式 */
.carousel-item.near {
  width: 18%;
  height: 65%;
  z-index: 4;
  opacity: 0.9;
}

.carousel-item.near:not(.active) {
  transform: translateX(var(--translate-x)) scale(0.9);
}

/* 较远项目样式 */
.carousel-item.far {
  width: 16%;
  height: 60%;
  z-index: 3;
  opacity: 0.7;
}

.carousel-item.far:not(.active) {
  transform: translateX(var(--translate-x)) scale(0.8);
}

/* 隐藏项目 */
.carousel-item.hidden {
  opacity: 0;
  z-index: 0;
  transform: scale(0.7);
}

/* 导航按钮 */
.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  cursor: pointer;
  z-index: 20;
}

.nav-button:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-50%) scale(1.1);
}

.prev-button {
  left: 2%;
}

.next-button {
  right: 2%;
}
</style>