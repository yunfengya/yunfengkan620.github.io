<template>
  <div class="contain_box">
    <el-button type="success" icon="el-icon-edit" round :disabled="gonggaoFlag" @click="openGongGao()">打开公告<i class="el-icon-upload el-icon--right"></i></el-button>
    <!-- <h1>首页</h1> -->
    <!-- 可根据 v-if 判断 用户是否有工告消息，进行显示 -->
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
      gonggaoFlag:false,
    };
  },
  watch: {},
  created() { },
  methods: {
    closeGongGao(){
      this.gonggaoFlag=false;
    },
    openGongGao(){
      this.gonggaoFlag=true;
    }
  },
};
</script>

<style scoped lang="scss">
.contain_box {
  width: 100%;
  height: 100%;
  overflow: auto;

  // h1 {
  //   font-size: 3rem;
  //   color: #b4a4a4;
  //   text-align: center;
  // }

  .DVD_box {
    z-index: 1111;
    position: relative;
    width: 200px;
    height: 100px;
    background-color: #cbc7c7;
    border: 3px solid #659a03;

    display: flex;
    justify-content: center;
    align-items: center;
    
    .title {
      color: #659a03;
      font-size: 20px;
      font-weight: 600;
    }
    .bg_img{
      width: 50px;
      height: 50px;
      background: url("~@/assets/cartoonFigure.png") no-repeat;
      background-size: 100% auto;
    }
    /* animation: horizontal 6s infinite -2.8s linear alternate,
      vertical 8s infinite -4.2s linear alternate;
      animation-composition: accumulate; */
    animation: horizontal 16s infinite 0s linear alternate,
    vertical 18s infinite 0s linear alternate;
    animation-composition: accumulate;
  }

  /* 停止动画 */
  .DVD_box:hover {
    animation-play-state: paused;
  }

  @keyframes horizontal {
    from {
      transform: translateX(0);
    }

    to {
      // transform: translateX(calc(100vw - 100%));
      transform: translateX(calc(100vw - 100% - 200px - 20px));
    }
  }

  @keyframes vertical {
    from {
      transform: translateY(0);
    }

    to {
      transform: translateY(calc(100vh - 100% - 55px - 20px));
    }
  }


}
</style>