import { message } from "ant-design-vue";
import GetListProject from "../../request/listProject.request";
import { request2, requestHelper } from "../../helper/RequestConnector";
export default {
  getData: request2(async context => {
    context.commit("setLoading", true);
    try {
      var respond = await requestHelper(GetListProject, {
        page: 1,
        page_size: 10,
        title: context.inputs.keyword
      });
      context.commit("setData", respond.payload);
    } catch (error) {
      message.error("Your network problem", 2);
    }
    context.commit("setLoading", false);
  })
};
