import { createStore } from "vuex";
export default createStore({
  modules: {
    dataGroup: {
      state: {
        jsonCurrentSystemMgt: "",
      },

      getters: {
        getterSystemMgt: (state) => state.jsonCurrentSystemMgt,
      },

      mutations: {
        setValMutationSystemMgt: (state, val) => {
          state.jsonCurrentSystemMgt = val;
        },
      },

      actions: {
        // 此函数通过 commit 一个 mutations (setValMutationSystemMgt) 改变了一个 state (jsonCurrentSystemMgt) 的值.
        async setValFuncSystemMgt({ state, commit }, jsonCurrentIn) {
          commit("setValMutationSystemMgt", jsonCurrentIn);
        },
      },
    },
  },
});
