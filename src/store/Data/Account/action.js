import { message } from "ant-design-vue";
import ReadAccount from "@/request/readAccount.request";
import { request2, requestHelper } from "@/helper/RequestConnector";
export default {
  globalReadAccount: request2(async context => {
    context.rootCommit("GlobalLoading/setVisible", true);
    try {
      var respondAccount = await requestHelper(ReadAccount);
      var payload = respondAccount.payload;
      context.rootCommit("Data/Account/setFullName", payload.complete_name);
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
      if (error.code === 10) {
        if (context.inputs.uuid === null) {
          message.error("Login first to start design", 3);
          context.rootCommit("LeftDialog/FileMenu/Layout/setVisible", true);
          context.rootCommit(
            "LeftDialog/FileMenu/Layout/setPanelName",
            "login"
          );
        } else {
          message.error("You are guest", 2);
        }
      } else {
        message.error(error.message, 2);
      }
      context.rootCommit("TopAlert/setVisible", true);
      context.rootCommit("TopAlert/setMessage", "You are guest");
    }
    context.rootCommit("GlobalLoading/setVisible", false);
  }),
};
