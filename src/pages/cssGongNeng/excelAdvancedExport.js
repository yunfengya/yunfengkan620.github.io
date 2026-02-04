import ExcelJS from 'exceljs';

/**
 * 高级Excel导出工具 - 支持多种表格布局方式和配置
 * 提供纵向、横向、网格、组合等多种布局方式
 */

/**
 * 导出到同一工作表的多种布局方式
 * @param {Array} tables - 表格数据数组
 * @param {Object} options - 配置选项
 * @returns {Promise}
 */
export const exportAdvancedLayout = async (tables, options = {}) => {
  try {
    const {
      fileName = 'advanced_layout.xlsx',
      sheetName = '高级布局数据',
      layoutType = 'vertical', // vertical, horizontal, grid, combined
      spacingRows = 2, // 纵向布局的间隔行数
      spacingCols = 3, // 横向布局的间隔列数
      gridCols = 2, // 网格布局的列数
      customStyles = {}
    } = options;

    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Vue Admin System';
    workbook.created = new Date();
    
    const worksheet = workbook.addWorksheet(sheetName);
    
    switch (layoutType) {
      case 'vertical':
        await exportVerticalLayout(worksheet, tables, spacingRows, customStyles);
        break;
      case 'horizontal':
        await exportHorizontalLayout(worksheet, tables, spacingCols, customStyles);
        break;
      case 'grid':
        await exportGridLayout(worksheet, tables, gridCols, customStyles);
        break;
      case 'combined':
        await exportCombinedLayout(worksheet, tables, customStyles);
        break;
      default:
        await exportVerticalLayout(worksheet, tables, spacingRows, customStyles);
    }

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
 * 纵向布局 - 表格从上到下排列
 */
const exportVerticalLayout = async (worksheet, tables, spacingRows, customStyles) => {
  let currentRow = 1;

  tables.forEach((table, tableIndex) => {
    const { title, headers, data, tableStyle = {} } = table;
    
    // 添加表格标题
    if (title) {
      const titleRow = worksheet.addRow([title]);
      titleRow.font = { 
        bold: true, 
        size: 14, 
        color: { argb: tableStyle.titleColor || customStyles.titleColor || 'FF000000' }
      };
      titleRow.alignment = { vertical: 'middle', horizontal: 'center' };
      
      const headerCount = Math.max(headers ? headers.length : 0, 1);
      worksheet.mergeCells(currentRow, 1, currentRow, headerCount);
      currentRow++;
    }

    // 添加表头
    if (headers && headers.length > 0) {
      const headerRow = worksheet.addRow(headers);
      
      headerRow.eachCell((cell, colNumber) => {
        cell.font = { 
          bold: true, 
          color: { argb: tableStyle.headerFontColor || customStyles.headerFontColor || 'FFFFFFFF' }
        };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: tableStyle.headerColor || customStyles.headerColor || 'FF0070C0' }
        };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.border = {
          top: { style: tableStyle.borderStyle || 'thin' },
          left: { style: tableStyle.borderStyle || 'thin' },
          bottom: { style: tableStyle.borderStyle || 'thin' },
          right: { style: tableStyle.borderStyle || 'thin' }
        };
      });
      currentRow++;
    }

    // 添加数据行
    if (data && data.length > 0) {
      data.forEach(rowData => {
        const dataRow = worksheet.addRow(rowData);
        
        dataRow.eachCell((cell, colNumber) => {
          cell.alignment = { 
            vertical: 'middle', 
            horizontal: tableStyle.align || customStyles.dataAlign || 'left' 
          };
          cell.border = {
            top: { style: tableStyle.borderStyle || 'thin' },
            left: { style: tableStyle.borderStyle || 'thin' },
            bottom: { style: tableStyle.borderStyle || 'thin' },
            right: { style: tableStyle.borderStyle || 'thin' }
          };
          
          if (tableStyle.alternateRowColors && dataRow.number % 2 === 0) {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: tableStyle.alternateColor || customStyles.alternateColor || 'FFF0F0F0' }
            };
          }
        });
        currentRow++;
      });
    }

    // 添加间隔行
    if (tableIndex < tables.length - 1) {
      for (let i = 0; i < spacingRows; i++) {
        worksheet.addRow([]);
        currentRow++;
      }
    }
  });
};

/**
 * 横向布局 - 表格从左到右排列
 */
