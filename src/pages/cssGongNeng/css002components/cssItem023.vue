<template>
  <div class="wrapper">
    <!-- 第一个跑马灯 -->
    <div class="marquee">
      <div class="marquee-content" :style="{ animationDuration: `${duration}s` }">
        <div 
          v-for="(item, index) in items.concat(items)" 
          :key="index" 
          class="item"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
    
    <!-- 第二个跑马灯（反向） -->
    <div class="marquee">
      <div 
        class="marquee-content" 
        :style="{ 
          animationDuration: `${duration}s`,
          animationDirection: 'reverse',
          marginLeft: '-100px'
        }"
      >
        <div 
          v-for="(item, index) in items2.concat(items2)" 
          :key="index + items2.length" 
          class="item"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      duration: 20, // 动画持续时间
      items: [
        { text: '卡片1' },
        { text: '卡片2' },
        { text: '卡片3' },
        { text: '卡片4' },
        { text: '卡片5' },
        { text: '卡片6' },
        { text: '卡片7' },
        { text: '卡片8' }
      ],
      items2: [
        { text: '卡片1' },
        { text: '卡片2' },
        { text: '卡片3' },
        { text: '卡片4' },
        { text: '卡片5' },
        { text: '卡片6' },
        { text: '卡片7' },
        { text: '卡片8' }
      ],
    }
  }
}
</script>

<style scoped>
.wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow: hidden;
    /* padding: 20px; */
}

.marquee {
  display: flex;
  overflow: hidden;
  user-select: none;
  gap: 20px;
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
}

.marquee-content {
  display: flex;
  gap: 20px;
  animation: scroll linear infinite;
}

.item {
  width: 200px;
  height: 100px;
  background-color: #b4b0b0;
  border-radius: 6px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-50% - 10px)); }
}

/* 添加鼠标悬停暂停动画的样式 */
.marquee:hover .marquee-content {
  animation-play-state: paused;
}
</style>