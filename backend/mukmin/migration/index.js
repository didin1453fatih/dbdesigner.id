/**
 * -------------------------------
 * limitation of this seeding data 
 * -------------------------------
 * saturday 6 april 2019  
 * - data must use one table for references key. 
 * if you want to use more than one references key,
 * you must use more trick for this case.
 * I user id in table for help me connect to another table
 * the id must be unique and increment integer
 * 
 */
var loopKeys = require("../lib/loopKeys");
var loop = require("../lib/loop");
var loader = require("../loader/index");
var excelToJson = require("convert-excel-to-json");
const chalk = require('chalk');

async function excelLoad(dataStoreKey, file) {
  var excelResults = excelToJson({
    sourceFile: file,
    header: {
      rows: 1
    },
    columnToKey: {
      "*": "{{columnHeader}}"
    }
  });
  var modelDB = await Mukmin.getDataModel(dataStoreKey);
  if (modelDB === undefined) {
    console.log(
      "not found datastore " + dataStoreKey + " check your config/seeds.js"
    );
    process.exit(1);
  }
  await loop(Object.keys(excelResults).reverse(), async keySheet => {
    if (keySheet.charAt(0) !== "!") {
      console.log(chalk.bgWhite.black(" Delete Table : "+keySheet+" " ));      
      if (modelDB[keySheet] === undefined) {
        console.log(chalk.bgRed.black('key table '+keySheet+' not found in datastore '+dataStoreKey+" "));      
        // console.log('key table '+keySheet+' not found in datastore '+dataStoreKey)
        process.exit(1);
      }
      await modelDB[keySheet].destroy({
        where: {},
        logging: false
      });
    }
  });
  await loop(Object.keys(excelResults), async keySheet => {
    if (keySheet.charAt(0) !== "!") {
      console.log(chalk.bgCyan.black(" Key Sheet    : "+keySheet+" " ));      
      await loop(excelResults[keySheet], async row => {
        // cek apakah ada yang merukapan key reference
        var keyReferences = {};
        await loop(Object.keys(row), async headerKeySheet => {
          if (headerKeySheet.charAt(0) === "#") {
            //  generate include system
            var whereParams = {};
            var coloumn = headerKeySheet
              .replace(/\s|\r\n/g, "")
              .split("#")[1]
              .split(".")[1];
            var tableName = headerKeySheet
              .replace(/\s|\r\n/g, "")
              .split("#")[1]
              .split(".")[0];

            whereParams[coloumn] = row[headerKeySheet];

            if (modelDB[tableName] === undefined) {
              console.log('tableName is undefined '+tableName)
              process.exit(1);
            }

            var dataTableArray = await modelDB[tableName].findAll({
              where: whereParams,
              logging: false
            });
            if (dataTableArray.length > 1) {
              console.log("data references must be unique");
              console.log(JSON.stringify(dataTableArray));
              console.log(
                "\r\n whre params \r\n " + JSON.stringify(whereParams)
              );
              console.log(
                "\r\n include params \r\n" + JSON.stringify(includeParams)
              );
              process.exit(1);
            } else if (dataTableArray.length === 0) {
              console.log("data references not found "+tableName+' criteria '+JSON.stringify(whereParams));
              process.exit(1);
            }
            keyReferences[tableName] = dataTableArray[0];
          }
        });
        var dataForUpdate = {};

        //build data and check if there are references data
        await loop(Object.keys(row), async rowKey => {
          if (rowKey.charAt(0) !== "#"&&rowKey.charAt(0) !== "!") {
            if (row[rowKey] !== undefined && row[rowKey] !== null) {
              if (isNaN(row[rowKey]) && row[rowKey].charAt(0) === "#") {
                var coloumn = row[rowKey]
                  .replace(/\s|\r\n/g, "")
                  .split("#")[1]
                  .split(".")[1];
                var tableName = row[rowKey]
                  .replace(/\s|\r\n/g, "")
                  .split("#")[1]
                  .split(".")[0];
                dataForUpdate[rowKey] = keyReferences[tableName][coloumn];
              } else {
                dataForUpdate[rowKey] = row[rowKey];
              }
            }
          }
        });

        try {
          var successInsert=await modelDB[keySheet].create(dataForUpdate, { logging: false }); 
          console.log(chalk.green('success : ')+JSON.stringify(successInsert))
        } catch (error) {
          console.log(chalk.red('error data : ')+JSON.stringify(dataForUpdate))
          console.log(chalk.red('error message : ')+JSON.stringify(error))
          process.exit(1);
        }
      });
    }
  });
}

/**
 * seeds key is data store in relational database
 */
module.exports.main = async function() {
  console.log(
    "\r\n\r\n\r\n------------------------\r\n--------------------------\r\n===============================\r\n"
  );
  await loopKeys(loader.seeds, async seedKey => {
    console.log(chalk.bgYellow.black(" Data store   : "+seedKey+" " ));
    await loop(loader.seeds[seedKey].seeds, async seed => {
      console.log(chalk.bgMagenta.black(" Location     : " +seed+" "));
      await excelLoad(seedKey, seed);
    });
  });
  console.log(
    "\r\n\r\n\r\n------------------------\r\n--------------------------\r\n===============================\r\n"
  );
};
