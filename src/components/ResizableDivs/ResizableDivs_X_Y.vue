<template>
  <!-- 可拖动指定区域大小 -->
  <div
    class="resizable-container"
    :style="containerStyle"
    :class="directionClass"
  >
    <div class="primary-div" :style="primaryDivStyle">
      <slot name="div1"></slot>
    </div>
    <div class="divider" @mousedown="startResize" :style="dividerStyle"></div>
    <div class="secondary-div">
      <slot name="div2"></slot>
    </div>
  </div>
  <!-- 使用方式 可用3种单位使用 根据不同场景使用 -->
  <!-- direction="horizontal" -->

  <!-- <ResizableDivs_X_Y
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
  </ResizableDivs_X_Y> -->

  <!-- direction="vertical" --> 
  
  <!-- <ResizableDivs_X_Y
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
  </ResizableDivs_X_Y> -->
</template>

<script>
export default {
  name: "ResizableDivs",
  props: {
    // 布局方向：'horizontal' 或 'vertical'
    direction: {
      type: String,
      default: "horizontal",
      validator: (value) => ["horizontal", "vertical"].includes(value),
    },
    // 主 div 的默认尺寸
    defaultPrimarySize: {
      type: String,
      default: "30%",
    },
    // 主 div 的最小尺寸
    minPrimarySize: {
      type: String,
      default: "20%",
    },
    // 主 div 的最大尺寸
    maxPrimarySize: {
      type: String,
      default: "50%",
    },
    // 容器高度
    containerHeight: {
      type: String,
      default: "100%",
    },
    // 容器宽度
    containerWidth: {
      type: String,
      default: "100%",
    },
    // 分隔条大小
    dividerSize: {
      type: String,
      default: "5px",
    },
  },
  data() {
    return {
      primarySize: this.defaultPrimarySize,
      isResizing: false,
    };
  },
  computed: {
    directionClass() {
      return `direction-${this.direction}`;
    },
    containerStyle() {
      return {
        height: this.containerHeight,
        width: this.containerWidth,
      };
    },
    primaryDivStyle() {
      const style = {};
      if (this.direction === "horizontal") {
        style.width = this.primarySize;
        style.minWidth = this.minPrimarySize;
        style.maxWidth = this.maxPrimarySize;
      } else {
        style.height = this.primarySize;
        style.minHeight = this.minPrimarySize;
        style.maxHeight = this.maxPrimarySize;
      }
      return style;
    },
    dividerStyle() {
      return {
        [this.direction === "horizontal" ? "width" : "height"]:
          this.dividerSize,
        cursor: this.direction === "horizontal" ? "col-resize" : "row-resize",
      };
    },
  },
  methods: {
    startResize(e) {
      this.isResizing = true;
      document.addEventListener("mousemove", this.handleResize);
      document.addEventListener("mouseup", this.stopResize);
      e.preventDefault();
    },
    handleResize(e) {
      if (!this.isResizing) return;

      const container = this.$el;
      const containerRect = container.getBoundingClientRect();

      let newSize, newSizePercent;

      if (this.direction === "horizontal") {
        // 横向调整
        const containerWidth = containerRect.width;
        newSize = e.clientX - containerRect.left;
        newSizePercent = (newSize / containerWidth) * 100;
      } else {
        // 纵向调整
        const containerHeight = containerRect.height;
        newSize = e.clientY - containerRect.top;
        newSizePercent = (newSize / containerHeight) * 100;
      }

      // 应用最小和最大限制
      const minPercent = parseFloat(this.minPrimarySize);
      const maxPercent = parseFloat(this.maxPrimarySize);

      if (newSizePercent >= minPercent && newSizePercent <= maxPercent) {
        this.primarySize = `${newSizePercent}%`;
      }
    },
    stopResize() {
      this.isResizing = false;
      document.removeEventListener("mousemove", this.handleResize);
      document.removeEventListener("mouseup", this.stopResize);
    },
  },
};
</script>

<style scoped>
.resizable-container {
  position: relative;
  display: flex;
  overflow: hidden;
}

/* 横向布局 */
.direction-horizontal {
  flex-direction: row;
}

.direction-horizontal .primary-div {
  overflow: auto;
}

.direction-horizontal .secondary-div {
  flex: 1;
  overflow: auto;
}

.direction-horizontal .divider {
  background-color: #ccc;
}

.direction-horizontal .divider:hover {
  background-color: #aaa;
}

/* 纵向布局 */
.direction-vertical {
  flex-direction: column;
}

.direction-vertical .primary-div {
  overflow: auto;
}

.direction-vertical .secondary-div {
  flex: 1;
  overflow: auto;
}

.direction-vertical .divider {
  background-color: #ccc;
}

.direction-vertical .divider:hover {
  background-color: #aaa;
}
</style>