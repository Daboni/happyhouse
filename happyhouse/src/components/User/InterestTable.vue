<template>
  <b-card no-body>
    <b-card-header class="border-0">
      <h3 class="mb-0">관심지역</h3>
    </b-card-header>

    <el-table class="table-responsive table"
              header-row-class-name="thead-light"
              :data="interestList">
      <el-table-column label="시/군/구"
                       min-width="310px"
                       prop="gugunName">
        <template v-slot="{row}">
          <b-media no-body class="align-items-center">
            <!--                        <a href="#" class="avatar rounded-circle mr-3">-->
            <!--                            <img alt="Image placeholder" :src="row.img">-->
            <!--                        </a>-->
            <b-media-body>
              <span class="font-weight-600 name mb-0 text-sm">{{row.gugunName}}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>
      <el-table-column label="동"
                       prop="dong"
                       min-width="140px">
      </el-table-column>
      <el-table-column label="아파트"
                       prop="aptName"
                       min-width="140px">
      </el-table-column>

    </el-table>

    <b-card-footer class="py-4 d-flex justify-content-end">
      <base-pagination v-model="currentPage" @change="changePage" :per-page="10" :total="pagination.totalCount"></base-pagination>
    </b-card-footer>
  </b-card>
</template>

<script>

import { Table, TableColumn} from 'element-ui'
import {mapActions, mapState} from "vuex";
const houseStore = "houseStore";

export default {
  name: 'InterestTable',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  props:{
    interestList:Array,
    pagination: Object,
  },
  data() {
    return {
      currentPage: 1,
      sizePerPage: 10,
    };
  },
  computed:{
    ...mapState("memberStore",["userInfo"])
    // ...mapState(houseStore, ["interestList"]),
  },
  methods:{
    ...mapActions(houseStore, ["getInterestList", "getInterestListWithPage"]),
    async changePage(value){
      this.currentPage =value;

      let data = {
        "userSeq": this.userInfo.seq,
        "currentPage": this.currentPage-1,
        "sizePerPage": 10,
      }
      await this.getInterestListWithPage(data);
      console.log(this.interestList);
    }
  }
}
</script>

<style scoped>

</style>
