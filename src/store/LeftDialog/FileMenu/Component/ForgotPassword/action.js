import { message } from "ant-design-vue";
import LoginAccount from "@/request/Account/forgotPassword.request";
import { request2, requestHelper } from "@/helper/RequestConnector";
export default {
  doForgotPssword: request2(async context => {
    context.commit("setLoading", true);
    try {
      var respondAccount = await requestHelper(LoginAccount, {
        email: context.state.email
      });

      message.success(respondAccount.message, 2);
    } catch (error) {
      message.error(error.message, 2);
    }
    context.commit("setLoading", false);
  })
};
