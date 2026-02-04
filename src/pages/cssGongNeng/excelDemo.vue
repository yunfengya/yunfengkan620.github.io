<template>
  <div class="excel-demo-container">
    <el-container>
      <el-header style="background: #fff; border-bottom: 1px solid #e6e6e6; padding: 0 20px;">
        <h2>Excel导出功能演示</h2>
        <p class="sub-title">使用exceljs实现多种Excel导出方式</p>
      </el-header>

      <el-main>
        <el-tabs type="border-card">
          <el-tab-pane label="多工作表导出">
            <ExcelMultiSheetExport />
          </el-tab-pane>

          <el-tab-pane label="同一工作表多表格">
            <ExcelSingleSheetMultiTable />
          </el-tab-pane>
        </el-tabs>

        <el-card class="usage-card">
          <div slot="header">
            <span>功能对比说明</span>
          </div>

          <div class="usage-content">
            <el-table :data="comparisonData" border style="width: 100%; margin-bottom: 20px;">
              <el-table-column prop="feature" label="功能特点" width="150" />
              <el-table-column prop="multiSheet" label="多工作表方式" />
              <el-table-column prop="singleSheet" label="同一工作表多表格方式" />
            </el-table>

            <h4>多工作表导出 API：</h4>
            <pre><code>import { exportMultipleSheetsToExcel } from '@/utils/excelExport';

              const worksheets = [
                {
                  sheetName: '用户数据',
                  headers: ['ID', '姓名', '邮箱'],
                  data: [[1, '张三', 'zhangsan@email.com']]
                }
              ];

              await exportMultipleSheetsToExcel(worksheets, '数据.xlsx');</code></pre>

                          <h4>同一工作表多表格 API：</h4>
                          <pre><code>import { exportMultipleTablesToSingleSheet } from '@/utils/excelSingleSheetExport';

              const tables = [
                {
                  title: '用户信息',
                  headers: ['ID', '姓名', '邮箱'],
                  data: [[1, '张三', 'zhangsan@email.com']],
                  tableStyle: {
                    headerColor: 'FF0070C0',
                    align: 'center'
                  }
                }
              ];

              await exportMultipleTablesToSingleSheet(tables, {
                fileName: '数据.xlsx',
                sheetName: '汇总',
                spacingRows: 2
              });
            </code></pre>

            <h4>选择建议：</h4>
            <ul>
              <li>📑 <strong>多工作表方式</strong>：适合数据量大、需要分开查看和分析的场景</li>
              <li>📋 <strong>同一工作表方式</strong>：适合数据关联性强、需要对比查看的场景</li>
              <li>🎯 根据业务需求选择合适的导出方式</li>
            </ul>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import ExcelMultiSheetExport from '@/components/ExcelExport/ExcelMultiSheetExport.vue';
import ExcelSingleSheetMultiTable from '@/components/ExcelExport/ExcelSingleSheetMultiTable.vue';

export default {
  name: 'ExcelDemo',
  components: {
    ExcelMultiSheetExport,
    ExcelSingleSheetMultiTable
  },
  data() {
    return {
      comparisonData: [
        {
          feature: '导出形式',
          multiSheet: '多个独立的工作表(Sheet)',
          singleSheet: '同一工作表中的多个表格区域'
        },
        {
          feature: '适用场景',
          multiSheet: '数据分类明确，需要独立分析',
          singleSheet: '数据关联性强，需要对比查看'
        },
        {
          feature: '表格标题',
          multiSheet: '工作表名称(Sheet Name)',
          singleSheet: '每个表格可设置独立标题'
        },
        {
          feature: '样式定制',
          multiSheet: '统一表头样式',
          singleSheet: '每个表格可独立设置样式'
        },
        {
          feature: '查看方式',
          multiSheet: '需要切换工作表标签',
          singleSheet: '在同一页面内滚动查看'
        }
      ]
    };
  }
};
</script>

<style scoped>
.excel-demo-container {
  height: calc(100vh - 60px);
  background-color: #f5f7fa;
  overflow: auto;
}

.sub-title {
  color: #909399;
  margin: 5px 0 0 0;
  font-size: 14px;
}

.usage-card {
  margin-top: 20px;
}

.usage-content h4 {
  color: #409EFF;
  margin: 15px 0 10px 0;
}

.usage-content ul {
  padding-left: 20px;
}

.usage-content ul li {
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