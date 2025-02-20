<template>
  <div class="contain_box">
    <div class="chat-container">
      <!-- 对话区域 -->
      <div class="chat-box" ref="chatBox1">
        <MyScrollBar ref="chatBox">
          <div v-for="(msg, index) in messages" :key="index" class="message-item">
            <!-- AI回答 -->
            <div v-if="msg.type === 'bot'" class="bot-msg">
              <div class="avatar">
                <img src="@/assets/deepseek.png" alt="AI头像" />
              </div>
              <div class="bubble">
                <span class="typing-text">{{ msg.showText }}</span>
                <div class="time-stamp">{{ msg.timestamp }}</div>
              </div>
            </div>

            <!-- 用户提问 -->
            <div v-else class="user-msg">
              <div class="bubble">
                {{ msg.content }}
                <div class="time-stamp">{{ msg.timestamp }}</div>
              </div>
              <div class="avatar">
                <img src="@/assets/book_img.png" alt="用户头像" />
              </div>
            </div>
          </div>
        </MyScrollBar>
      </div>

      <!-- 输入区域 -->
      <div class="input-area">
        <textarea
          ref="input"
          v-model="inputText"
          placeholder="输入您的问题（Ctrl+Enter发送）"
          @keydown.ctrl.enter="sendMessage"
          @input="autoResize"
          :style="textareaStyles"
        ></textarea>
        <button @click="sendMessage">发送</button>
        <button @click="clearHistory">清空历史</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getFormattedTime } from '@/utils/usuallyMethods.js';//获取当前时间
import MyScrollBar from '@/components/myScrollBar/index.vue';
export default {
  name: "index",
  components: {
    MyScrollBar
  },
  data() {
    return {
      messages: [
        {
          type: "bot",
          content: '你好，我是你的AI助手。有什么我可以帮助您的吗？',
          showText: "你好，我是你的AI助手。有什么我可以帮助您的吗？",// 用于动画 打出文字效果
          timestamp: getFormattedTime(),
        }
      ],
      inputText: "",
      textareaStyles: {
        minHeight: "50px",
        maxHeight: "150px",
        height: "50px",
      },
    };
  },
  mounted() {
    this.loadHistory()
    this.$nextTick(() => {
      this.scrollToBottom()
    })
  },
  beforeDestroy() {},
  methods: {
    // 加载历史记录
    loadHistory() {
      try {
        const saved = localStorage.getItem('chat_history_v1')
        if (saved) {
          this.messages = JSON.parse(saved).map(msg => ({
            ...msg,
          }))
        }
      } catch (e) {
        console.error('加载历史记录失败:', e)
      }
    },

    autoResize() {
      // this.$nextTick(() => {
      //   const textarea = this.$refs.input
      //   textarea.style.height = 'auto'
      //   const height = Math.min(
      //     Math.max(textarea.scrollHeight, parseInt(this.textareaStyles.minHeight)),
      //     parseInt(this.textareaStyles.maxHeight)
      //   )
      //   textarea.style.height = `${height}px`
      // })
    },
    clearHistory(){
      if (localStorage.getItem('chat_history_v1') !== null) {
        console.log('数据存在，执行删除');
        localStorage.removeItem('chat_history_v1');
        if(localStorage.getItem('chat_history_v1') == null){
          this.messages= [
            {
              type: "bot",
              content: '你好，我是你的AI助手。有什么我可以帮助您的吗？',
              showText: "你好，我是你的AI助手。有什么我可以帮助您的吗？",// 用于动画 打出文字效果
              timestamp: getFormattedTime(),
            }
          ];
          this.$message({
            message: '您的历史记录已清空！',
            type: 'success'
          });
        }
      } else {
        console.log('数据不存在');
        this.$message({
          message: '暂无历史数据！',
          type: ''
        });
      }

    },
    // 提问信息
    async sendMessage() {
      const question = this.inputText.trim();
      if (!question) return;

      // 添加用户消息
      this.messages.push({
        type: "user",
        content: question,
        timestamp: getFormattedTime(),
      });

      this.scrollToBottom();// 最新消息底部
      this.inputText = "";
      const response = await this.mockAIResponse(question);// 模拟AI回复（替换为实际API调用）

      // 添加 AI 消息 并启动打字动画
      const newMsg = {
        type: "bot",
        content: response,
        showText: "",// 用于动画 打出文字效果
        timestamp: getFormattedTime(),
      };
      this.messages.push(newMsg);
      this.typewriterEffect(newMsg,()=>{
        this.saveHistory()// 保存 此条消息
      });

      // this.autoResize()
    },
    // AI 接口回复信息
    mockAIResponse(question) {
      // 替换为实际API调用
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            `这是对【${question}】的模拟回答，实际应接入AI API。这里是逐字显示效果测试文本，可以观察字符逐个出现的动画效果。`
          );
        }, 500);
      });
    },
    //用于动画 打出文字效果函数
    typewriterEffect(msg,callback) {
      let index = 0;
      const timer = setInterval(() => {
        msg.showText += msg.content[index];
        index++;
        if (index >= msg.content.length){
          clearInterval(timer);
          if(callback) callback();
        }
        this.scrollToBottom();
      }, 50);
    },
    // 最新消息底部
    scrollToBottom() {
      this.$nextTick(() => {
        // const container = this.$refs.chatBox;
        const container = this.$refs.chatBox.$el;// MyScrollBar
        // console.log('container',container);
        container.scrollTop = container.scrollHeight;
      });
    },
    // 保存历史记录
    saveHistory() {
      localStorage.setItem('chat_history_v1', JSON.stringify(this.messages))
    },
    
  },
};
</script>

<style scoped lang="scss">
/* 容器样式 */
.contain_box {
  width: 100%;
  height: calc(100vh - 4.2rem); // 视口的高度减去顶部的导航栏高度
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid gray; // 外框样式

  .chat-container {
    min-width: 500px;
    max-width: 800px;
    margin: 20px auto;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    background: #f5f7fa;
    overflow: hidden;

    .chat-box {
      height: 500px;
      padding: 20px;
      overflow-y: auto;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);

      .message-item {
        margin: 15px 0;
      }

      // 通用消息样式
      .bubble {
        max-width: 70%;
        padding: 12px 18px;
        border-radius: 18px;
        line-height: 1.6;
        position: relative;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }

      // AI消息样式
      .bot-msg {
        display: flex;
        align-items: start;
        gap: 12px;

        .bubble {
          background: white;
          border-top-left-radius: 4px;
          color: #333;
        }
      }

      // 用户消息样式
      .user-msg {
        display: flex;
        justify-content: flex-end;
        align-items: start;
        gap: 12px;

        .bubble {
          background: #007bff;
          color: white;
          border-bottom-right-radius: 4px;
        }
      }

      .avatar {
        flex-shrink: 0;

        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
      }
    }

    .input-area {
      display: flex;
      gap: 10px;
      padding: 15px;
      background: white;
      border-top: 1px solid #eee;

      textarea {
        flex: 1;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 8px;
        resize: none;
        font-size: 14px;
        line-height: 1.6;
        transition: all 0.3s ease;

        &:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        }
      }

      button {
        padding: 8px 20px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          background: #0056b3;
          transform: translateY(-1px);
        }
      }
    }
  }

  .typing-text {
    border-right: 2px solid #666;
    animation: blink 0.7s infinite;
  }

  @keyframes blink {
    from {
      border-right-color: transparent;
    }
    50% {
      border-right-color: #666;
    }
    to {
      border-right-color: transparent;
    }
  }
}
</style>
