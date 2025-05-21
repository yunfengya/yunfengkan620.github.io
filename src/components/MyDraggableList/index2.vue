<template>
    <!-- 
      多表格 内部拖拽排序，
    -->
    <div class="draggable-list">
        <slot></slot>
    </div>
    <!-- 
      使用方式
      <template>
          <div class="contain_box">
              <MyDraggableList v-for="(item1,index1) in allList" :key="index1" :list-id="item1.title" v-model="item1.itemList" @change="handleOrderChange">
                  <div class="item_box" v-for="(item2,index2) in item1.itemList" :key="index2">{{item2}}</div>
              </MyDraggableList>
          </div>
      </template>

      <script>
      import MyDraggableList from '@/components/MyDraggableList/index2.vue';
      export default {
          name: "index",
          components: {
              MyDraggableList,
          },

          data() {
              return {
                  allList:[
                      {
                          title:'a',
                          itemList:[
                              { id: '1', name: "11111", },
                              { id: '2', name: "22222", },
                              { id: '3', name: "33333", },
                              { id: '4', name: "44444", },
                              { id: '5', name: "55555", },
                              { id: '6', name: "66666", },
                              { id: '7', name: "77777", },
                              { id: '8', name: "88888", },
                          ]
                      },
                      {
                          title:'b',
                          itemList:[
                              { id: '1yy', name: "11111yy", },
                              { id: '2yy', name: "22222yy", },
                              { id: '3yy', name: "33333yy", },
                              { id: '4yy', name: "44444yy", },
                              { id: '5yy', name: "55555yy", },
                              { id: '6yy', name: "66666yy", },
                              { id: '7yy', name: "77777yy", },
                              { id: '8yy', name: "88888yy", },
                          ]
                      },
                  ],
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
    },
    listId: {  // 新增listId prop，用于标识不同的列表
      type: String,
      required: true
    }
  },
  data() {
    return {
      dataList: [...this.value],
      draggedItem: null,
      draggedIndex: null,
      sourceListId: null  // 记录拖拽源列表ID
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
        item.dataset.listId = this.listId  // 为每个元素标记所属列表ID
        
        item.addEventListener('dragstart', this.handleDragStart)
        item.addEventListener('dragover', this.handleDragOver)
        item.addEventListener('dragenter', this.handleDragEnter)
        item.addEventListener('dragleave', this.handleDragLeave)
        item.addEventListener('dragend', this.handleDragEnd)
        item.addEventListener('drop', this.handleDrop)
      })
    },
    handleDragStart(e) {
      this.sourceListId = e.target.dataset.listId  // 记录源列表ID
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text/plain', null)
      
      e.target.classList.add('dragging')
      
      this.draggedItem = e.target
      this.draggedIndex = Array.from(this.$el.children).indexOf(e.target)
    },
    handleDragOver(e) {
      // 检查是否同列表
      if (e.target.dataset.listId !== this.sourceListId) {
        e.dataTransfer.dropEffect = 'none'
        return false
      }
      
      e.preventDefault()
      e.dataTransfer.dropEffect = 'move'
      return false
    },
    handleDragEnter(e) {
      // 检查是否同列表
      if (e.target.dataset.listId !== this.sourceListId) {
        return
      }
      
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
      this.sourceListId = null
    },
    handleDrop(e) {
      // 检查是否同列表
      if (e.target.dataset.listId !== this.sourceListId) {
        return false
      }
      
      e.preventDefault()
      e.stopPropagation()
      
      if (e.target !== this.draggedItem && e.target.classList.contains('item_box')) {
        const dropIndex = Array.from(this.$el.children).indexOf(e.target)
        const newList = [...this.dataList]
        const [removed] = newList.splice(this.draggedIndex, 1)
        newList.splice(dropIndex, 0, removed)
        
        this.dataList = newList
        this.$emit('input', newList)
        this.$emit('change', newList)
        
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

/* 添加禁止拖拽的视觉反馈 */
.item_box.drag-denied {
  border: 2px dashed #ff4d4f;
  cursor: not-allowed;
}
</style>