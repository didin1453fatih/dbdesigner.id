export default {
    setVisible(state, value) {
        state.visible = value;
    },
    setDiagramScript(state, obj) {
        var { val, dbType } = obj;
        switch (dbType) {
            case "mysql":
                state.diagramScript = exportEngin(val);
                break;
            case "sqlite":
                state.diagramScript = toSQLite(val);
                break;
            default:
                state.diagramScript = exportEngin(val);
                break;
        }
    },
    getScriptDrop(state, obj) {
        var { val, dbType } = obj;
        state.diagramScript = createDropScript(val);
    },
};

function createDropScript(diagram) {
    var script = "";
    Object.keys(diagram).forEach((diagramKey) => {
        script += "DROP TABLE `" + diagram[diagramKey].table_name + "`; \r\n";
    });
    return script;
}

function toSQLite(diagram) {
    return `${Object.keys(diagram)
        .map(
            (tableKey) => `
CREATE TABLE ${diagram[tableKey].table_name} (
    ${Object.keys(diagram[tableKey].coloumns)
        .map(
            (columnKey) =>
                `${diagram[tableKey].coloumns[columnKey].coloumn_name} ${
                    diagram[tableKey].coloumns[columnKey].dataType == "INT"
                        ? "INTEGER"
                        : diagram[tableKey].coloumns[columnKey].dataType
                }${
                    !(
                        // check for multiple primary keys
                        (
                            Object.keys(diagram[tableKey].coloumns).filter(
                                (columnKey) => diagram[tableKey].coloumns[columnKey].primaryKey
                            ).length - 1
                        )
                    )
                        ? diagram[tableKey].coloumns[columnKey].primaryKey
                            ? " PRIMARY KEY"
                            : ""
                        : ""
                }${
                    diagram[tableKey].coloumns[columnKey].primaryKey &&
                    diagram[tableKey].coloumns[columnKey].autoIncrement
                        ? " AUTOINCREMENT"
                        : ""
                }${diagram[tableKey].coloumns[columnKey].notNull ? " NOT NULL" : ""}${
                    diagram[tableKey].coloumns[columnKey].unique ? " UNIQUE" : ""
                }`
        )
        .concat(
            // multiple primary keys
            Object.keys(diagram[tableKey].coloumns).filter(
                (columnKey) => diagram[tableKey].coloumns[columnKey].primaryKey
            ).length &&
                Object.keys(diagram[tableKey].coloumns).filter(
                    (columnKey) => diagram[tableKey].coloumns[columnKey].primaryKey
                ).length - 1
                ? [
                      `PRIMARY KEY (${Object.keys(diagram[tableKey].coloumns)
                          .filter((columnKey) => diagram[tableKey].coloumns[columnKey].primaryKey)
                          .map((columnKey) => diagram[tableKey].coloumns[columnKey].coloumn_name)
                          .join(", ")})`,
                  ]
                : []
        )
        .concat(
            // foreig keys
            Object.keys(diagram[tableKey].coloumns)
                .filter((columnKey) => diagram[tableKey].coloumns[columnKey].foreignKey)
                .map((columnKey, index) => {
                    var association =
                        diagram[tableKey].association[diagram[tableKey].coloumns[columnKey].association_belong_id];
                    return `CONSTRAINT fk_${diagram[tableKey].table_name}_${
                        diagram[association.table_id].table_name
                    }_${index + 1} FOREIGN KEY (${diagram[tableKey].coloumns[columnKey].coloumn_name}) REFERENCES ${
                        diagram[association.table_id].table_name
                    } (${diagram[association.table_id].coloumns[association.targetKey].coloumn_name})`;
                })
        )
        .join(",\n    ")}
);`
        )
        .join("\n\n")}`;
}

function exportEngin(diagram) {
    var script = "";
    Object.keys(diagram).forEach((diagramKey) => {
        script += createTableTemplete(diagram[diagramKey].table_name, diagram[diagramKey].coloumns);
    });
    var foreignKeyScript = "";
    Object.keys(diagram).forEach((diagramKey) => {
        Object.keys(diagram[diagramKey].coloumns).forEach((collKey) => {
            var fkScriptTMP = createForeignKeyTemplete(
                diagram[diagramKey].table_name,
                diagram[diagramKey].coloumns[collKey],
                diagram[diagramKey],
                diagram
            );
            if (fkScriptTMP !== null) {
                foreignKeyScript += fkScriptTMP + " ;\r\n";
            }
        });
    });
    return script + foreignKeyScript;
}

