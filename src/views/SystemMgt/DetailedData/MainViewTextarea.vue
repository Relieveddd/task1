<template>
  <div class="proc-unit-form-50">
    <span class="inner-title-50 proc-unit-char-02">Mark Title</span>
    <!-- <input type="text" autocomplete="nope" class="proc-unit-textbox-50" placeholder="Mark Title" style="width: 800px" v-model="jsonMainEdited.TitleMark" /> -->
  </div>
  <div class="auxi-clear"></div>
  <div class="proc-unit-form-50">
    <span class="inner-title-50 proc-unit-char-02">Formal Title</span>
    <!-- <input type="text" autocomplete="nope" class="proc-unit-textbox-50" placeholder="Formal Title" style="width: 800px" v-model="jsonMainEdited.TitleFormal" /> -->
  </div>
  <div class="auxi-clear"></div>
  <div class="proc-unit-form-50">
    <span class="inner-title-50 proc-unit-char-02">Short Title</span>
    <!-- <input type="text" autocomplete="nope" class="proc-unit-textbox-50" placeholder="Short Title" style="width: 800px" v-model="jsonMainEdited.TitleShort" /> -->
  </div>
  <div class="auxi-clear"></div>
  <div class="proc-unit-form-52">
    <span class="inner-title-50 proc-unit-char-02">导读</span>
    <!-- <textarea class="proc-unit-textbox-50" style="width: 800px; height: 80px" v-model="jsonMainEdited.Intro"></textarea> -->
  </div>
  <div class="auxi-clear"></div>
  <div class="auxi-clear"></div>
  <div class="proc-unit-form-50">
    <span class="inner-title-50 proc-unit-char-02">Take Effect</span>
    <!-- TODO 在此使用 el-select 渲染下拉选项. -->
  </div>
  <div class="auxi-clear"></div>
  <div class="proc-unit-form-50">
    <span class="inner-title-50 proc-unit-char-02">Keyword</span>
    <!-- <input type="text" autocomplete="nope" class="proc-unit-textbox-50" placeholder="Keyword" style="width: 800px" v-model="jsonMainEdited.Keyword" /> -->
  </div>
  <div class="auxi-clear"></div>
  <div class="proc-unit-form-50">
    <span class="inner-title-50 proc-unit-char-02">Source</span>
    <!-- <input type="text" autocomplete="nope" class="proc-unit-textbox-50" placeholder="Source" v-model="jsonMainEdited.StrSource" /> -->
  </div>
  <div class="auxi-clear"></div>
  <div class="ProcUnitHorizBar3W AM04Bottom3R">
    <div>
      <a class="InnerBtn3R" @click="handleReturnDataList">返回</a>
    </div>
    <div>
      <a class="InnerBtn3R" title="重置">重置</a>
      <a class="InnerBtn3R" ei020="FileList" eg010="1" title="文件管理">文件管理</a>
      <a class="InnerBtn3R" title="提交">提交</a>
    </div>
  </div>
</template>
<script setup>
onBeforeMount(() => {
});
onMounted(() => {
});
onActivated(() => {
});
</script>

<style scoped>
</style>
