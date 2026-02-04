import ExcelJS from 'exceljs';

/**
 * 在同一工作表中导出多个表格数据
 * @param {Array} tables - 表格数据数组
 * @param {Object} options - 配置选项
 * @returns {Promise}
 */
export const exportMultipleTablesToSingleSheet = async (tables, options = {}) => {
  try {
    const {
      fileName = 'multiple_tables.xlsx',
      sheetName = '多表数据',
      spacingRows = 2 // 表格之间的间隔行数
    } = options;

    // 创建工作簿和工作表
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Vue Admin System';
    workbook.created = new Date();
    
    const worksheet = workbook.addWorksheet(sheetName);
    
    let currentRow = 1;

    // 处理每个表格
    tables.forEach((table, tableIndex) => {
      const { title, headers, data, tableStyle } = table;
      
      // 添加表格标题（如果有）
      if (title) {
        const titleRow = worksheet.addRow([title]);
        titleRow.font = { 
          bold: true, 
          size: 14, 
          color: { argb: 'FF000000' } 
        };
        titleRow.alignment = { 
          vertical: 'middle', 
          horizontal: 'center' 
        };
        
        // 合并标题单元格
        const headerCount = Math.max(headers ? headers.length : 0, 1);
        worksheet.mergeCells(currentRow, 1, currentRow, headerCount);
        currentRow++;
      }

      // 添加表头（如果有）
      if (headers && headers.length > 0) {
        const headerRow = worksheet.addRow(headers);
        
        // 设置表头样式
        headerRow.eachCell((cell, colNumber) => {
          cell.font = { 
            bold: true, 
            color: { argb: 'FFFFFFFF' } 
          };
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: tableStyle?.headerColor || 'FF0070C0' }
          };
          cell.alignment = { 
            vertical: 'middle', 
            horizontal: 'center' 
          };
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
        });
        currentRow++;
      }

      // 添加数据行
      if (data && data.length > 0) {
        data.forEach(rowData => {
          const dataRow = worksheet.addRow(rowData);
          
          // 设置数据行样式
          dataRow.eachCell((cell, colNumber) => {
            cell.alignment = { 
              vertical: 'middle', 
              horizontal: tableStyle?.align || 'left' 
            };
            cell.border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' }
            };
            
            // 设置交替行颜色
            if (tableStyle?.alternateRowColors && dataRow.number % 2 === 0) {
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFF0F0F0' }
              };
            }
          });
          currentRow++;
        });
      }

      // 在表格之间添加间隔行
      if (tableIndex < tables.length - 1) {
        for (let i = 0; i < spacingRows; i++) {
          worksheet.addRow([]);
          currentRow++;
        }
      }
    });

    // 自动调整所有列的宽度
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
 * 示例数据生成器 - 用于演示同一工作表中的多个表格
 */
export const generateSampleTables = () => {
  return [
    {
      title: '用户信息表',
      headers: ['ID', '姓名', '年龄', '邮箱', '注册时间'],
      data: [
        [1, '张三', 25, 'zhangsan@email.com', '2024-01-15'],
        [2, '李四', 30, 'lisi@email.com', '2024-02-20'],
        [3, '王五', 28, 'wangwu@email.com', '2024-03-10']
      ],
      tableStyle: {
        headerColor: 'FF0070C0',
        align: 'center',
        alternateRowColors: true
      }
    },
    {
      title: '订单信息表',
      headers: ['订单号', '商品名称', '数量', '单价', '总价'],
      data: [
        ['ORD001', '笔记本电脑', 1, 5999, 5999],
        ['ORD002', '鼠标', 2, 129, 258],
        ['ORD003', '键盘', 1, 299, 299]
      ],
      tableStyle: {
        headerColor: 'FF00B050',
        align: 'center',
        alternateRowColors: true
      }
    },
    {
      title: '产品库存表',
      headers: ['产品ID', '产品名称', '库存数量', '预警值'],
      data: [
        ['P001', 'iPhone 15', 50, 10],
        ['P002', 'MacBook Pro', 25, 5],
        ['P003', 'iPad Air', 35, 8]
      ],
      tableStyle: {
        headerColor: 'FFFFC000',
        align: 'center',
        alternateRowColors: true
      }
    }
  ];
};