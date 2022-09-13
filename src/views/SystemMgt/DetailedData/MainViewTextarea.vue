<template>
  文章详情页
  <div class="proc-unit-form-50">
    <span class="inner-title-50 proc-unit-char-02">Mark Title</span>
    <input
      type="text"
      autocomplete="nope"
      class="proc-unit-textbox-50"
      placeholder="Mark Title"
      style="width: 800px"
      v-model="jsonMainEdited.TitleMark"
    />
  </div>
  <div class="auxi-clear"></div>
  <div class="proc-unit-form-50">
    <span class="inner-title-50 proc-unit-char-02">Formal Title</span>
    <input
      type="text"
      autocomplete="nope"
      class="proc-unit-textbox-50"
      placeholder="Formal Title"
      style="width: 800px"
      v-model="jsonMainEdited.TitleFormal"
    />
  </div>
  <div class="auxi-clear"></div>
  <div class="proc-unit-form-50">
    <span class="inner-title-50 proc-unit-char-02">Short Title</span>
    <input
      type="text"
      autocomplete="nope"
      class="proc-unit-textbox-50"
      placeholder="Short Title"
      style="width: 800px"
      v-model="jsonMainEdited.TitleShort"
    />
  </div>
  <div class="auxi-clear"></div>
  <div class="proc-unit-form-52">
    <span class="inner-title-50 proc-unit-char-02">导读</span>
    <textarea
      class="proc-unit-textbox-50"
      style="width: 800px; height: 80px"
      v-model="jsonMainEdited.Intro"
    ></textarea>
  </div>
  <div class="auxi-clear"></div>
  <div class="auxi-clear"></div>
  <div class="proc-unit-form-50">
    <span class="inner-title-50 proc-unit-char-02">Take Effect</span>
    <!-- TODO 在此/使用 el-select 渲染下拉选项. -->
    <el-select
      v-model="jsonMainEdited.NumTE030"
      class="m-2"
      placeholder="Select"
      size="large"
    >
      <el-option
        v-for="item in jsonArrayoptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
  <div class="auxi-clear"></div>
  <div class="proc-unit-form-50">
    <span class="inner-title-50 proc-unit-char-02">Keyword</span>
    <input
      type="text"
      autocomplete="nope"
      class="proc-unit-textbox-50"
      placeholder="Keyword"
      style="width: 800px"
      v-model="jsonMainEdited.Keyword"
    />
  </div>
  <div class="auxi-clear"></div>
  <div class="proc-unit-form-50">
    <span class="inner-title-50 proc-unit-char-02">Source</span>
    <input
      type="text"
      autocomplete="nope"
      class="proc-unit-textbox-50"
      placeholder="Source"
      v-model="jsonMainEdited.StrSource"
    />
  </div>
  <div class="auxi-clear"></div>
  <div class="ProcUnitHorizBar3W AM04Bottom3R">
    <div>
      <a class="InnerBtn3R" @click="handleReturnDataList">返回</a>
    </div>
    <div>
      <a class="InnerBtn3R" title="重置">重置</a>
      <a class="InnerBtn3R" ei020="FileList" eg010="1" title="文件管理"
        >文件管理</a
      >
      <a class="InnerBtn3R" title="提交" @click="reqFuncMain">提交</a>
    </div>
  </div>
</template>
<script setup>
import { ref, getCurrentInstance, watch, onMounted, onActivated } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
const { proxy } = getCurrentInstance();
//从sessionStorage获取栏目数据,绑定到组件上
const jsonCurrntDataGroup = JSON.parse(
  window.sessionStorage.getItem("jsonCurrentDataGroup")
);
let jsonMainEdited = ref({});
//申请变量保存Param请求，之后proxy请求数据的时候直接使用变量名
let reqParam = {
  CurrentDataGroup: jsonCurrntDataGroup.NumDataGroup,
  StrPrimaryKey: proxy.$route.query.PrimaryKey,
};
// 发送请求数据
proxy.$HelperAxios
  .post("/DataAccessWithGroup/DetailedDataRow", reqParam)
  .then((responseResult) => {
    jsonMainEdited.value = responseResult.Payload;
  });

// 工具函数---点击事件提交修改文章请求
function reqFuncMain() {
  let reqParam = jsonMainEdited.value;
  reqParam.CurrentDataGroup = jsonCurrntDataGroup.NumDataGroup;
  reqParam.StrPrimaryKey = proxy.$route.query.PrimaryKey;
  // 发送请求数据
  proxy.$HelperAxios
    .post("/DataAccessWithGroup/UpdateDataRow", reqParam)
    .then((responseResult) => {
      ElMessage({
        type: responseResult.CT040,
        message: "文章修改完成",
      });
    });
}
//el-option是否生效选择数据的数组
const jsonArrayoptions = [
  {
    value: 0,
    label: "失效",
  },
  {
    value: 1,
    label: "生效",
  },
];
onMounted(() => {});
onActivated(() => {});
</script>

<style scoped></style>
