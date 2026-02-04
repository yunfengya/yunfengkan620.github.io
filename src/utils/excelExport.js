import ExcelJS from 'exceljs';

/**
 * 导出多表数据到Excel
 * @param {Array} worksheets - 工作表数据数组
 * @param {String} fileName - 导出文件名
 * @returns {Promise}
 */
export const exportMultipleSheetsToExcel = async (worksheets, fileName = 'export.xlsx') => {
  try {
    // 创建工作簿
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Vue Admin System';
    workbook.created = new Date();

    // 为每个工作表数据创建工作表
    worksheets.forEach((sheetData, index) => {
      const worksheet = workbook.addWorksheet(sheetData.sheetName || `Sheet${index + 1}`);
      
      // 添加表头
      if (sheetData.headers && sheetData.headers.length > 0) {
        worksheet.addRow(sheetData.headers);
        
        // 设置表头样式
        const headerRow = worksheet.getRow(1);
        headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
        headerRow.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF0070C0' }
        };
        headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
      }

      // 添加数据行
      if (sheetData.data && sheetData.data.length > 0) {
        sheetData.data.forEach(rowData => {
          worksheet.addRow(rowData);
        });
      }

      // 自动调整列宽
      worksheet.columns.forEach(column => {
        let maxLength = 0;
        column.eachCell({ includeEmpty: true }, cell => {
          const columnLength = cell.value ? cell.value.toString().length : 10;
          if (columnLength > maxLength) {
            maxLength = columnLength;
          }
        });
        column.width = maxLength < 10 ? 10 : maxLength + 2;
      });

      // 冻结表头行（如果有数据）
      if (sheetData.data && sheetData.data.length > 0) {
        worksheet.views = [{ state: 'frozen', ySplit: 1 }];
      }
    });

    // 导出文件
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    // 创建下载链接
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    
    // 清理
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);

    return { success: true, message: '导出成功' };
  } catch (error) {
    console.error('导出Excel失败:', error);
    return { success: false, message: `导出失败: ${error.message}` };
  }
};

/**
 * 示例数据生成器 - 用于演示
 */
export const generateSampleData = () => {
  return [
    {
      sheetName: '用户数据',
      headers: ['ID', '姓名', '年龄', '邮箱', '注册时间'],
      data: [
        [1, '张三', 25, 'zhangsan@email.com', '2024-01-15'],
        [2, '李四', 30, 'lisi@email.com', '2024-02-20'],
        [3, '王五', 28, 'wangwu@email.com', '2024-03-10']
      ]
    },
    {
      sheetName: '订单数据',
      headers: ['订单号', '商品名称', '数量', '单价', '总价'],
      data: [
        ['ORD001', '笔记本电脑', 1, 5999, 5999],
        ['ORD002', '鼠标', 2, 129, 258],
        ['ORD003', '键盘', 1, 299, 299]
      ]
    },
    {
      sheetName: '产品库存',
      headers: ['产品ID', '产品名称', '库存数量', '预警值'],
      data: [
        ['P001', 'iPhone 15', 50, 10],
        ['P002', 'MacBook Pro', 25, 5],
        ['P003', 'iPad Air', 35, 8]
      ]
    }
  ];
};