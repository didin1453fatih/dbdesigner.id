// import GetListProject from "../../request/listProject.request";
import { request2 } from "../../helper/RequestConnector";
export default {
  goExport: request2(async context => {
    // var raw = {
    //   connector: context.rootState.diagram.connectorNewKey,
    //   diagram: 
    // };
    if(context.inputs.scriptType==='create'){
      context.commit("setDiagramScript", context.rootState.diagram.dataDiagramNew);
    }else if(context.inputs.scriptType==='drop'){
      context.commit("getScriptDrop", context.rootState.diagram.dataDiagramNew);
    }
    
  })
};