function createTableTemplete(tableName, coloumns) {
    var coloumnScript = "";
    var i = 0;
    Object.keys(coloumns).forEach((collKey) => {
        if (i++ === 0) {
            coloumnScript += "   " + createColoumnTemplete(coloumns[collKey]);
        } else {
            coloumnScript += ",\r\n   " + createColoumnTemplete(coloumns[collKey]);
        }
    });

    var primaryKeyScript = "";
    var pkScript = createPrimaryKeyTemplete(coloumns);
    if (pkScript !== null) {
        primaryKeyScript += ",\r\n   " + pkScript;
    }

    var uniqueKeyScript = "";
    Object.keys(coloumns).forEach((collKey) => {
        var uqScriptTMP = createUniqueKeyTemplete(coloumns[collKey]);
        if (uqScriptTMP !== null) {
            uniqueKeyScript += ",\r\n   " + uqScriptTMP;
        }
    });

    return (
        "CREATE TABLE IF NOT EXISTS " +
        "`" +
        tableName +
        "`" +
        " (\r\n" +
        coloumnScript +
        primaryKeyScript +
        uniqueKeyScript +
        "\r\n);\r\n\r\n"
    );
}

function createColoumnTemplete(coloumn) {
    var notNullValue = " NOT NULL";
    var autoIncrementValue = " AUTO_INCREMENT";
    var default_value_template = "";
    if (coloumn.notNull === false) {
        notNullValue = "";
    }
    if (coloumn.autoIncrement === false) {
        autoIncrementValue = "";
    }

    if (coloumn.default !== "" && coloumn.default !== null && coloumn.default !== undefined) {
        default_value_template = " DEFAULT '" + coloumn.default + "'";
    }

    return (
        "`" +
        coloumn.coloumn_name +
        "`" +
        " " +
        coloumn.dataType +
        notNullValue +
        autoIncrementValue +
        default_value_template
    );
}

function createPrimaryKeyTemplete(coloumns) {
    var pkScript = "PRIMARY KEY (";
    var count = 0;
    Object.keys(coloumns).forEach((collKey) => {
        if (coloumns[collKey].primaryKey === true) {
            if (count++ === 0) {
                pkScript += "`" + coloumns[collKey].coloumn_name + "`";
            } else {
                pkScript += ", " + "`" + coloumns[collKey].coloumn_name + "`";
            }
        }
    });
    pkScript += ")";
    if (count === 0) {
        return null;
    } else {
        return pkScript;
    }
}

function createUniqueKeyTemplete(coloumn) {
    if (coloumn.unique === true) {
        return "UNIQUE KEY unique_" + coloumn.coloumn_name + " (" + coloumn.coloumn_name + ")";
    } else {
        return null;
    }
}

function createForeignKeyTemplete(tableName, coloumn, diagramObj, diagramAllObj) {
    var count = 0;
    if (coloumn.foreignKey === true) {
        var assocObj = diagramObj.association[coloumn.association_belong_id];
        var targetTableObj = diagramAllObj[assocObj.table_id];
        var coloumnTargetObj = targetTableObj.coloumns[assocObj.targetKey_id];

        var targetTable = diagramAllObj[diagramObj.association[coloumn.association_belong_id].table_id].table_name;
        var targetColoumnName = coloumnTargetObj.coloumn_name;
        return (
            "ALTER TABLE `" +
            tableName +
            "` ADD CONSTRAINT `" +
            tableName +
            "_fk_" +
            count++ +
            "_" +
            coloumn.coloumn_name +
            "` FOREIGN KEY (" +
            coloumn.coloumn_name +
            ") REFERENCES `" +
            targetTable +
            "`(`" +
            targetColoumnName +
            "`)"
        );
    } else {
        return null;
    }
}

// ALTER TABLE `PROJECT` ADD CONSTRAINT `PROJECT_fk0` FOREIGN KEY (`USER_id`) REFERENCES `USER`(`id`);
