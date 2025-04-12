<template>
    <!-- 容器div -->
    <div class="contain_box">
        <!-- 文件上传组件 -->
        <el-upload ref="upload" action="/upload" :http-request="uploadFile" :on-change="handleFileChange"
            :before-upload="() => false">
            <!-- 触发文件选择的按钮 -->
            <el-button slot="trigger" type="primary">选择文件</el-button>
            <!-- 触发文件上传的按钮 -->
            <el-button style="margin-left: 10px;" type="success" @click="submitUpload">点击上传</el-button>
        </el-upload>
        <!-- 显示已选择文件的名称 -->
        <div v-if="file">{{ file.name }}</div>
        <!-- 触发文件下载的按钮 -->
        <el-button @click="downloadFile">点击下载</el-button>
        <!-- 显示上传进度 -->
        <div>上传进度: {{ uploadProgress }}%</div>
        <!-- 显示下载进度 -->
        <div>下载进度: {{ downloadProgress }}%</div>
        <!-- 显示错误信息 -->
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    </div>
</template>
  
<script>
import axios from 'axios'; // 引入axios库，用于发送HTTP请求

export default {
    data() {
        return {
            file: null, // 保存用户选择的文件
            uploadProgress: 0, // 上传进度
            downloadProgress: 0, // 下载进度
            errorMessage: '', // 错误信息
        };
    },
    methods: {
        // 当用户选择文件时调用的方法
        handleFileChange(file) {
            this.file = file.raw; // 保存用户选择的文件
        },
        // 上传文件的方法
        async uploadFile() {
            // 如果用户没有选择文件，显示错误信息并返回
            if (!this.file) {
                this.errorMessage = '请选择文件';
                return;
            }

            const chunkSize = 1024 * 1024 * 5; // 设置每个块的大小为5MB
            const chunks = Math.ceil(this.file.size / chunkSize); // 计算文件需要被分割成多少块

            // 对每个块进行处理
            for (let i = 0; i < chunks; i++) {
                // 计算当前块的开始和结束位置
                const start = i * chunkSize;
                const end = start + chunkSize;
                // 获取当前块的数据
                const chunk = this.file.slice(start, end);

                // 创建一个FormData对象，用于保存要发送的数据
                const formData = new FormData();
                formData.append('file', chunk); // 当前块的数据
                formData.append('filename', this.file.name); // 文件名
                formData.append('chunk', i); // 当前块的索引
                formData.append('chunks', chunks); // 总块数

                // 发送POST请求，上传当前块的数据
                try {
                    await axios.post('/upload', formData, {
                        // 在上传过程中，更新上传进度
                        onUploadProgress: (progressEvent) => {
                            this.uploadProgress = Math.floor(((i + progressEvent.loaded / progressEvent.total) * 100) / chunks);
                        },
                    });
                } catch (error) {
                    // 如果上传失败，显示错误信息并返回
                    console.log('Failed to upload chunk.', error);
                    this.errorMessage = '上传文件失败。';
                    return;
                }
            }

            // 所有块都上传完毕后，发送POST请求，通知服务器合并块
            try {
                await axios.post('/merge', { filename: this.file.name });
            } catch (error) {
                // 如果合并失败，显示错误信息并返回
                console.log('Failed to merge chunks.', error);
                this.errorMessage = '合并文件失败。';
                return;
            }

            // 上传完成，设置上传进度为100%
            this.uploadProgress = 100;
        },
        // 下载文件的方法
        downloadFile() {
            axios.get('/download', {
                responseType: 'blob', // 告诉axios，服务器返回的数据是一个Blob对象
                // 在下载过程中，更新下载进度
                onDownloadProgress: progressEvent => {
                    if (progressEvent.total > 0) {
                        this.downloadProgress = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
                    } else {
                        this.downloadProgress = 0;
                    }
                }
            })
                .then(response => {
                    // 创建一个Blob URL，并使用它创建一个<a>元素
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'file.zip'); // 设置下载的文件名
                    document.body.appendChild(link);
                    link.click(); // 模拟点击<a>元素，开始下载
                    console.log('File downloaded.');
                    // 下载完成后，删除<a>元素
                    document.body.removeChild(link);
                })
                .catch(error => {
                    // 如果下载失败，显示错误信息并重置下载进度
                    console.log('Failed to download file.', error);
                    this.errorMessage = '下载文件失败。';
                    this.downloadProgress = 0;
                });
        },
        // 当用户点击"点击上传"按钮时调用的方法
        submitUpload() {
            this.uploadFile();
        },
    },
};
</script>
  
<style scoped lang="scss">
.contain_box {
    width: 100%;
    height: 100%;
    /* 视口的高度减去顶部的导航栏高度 */
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    /* 外框样式 */
}

.error {
    color: red; // 错误信息的颜色
}
</style>
