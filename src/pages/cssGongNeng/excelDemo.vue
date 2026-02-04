<template>
  <div class="advanced-excel-demo">
    <!-- 基础导出功能 -->
    <div class="section">
      <h3>基础导出功能</h3>
      <div class="item_box">
        <span>同一工作表内的多个表格（纵向）</span>
        <el-button 
          type="primary" 
          size="small" 
          @click="exportData1"
          :loading="exporting1"
        >
          {{ exporting1 ? '导出中...' : '纵向布局' }}
        </el-button>
      </div>
      <div class="item_box">
        <span>同一工作表内的多个表格（横向）</span>
        <el-button 
          type="success" 
          size="small" 
          @click="exportHorizontalData"
          :loading="exportingHorizontal"
        >
          {{ exportingHorizontal ? '导出中...' : '横向布局' }}
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
          {{ exporting2 ? '导出中...' : '多工作表' }}
        </el-button>
      </div>
    </div>

    <!-- 高级布局导出 -->
    <div class="section">
      <h3>高级布局导出</h3>
      <div class="item_box">
        <span>纵向布局（带样式）</span>
        <el-button 
          type="primary" 
          size="small" 
          @click="exportVerticalStyled"
          :loading="exportingVertical"
        >
          {{ exportingVertical ? '导出中...' : '纵向+样式' }}
        </el-button>
      </div>
      <div class="item_box">
        <span>横向布局（3列表格间隔）</span>
        <el-button 
          type="success" 
          size="small" 
          @click="exportHorizontalSpaced"
          :loading="exportingHorizontalAdv"
        >
          {{ exportingHorizontalAdv ? '导出中...' : '横向+间隔' }}
        </el-button>
      </div>
      <div class="item_box">
        <span>网格布局（2x2网格）</span>
        <el-button 
          type="warning" 
          size="small" 
          @click="exportGridLayout"
          :loading="exportingGrid"
        >
          {{ exportingGrid ? '导出中...' : '网格布局' }}
        </el-button>
      </div>
    </div>

    <!-- 快速导出方法 -->
    <div class="section">
      <h3>快速导出方法</h3>
      <div class="item_box">
        <span>快速纵向导出</span>
        <el-button 
          type="info" 
          size="small" 
          @click="quickExportVertical"
          :loading="exportingQuick1"
        >
          {{ exportingQuick1 ? '导出中...' : '快速纵向' }}
        </el-button>
      </div>
      <div class="item_box">
        <span>快速横向导出</span>
        <el-button 
          type="info" 
          size="small" 
          @click="quickExportHorizontal"
          :loading="exportingQuick2"
        >
          {{ exportingQuick2 ? '导出中...' : '快速横向' }}
        </el-button>
      </div>
      <div class="item_box">
        <span>带样式快速导出</span>
        <el-button 
          type="info" 
          size="small" 
          @click="quickExportStyled"
          :loading="exportingQuick3"
        >
          {{ exportingQuick3 ? '导出中...' : '快速样式' }}
        </el-button>
      </div>
    </div>

    <!-- 行业数据导出 -->
    <div class="section">
      <h3>行业数据示例</h3>
      <div class="item_box">
        <span>电商行业数据</span>
        <el-button 
          type="danger" 
          size="small" 
          @click="exportEcommerceData"
          :loading="exportingEcommerce"
        >
          {{ exportingEcommerce ? '导出中...' : '电商数据' }}
        </el-button>
      </div>
      <div class="item_box">
        <span>教育行业数据</span>
        <el-button 
          type="danger" 
          size="small" 
          @click="exportEducationData"
          :loading="exportingEducation"
        >
          {{ exportingEducation ? '导出中...' : '教育数据' }}
        </el-button>
      </div>
      <div class="item_box">
        <span>医疗行业数据</span>
        <el-button 
          type="danger" 
          size="small" 
          @click="exportHealthcareData"
          :loading="exportingHealthcare"
        >
          {{ exportingHealthcare ? '导出中...' : '医疗数据' }}
        </el-button>
      </div>
    </div>

    <!-- 自定义配置导出 -->
    <div class="section">
      <h3>自定义配置</h3>
      <div class="item_box">
        <span>自定义样式导出</span>
        <el-button 
          type="success" 
          size="small" 
          @click="exportCustomStyled"
          :loading="exportingCustom"
        >
          {{ exportingCustom ? '导出中...' : '自定义样式' }}
        </el-button>
      </div>
      <div class="item_box">
        <span>组合布局导出</span>
        <el-button 
          type="success" 
          size="small" 
          @click="exportCombinedLayout"
          :loading="exportingCombined"
        >
          {{ exportingCombined ? '导出中...' : '组合布局' }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { exportMultipleTablesToSingleSheet, generateSampleTables } from '@/pages/cssGongNeng/excelSingleSheetExport';
import { exportMultipleSheetsToExcel, generateSampleData } from '@/pages/cssGongNeng/excelExport';
import { exportHorizontalTables, generateHorizontalSampleData } from '@/pages/cssGongNeng/excelHorizontalExport';
import { 
  exportAdvancedLayout, 
  generateAdvancedSampleData, 
  generateIndustrySampleData, 
  quickExport 
} from '@/pages/cssGongNeng/excelAdvancedExport';

export default {
  name: 'ExcelSingleSheetMultiTable',
  data() {
    return {
      exporting1: false,
      sampleTables: generateSampleTables(),

      exportingHorizontal: false,
      horizontalTables: generateHorizontalSampleData(),

      exporting2: false,
      sampleData: generateSampleData(),

      // 高级导出状态
      exportingVertical: false,
      exportingHorizontalAdv: false,
      exportingGrid: false,
      exportingQuick1: false,
      exportingQuick2: false,
      exportingQuick3: false,
      exportingEcommerce: false,
      exportingEducation: false,
      exportingHealthcare: false,
      exportingCustom: false,
      exportingCombined: false,

      // 高级样本数据
      advancedTables: generateAdvancedSampleData(),
      ecommerceTables: generateIndustrySampleData('ecommerce'),
      educationTables: generateIndustrySampleData('education'),
      healthcareTables: generateIndustrySampleData('healthcare')
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

    async exportHorizontalData() {
      this.exportingHorizontal = true;
      try {
        const result = await exportHorizontalTables(this.horizontalTables, {
          fileName: '横向布局示例.xlsx',
          sheetName: '横向数据报表',
          spacingCols: 3
        });
        
        if (result.success) {
          this.$message.success('横向布局导出成功！');
        } else {
          this.$message.error(result.message);
        }
      } catch (error) {
        this.$message.error('导出失败：' + error.message);
      } finally {
        this.exportingHorizontal = false;
      }
    },

    async exportData2() {
      this.exporting2 = true;
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
        this.exporting2 = false;
      }
    },

    // 高级导出方法
    async exportVerticalStyled() {
      this.exportingVertical = true;
      try {
        const result = await exportAdvancedLayout(this.advancedTables, {
          fileName: '纵向样式示例.xlsx',
          sheetName: '带样式数据',
          layoutType: 'vertical',
          spacingRows: 2,
          customStyles: {
            titleColor: 'FF2E75B5',
            headerColor: 'FF4472C4',
            headerFontColor: 'FFFFFFFF',
            dataAlign: 'center',
            alternateColor: 'FFD9E1F2'
          }
        });
        
        this.handleExportResult(result, '纵向样式导出');
      } catch (error) {
        this.$message.error('导出失败：' + error.message);
      } finally {
        this.exportingVertical = false;
      }
    },

    async exportHorizontalSpaced() {
      this.exportingHorizontalAdv = true;
      try {
        const result = await exportAdvancedLayout(this.advancedTables, {
          fileName: '横向间隔示例.xlsx',
          sheetName: '横向间隔数据',
          layoutType: 'horizontal',
          spacingCols: 4
        });
        
        this.handleExportResult(result, '横向间隔导出');
      } catch (error) {
        this.$message.error('导出失败：' + error.message);
      } finally {
        this.exportingHorizontalAdv = false;
      }
    },

    async exportGridLayout() {
      this.exportingGrid = true;
      try {
        const result = await exportAdvancedLayout(this.advancedTables.slice(0, 4), {
          fileName: '网格布局示例.xlsx',
          sheetName: '网格数据',
          layoutType: 'grid',
          gridCols: 2
        });
        
        this.handleExportResult(result, '网格布局导出');
      } catch (error) {
        this.$message.error('导出失败：' + error.message);
      } finally {
        this.exportingGrid = false;
      }
    },

    // 快速导出方法
    async quickExportVertical() {
      this.exportingQuick1 = true;
      try {
        const result = await quickExport.vertical(this.advancedTables, '快速纵向导出.xlsx');
        this.handleExportResult(result, '快速纵向导出');
      } catch (error) {
        this.$message.error('导出失败：' + error.message);
      } finally {
        this.exportingQuick1 = false;
      }
    },

    async quickExportHorizontal() {
      this.exportingQuick2 = true;
      try {
        const result = await quickExport.horizontal(this.advancedTables, '快速横向导出.xlsx');
        this.handleExportResult(result, '快速横向导出');
      } catch (error) {
        this.$message.error('导出失败：' + error.message);
      } finally {
        this.exportingQuick2 = false;
      }
    },

    async quickExportStyled() {
      this.exportingQuick3 = true;
      try {
        const result = await quickExport.styled(this.advancedTables, '快速样式导出.xlsx', {
          titleColor: 'FF7030A0',
          headerColor: 'FF8064A2',
          alternateColor: 'FFE5DFEC'
        });
        this.handleExportResult(result, '快速样式导出');
      } catch (error) {
        this.$message.error('导出失败：' + error.message);
      } finally {
        this.exportingQuick3 = false;
      }
    },

    // 行业数据导出
    async exportEcommerceData() {
      this.exportingEcommerce = true;
      try {
        const result = await exportAdvancedLayout(this.ecommerceTables, {
          fileName: '电商数据示例.xlsx',
          sheetName: '电商销售数据',
          layoutType: 'vertical'
        });
        this.handleExportResult(result, '电商数据导出');
      } catch (error) {
        this.$message.error('导出失败：' + error.message);
      } finally {
        this.exportingEcommerce = false;
      }
    },

    async exportEducationData() {
      this.exportingEducation = true;
      try {
        const result = await exportAdvancedLayout(this.educationTables, {
          fileName: '教育数据示例.xlsx',
          sheetName: '学生成绩数据',
          layoutType: 'vertical'
        });
        this.handleExportResult(result, '教育数据导出');
      } catch (error) {
        this.$message.error('导出失败：' + error.message);
      } finally {
        this.exportingEducation = false;
      }
    },

    async exportHealthcareData() {
      this.exportingHealthcare = true;
      try {
        const result = await exportAdvancedLayout(this.healthcareTables, {
          fileName: '医疗数据示例.xlsx',
          sheetName: '医疗统计数据',
          layoutType: 'vertical'
        });
        this.handleExportResult(result, '医疗数据导出');
      } catch (error) {
        this.$message.error('导出失败：' + error.message);
      } finally {
        this.exportingHealthcare = false;
      }
    },

    // 自定义配置导出
    async exportCustomStyled() {
      this.exportingCustom = true;
      try {
        const result = await exportAdvancedLayout(this.advancedTables, {
          fileName: '自定义样式示例.xlsx',
          sheetName: '自定义样式数据',
          layoutType: 'vertical',
          customStyles: {
            titleColor: 'FFC00000',
            headerColor: 'FFFF0000',
            headerFontColor: 'FFFFFFFF',
            dataAlign: 'right',
            alternateColor: 'FFFFC7CE',
            borderStyle: 'medium'
          }
        });
        this.handleExportResult(result, '自定义样式导出');
      } catch (error) {
        this.$message.error('导出失败：' + error.message);
      } finally {
        this.exportingCustom = false;
      }
    },

    async exportCombinedLayout() {
      this.exportingCombined = true;
      try {
        const result = await exportAdvancedLayout(this.advancedTables, {
          fileName: '组合布局示例.xlsx',
          sheetName: '组合布局数据',
          layoutType: 'combined'
        });
        this.handleExportResult(result, '组合布局导出');
      } catch (error) {
        this.$message.error('导出失败：' + error.message);
      } finally {
        this.exportingCombined = false;
      }
    },

    // 通用结果处理
    handleExportResult(result, operationName) {
      if (result.success) {
        this.$message.success(`${operationName}成功！`);
      } else {
        this.$message.error(`${operationName}失败：${result.message}`);
      }
    }
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