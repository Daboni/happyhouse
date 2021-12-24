<template>
<!--  <div style="width:150px;text-align:center;padding:6px 0;">-->
<!--    <div v-if="nearSchool">-->
<!--      {{nearSchool.name}}-->
<!--    </div>-->

<!--  </div>-->

  <div v-show="nearSchool && showAble">
    <b-button  @click="closeOverlay" class="text-sm">가장 가까운 학교 보기</b-button>
<!--    <b-button> ✖</b-button>-->
    <b-modal id="school-modal" title="학교 정보">

      <div>
        <table class="table table-hover">

          <thead>
          <tr class="text-center"> <th colspan="2" class="text-lg">{{nearSchool.name}} </th> </tr>
          </thead>
          <tr>
            <th scope="row"> 주소 </th> <td> {{ nearSchool.address}}</td>
          </tr>
          <tr>
            <th scope="row"> 설립</th> <td>{{ nearSchool.foundType}} {{ nearSchool.foundDate}}</td>
          </tr>
          <tr>
            <th scope="row"> 홈페이지 </th> <td> {{ nearSchool.homePage }}</td>
          </tr>
          <tr>
            <th scope="row"> 교육청</th> <td> {{ nearSchool.regionOffice}}</td>
          </tr>
          <tr>
            <th scope="row"> 공학 </th> <td> {{ nearSchool.gender}}</td>
          </tr>
        </table>

      </div>
    </b-modal>
  </div>

</template>

<script>
export default {
  name: "SchoolInfo",
  props:{
    nearSchool: Object,
  },
  data() {
    return {
      showAble: true,
    }
  },
  methods:{
    async closeOverlay(){
      await this.$bvModal.show('school-modal')
      console.log(this.$bvModal)
       this.showAble= false;
    }
  }
  // computed:{
  //   school:function (){
  //     return [this.nearSchool];
  //   }
  // }

}
</script>

<style scoped>

</style>
