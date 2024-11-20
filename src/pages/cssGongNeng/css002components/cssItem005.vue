<template>
    <div class="contain_box">
        <div style="width:90%;height:90%;">
            <el-button type="success" @click="jsExportExcelFn">多个sheet 每个sheet只有一个小表</el-button>
            <p>.</p>
            <el-button type="success" @click="exceljsFn">多个sheet 和每个sheet中有多个小表格</el-button>
            <p>.</p>
            <el-button type="success" @click="exceljsEchartsImageFn">多个sheet 和每个sheet中有多个小表格  echarts多个图片</el-button>
            <p>.</p>
            <el-button type="success" @click="exceljsEchartsHtml2canvasImageFn">多个sheet 和每个sheet中有多个小表格  html2canvas多个图片</el-button>
            <p>.</p>
        </div>
    </div>
</template>

<script>
import ExportJsonExcel from 'js-export-excel';
import html2canvas from 'html2canvas';
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
        // 一个excel中 多个sheet 每个sheet只有一个小表  import ExportJsonExcel from 'js-export-excel';
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

        // 多个sheet 和每个sheet中有多个小表格  import * as ExcelJS from 'exceljs'
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

        // 多个sheet 和每个sheet中有多个小表格  echarts多个图片   import * as ExcelJS from 'exceljs'
        async exceljsEchartsImageFn() {
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
                                { site: '厂区A', model: '机种1', stage: '段别1', floord: '楼栋1', floor: '1楼',value:'20', xName: 'kkk' },
                                { site: '厂区B', model: '机种2', stage: '段别2', floord: '楼栋2', floor: '2楼',value:'30', xName: 'yyy' },
                                // ... 更多数据项
                            ],
                        },
                        {
                            name: '小表格2',
                            headers: ['厂区名', '机种名', '段别名', '楼栋名', '楼层名'],
                            columns: ['site', 'model', 'stage', 'floord', 'floor'],
                            list: [
                                { site: '厂区C', model: '机种3', stage: '段别3', floord: '楼栋3', floor: '3楼' ,value:'40', xName: 'kkk' },
                                { site: '厂区D', model: '机种4', stage: '段别4', floord: '楼栋4', floor: '4楼' ,value:'50', xName: 'yyy' },
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
                                { site: '厂区A', model: '机种1', stage: '段别1', floord: '楼栋1', floor: '1楼',value:'60', xName: 'kkk'  },
                                { site: '厂区B', model: '机种2', stage: '段别2', floord: '楼栋2', floor: '2楼',value:'70', xName: 'yyy'  },
                                // ... 更多数据项
                            ],
                        },
                        {
                            name: '小表格2',
                            headers: ['厂区名2', '机种名', '段别名', '楼栋名', '楼层名'],
                            columns: ['site', 'model', 'stage', 'floord', 'floor'],
                            list: [
                                { site: '厂区C', model: '机种3', stage: '段别3', floord: '楼栋3', floor: '3楼' ,value:'80', xName: 'kkk' },
                                { site: '厂区D', model: '机种4', stage: '段别4', floord: '楼栋4', floor: '4楼' ,value:'90', xName: 'yyy' },
                                // ... 更多数据项
                            ],
                        },
                        // ... 更多小表格数据
                    ],
                },
            ];

            // 遍历数据集，为每个数据集创建一个工作表，并填充数据
            for (let dataset of datasets) {
                // 创建一个新的工作表
                let worksheet = workbook.addWorksheet(dataset.name);
                let currentRow = 1;
                for (let subDataset of dataset.data) {
                    // 添加小表格的标题
                    worksheet.mergeCells(currentRow, 1, currentRow, subDataset.headers.length);
                    let titleCell = worksheet.getCell(currentRow, 1);
                    titleCell.value = subDataset.name;
                    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
                    // 保存表名的行数
                    let titleRow = currentRow;
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
                    // currentRow++;
                    currentRow+=8;

                    // 生成添加 ECharts 图表作为图片
                    let base64Image = await this.generateEChartsImage(subDataset.list, this.$echarts);

                    let imageId = workbook.addImage({
                        base64: base64Image,
                        extension: 'png',
                    });
                    worksheet.addImage(imageId, {
                        tl: { col: subDataset.headers.length + 1, row: titleRow  },  // 图片位置是表名右边
                        ext: { width: 300, height: 200 },  // 图片的宽度和高度
                    });
                }
            }
            // 导出工作簿
            workbook.xlsx.writeBuffer().then((buffer) => {
                let blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                let link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'exceljsFn下载的工作簿.xlsx';
                link.click();
            });
        },
        // 生成添加 ECharts 图表作为图片 方法
        async generateEChartsImage(list, echarts) {
            // 创建一个新的 div 并将 ECharts 图表渲染到该 div
            let echartsDiv = document.createElement('div');
            echartsDiv.style.width = '600px';
            echartsDiv.style.height = '400px';
            echartsDiv.style.position = 'absolute';  // 设置为绝对定位
            echartsDiv.style.left = '-9999px';  // 将其放置在视窗之外
            document.body.appendChild(echartsDiv);

            let myChart = echarts.init(echartsDiv);
            // 提取 xName 和 value 数据
            let xNameArr = list.map(item => item.xName);
            let valueArr = list.map(item => item.value);
            let option = {
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: xNameArr
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: valueArr,
                        type: 'line',
                        areaStyle: {}
                    }
                ]
            };
            myChart.setOption(option);
            // 添加延迟
            await new Promise(resolve => setTimeout(resolve, 1000));  // 延迟1秒
            // 使用 ECharts 的 getDataURL 方法获取图表的 Base64 编码的 URL
            let base64Image = myChart.getDataURL({
                type: 'png',
                pixelRatio: 2,
                backgroundColor: '#fff'
            });
            // 将 'data:image/png;base64,' 部分从 URL 中移除
            base64Image = base64Image.replace('data:image/png;base64,', '');

            // 删除 div
            document.body.removeChild(echartsDiv);

            return base64Image;
        },

        // 多个sheet 和每个sheet中有多个小表格  html2canvas多个图片   import * as ExcelJS from 'exceljs'
        async exceljsEchartsHtml2canvasImageFn() {
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
                                { site: '厂区A', model: '机种1', stage: '段别1', floord: '楼栋1', floor: '1楼',value:'20', xName: 'kkk' },
                                { site: '厂区B', model: '机种2', stage: '段别2', floord: '楼栋2', floor: '2楼',value:'30', xName: 'yyy' },
                                // ... 更多数据项
                            ],
                        },
                        {
                            name: '小表格2',
                            headers: ['厂区名', '机种名', '段别名', '楼栋名', '楼层名'],
                            columns: ['site', 'model', 'stage', 'floord', 'floor'],
                            list: [
                                { site: '厂区C', model: '机种3', stage: '段别3', floord: '楼栋3', floor: '3楼' ,value:'40', xName: 'kkk' },
                                { site: '厂区D', model: '机种4', stage: '段别4', floord: '楼栋4', floor: '4楼' ,value:'50', xName: 'yyy' },
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
                                { site: '厂区A', model: '机种1', stage: '段别1', floord: '楼栋1', floor: '1楼',value:'60', xName: 'kkk'  },
                                { site: '厂区B', model: '机种2', stage: '段别2', floord: '楼栋2', floor: '2楼',value:'70', xName: 'yyy'  },
                                // ... 更多数据项
                            ],
                        },
                        {
                            name: '小表格2',
                            headers: ['厂区名2', '机种名', '段别名', '楼栋名', '楼层名'],
                            columns: ['site', 'model', 'stage', 'floord', 'floor'],
                            list: [
                                { site: '厂区C', model: '机种3', stage: '段别3', floord: '楼栋3', floor: '3楼' ,value:'80', xName: 'kkk' },
                                { site: '厂区D', model: '机种4', stage: '段别4', floord: '楼栋4', floor: '4楼' ,value:'90', xName: 'yyy' },
                                // ... 更多数据项
                            ],
                        },
                        // ... 更多小表格数据
                    ],
                },
            ];

            // 遍历数据集，为每个数据集创建一个工作表，并填充数据
            for (let dataset of datasets) {
                // 创建一个新的工作表
                let worksheet = workbook.addWorksheet(dataset.name);
                let currentRow = 1;
                for (let subDataset of dataset.data) {
                    // 添加小表格的标题
                    worksheet.mergeCells(currentRow, 1, currentRow, subDataset.headers.length);
                    let titleCell = worksheet.getCell(currentRow, 1);
                    titleCell.value = subDataset.name;
                    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
                    // 保存表名的行数
                    let titleRow = currentRow;
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
                    // currentRow++;
                    currentRow+=8;

                    // 生成添加 ECharts dom的渲染div盒子
                    let echartsDiv = await this.generateEChartsHtml2canvasImage(subDataset.list, this.$echarts);
                    
                    await html2canvas(echartsDiv).then((canvas) => {
                        let base64Image = canvas.toDataURL().split(',')[1];  // 将 canvas 转换为 Base64 编码的图片
                        let imageId = workbook.addImage({
                            base64: base64Image,
                            extension: 'png',
                        });
                        worksheet.addImage(imageId, {
                            tl: { col: subDataset.headers.length + 1, row: titleRow  },  // 图片位置是表名右边
                            ext: { width: 300, height: 200 },  // 图片的宽度和高度
                        });
                        // 删除 div
                        document.body.removeChild(echartsDiv);  // 移除div
                    });
                }
            }
            // 导出工作簿
            workbook.xlsx.writeBuffer().then((buffer) => {
                let blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                let link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'exceljsFn下载的工作簿.xlsx';
                link.click();
            });
        },
        // 生成添加 ECharts doms 的渲染 div 盒子方法
        async generateEChartsHtml2canvasImage(list, echarts) {
            // 创建一个新的 div 并将 ECharts 图表渲染到该 div
            let echartsDiv = document.createElement('div');
            echartsDiv.style.width = '600px';
            echartsDiv.style.height = '400px';
            echartsDiv.style.position = 'absolute';  // 设置为绝对定位
            echartsDiv.style.left = '-9999px';  // 将其放置在视窗之外
            document.body.appendChild(echartsDiv);

            let myChart = echarts.init(echartsDiv);
            // 提取 xName 和 value 数据
            let xNameArr = list.map(item => item.xName);
            let valueArr = list.map(item => item.value);
            let option = {
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: xNameArr
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: valueArr,
                        type: 'line',
                        areaStyle: {}
                    }
                ]
            };
            myChart.setOption(option);
            // 添加延迟
            await new Promise(resolve => setTimeout(resolve, 1000));  // 延迟1秒
            return echartsDiv;
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