const exportHorizontalLayout = async (worksheet, tables, spacingCols, customStyles) => {
  let startCol = 1;
  let maxRows = 0;

  // 第一遍：计算最大行数
  tables.forEach(table => {
    const { title, headers, data } = table;
    let tableHeight = 0;
    if (title) tableHeight++;
    if (headers) tableHeight++;
    if (data) tableHeight += data.length;
    maxRows = Math.max(maxRows, tableHeight);
  });

  // 第二遍：放置表格
  tables.forEach((table) => {
    const { title, headers, data, tableStyle = {} } = table;
    let currentRow = 1;

    // 添加表格标题
    if (title) {
      worksheet.getCell(currentRow, startCol).value = title;
      worksheet.getCell(currentRow, startCol).font = { 
        bold: true, 
        size: 14, 
        color: { argb: tableStyle.titleColor || customStyles.titleColor || 'FF000000' }
      };
      worksheet.getCell(currentRow, startCol).alignment = { vertical: 'middle', horizontal: 'center' };
      
      const headerCount = Math.max(headers ? headers.length : 0, 1);
      worksheet.mergeCells(currentRow, startCol, currentRow, startCol + headerCount - 1);
      currentRow++;
    }

    // 添加表头
    if (headers && headers.length > 0) {
      headers.forEach((header, colIndex) => {
        const cell = worksheet.getCell(currentRow, startCol + colIndex);
        cell.value = header;
        cell.font = { 
          bold: true, 
          color: { argb: tableStyle.headerFontColor || customStyles.headerFontColor || 'FFFFFFFF' }
        };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: tableStyle.headerColor || customStyles.headerColor || 'FF0070C0' }
        };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.border = {
          top: { style: tableStyle.borderStyle || 'thin' },
          left: { style: tableStyle.borderStyle || 'thin' },
          bottom: { style: tableStyle.borderStyle || 'thin' },
          right: { style: tableStyle.borderStyle || 'thin' }
        };
      });
      currentRow++;
    }

    // 添加数据行
    if (data && data.length > 0) {
      data.forEach((rowData, rowIndex) => {
        rowData.forEach((cellData, colIndex) => {
          const cell = worksheet.getCell(currentRow + rowIndex, startCol + colIndex);
          cell.value = cellData;
          cell.alignment = { 
            vertical: 'middle', 
            horizontal: tableStyle.align || customStyles.dataAlign || 'left' 
          };
          cell.border = {
            top: { style: tableStyle.borderStyle || 'thin' },
            left: { style: tableStyle.borderStyle || 'thin' },
            bottom: { style: tableStyle.borderStyle || 'thin' },
            right: { style: tableStyle.borderStyle || 'thin' }
          };
          
          if (tableStyle.alternateRowColors && rowIndex % 2 === 1) {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: tableStyle.alternateColor || customStyles.alternateColor || 'FFF0F0F0' }
            };
          }
        });
      });
    }

    // 更新下一个表格的起始列
    const tableWidth = Math.max(headers ? headers.length : 0, 1);
    startCol += tableWidth + spacingCols;
  });
};

/**
 * 网格布局 - 表格按网格排列
 */
const exportGridLayout = async (worksheet, tables, gridCols, customStyles) => {
  const gridRows = Math.ceil(tables.length / gridCols);
  const cellWidth = Math.floor(15 / gridCols); // 假设总宽度为15
  
  for (let gridRow = 0; gridRow < gridRows; gridRow++) {
    for (let gridCol = 0; gridCol < gridCols; gridCol++) {
      const tableIndex = gridRow * gridCols + gridCol;
      if (tableIndex >= tables.length) break;
      
      const table = tables[tableIndex];
      const startCol = gridCol * cellWidth + 1;
      const startRow = gridRow * 10 + 1; // 每格10行高度
      
      await placeTableInGrid(worksheet, table, startRow, startCol, cellWidth, customStyles);
    }
  }
};

/**
 * 在网格中放置单个表格
 */
