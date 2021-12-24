import Vue from 'vue';
import VueRouter from 'vue-router';
import store from "@/store/index.js";
import DashboardLayout from "@/views/Layout/DashboardLayout.vue";
import AuthLayout from "@/views/Pages/AuthLayout.vue";
import NotFound from "@/views/NotFoundPage.vue";
import Post from "@/views/Post";
import LightTable from "@/views/Tables/RegularTables/LightTable";
import PostWrite from "@/views/PostWrite.vue";
import postView from "@/views/postView";
import postUpdate from "@/views/postUpdate";




Vue.use(VueRouter);


const onlyAuthUser = async (to, from, next) => {
  // console.log(store);
  const checkUserInfo = store.getters["memberStore/checkUserInfo"];
  const getUserInfo = store._actions["memberStore/getUserInfo"];
  let token = sessionStorage.getItem("access-token");
  if (checkUserInfo == null && token) {
    await getUserInfo(token);
  }
  if (checkUserInfo === null) {
    alert("로그인이 필요한 페이지입니다..");
    // next({ name: "SignIn" });
    router.push({name: "login"});
  } else {
    console.log("로그인 했다.");
    next();
  }
};




const routes = [
  {
    path: "/",
    redirect: "dashboard",
    name:"main",
    component: DashboardLayout,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Dashboard.vue"),
      },
      {
        path: "/chat",
        name: "chat",
        beforeEnter: onlyAuthUser,
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Chat.vue"),
      },
      {
        path: "/profile",
        name: "profile",
        beforeEnter: onlyAuthUser,
        component: () =>
          import(
            /* webpackChunkName: "demo" */ "../views/Pages/UserProfile.vue"
            ),
      },
      {
        path: "/maps",
        name: "maps",
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/KakaoMaps.vue"),
      },
      {
        path: "/news",
        name: "news",
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/News"),
      },
      {
        path: "/post",
        name: "post",
        component: Post,
        redirect : "post/list",
        children:[
          {
            path: "list",
            name: "PostList",
            component: LightTable,
          },
          {
            path: "write",
            name: "PostWrite",
            beforeEnter: onlyAuthUser,
            component: PostWrite,
          },
          {
            path: "detail/:postno",
            name: "postView",
            beforeEnter: onlyAuthUser,
            component: postView,
          },
          {
            path: "update/:postno",
            name: "postUpdate",
            beforeEnter: onlyAuthUser,
            component: postUpdate,
          },
          // {
          //   path: "delete/:postno",
          //   name: "PostDelete",
          //   component: PostDelete,
          // },
        ]
      },
    ],
  },
  {
    path: "/",
    redirect: "login",
    component: AuthLayout,
    children: [
      {
        path: "/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Pages/Login.vue"),
      },
      {
        path: "/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Pages/Register.vue"),
      },
      { path: "*", component: NotFound },
    ],
  },
];

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active',
  scrollBehavior: (to, from ,savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
});

export default router;
