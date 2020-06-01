var router = Mukmin.getConfig("routers");
var inputConfig = Mukmin.getConfig("inputs");
var loop = require("../lib/loop");
var checkAuth = require("./checkAuth").checkAuth;
var AjvQuery = require("ajv");
var AjvBody = require("ajv");
var AjvParam = require("ajv");
const ajvBody = new AjvBody(inputConfig.body_options);

const ajvQuery = new AjvQuery(inputConfig.query_options);

/**
 * param akan khusus menggunakan coerceTypes yaitu mekanisme
 * untuk bisa mengubah struktur tipe  dalam pengecekan ajv
 * hal ini dilakukana karena param akan bernilai string semua
 */
const ajvParams = new AjvParam(inputConfig.params_options);

inputConfig.loadValidator(ajvBody, ajvQuery, ajvParams);
module.exports.handleAction = async function (routers_key, req, res) {
  //cek police to match with role access

  var authSuccess = true;
  var authMessage = "";
  var respondCheckAuth = await checkAuth(routers_key, req, res);
  authMessage = respondCheckAuth.message;
  authSuccess = respondCheckAuth.success;

  // cek if use view engine direct
  if (router[routers_key].view !== undefined) {
    // you must chose view or action not both
    if (router[routers_key].action !== undefined) {
      throw new Error("error you must chose view or action not both");
    }

    if (authSuccess === false) {
      throw new Error(authMessage);
    }
    console.log("in here");
    res.render(router[routers_key].view);
  } else {
    var schema = require(Mukmin.getPath(
      "app/controllers/" + router[routers_key].action + ".controller"
    ));

    var inputs = {
      body: {},
      param: {},
      query: {},
      files: {},
      req: {}
    };
    var outputs = {
      error: {},
      success: {},
      view: {},
      res: res
    };

    var bodySchema = schema.inputs.body;
    var paramSchema = schema.inputs.params;
    var querySchema = schema.inputs.query;
    inputs.req = req;

    // check respond message
    if (authSuccess === false) {
      var onError = schema.onError;
      if (onError instanceof Function) {
        return onError(inputs, outputs, authMessage);
      } else {
        try {
          return require(Mukmin.getPath("app/outputs/error/default"))(
            res,
            {
              code: 10,
              message: "authentication failure"
            },
            authMessage,
            inputs,
            outputs
          );
        } catch (error) {
          throw new Error("Authentication failure");
        }
      }
    }

    if (
      schema.outputs !== undefined &&
      schema.outputs !== null &&
      schema.outputs !== {} &&
      schema.outputs.error !== undefined &&
      schema.outputs.error !== null &&
      schema.outputs.error !== {}
    ) {
      let errorKeys = Object.keys(schema.outputs.error);
      for (let i = 0; i < errorKeys.length; i++) {
        outputs.error[errorKeys[i]] = function (data) {
          let options = schema.outputs.error[errorKeys[i]];
          let key = errorKeys[i];
          if (key.indexOf("__") > 0) {
            key = key.split("__")[0];
          }
          return require(Mukmin.getPath("app/outputs/error/" + key))(
            res,
            options,
            data
          );
        };
      }
    }

    if (
      schema.outputs !== undefined &&
      schema.outputs !== null &&
      schema.outputs !== {} &&
      schema.outputs.success !== undefined &&
      schema.outputs.success !== null &&
      schema.outputs.success !== {}
    ) {
      let successKeys = Object.keys(schema.outputs.success);
      for (let i = 0; i < successKeys.length; i++) {
        outputs.success[successKeys[i]] = function (data) {
          let options = schema.outputs.success[successKeys[i]];
          let key = successKeys[i];
          if (key.indexOf("__") > 0) {
            key = key.split("__")[0];
          }
          return require(Mukmin.getPath("app/outputs/success/" + key))(
            res,
            options,
            data
          );
        };
      }
    }

    if (
      schema.inputs.files !== undefined &&
      schema.inputs.files !== {} &&
      schema.inputs.files.properties !== undefined &&
      schema.inputs.files.properties !== {}
    ) {
      await loop(
        Object.keys(schema.inputs.files.properties),
        async fileNameKey => {
          // check required
          await loop(schema.inputs.files.required, async requiredKey => {
            if (req.files[requiredKey] === undefined) {
              return schema.onError(
                inputs,
                outputs,
                "File validate : file input for " +
                requiredKey +
                " is required bro... :) "
              );
            }
          });

          if (req.files[fileNameKey] !== undefined) {
            if (schema.inputs.files.properties[fileNameKey].type === "single") {
              inputs.files[fileNameKey] = req.files[fileNameKey][0];
            } else if (
              schema.inputs.files.properties[fileNameKey].type === "array"
            ) {
              inputs.files[fileNameKey] = req.files[fileNameKey];
            }
          }
        }
      );
    }

    if (bodySchema !== undefined && bodySchema !== {} && bodySchema !== null) {
      //cek body schema
      let validate = ajvBody.compile(bodySchema);
      validate(req.body);
      if (validate.errors !== null) {
        if (schema.onError !== undefined) {
          return schema.onError(inputs, outputs, validate.errors);
        } else {
          return require(Mukmin.getPath("app/outputs/error/default"))(
            res,
            {
              code: 500,
              message: "validation body schema error"
            },
            validate.errors,
            inputs,
            outputs
          );
        }
      } else {
        inputs.body = req.body;
      }
    } else {
      inputs.body = {};
    }

    if (
      paramSchema !== undefined &&
      paramSchema !== {} &&
      paramSchema !== null
    ) {
      //cek body schema
      let validate = ajvParams.compile(paramSchema);
      validate(req.params);
      if (validate.errors !== null) {
        if (schema.onError !== undefined) {
          return schema.onError(inputs, outputs, validate.errors);
        } else {
          return require(Mukmin.getPath("app/outputs/error/default"))(
            res,
            {
              code: 501,
              message: "validation params schema error"
            },
            validate.errors,
            inputs,
            outputs
          );
        }
      } else {
        inputs.params = req.params;
      }
    } else {
      inputs.params = {};
    }
    if (
      querySchema !== undefined &&
      querySchema !== {} &&
      querySchema !== null
    ) {
      //cek body schema
      let validate = await ajvQuery.compile(querySchema);
      await validate(req.query);
      if (validate.errors !== null) {
        if (schema.onError !== undefined) {
          return schema.onError(inputs, outputs, validate.errors);
        } else {
          return require(Mukmin.getPath("app/outputs/error/default"))(
            res,
            {
              code: 502,
              message: "validation query schema error"
            },
            validate.errors,
            inputs,
            outputs
          );
        }
      } else {
        inputs.query = req.query;
      }
    } else {
      inputs.query = {};
    }
    // console.log(JSON.stringify(req.query) + "req params");
    try {
      if (schema.onError !== undefined && schema.onError instanceof Function) {
        try {
          return await schema.action(inputs, outputs);
        } catch (error) {
          console.error(error)
          return await schema.onError(inputs, outputs, error);
        }
      } else {
        try {
          return await schema.action(inputs, outputs);
        } catch (error) {
          console.error(error)
          return outputs.res.json({
            success: false,
            message: "internal system error"
          })
        }
      }
    } catch (error) {
      console.error(error)
      return outputs.res.json({
        success: false,
        message: "internal system error"
      })
    }
  }
};
