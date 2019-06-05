import Vue from "vue";
import Vuex from "vuex";
import diagram from "./diagram/module";
import LeftPanel from "./LeftPanel/module";
import ExportDesign from "./ExportDesign/module";
import ListProject from "./ListProject/module";
import NewProject from "./NewProject/module";
import GlobalLoading from "./GlobalLoading/module";
import UpdateProject from "./UpdateProject/module";
import Account from "./Account/module";
Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true,
  modules: {
    Account,
    diagram,
    LeftPanel,
    ExportDesign,
    ListProject,
    NewProject,
    GlobalLoading,
    UpdateProject
  }
});
