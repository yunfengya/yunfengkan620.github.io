<template>
  <div class="excel-export-demo">
    <el-card class="export-card">
      <div slot="header">
        <span>Excel多表导出演示</span>
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
        <h3>预览数据：</h3>
        
        <!-- 用户数据预览 -->
        <div class="sheet-preview">
          <h4>用户数据表</h4>
          <el-table :data="sampleData[0].data" border size="mini" style="width: 100%">
            <el-table-column 
              v-for="(header, index) in sampleData[0].headers" 
              :key="index"
              :prop="index.toString()"
              :label="header"
              width="120"
            />
          </el-table>
        </div>

        <!-- 订单数据预览 -->
        <div class="sheet-preview">
          <h4>订单数据表</h4>
          <el-table :data="sampleData[1].data" border size="mini" style="width: 100%">
            <el-table-column 
              v-for="(header, index) in sampleData[1].headers" 
              :key="index"
              :prop="index.toString()"
              :label="header"
              width="120"
            />
          </el-table>
        </div>

        <!-- 产品库存预览 -->
        <div class="sheet-preview">
          <h4>产品库存表</h4>
          <el-table :data="sampleData[2].data" border size="mini" style="width: 100%">
            <el-table-column 
              v-for="(header, index) in sampleData[2].headers" 
              :key="index"
              :prop="index.toString()"
              :label="header"
              width="120"
            />
          </el-table>
        </div>
      </div>

      <div class="custom-data-section">
        <h3>自定义导出数据</h3>
        <el-button 
          type="success" 
          size="small" 
          @click="showCustomDialog = true"
        >
          配置自定义数据
        </el-button>
      </div>

      <!-- 自定义数据配置对话框 -->
      <el-dialog 
        title="配置自定义导出数据" 
        :visible.sync="showCustomDialog"
        width="600px"
      >
        <div v-for="(sheet, sheetIndex) in customData" :key="sheetIndex" class="custom-sheet">
          <h4>工作表 {{ sheetIndex + 1 }}</h4>
          <el-input 
            v-model="sheet.sheetName" 
            placeholder="工作表名称" 
            style="margin-bottom: 10px;"
          />
          
          <div class="headers-config">
            <span>表头：</span>
            <el-input 
              v-model="headerInput"
              placeholder="输入表头，用逗号分隔"
              style="width: 300px; margin-right: 10px;"
            />
            <el-button 
              size="mini" 
              @click="applyHeaders(sheetIndex)"
            >
              应用
            </el-button>
          </div>

          <el-table :data="sheet.data" border size="mini" style="width: 100%; margin-top: 10px;">
            <el-table-column 
              v-for="(header, colIndex) in sheet.headers" 
              :key="colIndex"
              :label="header"
            >
              <template slot-scope="scope">
                <el-input 
                  v-model="scope.row[colIndex]"
                  size="mini"
                  :placeholder="`输入${header}`"
                />
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <el-button 
                  type="danger" 
                  size="mini" 
                  @click="removeRow(sheetIndex, scope.$index)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-button 
            type="primary" 
            size="mini" 
            @click="addRow(sheetIndex)"
            style="margin-top: 10px;"
          >
            添加行
          </el-button>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="showCustomDialog = false">取消</el-button>
          <el-button 
            type="primary" 
            @click="exportCustomData"
          >
            导出自定义数据
          </el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { exportMultipleSheetsToExcel, generateSampleData } from '@/utils/excelExport';

export default {
  name: 'ExcelMultiSheetExport',
  data() {
    return {
      exporting: false,
      showCustomDialog: false,
      headerInput: '',
      sampleData: generateSampleData(),
      customData: [
        {
          sheetName: '自定义表1',
          headers: ['列1', '列2', '列3'],
          data: [['', '', ''], ['', '', '']]
        }
      ]
    };
  },
  methods: {
    async exportData() {
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

    applyHeaders(sheetIndex) {
      if (this.headerInput.trim()) {
        const headers = this.headerInput.split(',').map(h => h.trim());
        this.customData[sheetIndex].headers = headers;
        
        // 调整数据行以适应新的表头数量
        const currentColCount = this.customData[sheetIndex].data[0]?.length || 0;
        const newColCount = headers.length;
        
        if (newColCount > currentColCount) {
          // 需要添加列
          this.customData[sheetIndex].data = this.customData[sheetIndex].data.map(row => 
            [...row, ...Array(newColCount - currentColCount).fill('')]
          );
        } else if (newColCount < currentColCount) {
          // 需要删除列
          this.customData[sheetIndex].data = this.customData[sheetIndex].data.map(row => 
            row.slice(0, newColCount)
          );
        }
        
        this.headerInput = '';
      }
    },

    addRow(sheetIndex) {
      const colCount = this.customData[sheetIndex].headers.length;
      this.customData[sheetIndex].data.push(Array(colCount).fill(''));
    },

    removeRow(sheetIndex, rowIndex) {
      this.customData[sheetIndex].data.splice(rowIndex, 1);
    },

    async exportCustomData() {
      this.exporting = true;
      try {
        // 过滤空数据行
        const filteredData = this.customData.map(sheet => ({
          ...sheet,
          data: sheet.data.filter(row => row.some(cell => cell.trim() !== ''))
        }));

        const result = await exportMultipleSheetsToExcel(filteredData, '自定义数据导出.xlsx');
        if (result.success) {
          this.$message.success('自定义数据导出成功！');
          this.showCustomDialog = false;
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
.excel-export-demo {
  padding: 20px;
}

.export-card {
  margin-bottom: 20px;
}

.data-preview {
  margin-bottom: 20px;
}

.sheet-preview {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.sheet-preview h4 {
  margin: 0 0 10px 0;
  color: #409EFF;
}

.custom-data-section {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #ebeef5;
}

.custom-sheet {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}

.custom-sheet h4 {
  margin: 0 0 10px 0;
  color: #67C23A;
}

.headers-config {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.headers-config span {
  margin-right: 10px;
  font-weight: bold;
}
</style>