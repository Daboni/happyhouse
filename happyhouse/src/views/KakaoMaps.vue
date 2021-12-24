<template>
  <div>

    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <b-row class="justify-content-md-center">
        <b-col xl="3" md="6" class="text-center">
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
        <b-col xl="3" md="6" class="text-center">
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
        <b-col xl="3" md="6" class="text-center">
          <stats-card title="읍/면/동"
                      class="mb-4">

            <template slot="footer">

              <select
                class="btn btn-secondary dropdown-toggle" id="dong" name="dong"
                data-toggle="dropdown" aria-expanded="false" @change="makeDeal">
                <option class="bg-white dropdown-item" value="null" disabled selected>읍/면/동</option>
                <map-item v-for="(dong, index) in dongs" :key="index" v-bind:name="dong.dong" v-bind:code="dong.dong"></map-item>
              </select>

            </template>
          </stats-card>

        </b-col>

      </b-row>
    </base-header>


    <b-container fluid class="mt--7 mb-8">
      <b-row>
        <b-col>
          <b-card no-body class="border-0">
            <div class="map-canvas" id="map" style="width: 100%; height: 600px"></div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid class="mt--7" v-if="!showDetail">
      <b-row>
        <b-col>
          <house-deal-table v-bind:aptAllList="aptList" v-bind:pagination="aptDealPagination" v-bind:gugunCode="gugunCode" v-bind:dongName="dongName" />
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid class="mt--7" v-if="showDetail">
      <b-row>
        <b-col>
          <house-deal-detail-table v-bind:aptDealList="houseDealDetails" v-bind:gugunCode="gugunCode" v-bind:dongName="dongName" v-bind:pagination="aptDealDetailPagination"/>
        </b-col>
      </b-row>
    </b-container>
<!--    <b-container fluid class="mt&#45;&#45;7">-->
<!--      <b-row>-->
<!--        <b-col>-->
<!--          <b-card no-body class="border-0">-->
<!--            <div id="map-custom" class="map-canvas"-->
<!--                 style="height: 600px;"></div>-->
<!--          </b-card>-->
<!--        </b-col>-->
<!--      </b-row>-->
<!--    </b-container>-->
  </div>
</template>

