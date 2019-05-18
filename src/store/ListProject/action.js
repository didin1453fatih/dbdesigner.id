import GetListProject from "../../request/listProject.request";
import { request2, requestHelper } from "../../helper/RequestConnector";
export default {
  getData: request2(async context => {
    var respond = await requestHelper(GetListProject, {
      page: 1,
      page_size: 10,
      title: context.state.keyword
    });
    context.commit("setData", respond.payload);
  })
};
