<template>
  <div class="chat-container">
    <el-container>
      <el-aside class="el-aside"></el-aside>
      <el-container>
        <el-main class="el-main">
          <div class="chat-history">
            <div class="message" v-for="message in messages" :key="message.id">
              <!--              <div v-if="message.isBot" class="bot-message" v-html="showMessage(message.text)"></div>-->
              <!--              <div v-else class="user-message" v-html="showMessage(message.text)"></div>-->
              <div v-if="message.isBot" class="bot-message">
                <v-md-preview :text="message.text"
                ></v-md-preview>

              </div>
              <div v-else class="user-message">
                <v-md-preview :text="message.text"
                ></v-md-preview>
              </div>
            </div>
          </div>
        </el-main>
        <!--        <el-footer class="el-footer">-->
        <!--&lt;!&ndash;          @keyup.enter="sendMessage"&ndash;&gt;-->
        <!--          <el-input v-model="inputText" placeholder="请输入消息"  class="queryInput"/>-->
        <!--          <el-button @click="sendMessage">sendMessage</el-button>-->
        <!--        </el-footer>-->
      </el-container>
    </el-container>
    <el-footer class="el-footer">
      <!--          @keyup.enter="sendMessage"-->
      <el-input v-model="inputText" placeholder="请输入消息" class="queryInput"/>
      <el-button @click="sendMessage">sendMessage</el-button>
    </el-footer>
  </div>
</template>

<script>

// import {marked} from "marked";

import {request} from "@/network/request";

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
      ], // 存储聊天历史记录的数组
      inputText: "" // 输入框的文本
    };
  },
  methods: {
    // showMessage(message){
    //   marked.setOptions({
    //     renderer: new marked.Renderer(),
    //     gfm: true,
    //     tables: true,
    //     breaks: false,
    //     pedantic: false,
    //     sanitize: true,
    //     smartLists: true,
    //     smartypants: false
    //   });
    //   let htmlContent=marked(message);
    //   return htmlContent;
    // },
    sendMessage() {
      // TODO: 发送消息给聊天机器人 API 或 SDK
      // axios.post('/chatbot',{
      //   baseURL: 'http://192.168.0.104:5000',
      //   param:{
      //     'query':this.inputText
      //   }
      // }).then(res=>{
      //   this.messages=res.data
      // }).catch(error=>{
      //  console.log(error)
      // })

    }
  }
};
</script>

<style lang="less" scoped>

.el-aside {
  background-color: #2C3E50;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: ghostwhite;
  color: #333;
  text-align: center;
  height: 90%;

}

.el-footer {
  background-color: ghostwhite;
  position: fixed;
  bottom: 5%;
  left: 30%;

}

.queryInput {
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
  background-color: deepskyblue;
  color: #333;
  /*padding: 10px;*/
  border-radius: 10px;
  align-self: flex-start;
  max-width: 100%;
}

.user-message {
  background-color: deepskyblue;
  color: #fff;
  /*padding: 10px;*/
  border-radius: 10px;
  align-self: flex-end;
  max-width: 100%;
}

/deep/ .vuepress-markdown-body {
  background-color: transparent;
}

/deep/ .vuepress-markdown-body:not(.custom) {
  padding: 10px 10px;
}

</style>
