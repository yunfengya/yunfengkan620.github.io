<template>
<!-- 可拖动指定区域大小 -->
  <div class="resizable-container" ref="container">
    <div class="resizable-div" :style="{ width: div1Width }" ref="div1">
      <slot name="div1"></slot>
    </div>
    <div class="resizer" @mousedown="startResizing"></div>
    <div
      class="resizable-div"
      :style="{ width: calcSecondDivWidth() }"
      ref="div2"
    >
      <slot name="div2"></slot>
    </div>
  </div>
  <!-- 使用方式 可用3种单位使用 根据不同场景使用
    <ResizableDivs
      defaultDiv1Width="30%"
      minDiv1Width="100px"
      maxDiv1Width="70vw"
      >
      <template v-slot:div1>
        <div class="content">
          <p>这是第一个 Div 的内容。</p>
        </div>
      </template>
      <template v-slot:div2>
        <div class="content">
          <p>这是第二个 Div 的内容。</p>
        </div>
      </template>
  </ResizableDivs> 
  -->
</template>

<script>
export default {
  name: "ResizableDivs",
  props: {
    defaultDiv1Width: {
      type: String,
      required: true,
      validator: (value) => {
        // 验证传入的宽度值是否合法（包含px、%、vw或者能够转为数字后加px的值）
        return /\d+%?$|\d+\.?\d*px$|\d+\.?\d*vw$/.test(value);
      },
    },
    minDiv1Width: {
      type: String,
      default: "100px",
    },
    maxDiv1Width: {
      type: String,
      default: "50%", // 示例为50%，但可以根据需要调整
    },
  },
  data() {
    return {
      div1Width: this.parseWidth(this.defaultDiv1Width),
      isResizing: false,
      startX: 0,
      startWidth: 0,
      containerWidth: 0,
      resizerWidth: 5, // 假设resizer的宽度
    };
  },
  mounted() {
    this.updateContainerAndDivWidths();
    window.addEventListener("resize", this.updateContainerAndDivWidths);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateContainerAndDivWidths);
  },
  methods: {
    parseWidth(width) {
      // 如果宽度是百分比或vw，则直接返回
      if (/%|vw$/.test(width)) {
        return width;
      }
      // 如果宽度是数字字符串且没有单位，则默认它是像素值
      return `${parseFloat(width)}px`;
    },
    toPx(width) {
      // 将百分比或vw宽度转换为像素（基于容器宽度）
      const container = this.$refs.container;
      if (!container) return 0;

      const containerWidthPx = container.offsetWidth;
      if (/%$/.test(width)) {
        return (parseFloat(width) / 100) * containerWidthPx;
      } else if (/vw$/.test(width)) {
        return (parseFloat(width) / 100) * window.innerWidth;
      }
      return parseFloat(width); // 对于已经是px的情况
    },
    updateContainerAndDivWidths() {
      this.containerWidth = this.$refs.container
        ? this.$refs.container.offsetWidth
        : 0;
      // 重新计算并设置div1的宽度，以确保它是正确的像素值
      this.div1Width = this.parseWidthToContainerBasedPx(this.div1Width);
    },
    parseWidthToContainerBasedPx(width) {
      // 根据容器宽度解析宽度为像素值
      const pxWidth = this.toPx(width);
      // 确保宽度在最小和最大值之间
      const minWidthPx = this.toPx(this.minDiv1Width);
      const maxWidthPx = this.toPx(this.maxDiv1Width);
      return Math.max(minWidthPx, Math.min(maxWidthPx, pxWidth)) + "px";
    },
    calcSecondDivWidth() {
      // 计算第二个div的宽度
      const containerWidthPx = this.containerWidth;
      const div1WidthPx = this.toPx(this.div1Width);
      return `${containerWidthPx - div1WidthPx - this.resizerWidth}px`;
    },
    startResizing(event) {
      this.isResizing = true;
      this.startX = event.clientX;
      this.startWidth = this.div1Width;
      document.addEventListener("mousemove", this.resize);
      document.addEventListener("mouseup", this.stopResizing);
    },
    resize(event) {
      if (!this.isResizing) return;
      const deltaX = event.clientX - this.startX;
      let newWidth = this.toPx(this.startWidth) + deltaX;

      // 确保新宽度在最小和最大值之间
      newWidth = Math.max(
        this.toPx(this.minDiv1Width),
        Math.min(this.toPx(this.maxDiv1Width), newWidth)
      );

      this.div1Width = `${newWidth}px`;
    },
    stopResizing() {
      this.isResizing = false;
      document.removeEventListener("mousemove", this.resize);
      document.removeEventListener("mouseup", this.stopResizing);
    },
  },
};
</script>

<style scoped>
.resizable-container {
  display: flex;
  width: 100%; /* 或根据需要设置具体宽度 */
  height:100%;
}

.resizable-div {
  /* border:1px solid #e49d25; */
  flex-shrink: 0;
  overflow: auto;
  /* 其他样式 */
}

.resizer {
  width: 5px;
  /* cursor: ew-resize; */
  /* cursor: row-resize; */
  cursor: col-resize;
  background-color: #ddd;
  /* 其他样式 */
}
.resizer:hover {
  background-color: #aaa;
}
</style>
