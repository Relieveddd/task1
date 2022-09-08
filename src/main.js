import { createApp } from "vue";
import LayoutApp from "./App.vue";
import { router } from "./router/index.js";
import HelperAxios from "axios";
import {
  HelperCore,
  HelperWebComm,
  HelperUserAccount,
  DataModelDataGroup,
} from "/util/HelperCore.js";
import { ConfigBiz } from "/util/ConfigBiz.js";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
//Axios请求拦截器
HelperAxios.interceptors.request.use(
  function (config) {
    config.baseURL = "http://wh011040.mysh360.com";
    // config.timeout = 5000;
    // // data默认是加在body里，post请求是在body里面，get请求是通过url,拦截器是通过header请求接口
    // config.data.PublicMsg = "拦截器添加的请求数据";
    const accessToken = window.localStorage.getItem("AccessToken");
    if (accessToken !== null) {
      config.headers["authorization"] = accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
//Axios响应拦截器，request在收到响应，进入request回调函数之前，先做一次响应
HelperAxios.interceptors.response.use(
  function (responseResult) {
    if (responseResult.status === 200) {
      if (responseResult.data.SC120 === "SuccGoal") {
        //正常请求的逻辑
        return responseResult.data;
      } else {
        alert("接口数据异常.");
        return;
      }
    } else {
      alert("网络请求异常.");
      return;
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);
//导航守卫（Navigation）
router.beforeEach((to, from, next) => {
  if (to.meta.AuthPolicy !== undefined && to.meta.AuthPolicy === "NeedLogin") {
    //去到的路由需要验证用户登录
    const accessToken = window.localStorage.getItem("AccessToken");
    if (accessToken === null) {
      //用户未登录，跳转IAM登录界面，此函数由SDK提供
      HelperUserAccount.handlerLogin();
    } else {
      next();
    }
  } else {
    next();
  }
});
// 创建一个 Vue 实例.
const AppNew = createApp(LayoutApp);
AppNew.use(router);
AppNew.use(ElementPlus);
AppNew.config.globalProperties.$HelperCore = HelperCore;
AppNew.config.globalProperties.$HelperWebComm = HelperWebComm;
AppNew.config.globalProperties.$HelperUserAccount = HelperUserAccount;
AppNew.config.globalProperties.$DataModelDataGroup = DataModelDataGroup;
AppNew.config.globalProperties.$ConfigBiz = ConfigBiz;
AppNew.config.globalProperties.$HelperAxios = HelperAxios;
AppNew.mount("#app");
