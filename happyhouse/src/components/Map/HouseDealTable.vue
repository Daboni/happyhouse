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
                <template v-slot="{row}">
                    <b-media no-body class="align-items-center">
<!--                        <a href="#" class="avatar rounded-circle mr-3">-->
<!--                            <img alt="Image placeholder" :src="row.img">-->
<!--                        </a>-->
                        <b-media-body>
                            <span class="font-weight-600 name mb-0 text-sm">{{row.aptName}}</span>
                        </b-media-body>
                    </b-media>
                </template>
            </el-table-column>
            <el-table-column label="거래건수"
                             prop="transactionCount"
                             min-width="140px">
            </el-table-column>


          <el-table-column label="관심지역" class="text-center"
                           prop="interest" v-if="userInfo">
            <template slot-scope="scope">

                <b-media no-body >
                  <b-media-body @click="setBookMark($event, scope.row.interest.userSeq)" >
                    <img  :src="imgSrc(scope.row.interest.userSeq)"   id="bookMark"
                          v-bind:aptName="scope.row.interest.aptName" v-bind:userSeq="scope.row.interest.userSeq" >
<!--                    <img  src="img/bookmark/check_star.png"   id="bookMark" v-if="scope.row.interest.userSeq >=1"-->
<!--                          v-bind:aptName="scope.row.interest.aptName" v-bind:userSeq="scope.row.interest.userSeq">-->
<!--                    <img  src="img/bookmark/default_star.png" v-if="scope.row.interest.userSeq ===0"-->
<!--                          v-bind:aptName="scope.row.interest.aptName" v-bind:userSeq="scope.row.interest.userSeq">-->
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
  import {deleteInterest, saveInterest} from "@/api/house";
  import {mapState} from "vuex";


  export default {
    name: 'house-deal-table',
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn
    },
    props:{
      aptAllList:Array,
      pagination: Object,
      dongName: String,
      gugunCode: String,
    },
    data() {
      return {
        currentPage: 1,
        sizePerPage: 10,
        isBookMark: false,
        bookMarkSrc: "img/bookmark/check_star.png",
      };
    },
    computed:{
      ...mapState("memberStore", ["userInfo"]),
      aptList:function (){
        let newAptList = []
        this.aptAllList.forEach( apt =>{
          let newApt = {
            ...apt,
            "interest":{
              aptName:apt.aptName,
              userSeq: apt.userSeq,
            }
          }
          newAptList.push(newApt)
        } )

        return newAptList.filter( (apt, index) => {
          return index >= (this.currentPage-1)*10 && index < (this.currentPage-1)*10+ this.sizePerPage
        })
      },

    },
methods:{
    imgSrc(userSeq){
    if(userSeq >=1){
      return "img/bookmark/check_star.png";
    } else return "img/bookmark/default_star.png";
   },
      changePage(value){
        this.currentPage =value;
      },
      setBookMark(e, InterestUserSeq){

        let star = e.target;
        console.log(e);
        console.log(InterestUserSeq)
        console.log(e.target.parentElement);

        let userSeq = star.getAttribute("userSeq");
        let aptName = star.getAttribute("aptName");
        let imgSrc = star.getAttribute("src");

        this.aptAllList.forEach( (apt, index) => {
          if(apt.aptName === aptName) {
            console.log("별색깔 바꾸기!", aptName +" "+ userSeq)
            if(InterestUserSeq ===1) this.aptAllList[index].userSeq = 0;
            else this.aptAllList[index].userSeq = this.userInfo.seq;
          }
        })

        console.log(imgSrc);
        let checkImg = "img/bookmark/check_star.png"
        let defaultImg = "img/bookmark/default_star.png"
          if(imgSrc ===  checkImg){

            let interest = {
              userSeq:InterestUserSeq,
              aptName,
              code: this.gugunCode,
              dong: this.dongName,
            }
            deleteInterest(interest, response => {console.log(response);
                star.setAttribute("src", defaultImg)
               // star.setAttribute("userSeq", 0)
                InterestUserSeq = 0;
              },
            error => console.log(error))
            // saveInterest()
          } else {
            console.log(this.userInfo)
            let interest = {
              userSeq : this.userInfo.seq,
              aptName,
              code: this.gugunCode,
              dong: this.dongName,
            }
            saveInterest(interest, response => {console.log(response)
                star.setAttribute("src", checkImg)
               // star.setAttribute("userSeq", this.userInfo.seq)
                InterestUserSeq = this.userInfo.seq;
              },
              error => console.log(error))


          }
          // let newImg = new Image();
          // newImg.src = imgSrc;
          // e.target.parentElement.append(newImg);
          // e.target.remove();

      }
    }
  }
</script>
<style>

/*.check_bookmark{*/
/*  background-image: url( "@/assets/map/bookmark/check_star.png" );*/
/*}*/
</style>
