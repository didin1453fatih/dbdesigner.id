<template>
  <a-drawer
    v-if="dataDiagramNew[tableKeyConfig]!==undefined"
    placement="right"
    :width="520"
    :closable="false"
    @close="onClose"
    :visible="visible"
  >
    <div class="ant-drawer-header" style="margin:-25px; margin-bottom:25px;">
      <div
        v-if="isEditTableName===false"
        class="ant-drawer-title"
        @click="setIsEditTableName(true)"
      >
        {{dataDiagramNew[tableKeyConfig].table_name}}
        &nbsp;
      </div>
      <a-input
        placeholder="Table Name"
        @blur="setIsEditTableName(false)"
        @change="updateTableName({
        table_id:tableKeyConfig,
        tableNewName:$event.target.value
      })"
        style="background-color:#316896; font-size: 20px; line-height: 2;color:#fff;font-weight: 450;width: fit-content;"
        v-if="isEditTableName==true"
        size="default"
        :value="dataDiagramNew[tableKeyConfig].table_name"
      />
      <a-icon
        v-show="isEditTableName==false"
        @click="deleteTable({
          table_id:tableKeyConfig
        })"
        type="delete"
        style="color:#fff;position: absolute; right: 22px; margin-top: -17px;cursor:pointer; font-size:25px"
      />
    </div>
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
                        src="@/assets/primary-key.png"
                        width="14px"
                        style="vertical-align: baseline; "
                      >
                    </span>
                    <span
                      style="margin-left:7px"
                      v-else-if="dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].notNull===true"
                    >
                      <img
                        src="@/assets/icons8-diamonds-40.png"
                        width="14px"
                        style="vertical-align: baseline; "
                      >
                    </span>
                    <span
                      style="margin-left:7px"
                      v-else-if="dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].notNull===false"
                    >
                      <img
                        src="@/assets/icons8-diamonds-40-white.png"
                        width="14px"
                        style="vertical-align: baseline; "
                      >
                    </span>
                  </td>
                  <td align="left">
                    <div style="margin-left:5px">
                    <a-input
                      @blur="isEditColoumnName = false"
                      placeholder="Coloumn name"
                      v-if="showDetailcoloumn===index"
                      size="small"
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
                      style="width:100%;"
                    >{{dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].coloumn_name}}&nbsp;</div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
            <td>
              <a-input
                @blur="isEditColoumnType = false"
                v-if="showDetailcoloumn===index"
                size="small"
                placeholder="Data type"
                @input="updateDataType({
                  tableKey_id:tableKeyConfig,
                  coloumn_id:keyColoumn,
                  newDataType:$event.target.value
                })"
                :value="dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].dataType"
              />
              <div
                @click="showDetail(index,keyColoumn)"
                v-else
                style="margin-left:12px; width:100%"
              >{{dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].dataType}}&nbsp;</div>
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
                @click="setShowDetailcoloumn(-1)"
                type="caret-up"
              />
              <a-icon v-else @click="showDetail(index,keyColoumn)" type="caret-down"/>
            </td>
          </tr>
          <template v-if="showDetailcoloumn===index">
            <tr v-bind:key="keyColoumn+index">
              <td colspan="8">
                <a-icon
                  @click="deleteColoumn({
                    coloumn_id:keyColoumn,
                    table_id:tableKeyConfig
                  })"
                  type="delete"
                  style="color:red;position: absolute; right: 35px; margin-top: 5px;cursor:pointer"
                />
                <div style="margin-bottom:15px;margin-left:15px;margin-right:15px;margin-top:15px;">
                  <a-row align="bottom" type="flex">
                    <a-col :span="5">
                      <span style="padding-right:5px">Default</span>
                    </a-col>
                    <a-col :span="18">
                      <a-input style="width:170px" size="small" placeholder="Default value"/>
                    </a-col>
                    <a-col :span="1"></a-col>
                  </a-row>
                  <a-row style="margin-top:5px" align="bottom" type="flex">
                    <a-col :span="5">
                      <span style="padding-right:5px">Foreign Key</span>
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
                      <!-- :value="dataDiagramNew[tableKeyConfig].association[dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].association_belong_id].table_id" -->
                      <a-select
                        size="small"
                        :value="getSelectedTable({
                          tableKeyConfig:tableKeyConfig,
                          keyColoumn:keyColoumn
                        })"
                        style="width: 170px"
                        @change="updateAssociationBelongTableName({
                          thisForeignKey_id:keyColoumn,
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
                      <!-- :value="dataDiagramNew[tableKeyConfig].association[dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].association_belong_id].targetKey_id" -->
                      <a-select
                        :value="getSelectedColoumn({
                          tableKeyConfig:tableKeyConfig,
                          keyColoumn:keyColoumn
                        })"
                        @change="updateAssociationBelongColoumnName({
                          selectedNewColoumn_id:$event,
                          table_id:tableKeyConfig,
                          association_id:dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].association_belong_id
                        })"
                        size="small"
                        style="width: 170px"
                      >
                        <!-- Object.keys(dataDiagramNew[dataDiagramNew[tableKeyConfig].association[dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].association_belong_id].table_id].coloumns) -->
                        <a-select-option
                          size="small"
                          v-for="keyColoumnRef in getColoumnOption({
                            tableKeyConfig:tableKeyConfig,
                            keyColoumn:keyColoumn
                          })"
                          :value="keyColoumnRef"
                          :key="keyColoumnRef"
                        >{{dataDiagramNew[dataDiagramNew[tableKeyConfig].association[dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].association_belong_id].table_id].coloumns[keyColoumnRef].coloumn_name}}</a-select-option>
                      </a-select>
                    </a-col>
                  </a-row>
                </div>
              </td>
            </tr>
          </template>
        </template>
      </table>
      <!-- <a-button size="small" style="margin-top: 10px;color: #316896; border-color:#316896">
        New coloumn
      </a-button>-->
      <!-- #316896 -->
      <!-- rgb(22, 148, 251) -->
      <a-icon
        v-show="isVisibleNewColoumn===false"
        @click="visibleNewColoumn"
        type="plus-circle"
        style="color:#316896;position: absolute; left: 25px; margin-top: 5px;cursor:pointer; font-size: 20px"
      />
    </div>
  </a-drawer>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("Data/Project", {
      tableProperties: state => state.configTable.properties,
      tableName: state => state.configTable.tableName,

      dataDiagramNew: state => state.dataDiagramNew,

      isEditTableName: state => state.tableDetail.isEditTableName,
      tableKeyConfig: state => state.tableDetail.table_id,
      table_id: state => state.tableDetail.table_id,
      visible: state => state.tableDetail.visible,
      isNewTable: state => state.tableDetail.isNewTable,
      showDetailcoloumn: state => state.tableDetail.showDetailcoloumn
    })
  },
  methods: {
    cancelNewColoumn() {
      this.newColoumn.coloumnName = null;
      this.newColoumn.dataType = null;
      this.newColoumn.primaryKey = false;
      this.newColoumn.notNull = false;
      this.newColoumn.unique = false;
      this.newColoumn.autoIncrement = false;
      this.newColoumn.default = null;
      this.newColoumn.foreignKey = false;
      this.newColoumn.comment = null;
      this.newColoumn.unsigned = false;
      this.isVisibleNewColoumn = false;
    },
    saveNewColoumn() {
      var isSuccess = true;
      if (this.newColoumn.coloumnName === null) {
        isSuccess = false;
        this.$message.error("Coloumn name is required");
      }

      if (this.newColoumn.dataType === null) {
        this.$message.error("Data type is required");
        isSuccess = false;
      }

      if (isSuccess === false) {
        return;
      }

      this.addNewColoumn({
        table_id: this.tableKeyConfig,
        coloumn_name: this.newColoumn.coloumnName,
        data_type: this.newColoumn.dataType,
        primaryKey: this.newColoumn.primaryKey,
        notNull: this.newColoumn.notNull,
        unique: this.newColoumn.unique,
        autoIncrement: this.newColoumn.autoIncrement,
        default: this.newColoumn.default,
        foreignKey: this.newColoumn.foreignKey,
        comment: this.newColoumn.comment,
        unsigned: this.newColoumn.unsigned
      });

      this.newColoumn.coloumnName = null;
      this.newColoumn.dataType = null;
      this.newColoumn.primaryKey = false;
      this.newColoumn.notNull = false;
      this.newColoumn.unique = false;
      this.newColoumn.autoIncrement = false;
      this.newColoumn.default = null;
      this.newColoumn.foreignKey = false;
      this.newColoumn.comment = null;
      this.newColoumn.unsigned = false;
      this.isVisibleNewColoumn = false;
    },
    saveChange(coloumn) {
      this.updateColoumnTable({
        newColoumn: this.newColoumnName,
        tableName: this.tableName,
        oldColoumn: coloumn
      });
    },
    // eslint-disable-next-line
    getSelectedColoumn(raw) {
      // window.alert(JSON.stringify(this.dataDiagramNew[raw.tableKeyConfig].association[this.dataDiagramNew[raw.tableKeyConfig].coloumns[raw.keyColoumn].association_belong_id]))
      if (
        this.dataDiagramNew[raw.tableKeyConfig].association[
          this.dataDiagramNew[raw.tableKeyConfig].coloumns[raw.keyColoumn]
            .association_belong_id
        ] === undefined
      ) {
        return null;
      } else {
        return this.dataDiagramNew[raw.tableKeyConfig].association[
          this.dataDiagramNew[raw.tableKeyConfig].coloumns[raw.keyColoumn]
            .association_belong_id
        ].targetKey_id;
      }
    },
    // eslint-disable-next-line
    getSelectedTable(raw) {
      if (
        this.dataDiagramNew[raw.tableKeyConfig].association[
          this.dataDiagramNew[raw.tableKeyConfig].coloumns[raw.keyColoumn]
            .association_belong_id
        ] === undefined
      ) {
        return null;
      } else {
        return this.dataDiagramNew[raw.tableKeyConfig].association[
          this.dataDiagramNew[raw.tableKeyConfig].coloumns[raw.keyColoumn]
            .association_belong_id
        ].table_id;
      }
    },
    getColoumnOption(raw) {
      // window.alert(JSON.stringify(this.dataDiagramNew[raw.tableKeyConfig].association[this.dataDiagramNew[raw.tableKeyConfig].coloumns[raw.keyColoumn].association_belong_id]))
      if (
        this.dataDiagramNew[raw.tableKeyConfig].association[
          this.dataDiagramNew[raw.tableKeyConfig].coloumns[raw.keyColoumn]
            .association_belong_id
        ] === undefined
      ) {
        return [];
      } else {
        return Object.keys(
          this.dataDiagramNew[
            this.dataDiagramNew[raw.tableKeyConfig].association[
              this.dataDiagramNew[raw.tableKeyConfig].coloumns[raw.keyColoumn]
                .association_belong_id
            ].table_id
          ].coloumns
        );
      }
    },
    // deleteColoumn(coloumn_id) {
    //   window.alert("delete : " + coloumn_id);
    // },
    // updateAssociationBelongTableName(selectedNewTable, association_id) {
    //   // this.updateAssociation
    //   // eslint-disable-next-line
    //   console.log(JSON.stringify(value) + " | " + JSON.stringify(option));
    // },
    cancelEdit() {
      this.setShowDetailcoloumn(-1);
    },
    ...mapMutations("Data/Project", {
      deleteColoumn: "deleteColoumn",
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
      updateAssociationBelongTableName: "updateAssociationBelongTableName",
      updateAssociationBelongColoumnName: "updateAssociationBelongColoumnName",
      updateTableName: "updateTableName",
      addNewColoumn: "addNewColoumn",
      deleteTable: "deleteTable",
      setIsEditTableName: "setIsEditTableName",
      setShowDetailcoloumn: "setShowDetailcoloumn",
      addNewEmptyColoumn: "addNewEmptyColoumn",
      setVisibleDetailTable: "setVisibleDetailTable",
      updateDataType: "updateDataType"
    }),
    showDetail(val, keyColoumn) {
      this.isVisibleNewColoumn = false;
      // this.isEditTableName = false;
      this.setIsEditTableName(false);
      this.newColoumnName = this.dataDiagramNew[this.tableKeyConfig].coloumns[
        keyColoumn
      ].coloumn_name;
      this.newDataType = this.dataDiagramNew[this.tableKeyConfig].coloumns[
        keyColoumn
      ].dataType;
      if (val === this.showDetailcoloumn) {
        this.setShowDetailcoloumn(-1);
      } else {
        this.setShowDetailcoloumn(val);
      }
    },
    onClose() {
      this.setVisibleDetailTable(false);
    },
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
    },
    visibleNewColoumn() {
      this.addNewEmptyColoumn({
        table_id: this.table_id
      });
      this.setShowDetailcoloumn(
        Object.keys(this.dataDiagramNew[this.table_id].coloumns).length - 1
      );
    }
  },
  data() {
    return {
      visibleMessageColoumn: true,
      isVisibleNewColoumn: false,
      newColoumn: {
        coloumnName: null,
        dataType: null,
        primaryKey: false,
        notNull: false,
        unique: false,
        unsigned: false,
        autoIncrement: false,
        foreignKey: false,
        comment: null,
        default: null,
        refTable_id: null,
        refColoumn_id: null
      },
      selectedTable: null,
      newColoumnName: "",
      newComment: "",
      newDataType: "",
      newDefault: "",
      // isEditTableName: false,
      isEditColoumnName: false,
      isEditColoumnType: false
      // showDetailcoloumn: 3
    };
  }
};
</script>
<style scoped>
.ant-drawer-header {
  background: #316896 !important;
  color: #fff !important;
}
.ant-drawer-title {
  margin: 0 !important;
  font-size: 20px !important;
  line-height: 10px !important;
  font-weight: 500 !important;
  color: #fff !important;
}
.ant-drawer-header {
  border-radius: 0px 0px 0 0 !important;
}
.ant-menu-vertical .ant-menu-item,
.ant-menu-vertical-left .ant-menu-item,
.ant-menu-vertical-right .ant-menu-item,
.ant-menu-inline .ant-menu-item,
.ant-menu-vertical .ant-menu-submenu-title,
.ant-menu-vertical-left .ant-menu-submenu-title,
.ant-menu-vertical-right .ant-menu-submenu-title,
.ant-menu-inline .ant-menu-submenu-title {
  line-height: 25px !important;
  height: 25px !important;
}
</style>

