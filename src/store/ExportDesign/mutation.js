export default {
  setVisible(state, value) {
    state.visible = value;
  },
  setDiagramScript(state, val) {
    // state.diagramScript = val.diagram;
    state.diagramScript = exportEngin(val);
  }
};

//  eslint-disable-next-line
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
//  eslint-disable-next-line
function createTableTemplete(tableName, coloumns) {
  var coloumnScript = "";
  Object.keys(coloumns).forEach(collKey => {
    coloumnScript += createColoumnTemplete(coloumns[collKey]);
  });

  var primaryKeyScript="";
  Object.keys(coloumns).forEach(collKey => {
    primaryKeyScript += createPrimaryKeyTemplete(coloumns[collKey]);
  });

  return "CREATE TABLE IF NOT EXISTS " + tableName + "(\r\n" + coloumnScript + primaryKeyScript+");\r\n\r\n";
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
    "   "+coloumn.coloumn_name +
    " " +
    coloumn.dataType +
    notNullValue +
    autoIncrementValue +
    ",\r\n"
  );
}

function createPrimaryKeyTemplete(coloumn){
  if(coloumn.primaryKey===true){
    return '   PRIMARY KEY ('+coloumn.coloumn_name+'),\r\n'
  }else{
    return ''
  }
  
}
