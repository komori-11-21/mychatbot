<template>
  <div class="chat-container">
    <el-container>
      <el-aside class="el-aside"></el-aside>
      <el-container>
        <el-main class="el-main">
          <div class="chat-history">
            <div class="message" v-for="message in messages" :key="message.id">
              <div v-if="message.isBot" class="bot-message">{{ message.text }}</div>
              <div v-else class="user-message">{{ message.text }}</div>
            </div>
          </div>
        </el-main>
        <el-footer class="el-footer">
          <el-input v-model="inputText" placeholder="请输入消息" @keyup.enter="sendMessage" class="queryInput"/>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      messages: [
        {
          isBot: true,
          text: "hello,how can i help you"
        },
        {
          isBot: false,
          text: "hello,how can i help you"
        },
        {
          isBot: true,
          text: "hello,how can i help you"
        },
        {
          isBot: false,
          text: "hello,how can i help you"
        },
        {
          isBot: true,
          text: "hello,how can i help you"
        },


      ], // 存储聊天历史记录的数组
      inputText: "" // 输入框的文本
    };
  },
  methods: {
    sendMessage() {
      if (!this.inputText.trim()) {
        return;
      }
      this.messages.push({
        id: new Date().getTime(),
        text: this.inputText,
        isBot: false
      });
      this.inputText = "";
      // TODO: 发送消息给聊天机器人 API 或 SDK
    }
  }
};
</script>

<style>

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  height: 80%;
}

.el-footer{
  background-color: #E9EEF3;
}

.queryInput{
  width: 800px;
}

.chat-container {
  height: 93vh;
  display: flex;
  flex-direction: column;
}

.chat-history {
  flex-grow: 1;
  /*overflow-y: scroll;*/
  /*padding: 20px;*/
}

.message {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.bot-message {
  background-color: #f5f5f5;
  color: #333;
  padding: 10px;
  border-radius: 5px;
  align-self: flex-start;
  /*max-width: 80%;*/
}

.user-message {
  background-color: #409eff;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  align-self: flex-end;
  /*max-width: 80%;*/
}
</style>
