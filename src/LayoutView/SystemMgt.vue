<template>
  <div class="ProcUnitHorizBar3R">
    <div class="InnerLogo3R">
      <a href="/"><img src="/logo.png" alt="logo" /></a>
    </div>
    <div class="Inner3R">
      <UserConsoleNavi></UserConsoleNavi>
    </div>
  </div>

  <div class="ProcUnitMain3R">
    <div class="InnerMenu3R">
      <div class="ProcUnitHorizBar3W proc-unit-char">
        <a class="InnerTitle3R" href="/LV06SM030/">System Admin</a>
      </div>
      <!-- TODO 在此使用 el-tree 渲染栏目列表. -->
      <el-tree
        :data="jsonTreeNavi.jsonArrayNodeList"
        :props="jsonTreeNavi.nodeProp"
        @node-click="handleTreeNodeClick"
        class="proc-unit-tree-navi-50 proc-unit-char"
      />
    </div>
    <div class="InnerRight3R">
      <div class="ProcUnitWorkbench3R">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, getCurrentInstance, watch, ref } from "vue";
import UserConsoleNavi from "@/PartialView/UserConsoleNavi.vue";
import { ElMessage } from "element-plus";
const { proxy } = getCurrentInstance();
//根据文档3.2.2获取用户角色数据
proxy.$HelperAxios
  .get("/AttrUserAccount/QueryUserGroup")
  .then((responseUserGroup) => {
    // console.log(responseGroup);
    // 根据文档3.2.1，获取栏目数据
    let numUserGroupInner =
      responseUserGroup.Payload.JsonArrayUserGroup[0].NumUserGroup;
    proxy.$HelperAxios
      .get("/DataAccessWithGroup/QueryDataGroup", {
        params: { CurrentUserGroup: numUserGroupInner },
      })
      .then((responseDataGroup) => {
        // console.log(responseDataGroup);
        jsonTreeNavi.value.jsonArrayNodeList = responseDataGroup.Payload;
      });
  });

let jsonTreeNavi = ref({
  jsonArrayNodeList: [],
  nodeProp: {
    children: "ListChild",
    label: "ShowText",
  },
});
function handleTreeNodeClick(jsonSrcIn) {
  //判断jsonSrcIn.JO01LC030是否存在HomeSystemMgt字段
  if (
    proxy.$HelperCore.boolFuncJsonExistChk(jsonSrcIn.JO01LC030, "HomeSystemMgt")
  ) {
    if (jsonSrcIn.NV04AP040[2] === 2) {
      //将被点击的栏目数据存入sessionStorage.
      window.sessionStorage.setItem(
        "jsonCurrentDataGroup",
        JSON.stringify(jsonSrcIn)
      );
      const pathInner = jsonSrcIn.JO01LC030.HomeSystemMgt.URL;
      proxy.$router.push({ path: pathInner });
    } else {
      ElMessage({ message: "暂无权限浏览此栏目", type: "info" });
    }
  } else {
    //未配置路由的项，点击过后退回CMS首页（空白）
    proxy.$router.push({ path: "/LayoutViewSystemMgt" });
  }
}
onMounted(() => {});
</script>

<style>
@import "@/VisualConfig/CSS/CtrlPanel/Schema.css";
@import "@/VisualConfig/CSS/CtrlPanel/SystemMgt.css";
</style>
