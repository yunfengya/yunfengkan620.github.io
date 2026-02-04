import ExcelJS from "exceljs";

/**
 * 导出多个工作表，每个工作表支持垂直/水平/网格布局
 * @param {Array} sheets - 工作表配置数组，每个元素包含sheetName、tables、direction、gridCols等
 * @param {Object} options - 全局配置
 * @returns {Promise}
 */
export const exportMultipleSheets = async (sheets, options = {}) => {
    try {
        const { fileName = "多工作表导出.xlsx" } = options;
        const workbook = new ExcelJS.Workbook();
        workbook.creator = "Vue Admin System";
        workbook.created = new Date();
        // 处理每个工作表
        sheets.forEach((sheetConfig) => {
            const {
                sheetName = "Sheet1",
                tables = [],
                direction = "vertical",
                spacingRows = 2,
                spacingColumns = 2,
                gridCols = 2,
            } = sheetConfig;
            const worksheet = workbook.addWorksheet(sheetName);
            let currentRow = 1;
            let currentCol = 1;

            // 网格布局：单独处理所有表格（不参与tables循环）
            if (direction === "grid") {
                const tableRows = [];
                // 将表格分组为gridCols列的行
                for (let i = 0; i < tables.length; i += gridCols) {
                    tableRows.push(tables.slice(i, i + gridCols));
                }

                for (const rowTables of tableRows) {
                    let maxRowHeight = 0;
                    const tableHeights = [];

                    // 计算当前行所有表格的高度
                    rowTables.forEach(table => {
                        const { title, headers, data } = table;
                        const height = (title ? 1 : 0) + (headers?.length ? 1 : 0) + (data?.length || 0);
                        tableHeights.push(height);
                        if (height > maxRowHeight) maxRowHeight = height;
                    });

                    let rowCol = 1;
                    // 处理当前行的每个表格
                    rowTables.forEach((table, idx) => {
                        const { title, headers, data, tableStyle } = table;
                        const numCols = headers?.length || data[0]?.length || 1;
                        const startCol = rowCol;

                        // 标题处理
                        if (title) {
                            worksheet.mergeCells(currentRow, startCol, currentRow, startCol + numCols - 1);
                            const titleCell = worksheet.getCell(currentRow, startCol);
                            titleCell.value = title;
                            titleCell.font = { 
                                bold: true, 
                                size: 14, 
                                // color: { argb: "FF000000" } // 表名颜色
                                color: { argb: tableStyle?.nameColor || "FF000000" } 
                            };
                            titleCell.alignment = { vertical: "middle", horizontal: "center" };
                        }

                        // 表头处理
                        if (headers?.length) {
                            headers.forEach((header, hIdx) => {
                                const cell = worksheet.getCell(currentRow + (title ? 1 : 0), startCol + hIdx);
                                cell.value = header;
                                applyHeaderStyle(cell, tableStyle);
                            });
                        }

                        // 数据处理
                        if (data?.length) {
                            data.forEach((rowData, dIdx) => {
                                rowData.forEach((cellValue, cIdx) => {
                                    const cell = worksheet.getCell(
                                        currentRow + (title ? 1 : 0) + (headers?.length ? 1 : 0) + dIdx,
                                        startCol + cIdx
                                    );
                                    cell.value = cellValue;
                                    applyDataStyle(cell, tableStyle, dIdx);
                                });
                            });
                        }

                        // 更新列位置
                        rowCol += numCols + spacingColumns;
                    });

                    // 更新行位置
                    currentRow += maxRowHeight + spacingRows;
                }
            } else {
                // 垂直/水平布局：按表格逐个处理
                tables.forEach((table, tableIndex) => {
                    const {
                        title, headers, data, tableStyle
                    } = table;
                    const numCols = headers?.length || data[0]?.length || 1;

                    if (direction === "vertical") {
                        // 垂直布局：表格堆叠在下方
                        if (title) {
                            const titleRow = worksheet.addRow([title]);
                            titleRow.font = {
                                bold: true,
                                size: 14,
                                // color: { argb: "FF000000" } // 表名颜色
                                color: { argb: tableStyle?.nameColor || "FF000000" } 
                            };
                            titleRow.alignment = {
                                vertical: "middle",
                                horizontal: "center",
                            };
                            worksheet.mergeCells(
                                currentRow,
                                currentCol,
                                currentRow,
                                currentCol + numCols - 1
                            );
                            currentRow++;
                        }

                        if (headers?.length) {
                            const headerRow = worksheet.addRow(headers);
                            headerRow.eachCell((cell) =>
                                applyHeaderStyle(cell, tableStyle)
                            );
                            currentRow++;
                        }

                        if (data?.length) {
                            data.forEach((rowData, rowIdx) => {
                                const dataRow = worksheet.addRow(rowData);
                                dataRow.eachCell((cell, colNumber) =>
                                    applyDataStyle(cell, tableStyle, rowIdx)
                                );
                                currentRow++;
                            });
                        }

                        // 添加表格间的间隔行
                        if (tableIndex < tables.length - 1) {
                            for (let i = 0; i < spacingRows; i++) {
                                worksheet.addRow([]);
                                currentRow++;
                            }
                        }
                    } else if (direction === "horizontal") {
                        // 水平布局：表格并排显示
                        let startCol = currentCol;

                        if (title) {
                            worksheet.mergeCells(
                                currentRow,
                                startCol,
                                currentRow,
                                startCol + numCols - 1
                            );
                            const titleCell = worksheet.getCell(
                                currentRow,
                                startCol
                            );
                            titleCell.value = title;
                            titleCell.font = {
                                bold: true,
                                size: 14,
                                // color: { argb: "FF000000" } // 表名颜色
                                color: { argb: tableStyle?.nameColor || "FF000000" } 
                            };
                            titleCell.alignment = {
                                vertical: "middle",
                                horizontal: "center",
                            };
                        }

                        if (headers?.length) {
                            headers.forEach((header, idx) => {
                                const cell = worksheet.getCell(
                                    currentRow + 1,
                                    startCol + idx
                                );
                                cell.value = header;
                                applyHeaderStyle(cell, tableStyle);
                            });
                        }

                        if (data?.length) {
                            data.forEach((rowData, rowIdx) => {
                                rowData.forEach((cellValue, colIdx) => {
                                    const cell = worksheet.getCell(
                                        currentRow + 2 + rowIdx,
                                        startCol + colIdx
                                    );
                                    cell.value = cellValue;
                                    applyDataStyle(cell, tableStyle, rowIdx);
                                });
                            });
                        }

                        // 更新当前列位置
                        currentCol = startCol + numCols + spacingColumns;
                    }
                });
            }

            // 自动调整列宽
            worksheet.columns.forEach((column) => {
                let maxLength = 0;
                column.eachCell({ includeEmpty: true }, (cell) => {
                    const length = cell.value
                        ? cell.value.toString().length
                        : 10;
                    maxLength = Math.max(maxLength, length);
                });
                column.width = Math.max(maxLength, 10) + 2;
            });
        });

        // 导出文件
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }, 100);

        return { success: true, message: "导出成功" };
    } catch (error) {
        console.error("导出Excel失败:", error);
        return { success: false, message: `导出失败: ${error.message}` };
    }
};

