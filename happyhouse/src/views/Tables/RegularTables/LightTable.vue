<template>
    <b-card no-body>
      <b-card class="border-bottom-0" >

        <b-row class="justify-content-md-center ">
          <h1 class="mb-0"> 게시판</h1>
        </b-row>
      </b-card>
      <b-card class="border-top-0 " >

        <b-row  class="justify-content-md-center">

          <b-col xl="10" class="m-0">
            <b-input
              id="subject"
              type="text"
              required
              plceholder="검색어 입력..."
              class = "m-0"
              v-model = "keyword"
              @keyup = "searchList"
            ></b-input>
          </b-col>
          <b-col xl="1" class="m-0 p-0">

            <b-button variant="primary" class="m-0 fas fa-search"  @click="searchList"
            ></b-button>
          </b-col>

        </b-row>
      </b-card>
        <b-card-header class="border-0 ">
            <div style="display:flex; justify-content: space-between;align-items: center;">
              <h3 class="mb-0"> 게시글</h3>

            </div>
        </b-card-header>

        <el-table class="table-responsive table"
                  header-row-class-name="thead-light"
                  :data="posts">
          <el-table-column label="글번호"
                           min-width="140px">
            <template v-slot="{row}">
              <div class="d-flex align-items-center">
                <span class="completion mr-2" >{{row.postNo}}</span>
              </div>
            </template>
          </el-table-column>

            <el-table-column label="제목"
                             min-width="310px">
                <template v-slot="{row}">
<!--                   <span class="font-weight-600 name mb-0 text-sm">{{row.subject}}</span>-->
                  <router-link class="font-weight-600 name mb-0 text-sm" :to="{ name: 'postView', params: { postno: row.postNo } }">{{row.subject}}</router-link>
                </template>
            </el-table-column>
            <el-table-column label="글쓴이"
                             min-width="140px">
              <template v-slot="{row}">
                <span class="font-weight-600 name mb-0 text-sm">{{row.userId}}</span>

              </template>
            </el-table-column>

            <el-table-column label="작성시간"
                             min-width="170px">
                <template v-slot="{row}">
                    <span class="font-weight-600 name mb-0 text-sm">{{row.regtime}}</span>
                </template>
            </el-table-column>

        </el-table>

        <b-card-footer class="py-4 d-flex justify-content-between">
          <b-button variant="primary" @click="moveWrite()" class="m-1 float-left">글 등록</b-button>
            <base-pagination v-model="currentPage" @change="changePage" :per-page="10" :total="pagination.totalCount"></base-pagination>
        </b-card-footer>
    </b-card>
</template>
<script>
  import http from "./../../../util/http-common.js"
  import { Table, TableColumn} from 'element-ui'
  import ListRow from "./../../../components/Post/ListRow"
  import PostWrite from "@/views/PostWrite.vue";
  import {postlist, postlistbykeyword, postview} from "@/api/post";
  import {commentlist} from "@/api/comment";

  export default {
    name: 'light-table',
    components: {
      ListRow,
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
    },
    data() {
      return {
        // projects,
        posts : [],
        currentPage: 1,
        sizePerPage:10,
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
        keyword : '',
      };
    },
    computed:{

    }
    ,
    created(){
      postlist(
        {
          "currentPage" : this.currentPage,
          "sizePerPage" : this.sizePerPage,
        },
        (response) => {
          console.log(response);
          this.posts = response.data.list;
          if(response.data.pagination != undefined)
            this.pagination = response.data.pagination;
          console.log(this.pagination);
        },
        (error) => {
          console.log(error);
        })
      if(this.$route.query.keyword != undefined){
        this.keyword = this.$route.query.keyword;
        this.searchList()
      }
    },

    methods: {
      moveWrite() {
        this.$router.push({ name: "PostWrite" });
      },
      changePage(value){
        this.currentPage =value;

        postlistbykeyword(
          {
            "keyWord" : this.keyword,
            "currentPage" : this.currentPage,
            "sizePerPage" : this.sizePerPage,
          },
          (response) => {
            console.log(response);
            this.posts = response.data.list;
            if(response.data.pagination != undefined)
              this.pagination = response.data.pagination;
              // console.log(this.pagination);
          },
          (error) => {
            console.log(error);
          })
      },
      searchList(){
        postlistbykeyword(
          {
            "keyWord" : this.keyword,
            "currentPage" : 1,
            "sizePerPage" : 10,
          },
          (response) => {
            console.log(response);
            this.posts = response.data.list;
            if(response.data.pagination != undefined)
              this.pagination = response.data.pagination;
            // console.log(this.pagination);
          },
          (error) => {
            console.log(error);
          })
      }
    },
  }
</script>
