<template>
  <div class="contain_box">
    <!-- 正文 -->
    <ResizableDivsXY direction="horizontal" defaultPrimarySize="95%" minPrimarySize="10%" maxPrimarySize="95%">
      <template v-slot:div1>
        <MyScrollBar :scrollbar-width="'8px'" :scrollbar-height="'8px'" :scrollbar-color="'rgba(64, 158, 255, 0.4)'">
          <div class="tabDiv">
            <el-table border :data="tableData" style="width: 100%">
                <el-table-column prop="" label="名称" width="" align="center"> 
                  <template slot-scope="scope">
                    {{ scope.row.name }}
                  </template>
                </el-table-column>
                <el-table-column prop="" label="描述" width="" align="center">
                  <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                      <p>名称: {{ scope.row.name||'--' }}</p>
                      <p>描述: {{ scope.row.desc || '--' }}</p>
                      <div slot="reference" class="name-wrapper">
                        <el-link v-if="scope.row.status=='1'" type="danger">查看</el-link>
                        <el-link v-if="scope.row.status=='2'" type="info">查看</el-link>
                      </div>
                    </el-popover>
                  </template>
                </el-table-column>
            </el-table>
          </div>
        </MyScrollBar>
      </template>
      <template v-slot:div2>
        <MyScrollBar :scrollbar-width="'8px'" :scrollbar-height="'8px'" :scrollbar-color="'rgba(64, 158, 255, 0.4)'">
          <div style="text-align:right;">
            <el-button type="success" icon="el-icon-edit" round :disabled="gonggaoFlag" @click="openGongGao()">打开公告<i
              class="el-icon-upload el-icon--right"></i>
            </el-button>
          </div>
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
        </MyScrollBar>
      </template>
    </ResizableDivsXY>

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
import ResizableDivsXY from "@/components/ResizableDivs/ResizableDivsXY";
import MyScrollBar from '@/components/myScrollBar/index.vue';
import Card from './components/card.vue'; // 记得调整路径
export default {
  name: "index",
  components: {
    ResizableDivsXY,
    MyScrollBar,
    Card,
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      gonggaoFlag: false,
      linkList:[
        { name:'gpt3.5',linkstring:'https://chat.dogai.vip/list#/car',imgUrl:require('@/assets/book_img.png')},
        { name:'作品赚米',linkstring:'https://www.hereitis.cn/',imgUrl:require('@/assets/book_img.png')},

        { name:'不求人导航',linkstring:'https://www.bqrdh.com',imgUrl:require('@/assets/book_img.png')},
        { name:'星云导航',linkstring:'https://www.xygalaxy.com/',imgUrl:require('@/assets/book_img.png')},
        { name:'fly63工具',linkstring:'https://www.fly63.com/tool/home.html',imgUrl:require('@/assets/book_img.png')},
        { name:'编程速查表',linkstring:'https://www.isqqw.com/ref/index.html',imgUrl:require('@/assets/book_img.png')},

        { name:'动画集合',linkstring:'https://uiverse.io/elements',imgUrl:require('@/assets/book_img.png')},
        { name:'css阴影制作',linkstring:'https://neumorphism.io/',imgUrl:require('@/assets/book_img.png')},
        { name:'button动画',linkstring:'https://www.webhek.com/post/css3-animation-sniplet-collection/#/',imgUrl:require('@/assets/book_img.png')},
        { name:'css动效',linkstring:'https://qishaoxuan.github.io/css_tricks/',imgUrl:require('@/assets/book_img.png')},
        { name:'Emoji大全',linkstring:'https://www.emojiall.com/zh-hans',imgUrl:require('@/assets/book_img.png')},
        
        { name:'office文件转化工具',linkstring:'https://www.ilovepdf.com/zh-cn',imgUrl:require('@/assets/book_img.png')},
        { name:'博客园',linkstring:'https://www.cnblogs.com/',imgUrl:require('@/assets/book_img.png')},
        { name:'菜鸟工具',linkstring:'https://www.jyshare.com/',imgUrl:require('@/assets/book_img.png')},
        { name:'岩石教学',linkstring:'https://www.rss1.cn/front',imgUrl:require('@/assets/book_img.png')},
        { name:'掘金',linkstring:'https://juejin.cn/',imgUrl:require('@/assets/book_img.png')},
        { name:'echarts文档',linkstring:'https://echarts.apache.org/zh/cheat-sheet.html',imgUrl:require('@/assets/book_img.png')},
        { name:'echarts案例',linkstring:'https://madeapie.com/#/',imgUrl:require('@/assets/book_img.png')},
        { name:'three.js',linkstring:'https://www.three3d.cn/docs/index.html',imgUrl:require('@/assets/book_img.png')},
        
        { name:'花瓣',linkstring:'https://huaban.com/',imgUrl:require('@/assets/book_img.png')},
        { name:'透明图制作',linkstring:'https://inkpx.com/',imgUrl:require('@/assets/book_img.png')},
        { name:'图片素材',linkstring:'https://pixabay.com/zh/',imgUrl:require('@/assets/book_img.png')},
      ],
      itemLink: '', // 存储当前卡片的链接

      tableData: [
        {
          name: "基于vue3通用的后台管理模板", status: "1",// 1 红色待研究  2 灰色已完成
          desc: `
          掘金：https://juejin.cn/post/7482988000948813860
          github地址：https://github.com/jinxudong996/admin-pro
          `,
        },
        {
          name: " 官方推荐 🔥 RuoYi-Vue 全新 Pro 版本，优化重构所有功能。基于 Spring Boot + MyBatis Plus + Vue & Element 实现的后台管理系统 + 微信小程序，支持 RBAC 动态权限、数据权限、SaaS 多租户、Flowable 工作流、三方登录、支付、短信、商城", status: "2",
          desc: `若依新版：https://gitee.com/zhijiantianya/ruoyi-vue-pro`,
        },
      ],
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

  .cardList_box{
    display: flex;
    flex-wrap: wrap;
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
    background: url("~@/assets/dan.png") no-repeat;
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