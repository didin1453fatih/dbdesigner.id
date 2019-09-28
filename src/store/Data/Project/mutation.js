/**
 * Just do least than 60 minutes after wake up and 60 minutes before sleep
 * Achive one simple target
 * next 7  may menambahkan algoritma agar bisa melakukan reactive auto route untuk connector
 * next 8 may stucturing alorithm and clean code
 */
import Vue from "vue";
import uuidv4 from "uuid/v4";
export default {
  /**
   *
   * @param {*} state
   * @param { value : value of x  and y } raw
   */
  async changeTablePotition(state, raw) {
    // eslint-disable-next-line
    // console.log("table key " + JSON.stringify(raw));
    var val = raw.value;
    var tableKey = raw.tableKey;
    var draggedTable = state.dataDiagramNew[tableKey];

    draggedTable.point.x = val.currentTarget.attrs.x;
    draggedTable.point.y = val.currentTarget.attrs.y;
    // eslint-disable-next-line
    // console.log(
    //   "draggedTable.association " + JSON.stringify(draggedTable.association)
    // );
    Object.keys(draggedTable.association).forEach(key => {
      let conn =
        state.connectorNewKey[draggedTable.association[key].connector_id];
      var targetTable =
        state.dataDiagramNew[draggedTable.association[key].table_id];
      // let draggedAssoc=draggedTable.association[key]
      // let connHead=state.connectorNewKey[draggedAssoc.connector_id].head
      // let targetAssoc=state.dataDiagramNew[connHead.table_id].association[connHead.association_id]
      var tmp = [];
      // Tail is has a arrow pointer
      if (draggedTable.association[key].type === "belong") {
        var headX =
          draggedTable.point.x + draggedTable.association[key].point.x;
        var headY =
          draggedTable.point.y + draggedTable.association[key].point.y;

        let tailX = conn.points[6];
        let tailY = conn.points[7];
        var centralX;

        // System router draggable
        if (
          draggedTable.point.x > targetTable.point.x &&
          draggedTable.point.x < targetTable.point.x + targetTable.widthTable
        ) {
          tailX = targetTable.point.x;
          centralX = tailX - Math.abs(headX - tailX) / 2;
        } else if (draggedTable.point.x < targetTable.point.x) {
          if (
            draggedTable.point.x + draggedTable.widthTable <
            targetTable.point.x
          ) {
            headX = draggedTable.point.x + draggedTable.widthTable;
            centralX = headX + Math.abs(headX - tailX) / 2;
          } else {
            tailX = targetTable.point.x;
            centralX = headX - Math.abs(headX - tailX) / 2;
          }
        } else {
          tailX = targetTable.point.x + targetTable.widthTable;
          centralX = headX - Math.abs(headX - tailX) / 2;
        }
        // End System router draggable

        tmp = [headX, headY, centralX, headY, centralX, tailY, tailX, tailY];
      } else if (draggedTable.association[key].type === "has") {
        var tailX =
          draggedTable.point.x + draggedTable.association[key].point.x;
        var tailY =
          draggedTable.point.y + draggedTable.association[key].point.y;
        let headX = conn.points[0];
        let headY = conn.points[1];

        let centralX = headX - Math.abs(headX - tailX) / 2;
        // System router draggable
        if (
          draggedTable.point.x > targetTable.point.x &&
          draggedTable.point.x < targetTable.point.x + targetTable.widthTable
        ) {
          headX = targetTable.point.x;
          tailX = draggedTable.point.x;
          centralX = headX - Math.abs(headX - tailX) / 2;
        } else if (draggedTable.point.x < targetTable.point.x) {
          if (
            draggedTable.point.x + draggedTable.widthTable <
            targetTable.point.x
          ) {
            tailX = draggedTable.point.x + draggedTable.widthTable;
            centralX = tailX + Math.abs(headX - tailX) / 2;
          } else {
            tailX = draggedTable.point.x;
            headX = targetTable.point.x;
            centralX = tailX - Math.abs(headX - tailX) / 2;
          }
        } else {
          headX = targetTable.point.x + targetTable.widthTable;
          tailX = draggedTable.point.x;
          centralX = tailX - Math.abs(headX - tailX) / 2;
        }
        // End System router draggable

        tmp = [headX, headY, centralX, headY, centralX, tailY, tailX, tailY];
      }
      conn.points = tmp;
    });

    // save table
    state.isSaved = false;
  },
  /**
   *
   * @param {*} state
   * @param {status: boolean, tableName: string} raw
   */
  async highlightRelation(state, raw) {
    var status = raw.status;
    var tableKey = raw.tableKey;
    // eslint-disable-next-line
    // console.log("status true " + tableKey);
    // eslint-disable-next-line
    // console.log("data table assoc");
    // eslint-disable-next-line
    // console.log(JSON.stringify(state.dataDiagramNew[tableKey].association));
    await Object.keys(state.dataDiagramNew[tableKey].association).forEach(
      key => {
        if (state.dataDiagramNew[tableKey].association[key].type === "belong") {
          let foreignKeyId =
            state.dataDiagramNew[tableKey].association[key].foreignKey_id;
          let targetKeyId =
            state.dataDiagramNew[tableKey].association[key].targetKey_id;
          let targetTableId =
            state.dataDiagramNew[tableKey].association[key].table_id;
          let connectorId =
            state.dataDiagramNew[tableKey].association[key].connector_id;
          if (status === true) {
            state.dataDiagramNew[tableKey].coloumns[foreignKeyId].style = {
              shadowBlur: 5,
              shadowColor: "green"
            };

            state.dataDiagramNew[targetTableId].coloumns[targetKeyId].style = {
              shadowBlur: 5,
              shadowColor: "green"
            };
            state.connectorNewKey[connectorId].lineStyle = {
              shadowBlur: 5,
              shadowColor: "green"
            };
            // eslint-disable-next-line
            // console.log(
            //   "state.connectorNewKey[connectorId] " +
            //     JSON.stringify(state.connectorNewKey[connectorId])
            // );
          } else if (status === false) {
            state.dataDiagramNew[tableKey].coloumns[foreignKeyId].style = {
              shadowBlur: 0,
              shadowColor: "green"
            };
            state.dataDiagramNew[targetTableId].coloumns[targetKeyId].style = {
              shadowBlur: 0,
              shadowColor: "green"
            };
            state.connectorNewKey[connectorId].lineStyle = {
              shadowBlur: 2,
              shadowColor: "#555555"
            };
          }
        } else if (
          state.dataDiagramNew[tableKey].association[key].type === "has"
        ) {
          let foreignKeyId =
            state.dataDiagramNew[tableKey].association[key].foreignKey_id;
          let sourceKeyId =
            state.dataDiagramNew[tableKey].association[key].sourceKey_id;
          let targetTableId =
            state.dataDiagramNew[tableKey].association[key].table_id;
          let connectorId =
            state.dataDiagramNew[tableKey].association[key].connector_id;
          if (status === true) {
            // eslint-disable-next-line
            // console.log("hidupkan biru " + connectorId);
            state.dataDiagramNew[tableKey].coloumns[sourceKeyId].style = {
              shadowBlur: 5,
              shadowColor: "#00D2FF"
            };

            state.dataDiagramNew[targetTableId].coloumns[foreignKeyId].style = {
              shadowBlur: 5,
              shadowColor: "#00D2FF"
            };

            state.connectorNewKey[connectorId].lineStyle = {
              shadowBlur: 5,
              shadowColor: "#00D2FF"
            };
          } else if (status === false) {
            // eslint-disable-next-line
            // console.log("matikan biru");
            state.dataDiagramNew[tableKey].coloumns[sourceKeyId].style = {
              shadowBlur: 0,
              shadowColor: "#00D2FF"
            };
            state.dataDiagramNew[targetTableId].coloumns[foreignKeyId].style = {
              shadowBlur: 0,
              shadowColor: "#00D2FF"
            };
            state.connectorNewKey[connectorId].lineStyle = {
              shadowBlur: 2,
              shadowColor: "#555555"
            };
          }
        }
      }
    );
  },
  setHighLightRelation(state, raw) {
    var status = raw.status;
    var connector_id = raw.connector_id;
    if (status === true) {
      state.connectorNewKey[connector_id].lineStyle = {
        shadowBlur: 5,
        shadowColor: "#e68a00"
      };
      let conn = state.connectorNewKey[connector_id];
      state.dataDiagramNew[conn.head.table_id].coloumns[
        conn.head.coloumn_id
      ].style = {
        shadowBlur: 5,
        shadowColor: "#e68a00"
      };
      state.dataDiagramNew[conn.tail.table_id].coloumns[
        conn.tail.coloumn_id
      ].style = {
        shadowBlur: 5,
        shadowColor: "#e68a00"
      };
    } else {
      state.connectorNewKey[connector_id].lineStyle = {
        shadowBlur: 2,
        shadowColor: "#555555"
      };
      let conn = state.connectorNewKey[connector_id];
      state.dataDiagramNew[conn.head.table_id].coloumns[
        conn.head.coloumn_id
      ].style = {
        shadowBlur: 0,
        shadowColor: "#e68a00"
      };
      state.dataDiagramNew[conn.tail.table_id].coloumns[
        conn.tail.coloumn_id
      ].style = {
        shadowBlur: 0,
        shadowColor: "#e68a00"
      };
    }
  },
  setTableKeyConfig(state, tableKeyConfig) {
    state.visibleConfigTable = true;
    state.tableKeyConfig = tableKeyConfig;
  },
  updateTableName(state, raw) {
    state.dataDiagramNew[raw.table_id].table_name = raw.tableNewName;

    // save table
    state.isSaved = false;
  },
  deleteColoumn(state, raw) {
    var coloumn_id = raw.coloumn_id;
    var table_id = raw.table_id;
    var coloumnObj = state.dataDiagramNew[table_id].coloumns[coloumn_id];
    if (
      coloumnObj.association_belong_id === null &&
      coloumnObj.association_has_id.length === 0
    ) {
      Vue.delete(state.dataDiagramNew[table_id].coloumns, coloumn_id);
    } else if (
      coloumnObj.association_belong_id !== null &&
      coloumnObj.association_has_id.length === 0
    ) {
      let assocObj =
        state.dataDiagramNew[table_id].association[
          coloumnObj.association_belong_id
        ];
      // Delete association source key
      Vue.delete(
        state.dataDiagramNew[
          state.connectorNewKey[assocObj.connector_id].head.table_id
        ].association,
        state.connectorNewKey[assocObj.connector_id].head.association_id
      );
      // Delete association_has_id linking
      var count = 0;
      var association_has_idArray =
        state.dataDiagramNew[
          state.connectorNewKey[assocObj.connector_id].head.table_id
        ].coloumns[state.connectorNewKey[assocObj.connector_id].head.coloumn_id]
          .association_has_id;

      for (var o = 0; o < association_has_idArray.length; o++) {
        if (
          association_has_idArray[o] ===
          state.connectorNewKey[assocObj.connector_id].head.association_id
        ) {
          association_has_idArray.splice(count, 1);
          break;
        }
        count++;
      }

      // Delete association foreign key
      Vue.delete(
        state.dataDiagramNew[table_id].association,
        coloumnObj.association_belong_id
      );
      // Delete connector
      Vue.delete(state.connectorNewKey, assocObj.connector_id);
      // Delete coloumn
      Vue.delete(state.dataDiagramNew[table_id].coloumns, coloumn_id);
    } else if (
      coloumnObj.association_belong_id === null &&
      coloumnObj.association_has_id.length > 0
    ) {
      coloumnObj.association_has_id.forEach(association_has_id => {
        var assocObj =
          state.dataDiagramNew[table_id].association[association_has_id];
        // reset association_belong_id to null  foreignkey=false
        var coloumnForeignKeyObj =
          state.dataDiagramNew[
            state.connectorNewKey[assocObj.connector_id].tail.table_id
          ].coloumns[
            state.connectorNewKey[assocObj.connector_id].tail.coloumn_id
          ];
        coloumnForeignKeyObj.association_belong_id = null;
        coloumnForeignKeyObj.foreignKey = false;

        // Delete association foreign key
        Vue.delete(
          state.dataDiagramNew[
            state.connectorNewKey[assocObj.connector_id].tail.table_id
          ].association,
          state.connectorNewKey[assocObj.connector_id].tail.association_id
        );
        // Delete association source key
        Vue.delete(
          state.dataDiagramNew[table_id].association,
          association_has_id
        );
        // Delete connector
        Vue.delete(state.connectorNewKey, assocObj.connector_id);
      });
      // Delete coloumn
      Vue.delete(state.dataDiagramNew[table_id].coloumns, coloumn_id);
    } else if (
      coloumnObj.association_belong_id !== null &&
      coloumnObj.association_has_id.length > 0
    ) {
      // asscotiationSourceObj pointer
      let assocBelongObj =
        state.dataDiagramNew[table_id].association[
          coloumnObj.association_belong_id
        ];
      let asscotiationSourceObj =
        state.dataDiagramNew[
          state.connectorNewKey[assocBelongObj.connector_id].head.table_id
        ].association;
      let asscotiationSourceKey_id =
        state.connectorNewKey[assocBelongObj.connector_id].head.association_id;

      coloumnObj.association_has_id.forEach(association_has_id => {
        let assocHasObj =
          state.dataDiagramNew[table_id].association[association_has_id];
        // reset association_belong_id to null  foreignkey=false
        var coloumnForeignKeyObj =
          state.dataDiagramNew[
            state.connectorNewKey[assocHasObj.connector_id].tail.table_id
          ].coloumns[
            state.connectorNewKey[assocHasObj.connector_id].tail.coloumn_id
          ];
        coloumnForeignKeyObj.association_belong_id = null;
        coloumnForeignKeyObj.foreignKey = false;

        // Delete association foreign key
        Vue.delete(
          state.dataDiagramNew[
            state.connectorNewKey[assocHasObj.connector_id].tail.table_id
          ].association,
          state.connectorNewKey[assocHasObj.connector_id].tail.association_id
        );
        // Delete association source key
        Vue.delete(
          state.dataDiagramNew[table_id].association,
          association_has_id
        );
        // Delete connector
        Vue.delete(state.connectorNewKey, assocHasObj.connector_id);
      });

      // Delete association source key
      Vue.delete(asscotiationSourceObj, asscotiationSourceKey_id);

      // Delete association_has_id linking
      let count = 0;
      let association_has_idArray =
        state.dataDiagramNew[
          state.connectorNewKey[assocBelongObj.connector_id].head.table_id
        ].coloumns[
          state.connectorNewKey[assocBelongObj.connector_id].head.coloumn_id
        ].association_has_id;

      for (let o = 0; o < association_has_idArray.length; o++) {
        if (
          association_has_idArray[o] ===
          state.connectorNewKey[assocBelongObj.connector_id].head.association_id
        ) {
          association_has_idArray.splice(count, 1);
          break;
        }
        count++;
      }

      // Delete association foreign key
      Vue.delete(
        state.dataDiagramNew[table_id].association,
        coloumnObj.association_belong_id
      );
      // Delete connector
      Vue.delete(state.connectorNewKey, assocBelongObj.connector_id);

      // Delete coloumn
      Vue.delete(state.dataDiagramNew[table_id].coloumns, coloumn_id);
    }

    // save table
    state.isSaved = false;
  },
  setConfigTable(state, tableName) {
    state.configTable.tableName = tableName;
    state.configTable.properties = state.dataDiagram[tableName];
    state.visibleConfigTable = true;
  },
  setVisibleConfigTable(state, val) {
    state.visibleConfigTable = val;
  },
  async updateColoumnName(state, raw) {
    var tableKey_id = raw.tableKey_id;
    var coloumn_id = raw.coloumn_id;
    var newName = raw.newName;
    state.dataDiagramNew[tableKey_id].coloumns[
      coloumn_id
    ].coloumn_name = newName;

    //-------- get max character ----------------
    var coloumns = state.dataDiagramNew[tableKey_id].coloumns;
    var maxCharacter = 0;
    Object.keys(coloumns).forEach(coloumnKey => {
      if (maxCharacter < coloumns[coloumnKey].coloumn_name.length) {
        maxCharacter = coloumns[coloumnKey].coloumn_name.length;
      }
    });

    var newWidth = 150;
    var countCharacter = maxCharacter;
    // // eslint-disable-next-line
    // console.log('width table '+countCharacter)
    if (countCharacter > 5) {
      newWidth = 150 + (countCharacter - 5) * 7;
    }

    state.dataDiagramNew[tableKey_id].widthTable = newWidth;
    /**
     * ###################################################
     * ---------------------------------------------------
     * Change arrow connector
     * ---------------------------------------------------
     * ###################################################
     */

    var tableKey = tableKey_id;
    var draggedTable = state.dataDiagramNew[tableKey];

    await Object.keys(draggedTable.association).forEach(key => {
      let conn =
        state.connectorNewKey[draggedTable.association[key].connector_id];
      var targetTable =
        state.dataDiagramNew[draggedTable.association[key].table_id];

      var tmp = [];
      // Tail is has a arrow pointer
      if (draggedTable.association[key].type === "belong") {
        var headX =
          draggedTable.point.x + draggedTable.association[key].point.x;
        var headY =
          draggedTable.point.y + draggedTable.association[key].point.y;

        let tailX = conn.points[6];
        let tailY = conn.points[7];
        var centralX;

        // System router draggable
        if (
          draggedTable.point.x > targetTable.point.x &&
          draggedTable.point.x < targetTable.point.x + targetTable.widthTable
        ) {
          tailX = targetTable.point.x;
          centralX = tailX - Math.abs(headX - tailX) / 2;
        } else if (draggedTable.point.x < targetTable.point.x) {
          if (
            draggedTable.point.x + draggedTable.widthTable <
            targetTable.point.x
          ) {
            headX = draggedTable.point.x + draggedTable.widthTable;
            centralX = headX + Math.abs(headX - tailX) / 2;
          } else {
            tailX = targetTable.point.x;
            centralX = headX - Math.abs(headX - tailX) / 2;
          }
        } else {
          tailX = targetTable.point.x + targetTable.widthTable;
          centralX = headX - Math.abs(headX - tailX) / 2;
        }
        // End System router draggable

        tmp = [headX, headY, centralX, headY, centralX, tailY, tailX, tailY];
      } else if (draggedTable.association[key].type === "has") {
        var tailX =
          draggedTable.point.x + draggedTable.association[key].point.x;
        var tailY =
          draggedTable.point.y + draggedTable.association[key].point.y;
        let headX = conn.points[0];
        let headY = conn.points[1];

        let centralX = headX - Math.abs(headX - tailX) / 2;
        // System router draggable
        if (
          draggedTable.point.x > targetTable.point.x &&
          draggedTable.point.x < targetTable.point.x + targetTable.widthTable
        ) {
          headX = targetTable.point.x;
          tailX = draggedTable.point.x;
          centralX = headX - Math.abs(headX - tailX) / 2;
        } else if (draggedTable.point.x < targetTable.point.x) {
          if (
            draggedTable.point.x + draggedTable.widthTable <
            targetTable.point.x
          ) {
            tailX = draggedTable.point.x + draggedTable.widthTable;
            centralX = tailX + Math.abs(headX - tailX) / 2;
          } else {
            tailX = draggedTable.point.x;
            headX = targetTable.point.x;
            centralX = tailX - Math.abs(headX - tailX) / 2;
          }
        } else {
          headX = targetTable.point.x + targetTable.widthTable;
          tailX = draggedTable.point.x;
          centralX = tailX - Math.abs(headX - tailX) / 2;
        }
        // End System router draggable

        tmp = [headX, headY, centralX, headY, centralX, tailY, tailX, tailY];
      }
      conn.points = tmp;
    });

    // save table
    state.isSaved = false;
  },
  async updateDataType(state, raw) {
    var tableKey_id = raw.tableKey_id;
    var coloumn_id = raw.coloumn_id;
    var newDataType = raw.newDataType;
    state.dataDiagramNew[tableKey_id].coloumns[
      coloumn_id
    ].dataType = newDataType;

    // save table
    state.isSaved = false;
  },
  async updatePrimaryKey(state, raw) {
    var tableKey_id = raw.tableKey_id;
    var coloumn_id = raw.coloumn_id;
    var primaryKey = raw.primaryKey;
    state.dataDiagramNew[tableKey_id].coloumns[
      coloumn_id
    ].primaryKey = primaryKey;

    // save table
    state.isSaved = false;
  },
  async updateAllowNull(state, raw) {
    var tableKey_id = raw.tableKey_id;
    var coloumn_id = raw.coloumn_id;
    var notNull = raw.notNull;
    state.dataDiagramNew[tableKey_id].coloumns[coloumn_id].notNull = notNull;

    // save table
    state.isSaved = false;
  },

  async UPDATE_DEFAULT_VALUE(state, raw) {
    var tableKey_id = raw.tableKey_id;
    var coloumn_id = raw.coloumn_id;
    var default_value = raw.default_value;
    state.dataDiagramNew[tableKey_id].coloumns[coloumn_id].default = default_value;

    // save table
    state.isSaved = false;
  },  

  async UPDATE_COMMENT(state, raw) {
    var tableKey_id = raw.tableKey_id;
    var coloumn_id = raw.coloumn_id;
    var comment = raw.comment;
    state.dataDiagramNew[tableKey_id].coloumns[coloumn_id].comment = comment;

    // save table
    state.isSaved = false;
  },    
  async updateForeignKeyStatus(state, raw) {
    var tableKey_id = raw.tableKey_id;
    var coloumn_id = raw.coloumn_id;
    var foreignKey = raw.foreignKey;
    if (foreignKey === true) {
      state.dataDiagramNew[tableKey_id].coloumns[
        coloumn_id
      ].foreignKey = foreignKey;
    } else {
      state.dataDiagramNew[tableKey_id].coloumns[
        coloumn_id
      ].foreignKey = foreignKey;
      // association foreign key
      var assocForeignKeyObj =
        state.dataDiagramNew[tableKey_id].association[
          state.dataDiagramNew[tableKey_id].coloumns[coloumn_id]
            .association_belong_id
        ];

      // connector
      var connObj = state.connectorNewKey[assocForeignKeyObj.connector_id];

      // delete assoctiation source key
      Vue.delete(
        state.dataDiagramNew[connObj.head.table_id].association,
        connObj.head.association_id
      );
      // eslint-disable-next-line
      // console.log("delete assoc " + connObj.head.association_id);

      // delete connector
      Vue.delete(state.connectorNewKey, assocForeignKeyObj.connector_id);

      // delete foreign key assoc
      Vue.delete(
        state.dataDiagramNew[tableKey_id].association,
        state.dataDiagramNew[tableKey_id].coloumns[coloumn_id]
          .association_belong_id
      );
      state.dataDiagramNew[tableKey_id].coloumns[
        coloumn_id
      ].association_belong_id = null;
    }

    // save table
    state.isSaved = false;
  },
  async updateUnique(state, raw) {
    var tableKey_id = raw.tableKey_id;
    var coloumn_id = raw.coloumn_id;
    var unique = raw.unique;
    state.dataDiagramNew[tableKey_id].coloumns[coloumn_id].unique = unique;

    // save table
    state.isSaved = false;
  },
  async updateUnsigned(state, raw) {
    var tableKey_id = raw.tableKey_id;
    var coloumn_id = raw.coloumn_id;
    var unsigned = raw.unsigned;
    state.dataDiagramNew[tableKey_id].coloumns[coloumn_id].unsigned = unsigned;

    // save table
    state.isSaved = false;
  },
  async updateAutoIncrement(state, raw) {
    var tableKey_id = raw.tableKey_id;
    var coloumn_id = raw.coloumn_id;
    var autoIncrement = raw.autoIncrement;
    state.dataDiagramNew[tableKey_id].coloumns[
      coloumn_id
    ].autoIncrement = autoIncrement;

    // save table
    state.isSaved = false;
  },
  async updateAssociationBelongColoumnName(state, raw) {
    var association_id = raw.association_id;
    var selectedNewColoumn_id = raw.selectedNewColoumn_id;
    var table_id = raw.table_id;

    var assocObject =
      state.dataDiagramNew[table_id].association[association_id];

    // remove association_has_id who point to assoc has type because connection is change from old coloumn
    var association_has_idArray =
      state.dataDiagramNew[
        state.connectorNewKey[assocObject.connector_id].head.table_id
      ].coloumns[
        state.connectorNewKey[assocObject.connector_id].head.coloumn_id
      ].association_has_id;
    for (var i = 0; i < association_has_idArray.length; i++) {
      if (
        association_has_idArray[i] ===
        state.connectorNewKey[assocObject.connector_id].head.association_id
      ) {
        association_has_idArray.splice(i, 1);
        break;
      }
    }

    // add association_has_id in new coloumn connection
    state.dataDiagramNew[
      state.connectorNewKey[assocObject.connector_id].head.table_id
    ].coloumns[selectedNewColoumn_id].association_has_id.push(
      state.connectorNewKey[assocObject.connector_id].head.association_id
    );

    //change in this asscotiation table below always
    assocObject.targetKey_id = selectedNewColoumn_id;
    //change in connector
    var connObject = state.connectorNewKey[assocObject.connector_id];
    state.connectorNewKey[
      assocObject.connector_id
    ].head.coloumn_id = selectedNewColoumn_id;

    //change in target key has owner ship
    state.dataDiagramNew[connObject.head.table_id].association[
      connObject.head.association_id
    ].sourceKey_id = selectedNewColoumn_id;

    // change coordinate
    var YpointSourceKey = 40;
    var count = 0;
    Object.keys(
      state.dataDiagramNew[connObject.head.table_id].coloumns
    ).forEach(keyColoumnId => {
      if (keyColoumnId === selectedNewColoumn_id) {
        YpointSourceKey += count * 20;
      }
      count++;
    });
    state.dataDiagramNew[connObject.head.table_id].association[
      connObject.head.association_id
    ].point.y = YpointSourceKey;

    /**
     * change  route connector for reactive
     */
    var draggedTable = state.dataDiagramNew[connObject.head.table_id];
    var targetTable = state.dataDiagramNew[table_id];
    var tailX =
      draggedTable.point.x +
      draggedTable.association[connObject.head.association_id].point.x;
    var tailY =
      draggedTable.point.y +
      draggedTable.association[connObject.head.association_id].point.y;
    let headX = connObject.points[0];
    let headY = connObject.points[1];

    let centralX = headX - Math.abs(headX - tailX) / 2;
    // System router draggable
    if (
      draggedTable.point.x > targetTable.point.x &&
      draggedTable.point.x < targetTable.point.x + 150
    ) {
      headX = targetTable.point.x;
      tailX = draggedTable.point.x;
      centralX = headX - Math.abs(headX - tailX) / 2;
    } else if (draggedTable.point.x < targetTable.point.x) {
      if (draggedTable.point.x + 150 < targetTable.point.x) {
        tailX = draggedTable.point.x + 150;
        centralX = tailX + Math.abs(headX - tailX) / 2;
      } else {
        tailX = draggedTable.point.x;
        headX = targetTable.point.x;
        centralX = tailX - Math.abs(headX - tailX) / 2;
      }
    } else {
      headX = targetTable.point.x + 150;
      tailX = draggedTable.point.x;
      centralX = tailX - Math.abs(headX - tailX) / 2;
    }
    // End System router draggable
    connObject.points = [
      headX,
      headY,
      centralX,
      headY,
      centralX,
      tailY,
      tailX,
      tailY
    ];
    /**
     * End change route connector for reactive
     */
    // save table
    state.isSaved = false;
  },
  addNewColoumn(state, raw) {
    // var association_id_foreignKey= raw.association_id
    // var table_id_source= raw.selectedNewTable
    var table_id = raw.table_id;
    var coloumn_name = raw.coloumn_name;
    var data_type = raw.data_type;
    var primaryKey = raw.primaryKey;
    var notNull = raw.notNull;
    var unique = raw.unique;
    var autoIncrement = raw.autoIncrement;
    var defaultValue = raw.default;
    var foreignKey = raw.foreignKey;
    var comment = raw.comment;
    // var refTable= raw.refTable
    // var refColoumn= raw.refColoumn
    var unsigned = raw.unsigned;

    Vue.set(state.dataDiagramNew[table_id].coloumns, uuidv4(), {
      coloumn_name: coloumn_name,
      comment: comment,
      dataType: data_type,
      default: defaultValue,
      primaryKey: primaryKey,
      notNull: notNull,
      unique: unique,
      foreignKey: foreignKey,
      unsigned: unsigned,
      zeroFill: false,
      autoIncrement: autoIncrement,
      style: {
        shadowBlur: 0,
        shadowColor: "green"
      },
      association_belong_id: null,
      association_has_id: []
    });

    // var coloumn_id_foreignKey=raw.thisForeignKey_id
    // save table
    state.isSaved = false;
  },
  async updateAssociationBelongTableName(state, raw) {
    var association_id_foreignKey = raw.association_id;
    var table_id_source = raw.selectedNewTable;
    var table_id_foreignKey = raw.table_id;
    var coloumn_id_foreignKey = raw.thisForeignKey_id;

    var YpointForeignKey = 40;
    var YpointSourceKey = 40;
    // var YpointForeignKey=state.dataDiagramNew[table_id_foreignKey]
    var count = 0;
    Object.keys(state.dataDiagramNew[table_id_foreignKey].coloumns).forEach(
      keyColoumnId => {
        if (keyColoumnId === coloumn_id_foreignKey) {
          YpointForeignKey += count * 20;
        }
        count++;
      }
    );

    if (
      association_id_foreignKey === undefined ||
      association_id_foreignKey === null
    ) {
      // eslint-disable-next-line
      // console.log("table_id_source " + table_id_source);
      let coloumn_id_default_sourceKey = Object.keys(
        state.dataDiagramNew[table_id_source].coloumns
      )[0];
      // eslint-disable-next-line
      // console.log(
      //   "coloumn_id_default_sourceKey " + coloumn_id_default_sourceKey
      // );
      let association_id_foreignKeyNew = "assoc_Foreign_" + uuidv4();
      let association_id_source = "assoc_Source_" + uuidv4();
      let connector_id = "conn_car_number_driver_id" + uuidv4();
      // create association in this table
      let tmpAssociation_id_foreignKeyNew = {
        connector_id: connector_id,
        type: "belong",
        table: table_id_source,
        table_id: table_id_source,
        foreignKey: coloumn_id_foreignKey,
        foreignKey_id: coloumn_id_foreignKey,
        targetKey: coloumn_id_default_sourceKey,
        targetKey_id: coloumn_id_default_sourceKey,
        point: {
          x: 0,
          y: YpointForeignKey
        }
      };
      // eslint-disable-next-line
      // console.log("table_id_foreignKey " + table_id_foreignKey);
      // eslint-disable-next-line
      // console.log(
      //   "association_id_foreignKeyNew " + association_id_foreignKeyNew
      // );
      Vue.set(
        state.dataDiagramNew[table_id_foreignKey].association,
        association_id_foreignKeyNew,
        tmpAssociation_id_foreignKeyNew
      );

      // create belong assoc in this table
      state.dataDiagramNew[table_id_foreignKey].coloumns[
        coloumn_id_foreignKey
      ].association_belong_id = association_id_foreignKeyNew;

      // create association in target table
      let tmpAssociation_id_source = {
        connector_id: connector_id,
        type: "has",
        table: table_id_foreignKey,
        table_id: table_id_foreignKey,
        foreignKey: coloumn_id_foreignKey,
        foreignKey_id: coloumn_id_foreignKey,
        sourceKey: "id",
        sourceKey_id: coloumn_id_default_sourceKey,
        point: {
          x: 0,
          y: YpointSourceKey
        }
      };
      Vue.set(
        state.dataDiagramNew[table_id_source].association,
        association_id_source,
        tmpAssociation_id_source
      );
      // add association_has_id
      state.dataDiagramNew[table_id_source].coloumns[
        coloumn_id_default_sourceKey
      ].association_has_id.push(association_id_source);

      /**
       * change  route connector for reactive
       */
      var draggedTable = state.dataDiagramNew[table_id_source];
      var targetTable = state.dataDiagramNew[table_id_foreignKey];
      var tailX =
        draggedTable.point.x +
        draggedTable.association[association_id_source].point.x;
      var tailY =
        draggedTable.point.y +
        draggedTable.association[association_id_source].point.y;
      let headX =
        state.dataDiagramNew[table_id_foreignKey].point.x +
        state.dataDiagramNew[table_id_foreignKey].association[
          association_id_foreignKeyNew
        ].point.x;
      let headY =
        state.dataDiagramNew[table_id_foreignKey].point.y +
        state.dataDiagramNew[table_id_foreignKey].association[
          association_id_foreignKeyNew
        ].point.y;

      let centralX = headX - Math.abs(headX - tailX) / 2;
      // System router draggable
      if (
        draggedTable.point.x > targetTable.point.x &&
        draggedTable.point.x < targetTable.point.x + 150
      ) {
        headX = targetTable.point.x;
        tailX = draggedTable.point.x;
        centralX = headX - Math.abs(headX - tailX) / 2;
      } else if (draggedTable.point.x < targetTable.point.x) {
        if (draggedTable.point.x + 150 < targetTable.point.x) {
          tailX = draggedTable.point.x + 150;
          centralX = tailX + Math.abs(headX - tailX) / 2;
        } else {
          tailX = draggedTable.point.x;
          headX = targetTable.point.x;
          centralX = tailX - Math.abs(headX - tailX) / 2;
        }
      } else {
        headX = targetTable.point.x + 150;
        tailX = draggedTable.point.x;
        centralX = tailX - Math.abs(headX - tailX) / 2;
      }
      // End System router draggable
      var points = [
        headX,
        headY,
        centralX,
        headY,
        centralX,
        tailY,
        tailX,
        tailY
      ];
      /**
       * End change route connector for reactive
       */

      var tmpConnector = {
        // head is has
        head: {
          table: table_id_source,
          table_id: table_id_source,
          coloumn: "id",
          coloumn_id: coloumn_id_default_sourceKey,
          association_id: association_id_source
        },
        // tail is belong
        tail: {
          table: "Driver",
          table_id: table_id_foreignKey,
          coloumn: "car_id",
          coloumn_id: coloumn_id_foreignKey,
          association_id: association_id_foreignKeyNew
        },
        points: points,
        lineStyle: {
          shadowBlur: 5,
          shadowColor: "green"
        }
      };
      Vue.set(state.connectorNewKey, connector_id, tmpConnector);
      // eslint-disable-next-line
      // console.log(JSON.stringify(state.dataDiagramNew[table_id_source]));
    } else {
      var assocOBJ_foreignKey =
        state.dataDiagramNew[table_id_foreignKey].association[
          association_id_foreignKey
        ];

      let coloumn_id_default_sourceKey = Object.keys(
        state.dataDiagramNew[table_id_source].coloumns
      )[0];
      var newAssoctioation_id = "assoc_Source_" + uuidv4();
      var assocObj_source_id =
        state.connectorNewKey[assocOBJ_foreignKey.connector_id].head
          .association_id;
      var tableObj_source_id =
        state.connectorNewKey[assocOBJ_foreignKey.connector_id].head.table_id;
      var coloumnObj_source_id =
        state.connectorNewKey[assocOBJ_foreignKey.connector_id].head.coloumn_id;

      // remove association_has_id coloumn in source coloumn
      var association_has_idArray =
        state.dataDiagramNew[tableObj_source_id].coloumns[coloumnObj_source_id]
          .association_has_id;
      for (var i = 0; i < association_has_idArray.length; i++) {
        if (association_has_idArray[i] === assocObj_source_id) {
          association_has_idArray.splice(i, 1);
          break;
        }
      }
      // add new association_has_id
      state.dataDiagramNew[table_id_source].coloumns[
        coloumn_id_default_sourceKey
      ].association_has_id.push(newAssoctioation_id);

      // delete source table assoc
      delete state.dataDiagramNew[tableObj_source_id].association[
        assocObj_source_id
      ];

      // change association data target table_id
      assocOBJ_foreignKey.table_id = table_id_source;

      //change coloumn target to index 0
      var selectedColoumnDefault_id = Object.keys(
        state.dataDiagramNew[table_id_source].coloumns
      )[0];
      assocOBJ_foreignKey.targetKey_id = selectedColoumnDefault_id;

      // change coloumn connector
      state.connectorNewKey[
        assocOBJ_foreignKey.connector_id
      ].head.coloumn_id = selectedColoumnDefault_id;
      // change table connector
      state.connectorNewKey[
        assocOBJ_foreignKey.connector_id
      ].head.table_id = table_id_source;

      // renew asscotiation id
      state.connectorNewKey[
        assocOBJ_foreignKey.connector_id
      ].head.association_id = newAssoctioation_id;
      // chreate new
      // state.dataDiagramNew[table_id_source].association[newAssoctioation_id]
      Vue.set(
        state.dataDiagramNew[table_id_source].association,
        newAssoctioation_id,
        {
          connector_id: assocOBJ_foreignKey.connector_id,
          type: "has",
          table: "Driver",
          table_id: table_id_foreignKey,
          foreignKey: "Car_id",
          foreignKey_id: assocOBJ_foreignKey.foreignKey_id,
          sourceKey: "id",
          sourceKey_id: assocOBJ_foreignKey.targetKey_id,
          point: {
            x: 0,
            y: YpointSourceKey
          }
        }
      );

      let conn =
        state.connectorNewKey[
          state.dataDiagramNew[table_id_foreignKey].association[
            association_id_foreignKey
          ].connector_id
        ];

      conn.tail.table_id = table_id_foreignKey;

      /**
       * change  route connector for reactive
       */
      let draggedTable = state.dataDiagramNew[table_id_source];
      let targetTable = state.dataDiagramNew[table_id_foreignKey];
      let tailX =
        draggedTable.point.x +
        draggedTable.association[newAssoctioation_id].point.x;
      let tailY =
        draggedTable.point.y +
        draggedTable.association[newAssoctioation_id].point.y;
      let headX =
        state.dataDiagramNew[table_id_foreignKey].point.x +
        state.dataDiagramNew[table_id_foreignKey].association[
          association_id_foreignKey
        ].point.x;
      let headY =
        state.dataDiagramNew[table_id_foreignKey].point.y +
        state.dataDiagramNew[table_id_foreignKey].association[
          association_id_foreignKey
        ].point.y;

      let centralX = headX - Math.abs(headX - tailX) / 2;
      // System router draggable
      if (
        draggedTable.point.x > targetTable.point.x &&
        draggedTable.point.x < targetTable.point.x + 150
      ) {
        headX = targetTable.point.x;
        tailX = draggedTable.point.x;
        centralX = headX - Math.abs(headX - tailX) / 2;
      } else if (draggedTable.point.x < targetTable.point.x) {
        if (draggedTable.point.x + 150 < targetTable.point.x) {
          tailX = draggedTable.point.x + 150;
          centralX = tailX + Math.abs(headX - tailX) / 2;
        } else {
          tailX = draggedTable.point.x;
          headX = targetTable.point.x;
          centralX = tailX - Math.abs(headX - tailX) / 2;
        }
      } else {
        headX = targetTable.point.x + 150;
        tailX = draggedTable.point.x;
        centralX = tailX - Math.abs(headX - tailX) / 2;
      }
      // End System router draggable
      conn.points = [
        headX,
        headY,
        centralX,
        headY,
        centralX,
        tailY,
        tailX,
        tailY
      ];
      /**
       * End change route connector for reactive
       */
    }

    // save table
    state.isSaved = false;
  },
  setLineStyleConnector(state, raw) {
    state.connectorNewKey[raw.key] = raw.style;
  },
  deleteTable(state, raw) {
    var table_id = raw.table_id;
    Object.keys(state.dataDiagramNew[table_id].coloumns).forEach(coloumn_id => {
      var coloumnObj = state.dataDiagramNew[table_id].coloumns[coloumn_id];
      if (
        coloumnObj.association_belong_id === null &&
        coloumnObj.association_has_id.length === 0
      ) {
        Vue.delete(state.dataDiagramNew[table_id].coloumns, coloumn_id);
      } else if (
        coloumnObj.association_belong_id !== null &&
        coloumnObj.association_has_id.length === 0
      ) {
        let assocObj =
          state.dataDiagramNew[table_id].association[
            coloumnObj.association_belong_id
          ];
        // Delete association source key
        Vue.delete(
          state.dataDiagramNew[
            state.connectorNewKey[assocObj.connector_id].head.table_id
          ].association,
          state.connectorNewKey[assocObj.connector_id].head.association_id
        );
        // Delete assoctiation source connector
        var count = 0;
        var association_has_idArray =
          state.dataDiagramNew[
            state.connectorNewKey[assocObj.connector_id].head.table_id
          ].coloumns[
            state.connectorNewKey[assocObj.connector_id].head.coloumn_id
          ].association_has_id;

        for (var o = 0; o < association_has_idArray.length; o++) {
          if (
            association_has_idArray[o] ===
            state.connectorNewKey[assocObj.connector_id].head.association_id
          ) {
            association_has_idArray.splice(count, 1);
            break;
          }
          count++;
        }

        // Delete association foreign key
        Vue.delete(
          state.dataDiagramNew[table_id].association,
          coloumnObj.association_belong_id
        );
        // Delete connector
        Vue.delete(state.connectorNewKey, assocObj.connector_id);
        // Delete coloumn
        Vue.delete(state.dataDiagramNew[table_id].coloumns, coloumn_id);
      } else if (
        coloumnObj.association_belong_id === null &&
        coloumnObj.association_has_id.length > 0
      ) {
        coloumnObj.association_has_id.forEach(association_has_id => {
          var assocObj =
            state.dataDiagramNew[table_id].association[association_has_id];
          // reset association_belong_id to null  foreignkey=false
          var coloumnForeignKeyObj =
            state.dataDiagramNew[
              state.connectorNewKey[assocObj.connector_id].tail.table_id
            ].coloumns[
              state.connectorNewKey[assocObj.connector_id].tail.coloumn_id
            ];
          coloumnForeignKeyObj.association_belong_id = null;
          coloumnForeignKeyObj.foreignKey = false;

          // Delete association foreign key
          Vue.delete(
            state.dataDiagramNew[
              state.connectorNewKey[assocObj.connector_id].tail.table_id
            ].association,
            state.connectorNewKey[assocObj.connector_id].tail.association_id
          );
          // Delete association source key
          Vue.delete(
            state.dataDiagramNew[table_id].association,
            association_has_id
          );
          // Delete connector
          Vue.delete(state.connectorNewKey, assocObj.connector_id);
        });
        // Delete coloumn
        Vue.delete(state.dataDiagramNew[table_id].coloumns, coloumn_id);
      } else if (
        coloumnObj.association_belong_id !== null &&
        coloumnObj.association_has_id.length > 0
      ) {
        // asscotiationSourceObj pointer
        let assocBelongObj =
          state.dataDiagramNew[table_id].association[
            coloumnObj.association_belong_id
          ];
        let asscotiationSourceObj =
          state.dataDiagramNew[
            state.connectorNewKey[assocBelongObj.connector_id].head.table_id
          ].association;
        let asscotiationSourceKey_id =
          state.connectorNewKey[assocBelongObj.connector_id].head
            .association_id;

        coloumnObj.association_has_id.forEach(association_has_id => {
          let assocHasObj =
            state.dataDiagramNew[table_id].association[association_has_id];
          // reset association_belong_id to null  foreignkey=false
          var coloumnForeignKeyObj =
            state.dataDiagramNew[
              state.connectorNewKey[assocHasObj.connector_id].tail.table_id
            ].coloumns[
              state.connectorNewKey[assocHasObj.connector_id].tail.coloumn_id
            ];
          coloumnForeignKeyObj.association_belong_id = null;
          coloumnForeignKeyObj.foreignKey = false;

          // Delete association foreign key
          Vue.delete(
            state.dataDiagramNew[
              state.connectorNewKey[assocHasObj.connector_id].tail.table_id
            ].association,
            state.connectorNewKey[assocHasObj.connector_id].tail.association_id
          );
          // Delete association source key
          Vue.delete(
            state.dataDiagramNew[table_id].association,
            association_has_id
          );
          // Delete connector
          Vue.delete(state.connectorNewKey, assocHasObj.connector_id);
        });

        // Delete association source key
        Vue.delete(asscotiationSourceObj, asscotiationSourceKey_id);

        // Delete assoctiation source connector
        let count = 0;
        let association_has_idArray =
          state.dataDiagramNew[
            state.connectorNewKey[assocBelongObj.connector_id].head.table_id
          ].coloumns[
            state.connectorNewKey[assocBelongObj.connector_id].head.coloumn_id
          ].association_has_id;

        for (let o = 0; o < association_has_idArray.length; o++) {
          if (
            association_has_idArray[o] ===
            state.connectorNewKey[assocBelongObj.connector_id].head
              .association_id
          ) {
            association_has_idArray.splice(count, 1);
            break;
          }
          count++;
        }

        // Delete association foreign key
        Vue.delete(
          state.dataDiagramNew[table_id].association,
          coloumnObj.association_belong_id
        );
        // Delete connector
        Vue.delete(state.connectorNewKey, assocBelongObj.connector_id);

        // Delete coloumn
        Vue.delete(state.dataDiagramNew[table_id].coloumns, coloumn_id);
      }
    });

    Vue.delete(state.dataDiagramNew, table_id);
    // save table
    state.isSaved = false;
  },
  addNewTable(state) {
    // state.dataDiagramNew[uuidv4()]={}
    let table_id = uuidv4();
    Vue.set(state.dataDiagramNew, table_id, {
      table_name: "",
      widthTable: 150,
      heightTable: 0,
      point: {
        x: 30,
        y: 110
      },
      coloumns: {
        coloumn_car_id_885ddad7_c509_4d5e_ab2e_dc5cb06d0e35: {
          coloumn_name: "id",
          comment: "",
          dataType: "integer",
          default: "",
          primaryKey: true,
          notNull: false,
          unique: false,
          foreignKey: false,
          unsigned: false,
          zeroFill: false,
          autoIncrement: true,
          style: {
            shadowBlur: 0,
            shadowColor: "green"
          },
          association_belong_id: null,
          association_has_id: []
        }
        // coloumn_car_id_85ddad7_c509_4d5e_ab2e_dc5cb06d0e35: {
        //   coloumn_name: "id",
        //   comment: "",
        //   dataType: "integer(31)",
        //   default: "",
        //   primaryKey: true,
        //   notNull: false,
        //   unique: false,
        //   foreignKey: false,
        //   unsigned: false,
        //   zeroFill: false,
        //   autoIncrement: false,
        //   style: {
        //     shadowBlur: 0,
        //     shadowColor: "green"
        //   },
        //   association_belong_id: null,
        //   association_has_id: []
        // }
      },
      association: {}
    });
    state.tableDetail.table_id = table_id;
    state.tableDetail.visible = true;
    state.tableDetail.isNewTable = true;
    state.tableDetail.isEditTableName = true;
    state.tableDetail.showDetailcoloumn = 0;

    // save table
    state.isSaved = false;
  },
  addNewTableWithPosition(state,position) {
    let table_id = uuidv4();
    Vue.set(state.dataDiagramNew, table_id, {
      table_name: "",
      widthTable: 150,
      heightTable: 0,
      point: {
        x: position.x,
        y: position.y
      },
      coloumns: {
        coloumn_car_id_885ddad7_c509_4d5e_ab2e_dc5cb06d0e35: {
          coloumn_name: "id",
          comment: "",
          dataType: "integer",
          default: "",
          primaryKey: true,
          notNull: false,
          unique: false,
          foreignKey: false,
          unsigned: false,
          zeroFill: false,
          autoIncrement: true,
          style: {
            shadowBlur: 0,
            shadowColor: "green"
          },
          association_belong_id: null,
          association_has_id: []
        }
      },
      association: {}
    });
    state.tableDetail.table_id = table_id;
    state.tableDetail.visible = true;
    state.tableDetail.isNewTable = true;
    state.tableDetail.isEditTableName = true;
    state.tableDetail.showDetailcoloumn = 0;

    // save table
    state.isSaved = false;
  },  
  setIsEditTableName(state, value) {
    state.tableDetail.isEditTableName = value;
  },
  setShowDetailTable(state, table_id) {
    state.tableDetail.table_id = table_id;
    state.tableDetail.showDetailcoloumn = -1;
    state.tableDetail.visible = true;
  },
  setShowDetailcoloumn(state, value) {
    state.tableDetail.showDetailcoloumn = value;
  },
  setVisibleDetailTable(state, visible) {
    state.tableDetail.visible = visible;
  },
  addNewEmptyColoumn(state, raw) {
    var table_id = raw.table_id;
    var coloumn_id = uuidv4();
    Vue.set(state.dataDiagramNew[table_id].coloumns, coloumn_id, {
      coloumn_name: "",
      comment: "",
      dataType: "",
      default: "",
      primaryKey: false,
      notNull: false,
      unique: false,
      foreignKey: false,
      unsigned: false,
      zeroFill: false,
      autoIncrement: false,
      style: {
        shadowBlur: 0,
        shadowColor: "green"
      },
      association_belong_id: null,
      association_has_id: []
    });

    // save table
    state.isSaved = false;
  },
  setConnector(state, data) {
    state.connectorNewKey = data;
  },
  setDiagram(state, data) {
    state.dataDiagramNew = data;
  },
  setProjectDescription(state, data) {
    state.projectDescription.id = data.id;
    state.projectDescription.uuid = data.uuid;
    state.projectDescription.title = data.title;
    state.projectDescription.description = data.description;
    state.projectDescription.likes = data.likes;
    state.projectDescription.viewers = data.viewers;
    state.projectDescription.share_status = data.share_status;
    state.projectDescription.share_link = data.share_link;
    state.projectDescription.password = data.password;
    state.projectDescription.user_id = data.user_id;
    state.projectDescription.created = data.created;
    state.projectDescription.updated = data.updated;
  },
  setProjectDescriptionShareStatus(state, value) {
    state.projectDescription.share_status = value;
  },
  setProjectDescriptionShareLink(state, value) {
    state.projectDescription.share_link = value;
  },
  deletedData(state) {
    state.projectDescription.id = null;
    state.projectDescription.uuid = null;
    state.projectDescription.title = null;
    state.projectDescription.description = null;
    state.projectDescription.likes = null;
    state.projectDescription.viewers = null;
    state.projectDescription.status_share = null;
    state.projectDescription.password = null;
    state.projectDescription.user_id = null;
    state.projectDescription.created = null;
    state.projectDescription.updated = null;
    state.dataDiagramNew = {};
    state.connectorNewKey = {};
  },
  SET_CANVAS_HEIGHT(state, val) {
    state.canvasProperties.height = val;
    // save table
    state.isSaved = false;    
  },
  SET_CANVAS_WIDTH(state, val) {
    state.canvasProperties.width = val;
    // save table
    state.isSaved = false;
  },
  SET_CANVAS_ZOOM(state, val){
    state.canvasProperties.zoom = val;
  },
  SET_CANVAS_PROPERTIES(state, data){
    state.canvasProperties=data
  },
  setIsSaved(state, value) {
    state.isSaved = value;
  },
  setSavedMessage(state, value) {
    state.savedMessage = value;
  }
};
