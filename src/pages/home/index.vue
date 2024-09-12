<template>
  <div class="contain_box">
    <!-- 正文 -->
    <el-scrollbar class="scrollbar_box" ref="">
      <el-button type="success" icon="el-icon-edit" round :disabled="gonggaoFlag" @click="openGongGao()">打开公告<i
          class="el-icon-upload el-icon--right"></i>
      </el-button>
      <div style=""><a href="https://juejin.cn/" target="_blank">掘金</a></div>
    </el-scrollbar>

    <!-- 悬浮不影响正文 -->
    <!-- 可根据 v-if 判断 用户是否有公告消息，进行显示 -->
    <div class="DVD_box" v-show="gonggaoFlag">
      <div class="bg_img"></div>
      <div class="title">暂无新功能！</div>
      <div @click="closeGongGao()" style="color:blueviolet;font-size:20px; font-weight:900;cursor:pointer;"> X </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "index",
  components: {},
  data() {
    return {
      // 遮罩层
      loading: true,
      gonggaoFlag: false,
    };
  },
  watch: {},
  created() { },
  methods: {
    closeGongGao() {
      this.gonggaoFlag = false;
    },
    openGongGao() {
      this.gonggaoFlag = true;
    }
  },
};
</script>

<style scoped lang="scss">
.contain_box {
  width: 100%;
  height: 100%;
  // overflow: auto;

  ::v-deep .scrollbar_box {
    width: 100%;
    height: 100%;
    .el-scrollbar__wrap {
      // overflow: hidden;
      width: 100%;
      height: 100% !important;
      .el-scrollbar__view {
        width: 100%;
        height: 100% !important;
      }
    }
    .el-scrollbar__thumb {
      background-color: #53c2d3;
    }
    // 清除原生滚动条
    ::-webkit-scrollbar {
      width: 0px; 
      background: transparent; 
    }
  }
}

.DVD_box {
  z-index: 9999;
  /* Ensure the box appears above other elements */
  position: fixed;
  /* Changed to fixed to stay in viewport */
  width: 200px;
  height: 100px;
  background-color: #cbc7c7;
  border: 3px solid #659a03;
  display: flex;
  justify-content: center;
  align-items: center;
  /* Animation styles */
  animation: horizontal 16s infinite linear alternate,
    vertical 18s infinite linear alternate;
  animation-composition: accumulate;
  /* Start from the top */
  top: 0;
  /* Start from the left */
  left: 0;

  .bg_img {
    width: 50px;
    height: 50px;
    background: url("~@/assets/cartoonFigure.png") no-repeat;
    background-size: 100% auto;
  }

  .title {
    color: #659a03;
    font-size: 20px;
    font-weight: 600;
  }
}

.DVD_box:hover {
  animation-play-state: paused;
  /* Pause animation on hover */
}

@keyframes horizontal {
  from {
    transform: translateX(0);
  }

  to {
    // 200px是公告盒子的尺寸
    transform: translateX(calc(100vw - 200px - 6px));
    /* Adjust for width and margin */
  }
}

@keyframes vertical {
  from {
    transform: translateY(0);
  }

  to {
    // 100px是公告盒子的尺寸
    transform: translateY(calc(100vh - 100px - 6px));
    /* Adjust for height and margin */
  }
}
</style>