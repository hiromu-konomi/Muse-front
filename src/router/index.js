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
import Postform from "../views/PostForm.vue"
import Searchsong from "../views/SearchSong"
import RegisterUserDetail from "../views/RegisterUserDetail"
import AddGroup from "../views/AddGroup.vue"
import GroupDetail from "../views/GroupDetail.vue"
import GroupInfo from "../components/group/GroupInfo.vue"
import GroupChat from "../components/group/GroupChat.vue"
import GroupMember from "../components/group/GroupMember.vue"
import OwnerGroupList from "../components/group/OwnerGroupList.vue"
import JoinGroupList from "../components/group/JoinGroupList.vue"

Vue.use(VueRouter);


const routes = [{
        path: "/",
        name: "Main",
        component: Main,
        children: [{
                path: "/home",
                name: "home",
                component: Home,
            },
            {
                path: "/notification",
                name: "notification",
                component: Notification,
            },
            {
                path: "/ranking",
                name: "ranking",
                component: Ranking,
            },
            {
                path: "/group",
                name: "group",
                component: Group,
            },
            {
                path: "/mypage",
                name: "mypage",
                component: Mypage,
            },
            {
                path: "/explore",
                name: "explore",
                component: Explore,
            },
            {
                path: "/support",
                name: "support",
                component: Support,
            },
        ],
    },
    {
        path: "/admin",
        name: "Admin",
        component: Admin,
        children: [{
                path: "inquiry",
                name: "Inquiry",
                component: Inquiry,
            },
            {
                path: "report",
                name: "Report",
                component: Report,
            },
        ],
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
    {
        path: "/postform",
        name: "Postform",
        component: Postform,
    },
    {
        path: "/searchsong",
        name: "Searchsong",
        component: Searchsong,
    },
    {
        path: "/userDetail",
        name: "userDetail",
        component: RegisterUserDetail,
    },
    {
        path: "/addGroup",
        name: "AddGroup",
        component: AddGroup,
    },
    {
        path: "/groupDetail",
        name: "GroupDetail",
        component: GroupDetail,
        children: [{
                path: "/groupInfo",
                name: "GroupInfo",
                component: GroupInfo,
            },
            {
                path: "/groupChat",
                name: "GroupChat",
                component: GroupChat,
            },
            {
                path: "/groupMember",
                name: "GroupMember",
                component: GroupMember,
            },
        ],
    },

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
    children: [
      {
        path: "/home",
        name: "home",
        component: Home,
      },
      {
        path: "/notification",
        name: "notification",
        component: Notification,
      },
      {
        path: "/ranking",
        name: "ranking",
        component: Ranking,
      },
      {
        path: "/group",
        name: "group",
        component: Group,
        children: [
          {
            path: "/ownerGroupList",
            name: "OwnerGroupList",
            component: OwnerGroupList,
          },
          {
            path: "/joinGroupList",
            name: "JoinGroupList",
            component: JoinGroupList,
          },
        ]
      },
      {
        path: "/mypage",
        name: "mypage",
        component: Mypage,
      },
      {
        path: "/explore",
        name: "explore",
        component: Explore,
      },
      {
        path: "/support",
        name: "support",
        component: Support,
      },
    ],
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    children: [
      {
        path: "inquiry",
        name: "Inquiry",
        component: Inquiry,
      },
      {
        path: "report",
        name: "Report",
        component: Report,
      },
    ],
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
  {
    path: "/postform",
    name: "Postform",
    component: Postform,
  },
  {
    path: "/searchsong",
    name: "Searchsong",
    component: Searchsong,
  },
  {
    path: "/userDetail",
    name: "userDetail",
    component: RegisterUserDetail,
  },
  {
    path: "/addGroup",
    name: "AddGroup",
    component: AddGroup,
  },
  {
    path: "/groupDetail",
    name: "GroupDetail",
    component: GroupDetail,
    children: [
      {
        path: "/groupInfo",
        name: "GroupInfo",
        component: GroupInfo,
      },
      {
        path: "/groupChat",
        name: "GroupChat",
        component: GroupChat,
      },
      {
        path: "/groupMember",
        name: "GroupMember",
        component: GroupMember,
      },
    ],
  },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;