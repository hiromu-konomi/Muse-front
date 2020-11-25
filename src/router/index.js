
import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Signup from '../views/Signup.vue'
import Signin from "../views/Signin.vue"
import Admin from '../views/Admin.vue'
import Home from "../components/main/Home.vue"
import Notification from "../components/main/Notification.vue"
import Ranking from "../components/main/Ranking.vue"
import Group from "../components/main/Group.vue"
import Mypage from "../components/main/Mypage.vue"
import Explore from "../components/main/Explore.vue"
import Support from "../components/main/Support.vue"
import Inquiry from "../components/admin/Inquiry.vue"
import Report from "../components/admin/Report.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
    children: [{
    path: "/home",
    name: "home",
    component: Home,
    },{
    path: "/notification",
    name: "notification",
    component: Notification
    },{
    path: "/ranking",
    name: "ranking",
    component: Ranking
    },{
      path: "/group",
      name: "group",
      component: Group
    },{
      path: "/mypage",
      name: "mypage",
      component: Mypage
    },{
      path: "/explore",
      name: "explore",
      component: Explore
    },{
    path: "/support",
    name: "support",
    component: Support
  }]
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    children: [{
      path: "inquiry",
      name: "Inquiry",
      component: Inquiry,
    },{
      path: "report",
      name: "Report",
      component: Report,
    }]
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

