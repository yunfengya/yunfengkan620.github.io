<template>
  <div class="contain_box">
    <div class="chat-container">
      <!-- 对话区域 -->
      <div class="chat-box" ref="chatBox">
        <div v-for="(msg, index) in messages" :key="index" class="message-item">
          <!-- AI回答 -->
          <div v-if="msg.type === 'bot'" class="bot-msg">
            <div class="avatar">
              <img src="@/assets/logo.png" alt="AI头像" />
            </div>
            <div class="bubble">
              <span class="typing-text">{{ msg.showText }}</span>
            </div>
          </div>

          <!-- 用户提问 -->
          <div v-else class="user-msg">
            <div class="bubble">
              {{ msg.content }}
            </div>
            <div class="avatar">
              <img src="@/assets/book_img.png" alt="用户头像" />
            </div>
          </div>
        </div>
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
      </div>
    </div>
  </div>
</template>

<script>
import aaa from "./aaa";
export default {
  name: "index",
  components: {
    aaa,
  },
  data() {
    return {
      messages: [],
      inputText: "",
      textareaStyles: {
        minHeight: "50px",
        maxHeight: "150px",
        height: "50px",
      },
    };
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
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
    async sendMessage() {
      const question = this.inputText.trim();
      if (!question) return;

      // 添加用户消息
      this.messages.push({
        type: "user",
        content: question,
      });

      // 模拟AI回复（替换为实际API调用）
      const response = await this.mockAIResponse(question);

      // 添加AI消息并启动打字动画
      this.addBotMessage(response);

      this.inputText = "";
      // this.autoResize()
      this.scrollToBottom();
    },
    addBotMessage(text) {
      const newMsg = {
        type: "bot",
        content: text,
        showText: "",
      };
      this.messages.push(newMsg);
      this.typewriterEffect(newMsg);
    },
    typewriterEffect(msg) {
      let index = 0;
      const timer = setInterval(() => {
        msg.showText += msg.content[index];
        index++;
        if (index >= msg.content.length) clearInterval(timer);
        this.scrollToBottom();
      }, 50);
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.chatBox;
        container.scrollTop = container.scrollHeight;
      });
    },
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
  },
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

  .chat-container {
    min-width: 500px;
    max-width: 800px;
    margin: 20px auto;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    background: #f5f7fa;
    overflow: hidden;
  }

  .chat-box {
    height: 500px;
    padding: 20px;
    overflow-y: auto;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  }

  .message-item {
    margin: 15px 0;
  }

  /* 通用消息样式 */
  .bubble {
    max-width: 70%;
    padding: 12px 18px;
    border-radius: 18px;
    line-height: 1.6;
    position: relative;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  /* AI消息样式 */
  .bot-msg {
    display: flex;
    align-items: start;
    gap: 12px;
  }
  .bot-msg .bubble {
    background: white;
    border-top-left-radius: 4px;
    color: #333;
  }

  /* 用户消息样式 */
  .user-msg {
    display: flex;
    justify-content: flex-end;
    align-items: start;
    gap: 12px;
  }
  .user-msg .bubble {
    background: #007bff;
    color: white;
    border-bottom-right-radius: 4px;
  }

  .avatar {
    flex-shrink: 0;
  }
  .avatar img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .input-area {
    display: flex;
    gap: 10px;
    padding: 15px;
    background: white;
    border-top: 1px solid #eee;
  }
  textarea {
    flex: 1;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    resize: none;
    font-size: 14px;
    line-height: 1.6;
    transition: all 0.3s ease;
  }
  textarea:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  button {
    padding: 8px 20px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  button:hover {
    background: #0056b3;
    transform: translateY(-1px);
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
