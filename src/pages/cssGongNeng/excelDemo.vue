<template>
  <div class="advanced-excel-demo">
    <!-- 基础导出功能 -->
    <div class="section">
      <h3>基础导出功能</h3>
      <div class="item_box">
        <span>导出多个工作表，每个工作表支持垂直/水平/网格布局</span>
        <el-button 
          type="primary" 
          size="small" 
          @click="exportData1"
        >
          导出
        </el-button>
      </div>
      <div class="item_box">
        <span>2</span>
        <el-button 
          type="success" 
          size="small" 
        >
          导出2
        </el-button>
      </div>
      
    </div>

  </div>
</template>

<script>
import { exportExcelFn } from "./excelFn.js";

export default {
  name: 'ExcelSingleSheetMultiTable',
  data() {
    return {
      
    };
  },
  methods: {
    async exportData1() {
      exportExcelFn()
    },
  }
};
</script>

<style scoped>
.advanced-excel-demo {
  height: calc(100%);
  overflow: auto;
  padding: 20px;
}

.section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  background: #fafafa;
}

.section h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
  border-bottom: 2px solid #409EFF;
  padding-bottom: 8px;
}

.item_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  margin: 8px 0;
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.item_box:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transform: translateY(-1px);
}

.item_box span {
  font-weight: 500;
  color: #606266;
}

.item_box .el-button {
  min-width: 100px;
}
</style>