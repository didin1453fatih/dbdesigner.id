import { message } from "ant-design-vue";
import NewProject from "@/request/newProject.request";
import { request2, requestHelper } from "@/helper/RequestConnector";
export default {
  createProject: request2(async context => {
    context.commit("setLoding", true);
    try {
      var respond = await requestHelper(NewProject, {
        title: context.state.title,
        description: context.state.description
      });
      message.success("Created", 2);
      context.commit("setTitle", "");
      context.commit("setDescription", "");
      context.rootDispatch("Data/Project/loadProject", {
        uuid: respond.payload.uuid
      });
    } catch (error) {
      if (error.code === 10) {
        message.error("Login first to make new project", 2);
        context.rootCommit("LeftDialog/FileMenu/Layout/setVisible", true);
        context.rootCommit("LeftDialog/FileMenu/Layout/setPanelName", "login");
      } else {
        message.error(error.message, 2);
      }
    }
    context.commit("setLoding", false);
  })
};