// 辅助函数：应用表头样式
const applyHeaderStyle = (cell, tableStyle) => {
    cell.font = { bold: true, color: { argb: tableStyle?.headerFontColor || "1f1f1f" } };
    cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: tableStyle?.headerColor || "d2d0cebc" },
    };
    cell.alignment = { vertical: "middle", horizontal: "center" };
    cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
    };
};

// 辅助函数：应用数据单元格样式
const applyDataStyle = (cell, tableStyle, rowIdx) => {
    cell.alignment = {
        vertical: "middle",
        horizontal: tableStyle?.align || "left",
    };
    cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
    };
    if (tableStyle?.alternateRowColors && rowIdx % 2 === 1) {
        cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFF0F0F0" },
        };
    }
};

/**
 * 在同一工作表中导出多个表格数据（兼容旧接口）
 * @param {Array} tables - 表格数据数组
 * @param {Object} options - 配置选项
 * @returns {Promise}
 */
export const exportMultipleTablesToSingleSheet = async (
    tables,
    options = {}
) => {
    const {
        fileName = "多表格导出.xlsx",
        sheetName = "多表数据",
        direction = "vertical",
        spacingRows = 2,
        spacingColumns = 2,
    } = options;
    return exportMultipleSheets(
        [{ sheetName, tables, direction, spacingRows, spacingColumns }],
        { fileName }
    );
};

