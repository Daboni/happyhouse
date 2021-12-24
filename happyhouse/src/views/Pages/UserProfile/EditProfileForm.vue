<template>
  <card>
    <b-row align-v="center" slot="header" >
      <b-col cols="8">
        <h3 class="mb-0">Edit profile </h3>
      </b-col>
      <b-col cols="4" class="text-right">
        <button @click="modifyUser" class="btn btn-sm btn-primary"> Edit</button>
      </b-col>
    </b-row>

    <b-form @submit.prevent="updateProfile">
      <h6 class="heading-small text-muted mb-4">User information</h6>

      <div class="pl-lg-4">
        <b-row>
          <b-col lg="6">
            <label for="Id" class="form-control-label" > Id </label>
            <input
              type="text"
              id="Id"
              readonly
              placeholder="Id"
              class="form-control mb-4"
              v-model="user.id"
            >

          </b-col>
          <b-col lg="6">

            <label for="Email" class="form-control-label" > Email </label>
            <input
              type="text"
              id="Email"
              readonly
              placeholder="ssafy@email.com"
              class="form-control mb-4"
              v-model="user.email"
            >
          </b-col>
        </b-row>
        <b-row >
          <b-col lg="6">

            <label for="Name" class="form-control-label" > Name </label>
            <input
              type="text"
              id="Name"
              placeholder="Name"
              class="form-control mb-4"
              v-model="user.name"
            >
          </b-col>
          <b-col lg="6">

            <label for="ProfileImg">프로필 이미지 변경 </label>
            <div class="input-group mb-3">
              <input name="img" type="file" class="form-control" id="ProfileImg">
              <label  class="input-group-text" for="ProfileImg">Upload</label>
            </div>
          </b-col>

<!--          <b-col lg="6">-->
<!--            <base-input-->
<!--              type="text"-->
<!--              label="Last Name"-->
<!--              placeholder="Last Name"-->
<!--              v-model="user.lastName"-->
<!--            >-->
<!--            </base-input>-->
<!--          </b-col>-->
        </b-row>
      </div>
      <hr class="my-4">

      <!-- Address -->
      <h6 class="heading-small text-muted mb-4">Contact information</h6>

      <div class="pl-lg-4">
        <b-row>
          <b-col md="6">

            <label for="Address" class="form-control-label" > Address </label>
            <input
              type="text"
              id="Address"
              placeholder="Address"
              class="form-control mb-4"
              v-model="user.address"
            >

          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6">
            <label for="TelePhone" class="form-control-label" > TelePhone </label>
            <input
              type="text"
              id="TelePhone"
              placeholder="TelePhone"
              class="form-control mb-4"
              v-model="user.tel"
            >
          </b-col>
<!--          <b-col lg="4">-->
<!--            <base-input-->
<!--              type="text"-->
<!--              label="City"-->
<!--              placeholder="City"-->
<!--              v-model="user.city"-->
<!--            >-->
<!--            </base-input>-->
<!--          </b-col>-->
<!--          <b-col lg="4">-->
<!--            <base-input-->
<!--              type="text"-->
<!--              label="Country"-->
<!--              placeholder="Country"-->
<!--              v-model="user.country"-->
<!--            >-->
<!--            </base-input>-->
<!--          </b-col>-->
<!--          <b-col lg="4">-->
<!--            <base-input-->
<!--              label="Postal Code"-->
<!--              placeholder="ZIP Code"-->
<!--              v-model="user.postalCode"-->
<!--            >-->
<!--            </base-input>-->
<!--          </b-col>-->
        </b-row>
        <b-row v-if="interestList">
          <b-col>
            <interest-table v-bind:interestList="interestList" v-bind:pagination="pagination"/>
          </b-col>
        </b-row>

      </div>

<!--      <hr class="my-4">-->
<!--      &lt;!&ndash; Description &ndash;&gt;-->
<!--      <h6 class="heading-small text-muted mb-4">About me</h6>-->
<!--      <div class="pl-lg-4">-->
<!--        <b-form-group label="About Me" label-class="form-control-label" class="mb-0" label-for="about-form-textaria">-->
<!--         &lt;!&ndash;  <label class="form-control-label">About Me</label> &ndash;&gt;-->
<!--          <b-form-textarea rows="4" value="A beautiful premium dashboard for BootstrapVue." id="about-form-textaria" placeholder="A few words about you ..."></b-form-textarea>-->
<!--        </b-form-group>-->
<!--      </div>-->

    </b-form>
  </card>
</template>
<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import InterestTable from "@/components/User/InterestTable";
import axios from "axios";
import {API_BASE_URL} from "@/config";

let memberStore = "memberStore";
let houseStore = "houseStore";

export default {
  components: {InterestTable},
  data() {
    return {
      // user: {
      //   company: 'Creative Code Inc.',
      //   username: 'michael23',
      //   email: '',
      //   firstName: 'Mike',
      //   lastName: 'Andrew',
      //   address: 'Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09',
      //   city: 'New York',
      //   country: 'USA',
      //   postalCode: '',
      //   aboutMe: `Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo.`
      // }
    };
  },
  computed:{
    ...mapState(memberStore,["userInfo"]),
    ...mapState(houseStore,["interestList"]),
    ...mapGetters(houseStore,['pagination']),
    user: function (){
        let user ={
          id: this.userInfo.id,
          name: this.userInfo.name,
          email: this.userInfo.username,
          tel: this.userInfo.tel,
          address: this.userInfo.address,

        }
      return user;
    }
  },
  async created() {
    console.log(this.userInfo)
    let data = {
      "userSeq": this.userInfo.seq,
      "currentPage": 0,
      "sizePerPage": 10,
    }
    await this.getInterestListWithPage(data);
    console.log(this.interestList);
  },
  methods: {
    ...mapActions(memberStore,["modifyUserInfo","modifyProfileImg"]),
    ...mapActions(houseStore,["getInterestList","getInterestListWithPage"]),
    ...mapMutations(memberStore, ["SET_USER_INFO"]),
    updateProfile() {
      alert('Your data: ' + JSON.stringify(this.user));
    },
    async modifyUser(){
      console.log(this.user);
      await this.modifyUserInfo(this.user);


      let ProfileImg = document.getElementById("ProfileImg");
      console.log(ProfileImg.files)
      if(ProfileImg.files.length >0){
        let img = ProfileImg.files[0];
        console.log(img);
        console.log("Hi");
        let frm = new FormData();
        frm.append("img", img);
        console.log(frm.get("img"))

        await axios.post(`${API_BASE_URL}/member/img/${this.user.email}`,
         frm,
          {
            headers:{
              'Content-Type': 'multipart/form-data',
            }
          }
          ).then(response => {
            this.SET_USER_INFO(response.data);
            alert("프로필 이미지 변경 성공");
            this.$router.push({name: "dashboard"})
        }).catch(error => console.log(error));

        // this.modifyProfileImg(this.user.email, frm)
      }



    },
  }
};
</script>
<style></style>
