import NewProject from "./NewProject/module";
import Open from "./Open/module";
import Account from "./Account/module";
import Login from "./Login/module";
import Properties from "./Properties/module";
import Registration from "./Registration/module";
import ForgotPassword from "./ForgotPassword/module"
import ResetPassword from "./ResetPassword/module"
import EmailConfirmation from "./EmailConfirmation/module"
export default {
  namespaced: true,
  modules: {
    Account,
    NewProject,
    Open,
    Login,
    Properties,
    Registration,
    ForgotPassword,
    ResetPassword,
    EmailConfirmation
  }
};
