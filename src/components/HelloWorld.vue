<template>
  <div class="chat-container" ref="elMain">
    <el-container>
      <el-aside class="el-aside">
      </el-aside>
      <el-container>
        <el-main class="el-main">
          <ul class="infinite-list" >
            <li v-for="message in messages" class="infinite-list-item" :key="message.index">
              <div class="bot-block" v-if="message.isBot">
             <span class="left-avatar">
                 <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" class="user_icon"></el-avatar>
             </span>
                <span class="right-message">
                   <v-md-preview :text="message.content"
                   ></v-md-preview>
              </span>
                <span class="blank_style"></span>
              </div>
              <div class="user-block" v-else>
             <span class="left-avatar">
                 <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" class="user_icon"></el-avatar>
             </span>
                <span class="right-message">
                    <v-md-preview :text="message.content"
                                  ref="remoteBot"
                    ></v-md-preview>
              </span>
                <span class="blank_style"></span>
              </div>
            </li>
          </ul>
        </el-main>
        <el-footer class="el-footer">
          <el-input
              id="textarea_id"
              type="textarea"
              autosize
              :rows="3"
              placeholder="请输入内容"
              v-model="inputText"
              @keydown.enter.down="sendMessage"
          >
          </el-input>
        </el-footer>
      </el-container>
    </el-container>

  </div>
</template>


<script>
import { EventSourcePolyfill } from 'event-source-polyfill';
// import {request} from "@/network/request";
import { reactive } from 'vue';
export default {

  name: "HelloWorld",

  data() {
    return {
      count: 0,
      messages: []
      , // 存储聊天历史记录的数组
      inputText: "", // 输入框的文本
      message:'',
    };
  },
// 在mounted钩子函数中，为messagesCount赋值
  mounted() {
    this.messagesCount = this.messages.length;
  },

// 在watch中监听messages的变化，并根据变化将页面滚动到最底部
  watch: {
    messages(newMessages) {
      if (newMessages.length > this.messagesCount) {
        this.$nextTick(() => {
          const elMain = this.$refs.elMain;
          elMain.scrollTop = elMain.scrollHeight;
          this.messagesCount = newMessages.length;
        });
      }
    }
  },
  methods: {
    uuid() {
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = "-";

      var uuid = s.join("");
      return uuid;
    },
    sendMessage(){
      let uid = window.localStorage.getItem("uid");
      if (uid == null || uid == '' || uid == 'null') {
        uid = this.uuid();
      }
      // 设置本地存储
      window.localStorage.setItem("uid", uid);
      let see;
      let ques_txt=this.inputText
      let messages=this.messages
      let res_message= reactive({
        isBot: true,
        content: '',
      });
      let last_message=''
      const eventSource = new EventSourcePolyfill('http://localhost:8000/chat?message=' + this.inputText, {
        headers: {
          'uid': uid
        }
      });
      eventSource.addEventListener('open', function (e) {
        console.log('open successfully'+e);
        console.log("onopen", e.readyState, e.target);
        see = e.target;
        //新增问题框
       let ques_message={
         isBot:false,
         content:ques_txt
       }
       messages.push(ques_message)
        //新增答案框
        messages.push(res_message)
      });
      /*
      * message：后端返回信息，格式可以和后端协商
      */
      eventSource.addEventListener('message', function (e) {
        console.log("data is :"+e.data)
        if (e.data == "[DONE]") {
          res_message['content']=last_message
          if (see) {
            see.close();
          }
          return;
        }
        let json_data = JSON.parse(e.data)
        if (json_data.content == null || json_data.content == 'null') {
          res_message['content'] = '';
          return;
        }
        // console.log(json_data.content)
       res_message['content'] =  res_message['content'] + json_data.content;
        last_message+=json_data.content
      });
      /*
      * error：错误（可能是断开，可能是后端返回的信息）
      */
      eventSource.addEventListener('error', function (err) {
        console.log(err);
        // 类似的返回信息验证，这里是实例
        err && err.status === 401 && console.log('not authorized');
        eventSource.close();
      });
    }
  },
};
</script>

<style lang="less" scoped>

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  border-style: solid;
  border-color: #d9d9e3;
  border-width: 0px;
}

p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

ul {
  list-style-type: none;
}

.chat-container {
  overflow: auto;
  height: 93vh;
  display: -webkit-flex;
  -webkit-flex-direction: column;

  font-family: Arial, sans-serif;
  font-size: 14px;

}

.el-main {
  background-color: transparent;
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0;
}

.el-aside {
  background-color: black;
  color: #333;
}

.infinite-list-item {
  text-align: center;
  padding: 0.1% 0.1%;

}

.bot-block {
  width: 100%;
  --tw-bg-opacity: 1;
  background-color: rgba(247,247,248);
  display: flex;
  flex-direction: row;
  /*换行方式*/
  flex-wrap: wrap;
  /*元素主轴对齐方式*/
  justify-content: center;
  /*交叉轴对齐方式*/
  //align-items: center;
  /*align-content: center;  适用于多行元素*/
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  border-radius: 5px;

  border-bottom-width: 1px;
}

.user-block {
  border-bottom-width: 1px;
  display: flex;
  flex-direction: row;
  /*换行方式*/
  flex-wrap: wrap;
  /*元素主轴对齐方式*/
  justify-content: center;
  /*交叉轴对齐方式*/
  //align-items: center;
  /*align-content: center;  适用于多行元素*/
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}

.left-avatar {
  flex: 0.4;
}


.right-message {
  flex: 0.8;
  font-size: .875rem;
  line-height: 1.25rem;
  padding: 10px;
  text-align: left;
  color: #333333;
}

.blank_style {
  flex: 0.4;
}

.el-footer {
  margin-left: 20%;
  width: 60%;
}

.query-input {
  width: 40%;
  height: 80%;
}

.infinite-list-item:hover {
  background-color: #F5F5F5;
}

/deep/ .github-markdown-body {
  background-color: transparent;
  font-family: Arial, sans-serif;
  font-size: 16px;
  padding: 10px;
}
//
/deep/ .github-markdown-body:not(.custom) {
  padding: 10px 10px;
}

/deep/ .el-textarea__inner {
  height: auto !important;
  overflow-y: hidden !important;
  padding: 4px 8px;
  line-height: inherit;
}

/deep/ .github-markdown-body div[class*=v-md-pre-wrapper-] {
  position: relative;
  border-radius: 10px;
}

.user_icon{
  margin-top: 10px;
  float: right;
}
</style>
<!--//每次页面渲染完之后滚动条在最底部-->
<!--// sendMessage() {-->
<!--//   // TODO: 发送消息给聊天机器人 API 或 SDK-->
<!--//   request({-->
<!--//     url: '/hello',-->
<!--//     method: 'post',-->
<!--//     data: {-->
<!--//       query: this.inputText-->
<!--//     }-->
<!--//   }).then(res => {-->
<!--//     this.messages = res-->
<!--//     // this.$nextTick(() => {-->
<!--//     //   const elMain = this.$refs.elMain;-->
<!--//     //   elMain.scrollTop = elMain.scrollHeight;-->
<!--//     // })-->
<!--//   })-->
<!--// }-->

