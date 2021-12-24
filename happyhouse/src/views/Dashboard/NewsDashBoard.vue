<template>

  <b-card body-class="p-0" header-class="border-0">
    <template v-slot:header>
      <b-row align-v="center">
        <b-col>
          <h3 class="mb-0">News</h3>
        </b-col>
        <b-col class="text-right">
          <router-link class="btn btn-sm btn-primary" :to="{ name: 'news'}">See all</router-link>
<!--          <a href="#!" class="btn btn-sm btn-primary">See all</a>-->
        </b-col>
      </b-row>
    </template>

    <el-table class="table-responsive table"
              :data="news"
              header-row-class-name="thead-light">
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
  </b-card>
</template>
<script>
import { Table, TableColumn, DropdownMenu, DropdownItem, Dropdown} from 'element-ui'
import {newslist} from "@/api/news";
import {mapActions, mapState} from "vuex";
export default {
  name: 'page-visits-table',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
  },
  data() {
    return {
    }
  },
  props:{
    news: Array,
    keyword: String
  },
  computed:{

  },
  methods:{

  },
  async created(){


  },
}
</script>
<style>
</style>
