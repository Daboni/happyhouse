<!--<template>-->
<!--  <div>-->
<!--    <viewer ref="toastViewer" :initialValue="initContent" height="500px" />-->
<!--  </div>-->
<!--</template>-->
<template>
  <b-card no-body>
    <b-card-header>

      <b-row>
        <b-col>
          <h3>글보기</h3>
        </b-col>
      </b-row>
    </b-card-header>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h1> 제목 : ${post.subject} </h1>`"
          class="mb-2"
          no-body
        >
          <b-card
            :header-html="`<div><h5> 작성자 : ${post.userId} </h5> </div>
                <br>
                <div> <h5>작성일 : ${post.regtime} </h5> </div>`"
            class="mb-2"
            no-body>
          </b-card>

          <b-card-body class="text-left">
            <viewer ref="toastViewer" :initialValue="initContent" height="500px" />
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-left" >
        <b-button variant="primary" @click="moveList" class="m-1 ml-4">목록</b-button>
      </b-col>
      <b-col class="text-right" v-if="post.userId===userInfo.id || userInfo.role ==='ROLE_ADMIN' " >
                <b-button
                  variant="success"
                  @click="movePostModify"
                  class="m-1"
                >글수정</b-button
                >
                <b-button type="reset" variant="danger" class="m-1 mr-4" @click="PostDelete"
                >글삭제</b-button>
      </b-col>

    </b-row>
    <b-row class="mb-1">
      <b-col class="text-left">
        <div>
          <b-card class='pl-0'>댓글 ({{ pagination.totalCount }})</b-card>
          <b-card>
            <b-card-text v-if='pagination.totalCount ==0'>
              여기는 댓글 영역입니다.
            </b-card-text>
            <b-card-text v-for="(com,index) in comments" :key="index">
            <comment-row v-bind:comment="com">

            </comment-row>

            </b-card-text>
            <form>
              <textarea class="form-control" id="exampleFormControlTextarea1" v-model="comment.content" rows="3" placeholder="Write a large text here ..."></textarea>
            </form>
            <b-card-footer class="py-4 d-flex justify-content-end">
              <base-pagination v-model="currentPage" @change="changePage" :per-page="10" :total="pagination.totalCount"></base-pagination>
            </b-card-footer>
            <b-col class="text-right">
              <b-button
                type="submit"
                variant="primary"
                class="m-1"
                @click="comwrite"
              >글작성</b-button
              >
            </b-col>
          </b-card>
        </div>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import {Viewer} from "@toast-ui/vue-editor";
import {postview, postdelete, postlist} from "@/api/post";
import {commentlist, commentwrite} from "@/api/comment";
import CommentRow from "@/components/Post/CommentRow";
import {mapState} from "vuex";

export default {
  name: "postView",

  components: {
    viewer:Viewer,
    CommentRow,
  },
  data() {
    return {
      initContent: "데이터를 불러오는데 실패했습니다.",
      post :{
        postNo : 0,
        userId : '',
        subject : '',
        regtime : '',
        viewContent : '',
      },
      comment :{
        couserid : "jdb4497",
        postNo : 0,
        content: "",
      },
      comments: [],
      loadedComments: true,
      currentPage:1,
      sizePerPage:5,
      pagination:{
        countPerPage: 0,
        currentPage: 0,
        endPage: 0,
        endRange: false,
        naviSize: 0,
        navigator: null,
        newCount: 0,
        startPage: 0,
        startRange: false,
        totalCount: 0,
        totalPageCount: 0,
      },
      // userId : '',
      // subject : '',
      // regtime : '',
      // viewContent : '',
      // textee : 'dfddf',
    }
  },
  computed :{
    ...mapState("memberStore",["userInfo"]),
    textView: function (){
      return this.post.viewContent;
    }
  },
  created(){

    // console.log("Create 시점")
    this.initPost();



  },
  methods:{
    setContent(content) {
      this.$refs.toastViewer.invoke('setMarkdown', content)
    },
    async initPost(){
      await postview(
        this.$route.params.postno,
        (response) => {
          // console.log(response);
          this.post = response.data;
          this.comment.postNo = this.post.postNo;
          this.setContent(this.post.viewContent);
          // console.log("생성됨",this.post);
          // console.log(this.post.viewContent);

        },
        (error) => {
          console.log("불러올 시 에러발생!!", error);
        },

      );
      await commentlist({
          "postNo" : this.post.postNo,
          "currentPage" : this.currentPage,
          "sizePerPage" : this.sizePerPage,
        },
        (response) => {
          // console.log(response);
          this.comments = response.data.list;
          if(response.data.pagination != undefined)
            this.pagination = response.data.pagination;
          console.log(this.comments);
        },
        (error) => {
          console.log(error);
        });
    },
    moveList() {
      this.$router.push({ name: "PostList" });
    },
    movePostModify() {
      // console.log("dfds");
      console.log(this.post);

      this.$router.replace({
        name: "postUpdate",
        params: { postno: this.post.postNo },
      });
      // this.$router.push({ name: "PostList" });
    },
    PostDelete() {
      if (confirm("정말로 삭제?")) {
        postdelete(this.post.postNo, () => {
          this.$router.push({ name: "PostList" });
        });
      }
      // this.$router.push({ name: "PostList" });
    },
    changePage(value){
      this.currentPage =value;
     commentlist(
        {
          "postNo" : this.post.postNo,
          "currentPage" : this.currentPage,
          "sizePerPage" : this.sizePerPage,
        },
        (response) => {
          console.log(response);
          this.comments = response.data.list;
          this.pagination = response.data.pagination
          console.log(this.pagination);
        },
        (error) => {
          console.log(error);
        })
    },
    comwrite(){
      const commentDto = {
        postNo : this.comment.postNo,
        coUserId: this.userInfo.id,
        content : this.comment.content,
      };
      commentwrite(
        commentDto, ({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          this.comment.content = '';
          this.initPost();
        },
        (error) => {
          console.log(error);
        }
      );
    }

  },

}
</script>

<style>

</style>
