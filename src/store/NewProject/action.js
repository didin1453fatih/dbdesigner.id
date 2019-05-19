import { message } from "ant-design-vue";
import NewProject from "../../request/newProject.request";
import { request2, requestHelper } from "../../helper/RequestConnector";
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
      context.commit("setLoding", false);
      context.rootDispatch("diagram/loadProject", {
        id: respond.payload.id
      });
    } catch (error) {
      message.error("Your network problem", 2); 
    }
  })
};
