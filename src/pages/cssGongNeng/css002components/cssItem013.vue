<template>
  <div class="contain_box">
    <ResizableDivsXY
        direction="horizontal"
        defaultPrimarySize="30%"
        minPrimarySize="20%"
        maxPrimarySize="50%"
      >
        <template v-slot:div1>
          <div class="content">
            左侧 Div 内容
          </div>
        </template>
        <template v-slot:div2>
          <!-- <div class="content">
            右侧 Div 内容
          </div> -->
            <ResizableDivsXY
                direction="vertical"
                defaultPrimarySize="30%"
                minPrimarySize="20%"
                maxPrimarySize="50%"
            >
                <template v-slot:div1>
                    <div class="content">
                        上方 Div 内容
                    </div>
                </template>
                <template v-slot:div2>
                    <div class="content">
                        下方 Div 内容
                    </div>
                </template>
            </ResizableDivsXY>
        </template>
    </ResizableDivsXY>
    <!-- <ResizableDivsXY
        direction="horizontal"
        defaultPrimarySize="30%"
        minPrimarySize="20%"
        maxPrimarySize="50%"
      >
        <template v-slot:div1>
          <div class="content">
            左侧 Div 内容
          </div>
        </template>
        <template v-slot:div2>
          <div class="content">
            右侧 Div 内容
          </div>
        </template>
    </ResizableDivsXY> -->

    <!-- <ResizableDivsXY
        direction="vertical"
        defaultPrimarySize="30%"
        minPrimarySize="20%"
        maxPrimarySize="50%"
      >
        <template v-slot:div1>
          <div class="content">
            上方 Div 内容
          </div>
        </template>
        <template v-slot:div2>
          <div class="content">
            下方 Div 内容
          </div>
        </template>
    </ResizableDivsXY> -->
  </div>
</template>

<script>
import ResizableDivsXY from "@/components/ResizableDivs/ResizableDivsXY";
export default {
  name: "index",
  components: {
    ResizableDivsXY,
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
  border: 1px solid gray;
  /* 外框样式 */
}
</style>
