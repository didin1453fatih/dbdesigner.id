const chalk = require("chalk");
const Sequelize = require("sequelize");
// var loader = require("../loader/index");
// const chalk = require('chalk');
// var datastores = loader.datastores;
var datastores = Mukmin.getConfig("datastores");

const fs = require("fs");

var loop = require("../lib/loop");

module.exports.main = async function () {
  await loop(Object.keys(datastores), async datastoreKey => {
    var sequelize = await new Sequelize(datastores[datastoreKey]);

    Mukmin.registerDataStore(datastoreKey, sequelize);
    var files = await fs.readdirSync(
      Mukmin.getPath("app/models/" + datastoreKey)
    );
    await loop(files, async file => {
      var fileNameSplit = file.split(".");
      if (fileNameSplit[1] === "model") {
        var modelName = fileNameSplit[0];
        var modelSchema = require(Mukmin.getPath(
          "app/models/" + datastoreKey + "/" + file
        ));
        var modelOptions = modelSchema.options;
        var model = await sequelize.define(
          modelName,
          modelSchema.columns,
          modelOptions
        );
        Mukmin.registerDataModel(datastoreKey, modelName, model);
        model.sync();
        // model.sync({ force: true });
        // await Mukmin.getDataModel(modelName).sync({ force: true });
      }
    });

    var modelDB = Mukmin.getDataModel(datastoreKey);
    await loop(files, async file => {
      var modelSchema = require(Mukmin.getPath(
        "app/models/" + datastoreKey + "/" + file
      ));
      var modelName = file.split(".")[0];
      await loop(await modelSchema.associations, async association => {
        if (modelDB[modelName] === undefined || modelDB[modelName] === null) {
          console.log("model " + modelName + " not found");
          process.exit(1);
        }
        if (
          modelDB[association.model] === undefined ||
          modelDB[association.model] === null
        ) {
          console.log(
            "not found  in  hasMany association [" +
            association.model +
            "] in model " +
            association.model
          );
          process.exit(1);
        }
        if (association.type === "belongsTo") {
          console.log(
            chalk.bgGreen.black(
              "Model name : " + modelName + " belongsTo " + association.model
            )
          );
          modelDB[modelName].belongsTo(
            modelDB[association.model],
            association.options
          );
        } else if (association.type === "hasMany") {
          console.log(
            chalk.bgGreen.black(
              "Model name : " + modelName + " hasMany " + association.model
            )
          );
          modelDB[modelName].hasMany(
            modelDB[association.model],
            association.options
          );
        } else if (association.type === "belongsToMany") {
          console.log(
            chalk.bgGreen.black(
              "Model name : " +
              modelName +
              " belongsToMany " +
              association.model
            )
          );
          association.options.through = modelDB[association.options.through];
          modelDB[modelName].belongsToMany(
            modelDB[association.model],
            association.options
          );
        }
      });
      // await Mukmin.getDataModel(modelName).sync({ force: true });
    });
  });
};
