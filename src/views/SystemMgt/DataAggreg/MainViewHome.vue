<template>
  <div>我怎么了</div>
</template>
<script>
import { onBeforeMount, onMounted, getCurrentInstance, reactive } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
export default {
  name: "MainViewSM03DA03Home",
  components: {},
  props: {
    //msg: String
  },
  data() {
    return {};
  },
  setup(props, ctx) {
    const { proxy, data } = getCurrentInstance();
    onBeforeMount(() => {});
    onMounted(() => {});
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
