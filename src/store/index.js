import Vue from "vue";
import Vuex from "vuex";
import diagram from "./diagram/module"
import LeftPanel from "./LeftPanel/module"
import ExportDesign from "./ExportDesign/module"
import ListProject from "./ListProject/module"
import NewProject from "./NewProject/module"
Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true,
  modules: {
    diagram,
    LeftPanel,
    ExportDesign,
    ListProject,
    NewProject
  }
});
