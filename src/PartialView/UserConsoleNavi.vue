<template>
  <div class="ProcUnitUserConsoleNavi">
    <span class="InnerShowText">{{ showText }}</span>
    <a href="javascript:void(0);" @click="handleLogout">退出</a>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, getCurrentInstance, ref } from "vue";
// import { ElDropdown, ElDropdownItem, ElDropdownMenu } from "element-plus";
const { proxy, data } = getCurrentInstance();
function handleLogout() {
  localStorage.removeItem("AccessToken");
  sessionStorage.removeItem("jsonArrayUserGroup");
  sessionStorage.removeItem("jsonDataGroupSystemMgt");
  proxy.$HelperUserAccount.handlerLogin();
}
let showText = ref("");
const accessToken = localStorage.getItem("AccessToken");
if (accessToken === null) {
} else {
  const jsonUserInfo = proxy.$HelperCore.jsonFuncTokenPayload(accessToken);
  if (proxy.$HelperCore.boolFuncJsonExistChk(jsonUserInfo, "Nickname")) {
    showText.value = jsonUserInfo.Nickname;
  } else if (proxy.$HelperCore.boolFuncJsonExistChk(jsonUserInfo, "Username")) {
    showText.value = jsonUserInfo.Username;
  } else {
    showText.value = jsonUserInfo.OU010;
  }
}
</script>
<style scoped></style>
