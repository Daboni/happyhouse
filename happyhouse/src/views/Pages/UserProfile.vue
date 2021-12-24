<template>
  <div>
    <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header"
        style="min-height: 600px; background-image: url(img/theme/profile-cover.jpg); background-size: cover; background-position: center top;">
      <b-container fluid>
        <!-- Mask -->
        <span class="mask bg-gradient-success opacity-8"></span>
        <!-- Header container -->
        <b-container fluid class="d-flex align-items-center">
          <b-row >
            <b-col lg="7" md="10">
              <h1 class="display-2 text-white">Hello {{ userInfo.name }}</h1>
              <p class="text-white mt-0 mb-5"> By managing personal information protection and security, Happy House can be used to suit me.</p>
<!--              <a href="#!" class="btn btn-info">Edit profile</a>-->

            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </div>

    <b-container fluid class="mt--6">
      <b-row>
<!--        <b-col xl="4" class="order-xl-2 mb-5">-->
<!--          <user-card></user-card>-->
<!--        </b-col>-->
        <b-col xl="12" class="order-xl-1">
          <edit-profile-form></edit-profile-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
  import EditProfileForm from './UserProfile/EditProfileForm.vue';
  import UserCard from './UserProfile/UserCard.vue';
  import http from "@/util/http-common.js";
  import {mapState} from "vuex";

  export default {
    components: {
      EditProfileForm,
      UserCard
    },
    computed:{
      ...mapState("memberStore",["userInfo"]),
    }
    ,created() {
      console.log(this.userInfo)
    }
  };
</script>
<style>
</style>