/**
 * 示例数据生成器 - 用于演示同一工作表中的多个表格
 */
export const generateSampleTables = (tableListSort) => {
    let tables = [];
    tableListSort.forEach((item1) => {
        tables.push({
            title: item1.name,
            headers: item1.tableList.map(
                (tableListitem) => tableListitem.label
            ),
            data: item1.apiList.map((apiListItem) =>
                item1.tableList.map(
                    (tableListItem) => apiListItem[tableListItem.prop]
                )
            ),
            tableStyle: item1.tableStyle || {
                headerColor: "d2d0cebc",
                align: "center",
                alternateRowColors: false,
            },
        });
    });
    return tables;
};

// 执行方法
export const exportExcelFn = async () => {
    let tableStyle = {
        nameColor: "000000ff",           // 表格名称颜色 
        headerColor: "d2d0cebc",           // 表头背景色
        headerFontColor: "#000000ff",      // 表头字体颜色
        align: "center",                  // 文本对齐方式
        alternateRowColors: false,         // 是否交替行颜色
        cellPadding: 5                    // 单元格内边距
    };
    let tableListSort = [
        {
            name: "表格1",
            tableList: [
                { label: "厂区", prop: "site" },
                { label: "机种", prop: "model" },
                { label: "段别", prop: "stage" },
                { label: "线别", prop: "line" },
            ],
            tableStyle: tableStyle,
            apiList: [
                {
                    site: "lxsz",
                    model: "rainer",
                    stage: "hg",
                    line: "L1",
                    enable: "Y",
                },
                {
                    site: "lxsz2",
                    model: "rainer2",
                    stage: "hg2",
                    line: "L12",
                    enable: "N",
                },
            ], //接口2 固定格式 数组数据
        },
        {
            name: "表格2",
            tableList: [
                { label: "厂区", prop: "site" },
                { label: "机种", prop: "model" },
                { label: "段别", prop: "stage" },
                { label: "线别", prop: "line" },
            ],
            apiList: [
                {
                    site: "lxsz",
                    model: "rainer",
                    stage: "hg",
                    line: "L1",
                    enable: "Y",
                },
                {
                    site: "lxsz2",
                    model: "rainer2",
                    stage: "hg2",
                    line: "L12",
                    enable: "N",
                },
            ], //接口2 固定格式 数组数据
        },
        {
            name: "表格3",
            tableList: [
                { label: "厂区", prop: "site" },
                { label: "机种", prop: "model" },
                { label: "段别", prop: "stage" },
                { label: "线别", prop: "line" },
            ],
            apiList: [
                {
                    site: "lxsz",
                    model: "rainer",
                    stage: "hg",
                    line: "L1",
                    enable: "Y",
                },
                {
                    site: "lxsz2",
                    model: "rainer2",
                    stage: "hg2",
                    line: "L12",
                    enable: "N",
                },
            ], //接口2 固定格式 数组数据
        },
    ];
    let dataList = generateSampleTables(tableListSort);
    try {
        // 示例：导出多个工作表，每个工作表使用不同布局
        const result = await exportMultipleSheets(
            [
                {
                    sheetName: "垂直布局工作表",
                    // tables: dataList.slice(0,1),
                    tables: dataList,
                    direction: "vertical",
                    spacingRows: 2,
                },
                {
                    sheetName: "水平布局工作表",
                    // tables: dataList.slice(1),
                    tables: dataList,
                    direction: "horizontal",
                    spacingColumns: 3,
                },
                {
                    sheetName: "网格布局工作表",
                    tables: dataList,
                    direction: "grid",
                    gridCols: 2,
                    spacingRows: 2,
                    spacingColumns: 3,
                },
            ],
            { fileName: "多工作表多布局示例.xlsx" }
        );
        console.log(result.message);
    } catch (error) {
        console.error("导出失败：", error.message);
    } finally {
    }
};