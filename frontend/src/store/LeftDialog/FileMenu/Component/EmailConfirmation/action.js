import { message } from "ant-design-vue";
import EmailLinkConfirmationRequest from "@/request/Auth/emailLinkConfirmation.request";
import { request2, requestHelper } from "@/helper/RequestConnector";
import Authorization from "@/helper/AuthorizationToken"
export default {
  emailConfirmation: request2(async context => {
    context.commit("SET_LOADING", true);
    try {
      var respondMailConfirmation = await requestHelper(
        EmailLinkConfirmationRequest,
        {
          token: context.state.token
        }
      );
      Authorization.setToken(respondMailConfirmation.payload.token)
      message.success(respondMailConfirmation.message, 2);
      var action = "nothing";
      switch (respondMailConfirmation.payload.action) {
        case "open-project":
          await context.rootDispatch("Data/Account/globalReadAccount");
          action = "open";
          break;
        case "re-login":
          action = "login";
          break;
      }
      window.history.pushState("", "", `?action=${action}`);
      setTimeout(() => {
        context.rootCommit("LeftDialog/FileMenu/Layout/setPanelName", action);
      }, 1000);
    } catch (error) {
      window.history.pushState("", "", `?action=nothing&message=${error.message}`);
      message.error(error.message, 2);
      // If failure about auth need to login
      if (error.code === 10) {
        context.rootCommit("LeftDialog/FileMenu/Layout/setPanelName", "login");
      }
    }
    context.commit("SET_LOADING", false);
  })
};
