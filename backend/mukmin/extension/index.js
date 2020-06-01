var loop = require("../lib/loop");
/**
 * Under constructor
 * Next extension name is extension.
 * give checker every extension spesification
 */
module.exports.loadAllExtension = async function() {
  var extensionConfig = Mukmin.getConfig("extension");
  await loop(extensionConfig.require, async extensionRequire => {
    console.log("Load extension " + extensionRequire);
    console.log(Mukmin.getPath("extension/" + extensionRequire + "/spesification"));
    var spec = require(Mukmin.getPath(
      "extension/" + extensionRequire + "/spesification"
    ));

    // Spesification checker using ajv

    // register events on web before load
    if (spec.system_event.onWebBeforeLoad !== undefined) {
      let systemEvent = await require(await Mukmin.getPath(
        "extension/" +
          extensionRequire +
          "/" +
          spec.system_event.onWebBeforeLoad.target +
          ".event"
      ));
      if (systemEvent.onEvent instanceof Function) {
        await Mukmin.registerOnWebBeforeLoad(
          extensionRequire,
          spec.system_event.onWebBeforeLoad.order,
          systemEvent.onEvent
        );
      } else {
        console.log("ERROR LOADING");
      }
    }
  });
};

module.exports.doOnAppBeforeLoad = async (Mukmin, arg) => {
  // var spesifications = Mukmin.getAllpluginpesification();
  // get spesification  on app before load
  // await loop(Object.keys(spesifications), specPluginName => {
  //   if (spesifications[specPluginName].event.onAppBeforeLoad !== undefined) {
  //     require(Mukmin.getPath(
  //       "plugin/" +
  //         specPluginName +
  //         "/" +
  //         spesifications[specPluginName].event.onAppBeforeLoad.target +
  //         ".event"
  //     )).onEvent({
  //       Mukmin: Mukmin,
  //       arg: arg
  //     });
  //   }
  // });
  // var pluginConfig = Mukmin.getConfig("plugin");
  // await loop(pluginConfig.requires, async pluginRequire => {
  //   if (Mukmin["__" + pluginRequire].onAppBeforeLoad !== undefined) {
  //     await Mukmin["__" + pluginRequire].onAppBeforeLoad({
  //       Mukmin: Mukmin,
  //       arg: arg
  //     });
  //   }
  // });
};

module.exports.doOnWebBeforeLoad = async (Mukmin, arg, app) => {
  await loop(Mukmin.getAllOnWebBeforeLoad(), async event => {
    await event.event({
      Mukmin: Mukmin,
      arg: arg,
      app: app
    });
  });
};
