<template>
    <div class="contain_box">
        <div class="controls">
            <button @click="toggleRecording" :class="{ recording: isRecording }">
                {{ isRecording ? '停止录制' : '录制屏幕' }}
            </button>
            <transition name="fade">
                <div id="status" v-if="statusMessage">{{ statusMessage }}</div>
            </transition>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "ScreenRecorder",
    data() {
        return {
            mediaRecorder: null,
            stream: null,
            isRecording: false,
            statusMessage: '',
            chunks: []
        };
    },
    methods: {
        async toggleRecording() {
            if (this.isRecording) {
                // 停止录制
                this.mediaRecorder.stop();
                this.isRecording = false;
                this.statusMessage = '录制停止。请稍候...';
                return;
            }

            try {
                // 获取屏幕流
                this.stream = await navigator.mediaDevices.getDisplayMedia({ video: true });

                // 设置 MIME 类型，选择兼容的编码格式
                const mime = MediaRecorder.isTypeSupported("video/webm;codecs=h264")
                    ? "video/webm;codecs=h264"
                    : "video/webm";

                // 创建 MediaRecorder 实例
                this.mediaRecorder = new MediaRecorder(this.stream, { mimeType: mime });
                this.chunks = [];

                // 监听数据可用事件
                this.mediaRecorder.addEventListener('dataavailable', (e) => {
                    this.chunks.push(e.data);
                });

                // 监听录制停止事件
                this.mediaRecorder.addEventListener('stop', this.onRecordingStop);

                // 开始录制
                this.mediaRecorder.start();
                this.isRecording = true;
                this.statusMessage = '正在录制...';
            } catch (error) {
                console.error('Error accessing media devices.', error);
                this.statusMessage = '录制失败，请检查权限。';
            }
        },
        onRecordingStop() {
            // 将录制的片段组合成 Blob 对象
            const blob = new Blob(this.chunks, { type: this.chunks[0].type });
            const url = URL.createObjectURL(blob);

            // 弹出确认框，询问是否下载视频
            const userConfirmed = confirm('录制完成。是否下载视频？');
            if (userConfirmed) {
                const a = document.createElement('a');
                a.href = url;
                a.download = 'video.mp4'; // 可以根据实际情况调整文件扩展名
                a.click();
            }

            // 录制完成后，重置状态
            this.statusMessage = '';
        }
    }
};
</script>
  
<style scoped>
/* 容器样式 */
.contain_box {
    width: 100%;
    height: calc(100vh - 4.2rem);
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;
    background-color: #f9f9f9;
    /* 添加背景色 */
}

/* 控制面板样式 */
.controls {
    text-align: center;
}

/* 按钮样式 */
button {
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
}

button:hover {
    background-color: #0056b3;
}

button.recording {
    background-color: #dc3545;
}

button.recording:hover {
    background-color: #c82333;
}

/* 状态消息样式 */
#status {
    margin-top: 20px;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    border-radius: 5px;
    font-size: 14px;
}

/* 动画效果 */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
  