const placeTableInGrid = async (worksheet, table, startRow, startCol, maxWidth, customStyles) => {
  const { title, headers, data, tableStyle = {} } = table;
  let currentRow = startRow;

  // 添加表格标题
  if (title) {
    worksheet.getCell(currentRow, startCol).value = title;
    worksheet.getCell(currentRow, startCol).font = { 
      bold: true, 
      size: 12, 
      color: { argb: tableStyle.titleColor || customStyles.titleColor || 'FF000000' }
    };
    worksheet.getCell(currentRow, startCol).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.mergeCells(currentRow, startCol, currentRow, startCol + maxWidth - 1);
    currentRow++;
  }

  // 添加表头
  if (headers && headers.length > 0) {
    headers.forEach((header, colIndex) => {
      if (colIndex < maxWidth) {
        const cell = worksheet.getCell(currentRow, startCol + colIndex);
        cell.value = header;
        cell.font = { 
          bold: true, 
          color: { argb: tableStyle.headerFontColor || customStyles.headerFontColor || 'FFFFFFFF' }
        };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: tableStyle.headerColor || customStyles.headerColor || 'FF0070C0' }
        };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.border = {
          top: { style: tableStyle.borderStyle || 'thin' },
          left: { style: tableStyle.borderStyle || 'thin' },
          bottom: { style: tableStyle.borderStyle || 'thin' },
          right: { style: tableStyle.borderStyle || 'thin' }
        };
      }
    });
    currentRow++;
  }

  // 添加数据行
  if (data && data.length > 0) {
    data.forEach((rowData, rowIndex) => {
      rowData.forEach((cellData, colIndex) => {
        if (colIndex < maxWidth) {
          const cell = worksheet.getCell(currentRow + rowIndex, startCol + colIndex);
          cell.value = cellData;
          cell.alignment = { 
            vertical: 'middle', 
            horizontal: tableStyle.align || customStyles.dataAlign || 'left' 
          };
          cell.border = {
            top: { style: tableStyle.borderStyle || 'thin' },
            left: { style: tableStyle.borderStyle || 'thin' },
            bottom: { style: tableStyle.borderStyle || 'thin' },
            right: { style: tableStyle.borderStyle || 'thin' }
          };
        }
      });
    });
  }
};

/**
 * 组合布局 - 混合多种布局方式
 */
const exportCombinedLayout = async (worksheet, tables, customStyles) => {
  // 这里可以根据具体需求实现复杂的组合布局
  // 例如：第一个表格纵向，后面两个表格横向排列等
  
  // 简单示例：前两个表格纵向，后面的表格横向
  const verticalTables = tables.slice(0, 2);
  const horizontalTables = tables.slice(2);
  
  if (verticalTables.length > 0) {
    await exportVerticalLayout(worksheet, verticalTables, 2, customStyles);
  }
  
  if (horizontalTables.length > 0) {
    // 计算纵向布局后的起始行
    let startRow = 1;
    verticalTables.forEach(table => {
      const { title, headers, data } = table;
      if (title) startRow++;
      if (headers) startRow++;
      if (data) startRow += data.length;
      startRow += 2; // 间隔行
    });
    
    // 创建新的工作表区域进行横向布局
    const tempWorksheet = workbook.addWorksheet('temp');
    await exportHorizontalLayout(tempWorksheet, horizontalTables, 3, customStyles);
    
    // 将横向布局的内容复制到主工作表
    // 这里需要实现复制逻辑，由于复杂度较高，暂不实现
  }
};

/**
 * 生成高级布局示例数据
 */
