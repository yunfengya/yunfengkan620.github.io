import ExcelJS from 'exceljs';

/**
 * 横向布局导出 - 在同一工作表中并排显示多个表格
 * @param {Array} tables - 表格数据数组
 * @param {Object} options - 配置选项
 * @returns {Promise}
 */
export const exportHorizontalTables = async (tables, options = {}) => {
  try {
    const {
      fileName = 'horizontal_tables.xlsx',
      sheetName = '横向布局数据',
      spacingCols = 3 // 表格之间的间隔列数
    } = options;

    // 创建工作簿和工作表
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Vue Admin System';
    workbook.created = new Date();
    
    const worksheet = workbook.addWorksheet(sheetName);
    
    let startCol = 1;

    // 处理每个表格 - 横向排列
    tables.forEach((table) => {
      const { title, headers, data, tableStyle } = table;
      
      // 添加表格标题（如果有）
      if (title) {
        worksheet.getCell(1, startCol).value = title;
        worksheet.getCell(1, startCol).font = { 
          bold: true, 
          size: 14, 
          color: { argb: 'FF000000' } 
        };
        worksheet.getCell(1, startCol).alignment = { 
          vertical: 'middle', 
          horizontal: 'center' 
        };
        
        // 合并标题单元格
        const headerCount = Math.max(headers ? headers.length : 0, 1);
        worksheet.mergeCells(1, startCol, 1, startCol + headerCount - 1);
      }

      // 添加表头（如果有）
      if (headers && headers.length > 0) {
        headers.forEach((header, colIndex) => {
          const cell = worksheet.getCell(title ? 2 : 1, startCol + colIndex);
          cell.value = header;
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
      }

      // 添加数据行
      if (data && data.length > 0) {
        data.forEach((rowData, rowIndex) => {
          rowData.forEach((cellData, colIndex) => {
            const cell = worksheet.getCell(
              (title ? 3 : 2) + rowIndex, 
              startCol + colIndex
            );
            cell.value = cellData;
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
            if (tableStyle?.alternateRowColors && rowIndex % 2 === 1) {
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFF0F0F0' }
              };
            }
          });
        });
      }

      // 更新下一个表格的起始列
      const tableWidth = Math.max(headers ? headers.length : 0, 1);
      startCol += tableWidth + spacingCols;
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

    // 自动调整行高
    for (let row = 1; row <= worksheet.rowCount; row++) {
      const rowObj = worksheet.getRow(row);
      rowObj.height = 20;
    }

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
 * 生成横向布局示例数据
 */
export const generateHorizontalSampleData = () => {
  return [
    {
      title: '用户信息',
      headers: ['ID', '姓名', '部门'],
      data: [
        [1, '张三', '技术部'],
        [2, '李四', '市场部'],
        [3, '王五', '财务部']
      ],
      tableStyle: {
        headerColor: 'FF0070C0',
        align: 'center',
        alternateRowColors: true
      }
    },
    {
      title: '销售数据',
      headers: ['产品', '数量', '金额'],
      data: [
        ['产品A', 100, 5000],
        ['产品B', 200, 8000],
        ['产品C', 150, 6000]
      ],
      tableStyle: {
        headerColor: 'FF00B050',
        align: 'center',
        alternateRowColors: true
      }
    },
    {
      title: '库存情况',
      headers: ['仓库', '库存量', '状态'],
      data: [
        ['北京仓', 500, '正常'],
        ['上海仓', 300, '充足'],
        ['广州仓', 200, '预警']
      ],
      tableStyle: {
        headerColor: 'FFFFC000',
        align: 'center',
        alternateRowColors: true
      }
    }
  ];
};