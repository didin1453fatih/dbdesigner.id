import { message } from "ant-design-vue";
import LoginAccount from "../../request/loginAccount.request";
import { request2, requestHelper } from "../../helper/RequestConnector";
export default {
  doLogin: request2(async context => {
    context.commit("setLoading", true);
    try {
      var respondAccount = await requestHelper(LoginAccount, {
        email: context.state.email,
        password: context.state.password
      });
      var payload = respondAccount.payload;
      if (respondAccount.success === true) {
        message.success("Login Success", 2);
        context.rootCommit("LeftPanel/setPanelName", "open");
        context.rootCommit("Account/setFullName", payload.complete_name);
        context.rootCommit("Account/setGender", payload.gender);
        context.rootCommit("Account/setUsername", payload.user_name);
        context.rootCommit("Account/setEmail", payload.email);
        context.rootCommit("Account/setId", payload.id);
        context.rootCommit("Account/setVerified", payload.verified);
        if (payload.verified === false) {
          context.rootCommit("Account/setVisibleAccountInformation", true);
          context.rootCommit(
            "Account/setMessageAccountInformation",
            "Your email need verify"
          );
        }else{
          context.rootCommit("Account/setVisibleAccountInformation", false);
        }
      } else {
        message.error(respondAccount.message, 2);
      }
    } catch (error) {
      message.error(error.message, 2);
    }
    context.commit("setLoading", false);
  })
};
