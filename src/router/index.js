import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import Home from "../components/main/Home.vue";
import Notification from "../components/main/Notification.vue";
import Group from "../components/main/Group.vue";
import UserPage from "../components/main/UserPage.vue";
import Explore from "../components/main/Explore.vue";
import Postform from "../views/PostForm.vue";
import Searchsong from "../views/SearchSong";
import RegisterUserDetail from "../views/RegisterUserDetail";
import AddGroup from "../views/AddGroup.vue";
import GroupDetail from "../views/GroupDetail.vue";
import GroupInfo from "../components/group/GroupInfo.vue";
import GroupChat from "../components/group/GroupChat.vue";
import GroupMember from "../components/group/GroupMember.vue";
import OwnerGroupList from "../components/group/OwnerGroupList.vue";
import JoinGroupList from "../components/group/JoinGroupList.vue";
import FollowUser from "../views/FollowUser.vue";
import Follow from "../components/main/Follow.vue";
import Followers from "../components/main/Followers.vue";
import FollowNotification from "../components/notification/FollowNotification.vue";
import LikeNotification from "../components/notification/LikeNotification.vue";
import GroupInviteNotification from "../components/notification/GroupInviteNotification.vue";
import SongEx from "../components/explore/SongEx.vue";
import UserEx from "../components/explore/UserEx.vue";
import GroupEx from "../components/explore/GroupEx.vue";

Vue.use(VueRouter);

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
        children: [
          {
            path: "/followNoti",
            name: "FollowNotification",
            component: FollowNotification,
          },
          {
            path: "/likeNoti",
            name: "LikeNotification",
            component: LikeNotification,
          },
          {
            path: "/groupInvNoti",
            name: "GroupInviteNotification",
            component: GroupInviteNotification,
          },
        ],
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
        ],
      },
      {
        path: "/user/:user_id?/userpage",
        name: "userpage",
        component: UserPage,
      },
      {
        path: "uesr/:follow_id/follows",
        name: "follows",
        component: Follow,
      },
      {
        path: "user/:follower_id/followers",
        name: "followers",
        component: Followers,
      },
      {
        path: "/explore",
        name: "explore",
        component: Explore,
        children: [
          {
            path: "/songExplore",
            name: "SongExplore",
            component: SongEx,
          },
          {
            path: "/userExplore",
            name: "UserExplore",
            component: UserEx,
          },
          {
            path: "/groupExplore",
            name: "GroupExplore",
            component: GroupEx,
          },
        ]
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
    path: "/recommendUser",
    name: "recommendUser",
    component: FollowUser,
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
