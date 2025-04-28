<template>
  <div class="carousel-container">
    <div class="carousel-wrapper">
      <div 
        v-for="(item, index) in visibleItems" 
        :key="item.id" 
        class="carousel-item"
        :class="getItemClass(index)"
        :style="{ 
          backgroundColor: item.color,
          '--translate-x': getTranslateX(index),
          'z-index': getZIndex(index)
        }"
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
  data() {
    return {
      currentIndex: 0,
      items: [
        { id: 1, color: '#FF5733', title: '项目1' },
        { id: 2, color: '#33FF57', title: '项目2' },
        { id: 3, color: '#3357FF', title: '项目3' },
        { id: 4, color: '#F333FF', title: '项目4' },
        { id: 5, color: '#33FFF5', title: '项目5' },
        // { id: 6, color: '#FF33A1', title: '项目6' },
        // { id: 7, color: '#33FFA1', title: '项目7' },
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
    getTranslateX(index) {
      const center = this.centerIndex;
      const distance = index - center;
      return `${distance * 50}%`;// 将间距从 30% 增加到 40%
    },
    getZIndex(index) {
      const center = this.centerIndex;
      const distance = Math.abs(index - center);
      return 10 - distance;
    },
    getItemClass(index) {
      const center = this.centerIndex;
      const distance = Math.abs(index - center);
      
      return {
        'active': index === center,
        'near': distance === 1,
        'far': distance === 2,
        'hidden': distance > 2// 添加隐藏逻辑，当左右卡片距离大于2时设置为hidden类
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
.carousel-container {
  position: relative;
  width: 100%;
  height: 60vh;
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
  height: 50%;
  position: relative;
  /* 倒影 */
  -webkit-box-reflect: below 1px linear-gradient(transparent 10%, #0005);
}

.carousel-item {
  /* 添加平滑过渡效果 */
  transition: all 0.3s ease; 
  /*  */
  position: absolute;
  width: 25%;
  height: 70%;
  cursor: pointer;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(var(--translate-x)) scale(var(--scale, 1));
  /* 可下移位置 */
  /* transform: translateX(var(--translate-x)) translateY(var(--translate-y, 0)) scale(var(--scale, 1)); */
   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.item-content {
  color: white;
  font-size: 2vw;
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

/* 中心项目样式 */
.carousel-item.active {
  --scale: 1;
  width: 30%;
  height: 80%;
  z-index: 10;
  transform: translateX(var(--translate-x)) scale(1);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
}

/* 邻近项目样式 */
.carousel-item.near {
  /* --translate-y: 5%; */
  /* 从 0.85 调整为 0.8 */
  --scale: 0.85;
  /*  */
  width: 28%;
  height: 75%;
  opacity: 0.9;
}

/* 较远项目样式 */
.carousel-item.far {
  /* --translate-y: 10%; */
  --scale: 0.7;
  width: 26%;
  height: 70%;
  opacity: 0.7;
}

/* 隐藏项目 */
.carousel-item.hidden {
  --scale: 0.5;
  opacity: 0;
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