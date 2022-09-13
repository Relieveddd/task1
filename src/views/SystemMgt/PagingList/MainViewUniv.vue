<template>
  <div class="ProcUnitHorizMenu50">
    <div class="Inner50">
      <input
        type="text"
        autocomplete="nope"
        class="proc-unit-textbox-50 Inner50"
        placeholder="Search"
        v-model="keyword"
      />
    </div>
  </div>

  <table class="ProcUnitDataAdapter50">
    <tr class="inner-title-50">
      <th>编号</th>
      <th>标题备注</th>
      <th>创建日期</th>
      <th>修改日期</th>
      <th>AL</th>
      <th>TE</th>
      <th>操作</th>
    </tr>
    <tr v-for="jsonItemLoop in jsonArrayMain" :key="jsonItemLoop.StrPK010">
      <td>{{ jsonItemLoop.DF03000 }}</td>
      <td>{{ jsonItemLoop.TitleMark }}</td>
      <td>{{ jsonItemLoop.StrCT050 }}</td>
      <td>{{ jsonItemLoop.StrMT050 }}</td>
      <td>{{ jsonItemLoop.NumAL040 }}</td>
      <td>{{ jsonItemLoop.NumTE030 }}</td>
      <td class="InnerCP0250 proc-unit-char10">
        <a
          href="javascript:void(0);"
          @click="handleTableDetail(jsonItemLoop.StrPK010)"
          >编辑</a
        >
        <a href="javascript:void(0);">删除</a>
      </td>
    </tr>
  </table>
  <div class="auxi-clear"></div>
  <!-- TODO: 在此使用 el-pagination 渲染分页组件. -->
  <el-pagination
    background
    layout="prev, pager, next"
    :current-page="jsonPaging.PageIndex"
    :total="jsonPaging.NumRowQuantity"
    :page-size="jsonPaging.PageSize"
    @current-change="setFuncPaging"
  />

  <div class="auxi-clear"></div>
  <div class="ProcUnitHorizBar3W AM04Bottom3R">
    <div></div>
    <div>
      <a class="InnerBtn3R" title="新建内容">新建文章</a>
    </div>
  </div>
</template>
<script setup>
import { onMounted, watch, ref, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
let jsonPaging = ref({
  NumRowQuantity: 0,
  PageSize: 15,
  PageIndex: 1,
});
//创建防抖搜索需要用的变量
let keyword = ref("");

let jsonArrayMain = ref([]);
function setFuncPaging(_numPageIndex) {
  jsonPaging.value.PageIndex = _numPageIndex;
  jsonFuncMain();
}
const jsonCurrentDataGroup = JSON.parse(
  window.sessionStorage.getItem("jsonCurrentDataGroup")
);
//工具函数用于请求文章列表
function jsonFuncMain() {
  //创建变量用于接收响应的数据
  let reqParam = {
    CurrentDataGroup: jsonCurrentDataGroup.NumDataGroup,
    PageIndex: jsonPaging.value.PageIndex,
    PageSize: jsonPaging.value.PageSize,
    Keyword: "",
  };
  if (keyword.value.length > 0) {
    reqParam.Keyword = keyword.value;
  }
  //CurrentDtaGroup:栏目号/  PageIndex：当前页数 /PageSize:当前页数
  proxy.$HelperAxios
    .post("/DataAccessWithGroup/QueryPagingList", reqParam)
    .then((responseResult) => {
      // console.log(responseResult.Payload.NumRowQuantity);
      //获取栏目数据，赋值给el-tree
      //文库el-pagnation组件提供总数居条数
      jsonPaging.value.NumRowQuantity = responseResult.Payload.NumRowQuantity;
      //渲染在当前页码下接口返回的数据列表
      jsonArrayMain.value = responseResult.Payload.DataList;
      // console.log(jsonArrayMain.value);
    });
}

jsonFuncMain();
//防抖函数
function handleDebounce(funcFollowIn, numDelayIn) {
  let timerInner = null;
  return (...args) => {
    if (timerInner) clearTimeout(timerInner);
    timerInner = setTimeout(() => {
      funcFollowIn.apply(this, args);
    }, numDelayIn);
  };
}
//实例化防抖函数
const handleSearch = handleDebounce((valIn) => {
  //再次执行
  jsonFuncMain();
}, 1000);
//将搜索功能放在onMounted生命周期内
onMounted(() => {
  watch(
    () => keyword.value,
    (valNew, valOld) => {
      //重置分页器
      jsonPaging.value.PageIndex = 1;
      jsonPaging.value.NumRowQuantity = 0;
      handleSearch(valNew);
    }
  );
});
// 点击编辑按钮跳转到文章详情页
function handleTableDetail(strParmasKeyIn) {
  proxy.$router.push({
    path: "/LayoutViewSystemMgt/DetailedDataTextarea",
    query: { PrimaryKey: strParmasKeyIn },
  });
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input.proc-unit-textbox-50 {
  margin-left: 20px;
}
</style>
