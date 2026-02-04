<template>
  <div class="">
    <div class="item_box">
      <span>同一工作表内的多个表格</span>
      <el-button 
        type="primary" 
        size="small" 
        @click="exportData1"
        :loading="exporting1"
      >
        {{ exporting1 ? '导出中...' : '导出Excel' }}
      </el-button>
    </div>
    <div class="item_box">
      <span>Excel多表导出演示</span>
      <el-button 
        type="primary" 
        size="small" 
        @click="exportData2"
        :loading="exporting2"
      >
        {{ exporting2 ? '导出中...' : '导出Excel' }}
      </el-button>
    </div>
  </div>
</template>

<script>
import { exportMultipleTablesToSingleSheet, generateSampleTables } from '@/pages/cssGongNeng/excelSingleSheetExport';
import { exportMultipleSheetsToExcel, generateSampleData } from '@/pages/cssGongNeng/excelExport';

export default {
  name: 'ExcelSingleSheetMultiTable',
  data() {
    return {
      exporting1: false,
      sampleTables: generateSampleTables(),

      exporting2: false,
      sampleData: generateSampleData(),
    };
  },
  methods: {
    async exportData1() {
      this.exporting1 = true;
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
        this.exporting1 = false;
      }
    },

    async exportData2() {
      this.exporting = true;
      try {
        const result = await exportMultipleSheetsToExcel(this.sampleData, '多表数据导出示例.xlsx');
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
    },
  }
};
</script>

<style scoped>
.item_box{
  padding: 20px;
}

</style>