<template>
  <div class="contain_box">
    <div class="ex1_box">
      <ResizableDivs_X_Y
        direction="horizontal"
        defaultPrimarySize="30%"
        minPrimarySize="20%"
        maxPrimarySize="50%"
      >
        <template v-slot:div1>
          <div class="content">
            <p>左侧 Div 内容</p>
          </div>
        </template>
        <template v-slot:div2>
          <div class="content">
            <p>右侧 Div 内容</p>
          </div>
        </template>
      </ResizableDivs_X_Y>
    </div>
    <div class="ex2_box">
      <ResizableDivs_X_Y
        direction="vertical"
        defaultPrimarySize="30%"
        minPrimarySize="20%"
        maxPrimarySize="50%"
      >
        <template v-slot:div1>
          <div class="content">
            <p>上方 Div 内容</p>
          </div>
        </template>
        <template v-slot:div2>
          <div class="content">
            <p>下方 Div 内容</p>
          </div>
        </template>
      </ResizableDivs_X_Y>
    </div>
  </div>
</template>

<script>
import ResizableDivs_X_Y from "@/components/ResizableDivs/ResizableDivs_X_Y";
export default {
  name: "index",
  components: {
    ResizableDivs_X_Y,
  },
  data() {
    return {};
  },
  mounted() {},
  beforeDestroy() {},
  methods: {},
};
</script>

<style scoped lang="scss">
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

  .ex1_box {
    width: 50%;
    height: 100%;
    border: 3px solid #bfad39;
  }
  .ex2_box {
    width: 50%;
    height: 100%;
    border: 3px dashed #47ae10;
  }
}
</style>
