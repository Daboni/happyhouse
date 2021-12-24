<template>
  <div>

    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <b-row class="justify-content-md-center">
        <b-col xl="6" md="6" class="text-center">
          <stats-card title="도/광역시"
                      class="mb-4">
            <template slot="footer">

              <select
                class="btn btn-secondary dropdown-toggle" id="sido" name="sido"
                data-toggle="dropdown" aria-expanded="false" @change="makeGugun">
                <option class="bg-white dropdown-item" value="null" disabled selected>도/광역시</option>
                <map-item v-for="(sido, index) in sidos" :key="index" v-bind:name="sido.sidoName" v-bind:code="sido.sidoCode"></map-item>

              </select>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="6" md="6" class="text-center">
          <stats-card title="시/군/구"
                      class="mb-4">

            <template slot="footer">
              <select
                class="btn btn-secondary dropdown-toggle" id="gugun" name="gugun"
                data-toggle="dropdown" aria-expanded="false" @change="makeDong">
                <option class="bg-white dropdown-item" value="null" disabled selected>시/군/구</option>
                <map-item v-for="(gugun, index) in guguns" :key="index" v-bind:name="gugun.gugunName" v-bind:code="gugun.gugunCode"></map-item>
              </select>

            </template>
          </stats-card>
        </b-col>
        <b-col xl="6" md="6" class="text-center">
          <stats-card title="읍/면/동"
                      class="mb-4">

            <template slot="footer">

              <select
                class="btn btn-secondary dropdown-toggle" id="dong" name="dong"
                data-toggle="dropdown" aria-expanded="false" @change="makeApt">
                <option class="bg-white dropdown-item" value="null" disabled selected>읍/면/동</option>
                <map-item v-for="(dong, index) in dongs" :key="index" v-bind:name="dong.dong" v-bind:code="dong.dong"></map-item>
              </select>

            </template>
          </stats-card>
        </b-col>

        <b-col xl="6" md="6" class="text-center">
          <stats-card title="아파트"
                      class="mb-4">

            <template slot="footer">

              <select class="btn btn-secondary dropdown-toggle " id="aptName" name="aptName"
                data-toggle="dropdown" aria-expanded="false" @change="makeMonthly">
                <option class="bg-white dropdown-item" value="null" disabled selected>아파트</option>
                <map-item v-for="(aptName, index) in aptNameList" :key="index" v-bind:name="aptName" v-bind:code="aptName"></map-item>
              </select>

            </template>
          </stats-card>
        </b-col>



      </b-row>

    </base-header>

    <!--Charts-->
    <b-container fluid class="mt--7">
      <b-row>
        <b-col xl="8" class="mb-5 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <b-row align-v="center" slot="header">
              <b-col>
                <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
                <h5 class="h3 text-white mb-0">아파트 가격 변동 추이</h5>
              </b-col>
              <b-col>
                <b-nav class="nav-pills justify-content-end">
                  <b-nav-item
                       class="m-0 "
                       :active="bigLineChart.activeIndex === 0"
                       link-classes="py-2 px-3"
                       @click.prevent="initBigChart(0)">

                          <select class="btn dropdown-toggle text-white shadow-none" id="aptName" name="aptName"
                                  data-toggle="dropdown" aria-expanded="false" v-if="userInfo && interestList" @change="makeMonthly">
                            <option class="bg-white dropdown-item" value="null" disabled selected>관심지역</option>
                            <map-item class="text-black" v-for="(interest, index) in interestList" :key="index" v-bind:name="interest.aptName" v-bind:code="interest.dong+'|' +interest.code "></map-item>
                          </select>
                      <div v-else>
                        <span class="d-none d-md-block">Month</span>
                        <span class="d-md-none">M</span>
                      </div>

                  </b-nav-item>
                </b-nav>
              </b-col>
            </b-row>
            <line-chart
              :height="350"
              ref="bigChart"
              :chart-data="bigLineChart.chartData"
              :extra-options="bigLineChart.extraOptions"
            >
            </line-chart>
          </card>
        </b-col>

        <b-col xl="4" class="mb-5 mb-xl-0">
          <card header-classes="bg-transparent">
            <b-row align-v="center" slot="header">
              <b-col>
                <h6 class="text-uppercase text-muted ls-1 mb-1">Sales</h6>
                <h5 class="h3 mb-0">거래건수</h5>
              </b-col>
            </b-row>

            <bar-chart
              :height="350"
              ref="barChart"
              :chart-data="redBarChart.chartData"
            >
            </bar-chart>
          </card>
        </b-col>
      </b-row>
      <!-- End charts-->

      <!--Tables-->
      <b-row class="mt-5">
        <b-col class="mb-5 mb-xl-0">
          <news-dash-board v-bind:news="news" v-bind:keyword="keyword"></news-dash-board>
        </b-col>
