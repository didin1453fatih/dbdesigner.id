export default {
  setVisible(state, value) {
    state.visible = value;
  },
  setDiagramScript(state, val) {
    // state.diagramScript = val.diagram;
    state.diagramScript = exportEngin(val);
  }
};

function exportEngin(diagram) {
  var script = "";
  Object.keys(diagram).forEach(diagramKey => {
    script += createTableTemplete(
      diagram[diagramKey].table_name,
      diagram[diagramKey].coloumns
    );
  });
  return script;
}

function createTableTemplete(tableName, coloumns) {
  var coloumnScript = "";
  var i = 0;
  Object.keys(coloumns).forEach(collKey => {
    if (i++ === 0) {
      coloumnScript += "   " + createColoumnTemplete(coloumns[collKey]);
    } else {
      coloumnScript += ",\r\n   " + createColoumnTemplete(coloumns[collKey]);
    }
  });

  var primaryKeyScript = "";
  Object.keys(coloumns).forEach(collKey => {
    var pkScript = createPrimaryKeyTemplete(coloumns[collKey]);
    if (pkScript !== null) {
      primaryKeyScript += ",\r\n   " + pkScript;
    }
  });

  var uniqueKeyScript = "";
  Object.keys(coloumns).forEach(collKey => {
    var uqScriptTMP = createUniqueKeyTemplete(coloumns[collKey]);
    if (uqScriptTMP !== null) {
      uniqueKeyScript += ",\r\n   " + uqScriptTMP;
    }
  });

  return (
    "CREATE TABLE IF NOT EXISTS " +
    tableName +
    "(\r\n" +
    coloumnScript +
    primaryKeyScript +
    uniqueKeyScript +
    "\r\n);\r\n\r\n"
  );
}

function createColoumnTemplete(coloumn) {
  var notNullValue = " NOT NULL";
  var autoIncrementValue = " AUTO_INCREMENT";
  if (coloumn.notNull === false) {
    notNullValue = "";
  }
  if (coloumn.autoIncrement === false) {
    autoIncrementValue = "";
  }
  return (
    coloumn.coloumn_name +
    " " +
    coloumn.dataType +
    notNullValue +
    autoIncrementValue
  );
}

function createPrimaryKeyTemplete(coloumn) {
  if (coloumn.primaryKey === true) {
    return "PRIMARY KEY (" + coloumn.coloumn_name + ")";
  } else {
    return null;
  }
}

function createUniqueKeyTemplete(coloumn) {
  if (coloumn.unique === true) {
    return (
      "UNIQUE KEY unique_" +
      coloumn.coloumn_name +
      " (" +
      coloumn.coloumn_name +
      ")"
    );
  } else {
    return null;
  }
}
