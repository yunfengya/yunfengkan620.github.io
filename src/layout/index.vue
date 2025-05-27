<template>
  <div class="wrapper">
    <div class="container" :class="classObj">
      <!-- <div
        class="sidebar-container"
        :style="{ width: sidebar ? '54px' : '220px' }"
      >
        <sidebar></sidebar>
      </div> -->
      <el-container>
        <el-aside :style="{ width: sidebar ? '54px' : '200px' }">
                   
          <div class="sidebar-container">        <sidebar></sidebar>      </div>
                 
        </el-aside>

        <el-main class="main">
          <div class="main_hd">
            <Header></Header>
          </div>
          <div class="main_content">
            <Main> </Main>
          </div>
        </el-main>
      </el-container>
      <!-- <div class="main">
        <Header></Header>
        <Main> </Main>
      </div> -->
      
      <!-- AI 图标 GIF -->
      <div v-dragDiv class="dragDiv">
        <i @mousedown="mouseDown()" @mouseup="mouseUp()" class="AI_bg" ></i>
      </div>
      <!-- AI dialog -->
      <AIDialog ref="AIDialog"></AIDialog>
    </div>
  </div>
</template>
<script>
import Main from './components/main.vue'
import sidebar from './components/sidebar.vue'
import Header from './components/header.vue'
import AIDialog from '@/components/AIDialog/index.vue'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['sidebar']),
    classObj() {
      return {
        hideSidebar: this.sidebar,
      }
    },
  },
  components: {
    sidebar,
    Header,
    Main,
    AIDialog,
  },
  name: 'Layout',
  data() {
    return {
      firstTime: null,
    }
  },
  created() {
    // console.log(this.$route, '路由模块')
  },
  watch: {
    $route(route) {},
  },
  methods: {
    mouseDown(){
      this.firstTime = new Date().getTime()
    },
    mouseUp(){
      const lastTime = new Date().getTime()
      if ((lastTime - this.firstTime) < 200) {
          this.$refs.AIDialog.dialogVisibleFn()
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../style/sidebar.scss';
.wrapper {
  position: relative;
  height: 100vh;
}
.container {
  // min-height: calc(100vh - 84px);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.sidebar-container {
  width: 200px;
}
.main {
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
  // overflow: hidden;
  // box-sizing: border-box;
  // padding: 20px;
}
// ::v-deep .el-header {
//   padding: 0;
// }
::v-deep .el-main {
  padding: 0px;
}
::v-deep .el-aside {
  transition: 0.5s ease-in;
}
.main_hd {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 110;
}
.main_content {
  // flex: 1;
  height: calc(100% - 54px);
  overflow: hidden;
  padding-top: 54px;
}

// AI

.dragDiv {
    width: 60px;
    height: 60px;
    cursor: move;
    z-index: 999999;
    position: absolute;
    bottom: 4rem;
    right: 6rem;
    .AI_bg{
      display: inline-block;
      width: 60px;
      height: 60px;
      background: url("~@/assets/AI/smt.gif") no-repeat center;
      background-size: 60px 60px;
    }
}
</style>
