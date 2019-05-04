import Vue from "vue";
import Vuex from "vuex";
import diagram from "./diagram/module"
import LeftPanel from "./LeftPanel/module"
Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true,
  modules: {
    diagram,
    LeftPanel
  }
});
