import { message } from "ant-design-vue";
import ReadOriginInfo from "@/request/Forker/readOriginInfo.request";
import Execute from "@/request/Forker/execute.request";
import { request2, requestHelper } from "@/helper/RequestConnector";
import moment from "moment";
export default {
  readOriginInfo: request2(async context => {
    try {
      context.commit("SET_LOADING_READ_INFO", true);
      var origin_uuid = context.rootState.Data.Project.projectDescription.uuid;
      var respond = await requestHelper(ReadOriginInfo, {
        uuid: origin_uuid
      });
      var payload = respond.payload;
      context.commit("SET_ORIGIN_TITLE", payload.title);
      context.commit("SET_ORIGIN_OWNER", payload.owner);
      context.commit("SET_ORIGIN_SHARE_STATUS", payload.share_status);
      context.commit("SET_ORIGIN_DESCRIPTION", payload.description);

      context.commit("SET_FORKER_TITLE", payload.title + "@" + payload.owner);
      context.commit(
        "SET_FORKER_DESCRIPTION",
        " Fork from " +
          payload.title +
          "@" +
          payload.owner +
          "\r\n" +
          moment().format("YYYY-MM-DD HH:mm:ss") +
          "\r\n--------------------------\r\n" +
          payload.description
      );
      context.commit("SET_FORKER_SHARE_STATUS", 0);
    } catch (error) {
      if (error.code === 10) {
        message.error("Login first to open project", 2);
        context.rootCommit("LeftDialog/FileMenu/Layout/setVisible", true);
        context.rootCommit("LeftDialog/FileMenu/Layout/setPanelName", "login");
      } else {
        message.error(error.message, 2);
      }
    }
    context.commit("SET_LOADING_READ_INFO", false);
  }),
  execute: request2(async context => {
    try {
      context.commit("SET_LOADING_EXECUTE", true);
      var origin_uuid = context.rootState.Data.Project.projectDescription.uuid;
      var respond = await requestHelper(Execute, {
        origin_uuid: origin_uuid,
        forker_title: context.state.forker_title,
        forker_description: context.state.forker_description,
        forker_share_status: context.state.forker_share_status
      });
      await context.rootDispatch("Data/Project/loadProject", {
        uuid: respond.payload.uuid
      });
    } catch (error) {
      if (error.code === 10) {
        message.error("Login first to open project", 2);
        context.rootCommit("LeftDialog/FileMenu/Layout/setVisible", true);
        context.rootCommit("LeftDialog/FileMenu/Layout/setPanelName", "login");
      } else {
        message.error(error.message, 2);
      }
    }
    setTimeout(() => {
      context.commit("SET_LOADING_EXECUTE", false);
    }, 1000);
  })
};
