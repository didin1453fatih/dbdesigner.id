require("dotenv").config();
const loop = require("./lib/loop");
const fs = require("fs");
const argv = require("yargs").argv;
const Sequelize = require("sequelize");
global.Sequelize = Sequelize;

async function loadConfig() {
  var files = await fs.readdirSync(Mukmin.getPath("config"));
  await loop(files, async file => {
    var fileNameSplit = file.split(".");
    if (fileNameSplit[1] === "config") {
      console.log("Load config " + fileNameSplit[0]);
      await global.Mukmin.registerConfig(
        fileNameSplit[0],
        await require(Mukmin.getPath("config/" + file))
      );
    }
  });
}
module.exports.main = async function(root) {
  //Require all first


  await require("./mukmin/index").main(root, argv);
  // console.log('load config start')
  await loadConfig();

  // console.log('load config end')
  await require("./extension").loadAllExtension();
  await require("./extension/index").doOnAppBeforeLoad(Mukmin, argv);
  await require("./express/index").main(argv);
  await require("./squelize/index").main();
  if (argv.seed === true) {
    await require("./migration/index").main();
  }
  // await loadPlugin();
  console.log(`
♥░▀█▀░░░░░░░░░░░░░░░░░░░░░░░▌║▐░░░░░░▀▀░░♥
♥░░█░░░▄▀▀▄─▄▀▀▄░░░░░░░░░░░░▀▀▀░░░░░░░░░░♥
♥░░█░░█────▀────█░░░░████░░░██░░██░░░██░░♥
♥░░█░░▀▄───────▄▀░░░██░██░░░██░░██░░░██░░♥
♥░░█░░░░▀▄───▄▀░░░░██░░██░░░██░░██░░░██░░♥
♥░░█░░░░░░▀▄▀░░░░░███████░░░██░░██░░░██░░♥
♥░▄█▄░░░░░░░░░░░░░░░░░░███████████░░░██░░♥
  `);
  console.log(`
  ﷽
  `);
};

// main();
