<template>
    <div class="contain_box">
        <div style="width:100%;height:100%;">
            <el-button type="success" @click="exceljsFn">点击下载exceljsFn</el-button>
            <el-button type="success" @click="jsExportExcelFn">点击下载jsExportExcelFn</el-button>
        </div>
    </div>
</template>

<script>
import ExportJsonExcel from 'js-export-excel';
import * as ExcelJS from 'exceljs'
export default {
    name: "index",
    data() {
        return {

        };
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
        // 多个sheet 和每个sheet中有多个小表格
        // import * as ExcelJS from 'exceljs'
        exceljsFn() {
            // 创建一个新的工作簿
            let workbook = new ExcelJS.Workbook();
            // 定义数据集，包括表名、自定义表头、数据字段和数据列表
            let datasets = [
                {
                    name: 'sheet1',
                    data: [
                        {
                            name: '小表格1',
                            headers: ['厂区名', '机种名', '段别名', '楼栋名', '楼层名'],
                            columns: ['site', 'model', 'stage', 'floord', 'floor'],
                            list: [
                                { site: '厂区A', model: '机种1', stage: '段别1', floord: '楼栋1', floor: '1楼', feng: 'fffff' },
                                { site: '厂区B', model: '机种2', stage: '段别2', floord: '楼栋2', floor: '2楼' },
                                // ... 更多数据项
                            ],
                        },
                        {
                            name: '小表格2',
                            headers: ['厂区名', '机种名', '段别名', '楼栋名', '楼层名'],
                            columns: ['site', 'model', 'stage', 'floord', 'floor'],
                            list: [
                                { site: '厂区C', model: '机种3', stage: '段别3', floord: '楼栋3', floor: '3楼' },
                                { site: '厂区D', model: '机种4', stage: '段别4', floord: '楼栋4', floor: '4楼' },
                                // ... 更多数据项
                            ],
                        },
                        // ... 更多小表格数据
                    ],
                },
                // ... 更多sheets数据
                {
                    name: 'sheet2',
                    data: [
                        {
                            name: '小表格1',
                            headers: ['厂区名2', '机种名', '段别名', '楼栋名', '楼层名'],
                            columns: ['site', 'model', 'stage', 'floord', 'floor'],
                            list: [
                                { site: '厂区A', model: '机种1', stage: '段别1', floord: '楼栋1', floor: '1楼' },
                                { site: '厂区B', model: '机种2', stage: '段别2', floord: '楼栋2', floor: '2楼' },
                                // ... 更多数据项
                            ],
                        },
                        {
                            name: '小表格2',
                            headers: ['厂区名2', '机种名', '段别名', '楼栋名', '楼层名'],
                            columns: ['site', 'model', 'stage', 'floord', 'floor'],
                            list: [
                                { site: '厂区C', model: '机种3', stage: '段别3', floord: '楼栋3', floor: '3楼' },
                                { site: '厂区D', model: '机种4', stage: '段别4', floord: '楼栋4', floor: '4楼' },
                                // ... 更多数据项
                            ],
                        },
                        // ... 更多小表格数据
                    ],
                },
            ];

            // 遍历数据集，为每个数据集创建一个工作表，并填充数据
            datasets.forEach((dataset) => {
                // 创建一个新的工作表
                let worksheet = workbook.addWorksheet(dataset.name);
                let currentRow = 1;
                dataset.data.forEach((subDataset,subDatasetIndex) => {
                    // 添加小表格的标题
                    worksheet.mergeCells(currentRow, 1, currentRow, subDataset.headers.length);
                    let titleCell = worksheet.getCell(currentRow, 1);
                    titleCell.value = subDataset.name;
                    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
                    currentRow++;
                    // 写入自定义表头
                    subDataset.headers.forEach((header, index) => {
                        worksheet.getCell(currentRow, index + 1).value = header;
                    });
                    currentRow++;
                    // 写入数据列表
                    subDataset.list.forEach((rowData) => {
                        subDataset.columns.forEach((column, columnIndex) => {
                            worksheet.getCell(currentRow, columnIndex + 1).value = rowData[column];
                        });
                        currentRow++;
                    });
                    // 在每个小表格之间添加一行空白
                    currentRow++;
                });
            });
            // 导出工作簿
            workbook.xlsx.writeBuffer().then((buffer) => {
                let blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                let link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'exceljsFn下载的工作簿.xlsx';
                link.click();
            });
        },

        // 一个excel中 多个sheet 每个sheet只有一个小表
        // import ExportJsonExcel from 'js-export-excel';
        jsExportExcelFn() {
            // let sheetDataValue=this.list||[]
            let sheetDataValue = [
                {
                    site: "11",
                    model: "12",
                    stage: "13",
                    floord: "14",
                    floor: "15",
                },
                {
                    site: "21",
                    model: "22",
                    stage: "23",
                    floord: "24",
                    floor: "25",
                },
            ]
            //
            let tableListSort = [
                { label: '厂区', prop: 'site', width: 6 },
                { label: '机种', prop: 'model', width: 6 },
                { label: '段别', prop: 'stage', width: 6 },
                { label: '楼栋', prop: 'floord', width: 6 },
                { label: '楼层', prop: 'floor', width: 6 },
            ]
            //
            let option = {
                fileName: `jsExportExcelFn下载的工作簿`,
                datas: [
                    {
                        sheetData: sheetDataValue,
                        //
                        sheetName: "我的ff工作表1",
                        //
                        sheetFilter: tableListSort.map(item => item.prop),
                        //
                        sheetHeader: tableListSort.map(item => item.label),
                        // columnWidths: [10, 10],
                        columnWidths: tableListSort.map(item => item.width),
                    },
                    {
                        sheetData: sheetDataValue,
                        //
                        sheetName: "我的ff工作表2",
                        //
                        sheetFilter: tableListSort.map(item => item.prop),
                        //
                        sheetHeader: tableListSort.map(item => item.label),
                        // columnWidths: [10, 10],
                        columnWidths: tableListSort.map(item => item.width),
                    },
                ]
            }

            let toExcel = new ExportJsonExcel(option); //new
            toExcel.saveExcel(); //save
        },
    }
};
</script>

<style scoped lang="scss">
/* 容器样式 */
.contain_box {
    width: 100%;
    height: calc(100vh - 4.2rem);
    /* 视口的高度减去顶部的导航栏高度 */
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;
    /* 外框样式 */
}
</style>
