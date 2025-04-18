<template>
  <div class="contain_box">
    <div>npm文档：https://www.npmjs.com/package/@antv/x6/v/1.14.0</div>
    <div>文档：https://x6.antv.vision/zh</div>
    <div id="container" style="width: 600px; height: 400px;border: 1px solid red;"></div>
  </div>
</template>

<script>
// 从 node_modules 引入
import { Graph } from "@antv/x6";
// 从 CND 引入时，我们暴露了 X6 这个全局变量
// const { Graph } = X6
export default {
  name: "index",
  data() {
    return {};
  },
  mounted() {
    this.graphFn();
  },
  beforeDestroy() {},
  methods: {
    graphFn() {
      // 创建 Graph 的实例
      const graph = new Graph({
        container: document.getElementById("container"),
        grid: true,
      });
      // 渲染源节点
      const source = graph.addNode({
        x: 300,
        y: 40,
        width: 80,
        height: 40,
        label: "Hello",
      });

      // 渲染目标节点
      const target = graph.addNode({
        x: 420,
        y: 180,
        width: 80,
        height: 40,
        label: "World",
      });

      // 渲染边
      graph.addEdge({
        source,
        target,
      });
    },
  },
};
</script>

<style scoped lang="scss">
/* 容器样式 */
.contain_box {
  width: 100%;
  height: 100%;
  // background-color: rgb(177, 175, 175);
}
</style>
