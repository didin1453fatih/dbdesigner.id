import { message } from "ant-design-vue";
import LoadProjectUUID from "@/request/readOneProjectUUID.request";
import LoadProject from "@/request/readOneProject.request";
import SaveProject from "@/request/saveProject.request";
import { request2, requestHelper } from "@/helper/RequestConnector";
export default {
  setEmptyDiagram: request2(async context => {
    context.commit("setConnector", {});
    context.commit("setDiagram", {});

    context.commit("deletedData");
    // context.rootCommit("LeftPanel/setVisible", true);
    context.rootCommit("LeftPanel/setPanelName", "open");
  }),
  loadProjectUUID: request2(async context => {
    context.rootCommit("Utill/LoadingGlobal/Layout/setVisible", true);

    try {
      var respond = await requestHelper(LoadProjectUUID, {
        uuid: context.inputs.uuid,
        password: context.inputs.password
      });
      if (respond.success === true) {
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
        context.commit("setProjectDescription", respond.payload);
        context.rootCommit("LeftDialog/FileMenu/Layout/setVisible", false);
        context.rootCommit("LeftDialog/FileMenu/Layout/setPanelName", "properties");
        message.success("Opened", 2);
      }
    } catch (error) {
      if (error.code === 23) {
        message.info(error.description.title + " Required password", 3);
        context.rootCommit(
          "OpenSharedWithPassword/setUUID",
          context.inputs.uuid
        );

        context.rootCommit("LeftDialog/FileMenu/Layout/setVisible", true);
        context.rootCommit("LeftDialog/FileMenu/Layout/setPanelName", "OpenSharedWithPassword");
      } else {
        message.error(error.message, 2);
      }
    }
    context.rootCommit("Utill/LoadingGlobal/Layout/setVisible", false);
  }),
  loadProject: request2(async context => {
    context.rootCommit("Utill/LoadingGlobal/Layout/setVisible", true);
    try {
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
      context.commit("setProjectDescription", respond.payload);
      context.rootCommit("LeftDialog/FileMenu/Layout/setVisible", false);
    } catch (error) {
      if (error.code === 10) {
        message.error("Login first to open project", 2);
        context.rootCommit("LeftDialog/FileMenu/Layout/setVisible", true);
        context.rootCommit("LeftDialog/FileMenu/Layout/setPanelName", "login");
      } else {
        message.error(error.message, 2);
      }
    }
    context.rootCommit("Utill/LoadingGlobal/Layout/setVisible", false);
  }),
  saveProject: request2(async context => {
    const hide = message.loading("Saving in progress..", 0);

    try {
      await requestHelper(SaveProject, {
        id: context.state.projectDescription.id,
        data_design: JSON.stringify({
          connector: context.state.connectorNewKey,
          diagram: context.state.dataDiagramNew
        })
      });
      setTimeout(hide, 0);
      setTimeout(() => {
        message.success("Saved Success", 1);
      }, 500);
    } catch (error) {
      if (error.code === 10) {
        setTimeout(hide, 0);
        message.error("Login first to save account", 2);
        context.rootCommit("LeftDialog/FileMenu/Layout/setVisible", true);
        context.rootCommit("LeftDialog/FileMenu/Layout/setPanelName", "login");
      } else {
        setTimeout(hide, 0);
        setTimeout(() => {
          message.error("Saved Failure " + error.message, 2);
        }, 500);
      }
    }
  })
};
