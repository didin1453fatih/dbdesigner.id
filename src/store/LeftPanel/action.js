import GetListProject from "../../request/listProject.request";
import { request2, requestHelper } from "../../helper/RequestConnector";
export default {
  getData: request2(async context => {
    var respond = await requestHelper(GetListProject, {
      page: "context.inputs.page",
      page_size: "context.inputs.page_size",
      kode_lab: "context.inputs.kode_lab",
      role_access: "context.inputs.role_access"
    });
    context.commit("updateData", respond.payload);
    context.commit("page_size", respond.properties.page_size);
    context.commit("total", respond.properties.total);
    context.commit("page", respond.properties.page);

  })
};
