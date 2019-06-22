import { message } from "ant-design-vue";
import LoginAccount from "../../request/loginAccount.request";
import { request2, requestHelper } from "../../helper/RequestConnector";
export default {
  doLogin: request2(async context => {
    context.commit("setLoading", true);
    try {
      var respond = await requestHelper(LoginAccount, {
        email: context.state.email,
        password: context.state.password
      });
      if (respond.success === true) {
        message.success("Login Success", 2);
        context.rootCommit("LeftPanel/setPanelName", "open");
      } else {
        message.error(respond.message, 2);
      }
    } catch (error) {
      message.error(error.message, 2);
    }
    context.commit("setLoading", false);
  })
};
