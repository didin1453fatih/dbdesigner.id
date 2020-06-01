var path = require("path");
module.exports.main = async function (root, arg) {
  global["Mukmin"] = {};
  global["db"] = {};
  global.Mukmin["config_I_♥_ﷲ_and_I_♥_ﷺﷴ"] = {};
  global.Mukmin["dataModel_I_♥_ﷲ_and_I_♥_ﷺﷴ"] = {};
  global.Mukmin["dataStore_I_♥_ﷲ_and_I_♥_ﷺﷴ"] = [];
  global.Mukmin["plugin_event_I_♥_ﷲ_and_I_♥_ﷺﷴ"] = [];
  global.Mukmin["onWebBeforeLoad_I_♥_ﷲ_and_I_♥_ﷺﷴ"] = [];
  global.Mukmin["plugin_spesification_I_♥_ﷲ_and_I_♥_ﷺﷴ"] = {};
  global.Mukmin["root"] = root;
  global.Mukmin["blade"] = {};
  global.Mukmin["registerBlade"] = {};
  global.Mukmin["registerDataStore"] = {};
  global.Mukmin["arg"] = arg;
  global.Mukmin.getPath = relativePath => {
    return path.join(global.Mukmin.root, relativePath);
  };

  global.Mukmin.getDataStore = val => {
    try {
      if (val === undefined) {
        return global.Mukmin["dataStore_I_♥_ﷲ_and_I_♥_ﷺﷴ"].default;
      } else {
        return global.Mukmin["dataStore_I_♥_ﷲ_and_I_♥_ﷺﷴ"][val];
      }
    } catch (error) {
      throw new Error("data store not defined" + error.message);
    }
  };

  global.Mukmin.getDataModel = val => {
    try {
      if (val === undefined) {
        return global.Mukmin["dataModel_I_♥_ﷲ_and_I_♥_ﷺﷴ"].default;
      } else {
        return global.Mukmin["dataModel_I_♥_ﷲ_and_I_♥_ﷺﷴ"][val];
      }
    } catch (error) {
      throw new Error("Data store not defined" + error.message);
    }
  };

  global.Mukmin.registerDataStore = async (key, dataStore) => {
    global.Mukmin["dataStore_I_♥_ﷲ_and_I_♥_ﷺﷴ"][key] = dataStore;
    global.Mukmin["dataModel_I_♥_ﷲ_and_I_♥_ﷺﷴ"][key] = {};
  };
  global.Mukmin.registerDataModel = (keyDataStore, keyModel, model) => {
    global.Mukmin["dataModel_I_♥_ﷲ_and_I_♥_ﷺﷴ"][keyDataStore][keyModel] = model;
  };

  global.Mukmin.addDataStore = val => {
    global.Mukmin["dataStore_I_♥_ﷲ_and_I_♥_ﷺﷴ"].push(val);
  };
  global.Mukmin.registerBlade = (key, object) => {
    global.Mukmin["_" + key] = object;
  };
  global.Mukmin.registerPlugin = (key, object) => {
    global.Mukmin["__" + key] = object;
  };
  global.Mukmin.registerOnWebBeforeLoad = (extensionName, order, event) => {
    global.Mukmin["onWebBeforeLoad_I_♥_ﷲ_and_I_♥_ﷺﷴ"].push({
      name: extensionName,
      order: order,
      event: event
    });
  };
  global.Mukmin.getAllOnWebBeforeLoad = () => {
    return global.Mukmin["onWebBeforeLoad_I_♥_ﷲ_and_I_♥_ﷺﷴ"];
  };

  global.Mukmin.registerPluginWorker = (key, object) => {
    global.Mukmin["__" + key] = object;
  };

  global.Mukmin.registerConfig = (key, object) => {
    global.Mukmin["config_I_♥_ﷲ_and_I_♥_ﷺﷴ"][key] = object;
  };

  global.Mukmin.getConfig = key => {
    try {
      return global.Mukmin["config_I_♥_ﷲ_and_I_♥_ﷺﷴ"][key];
    } catch (error) {
      throw new Error("Config store not defined" + error.message);
    }
  };
  global.Mukmin.changeConfig = (key, variable, value) => {
    try {
      return global.Mukmin["config_I_♥_ﷲ_and_I_♥_ﷺﷴ"][key][variable] = value;
    } catch (error) {
      throw new Error("Config store not defined" + error.message);
    }
  };
};