<!--        <b-col xl="4" class="mb-5 mb-xl-0">-->
<!--          <social-traffic-table></social-traffic-table>-->
<!--        </b-col>-->
      </b-row>

      <b-row class="mt-5 " v-if="userInfo && interestList && interestList.length > 0 ">
        <b-col class="mb-5 mb-xl-0" xl="12">
          <div id="chart-area" class="font-weight-bold" style="width: 100%; height: 45vh;" ></div>
        </b-col>
      </b-row>
      <!--End tables-->
    </b-container>

  </div>
</template>
<script>
  // Charts
  import * as chartConfigs from '@/components/Charts/config';
  import LineChart from '@/components/Charts/LineChart';
  import BarChart from '@/components/Charts/BarChart';
  import { LineChart as ToastLineChart } from '@toast-ui/chart';
  // Components
  import BaseProgress from '@/components/BaseProgress';
  import StatsCard from '@/components/Cards/StatsCard';

  // Tables
  import SocialTrafficTable from './Dashboard/SocialTrafficTable';
  import MapItem from "@/components/Map/MapItem";
  import NewsDashBoard from './Dashboard/NewsDashBoard';
  import {mapActions, mapState} from "vuex";
  import {customBlueChartOptions} from "@/components/Charts/config";
  import {newslist, trendsList} from "@/api/news";


  const houseStore = "houseStore";
  export default {
    components: {
      LineChart,
      BarChart,
      BaseProgress,
      StatsCard,
      MapItem,
      NewsDashBoard,
      // SocialTrafficTable
    },
    computed:{
      ...mapState("memberStore",["userInfo"]),
      ...mapState("newsStore",["news","keyword"]),
      ...mapState(houseStore, ["houseDealsMonthly","interestList", "sidos", "guguns", "dongs", "sidoCode", "gugunCode", "dongName", "apt", "houseDeals", "schoolList","houseDealDetails"]),
      monthlyHousePrice: function(){
        let data = [];
        this.houseDealsMonthly.forEach(houseDeal => {
          data.push(houseDeal.avgDealAmoumt);
        })
        if(data.length ===1) data.push(data[0]);
        return data;
      },
      monthlyTransactionCount: function(){
        let data = [];
        this.houseDealsMonthly.forEach(houseDeal => {
          data.push(houseDeal.transactionCount);
        })
        data.push(0);
        return data;
      },
      monthlyLabel: function (){
        let label = [];
        this.houseDealsMonthly.forEach(houseDeal => {
          label.push(this.MONTHMAPPING[houseDeal.dealMonth]);
        })
        return label;
      },
      aptNameList : function (){
        let aptNames = []
         this.houseDeals.forEach(houseDeal => {
          aptNames.push(houseDeal.aptName);
        })
        return aptNames;
      },
      trendsData : function (){
        let dataList = [];
        this.trends.forEach( trend => {
          let data = [];
          console.log("TREND", trend)
          for(let i=0;i<trend.dataList.length;i++){
            data.push(trend.dataList[i].ratio);
          }
          dataList.push( {
            title:trend.title,
            data,
          })
        })
        console.log(dataList);
        return dataList;

      }
    },
    data() {
      return {
        bigLineChart: {
          aptName: "",
          allData: [
            // [0, 20, 10, 30, 15, 40, 20, 60, 60],
            [],
            // [0, 20, 5, 25, 10, 30, 15, 40, 40]
            [],
          ],
          activeIndex: 0,
          chartData: {
            datasets: [
              {
                label: 'Performance',
                data: [],
              }
            ],
            labels: ['Apr','May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
          },
          extraOptions: chartConfigs.customBlueChartOptions,
        },
        redBarChart: {
          chartData: {
            labels: ['May', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
            datasets: [{
              label: '거래건수',
              data: [25, 20, 30, 22, 17, 29]
            }]
          },
          extraOptions: chartConfigs.blueChartOptions
        },
        MONTHMAPPING:{
          "1":"Jan","2":"Feb","3":"Mar","4":"Apr","5":"May","6":"Jun","7":"Jul","8":"Aug",
          "9":"Sep","10":"Oct","11":"Nov","12":"Dec",
        },
        trends: [],
      };
    },
    methods: {
      ...mapActions(houseStore, ["getMonthlyPrice","getSido", "getGugun", "getDong", "getDeal", "getDealByAptName", "getSchoolList","getDealWithInterest","getInterestList"]),
      ...mapActions("newsStore", ["getNewsList"]),
      initBigChart(index) {
        let chartData = {
          datasets: [
            {
              label: '평균가격',
              // data: this.bigLineChart.allData[index],
              data: this.monthlyHousePrice,
            }
          ],
          labels: this.monthlyLabel,
        };
        this.bigLineChart.chartData = chartData;
        this.bigLineChart.activeIndex = index;
        let barChartData = {
          datasets: [
            {
              label: '거래건수',
              // data: this.bigLineChart.allData[index],
              data: this.monthlyTransactionCount,
            }
          ],
          labels: this.monthlyLabel,
        }
        this.redBarChart.chartData = barChartData;
      },
      //도/광역시가 선택되면, 시/군/구 데이터를 얻어와서, 시/군/구 select 박스 생성
      makeGugun(e) {

        console.log(e.target.value);
        let selectBox = document.querySelector("#gugun");
        selectBox.options[0].selected = true;
        const codeName = e.target.value.split("|");
        this.sidoName = codeName[1];
        const sidoCode = codeName[0];
        this.getGugun(sidoCode);
      },
      // 시/군/구가 선택되면, 읍/면/동 데이터를 얻어와서, 읍/면/동 select 박스 생성
      makeDong(e) {
        console.log(e.target.value);
        let selectBox = document.querySelector("#dong");
        selectBox.options[0].selected = true;
        const codeName = e.target.value.split("|");
        const gugunCode = codeName[0];
        this.gugunName = codeName[1];
        this.getDong(gugunCode);

      },
      // 동이 선택되면, 거래 정보를 얻어옴
      async makeApt(e) {

        console.log(e.target.value);
        const codeName = e.target.value.split("|");
        const dongName = codeName[1];

        let data ={
          gugunCode:this.gugunCode,
          dongName: dongName,
        }
        await this.getDeal(data);
        console.log(this.houseDeals);

      },
      async makeMonthly(e) {

        console.log(e.target.value);
        let target = e.target.value.split("|");
        let data = {};
        if(target.length ===2){
          const aptName = target[0];
          data ={
            aptName,
            gugunCode: this.gugunCode,
            dongName: this.dongName,
          }
          await this.getMonthlyPrice(data);
          console.log(this.houseDealsMonthly);
          console.log(this.monthlyLabel);
          console.log(this.monthlyHousePrice);
          this.initBigChart(0);
        } else{
          data ={
            aptName: target[2],
            gugunCode: target[1],
            dongName: target[0],
          }
          await this.getMonthlyPrice(data);
          console.log(this.houseDealsMonthly);
          console.log(this.monthlyLabel);
          console.log(this.monthlyHousePrice);
          this.initBigChart(0);
        }
        data = {
          num :5,
          start: 1,
          keyword: data.aptName,
        }
        console.log(data);
        await this.getNewsList(data)


      },
      makeToastLineChart(){

        const el = document.getElementById('chart-area');
        const data = {
          categories: [
            '2021/01/01',
            '2021/02/01',
            '2021/03/01',
            '2021/04/01',
            '2021/05/01',
            '2021/06/01',
            '2021/07/01',
            '2021/08/01',
            '2021/09/01',
            '2021/10/01',
            '2021/11/01',
          ],
          series:

            this.trendsData.reduce((prev, trend ) =>{prev.push({name:trend.title, data:trend.data})
            return prev} ,[]),
            // [{
            //   name: this.trendsData[0].title,
            //   data: this.trendsData[0].data,
            // },
            // {
            //   name: this.trendsData[1].title,
            //   data: this.trendsData[1].data,
            // },
            // {
            //   name: this.trendsData[2].title,
            //   data: this.trendsData[2].data,
            // },
            // {
            //   name: this.trendsData[3].title,
            //   data: this.trendsData[3].data,
            // },
            // {
            //   name: this.trendsData[4].title,
            //   data:this.trendsData[4].data,
            // }],

        };
        const options = {
          chart: { title: 'Monthly Search Volume', width: 'auto', height: 'auto' ,},
          xAxis: {
            title: 'Month',
          },
          yAxis: {
            title: 'Amount',
          },
          tooltip: {
            template: (model, defaultTooltipTemplate, theme) => {
              const { body, header } = defaultTooltipTemplate;
              const { background } = theme;

              return `
        <div style="
          background: ${background};
          font-size: 14px;
          font-family: 'monaco';
          font-weight: 600;
          padding: 0 5px;
          text-align: center;
          color: white;
          position: fixed;
          ">
            <p>🏢 ${model.category} 🏢</p>
            ${body}
        </div>
      `;
            }
          },
          legend: {
            align: 'bottom',

          },
          theme: {
            yAxis: {
              label: {
                fontWeight: 400,
                fontFamily: 'monaco',
                fontSize: 14,
              },
              width: 3,
            },
            xAxis: {
              label: {
                fontWeight: 400,
                fontFamily: 'monaco',
                fontSize: 14,
              },
              width: 3,
            },
            legend:{
              label:{
                fontFamily:'monaco',
                fontSize: 14,
                fontWeight: 600,
              }
            },
            series: {
              lineWidth: 5,
            },
            dataLabels:{
              fontFamily:'monaco',
              fontSize: 10,
              fontWeight: 300,
            }
          },
          series: {
            // selectable:true,
            eventDetectType: 'grouped',
            zoomable: true
          }
        };
        const chart = new ToastLineChart({ el, data, options });
      },

    },
    async created() {
      let data ={
        aptName:"한남더힐",
        gugunCode:"11170",
        dongName: "한남동",
      }
      await this.getMonthlyPrice(data);
      console.log(this.houseDealsMonthly);
      console.log(this.monthlyLabel);
      console.log(this.monthlyHousePrice);
      this.initBigChart(0);
      this.getSido();

      if(this.userInfo){
        let data = {
          "userSeq": this.userInfo.seq,
        }
        await this.getInterestList(data);
        console.log(this.interestList, this.interestList.length);
        if(this.interestList && this.interestList.length >0){
          await trendsList({
            interestList :this.interestList
          }, (response) => {
            console.log(response.data);
            this.trends = response.data;
          }, error => console.log(error));

          this.makeToastLineChart();
        }
      }
      let keyword = this.keyword;
      if(!keyword) keyword ="부동산";
      data ={
        "num" : 5,
        "start" : 1,
        "keyword": keyword,
      }
      await this.getNewsList(data);

      },
    async mounted() {

    }
  };
</script>
<style>
.el-table .cell{
  padding-left: 0px;
  padding-right: 0px;
}
</style>
