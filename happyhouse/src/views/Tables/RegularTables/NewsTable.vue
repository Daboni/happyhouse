<template>
  <b-card no-body>
    <b-card-header class="border-0">
      <div style="display:flex; justify-content: space-between;align-items: center;">
        <h3 class="mb-0">뉴스</h3>
      </div>
    </b-card-header>

    <el-table class="table-responsive table"
              header-row-class-name="thead-light"
              :data="news">
      <el-table-column label="글번호"
                       min-width="140px">
        <template v-slot="{row}">
          <div class="d-flex align-items-center">
            <span class="completion mr-2" >{{row.no}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="제목"
                       min-width="310px">
        <template v-slot="{row}">
          <!--                   <span class="font-weight-600 name mb-0 text-sm">{{row.subject}}</span>-->

          <a :href="row.link" target="_blank" class="font-weight-600 name mb-0 text-sm">{{row.title}}</a>
        </template>
      </el-table-column>

      <el-table-column label="작성시간"
                       min-width="170px">
        <template v-slot="{row}">
          <span class="font-weight-600 name mb-0 text-sm">{{row.pubDate}}</span>
        </template>
      </el-table-column>

    </el-table>

    <b-card-footer class="py-4 d-flex justify-content-end">
      <base-pagination v-model="currentPage" @change="changePage" :per-page="10" :total="50"></base-pagination>
    </b-card-footer>
  </b-card>
</template>
<script>
import http from "./../../../util/http-common.js"
import { Table, TableColumn} from 'element-ui'

import {mapActions, mapState} from "vuex";
export default {
  name: 'light-table',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      // projects,
      currentPage: 1,
      sizePerPage:10,
      pagination : {},
    };
  },
  computed:{
    ...mapState("newsStore", ["news", "keyword"])
  },
  async created(){

    await this.getNewsList({
      "num" : this.sizePerPage,
      "start" : this.currentPage,
      keyword : this.keyword,
    });
  },
  methods: {
    ...mapActions("newsStore",["getNewsList"]),
    async changePage(value){
      this.currentPage =value;
      let data =
      {
        "num" : this.sizePerPage,
        "start" : this.currentPage,
        keyword: this.keyword,
      }

      await this.getNewsList(data);

    }

  },
}
</script>
