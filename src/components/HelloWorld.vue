<template>
  <div class="chat-container">
    <el-container>
      <el-aside width="13%">Aside</el-aside>
      <el-container>
        <el-main>
          <div
              ref="scrollContainer"
              style="overflow-y: auto"
          >
            <ul>
              <li v-for="message in messages" class="infinite-list-item" :key="message.index">
                <div v-if="message.isBot" class="bot_style">
             <span class="user_icon">
                 <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                            class="el_avatar_right"></el-avatar>
             </span>
                  <span class="user_msg">
                      <v-md-preview :text="message.content"
                      ></v-md-preview>
              </span>
                  <span class="right_msg"></span>
                </div>
                <div v-else class="bot_style">
                  <span class="right_msg"></span>
                  <span class="bot_msg">
                  <v-md-preview :text="message.content"
                  ></v-md-preview>
              </span>
                  <span class="user_icon">
                 <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                            class="el_avatar_left"></el-avatar>
             </span>
                </div>
              </li>
            </ul>
          </div>

        </el-main>
        <el-footer height="98px">
          <div class="foot_left">
          </div>
          <div class="foot_middle">
            <el-input
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 4}"
                placeholder="请输入内容"
                v-model="inputText">
              >
            </el-input>
          </div>
          <div class="foot_right">
            <el-button type="primary" @click="sendMessage">
              <img src="./submit.svg" class="submit_svg">
            </el-button>
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {EventSourcePolyfill} from 'event-source-polyfill';
// import {request} from "@/network/request";
import {reactive} from 'vue';

export default {
  name: "HelloWorld",
  data() {
    return {
      count: 0,
      messages: [], // 存储聊天历史记录的数组
      inputText: "", // 输入框的文本
      message: '',
      height: 0,
    };
  },

  methods: {
    load(){
      this.$nextTick(() => {
        console.log(this.$refs.scrollContainer.scrollHeight)
        this.$refs.scrollContainer.scrollTop = this.$refs.scrollContainer.scrollHeight
        console.log(this.$refs.scrollContainer.scrollTop )
      })
    },
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
    sendMessage() {
      let uid = window.localStorage.getItem("uid");
      if (uid == null || uid == '' || uid == 'null') {
        uid = this.uuid();
      }
      // 设置本地存储
      window.localStorage.setItem("uid", uid);
      let see;
      let ques_txt = this.inputText
      let messages = this.messages
      let container=this.$refs.scrollContainer;
      let res_message = reactive({
        isBot: true,
        content: '',
      });
      let last_message = ''
      const eventSource = new EventSourcePolyfill('http://localhost:8000/chat?message=' + this.inputText, {
        headers: {
          'uid': uid
        }
      });
      eventSource.addEventListener('open', function (e) {
        console.log('open successfully' + e);
        console.log("onopen", e.readyState, e.target);
        see = e.target;
        //新增问题框
        let ques_message = {
          isBot: false,
          content: ques_txt
        }
        messages.push(ques_message)
        //新增答案框
        messages.push(res_message)
      });
      /*
      * message：后端返回信息，格式可以和后端协商
      */
      eventSource.addEventListener('message', function (e) {
        // console.log("data is :"+e.data)
        if (e.data == "[DONE]") {
          res_message['content'] = last_message
          if (see) {
            see.close();
          }
          return;
        }
        let json_data = JSON.parse(e.data)
        container.scrollTop = container.scrollHeight;
        if (json_data.content == null || json_data.content == 'null') {
          res_message['content'] = '';
          return;
        }
        // console.log(json_data.content)
        res_message['content'] = res_message['content'] + json_data.content;
        last_message += json_data.content
        container.scrollTop = container.scrollHeight;
        console.log(container.scrollTop)
        console.log(container.scrollHeight)
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
  //border-color: red;
  //border-width: 1px;
}


.chat-container {
  overflow: auto;
  height: 93vh;
  display: -webkit-flex;
  -webkit-flex-direction: column;

  font-family: Arial, sans-serif;
  font-size: 18px;
}

.el-footer {
  color: #333;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  color: #333;
}

.foot_left {
  flex: 1;
}

.foot_middle {
  flex: 2;
}

.foot_right {
  flex: 1;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: flex-end;
  margin-left: 10px;
}

.el-button {
  height: 32px;
  border-radius: 5px;
  background-color: #d9d9e3;
}

.bot_style {
  display: flex;
}

.user_msg {
  flex: 3;
  margin-top: 20px;
  display: flex;
}

.bot_msg {
  flex: 3;
  margin-top: 20px;
  display: flex;
  justify-content: right;
}

.user_icon {
  flex: 1;
}

.right_msg {
  flex: 1;
}

.el_avatar_right {
  margin-left: 88%;
}

.el_avatar_left {
  margin-right: 88%;
}


/deep/ .github-markdown-body {
  background-color: transparent;
  font-family: Arial, sans-serif;
  font-size: 16px;
  padding: 8px 8px 0px 8px;
  border: 1px solid black;
  border-radius: 5px;
  text-align: left;
}

.infinite-list-item {
  margin-top: 10px;
}

.v-md-editor-preview {
  display: inline-block;
  width: auto;
  height: auto;
}

/deep/ .github-markdown-body > :first-child,
.github-markdown-body > :last-child,
.github-markdown-body > div[data-v-md-line]:first-child > :first-child,
.github-markdown-body > div[data-v-md-line]:last-child > :last-child {
  margin-bottom: 0;
}

/deep/ .github-markdown-body div[class*=v-md-pre-wrapper-] {
  position: relative;
  border-radius: 10px;
}


</style>

