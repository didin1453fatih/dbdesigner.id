export default {
    /**
   *
   * @param {*} state
   * @param { value : value of x  and y } raw
   */
  async changeTablePotition(state, raw) {
    // eslint-disable-next-line
    console.log('table key '+JSON.stringify(raw))
    var val = raw.value;
    var tableKey = raw.tableKey;
    state.dataDiagramNew[tableKey].point.x = val.currentTarget.attrs.x;
    state.dataDiagramNew[tableKey].point.y = val.currentTarget.attrs.y;
    await Object.keys(state.dataDiagramNew[tableKey].association).forEach(key=>{
      let conn=state.connectorNewKey [
        state.dataDiagramNew[tableKey].association[key].connector_id
      ]
      var tmp=[]
      if(state.dataDiagramNew[tableKey].association[key].type==="belong"){
        tmp = [
          state.dataDiagramNew[tableKey].point.x+ state.dataDiagramNew[tableKey].association[key].point.x,
          state.dataDiagramNew[tableKey].point.y+ state.dataDiagramNew[tableKey].association[key].point.y,
          conn.points[0] - 30,
          conn.points[1] - 30,
          conn.points[4],
          conn.points[5]
        ];
      }else if(state.dataDiagramNew[tableKey].association[key].type==="has"){
        tmp = [
          conn.points[0],
          conn.points[1],
          conn.points[0] - 30,
          conn.points[1] - 30,
          state.dataDiagramNew[tableKey].point.x + state.dataDiagramNew[tableKey].association[key].point.x,
          state.dataDiagramNew[tableKey].point.y+ state.dataDiagramNew[tableKey].association[key].point.y,
        ];       
      }
      conn.points=tmp
    })
  },
    /**
   *
   * @param {*} state
   * @param {status: boolean, tableName: string} raw
   */
  highlightRelation(state, raw) {
    var status = raw.status;
    var tableKey = raw.tableKey;
    // eslint-disable-next-line
    console.log('status true '+tableKey)    
    Object.keys(state.dataDiagramNew[tableKey].association).forEach(key=>{
      if(state.dataDiagramNew[tableKey].association[key].type==="belong"){
        let foreignKeyId = state.dataDiagramNew[tableKey].association[key].foreignKey_id
        let targetKeyId = state.dataDiagramNew[tableKey].association[key].targetKey_id
        let targetTableId= state.dataDiagramNew[tableKey].association[key].table_id
        let connectorId=state.dataDiagramNew[tableKey].association[key].connector_id
        if(status===true){
          state.dataDiagramNew[tableKey].coloumns[foreignKeyId].style.shadowBlur = 5;
          state.dataDiagramNew[tableKey].coloumns[foreignKeyId].style.shadowColor = "green";

          state.dataDiagramNew[targetTableId].coloumns[targetKeyId].style.shadowBlur = 5;
          state.dataDiagramNew[targetTableId].coloumns[targetKeyId].style.shadowColor = "green";          

          state.connectorNewKey[connectorId].lineStyle.shadowBlur = 5;
          state.connectorNewKey[connectorId].lineStyle.shadowColor = "green";          
        }else if(status===false){
          state.dataDiagramNew[tableKey].coloumns[foreignKeyId].style.shadowBlur = 0;
          state.dataDiagramNew[targetTableId].coloumns[targetKeyId].style.shadowBlur = 0;
          state.connectorNewKey[connectorId].lineStyle.shadowBlur = 0;
        }
      }else if(state.dataDiagramNew[tableKey].association[key].type==="has"){
        let foreignKeyId = state.dataDiagramNew[tableKey].association[key].foreignKey_id
        let sourceKeyId = state.dataDiagramNew[tableKey].association[key].sourceKey_id
        let targetTableId= state.dataDiagramNew[tableKey].association[key].table_id
        let connectorId=state.dataDiagramNew[tableKey].association[key].connector_id
        if(status===true){
          state.dataDiagramNew[tableKey].coloumns[sourceKeyId].style.shadowBlur = 5;
          state.dataDiagramNew[tableKey].coloumns[sourceKeyId].style.shadowColor = "#00D2FF";

          state.dataDiagramNew[targetTableId].coloumns[foreignKeyId].style.shadowBlur = 5;
          state.dataDiagramNew[targetTableId].coloumns[foreignKeyId].style.shadowColor = "#00D2FF";

          state.connectorNewKey[connectorId].lineStyle.shadowBlur = 5;
          state.connectorNewKey[connectorId].lineStyle.shadowColor = "#00D2FF";
        }else if(status===false){
          state.dataDiagramNew[tableKey].coloumns[sourceKeyId].style.shadowBlur = 0;
          state.dataDiagramNew[targetTableId].coloumns[foreignKeyId].style.shadowBlur = 0;
          state.connectorNewKey[connectorId].lineStyle.shadowBlur = 0;
        }
      }
    })
  },
  setTableKeyConfig(state,tableKeyConfig ){
    state.visibleConfigTable = true;
    state.tableKeyConfig=tableKeyConfig
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
  },

  async updateColoumnName(state, raw){
    var tableKey_id=raw.tableKey_id
    var coloumn_id=raw.coloumn_id
    var newName= raw.newName
    state.dataDiagramNew[tableKey_id].coloumns[coloumn_id].coloumn_name=newName
  },
  async updatePrimaryKey(state,raw){
    var tableKey_id=raw.tableKey_id
    var coloumn_id=raw.coloumn_id
    var primaryKey= raw.primaryKey
    state.dataDiagramNew[tableKey_id].coloumns[coloumn_id].primaryKey=primaryKey
  },
  async updateAllowNull(state,raw){
    var tableKey_id=raw.tableKey_id
    var coloumn_id=raw.coloumn_id
    var notNull= raw.notNull
    state.dataDiagramNew[tableKey_id].coloumns[coloumn_id].notNull=notNull
  },
  async updateForeignKeyStatus(state, raw){
    var tableKey_id=raw.tableKey_id
    var coloumn_id=raw.coloumn_id
    var foreignKey= raw.foreignKey
    state.dataDiagramNew[tableKey_id].coloumns[coloumn_id].foreignKey=foreignKey
  },
  async updateUnique(state, raw){
    var tableKey_id=raw.tableKey_id
    var coloumn_id=raw.coloumn_id
    var unique= raw.unique
    state.dataDiagramNew[tableKey_id].coloumns[coloumn_id].unique=unique
  },
  async updateUnsigned(state, raw){
    var tableKey_id=raw.tableKey_id
    var coloumn_id=raw.coloumn_id
    var unsigned= raw.unsigned
    state.dataDiagramNew[tableKey_id].coloumns[coloumn_id].unsigned=unsigned
  },
  async updateAutoIncrement(state, raw){
    var tableKey_id=raw.tableKey_id
    var coloumn_id=raw.coloumn_id
    var autoIncrement= raw.autoIncrement
    state.dataDiagramNew[tableKey_id].coloumns[coloumn_id].autoIncrement=autoIncrement
  },
  async updateAssociationBelongTableName(state,raw) {
      var association_id= raw.association_id
      var selectedNewTable_id= raw.selectedNewTable
      var table_id= raw.table_id
      var oldTableTarget_id=state.dataDiagramNew[table_id].association[association_id].table_id
      // remove old asscotation table target
      state.dataDiagramNew[oldTableTarget_id].association[association_id]


      // change this table property
      state.dataDiagramNew[table_id].association[association_id].table_id=selectedNewTable_id
      // state.connectorNewKey[state.dataDiagramNew[table_id].association[association_id].connector_id].head.table_id=state.dataDiagramNew[table_id].association[association_id].table_id
      // this.updateAssociation
      // eslint-disable-next-line
      console.log(" | " + JSON.stringify(raw));
      // state.connectorNewKey.conn_2e1b6299_89bd_4b64_94b8_61d19a26fc34.head.table_id='table_885ddad7_c509_4d5e_ab2e_dc5cc06d0e38'
      // state.connectorNewKey.conn_2e1b6299_89bd_4b64_94b8_61d19a26fc34.head.coloumn_id='coloumn_885ddad7_c509_4d5e_ab2e_dc5cb06d0e34'
      // state.dataDiagramNew[tableKey].point.x
      
      let conn=state.connectorNewKey [
        state.dataDiagramNew[table_id].association[association_id].connector_id
      ]

      var tmp = [
        conn.points[0],
        conn.points[1],
        conn.points[0] - 30,
        conn.points[1] - 30,
        state.dataDiagramNew[selectedNewTable_id].point.x+state.dataDiagramNew[selectedNewTable_id].association[association_id].point.x,
        state.dataDiagramNew[selectedNewTable_id].point.y+state.dataDiagramNew[selectedNewTable_id].association[association_id].point.y,
      ];

      // state.dataDiagramNew[selectedNewTable_id].association[association_id].table_id=selectedNewTable_id
      conn.points=tmp
      conn.tail.table_id=table_id
    },
};

