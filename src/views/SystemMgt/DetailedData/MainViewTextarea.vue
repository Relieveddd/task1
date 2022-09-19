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
      <a class="InnerBtn3R" title="重置" @click="funcReset">重置</a>
      <a class="InnerBtn3R" ei020="FileList" eg010="1" title="文件管理"
        >文件管理</a
      >
      <a class="InnerBtn3R" title="提交" @click="reqFuncMain">提交</a>
    </div>
  </div>
  <!-- el 上传图片 -->
  <!-- <div>
    <el-upload
      ref="uploadRef"
      action="https://wh011024.mysh360.com/fileServSystemMgt/fileUpload"
      :auto-upload="false"
      :data="reqParamPic"
    >
      <template #trigger>
        <el-button type="primary">select file</el-button>
      </template>

      <el-button class="ml-3" type="success" @click="submitUpload">
        upload to server
      </el-button>
    </el-upload>
  </div> -->
  <!-- fetch方式上传 -->
  <input type="file" id="fileUpload" />
  <button @click="handleFileUploadFetch">上传图片到服务器</button>
  <div id="picbind"><img src="{{ picUpload }}" /></div>
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
//设置新变量用于保存发送了怕请求之后的数据
let strReset = [];
// 发送请求数据
proxy.$HelperAxios
  .post("/DataAccessWithGroup/DetailedDataRow", reqParam)
  .then((responseResult) => {
    jsonMainEdited.value = responseResult.Payload;
    strReset = JSON.parse(JSON.stringify(responseResult.Payload));
  });
//点击重置恢复之前的数据状态
function funcReset() {
  jsonMainEdited.value = JSON.parse(JSON.stringify(strReset));
}
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
// 通过el组件上传图片
// const uploadRef = ref(null);
// const reqParamPic = {
//   CurrentDataGroup: 50012,
//   StrPrimaryKey:
//     "eyJERjAzMDAwIjoiMTU5NDg2NzU5NjUwNzY0ODAiLCJERjAzNDYwIjoiZW4ifQFillFill",
//   FileType: "ImageFile",
//   AccessToken:
//     "eyJhbGdvIjogIkhTMjU2IiwidHlwIjogIkpXVCJ9.eyJEVDA0MCI6IjIwMjItMDgtMTYgMDY6Mjg6MDAiLCJPVTAxMCI6IjE1NzY0OTc0NjI0MTYyODE2IiwiU3RyU00wMjAiOiJTZXNpIn0%3D.KjQUCZSJOP43Ks7zZMDctQJeV5x8FhseuMn25TEcQIE%3D",
// };
// const submitUpload = () => {
//   uploadRef.value.submit();
// };
// 设置变量接收传上去的照片
let picUpload = ref();
//fetch方式上传图片
function handleFileUploadFetch() {
  // 1.获取accessToken
  const accessToken = window.localStorage.getItem("AccessToken");
  //2.获取上传的文件
  const fileUploadInner = document.querySelector("#fileUpload");
  // console.log(fileUploadInner.files[0]);
  // 3.声明formdata拿file中的图片
  const formData = new FormData();
  picUpload.value = fileUploadInner.files[0];
  console.log(picUpload.value);
  formData.append("file", fileUploadInner.files[0]);
  formData.append("CurrentDataGroup", jsonCurrntDataGroup.NumDataGroup);
  formData.append("StrPrimaryKey", proxy.$route.query.PrimaryKey);
  formData.append("FileType", "ImageFile");
  formData.append("AccessToken", accessToken);
  fetch(" http://wh011024.mysh360.com/FileServSystemMgt/FileUpload", {
    method: "POST",
    body: formData,
  })
    .then((responseResult) => {
      if (responseResult.ok) {
        return responseResult.text();
      } else {
        ElMessage({
          type: "error",
          message: "接口请求失败.",
        });
        return "FailResponse";
      }
    })
    .then((strResult) => {
      if (strResult !== "FailResponse") {
        // 将JSON字符串转化成JSON对象
        let jsonResult = JSON.parse(strResult);
        if (jsonResult.SC120 === "SuccLocal") {
          ElMessage({
            type: jsonResult.CT040,
            message: jsonResult.Msg,
          });
          // 如果传入图片格式不是.jpg给予提示格式错误。当前只能上传.jpg格式的图片
        } else if (jsonResult.SC120 === "ForbidFT010") {
          ElMessage({
            type: jsonResult.CT040,
            message: "不支持当前图片类型，请上传.jpg图片",
          });
        }
      }
    });
}

onMounted(() => {});
onActivated(() => {});
</script>

<style scoped></style>
