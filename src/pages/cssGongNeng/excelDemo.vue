<template>
  <div class="advanced-excel-demo">
    <!-- 基础导出功能 -->
    <div class="section">
      <h3>基础导出功能</h3>
      <div class="item_box">
        <span>导出多个工作表，每个工作表支持垂直/水平/网格布局</span>
        <el-button type="primary" size="small" @click="exportData1">
          导出
        </el-button>
      </div>
      <div class="item_box">
        <span>2</span>
        <el-button type="success" size="small">
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
      let tableListSort1 = [
        {
          name: "接单排行",
          // 下载栏位
          tableList: [
            { label: "维度", prop: "yaxislabel" },
            { label: "数量", prop: "counts" },
          ],
          // tableStyle: tableStyle_,
          apiList: [], //接口 数据
        },
        {
          name: "接单英雄榜",
          tableList: [
            { label: "接单人", prop: "accept_emp" },
            { label: "接单人", prop: "accept_emp_name" },
            { label: "接单数量", prop: "accept_count" },
            { label: "平均响应时长", prop: "avg_response_time" },
            { label: "平均处理时长", prop: "avg_handle_time" },
          ],
          tableStyle: {},
          apiList: [], //接口 数据
        },
        {
          name: "处理分类",
          tableList: [
            { label: "远程", prop: "site" },
            { label: "Online", prop: "model" },
            { label: "远程+Online", prop: "stage" },
          ],
          tableStyle: {},
          apiList: [], //接口 数据
        },
        {
          name: "故障排名TOP10",
          tableList: [
            { label: "故障名称", prop: "fault_name" },
            { label: "接单数量", prop: "serial_number" },
            { label: "故障总时长", prop: "total_duration" },
          ],
          tableStyle: {},
          apiList: [], //接口 数据
        },
      ]
      let excelData = {
        fileName: '接单英雄榜.xlsx',
        // 多个sheet 工作簿
        sheetArr: [
          {
            sheetName: "sheet1",
            tables: tableListSort1,// sheet 多个表格 数据
            direction: "grid",
            gridCols: 2,//一行2个表
            spacingRows: 2,
            spacingColumns: 2,
          },
        ],
      }
      exportExcelFn(excelData)
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