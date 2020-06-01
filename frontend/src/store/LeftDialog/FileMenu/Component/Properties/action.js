import { message } from "ant-design-vue";
import UpdateProject from "@/request/Project/update.request";
import DeleteProject from "@/request/Project/delete.request";
import { request2, requestHelper } from "@/helper/RequestConnector";
import ChangeShareStatus from "@/request/Project/changeShareStatus.request";
export default {
  updateProject: request2(async context => {
    context.commit("setLoading", true);
    try {
      await requestHelper(UpdateProject, {
        id: context.rootState.Data.Project.projectDescription.id,
        title: context.state.title,
        description: context.state.description
      });
      message.success("Updated", 2);
      context.rootDispatch("Data/Project/loadProject", {
        id: context.rootState.Data.Project.projectDescription.id
      });
      context.rootCommit("LeftDialog/FileMenu/Layout/setVisible", false);
    } catch (error) {
      if (error.code === 10) {
        message.error("Login first to update this project", 2);
        context.rootCommit("LeftDialog/FileMenu/Layout/setVisible", true);
        context.rootCommit("LeftDialog/FileMenu/Layout", "login");
      } else {
        message.error(error.message, 2);
      }
    }
    context.commit("setLoading", false);
  }),
  deleteProject: request2(async context => {
    context.rootCommit("Utill/LoadingGlobal/Layout/setVisible", true);
    try {
      await requestHelper(DeleteProject, {
        id: context.rootState.Data.Project.projectDescription.id
      });
      message.success("Deleted", 2);
      context.commit("setTitle", null);
      context.commit("setDescription", null);
      context.rootCommit("Data/Project/deletedData");
      context.rootCommit("LeftDialog/FileMenu/Layout/setPanelName", "open");
      var path = "?uuid=";
      window.history.pushState("", "", path);
      document.title = "dbdesginer.id";
    } catch (error) {
      if (error.code === 10) {
        message.error("Login first to delete this project", 2);
        context.rootCommit("LeftDialog/FileMenu/Layout/setVisible", true);
        context.rootCommit("LeftDialog/FileMenu/Layout/setPanelName", "login");
      } else {
        message.error(error.message, 2);
      }
    }
    context.rootCommit("Utill/LoadingGlobal/Layout/setVisible", false);
  }),
  changeShareStatus: request2(async context => {
    context.commit("setLoading", true);
    try {
      var shareStatusRespond = await requestHelper(ChangeShareStatus, {
        id: context.rootState.Data.Project.projectDescription.id,
        share_status: context.inputs.share_status,
      });
      var payload = shareStatusRespond.payload;

      context.rootCommit("Data/Project/setProjectDescriptionShareStatus", payload.share_status);
      context.rootCommit("Data/Project/setProjectDescriptionShareLink", payload.share_link);
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
  })
};
