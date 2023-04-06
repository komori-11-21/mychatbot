<template>
  <div class="chat-container">
    <el-container>
      <el-aside class="el-aside">
      </el-aside>
      <el-main class="el-main">
        <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto ">
          <li v-for="message in messages" class="infinite-list-item" :key="message.index">
            <div class="bot-block" v-if="message.isBot">
             <span class="left-avatar">
                 <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="float: right"></el-avatar>
             </span>
              <span class="right-message">
                   <v-md-preview :text="message.text"
                   ></v-md-preview>
              </span>
              <span class="blank_style"></span>
            </div>
            <div class="user-block"  v-else>
             <span class="left-avatar">
                 <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="float: right"></el-avatar>
             </span>
              <span class="right-message">
                    <v-md-preview :text="message.text"
                    ></v-md-preview>
              </span>
              <span class="blank_style"></span>
            </div>
          </li>
        </ul>
      </el-main>
    </el-container>
    <el-footer class="el-footer">
      <el-input v-model="inputText" placeholder="请输入内容"
                class="query-input"
      ></el-input>
      <el-button @click="sendMessage">sendMessage</el-button>
    </el-footer>
  </div>
</template>


<script>

import {request} from "@/network/request";

export default {

  name: "HelloWorld",

  data() {
    return {
      count: 0,
      messages: [
        {isBot: false, text: 'hello'},
        {isBot: true, text: 'Hello! How can I assist you today?'},
      ], // 存储聊天历史记录的数组
      inputText: "" // 输入框的文本
    };
  },
  methods: {
    load() {
      this.count += 2
    },
    handleIconClick(){

    },
    sendMessage() {
      // if (!this.inputText.trim()) {
      //   return;
      // }
      // this.messages.push({
      //   id: new Date().getTime(),
      //   text: this.inputText,
      //   isBot: false
      // });
      // this.inputText = "";
      // TODO: 发送消息给聊天机器人 API 或 SDK
      request({
        url: '/hello',
        method: 'post',
        data:{
          query:this.inputText
        }
      }).then(res=>{
        console.log(res)
        this.messages=res
      })
    }
  }
};
</script>

<style lang="less" scoped>

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

ul {
  list-style-type: none;
}

.chat-container {
  /*background: aliceblue;*/
  overflow: auto;
  height: 98vh;
  display: -webkit-flex;
  -webkit-flex-direction: column;
}

.el-main {
  background-color: transparent;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
}

.infinite-list-item {
  /*background-color: ghostwhite;*/
  text-align: center;
  padding: 0.1% 0.1%;

}

.bot-block {
  background-color: rgba(0,0,0,.1);
  display: flex;
  flex-direction: row;
  /*换行方式*/
  flex-wrap: wrap;
  /*元素主轴对齐方式*/
  justify-content: center;
  /*交叉轴对齐方式*/
  align-items: center;
  /*align-content: center;  适用于多行元素*/
  text-align: center;
}

.user-block {
  display: flex;
  flex-direction: row;
  /*换行方式*/
  flex-wrap: wrap;
  /*元素主轴对齐方式*/
  justify-content: center;
  /*交叉轴对齐方式*/
  align-items: center;
  /*align-content: center;  适用于多行元素*/
  text-align: center;
}

.left-avatar {
  flex: 0.4;
}

.right-message {
  flex: 0.8;
  font-size: .875rem;
  line-height: 1.25rem;
  padding: 20px 20px;
  text-align: center;
}

.blank_style{
  flex: 0.4;
}

.el-footer{
  position: fixed;
  bottom: 5%;
  left: 25%;
  width: 60%;

}

.query-input{
  width: 40%;
  height: 80%;
}

/deep/ .vuepress-markdown-body{
  background-color: transparent;
}

/deep/ .vuepress-markdown-body:not(.custom){
  padding: 10px 10px;
}
</style>
