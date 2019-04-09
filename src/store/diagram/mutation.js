export default {
  /**
   *
   * @param {*} state
   * @param { value : value of x  and y } raw
   */
  changeTablePotition(state, raw) {
    var val = raw.value;
    var tableName = raw.tableName;
    state.dataDiagram[tableName].potition.x = val.currentTarget.attrs.x;
    state.dataDiagram[tableName].potition.y = val.currentTarget.attrs.y;
    state.dataDiagram[tableName].association.forEach(async assoc => {
      if (assoc.type === "belong") {
        await state.connectorNew.forEach(async conn => {
          if (
            conn.tail.table === tableName &&
            assoc.foreignKey === conn.tail.coloumn
          ) {
            var tmp = [
              val.currentTarget.attrs.x + assoc.potition.x,
              val.currentTarget.attrs.y + assoc.potition.y,
              conn.points[0] - 30,
              conn.points[1] - 30,
              conn.points[4],
              conn.points[5]
            ];
            conn.points = tmp;
          }
        });
      } else if (assoc.type === "has") {
        await state.connectorNew.forEach(async conn => {
          if (
            conn.head.table === tableName &&
            assoc.sourceKey === conn.head.coloumn
          ) {
            var tmp = [
              conn.points[0],
              conn.points[1],
              conn.points[0] - 30,
              conn.points[1] - 30,
              val.currentTarget.attrs.x + assoc.potition.x,
              val.currentTarget.attrs.y + assoc.potition.y
            ];
            conn.points = tmp;
          }
        });
      }
    });
  },
  /**
   *
   * @param {*} state
   * @param {status: boolean, tableName: string} raw
   */
  highlightRelation(state, raw) {
    var status = raw.status;
    var tableName = raw.tableName;
    state.dataDiagram[tableName].association.forEach(async assoc => {
      if (assoc.type === "belong") {
        if (status === true) {
          state.dataDiagram[tableName].coloumns[
            assoc.foreignKey
          ].style.shadowBlur = 5;
          state.dataDiagram[tableName].coloumns[
            assoc.foreignKey
          ].style.shadowColor = "green";
          state.dataDiagram[assoc.table].coloumns[
            assoc.targetKey
          ].style.shadowBlur = 5;
          state.dataDiagram[assoc.table].coloumns[
            assoc.targetKey
          ].style.shadowColor = "green";
          await state.connectorNew.forEach(async conn => {
            if (
              conn.tail.table === tableName &&
              assoc.foreignKey === conn.tail.coloumn
            ) {
              conn.lineStyle.shadowBlur = 5;
              conn.lineStyle.shadowColor = "green";
            }
          });
        } else {
          state.dataDiagram[tableName].coloumns[
            assoc.foreignKey
          ].style.shadowBlur = 0;
          state.dataDiagram[assoc.table].coloumns[
            assoc.targetKey
          ].style.shadowBlur = 0;
          await state.connectorNew.forEach(async conn => {
            if (
              conn.tail.table === tableName &&
              assoc.foreignKey === conn.tail.coloumn
            ) {
              conn.lineStyle.shadowBlur = 0;
            }
          });
        }
      } else if (assoc.type === "has") {
        if (status === true) {
          state.dataDiagram[tableName].coloumns[
            assoc.sourceKey
          ].style.shadowBlur = 5;
          state.dataDiagram[tableName].coloumns[
            assoc.sourceKey
          ].style.shadowColor = "#00D2FF";
          state.dataDiagram[assoc.table].coloumns[
            assoc.foreignKey
          ].style.shadowBlur = 5;
          state.dataDiagram[assoc.table].coloumns[
            assoc.foreignKey
          ].style.shadowColor = "#00D2FF";
          await state.connectorNew.forEach(async conn => {
            if (
              conn.head.table === tableName &&
              assoc.sourceKey === conn.head.coloumn
            ) {
              conn.lineStyle.shadowBlur = 5;
              conn.lineStyle.shadowColor = "#00D2FF";
            }
          });
        } else {
          state.dataDiagram[tableName].coloumns[
            assoc.sourceKey
          ].style.shadowBlur = 0;
          state.dataDiagram[assoc.table].coloumns[
            assoc.foreignKey
          ].style.shadowBlur = 0;
          await state.connectorNew.forEach(async conn => {
            if (
              conn.head.table === tableName &&
              assoc.sourceKey === conn.head.coloumn
            ) {
              conn.lineStyle.shadowBlur = 0;
            }
          });
        }
      }
    });
  },
  setConfigTable(state, tableName) {
    state.configTable.tableName = tableName;
    state.configTable.properties = state.dataDiagram[tableName];
    state.visibleConfigTable = true;
  },
  setVisibleConfigTable(state, val) {
    state.visibleConfigTable = val;
  },
  /**
   *
   * @param {*} state
   * @param {*} raw
   * {
   *  oldColoumn: string
   *  tableName:string
   *  newColoumn : string
   * }
   */
  async updateColoumnTable(state, raw) {
    // async function loop(items, callback) {
    //   for (var a = 0; a < items.length; a++) {
    //     // eslint-disable-next-line
    //     await callback(items[a]);
    //   }
    // }

    var oldColoumn = raw.oldColoumn;
    var newColoumn = raw.newColoumn;
    var tableName = raw.tableName;

    for (var a = 0; a < state.dataDiagram[tableName].association.length; a++) {
      // eslint-disable-next-line
      if(state.dataDiagram[tableName].association[a].type==='belong'){
        if(state.dataDiagram[tableName].association[a].foreignKey===oldColoumn){
          state.dataDiagram[tableName].association[a].foreignKey=newColoumn
          // in this must change in asscociation table source
            for (var b=0; b<state.dataDiagram[state.dataDiagram[tableName].association[a].table].association.length;b++){
            if(state.dataDiagram[state.dataDiagram[tableName].association[a].table].association[b].type==='has'){
              if(state.dataDiagram[state.dataDiagram[tableName].association[a].table].association[b].table===tableName&&state.dataDiagram[state.dataDiagram[tableName].association[a].table].association[b].foreignKey===oldColoumn){
                state.dataDiagram[state.dataDiagram[tableName].association[a].table].association[b].foreignKey=newColoumn

                // for(var c=0;c<state.connectorNew.length;c++){
                //   if(
                //     state.connectorNew[c].tail.table===tableName&&
                //     state.connectorNew[c].tail.coloumn===oldColoumn &&

                //     state.connectorNew[c].head.table===state.dataDiagram[tableName].association[a].table&&
                //     state.connectorNew[c].head.coloumn===oldColoumn &&
                //     ){

                //     }
                // }
              }
            }
        }
      }
      
    }
  }
    // await loop(state.dataDiagram[tableName].association, async assoc=>{
    // // .forEach(
    //     if(assoc.type==='belong'){
    //       if(assoc.foreignKey===oldColoumn){
    //         assoc.foreignKey=newColoumn
    //         // in this must change in asscociation table source
    //         // await .forEach(
    //           await loop(state.dataDiagram[assoc.table].association, async assocSource=>{
    //           if(assocSource.type==='has'){
    //             if(assocSource.table===tableName&&assocSource.foreignKey===oldColoumn){
    //               assocSource.foreignKey=newColoumn
    //             }
    //           }

    //         })
    //       }
    //     }
    // })
    // eslint-disable-next-line
    console.log('before coloumn' + JSON.stringify(state.dataDiagram[tableName]))
    var tmpColoumn =JSON.parse(JSON.stringify(state.dataDiagram[tableName].coloumns[oldColoumn]))
    delete state.dataDiagram[tableName].coloumns[oldColoumn];
    state.dataDiagram[tableName].coloumns[newColoumn] = tmpColoumn;
    state.dataDiagram[tableName].potition.x++
    // eslint-disable-next-line
    // console.log('new coloumn' + JSON.stringify(state.dataDiagram[tableName]))
  }
};

