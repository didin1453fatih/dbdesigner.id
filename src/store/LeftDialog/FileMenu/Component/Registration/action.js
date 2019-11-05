import { message } from "ant-design-vue";
import RegistrationRequest from "@/request/Account/registration.request";
import { request2, requestHelper } from "@/helper/RequestConnector";
export default {
  doLogin: request2(async context => {
    context.commit("SET_LOADING", true);
    try {
      var respondAccount = await requestHelper(RegistrationRequest, {
        user_name: context.state.user_name,
        complete_name: context.state.complete_name,
        gender: context.state.gender,
        email: context.state.email,
        password: context.state.password,
        password_confirm: context.state.password_confirm
      });
      var payload = respondAccount.payload;

      message.success("Registration Success", 2);
      context.rootCommit("Data/Account/setGender", payload.gender);
      context.rootCommit("Data/Account/setUsername", payload.user_name);
      context.rootCommit("Data/Account/setEmail", payload.email);
      context.rootCommit("Data/Account/setId", payload.id);
      context.rootCommit("Data/Account/setVerified", payload.verified);
      if (context.rootState.RightDialog.Fork.Layout.visible === false) {
        context.rootCommit("LeftDialog/FileMenu/Layout/setPanelName", "open");
      } else {
        context.rootCommit("LeftDialog/FileMenu/Layout/setVisible", false);
        context.rootDispatch("RightDialog/Fork/Layout/readOriginInfo")
      }
      if (payload.verified === false) {
        context.rootCommit("TopAlert/Information/Layout/setVisible", true);
        context.rootCommit(
          "TopAlert/Information/Layout/setMessage",
          "Your email need verify"
        );
      } else {
        context.rootCommit("TopAlert/Information/Layout/setVisible", false);
      }
    } catch (error) {
      message.error(error.message, 2);
    }
    context.commit("SET_LOADING", false);
  })
};
