<!--<template>-->
<!--  <div>-->
<!--    -->
<!--    <Editor ref="toastuiEditor" />-->
<!--    <b-button @click="createAction">저장하기</b-button>-->
<!--  </div>-->
<!--</template>-->
<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="userid-group"
          label="작성자"
          label-for="userid"
          class="completion mr-2"
          >
          <b-form-input
            id="userid"
            :disabled="isUserid"
            v-model="userInfo.id"
            type="text"
            required
            readonly
            placeholder="작성자 입력..."
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="subject-group"
          label="제목"
          label-for="subject"
          class="completion mr-2"
        >
          <b-form-input
            id="subject"
            v-model="post.subject"
            type="text"
            required
            placeholder="제목 입력..."
          ></b-form-input>
        </b-form-group>

        <b-form-group id="content-group" label="내용:" label-for="content" class="completion mr-2">
          <Editor ref="toastuiEditor"/>
        </b-form-group>

<!--        <b-button-->
<!--          type="submit"-->
<!--          variant="primary"-->
<!--          class="m-1"-->
<!--          @click="createAction"-->
<!--        >글작성</b-button-->
<!--        >-->
<!--        <b-button-->
<!--          type="submit"-->
<!--          variant="primary"-->
<!--          class="m-1"-->
<!--         >글작성</b-button-->
<!--        >-->

<!--        <b-button @click="createAction">글작성</b-button>-->

<!--        <b-button type="submit" variant="primary" class="m-1" v-else-->
<!--        >글수정</b-button-->
<!--        >-->
        <b-button
          type="submit"
          variant="primary"
          class="m-1"
          v-if="this.type === 'write'"
        >글작성</b-button
        >
        <b-button type="submit" variant="primary" class="m-1" v-else
        >글수정</b-button
        >
        <b-button type="reset" variant="danger" class="m-1">글 목록</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>
<script>

import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
import {postwrite , postview, postmodify} from "@/api/post";
import {mapState} from "vuex";

export default {
  components: {
    Editor
  },
  data() {
    return {
      post: {
        postNo: 0,
        userId: "",
        subject: "",
        viewContent: "",
      },
      isUserid: false,
    };
  },
  props: {
    type: { type: String },
  },
  computed:{
    ...mapState("memberStore",["userInfo"]),
  },
  created() {
    if (this.type === "modify") {
      postview(
        this.$route.params.postno,
        ({ data }) => {
          // this.article.articleno = data.article.articleno;
          // this.article.userid = data.article.userid;
          // this.article.subject = data.article.subject;
          // this.article.content = data.article.content;
          this.post = data;
          this.setContent(this.post.viewContent);
          console.log(this.post);
        },
        (error) => {
          console.log(error);
        }
      );
      this.isUserid = true;
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.type === "write" ? this.postregister() : this.postUpdate();
    },
    onReset(event) {
      event.preventDefault();
      this.post.postno = 0;
      this.post.subject = "";
      this.post.viewcontent = "";
      this.$router.push({ name: "PostList" });
    },
    postregister() {
      // console.log(this.$refs.toastuiEditor.invoke("getMarkdown"));
      const postDto = {
        userId: this.userInfo.id,
        subject: this.post.subject,
        viewContent : this.$refs.toastuiEditor.invoke("getMarkdown"),
      } ;

      postwrite(
        postDto, ({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.moveList();
        },
        (error) => {
          console.log(error);
        }
      );
    },
    postUpdate() {
      postmodify(
        {
          postNo: this.post.postNo,
          userId: this.userInfo.id,
          subject: this.post.subject,
          viewContent : this.$refs.toastuiEditor.invoke("getMarkdown"),
        },
        ({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          // 현재 route를 /list로 변경.
          this.$router.push({ name: "PostList" });
        },
        (error) => {
          console.log(error);
        }
      );
    },
    moveList() {
      this.$router.push({ name: "PostList" });
    },
    setContent(content) {
      this.$refs.toastuiEditor.invoke('setMarkdown', content)
    },
  },
};
</script>



<style>
</style>
