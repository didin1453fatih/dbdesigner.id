import { message } from "ant-design-vue";
import SaveChangeShareStatus from "../../request/saveChangeShareStatus.request";
import ReadShareStatus from "../../request/readShareStatus.request";
import { request2, requestHelper } from "../../helper/RequestConnector";
export default {
  saveChangeStatus: request2(async context => {
    context.commit("setLoading", true);
    try {
      var shareStatusRespond = await requestHelper(SaveChangeShareStatus, {
        id: context.rootState.diagram.projectDescription.id,
        status: context.state.status,
        password: context.state.sharePassword
      });
      var payload = shareStatusRespond.payload;
      if (shareStatusRespond.success === true) {
        context.commit("setStatus", payload.share_status);
        context.commit("setSharePassword", payload.share_password);
        context.commit("setShareLink", payload.share_link);
      } else {
        message.error(shareStatusRespond.message, 2);
      }
      message.success("Updated", 2);
    } catch (error) {
      message.error("Your network problem", 2);
    }
    context.commit("setLoading", false);
  }),
  readShareStatus: request2(async context => {
    context.commit("setLoading", true);
    try {
      var shareStatusRespond = await requestHelper(ReadShareStatus, {
        id: context.rootState.diagram.projectDescription.id
      });
      var payload = shareStatusRespond.payload;
      if (shareStatusRespond.success === true) {
        context.commit("setStatus", payload.share_status);
        context.commit("setSharePassword", payload.share_password);
        context.commit("setShareLink", payload.share_link);
      } else {
        message.error(shareStatusRespond.message, 2);
      }
    } catch (error) {
      message.error("Your network problem", 2);
    }
    context.commit("setLoading", false);
  })
};
