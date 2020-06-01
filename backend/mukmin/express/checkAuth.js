var loop = require("../lib/loop");
var router = Mukmin.getConfig("routers");
var onAuth = require(Mukmin.getPath("app/event/onAuth.event"));
module.exports.checkAuth = async function (routers_key, req, res) {
  if (
    router[routers_key].policies !== undefined &&
    router[routers_key].policies.length > 0
  ) {
    var me = await onAuth(
      req.token
    );
    req["me"] = me;
    // do authenticate
    var isAuthenticate = false;
    await loop(router[routers_key].policies, async police => {
      isAuthenticate = await require(Mukmin.getPath("app/polices/" + police))(
        me
      );
    });
    if (isAuthenticate === false) {
      return {
        success: false,
        message:
          "Not got authenticate for your police " + router[routers_key].policies
      };
    } else {
      return {
        success: true,
        message: null
      };
    }
  } else {
    return {
      success: true,
      message: null
    };
  }
};
