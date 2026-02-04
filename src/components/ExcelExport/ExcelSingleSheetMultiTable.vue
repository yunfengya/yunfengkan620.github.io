<template>
  <div class="excel-single-sheet-demo">
    <el-card class="export-card">
      <div slot="header">
        <span>同一工作表中多个表格导出演示</span>
        <el-button 
          type="primary" 
          size="small" 
          style="float: right;"
          @click="exportData"
          :loading="exporting"
        >
          {{ exporting ? '导出中...' : '导出Excel' }}
        </el-button>
      </div>

      <div class="data-preview">
        <h3>预览数据（同一工作表内的多个表格）：</h3>
        
        <!-- 用户数据表格 -->
        <div class="table-preview">
          <h4>用户信息表</h4>
          <el-table :data="sampleTables[0].data" border size="mini" style="width: 100%">
            <el-table-column 
              v-for="(header, index) in sampleTables[0].headers" 
              :key="index"
              :prop="index.toString()"
              :label="header"
              width="120"
            />
          </el-table>
        </div>

        <div class="table-spacer"></div>

        <!-- 订单数据表格 -->
        <div class="table-preview">
          <h4>订单信息表</h4>
          <el-table :data="sampleTables[1].data" border size="mini" style="width: 100%">
            <el-table-column 
              v-for="(header, index) in sampleTables[1].headers" 
              :key="index"
              :prop="index.toString()"
              :label="header"
              width="120"
            />
          </el-table>
        </div>

        <div class="table-spacer"></div>

        <!-- 产品库存表格 -->
        <div class="table-preview">
          <h4>产品库存表</h4>
          <el-table :data="sampleTables[2].data" border size="mini" style="width: 100%">
            <el-table-column 
              v-for="(header, index) in sampleTables[2].headers" 
              :key="index"
              :prop="index.toString()"
              :label="header"
              width="120"
            />
          </el-table>
        </div>
      </div>

      <div class="feature-explain">
        <h3>功能特点：</h3>
        <ul>
          <li>📋 多个表格数据导出到同一个工作表</li>
          <li>🏷️ 每个表格可以有独立的标题和表头</li>
          <li>?? 支持自定义表格样式（表头颜色、对齐方式等）</li>
          <li>📏 自动添加表格之间的间隔行</li>
          <li>🌈 支持交替行颜色效果</li>
          <li>💾 完整的边框和格式化</li>
        </ul>

        <h3>使用示例：</h3>
        <pre><code>import { exportMultipleTablesToSingleSheet } from '@/utils/excelSingleSheetExport';

const tables = [
  {
    title: '用户信息',
    headers: ['ID', '姓名', '邮箱'],
    data: [
      [1, '张三', 'zhangsan@email.com'],
      [2, '李四', 'lisi@email.com']
    ],
    tableStyle: {
      headerColor: 'FF0070C0',
      align: 'center',
      alternateRowColors: true
    }
  },
  {
    title: '订单信息',
    headers: ['订单号', '金额', '状态'],
    data: [
      ['ORD001', 5999, '已完成'],
      ['ORD002', 258, '处理中']
    ],
    tableStyle: {
      headerColor: 'FF00B050', 
      align: 'right'
    }
  }
];

await exportMultipleTablesToSingleSheet(tables, {
  fileName: '业务数据汇总.xlsx',
  sheetName: '数据总览',
  spacingRows: 2
});</code></pre>
      </div>
    </el-card>
  </div>
</template>

<script>
import { exportMultipleTablesToSingleSheet, generateSampleTables } from '@/utils/excelSingleSheetExport';

export default {
  name: 'ExcelSingleSheetMultiTable',
  data() {
    return {
      exporting: false,
      sampleTables: generateSampleTables()
    };
  },
  methods: {
    async exportData() {
      this.exporting = true;
      try {
        const result = await exportMultipleTablesToSingleSheet(this.sampleTables, {
          fileName: '同一工作表多表格示例.xlsx',
          sheetName: '业务数据汇总',
          spacingRows: 2
        });
        
        if (result.success) {
          this.$message.success('导出成功！');
        } else {
          this.$message.error(result.message);
        }
      } catch (error) {
        this.$message.error('导出失败：' + error.message);
      } finally {
        this.exporting = false;
      }
    }
  }
};
</script>

<style scoped>
.excel-single-sheet-demo {
  padding: 20px;
}

.export-card {
  margin-bottom: 20px;
}

.data-preview {
  margin-bottom: 20px;
}

.table-preview {
  margin-bottom: 10px;
  padding: 15px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background-color: #fafafa;
}

.table-preview h4 {
  margin: 0 0 10px 0;
  color: #409EFF;
  font-weight: bold;
}

.table-spacer {
  height: 20px;
  border-left: 2px dashed #dcdfe6;
  border-right: 2px dashed #dcdfe6;
  margin: 10px 0;
  position: relative;
}

.table-spacer::before {
  content: '表格间隔区域';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 0 10px;
  color: #909399;
  font-size: 12px;
}

.feature-explain {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #ebeef5;
}

.feature-explain h3 {
  color: #409EFF;
  margin: 15px 0 10px 0;
}

.feature-explain ul {
  padding-left: 20px;
  margin-bottom: 20px;
}

.feature-explain ul li {
  margin-bottom: 8px;
  color: #606266;
}

pre {
  background-color: #f6f8fa;
  padding: 12px;
  border-radius: 4px;
  overflow-x: auto;
}

code {
  color: #24292e;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 12px;
}
</style>