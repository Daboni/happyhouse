let socket;
let chatContainer;

function connect(){
  if(socket==undefined){
    socket = new WebSocket("ws://localhost:8080/chat");
  }
  socket.addEventListener("open",function(event){
    chatContainer = document.querySelector("#start");
    let connectMessage = ` <div class="text-center">
    <span class="between">연결되었습니다.</span>
    </div>`;
    chatContainer.insertAdjacentHTML("beforeend",connectMessage);
     });
}

export default {connect};
