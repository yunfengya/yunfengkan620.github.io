<template>
    <!-- 
        拖拽排序，
    -->
    <div class="draggable-list">
        <slot></slot>
    </div>
    <!-- 
        使用方式
        <template>
            <div class="contain_box">
                <MyDraggableList v-model="dataList" @change="handleOrderChange">
                    <div class="item_box" v-for="(item,index) in dataList" :key="index">{{item}}</div>
                </MyDraggableList>
            </div>
        </template>

        <script>
        import MyDraggableList from './MyDraggableList.vue';
        export default {
            name: "index",
            components: {
                MyDraggableList,
            },

            data() {
                return {
                    dataList:[
                        { id: 1, name: "张三", age: 20 },
                        { id: 2, name: "李四", age: 21 },
                        { id: 3, name: "王五", age: 22 },
                        { id: 4, name: "赵六", age: 23 },
                        { id: 5, name: "孙七", age: 24 },
                        { id: 6, name: "周八", age: 25 },
                        { id: 7, name: "吴九", age: 26 },
                        { id: 8, name: "郑十", age: 27 },
                    ]
                };
            },
            mounted() {
                
            },
            beforeDestroy() {
                
            },
            methods: {
                handleOrderChange(newOrder) {
                    console.log('Order changed:', newOrder)
                    // Update your data or perform other actions
                }
            }
        };
        </script>

        <style scoped lang="scss">
        /* 容器样式 */
        .contain_box {
            width: 100%;
            height: 100%;
            // background-color: rgb(177, 175, 175);
            display: flex;
            flex-wrap: wrap;
            align-content: flex-start;
            // .draggable-container {
            //     display: flex;
            //     flex-wrap: wrap;
            //     width: 100%;
            // }
            .item_box{
                width: 120px;
                height: 80px;
                color: #23cc28;
                border: 1px solid #007acc;
                margin: 10px;
                cursor: pointer;
                user-select: none;
            }
        }

        </style>
     -->
</template>

<script>
export default {
  name: 'MyDraggableList',
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      dataList: [...this.value],
      draggedItem: null,
      draggedIndex: null
    }
  },
  watch: {
    value(newVal) {
      this.dataList = [...newVal]
    }
  },
  mounted() {
    this.initDragAndDrop()
  },
  methods: {
    initDragAndDrop() {
      const container = this.$el
      const items = container.children
      
      Array.from(items).forEach(item => {
        item.setAttribute('draggable', 'true')
        
        item.addEventListener('dragstart', this.handleDragStart)
        item.addEventListener('dragover', this.handleDragOver)
        item.addEventListener('dragenter', this.handleDragEnter)
        item.addEventListener('dragleave', this.handleDragLeave)
        item.addEventListener('dragend', this.handleDragEnd)
        item.addEventListener('drop', this.handleDrop)
      })
    },
    handleDragStart(e) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text/plain', null)
      
      e.target.classList.add('dragging')
      
      this.draggedItem = e.target
      this.draggedIndex = Array.from(this.$el.children).indexOf(e.target)
    },
    handleDragOver(e) {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'move'
      return false
    },
    handleDragEnter(e) {
      e.preventDefault()
      if (e.target !== this.draggedItem && e.target.classList.contains('item_box')) {
        e.target.classList.add('drag-over')
      }
    },
    handleDragLeave(e) {
      e.target.classList.remove('drag-over')
    },
    handleDragEnd(e) {
      Array.from(this.$el.children).forEach(item => {
        item.classList.remove('dragging')
        item.classList.remove('drag-over')
      })
    },
    handleDrop(e) {
      e.preventDefault()
      e.stopPropagation()
      
      if (e.target !== this.draggedItem && e.target.classList.contains('item_box')) {
        const dropIndex = Array.from(this.$el.children).indexOf(e.target)
        const newList = [...this.dataList]
        const [removed] = newList.splice(this.draggedIndex, 1)
        newList.splice(dropIndex, 0, removed)
        
        // Update internal data
        this.dataList = newList
        
        // Emit events
        this.$emit('input', newList)
        this.$emit('change', newList) // New event for change tracking
        
        // Log the new order (for debugging)
        // console.log('New order after drag:', newList)
        
        e.target.classList.remove('drag-over')
      }
      
      return false
    }
  },
  beforeDestroy() {
    const items = this.$el.children
    Array.from(items).forEach(item => {
      item.removeEventListener('dragstart', this.handleDragStart)
      item.removeEventListener('dragover', this.handleDragOver)
      item.removeEventListener('dragenter', this.handleDragEnter)
      item.removeEventListener('dragleave', this.handleDragLeave)
      item.removeEventListener('dragend', this.handleDragEnd)
      item.removeEventListener('drop', this.handleDrop)
    })
  }
}
</script>

<style scoped>
.draggable-list {
  display: flex;
  flex-wrap: wrap;
  /* gap: 8px; */
}

.item_box {
  transition: all 0.3s ease;
}

.item_box.dragging {
  opacity: 0.5;
  background: #f0f0f0;
}

.item_box.drag-over {
  border: 2px dashed #409eff;
  transform: scale(1.02);
}
</style>