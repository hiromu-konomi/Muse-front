import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import Admin from "../views/Admin.vue";
import Inquiry from "../components/admin/Inquiry.vue";
import Report from "../components/admin/Report.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
  },
  {
    path: "/inquiry",
    name: "Inquiry",
    component: Inquiry,
  },
  {
    path: "/report",
    name: "Report",
    component: Report,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
