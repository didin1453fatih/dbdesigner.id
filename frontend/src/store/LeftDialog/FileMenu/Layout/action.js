import { message } from "ant-design-vue";
import Logout from "@/request/Auth/logout.request";
import { request2, requestHelper } from "@/helper/RequestConnector";
export default {
  logoutAccount: request2(async context => {
    context.rootCommit("Utill/LoadingGlobal/Layout/setVisible", true);
    try {
      await requestHelper(Logout);
      message.success("Logout", 2);
      context.rootCommit("Utill/LoadingGlobal/Layout/setVisible", false);
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    } catch (error) {
      if (error.code === 10) {
        message.error("Login first to logout", 2);
        context.rootCommit("LeftDialog/FileMenu/Layout/setVisible", true);
        context.rootCommit("LeftDialog/FileMenu/Layout/setPanelName", "login");
      } else {
        message.error(error.message, 2);
      }
      context.rootCommit("Utill/LoadingGlobal/Layout/setVisible", false);
    }
  })
};
