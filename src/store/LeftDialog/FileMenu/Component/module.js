import NewProject from "./NewProject/module";
import Open from "./Open/module";
import Account from "./Account/module";
import Login from "./Login/module";
import Properties from "./Properties/module";
import Registration from "./Registration/module";
export default {
  namespaced: true,
  modules: {
    Account,
    NewProject,
    Open,
    Login,
    Properties,
    Registration
  }
};
