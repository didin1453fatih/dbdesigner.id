import Vue from "vue";
import Vuex from "vuex";
import diagram from "./diagram/module";
// import LeftPanel from "./LeftPanel/module";
// import Login from "./Login/module";
import ExportDesign from "./ExportDesign/module";
// import ListProject from "./ListProject/module";
// import NewProject from "./NewProject/module";
import GlobalLoading from "./GlobalLoading/module";
// import UpdateProject from "./UpdateProject/module";
// import Account from "./Account/module";
import Share from "./Share/module";
// import OpenSharedWithPassword from "./OpenSharedWithPassword/module";
import ExportAndShare from "./ExportAndShare/module";
import Project from "./Project/module";
import LeftDialog from "./LeftDialog/module";
import Data from "./Data/module";
import TopAlert from "./TopAlert/module";
Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true,
  modules: {
    TopAlert,
    Data,
    LeftDialog,
    Project,
    ExportAndShare,
    // OpenSharedWithPassword,
    // Login,
    Share,
    // Account,
    diagram,
    // LeftPanel,
    ExportDesign,
    // ListProject,
    // NewProject,
    GlobalLoading,
    // UpdateProject
  }
});
