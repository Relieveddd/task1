import { createRouter, createWebHistory } from "vue-router";
const routerHistory = createWebHistory();
// 用一个变量定义路由.
const jsonArrayRoute = [
  {
    // 猫老爷前台, 不判断用户在线状态.
    path: "/",
    component: () => import("@/LayoutView/ValAddedBiz.vue"),
    children: [
      {
        path: "",
        component: () =>
          import("@/views/ValAddedBiz/DataAggreg/MainViewHome.vue"),
      },
      {
        path: "ValAddedBiz/PagingListPict",
        component: () =>
          import("@/views/ValAddedBiz/PagingList/MainViewPict.vue"),
      },
    ],
  },
  {
    // IAM 登录跳转, 不判断用户在线状态.
    path: "/LayoutViewUserAccount",
    component: () => import("@/LayoutView/UserAccount"),
    meta: {
      StrRouteTitle: "",
      StrRouteTip: "",
    },
    children: [
      {
        path: "VerfyUserWebCmd",
        component: () =>
          import("@/views/ShareAccountClient/VerfyUser/MainViewWebCmd"),
      },
    ],
  },
  {
    // 后台管理系统 (CMS), 必须判断用户在线.
    path: "/LayoutViewSystemMgt",
    component: () => import("@/LayoutView/SystemMgt"),
    // 在路由配置的 meta 中, 可以自定义的字段.
    meta: {
      //字段名和值都是自定义的
      AuthPolicy: "NeedLogin",
    },
    children: [
      {
        path: "MainViewHome",
        component: () => import("@/views/SystemMgt/DataAggreg/MainViewHome"),
      },
      {
        path: "PagingListUniv",
        component: () => import("@/views/SystemMgt/PagingList/MainViewUniv"),
        meta: {
          keepAlive: true,
        },
      },
      {
        path: "DetailedDataTextarea",
        component: () =>
          import("@/views/SystemMgt/DetailedData/MainViewTextarea"),
        meta: {
          keepAlive: false,
        },
      },
    ],
  },
];
// 创建路由实例.
const router = createRouter({
  history: routerHistory,
  routes: jsonArrayRoute,
});
// 输出路由实例和菜单数组 (全局变量).
export { router };
