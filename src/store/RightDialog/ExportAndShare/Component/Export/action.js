import { request2 } from "@/helper/RequestConnector";
export default {
  goExport: request2(async context => {

    if(context.inputs.scriptType==='create'){
      context.commit("setDiagramScript", context.rootState.Data.Project.dataDiagramNew);
    }else if(context.inputs.scriptType==='drop'){
      context.commit("getScriptDrop", context.rootState.Data.Project.dataDiagramNew);
    }
    
  })
};
