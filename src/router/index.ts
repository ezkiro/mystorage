// Composables
import { RouteLocation, createRouter, createWebHistory } from "vue-router";
import { isAuthorized, setRedirectedName } from "@/service/auth";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
      },
      {
        path: "login",
        name: "Login",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Login.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

//check authentication
router.beforeEach(async (to: RouteLocation, from: RouteLocation) => {
  if (!isAuthorized() && to.name !== "Login") {
    console.log("require login from:" + from.fullPath);
    setRedirectedName(to.name as string);
    return { name: "Login" };
  }

  console.log("isAuthorized:" + isAuthorized());
  console.log("from:" + from.fullPath);
});

export default router;
