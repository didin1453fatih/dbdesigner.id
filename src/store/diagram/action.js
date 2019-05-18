import LoadProject from "../../request/readOneProject.request";
import SaveProject from "../../request/saveProject.request";
import { request2, requestHelper } from "../../helper/RequestConnector";
export default {
  loadProject: request2(async context => {
    var respond = await requestHelper(LoadProject, {
      id: context.inputs.id
    });
    var dataJSON = JSON.parse(respond.payload.data_design);
    if (dataJSON !== null) {
      if (dataJSON.connector !== undefined && dataJSON.connector !== null) {
        context.commit("setConnector", dataJSON.connector);
      } else {
        context.commit("setConnector", {});
      }
      if (dataJSON.diagram !== undefined && dataJSON.diagram !== null) {
        context.commit("setDiagram", dataJSON.diagram);
      } else {
        context.commit("setDiagram", {});
      }
    } else {
      context.commit("setConnector", {});
      context.commit("setDiagram", {});
    }

    // // eslint-disable-next-line
    // console.log(JSON.stringify(dataJSON.diagram));
    context.commit("setProjectDescription", respond.payload);
  }),
  saveProject: request2(async context => {
    var respond = await requestHelper(SaveProject, {
      id: context.state.projectDescription.id,
      data_design: JSON.stringify({
        connector: context.state.connectorNewKey,
        diagram: context.state.dataDiagramNew
      })
    });
    context.commit("setData", respond.payload);
    // context.commit("setData", respond.payload);
  })
};
