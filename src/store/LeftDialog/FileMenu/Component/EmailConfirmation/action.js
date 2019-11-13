import { message } from "ant-design-vue";
import EmailConfirmationRequest from "@/request/Account/emailConfirmation.request";
import { request2, requestHelper } from "@/helper/RequestConnector";
export default {
  emailConfirmation: request2(async context => {
    context.commit("SET_LOADING", true);
    try {
      var respondMailConfirmation = await requestHelper(
        EmailConfirmationRequest,
        {
          token: context.state.token
        }
      );

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
      setTimeout(() => {
        context.rootCommit("LeftDialog/FileMenu/Layout/setPanelName", action);
      }, 1000);
    } catch (error) {
      message.error(error.message, 2);
    }
    context.commit("SET_LOADING", false);
  })
};
