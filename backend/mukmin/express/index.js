// https://gist.github.com/ibreathebsb/a104a9297d5df4c8ae944a4ed149bcf1
var appConfig = Mukmin.getConfig("app");
var routerConfig = Mukmin.getConfig("routers");
var multerConfig = Mukmin.getConfig("multer");
var pluginManager = require("../extension/index");
var loop = require("../lib/loop");
var multer = require("multer");
var express = require("express");
var https = require("https");
var app = express();
var upload = multer(multerConfig);
var handleAction = require("./handleAction").handleAction;
var fs = require("fs");

module.exports.main = async function(arg) {
  await pluginManager.doOnWebBeforeLoad(Mukmin, arg, app);
  // await loadPlugin(app);
  var routers_key_array = Object.keys(routerConfig);
  await loop(routers_key_array, async routers_key => {
    var router_key_splited = routers_key.split(" ");
    var tmp = [];
    await loop(router_key_splited, async data => {
      if (data !== "") {
        tmp.push(data);
      }
    });
    router_key_splited = tmp;
    // console.log(" router key split " + JSON.stringify(router_key_splited));
    if (router_key_splited[0] === "GET") {
      app.get(router_key_splited[1], (req, res) => {
        handleAction(routers_key, req, res);
      });
    } else if (router_key_splited[0] === "POST") {
      var schema = require(Mukmin.getPath(
        "app/controllers/" + routerConfig[routers_key].action + ".controller"
      ));
      if (
        schema.inputs.files !== undefined &&
        schema.inputs.files !== {} &&
        schema.inputs.files.properties !== undefined &&
        schema.inputs.files.properties !== {}
      ) {
        var uploadOptions = [];
        await loop(
          Object.keys(schema.inputs.files.properties),
          async fileNameKey => {
            let maxCount = 1;
            if (schema.inputs.files.properties[fileNameKey].type === "single") {
              maxCount = 1;
            } else if (
              schema.inputs.files.properties[fileNameKey].type === "array"
            ) {
              if (
                schema.inputs.files.properties[fileNameKey].maxCount ===
                  undefined ||
                schema.inputs.files.properties[fileNameKey].maxCount === null ||
                isNaN(schema.inputs.files.properties[fileNameKey].maxCount)
              ) {
                if (schema.onError !== undefined) {
                  return schema.onError(
                    inputs,
                    outputs,
                    "max count for array upload must set a number"
                  );
                } else {
                  return require(Mukmin.getPath("app/outputs/error/default"))(
                    res,
                    {
                      code: 503,
                      message: "file upload problem"
                    },
                    "max count for array upload must set a number",
                    inputs,
                    outputs
                  );
                }
              }
              maxCount = schema.inputs.files.properties[fileNameKey].maxCount;
            } else {
              if (schema.onError !== undefined) {
                return schema.onError(
                  inputs,
                  outputs,
                  '"type of file just single and array no more"'
                );
              } else {
                return require(Mukmin.getPath("app/outputs/error/default"))(
                  res,
                  {
                    code: 503,
                    message: "file upload problem"
                  },
                  "type of file just single and array no more",
                  inputs,
                  outputs
                );
              }
            }
            uploadOptions.push({
              name: fileNameKey,
              maxCount: maxCount
            });
          }
        );
        var cpUpload = upload.fields(uploadOptions);
        app.post(router_key_splited[1], cpUpload, (req, res) => {
          handleAction(routers_key, req, res);
        });
      } else {
        app.post(router_key_splited[1], (req, res) => {
          handleAction(routers_key, req, res);
        });
      }
    } else if (router_key_splited[0] === "PUT") {
      app.put(router_key_splited[1], (req, res) => {
        handleAction(routers_key, req, res);
      });
    }
  });
  console.log("\r\nRunning in port " + appConfig.port);
  app.use(function(err, req, res, next) {
    var inputs = {};
    inputs["req"] = req;
    inputs["body"] = req.body;
    inputs["query"] = req.query;
    inputs["params"] = req.params;
    var outputs = {};
    outputs["res"] = res;
    require(Mukmin.getPath("app/event/onError.event"))(inputs, outputs, err);
  });
  if (appConfig.secure.status === "true") {
    // we will pass our 'app' to 'https' server
    https
      .createServer(
        {
          key: fs.readFileSync(appConfig.secure.properties.key),
          cert: fs.readFileSync(appConfig.secure.properties.cert)
        },
        app
      )
      .listen(appConfig.port);
  } else {
    app.listen(appConfig.port);
  }
};
