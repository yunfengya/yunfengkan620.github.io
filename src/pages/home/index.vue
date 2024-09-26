<template>
  <div class="contain_box">
    <!-- 正文 -->
    <el-scrollbar class="scrollbar_box" ref="">
      <div style="text-align:right;">
        <el-button type="success" icon="el-icon-edit" round :disabled="gonggaoFlag" @click="openGongGao()">打开公告<i
          class="el-icon-upload el-icon--right"></i>
        </el-button>
      </div>
      <!--  -->
      <div class="cardList_box">
        <div v-for="(item,index) in linkList" :key="index" @click="toLinkFn(item.linkstring)">
          <Card
            :content="`${item.name}`"
            :imgUrl="`${item.imgUrl}`"
            :link="itemLink"
            ref="Card"
          />
        </div>
      </div>
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
import Card from './components/card.vue'; // 记得调整路径
export default {
  name: "index",
  components: {
    Card,
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      gonggaoFlag: false,
      linkList:[
        { name:'gpt3.5',linkstring:'https://chat.dogai.vip/list#/car',imgUrl:'	https://chat.dogai.vip/list/logo.png'},

        { name:'不求人导航',linkstring:'https://www.bqrdh.com',imgUrl:'https://tools.bqrdh.com/static/images/favicon_fox.png'},
        { name:'星云导航',linkstring:'https://www.xygalaxy.com/',imgUrl:'https://www.xygalaxy.com/favicon.ico'},
        { name:'fly63工具',linkstring:'https://www.fly63.com/tool/home.html',imgUrl:''},
        { name:'编程速查表',linkstring:'https://www.isqqw.com/ref/index.html',imgUrl:'data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%221em%22%20width%3D%221em%22%3E%20%3Cpath%20d%3D%22m21.66%2010.44-.98%204.18c-.84%203.61-2.5%205.07-5.62%204.77-.5-.04-1.04-.13-1.62-.27l-1.68-.4c-4.17-.99-5.46-3.05-4.48-7.23l.98-4.19c.2-.85.44-1.59.74-2.2%201.17-2.42%203.16-3.07%206.5-2.28l1.67.39c4.19.98%205.47%203.05%204.49%207.23Z%22%20fill%3D%22%23c9d1d9%22%2F%3E%20%3Cpath%20d%3D%22M15.06%2019.39c-.62.42-1.4.77-2.35%201.08l-1.58.52c-3.97%201.28-6.06.21-7.35-3.76L2.5%2013.28c-1.28-3.97-.22-6.07%203.75-7.35l1.58-.52c.41-.13.8-.24%201.17-.31-.3.61-.54%201.35-.74%202.2l-.98%204.19c-.98%204.18.31%206.24%204.48%207.23l1.68.4c.58.14%201.12.23%201.62.27Zm2.43-8.88c-.06%200-.12-.01-.19-.02l-4.85-1.23a.75.75%200%200%201%20.37-1.45l4.85%201.23a.748.748%200%200%201-.18%201.47Z%22%20fill%3D%22%23228e6c%22%20%2F%3E%20%3Cpath%20d%3D%22M14.56%2013.89c-.06%200-.12-.01-.19-.02l-2.91-.74a.75.75%200%200%201%20.37-1.45l2.91.74c.4.1.64.51.54.91-.08.34-.38.56-.72.56Z%22%20fill%3D%22%23228e6c%22%20%2F%3E%20%3C%2Fsvg%3E'},

        { name:'动画集合',linkstring:'https://uiverse.io/elements',imgUrl:'https://uiverse.io//favicon-32x32.png'},
        { name:'css阴影制作',linkstring:'https://neumorphism.io/',imgUrl:'https://neumorphism.io/favicon.ico'},
        { name:'button动画',linkstring:'https://www.webhek.com/post/css3-animation-sniplet-collection/#/',imgUrl:'https://qishaoxuan.github.io/css_tricks/images/favicon.png'},
        { name:'css动效',linkstring:'https://qishaoxuan.github.io/css_tricks/',imgUrl:'https://www.webhek.com/post/css3-animation-sniplet-collection/public/assets/ico/favicon.png'},
        { name:'Emoji大全',linkstring:'https://www.emojiall.com/zh-hans',imgUrl:'https://www.emojiall.com/logo-white.png'},
        
        { name:'博客园',linkstring:'https://www.cnblogs.com/',imgUrl:'	https://www.cnblogs.com/images/logo.svg?v=2SMrXdIvlZwVoB1akyXm38WIKuTHVqvGD0CweV-B6cY'},
        { name:'菜鸟工具',linkstring:'https://www.jyshare.com/',imgUrl:'https://www.runoob.com/wp-content/uploads/2014/04/cxy.jpg'},
        { name:'掘金',linkstring:'https://juejin.cn/',imgUrl:'https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/static/favicons/apple-touch-icon.png'},
        { name:'echarts文档',linkstring:'https://echarts.apache.org/zh/cheat-sheet.html',imgUrl:'https://echarts.apache.org/zh/images/favicon.png'},
        { name:'echarts案例',linkstring:'https://madeapie.com/#/',imgUrl:'https://madeapie.com/favicon.ico'},
        { name:'three.js',linkstring:'https://www.three3d.cn/docs/index.html',imgUrl:'https://www.three3d.cn/files/favicon.ico'},
        
        { name:'花瓣',linkstring:'https://huaban.com/',imgUrl:'https://st0.dancf.com/static/02/202306090204-51f4.png'},
        { name:'透明图制作',linkstring:'https://inkpx.com/',imgUrl:'https://inkpx.com/static/img/inkpx-512x512.png'},
        { name:'图片素材',linkstring:'https://pixabay.com/zh/',imgUrl:'https://pixabay.com/favicon-32x32.png'},
      ],
      itemLink: '' // 存储当前卡片的链接
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
    },
    toLinkFn(item){
      this.itemLink = `${item}`; // 设置当前的链接
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
        .cardList_box{
          display: flex;
          flex-wrap: wrap;
        }
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