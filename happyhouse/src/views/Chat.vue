<template>
  <div class="justify-content-md-center">
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
<!--      <input type="text" id="nickname" class="form-inline" placeholder="닉네임을 입력해주세요" required autofocus>-->
<!--      <button class = "btn btn-primary" id ="name" @click="addUser()">확인</button>-->
    </base-header>
    <b-card no-body class="justify-content-md-center text-center " >
    <b-container class="mt--7 justify-content-md-center text-center" >

      <b-row class="justify-content-md-center text-center " >
        <b-col class="text-center justify-content-md-center ">
          <b-card
            header="자유 채팅방"
          ></b-card>
          <div readonly data-bs-spy="scroll" data-bs-method="auto"  class="rounded border bg-secondary form-control text-center"
               ref ="chatroom" id = "chatroom"  style = "width:100%; height: 50vh; overflow-y:scroll; " >

          </div>

          <base-input type = "text" v-model = "message" id = "message" style = "height : 30px; width : 340px" placeholder="내용을 입력하세요" autofocus
          @keyup.enter="sendMsg">

          </base-input>
<!--          <button class = "btn btn-primary" id = "send" @click="sendMsg()">전송</button>-->
        </b-col>
      </b-row>
      <!--      <div class="mt-5"></div>-->
      <!--      <dark-table></dark-table>-->
    </b-container>
    </b-card>
  </div>


</template>
<script>
import Chat from '../plugins/chat.js'
import {API_SOCKET_URL} from "@/config";
import {mapState} from "vuex";
let webSocket;
let nickname;
export default {
  data(){
    return{
      message:'',
      data : '',
      nickname: "",
    }
  },
  computed:{
    ...mapState("memberStore", ["userInfo"]),

  },
  created() {
    this.nickname = this.userInfo.name;
    this.connect();
  },
  methods:{
    addUser(){
      this.nickname = document.getElementById("nickname").value;
      document.getElementById("nickname").style.display="none";
      document.getElementById("name").style.display="none";
      this.connect();
    },
    sendMsg(e){
      this.send();

    },
    connect() {
      webSocket = new WebSocket(API_SOCKET_URL);
      webSocket.onopen = this.onOpen;
      webSocket.onclose = this.onClose;
      webSocket.onmessage = this.onMessage;
    },
    disconnect(){
      webSocket.send(this.nickname + "님이 퇴장하셨습니다");
      webSocket.close();
    },
    send(){
      if(this.message != '') {
        webSocket.send(this.nickname + " : " + this.message);
        document.getElementById("message").value = "";
        this.message = '';
      }
    },
    onOpen(){
      webSocket.send(this.nickname + "님이 입장하셨습니다.");
    },
    onMessage(e) {
      console.log(e.data);
      this.data = e.data;
      let name = this.data.split(":")[0];
      // this.$refs.chatroom.value = this.$refs.chatroom.value + "\n" + this.data ;
      // this.$refs.chatroom.scrollBy(0, window.innerHeight)
      if(this.userInfo.name === " admin "){
        this.$refs.chatroom.innerHTML = this.$refs.chatroom.innerHTML + "<br>" + "<span style='color:red;'>" +this.data + "</span>" ;
        this.$refs.chatroom.scrollBy(0, window.innerHeight)
      }else {
      this.$refs.chatroom.innerHTML = this.$refs.chatroom.innerHTML + "<br>" + this.data;
      this.$refs.chatroom.scrollBy(0, window.innerHeight)
    }

      // chatroom = document.getElementById("chatroom");
      // chatroom.innerHTML = chatroom.innerHTML + "<br>" + this.data;
    },
    onClose(){

    }
  },
  beforeDestroy() {
    this.disconnect();
  }
}

</script>
<style>

</style>
