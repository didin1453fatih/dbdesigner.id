import { request2 } from "@/helper/RequestConnector";
export default {
    goExport: request2(async (context) => {
        if (context.inputs.scriptType === "create") {
            context.commit("setDiagramScript", {
                val: context.rootState.Data.Project.dataDiagramNew,
                dbType: context.inputs.dbType,
            });
        } else if (context.inputs.scriptType === "drop") {
            context.commit("getScriptDrop", {
                val: context.rootState.Data.Project.dataDiagramNew,
                dbType: context.inputs.dbType,
            });
        }
    }),
};
