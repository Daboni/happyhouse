<template>
<div>
  {{comment.coUserId}}|{{comment.coRegTime}}
  <div v-if="comment.coUserId===userInfo.id || userInfo.role ==='ROLE_ADMIN' " class="text-right"><span class="modifyBtn" @click="modifyComment" style="cursor:pointer" ref="modbtn">수정</span>|<span @click="deleteComment" style="cursor:pointer">삭제</span>
    <textarea class="form-control" id="exampleFormControlTextarea1" v-show = "isShow" v-model="comment.content"></textarea>
    <span class="modify" @click="modifyComm" v-show="isShow" style="cursor:pointer">수정</span>
  </div>
  <div v-else><br></div>
  <span v-show="!isShow">{{comment.content}}</span>
  <hr>
</div>
</template>

<script>
import {mapState} from "vuex";
import {commentmodify, commentdelete, commentlist} from "@/api/comment";

export default {
  name: "CommentRow",
  props: {
    comment: Object
  },
  data(){
    return{
      isShow: false,
      content : '',
    }
  },
  computed:{
    ...mapState("memberStore",["userInfo"]),

  }
,
  methods:{

  modifyComment(e){
    if(this.isShow){
      this.$refs.modbtn.innerText = "수정";
      this.isShow =false;

    }else{
      this.$refs.modbtn.innerText = "취소";
      this.isShow = true;

    }

  },
    modifyComm(e){
      commentmodify({
        no : this.comment.no,
        coUserId : this.comment.coUserId,
        postNo : this.comment.postNo,
        content : this.comment.content,
      },
        ({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "수정이 완료되었습니다.";
          }
          this.$router.go();
        },
        (error) => {
          console.log(error);
        });
    },
    deleteComment(e){
      commentdelete(this.comment.no, () => {
        console.log(e);
        e.target.parentElement.parentElement.remove();
        // this.$router.go();
      });
    }
  }
}
</script>

<style scoped>

</style>
