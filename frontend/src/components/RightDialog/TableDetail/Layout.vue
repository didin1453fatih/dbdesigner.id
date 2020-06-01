<template>
  <a-drawer
    v-if="dataDiagramNew[tableKeyConfig]!==undefined"
    placement="right"
    :width="637"
    :closable="false"
    @close="onClose"
    wrapClassName="tableDetailDialog"
    :visible="visible"
  >
    <div class="ant-drawer-header">
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
        style="color:#ffffff;position: absolute; right: 22px; margin-top: -17px;cursor:pointer; font-size:25px"
      />
    </div>
    <div style="overflow-y: scroll;height:720px;width:620">
      <TableDetail v-if="dataDiagramNew[tableKeyConfig].coloumns!==undefined" />
      <a-icon
        v-show="isVisibleNewColoumn===false"
        @click="visibleNewColoumn"
        type="plus-circle"
        style="color:#316896; margin-left: 10px; margin-top: 10px; padding-bottom:30px;cursor:pointer; font-size: 20px"
      />
    </div>
  </a-drawer>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import TableDetail from "./Component/TableDetail";

export default {
  components: {
    TableDetail
  },
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
      updateDataType: "updateDataType",
      UPDATE_DEFAULT_VALUE: "UPDATE_DEFAULT_VALUE",
      UPDATE_COMMENT: "UPDATE_COMMENT"
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
    },
    handleSearch(value) {
      this.dataSource = [];
      this.data_types.forEach(dataType => {
        if (dataType.indexOf(value.toUpperCase()) >= 0) {
          this.dataSource.push(dataType);
        }
      });
    }
  },
  data() {
    return {
      data_types: [
        "TINYINT",
        "SMALLINT",
        "MEDIUMINT",
        "INT",
        "BIGINT",
        "FLOAT",
        "DOUBLE",
        "DATETIME",
        "DATE",
        "TIMESTAMP",
        "CHAR",
        "VARCHAR",
        "BINARY",
        "VARBINARY",
        "BLOB",
        "TEXT",
        "JSON"
      ],
      dataSource: [],
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
<style>
.tableDetailDialog .ant-drawer-body {
  padding: 0px ;
}
.tableDetailDialog  .ant-drawer-header {
  background: #316896 !important;
  color: #fff !important;
}
.tableDetailDialog  .ant-drawer-title {
  margin: 0 !important;
  font-size: 20px !important;
  line-height: 10px !important;
  font-weight: 500 !important;
  color: #fff !important;
}
.tableDetailDialog  .ant-drawer-header {
  border-radius: 0px 0px 0 0 !important;
}
/* .ant-menu-vertical .ant-menu-item,
.ant-menu-vertical-left .ant-menu-item,
.ant-menu-vertical-right .ant-menu-item,
.ant-menu-inline .ant-menu-item,
.ant-menu-vertical .ant-menu-submenu-title,
.ant-menu-vertical-left .ant-menu-submenu-title,
.ant-menu-vertical-right .ant-menu-submenu-title,
.ant-menu-inline .ant-menu-submenu-title {
  line-height: 25px !important;
  height: 25px !important;
} */
</style>