<script>
  // import { API_KEY } from './Maps/API_KEY';
  // import GoogleMapsLoader from 'google-maps';
  // GoogleMapsLoader.KEY = API_KEY;

  import MapItem from "@/components/Map/MapItem";
  import HouseDealTable from "@/components/Map/HouseDealTable";
  import HouseDealDetailTable from "@/components/Map/HouseDealDetailTable";
  import {mapState, mapActions, mapGetters} from 'vuex';
  import InfoWindow from "@/components/Map/InfoWindow";
  import Vue from "vue";
  import axios from "axios";
  import SchoolInfo from "@/components/Map/SchoolInfo";

  const houseStore = "houseStore";
  export default {
    components :{
      MapItem,
      HouseDealTable,
      HouseDealDetailTable,
      InfoWindow,

    },
    data() {
      return {
        map: null,
        marker: null,
        infowindow: null,
        showDetail : false,
        aptDealPagination : { totalPageCount : 0},
        aptDealDetailPagination : { totalPageCount : 0},
        nearSchool : null,
        sidoName: "",
        gugunName: "",
        clickLine: null,
        distanceOverlay: null,
        geocoder:null,
        dots:[],
        linePath:[],
        customOverlay:null,
      }
    },
    created() {
      //생성할 될때, 도/광역시 select 박스 생성
      this.getSido();
    },
    computed:{
      ...mapState("memberStore",["userInfo"]),
      ...mapState(houseStore, [ "sidos", "guguns", "dongs", "sidoCode", "gugunCode", "dongName", "apt", "houseDeals", "schoolList","houseDealDetails"]),
      ...mapGetters(houseStore,['aptList', 'pagination']),
    },
    methods: {
      ...mapActions(houseStore,["getSido", "getGugun", "getDong", "getDeal", "getDealByAptName", "getSchoolList","getDealWithInterest"]),

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
      async makeDeal(e) {
        this.deleteCircleDot();
        this.deleteClickLine();
        this.deleteDistnce();
        this.initMap();

        this.showDetail = false;
        console.log(e.target.value);
        const codeName = e.target.value.split("|");
        const dongName = codeName[1];
        let data = {}
        console.log(this.userInfo)
        if(this.userInfo  ){
          data = {
            gugunCode : this.gugunCode,
            dongName,
            seq: this.userInfo.seq,
            // currentPage: 0,
            // sizePerPage: 10,
          }
        } else{
          data = {
            gugunCode : this.gugunCode,
            dongName,
            seq: 0
          }
        }

        //await this.getDeal(data)
        await this.getDealWithInterest(data);


       this.aptDealPagination =this.pagination;
        console.log("HOUSEDEALS", this.houseDeals);

       await this.getSchoolList(data)

        // this.displayMap();
       await this.makeList(this.houseDeals,this.schoolList, this.dongName)

      },
      async getAptDealByAptName(data){
        await this.getDealByAptName(data);
      },
      async makeList(housedeals, schoolList, dongName) {
        console.log("makeList", housedeals)

        const bounds = new kakao.maps.LatLngBounds();

        const map = this.map;
        const vue = this;
        this.geocoder = new kakao.maps.services.Geocoder();
        let aptInfo = null;
        let callback = function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            console.log(result);

          } else{
            console.log(status)
          }
        };

        let isError = false;
        // 학교 주소 이상애들 지오코더를 검색, 근데 잘안나옴 ㅠ
        // for(let school of schoolList){
        //   if(String.valueOf(school.lat).length <=4 || String.valueOf(school.lng).length <=5){
        //
        //     const searchAddress = school.address + " "+school.name;
        //     console.log(searchAddress);
        //     await this.addressSearch(searchAddress).then(
        //       result => {
        //          console.log(result)
        //         school.lat = result[0].y;
        //         school.lng = result[0].x;
        //       }).
        //     catch(error =>{
        //       console.log(school.name);
        //       console.log(error)
        //       isError = true;
        //     })
        //   }
        // }


        for (let apt of housedeals) {


        //  console.log(apt);
          const searchAddress = this.sidoName+" "+  this.gugunName + " "
            + this.dongName +" " + apt.jibun+" " +apt.aptName ;
          //console.log(searchAddress);

          await this.addressSearch(searchAddress).then(
            result => {
             // console.log(result)
              apt.lat = result[0].y;
              apt.lng = result[0].x;
            }).
          catch(error =>{
            console.log(apt.aptName);
            console.log(error)
            isError = true;
        }
          );
          if(isError){
            isError = false;
            continue;
          }




          const coords = new kakao.maps.LatLng(apt.lat, apt.lng);

          const marker = new kakao.maps.Marker({
            map: this.map,
            position: coords,
          });

          let InfoWindowComponent = Vue.extend(InfoWindow);
          let instance = new InfoWindowComponent({
            propsData: {
              name: apt.aptName,
            }
          });
          instance.$mount();
          // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
          const iwContent = instance.$el;

          //const iwContent =`<div style="width:150px;text-align:center;padding:6px 0;">${apt.aptName}</div>`

          // 인포윈도우를 생성합니다
          const infowindow = new kakao.maps.InfoWindow({
            content: iwContent,
          });


          // 마커에 마우스오버 이벤트를 등록합니다
          kakao.maps.event.addListener(marker, "mouseover", function () {
            // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
            infowindow.open(map, marker);
          });

          // 마커에 마우스아웃 이벤트를 등록합니다
          kakao.maps.event.addListener(marker, "mouseout", function () {
            // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
            infowindow.close();
          });

          const gugunCode = this.gugunCode;
          const dongName = this.dongName;
          kakao.maps.event.addListener(marker, "click", async function (e) {
            vue.deleteCircleDot();
            vue.deleteClickLine();
            vue.deleteDistnce();

            const aptName = infowindow.a.innerText;
            const data = {
              gugunCode,
              dongName,
              aptName,
              "currentPage": 0,
              "sizePerPage": 10,
            }
            await vue.getAptDealByAptName(data)
            // console.log( vue.pagination)
            vue.aptDealDetailPagination = vue.pagination;
            vue.showDetail = true;
            if(schoolList) {
              let minDistance = 999999;
              let nearSchool = null;
              for (let school of schoolList) {
                // axios.get("https://map.kakao.com/?sName=%EC%84%9C%EC%9A%B8%EC%8B%9C%EC%B2%AD&eName=%EC%84%9C%EC%9A%B8%EA%B3%A0%EC%86%8D%ED%84%B0%EB%AF%B8%EB%84%90")
                // .then(response => {console.log(response)});
                if (school.name.indexOf("초등") != -1) {
                  let d = vue.getDistance(apt.lat, apt.lng, school.lat, school.lng);
                  if (minDistance > d) {
                    minDistance = d;
                    nearSchool = school;
                  }
                }
              }

              const schoolCoords = new kakao.maps.LatLng(nearSchool.lat, nearSchool.lng);
              const aptCoords = new kakao.maps.LatLng(apt.lat, apt.lng);
              let linePath = [];
              linePath.push(aptCoords);
              linePath.push(schoolCoords);
              console.log(nearSchool);

              // 클릭한 위치를 기준으로 선을 생성하고 지도위에 표시합니다
              vue.clickLine = new kakao.maps.Polyline({
                map: map, // 선을 표시할 지도입니다
                path: [aptCoords], // 선을 구성하는 좌표 배열입니다 클릭한 위치를 넣어줍니다
                strokeWeight: 3, // 선의 두께입니다
                strokeColor: '#db4040', // 선의 색깔입니다
                strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                strokeStyle: 'solid' // 선의 스타일입니다
              });

              vue.displayCircleDot(aptCoords, 0);
              vue.clickLine.setPath(linePath);
              let distance = Math.round(vue.clickLine.getLength());
              vue.displayCircleDot(schoolCoords, distance);

              distance = Math.round(vue.clickLine.getLength()) // 선의 총 거리를 계산합니다
              let distanceContent = vue.getTimeHTML(distance); // 커스텀오버레이에 추가될 내용입니다

              // 그려진 선의 거리정보를 지도에 표시합니다
              vue.showDistance(distanceContent, linePath[0]);

              let SchoolInfoComponent = Vue.extend(SchoolInfo);
              let instance = new SchoolInfoComponent({
                propsData: {
                  nearSchool,
                }
              });
              instance.$mount();

              const content = instance.$el;

              // 커스텀 오버레이가 표시될 위치입니다
              console.log(apt.lat)
              console.log(apt.lat)

              var position = new kakao.maps.LatLng(apt.lat, apt.lng);
              // 커스텀 오버레이를 생성합니다
              if(vue.customOverlay){
                vue.customOverlay.setPosition(position);
                vue.customOverlay.setContent(content);
              }else{
                vue.customOverlay = new kakao.maps.CustomOverlay({
                  position: position,
                  content: content,
                  removable: true,
                  xAnchor: -0.3,
                  yAnchor: 1
                });
              }

              console.log(6666666);
              let open = false;
              vue.customOverlay.setMap(map);
// 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
              kakao.maps.event.addListener(marker, 'click', function () {
                open = true;

              });
            }

            // vue.getSchoolList(data);
            // apt[aptName].map((a) => {
            //
            //   const aptData = {
            //     aptName: aptName,
            //     dealAmount: a.dealAmount,
            //     area: a.area,
            //     date:a.date,
            //     lat: a.lat,
            //     lng: a.lng,
            //   };
            //   aptList.push(aptData)
            //   console.log(aptName);
            // });
            console.log(aptName);
            //TODO: 페이지네이션 적용하기
            map.setCenter(coords);
            map.setLevel(2);


            // TODO: 질문하기 => this.map을 사용할 수 없음, 왜 접근하지 못하는 걸까??
            // this.map.setCenter(coords);
            // this.map.setLevel(2);
          });

          bounds.extend(coords);
          this.map.setBounds(bounds);
        }


        let eleImageSrc = 'img/icons/map/ele_school.png'; // 마커이미지의 주소입니다
        let midImageSrc = 'img/icons/map/mid_school.png'; // 마커이미지의 주소입니다
        let highImageSrc = 'img/icons/map/high_school.png'; // 마커이미지의 주소입니다
        let etcImageSrc = 'img/icons/map/etc_school.png'; // 마커이미지의 주소입니다
        let imageSize = new kakao.maps.Size(32, 45); // 마커이미지의 크기입니다
        let imageOption = {offset: new kakao.maps.Point(16, 45)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.


        for (let school of schoolList) {

          const coords = new kakao.maps.LatLng(school.lat, school.lng);


          // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
          let markerImage = new kakao.maps.MarkerImage(etcImageSrc, imageSize, imageOption);
          switch (school.level) {
            case "02":
              markerImage = new kakao.maps.MarkerImage(eleImageSrc, imageSize, imageOption);
              break
            case "03":
              markerImage = new kakao.maps.MarkerImage(midImageSrc, imageSize, imageOption);
              break
            case "04":
              markerImage = new kakao.maps.MarkerImage(highImageSrc, imageSize, imageOption);
              break

          }


          const marker = new kakao.maps.Marker({
            map: this.map,
            position: coords,
            image: markerImage,
          });

          let InfoWindowComponent = Vue.extend(InfoWindow);
          let instance = new InfoWindowComponent({
            propsData: {
              name: school.name,
            }
          });
          instance.$mount();
          // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
          const iwContent = instance.$el;

          //const iwContent =`<div style="width:150px;text-align:center;padding:6px 0;">${apt.aptName}</div>`

          // 인포윈도우를 생성합니다
          const infowindow = new kakao.maps.InfoWindow({
            content: iwContent,
          });

          // 마커에 마우스오버 이벤트를 등록합니다
          kakao.maps.event.addListener(marker, "mouseover", function () {
            // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
            infowindow.open(map, marker);
          });

          // 마커에 마우스아웃 이벤트를 등록합니다
          kakao.maps.event.addListener(marker, "mouseout", function () {
            // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
            infowindow.close();
          });

          const gugunCode = this.gugunCode;
          const dongName = this.dongName;


          bounds.extend(coords);
          this.map.setBounds(bounds);
        }
      },
      getDistance(x,y,x2,y2){
        return Math.sqrt( Math.pow(x-x2,2) +Math.pow(y-y2,2));
      }
,
      initMap() {
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(37.5012743, 127.039585),
          level: 3,
        };
        this.map = new kakao.maps.Map(container, options);
        return this.map;
      },
      getTimeHTML(distance){
        // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
        var walkkTime = distance / 67 | 0;
        var walkHour = '', walkMin = '';

        // 계산한 도보 시간이 60분 보다 크면 시간으로 표시합니다
        if (walkkTime > 60) {
          walkHour = '<span class="number text-danger">' + Math.floor(walkkTime / 60) + '</span>시간 '
        }
        walkMin = '<span class="number text-danger">' + walkkTime % 60 + '</span>분'

        // 자전거의 평균 시속은 16km/h 이고 이것을 기준으로 자전거의 분속은 267m/min입니다
        var bycicleTime = distance / 227 | 0;
        var bycicleHour = '', bycicleMin = '';

        // 계산한 자전거 시간이 60분 보다 크면 시간으로 표출합니다
        if (bycicleTime > 60) {
          bycicleHour = '<span class="number text-danger">' + Math.floor(bycicleTime / 60) + '</span>시간 '
        }
        bycicleMin = '<span class="number text-danger">' + bycicleTime % 60 + '</span>분'

        // 거리와 도보 시간, 자전거 시간을 가지고 HTML Content를 만들어 리턴합니다
        var content = '<ul class="list-group dotOverlay distanceInfo bg-white rounded m-2">';
        content += '    <li class="list-group-item">';
        content += '        <span class="label">총거리</span><span class="number text-danger">' + distance + '</span>m';
        content += '    </li>';
        content += '    <li class="list-group-item">';
        content += '        <span class="label">도보</span>' + walkHour + walkMin;
        content += '    </li>';
        content += '    <li class="list-group-item">';
        content += '        <span class="label">자전거</span>' + bycicleHour + bycicleMin;
        content += '    </li>';
        content += '</ul>'

        return content;
      },
      // 마우스 드래그로 그려지고 있는 선의 총거리 정보를 표시하거
      // 마우스 오른쪽 클릭으로 선 그리가 종료됐을 때 선의 정보를 표시하는 커스텀 오버레이를 생성하고 지도에 표시하는 함수입니다
      showDistance(content, position) {

    if (this.distanceOverlay) { // 커스텀오버레이가 생성된 상태이면

      // 커스텀 오버레이의 위치와 표시할 내용을 설정합니다
      this.distanceOverlay.setPosition(position);
      this.distanceOverlay.setContent(content);

    } else { // 커스텀 오버레이가 생성되지 않은 상태이면

      // 커스텀 오버레이를 생성하고 지도에 표시합니다
      this.distanceOverlay = new kakao.maps.CustomOverlay({
        map: this.map, // 커스텀오버레이를 표시할 지도입니다
        content: content,  // 커스텀오버레이에 표시할 내용입니다
        position: position, // 커스텀오버레이를 표시할 위치입니다.
        xAnchor: 0,
        yAnchor: 0,
        zIndex: 3
      });
    }
  },
      // 선이 그려지고 있는 상태일 때 지도를 클릭하면 호출하여
      // 클릭 지점에 대한 정보 (동그라미와 클릭 지점까지의 총거리)를 표출하는 함수입니다
      displayCircleDot(position, distance) {

    // 클릭 지점을 표시할 빨간 동그라미 커스텀오버레이를 생성합니다
    let circleOverlay = new kakao.maps.CustomOverlay({
      content: '<span class="dot"></span>',
      position: position,
      zIndex: 1
    });

    // 지도에 표시합니다
    circleOverlay.setMap(this.map);



    // 배열에 추가합니다
    this.dots.push({circle:circleOverlay});
  }
  ,   // 클릭 지점에 대한 정보 (동그라미와 클릭 지점까지의 총거리)를 지도에서 모두 제거하는 함수입니다
 deleteCircleDot() {
    var i;

    for ( i = 0; i < this.dots.length; i++ ){
      if (this.dots[i].circle) {
        this.dots[i].circle.setMap(null);
      }

      if (this.dots[i].distance) {
        this.dots[i].distance.setMap(null);
      }
    }

    this.dots = [];
  },
      // 클릭으로 그려진 선을 지도에서 제거하는 함수입니다
      deleteClickLine() {
    if (this.clickLine) {
      this.clickLine.setMap(null);
      this.clickLine = null;
    }
  },
      // 그려지고 있는 선의 총거리 정보와
// 선 그리가 종료됐을 때 선의 정보를 표시하는 커스텀 오버레이를 삭제하는 함수입니다
      deleteDistnce () {
    if (this.distanceOverlay) {
      this.distanceOverlay.setMap(null);
      this.distanceOverlay = null;
    }
  },
      deleteCustomOverlay(){
        if(this.customOverlay){

          this.customOverlay.setMap(null);
          this.customOverlay=null;

        }
      },
    async addressSearch ( address) {
      return new Promise((resolve, reject) => {
        this.geocoder.addressSearch(address, function(result, status) {
          if (status === kakao.maps.services.Status.OK) {
            resolve(result);
          } else {
            reject(status);
          }
        });
      });
    },



    },
    mounted() {
      if (window.kakao && window.kakao.maps) {
        this.initMap();
      } else {
        const script = document.createElement("script");
        /* global kakao */
        script.onload = () => kakao.maps.load(this.initMap);
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=cfc47d50188451f6e0625eb612ecb35c&libraries=services";
        document.head.appendChild(script);
        console.log("카카오맵 로드 성공@")
      }
    },

  };
</script>

<style>
.dot {
  overflow: hidden;
  float: left;
  width: 12px;
  height: 12px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/mini_circle.png);
}
</style>
