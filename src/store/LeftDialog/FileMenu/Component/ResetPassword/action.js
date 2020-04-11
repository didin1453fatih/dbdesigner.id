import { message } from "ant-design-vue";
import ResetPasswordRequest from "@/request/Account/resetPassword.request";
import { request2, requestHelper } from "@/helper/RequestConnector";
export default {
  doResetPassword: request2(async context => {
    context.commit("setLoading", true);
    try {
      var respondReset = await requestHelper(ResetPasswordRequest, {
        token: context.state.token,
        password: context.state.password,
        password_verify: context.state.password_verify
      });

      message.success(respondReset.message, 2);
      setTimeout(() => {
        context.rootCommit("LeftDialog/FileMenu/Layout/setPanelName", "login");
      }, 1000);
    } catch (error) {
      message.error(error.message, 2);
    }
    context.commit("setLoading", false);
  })
};
