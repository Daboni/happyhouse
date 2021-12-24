<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <b-container class="container">
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-white">Sign Up</h1>
              <p class="text-lead text-white">
                Create an account to login and Dream your Happy House.
              </p>
            </b-col>
          </b-row>
        </div>
      </b-container>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            class="fill-default"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <b-container class="mt--8 pb-5">
      <!-- Table -->
      <b-row class="justify-content-center">
        <b-col lg="6" md="8">
          <b-card no-body class="bg-secondary border-0">
<!--            <b-card-header class="bg-transparent pb-5">-->
<!--              <div class="text-muted text-center mt-2 mb-4">-->
<!--                <small>Sign up with</small>-->
<!--              </div>-->
<!--              <div class="text-center">-->
<!--                <a href="#" class="btn btn-neutral btn-icon mr-4">-->
<!--                  <span class="btn-inner&#45;&#45;icon"-->
<!--                    ><img src="img/icons/common/github.svg"-->
<!--                  /></span>-->
<!--                  <span class="btn-inner&#45;&#45;text">Github</span>-->
<!--                </a>-->
<!--                <a href="#" class="btn btn-neutral btn-icon">-->
<!--                  <span class="btn-inner&#45;&#45;icon"-->
<!--                    ><img src="img/icons/common/google.svg"-->
<!--                  /></span>-->
<!--                  <span class="btn-inner&#45;&#45;text">Google</span>-->
<!--                </a>-->
<!--              </div>-->
<!--            </b-card-header>-->
            <b-card-body class="px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <small> Sign Up</small>
              </div>
              <validation-observer
                v-slot="{ handleSubmit }"
                ref="formValidator"
              >
                <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <base-input
                    alternative
                    class="mb-3"
                    prepend-icon="ni ni-hat-3"
                    placeholder="id"
                    name="id"
                    :rules="{ required: true }"
                    v-model="model.id"
                  >
                  </base-input>

                  <base-input
                    alternative
                    class="mb-3"
                    prepend-icon="ni ni-lock-circle-open"
                    placeholder="password"
                    type="password"
                    name="Password"
                    :rules="{ required: true, min: 6 }"
                    v-model="model.password"
                  >
                  </base-input>

                  <base-input
                    alternative
                    class="mb-3"
                    prepend-icon="ni ni-circle-08"
                    placeholder="name"
                    name="name"
                    :rules="{ required: true}"
                    v-model="model.name"
                  >
                  </base-input>

                  <base-input
                    alternative
                    class="mb-3"
                    prepend-icon="ni ni-email-83"
                    placeholder="email"
                    name="email"
                    :rules="{ required: true, email: true }"
                    v-model="model.email"
                  >
                  </base-input>

                  <base-input
                    alternative
                    class="mb-3"
                    prepend-icon="ni ni-mobile-button"
                    placeholder="tel"
                    name="tel"
                    :rules="{ required: true}"
                    v-model="model.tel"
                  >
                  </base-input>
                  <base-input
                    alternative
                    class="mb-3"
                    prepend-icon="ni ni-world-2"
                    placeholder="address"
                    name="address"
                    :rules="{ required: true}"
                    v-model="model.address"
                  >
                  </base-input>

                  <div class="text-muted font-italic">
                    <small
                      >password strength:
                      <span class="text-success font-weight-700"
                        >strong</span
                      ></small
                    >
                  </div>
                  <b-row class="my-4">
                    <b-col cols="12">
                      <base-input
                        :rules="{ required: { allowFalse: false } }"
                        name="Privacy"
                        Policy
                      >
                        <b-form-checkbox v-model="model.agree">
                          <span class="text-muted"
                            >I agree with the
                            <a href="#!">Privacy Policy</a></span
                          >
                        </b-form-checkbox>
                      </base-input>
                    </b-col>
                  </b-row>
                  <div class="text-center">
                    <b-button type="submit" variant="primary" class="mt-4"
                      >Create account</b-button
                    >
                  </div>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import http from "@/util/http-common.js";

export default {
  name: "register",
  data() {
    return {
      model: {
        id: "",
        password: "",
        name:"",
        email:"",
        tel:"",
        address:"",
        agree: false,
      },
    };
  },
  methods: {
    onSubmit() {
      console.log(this.model.id,this.model.password,this.model.name,this.model.email,this.model.tel,this.model.address);
      const memberDto = {
        id: this.model.id,
        pwd:this.model.password,
        name:this.model.name,
        email:this.model.email,
        tel:this.model.tel,
        address:this.model.address,
      } ;
      console.log(memberDto);
      http
        .post("/member", memberDto)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log("error : " + error);
        });

      // 목록 페이지로 이동하기
      this.$router.replace("/");
      // this will be called only after form is valid. You can do an api call here to register users
    },
  },
};
</script>
<style></style>
