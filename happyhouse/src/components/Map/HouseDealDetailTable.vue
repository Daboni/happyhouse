<template>
    <b-card no-body>
        <b-card-header class="border-0">
            <h3 class="mb-0">아파트 매매 정보</h3>
        </b-card-header>

        <el-table class="table-responsive table"
                  header-row-class-name="thead-light"
                  :data="aptList">
            <el-table-column label="아파트이름"
                             min-width="310px"
                             prop="aptName">
                <template v-slot="{row}" >
                    <b-media no-body class="align-items-center" style="cursor: pointer"  @click="$bvModal.show(row.no)" >
<!--                        <a href="#" class="avatar rounded-circle mr-3">-->
<!--                            <img alt="Image placeholder" :src="row.img">-->
<!--                        </a>-->
                        <b-media-body>
                            <span class="font-weight-600 name mb-0 text-sm">{{row.aptName}}</span>
                        </b-media-body>
                    </b-media>
                  <b-modal v-bind:id="row.no" title="아파트 정보">
                    <div>
                      <table class="table table-hover">

                        <thead>
                        <tr class="text-center"> <th colspan="2" class="text-lg">{{row.aptName}} </th> </tr>
                        </thead>
                        <tr>
                          <th scope="row"> 주소 </th> <td> {{ row.address}} </td>
                        </tr>
                        <tr>
                          <th scope="row"> 평수 </th> <td> {{ row.area}}</td>
                        </tr>
                        <tr>
                          <th scope="row"> 건축년도 </th> <td> {{ row.buildYear}}</td>
                        </tr>
                        <tr>
                          <th scope="row"> 거래날짜 </th> <td> {{ row.date}}</td>
                        </tr>
                        <tr>
                          <th scope="row"> 거래가 </th> <td> {{ row.dealAmount}}</td>
                        </tr>
                        <tr>
                          <th scope="row"> 층수 </th> <td> {{ row.floor}}</td>
                        </tr>




                      </table>

                    </div>
                  </b-modal>
                </template>
            </el-table-column>
            <el-table-column label="거래금액"
                             prop="dealAmount"
                             min-width="140px">

              <template v-slot="{row}" >
                <b-media no-body  @click="$bvModal.show(row.no)" style="cursor: pointer" >

                  <b-media-body>
                    <span >{{row.dealAmount}}</span>
                  </b-media-body>
                </b-media>

              </template>

            </el-table-column>
          <el-table-column label="면적"
                           prop="area"
                           min-width="140px">
            <template v-slot="{row}" >
              <b-media no-body  @click="$bvModal.show(row.no)" style="cursor: pointer" >
                <b-media-body>
                  <span >{{row.area}}</span>
                </b-media-body>
              </b-media>

            </template>
          </el-table-column>
          <el-table-column label="거래날짜"
                           prop="date"
                           min-width="140px">
            <template v-slot="{row}" >
              <b-media no-body  @click="$bvModal.show(row.no)" style="cursor: pointer" >
                <b-media-body>
                  <span >{{row.date}}</span>
                </b-media-body>
              </b-media>

            </template>
          </el-table-column>


<!--            <el-table-column label="Status"-->
<!--                             min-width="170px"-->
<!--                             prop="status">-->
<!--                <template v-slot="{row}">-->
<!--                    <badge class="badge-dot mr-4" type="">-->
<!--                        <i :class="`bg-${row.statusType}`"></i>-->
<!--                        <span class="status" :class="`text-${row.statusType}`">{{row.status}}</span>-->
<!--                    </badge>-->
<!--                </template>-->
<!--            </el-table-column>-->

<!--            <el-table-column label="Users" min-width="190px">-->
<!--                <div class="avatar-group">-->
<!--                    <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip"-->
<!--                       data-original-title="Ryan Tompson">-->
<!--                        <img alt="Image placeholder" src="img/theme/team-1.jpg">-->
<!--                    </a>-->
<!--                    <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip"-->
<!--                       data-original-title="Romina Hadid">-->
<!--                        <img alt="Image placeholder" src="img/theme/team-2.jpg">-->
<!--                    </a>-->
<!--                    <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip"-->
<!--                       data-original-title="Alexander Smith">-->
<!--                        <img alt="Image placeholder" src="img/theme/team-3.jpg">-->
<!--                    </a>-->
<!--                    <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip"-->
<!--                       data-original-title="Jessica Doe">-->
<!--                        <img alt="Image placeholder" src="img/theme/team-4.jpg">-->
<!--                    </a>-->
<!--                </div>-->
<!--            </el-table-column>-->

<!--            <el-table-column label="Completion"-->
<!--                             prop="completion"-->
<!--                             min-width="240px">-->
<!--                <template v-slot="{row}">-->
<!--                    <div class="d-flex align-items-center">-->
<!--                        <span class="completion mr-2">{{row.completion}}%</span>-->
<!--                        <div>-->
<!--                            <base-progress :type="row.statusType" :value="row.completion"/>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </template>-->
<!--            </el-table-column>-->
        </el-table>

        <b-card-footer class="py-4 d-flex justify-content-end">
            <base-pagination v-model="currentPage" @change="changePage" :per-page="10" :total="pagination.totalCount"></base-pagination>
        </b-card-footer>
    </b-card>
</template>
<script>
  import { Table, TableColumn} from 'element-ui'
  import {mapActions} from "vuex";
const houseStore = "houseStore";

  export default {
    name: 'house-deal-detail-table',
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn
    },
    props:{
      aptDealList:Array,
      pagination: Object,
      gugunCode: String,
      dongName: String,
    },
    data() {
      return {
        currentPage: 1,
        sizePerPage: 10,
      };
    },
    computed:{
      aptList:function (){
        return this.aptDealList.map( (housedeal) => {
            const aptData = {
              no: "modal-"+housedeal.no,
              aptName: housedeal.aptName,
              dealAmount: this.AddComma(housedeal.dealAmount.trim()),
              area: housedeal.area,
              address: this.dongName+ " "+housedeal.jibun +" " +housedeal.aptName ,
              date:
                housedeal.dealYear +
                "." +
                housedeal.dealMonth +
                "." +
                housedeal.dealDay,
              floor: housedeal.floor,
              buildYear: housedeal.buildYear,
              jibun: housedeal.jibun,
              lat: housedeal.lat,
              lng: housedeal.lng,
            }
            return aptData;
          });

      }
    },
methods:{
  ...mapActions(houseStore, ["getDealByAptName"]),
   AddComma(num)
  {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
  },
      changePage(value){
        this.currentPage =value;
        const aptName = this.aptDealList[0].aptName;
        console.log(aptName);
        const data = {
          gugunCode : this.gugunCode,
          dongName : this.dongName,
          aptName : aptName,
          "currentPage" : this.currentPage-1,
          "sizePerPage" : 10,
        }
        this.getDealByAptName(data)
      }
    },
    updated() {
      console.log(this.pagination);
    }
  }
</script>
