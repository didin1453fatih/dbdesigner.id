<template>
  <a-drawer
    :title="dataDiagramNew[tableKeyConfig].table_name"
    placement="right"
    :width="520"
    :closable="false"
    @close="onClose"
    :visible="visible"
  >
    <div>
      <table border="1" width="100%">
        <tr>
          <td>
            <span style="margin-left:10px">Column Name</span>
          </td>
          <td width="20%">
            <span style="margin-left:10px">Data Type</span>
          </td>
          <td width="9%" align="center">PK</td>
          <td width="9%" align="center">NN</td>
          <td width="9%" align="center">UQ</td>
          <td width="9%" align="center">UN</td>
          <td width="9%" align="center">AI</td>
          <td width="7%" align="center"></td>
        </tr>
        <template
          v-for="(keyColoumn,index) in Object.keys(dataDiagramNew[tableKeyConfig].coloumns)"
        >
          <tr v-bind:key="keyColoumn">
            <td>
              <table border="0" width="100%">
                <tr>
                  <td width="15%" align="left">
                    <span
                      style="margin-left:7px"
                      v-if="dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].primaryKey"
                    >
                      <img
                        src="../assets/primary-key.png"
                        width="14px"
                        style="vertical-align: baseline; margin-right:3px"
                      >
                    </span>
                    <span
                      style="margin-left:7px"
                      v-else-if="dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].notNull===true"
                    >
                      <img
                        src="../assets/icons8-diamonds-40.png"
                        width="14px"
                        style="vertical-align: baseline; margin-right:5px"
                      >
                    </span>
                    <span
                      style="margin-left:7px"
                      v-else-if="dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].notNull===false"
                    >
                      <img
                        src="../assets/icons8-diamonds-40-white.png"
                        width="14px"
                        style="vertical-align: baseline; margin-right:5px"
                      >
                    </span>
                  </td>
                  <td align="left">
                    <a-input
                      @blur="isEditColoumnName = false"
                      ref="searchLL"
                      v-if="showDetailcoloumn===index"
                      size="small"
                      placeholder="small size"
                      @input="updateColoumnName({
                        tableKey_id:tableKeyConfig,
                        coloumn_id:keyColoumn,
                        newName:$event.target.value
                      })"
                      :value="dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].coloumn_name"
                    />
                    <div
                      @click="showDetail(index,keyColoumn)"
                      v-else
                      style="width:100%"
                    >{{dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].coloumn_name}}</div>
                  </td>
                </tr>
              </table>
            </td>
            <td>
              <a-input
                @blur="isEditColoumnType = false"
                ref="searchLL"
                v-if="showDetailcoloumn===index"
                size="small"
                placeholder="small size"
                v-model="newDataType"
              />
              <div
                @click="showDetail(index,keyColoumn)"
                v-else
                style="margin-left:12px; width:100%"
              >{{dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].dataType}}</div>
            </td>
            <td align="center">
              <a-checkbox
                @change="updatePrimaryKey({
                tableKey_id:tableKeyConfig,
                coloumn_id:keyColoumn,
                primaryKey:$event.target.checked
              })"
                :checked="dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].primaryKey"
              ></a-checkbox>
            </td>
            <td align="center">
              <a-checkbox
                @change="updateNotNull({
                  tableKey_id:tableKeyConfig,
                  coloumn_id:keyColoumn,
                  notNull:$event.target.checked
                })"
                :checked="dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].notNull"
              ></a-checkbox>
            </td>
            <td align="center">
              <a-checkbox
                @change="updateUnique({
                  tableKey_id:tableKeyConfig,
                  coloumn_id:keyColoumn,
                  unique:$event.target.checked
              })"
                :checked="dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].unique"
              ></a-checkbox>
            </td>
            <td align="center">
              <a-checkbox
                @change="updateUnsigned({
                  tableKey_id:tableKeyConfig,
                  coloumn_id:keyColoumn,
                  unsigned:$event.target.checked                
              })"
                :checked="dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].unsigned"
              ></a-checkbox>
            </td>
            <td align="center">
              <a-checkbox
                @change="updateAutoIncrement({
                  tableKey_id:tableKeyConfig,
                  coloumn_id:keyColoumn,
                  autoIncrement:$event.target.checked                                
              })"
                :checked="dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].autoIncrement"
              ></a-checkbox>
            </td>
            <td align="center">
              <a-icon
                v-if="showDetailcoloumn===index"
                @click="showDetailcoloumn=-1"
                type="caret-up"
              />
              <a-icon v-else @click="showDetail(index,keyColoumn)" type="caret-down"/>
            </td>
          </tr>
          <template v-if="showDetailcoloumn===index">
            <tr v-bind:key="keyColoumn+index">
              <td colspan="8">
                <div style="margin:15px;">
                  <a-row align="bottom" type="flex">
                    <a-col :span="5">
                      <span style="padding-right:5px">Default</span>
                    </a-col>
                    <a-col :span="18">
                      <a-input style="width:170px" size="small" placeholder="small size"/>
                    </a-col>
                  </a-row>
                  <a-row style="margin-top:5px" align="bottom" type="flex">
                    <a-col :span="5">
                      <span style="padding-right:5px">Foregn Key</span>
                    </a-col>
                    <a-col :span="18">
                      <a-checkbox
                        @change="updateForeignKeyStatus({
                          tableKey_id:tableKeyConfig,
                          coloumn_id:keyColoumn,
                          foreignKey:$event.target.checked
                        })"
                        :checked="dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].foreignKey"
                        style="padding:0;margin:0"
                      ></a-checkbox>
                    </a-col>
                  </a-row>
                  <a-row style="margin-top:5px" align="top" type="flex">
                    <a-col :span="5" align="top">
                      <span style="padding-right:5px" align="top">Comments</span>
                    </a-col>
                    <a-col :span="18" align="top">
                      <a-textarea
                        style="width:170px"
                        size="small"
                        placeholder="Give note  of your table"
                        autosize
                      />
                    </a-col>
                  </a-row>
                  <a-row
                    v-if="dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].foreignKey"
                    style="margin-top:5px"
                    align="bottom"
                    type="flex"
                  >
                    <a-col :span="5">
                      <span style="padding-right:5px">Ref. Table</span>
                    </a-col>
                    <a-col :span="18">
                      <a-select
                        size="small"
                        :value="dataDiagramNew[tableKeyConfig].association[dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].association_belong_id].table_id"
                        style="width: 170px"
                        @change="updateAssociationBelongTableName({
                          selectedNewTable:$event,
                          table_id:tableKeyConfig,
                          association_id:dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].association_belong_id
                        })"
                      >
                        <a-select-option
                          size="small"
                          v-for="keyTable in Object.keys(dataDiagramNew)"
                          :key="keyTable"
                          :value="keyTable"
                        >{{dataDiagramNew[keyTable].table_name}}</a-select-option>
                      </a-select>
                    </a-col>
                  </a-row>
                  <a-row
                    v-if="dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].foreignKey"
                    style="margin-top:5px"
                    align="bottom"
                    type="flex"
                  >
                    <a-col :span="5">Ref. Column</a-col>
                    <a-col :span="18">
                      <a-select
                        :value="dataDiagramNew[tableKeyConfig].association[dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].association_belong_id].targetKey_id"
                        size="small"
                        style="width: 170px"
                      >
                        <a-select-option
                          size="small"
                          v-for="keyColoumnRef in Object.keys(dataDiagramNew[dataDiagramNew[tableKeyConfig].association[dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].association_belong_id].table_id].coloumns)"
                          :value="keyColoumnRef"
                          :key="keyColoumnRef"
                        >{{dataDiagramNew[dataDiagramNew[tableKeyConfig].association[dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].association_belong_id].table_id].coloumns[keyColoumnRef].coloumn_name}}
                        </a-select-option>
                      </a-select>
                      <!-- <a-input style="width:170px" size="small" placeholder="small size"/> -->
                    </a-col>
                  </a-row>

                  <!-- <a-row style="margin-top:15px" align="bottom" type="flex">
                    <a-col :span="4">
                      <a-button
                        @click="cancelEdit(index,keyColoumn)"
                        type="dashed"
                        size="small"
                      >Cancel</a-button>
                    </a-col>
                    <a-col :span="3">
                      <a-button
                        @click="saveChange(keyColoumn)"
                        size="small"
                        style="color: rgba(0, 0, 0, 0.65);"
                      >Save</a-button>
                    </a-col>
                  </a-row>-->
                </div>
              </td>
            </tr>
          </template>
        </template>
      </table>
    </div>
  </a-drawer>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("diagram", {
      tableProperties: state => state.configTable.properties,
      tableName: state => state.configTable.tableName,
      visible: state => state.visibleConfigTable,
      dataDiagramNew: state => state.dataDiagramNew,
      tableKeyConfig: state => state.tableKeyConfig
    })
  },
  methods: {
    saveChange(coloumn) {
      this.updateColoumnTable({
        newColoumn: this.newColoumnName,
        tableName: this.tableName,
        oldColoumn: coloumn
      });
    },
    // updateAssociationBelongTableName(selectedNewTable, association_id) {
    //   // this.updateAssociation
    //   // eslint-disable-next-line
    //   console.log(JSON.stringify(value) + " | " + JSON.stringify(option));
    // },
    cancelEdit() {
      this.showDetailcoloumn = -1;
    },
    ...mapMutations("diagram", {
      setVisibleConfigTable: "setVisibleConfigTable",
      updateColoumnTable: "updateColoumnTable",
      updateColoumnName: "updateColoumnName",
      updatePrimaryKey: "updatePrimaryKey",
      updateNotNull: "updateAllowNull",
      updateForeignKeyStatus: "updateForeignKeyStatus",
      updateUnique: "updateUnique",
      updateUnsigned: "updateUnsigned",
      updateAutoIncrement: "updateAutoIncrement",
      updateAssociation: "updateAssociation",
      updateAssociationBelongTableName: "updateAssociationBelongTableName"
    }),
    showDetail(val, keyColoumn) {
      this.newColoumnName = this.dataDiagramNew[this.tableKeyConfig].coloumns[
        keyColoumn
      ].coloumn_name;
      this.newDataType = this.dataDiagramNew[this.tableKeyConfig].coloumns[
        keyColoumn
      ].dataType;
      if (val === this.showDetailcoloumn) {
        this.showDetailcoloumn = -1;
      } else {
        this.showDetailcoloumn = val;
      }
    },
    onClose() {
      this.setVisibleConfigTable(false);
    },
    // updatePrimaryKey(t) {
    //   window.alert(JSON.stringify(t));
    // },
    changeEditableColoumnName() {
      if (this.isEditColoumnName === true) {
        this.isEditColoumnName = false;
      } else {
        this.isEditColoumnName = true;
      }
    },
    changeEditableColoumnType() {
      if (this.isEditColoumnType === true) {
        this.isEditColoumnType = false;
      } else {
        this.isEditColoumnType = true;
      }
    }
  },
  data() {
    return {
      selectedTable: null,
      newColoumnName: "",
      newComment: "",
      newDataType: "",
      newDefault: "",
      isEditColoumnName: false,
      isEditColoumnType: false,
      showDetailcoloumn: 3
    };
  }
};
</script>
<style>
</style>

