<template>
    <div class="contain_box">
        <div>
            <el-button class="button" size="mini" @click="lookToFlow1()">查看(能预览的)</el-button>
            <el-button class="button" size="mini" @click="lookToFlow2()">查看(不能预览的)</el-button>
        </div>

        <!-- 下载和预览 -->
        <el-dialog v-dragDiv title="" :visible.sync="drawer" append-to-body v-if="drawer" width="1000px" :center="true"
            :with-header="false" @close="close()">
            <p class="fileName">{{ fileName }}</p>
            <div v-loading="fileLoading">
                <i-frame :src="fileUrl" style="height: 70vh" />
            </div>
        </el-dialog>
    </div>
</template>

<script>
// 接口
import { fatp_getfile } from '@/api/fatp_apiOne.js';
import iFrame from "@/components/iFrame/index";
export default {
    name: "index",
    components: { 
        iFrame,
    },
    data() {
        return {
            drawer: false,
            fileName: "",
            fileUrl: "",
            fileLoading: false,
        };
    },
    mounted() {
        
    },
    beforeDestroy() {
        
    },
    methods: {
        lookToFlow1() {
            this.fileName = 'Epson机械手 负载-惯量-离心率说明.pdf';
            this.urlPath = 'https://lzisilon.luxsan-mes.local:9000/fatp/library/20241018160642/Epson机械手 负载-惯量-离心率说明.pdf';
            this.seeFile()
        },
        lookToFlow2() {
            // this.fileName = 'L1 LXKS Paste sernik shim to senik cowling-SM15.xlsm';
            // this.urlPath = 'https://lzisilon.luxsan-mes.local:9000/fatp/library/20240731100023/L1 LXKS Paste sernik shim to senik cowling-SM15.xlsm';
            this.fileName = '锁附原理介绍 .pptx';
            this.urlPath = 'https://lzisilon.luxsan-mes.local:9000/fatp/library/20240629130036/锁附原理介绍 .pptx';
            this.seeFile()
        },
        // 
        // 预览 和 下载
        seeFile() {
            let _data = {
                filename: this.fileName,
                filepath: this.urlPath
            }
            let fileLastName = this.fileName.split(".").slice(-1)[0].toLowerCase() || ''//文件后缀名
            if (
                    fileLastName == "xlsx" || fileLastName == "xls"|| fileLastName == "xlsm"
                    || fileLastName == "zip" || fileLastName == "7zip"
                    || fileLastName == "rar"
                    || fileLastName == "tar" || fileLastName == "tgz"
                    || fileLastName == "ppt" || fileLastName == "pptx"
                    || fileLastName == "doc" || fileLastName == "docx"
                ) {
                    this.$confirm("该文件暂不支持在线预览，是否下载本地预览?", '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let messageInstance = this.$message({
                            type: 'info',
                            message: '正在下载，请稍后...',
                            duration: 0,
                            showClose: true
                        }); 
                        fatp_getfile(_data).then(res => {
                            if (res) {
                                console.log(res);
                                // res 是文件流
                                if (messageInstance) {
                                    messageInstance.close();
                                }
                                this.$message({
                                    type: 'success',
                                    message: '下载成功!',
                                    duration: 2000,
                                    showClose: true
                                });
                                this.downloadDynamicType(res, this.fileName)
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        }); 
                    });
    
                } else {
                    this.drawer = true;
                    this.fileLoading = true;
                    fatp_getfile(_data).then(res => {
                        if (res) {
                            console.log(res);
                            // res 是文件流
                            this.fileLoading = false;
                            this.fileUrl = this.createObjectURLWithDynamicType(res, this.fileName)
                        }
                    })
                }
        },

        close() {
            window.URL.revokeObjectURL(this.fileUrl);//释放blob:url
        },

        // 文件类型 通过iframe线上查看
        createObjectURLWithDynamicType(blobData, fileName) {
            const mimeTypes = {
                jpeg: "image/jpeg",
                jpg: "image/jpeg",
                png: "image/png",
                // PNG: "image/png",
                svg: "image/svg+xml",
                pdf: "application/pdf",
                mp4: "video/mp4",
                MP4: "video/mp4",
                // mov: "video/quicktime",
                mov: "video/mp4",
                ppt: "application/vnd.ms-powerpoint",
                pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                doc: "application/msword",
                docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                xls: "application/vnd.ms-excel",
                xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
                // 可以根据需要添加更多文件类型和对应的MIME类型
            };
            // const fileExtension = fileName.split(".").pop();
            const fileExtension = fileName.split(".").pop().toLowerCase();
            // console.log('fff',fileExtension);
            const fileType = mimeTypes[fileExtension] || "";

            // 根据动态设置的type创建对象URL
            const objectURL = URL.createObjectURL(new Blob([blobData], { type: fileType }));
            return objectURL;
        },

        // 通过blob的方式进行下载
        downloadDynamicType(blobData, fileName) {
            const mimeTypes = {
                jpeg: "image/jpeg",
                jpg: "image/jpeg",
                png: "image/png",
                // PNG: "image/png",
                svg: "image/svg+xml",
                pdf: "application/pdf",
                mp4: "video/mp4",
                MP4: "video/mp4",
                ppt: "application/vnd.ms-powerpoint",
                pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                doc: "application/msword",
                docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                xls: "application/vnd.ms-excel",
                xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
                zip: "application/zip",
                '7zip': "application/zip",
                rar: "application/rar",
                tar: "application/x-tar",
                tgz: "application/x-tar",
                // 可以根据需要添加更多文件类型和对应的MIME类型
            };

            // const fileExtension = fileName.split(".").pop();
            const fileExtension = fileName.split(".").pop().toLowerCase();
            // console.log('fff',fileExtension);
            const fileType = mimeTypes[fileExtension] || "";

            // 根据动态设置的type创建对象URL
            const blob = new Blob([blobData], { type: fileType });

            if ("download" in document.createElement("a")) {
                // 非IE下载
                const elink = document.createElement("a");
                elink.download = fileName;
                elink.style.display = "none";
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                URL.revokeObjectURL(elink.href); // 释放URL 对象
                document.body.removeChild(elink);
            } else {
                // IE10+下载
                navigator.msSaveBlob(blob, fileName);
            }
        },
        
    }
};
</script>

<style scoped lang="scss">
/* 容器样式 */
.contain_box {
    width: 100%;
    height: 100%;
    /* 视口的高度减去顶部的导航栏高度 */
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    /* 外框样式 */
    /* 外框样式 */
}

</style>
