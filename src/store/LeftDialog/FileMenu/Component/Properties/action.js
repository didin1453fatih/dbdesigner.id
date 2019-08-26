import { message } from "ant-design-vue";
import UpdateProject from "@/request/updateProject.request";
import DeleteProject from "@/request/deleteProject.request";
import { request2, requestHelper } from "@/helper/RequestConnector";
export default {
  updateProject: request2(async context => {
    context.commit("setLoding", true);
    try {
      await requestHelper(UpdateProject, {
        id: context.rootState.diagram.projectDescription.id,
        title: context.state.title,
        description: context.state.description
      });
      message.success("Updated", 2);
      context.rootDispatch("Data/Project/loadProject", {
        id: context.rootState.diagram.projectDescription.id
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
    context.commit("setLoding", false);
  }),
  deleteProject: request2(async context => {
    context.rootCommit("Utill/LoadingGlobal/Layout/setVisible", true);
    try {
      await requestHelper(DeleteProject, {
        id: context.rootState.diagram.projectDescription.id
      });
      message.success("Deleted", 2);
      context.commit("setTitle", null);
      context.commit("setDescription", null);
      context.rootCommit("Data/Project/deletedData");
    } catch (error) {
      if (error.code === 10) {
        message.error("Login first to delete this project", 2);
        context.rootCommit("LeftPanel/setVisible", true);
        context.rootCommit("LeftPanel/setPanelName", "login");
      } else {
        message.error(error.message, 2);
      }
    }
    context.rootCommit("Utill/LoadingGlobal/Layout/setVisible", false);
  })
};
