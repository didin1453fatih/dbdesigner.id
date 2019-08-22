import { message } from "ant-design-vue";
import LoginAccount from "@/request/loginAccount.request";
import { request2, requestHelper } from "@/helper/RequestConnector";
export default {
  doLogin: request2(async context => {
    context.commit("setLoading", true);
    try {
      var respondAccount = await requestHelper(LoginAccount, {
        email: context.state.email,
        password: context.state.password
      });
      var payload = respondAccount.payload;

      message.success("Login Success", 2);
      context.rootCommit("LeftDialog/FileMenu/Layout/setPanelName", "open");
      context.rootCommit("Data/Account/setGender", payload.gender);
      context.rootCommit("Data/Account/setUsername", payload.user_name);
      context.rootCommit("Data/Account/setEmail", payload.email);
      context.rootCommit("Data/Account/setId", payload.id);
      context.rootCommit("Data/Account/setVerified", payload.verified);
      if (payload.verified === false) {
        context.rootCommit("TopAlert/setVisible", true);
        context.rootCommit("TopAlert/setMessage", "Your email need verify");
      } else {
        context.rootCommit("TopAlert/setVisible", false);
      }
    } catch (error) {
      message.error(error.message, 2);
    }
    context.commit("setLoading", false);
  })
};
