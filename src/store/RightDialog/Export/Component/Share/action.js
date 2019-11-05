import { message } from "ant-design-vue";
import SaveChangeShareStatus from "@/request/saveChangeShareStatus.request";
import ReadShareStatus from "@/request/readShareStatus.request";
import { request2, requestHelper } from "@/helper/RequestConnector";
export default {
  saveChangeStatus: request2(async context => {
    context.commit("setLoading", true);
    try {
      var shareStatusRespond = await requestHelper(SaveChangeShareStatus, {
        id: context.rootState.Data.Project.projectDescription.id,
        status: context.state.status,
        password: context.state.sharePassword
      });
      var payload = shareStatusRespond.payload;

      context.commit("setStatus", payload.share_status);
      context.commit("setSharePassword", payload.share_password);
      context.commit("setShareLink", payload.share_link);
      message.success("Updated", 2);
    } catch (error) {
      if (error.code === 10) {
        message.error("Login first to save share status", 2);
        context.rootCommit("LeftDialog/FileMenu/Layout/setVisible", true);
        context.rootCommit("LeftDialog/FileMenu/Layout/setPanelName", "login");
      } else {
        message.error(error.message, 2);
      }
    }
    context.commit("setLoading", false);
  }),
  readShareStatus: request2(async context => {
    context.commit("setLoading", true);
    try {
      var shareStatusRespond = await requestHelper(ReadShareStatus, {
        id: context.rootState.Data.Project.projectDescription.id
      });
      var payload = shareStatusRespond.payload;
      context.commit("setStatus", payload.share_status);
      context.commit("setSharePassword", payload.share_password);
      context.commit("setShareLink", payload.share_link);
    } catch (error) {
      if (error.code === 10) {
        message.error("Login first to read share status", 2);
        context.rootCommit("LeftDialog/FileMenu/Layout/setVisible", true);
        context.rootCommit("LeftDialog/FileMenu/Layout/setPanelName", "login");
      } else {
        message.error(error.message, 2);
      }
    }
    context.commit("setLoading", false);
  })
};
