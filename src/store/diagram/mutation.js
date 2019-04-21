import Vue from 'vue'
import  uuidv4  from 'uuid/v4' 
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
    // eslint-disable-next-line
    console.log('state.dataDiagramNew[tableKey].association '+JSON.stringify(state.dataDiagramNew[tableKey].association))
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
  async highlightRelation(state, raw) {
    var status = raw.status;
    var tableKey = raw.tableKey;
    // eslint-disable-next-line
    console.log('status true '+tableKey)   
    // eslint-disable-next-line    
    console.log('data table assoc') 
    // eslint-disable-next-line    
    console.log(JSON.stringify(state.dataDiagramNew[tableKey].association))
    await Object.keys(state.dataDiagramNew[tableKey].association).forEach(key=>{
      if(state.dataDiagramNew[tableKey].association[key].type==="belong"){
        let foreignKeyId = state.dataDiagramNew[tableKey].association[key].foreignKey_id
        let targetKeyId = state.dataDiagramNew[tableKey].association[key].targetKey_id
        let targetTableId= state.dataDiagramNew[tableKey].association[key].table_id
        let connectorId=state.dataDiagramNew[tableKey].association[key].connector_id
        if(status===true){
          state.dataDiagramNew[tableKey].coloumns[foreignKeyId].style={
            shadowBlur: 5,
            shadowColor: "green"
          };

          state.dataDiagramNew[targetTableId].coloumns[targetKeyId].style={
            shadowBlur: 5,
            shadowColor: "green"
          };
          state.connectorNewKey[connectorId].lineStyle={
            shadowBlur: 5,
            shadowColor: "green"
          };
          // eslint-disable-next-line    
          console.log('state.connectorNewKey[connectorId] '+JSON.stringify(state.connectorNewKey[connectorId]))
        }else if(status===false){
          state.dataDiagramNew[tableKey].coloumns[foreignKeyId].style={
            shadowBlur: 0,
            shadowColor: "green"
          };
          state.dataDiagramNew[targetTableId].coloumns[targetKeyId].style={
            shadowBlur: 0,
            shadowColor: "green"
          };
          state.connectorNewKey[connectorId].lineStyle={
            shadowBlur: 0,
            shadowColor: "green"
          };

        }
      }else if(state.dataDiagramNew[tableKey].association[key].type==="has"){
        let foreignKeyId = state.dataDiagramNew[tableKey].association[key].foreignKey_id
        let sourceKeyId = state.dataDiagramNew[tableKey].association[key].sourceKey_id
        let targetTableId= state.dataDiagramNew[tableKey].association[key].table_id
        let connectorId=state.dataDiagramNew[tableKey].association[key].connector_id
        if(status===true){
          // eslint-disable-next-line
          console.log('hidupkan biru '+connectorId)          
          state.dataDiagramNew[tableKey].coloumns[sourceKeyId].style={
            shadowBlur: 5,
            shadowColor: "#00D2FF"
          };

          state.dataDiagramNew[targetTableId].coloumns[foreignKeyId].style={
            shadowBlur: 5,
            shadowColor: "#00D2FF"
          };

          state.connectorNewKey[connectorId].lineStyle={
            shadowBlur: 5,
            shadowColor: "#00D2FF"
          }
        }else if(status===false){
          // eslint-disable-next-line
          console.log('matikan biru')
          state.dataDiagramNew[tableKey].coloumns[sourceKeyId].style={
            shadowBlur: 0,
            shadowColor: "#00D2FF"
          };
          state.dataDiagramNew[targetTableId].coloumns[foreignKeyId].style={
            shadowBlur: 0,
            shadowColor: "#00D2FF"
          };
          state.connectorNewKey[connectorId].lineStyle={
            shadowBlur: 0,
            shadowColor: "#00D2FF"
          };
        }
      }
    })
  },
  setTableKeyConfig(state,tableKeyConfig ){
    state.visibleConfigTable = true;
    state.tableKeyConfig=tableKeyConfig
  },
  updateTableName(state, raw){
    state.dataDiagramNew[raw.table_id].table_name=raw.tableNewName
  },
  deleteColoumn(state, raw){
    var coloumn_id= raw.coloumn_id
    var table_id=raw.table_id
    var coloumnObj=state.dataDiagramNew[table_id].coloumns[coloumn_id]
    if(coloumnObj.association_belong_id===null&&coloumnObj.association_has_id.length===0){
      Vue.delete(state.dataDiagramNew[table_id].coloumns,coloumn_id)
    }
    else if(coloumnObj.association_belong_id!==null&&coloumnObj.association_has_id.length===0){
      var assocObj=state.dataDiagramNew[table_id].association[coloumnObj.association_belong_id]
      // Delete association source key 
      Vue.delete(
      state.dataDiagramNew[state.connectorNewKey[assocObj.connector_id].head.table_id].association ,
      state.connectorNewKey[assocObj.connector_id].head.association_id
      )
      // Delete association foreign key 
      Vue.delete(state.dataDiagramNew[table_id].association,coloumnObj.association_belong_id)
      // Delete connector
      Vue.delete(state.connectorNewKey,assocObj.connector_id)      
      // Delete coloumn
      Vue.delete(state.dataDiagramNew[table_id].coloumns,coloumn_id)
    } else if(coloumnObj.association_belong_id===null&&coloumnObj.association_has_id.length>0){
      coloumnObj.association_has_id.forEach(association_has_id=>{
        var assocObj=state.dataDiagramNew[table_id].association[association_has_id]
        // Delete association foreign key 
        Vue.delete(
        state.dataDiagramNew[state.connectorNewKey[assocObj.connector_id].tail.table_id].association ,
        state.connectorNewKey[assocObj.connector_id].tail.association_id
        )
        // Delete association source key 
        Vue.delete(state.dataDiagramNew[table_id].association,association_has_id)
        // Delete connector
        Vue.delete(state.connectorNewKey,assocObj.connector_id)      
        // Delete coloumn
        Vue.delete(state.dataDiagramNew[table_id].coloumns,coloumn_id)
      })

    }
  },
  setConfigTable(state, tableName) {
    state.configTable.tableName = tableName;
    state.configTable.properties = state.dataDiagram[tableName];
    state.visibleConfigTable = true;
  },
  setVisibleConfigTable(state, val) {
    state.visibleConfigTable = val;
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
    if(foreignKey===true){
      state.dataDiagramNew[tableKey_id].coloumns[coloumn_id].foreignKey=foreignKey
    }else{
      state.dataDiagramNew[tableKey_id].coloumns[coloumn_id].foreignKey=foreignKey
      // association foreign key
      var assocForeignKeyObj=state.dataDiagramNew[tableKey_id].association[
        state.dataDiagramNew[tableKey_id].coloumns[coloumn_id].association_belong_id
      ]

      // connector
      var connObj=state.connectorNewKey[assocForeignKeyObj.connector_id]

      // delete assoctiation source key
      Vue.delete(state.dataDiagramNew[connObj.head.table_id].association,connObj.head.association_id)
      // eslint-disable-next-line
      console.log('delete assoc '+connObj.head.association_id)
      
      // delete connector
      Vue.delete(state.connectorNewKey,assocForeignKeyObj.connector_id)
      
      // delete foreign key assoc
      Vue.delete(state.dataDiagramNew[tableKey_id].association,state.dataDiagramNew[tableKey_id].coloumns[coloumn_id].association_belong_id)
      state.dataDiagramNew[tableKey_id].coloumns[coloumn_id].association_belong_id=null
    }
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
  async updateAssociationBelongColoumnName(state,raw){
    var association_id= raw.association_id
    var selectedNewColoumn_id= raw.selectedNewColoumn_id
    var table_id= raw.table_id

    var assocObject=state.dataDiagramNew[table_id].association[association_id]

    // remove association_has_id who point to assoc has type because connection is change from old coloumn
    var association_has_idArray= state.dataDiagramNew[state.connectorNewKey[assocObject.connector_id].head.table_id].coloumns[state.connectorNewKey[assocObject.connector_id].head.coloumn_id].association_has_id
    for(var i=0;i<association_has_idArray.length;i++){
      if(association_has_idArray[i]===state.connectorNewKey[assocObject.connector_id].head.association_id){
        association_has_idArray.splice(i,1)
        break
      }
    }

    // add association_has_id in new coloumn connection
    state.dataDiagramNew[state.connectorNewKey[assocObject.connector_id].head.table_id].coloumns[selectedNewColoumn_id].association_has_id.push(state.connectorNewKey[assocObject.connector_id].head.association_id)

    //change in this asscotiation table below always  
    assocObject.targetKey_id=selectedNewColoumn_id
    //change in connector
    var connObject= state.connectorNewKey[assocObject.connector_id]
    state.connectorNewKey[assocObject.connector_id].head.coloumn_id=selectedNewColoumn_id

    //change in target key has owner ship
    state.dataDiagramNew[connObject.head.table_id].association[connObject.head.association_id].sourceKey_id=selectedNewColoumn_id
    // eslint-disable-next-line
    console.log(JSON.stringify(state.dataDiagramNew[connObject.head.table_id]))

  },
  addNewColoumn(state, raw){
    
    // var association_id_foreignKey= raw.association_id
    // var table_id_source= raw.selectedNewTable
    var table_id= raw.table_id
    var coloumn_name= raw.coloumn_name
    var data_type= raw.data_type
    var primaryKey= raw.primaryKey
    var notNull= raw.notNull
    var unique= raw.unique
    var autoIncrement= raw.autoIncrement
    var defaultValue= raw.default
    var foreignKey =raw.foreignKey
    var comment= raw.comment
    // var refTable= raw.refTable
    // var refColoumn= raw.refColoumn
    var unsigned = raw.unsigned

    Vue.set(state.dataDiagramNew[table_id].coloumns,uuidv4(),{
      coloumn_name: coloumn_name,
      comment: comment,
      dataType: data_type,
      default: defaultValue,
      primaryKey: primaryKey,
      notNull: notNull,
      unique: unique,
      foreignKey:foreignKey,
      unsigned: unsigned,
      zeroFill: false,
      autoIncrement: autoIncrement,
      style: {
        shadowBlur: 0,
        shadowColor: "green"
      },
      association_belong_id:null,
      association_has_id:[]
    })

    // var coloumn_id_foreignKey=raw.thisForeignKey_id
  },
  async updateAssociationBelongTableName(state,raw) {
      var association_id_foreignKey= raw.association_id
      var table_id_source= raw.selectedNewTable
      var table_id_foreignKey= raw.table_id
      var coloumn_id_foreignKey=raw.thisForeignKey_id

      if(association_id_foreignKey===undefined||association_id_foreignKey===null){
        // eslint-disable-next-line
        console.log('table_id_source '+table_id_source)
        let coloumn_id_default_sourceKey=Object.keys(state.dataDiagramNew[table_id_source].coloumns)[0]
         // eslint-disable-next-line
        console.log('coloumn_id_default_sourceKey '+coloumn_id_default_sourceKey)
        let association_id_foreignKeyNew='assoc_Foreign_'+uuidv4()
        let association_id_source='assoc_Source_'+uuidv4()
        let connector_id='conn_car_number_driver_id'+uuidv4()
        // create association in this table
        let tmpAssociation_id_foreignKeyNew= {
          connector_id: connector_id,
          type: "belong",
          table: table_id_source,
          table_id: table_id_source,
          foreignKey: coloumn_id_foreignKey,
          foreignKey_id: coloumn_id_foreignKey,
          targetKey: coloumn_id_default_sourceKey,
          targetKey_id: coloumn_id_default_sourceKey,
          point: {
            x: 50,
            y: 100
          }
        }
        // eslint-disable-next-line
        console.log('table_id_foreignKey '+table_id_foreignKey)
        // eslint-disable-next-line
        console.log('association_id_foreignKeyNew '+association_id_foreignKeyNew)
        Vue.set(state.dataDiagramNew[table_id_foreignKey].association,association_id_foreignKeyNew,tmpAssociation_id_foreignKeyNew)

        // create belong assoc in this table
        state.dataDiagramNew[table_id_foreignKey].coloumns[coloumn_id_foreignKey].association_belong_id=association_id_foreignKeyNew
        
        // create association in target table
        let tmpAssociation_id_source={
          connector_id: connector_id,
          type: "has",
          table: table_id_foreignKey,
          table_id: table_id_foreignKey,
          foreignKey: coloumn_id_foreignKey,
          foreignKey_id: coloumn_id_foreignKey,
          sourceKey: "id",
          sourceKey_id: coloumn_id_default_sourceKey,
          point: {
            x: 50,
            y: 100
          }
        }
        Vue.set(state.dataDiagramNew[table_id_source].association, association_id_source, tmpAssociation_id_source)      
        // add association_has_id
        state.dataDiagramNew[table_id_source].coloumns[coloumn_id_default_sourceKey].association_has_id.push(association_id_source)


        var tmpConnector= {
          // head is has
          head: {
            table: table_id_source,
            table_id: table_id_source,
            coloumn: "id",
            coloumn_id: coloumn_id_default_sourceKey,
            association_id:association_id_source
          },
          // tail is belong
          tail: {
            table: "Driver",
            table_id: table_id_foreignKey,
            coloumn: "car_id",
            coloumn_id: coloumn_id_foreignKey,
            association_id: association_id_foreignKeyNew
          },
          points: [
            state.dataDiagramNew[table_id_foreignKey].point.x+ state.dataDiagramNew[table_id_foreignKey].association[association_id_foreignKeyNew].point.x,
            state.dataDiagramNew[table_id_foreignKey].point.y+ state.dataDiagramNew[table_id_foreignKey].association[association_id_foreignKeyNew].point.y,
            state.dataDiagramNew[table_id_foreignKey].point.x+ state.dataDiagramNew[table_id_foreignKey].association[association_id_foreignKeyNew].point.x - 30,
            state.dataDiagramNew[table_id_foreignKey].point.y+ state.dataDiagramNew[table_id_foreignKey].association[association_id_foreignKeyNew].point.y - 30,
            state.dataDiagramNew[table_id_source].point.x + state.dataDiagramNew[table_id_source].association[association_id_source].point.x,
            state.dataDiagramNew[table_id_source].point.y+ state.dataDiagramNew[table_id_source].association[association_id_source].point.y,
          ],
          lineStyle: {
            shadowBlur: 5,
            shadowColor: "green"
          }
        }
        Vue.set(state.connectorNewKey, connector_id, tmpConnector)   
        // eslint-disable-next-line   
        console.log(JSON.stringify(state.dataDiagramNew[table_id_source]))
      }else{
        
      var assocOBJ_foreignKey=state.dataDiagramNew[table_id_foreignKey].association[association_id_foreignKey]

      let coloumn_id_default_sourceKey=Object.keys(state.dataDiagramNew[table_id_source].coloumns)[0]
      var newAssoctioation_id='assoc_Source_'+uuidv4()
      var assocObj_source_id=state.connectorNewKey[assocOBJ_foreignKey.connector_id].head.association_id
      var tableObj_source_id=state.connectorNewKey[assocOBJ_foreignKey.connector_id].head.table_id
      var coloumnObj_source_id=state.connectorNewKey[assocOBJ_foreignKey.connector_id].head.coloumn_id

      // remove association_has_id coloumn in source coloumn
      var association_has_idArray=state.dataDiagramNew[tableObj_source_id].coloumns[coloumnObj_source_id].association_has_id
      for(var i=0;i<association_has_idArray.length;i++){
        if(association_has_idArray[i]===assocObj_source_id){
          association_has_idArray.splice(i,1)
          break
        }
      }
      // add new association_has_id 
      state.dataDiagramNew[table_id_source].coloumns[coloumn_id_default_sourceKey].association_has_id.push(newAssoctioation_id)

      // delete source table assoc
      delete state.dataDiagramNew[tableObj_source_id].association[assocObj_source_id]

      // change association data target table_id      
      assocOBJ_foreignKey.table_id=table_id_source

      //change coloumn target to index 0
      var selectedColoumnDefault_id=Object.keys(state.dataDiagramNew[table_id_source].coloumns)[0]
      assocOBJ_foreignKey.targetKey_id=selectedColoumnDefault_id      

      // change coloumn connector
      state.connectorNewKey[assocOBJ_foreignKey.connector_id].head.coloumn_id=selectedColoumnDefault_id
      // change table connector
      state.connectorNewKey[assocOBJ_foreignKey.connector_id].head.table_id=table_id_source

      // renew asscotiation id  
      state.connectorNewKey[assocOBJ_foreignKey.connector_id].head.association_id=newAssoctioation_id
      // chreate new
      // state.dataDiagramNew[table_id_source].association[newAssoctioation_id]
      Vue.set(state.dataDiagramNew[table_id_source].association, newAssoctioation_id,       
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
          x: 100,
          y: 50
        }
      })
            
      let conn=state.connectorNewKey [
        state.dataDiagramNew[table_id_foreignKey].association[association_id_foreignKey].connector_id
      ]

      // state.dataDiagramNew[selectedNewTable_id].association[association_id].table_id=selectedNewTable_id
      conn.points = [
        conn.points[0],
        conn.points[1],
        conn.points[0] - 30,
        conn.points[1] - 30,
        state.dataDiagramNew[table_id_source].point.x,
        state.dataDiagramNew[table_id_source].point.y,
      ];
      conn.tail.table_id=table_id_foreignKey
    }
    },
    setLineStyleConnector(state,raw){
      state.connectorNewKey[raw.key]=raw.style
    }
};