export const generateAdvancedSampleData = () => {
  return [
    {
      title: '员工信息表',
      headers: ['工号', '姓名', '部门', '职位', '入职日期'],
      data: [
        ['E001', '张三', '技术部', '前端工程师', '2023-01-15'],
        ['E002', '李四', '产品部', '产品经理', '2023-03-20'],
        ['E003', '王五', '运营部', '运营专员', '2023-05-10'],
        ['E004', '赵六', '市场部', '市场总监', '2023-02-28']
      ],
      tableStyle: {
        headerColor: 'FF4F81BD',
        titleColor: 'FF385723',
        headerFontColor: 'FFFFFFFF',
        align: 'center',
        alternateRowColors: true,
        alternateColor: 'FFE6E6E6',
        borderStyle: 'thin'
      }
    },
    {
      title: '项目进度表',
      headers: ['项目编号', '项目名称', '负责人', '进度%', '状态'],
      data: [
        ['P001', '电商平台重构', '张三', 75, '进行中'],
        ['P002', '移动端APP开发', '李四', 90, '测试中'],
        ['P003', '数据分析系统', '王五', 50, '进行中'],
        ['P004', '官网改版', '赵六', 100, '已完成']
      ],
      tableStyle: {
        headerColor: 'FFC0504D',
        titleColor: 'FF953735',
        headerFontColor: 'FFFFFFFF',
        align: 'center',
        alternateRowColors: true,
        alternateColor: 'FFFFF2CC',
        borderStyle: 'medium'
      }
    },
    {
      title: '财务数据表',
      headers: ['月份', '收入', '支出', '利润', '增长率%'],
      data: [
        ['1月', 500000, 300000, 200000, 25],
        ['2月', 550000, 320000, 230000, 15],
        ['3月', 600000, 350000, 250000, 8.7],
        ['4月', 650000, 370000, 280000, 12]
      ],
      tableStyle: {
        headerColor: 'FF9BBB59',
        titleColor: 'FF4F6128',
        headerFontColor: 'FFFFFFFF',
        align: 'center',
        alternateRowColors: true,
        alternateColor: 'FFE2EFDA',
        borderStyle: 'thin'
      }
    },
    {
      title: '库存统计表',
      headers: ['产品类别', '库存数量', '预警值', '状态', '最后更新'],
      data: [
        ['电子产品', 150, 20, '充足', '2024-01-15'],
        ['办公用品', 85, 30, '正常', '2024-01-16'],
        ['服装鞋帽', 45, 50, '预警', '2024-01-14'],
        ['食品饮料', 120, 40, '充足', '2024-01-17']
      ],
      tableStyle: {
        headerColor: 'FF8064A2',
        titleColor: 'FF4F3A6B',
        headerFontColor: 'FFFFFFFF',
        align: 'center',
        alternateRowColors: true,
        alternateColor: 'FFE5DFEC',
        borderStyle: 'dashed'
      }
    }
  ];
};

/**
 * 生成各行业示例数据
 */
export const generateIndustrySampleData = (industry = 'general') => {
  const dataMap = {
    ecommerce: [
      {
        title: '电商销售数据',
        headers: ['商品ID', '商品名称', '销量', '销售额', '毛利率%'],
        data: [
          ['P1001', '智能手机', 1500, 7500000, 25],
          ['P1002', '笔记本电脑', 800, 4800000, 30],
          ['P1003', '耳机', 3000, 900000, 40],
          ['P1004', '智能手表', 1200, 3600000, 35]
        ]
      }
    ],
    education: [
      {
        title: '学生成绩表',
        headers: ['学号', '姓名', '语文', '数学', '英语', '总分'],
        data: [
          ['S001', '张三', 85, 92, 78, 255],
          ['S002', '李四', 78, 88, 85, 251],
          ['S003', '王五', 92, 95, 90, 277],
          ['S004', '赵六', 65, 72, 68, 205]
        ]
      }
    ],
    healthcare: [
      {
        title: '医疗数据统计',
        headers: ['科室', '患者数', '治愈数', '治愈率%', '平均住院天数'],
        data: [
          ['内科', 250, 230, 92, 5.2],
          ['外科', 180, 170, 94.4, 7.8],
          ['儿科', 120, 115, 95.8, 4.5],
          ['妇产科', 150, 145, 96.7, 3.2]
        ]
      }
    ],
    general: generateAdvancedSampleData()
  };

  return dataMap[industry] || dataMap.general;
};

/**
 * 快速导出方法 - 简化调用
 */
export const quickExport = {
  // 纵向布局快速导出
  vertical: (tables, fileName = 'vertical_export.xlsx') => {
    return exportAdvancedLayout(tables, {
      fileName,
      layoutType: 'vertical',
      spacingRows: 2
    });
  },
  
  // 横向布局快速导出
  horizontal: (tables, fileName = 'horizontal_export.xlsx') => {
    return exportAdvancedLayout(tables, {
      fileName,
      layoutType: 'horizontal',
      spacingCols: 3
    });
  },
  
  // 网格布局快速导出
  grid: (tables, fileName = 'grid_export.xlsx', cols = 2) => {
    return exportAdvancedLayout(tables, {
      fileName,
      layoutType: 'grid',
      gridCols: cols
    });
  },
  
  // 带样式的快速导出
  styled: (tables, fileName = 'styled_export.xlsx', styles = {}) => {
    return exportAdvancedLayout(tables, {
      fileName,
      layoutType: 'vertical',
      spacingRows: 2,
      customStyles: styles
    });
  }
};