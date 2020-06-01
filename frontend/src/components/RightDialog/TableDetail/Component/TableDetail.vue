<template>
  <div>
    <table style="width:620px" class="table-detail">
      <thead style="background-color:#EEEEEE">
        <td style="width:25px" align="center" class="first-row"></td>
        <td class="second-row">
          <span style="margin-left:10px">Column Name</span>
        </td>
        <td style="width:137px" class="third-row">
          <span style="margin-left:10px">Data Type</span>
        </td>
        <td style="width:40px" class="fourth-row" align="center">PK</td>
        <td style="width:40px" class="fiveth-row" align="center">NN</td>
        <td style="width:40px" class="sixth-row" align="center">UQ</td>
        <td style="width:40px" class="seventh-row" align="center">UN</td>
        <td style="width:40px" class="eighth-row" align="center">AI</td>
        <td style="color:#FFF;width:32px"></td>
      </thead>
      <tbody id="table-detail-body">
        <!-- <tbody id="table-detail-body" @contextmenu.prevent="$refs.tableDetailMenu.open"> -->
        <template
          v-for="(keyColoumn,index) in Object.keys(dataDiagramNew[tableKeyConfig].coloumns)"
        >
          <tr v-bind:key="keyColoumn" style="width:100%;margin:0;padding:0">
            <td colspan="9" style="margin:0;padding:0">
              <table style="width:100%" class="coloumn-content-table">
                <tr v-bind:key="keyColoumn" style="width:100%;margin:0;padding:0">
                  <td
                    class="table-detail-body-side-left first-row"
                    style="width:25px"
                    align="center"
                  >
                    <a-icon type="menu" style="color:#B5B5B5" />
                    <span class="key-coloumn-selector-for-get-value">{{keyColoumn}}</span>
                  </td>
                  <td @click="tableDetailColoumnContentMouseUp" class="second-row">
                    <table width="100%" class="coloumn-name-body">
                      <tr valign="center">
                        <td
                          width="24px"
                          valign="center"
                          align="center"
                          @click="tableDetailIconFieldMouseUp(index)"
                        >
                          <span
                            v-if="dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].primaryKey"
                          >
                            <img
                              src="@/assets/primary-key.png"
                              width="14px"
                              style="vertical-align: top; margin-top:4px"
                            />
                          </span>
                          <span
                            v-else-if="dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].notNull===true"
                          >
                            <img
                              src="@/assets/icons8-diamonds-40.png"
                              width="14px"
                              style="vertical-align: baseline; margin-top:4px"
                            />
                          </span>
                          <span
                            v-else-if="dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].notNull===false"
                          >
                            <img
                              src="@/assets/icons8-diamonds-40-white.png"
                              width="14px"
                              style="vertical-align: baseline; margin-top:4px"
                            />
                          </span>
                        </td>
                        <td align="left">
                          <a-input
                            style="width:100%;margin-left:0px"
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
                            style="width:100%;margin-left:0px"
                          >{{dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].coloumn_name}}&nbsp;</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td
                    style="width:137px"
                    @click="tableDetailColoumnContentMouseUp"
                    class="third-row"
                  >
                    <a-auto-complete
                      size="small"
                      @blur="isEditColoumnType = false"
                      v-if="showDetailcoloumn===index"
                      :dataSource="dataSource"
                      @change="updateDataType({
                        tableKey_id:tableKeyConfig,
                        coloumn_id:keyColoumn,
                        newDataType:$event
                      })"
                      :autoFocus="false"
                      :backfill="true"
                      :defaultOpen="false"
                      @search="handleSearch"
                      placeholder="Data type"
                      :defaultValue="dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].dataType"
                    />
                    <!-- :value="cache_data_type"               -->
                    <!-- <a-input
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
                    />-->
                    <div
                      @click="showDetail(index,keyColoumn)"
                      v-else
                      style="margin-left:12px; width:100%"
                    >{{dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].dataType}}&nbsp;</div>
                  </td>
                  <td style="width:40px" align="center" class="fourth-row">
                    <a-checkbox
                      @change="updatePrimaryKey({
                        tableKey_id:tableKeyConfig,
                        coloumn_id:keyColoumn,
                        primaryKey:$event.target.checked
                      })"
                      :checked="dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].primaryKey"
                    ></a-checkbox>
                  </td>
                  <td style="width:40px" align="center" class="fiveth-row">
                    <a-checkbox
                      @change="updateNotNull({
                        tableKey_id:tableKeyConfig,
                        coloumn_id:keyColoumn,
                        notNull:$event.target.checked
                      })"
                      :checked="dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].notNull"
                    ></a-checkbox>
                  </td>
                  <td style="width:40px" align="center" class="sixth-row">
                    <a-checkbox
                      @change="updateUnique({
                          tableKey_id:tableKeyConfig,
                          coloumn_id:keyColoumn,
                          unique:$event.target.checked
                      })"
                      :checked="dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].unique"
                    ></a-checkbox>
                  </td>
                  <td style="width:40px" align="center" class="seventh-row">
                    <a-checkbox
                      @change="updateUnsigned({
                          tableKey_id:tableKeyConfig,
                          coloumn_id:keyColoumn,
                          unsigned:$event.target.checked                
                      })"
                      :checked="dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].unsigned"
                    ></a-checkbox>
                  </td>
                  <td style="width:40px" align="center" class="eighth-row">
                    <a-checkbox
                      @change="updateAutoIncrement({
                          tableKey_id:tableKeyConfig,
                          coloumn_id:keyColoumn,
                          autoIncrement:$event.target.checked                                
                      })"
                      :checked="dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].autoIncrement"
                    ></a-checkbox>
                  </td>
                  <td style="width:32px" align="center">
                    <a-icon
                      @click="deleteColoumn({
                        coloumn_id:keyColoumn,
                        table_id:tableKeyConfig
                      })"
                      type="delete"
                      style="cursor:pointer;color:#A0A0A0"
                    />
                  </td>
                </tr>

                <tr v-if="showDetailcoloumn===index">
                  <td class="table-detail-body-side-left first-row" style="width:25px"></td>
                  <td colspan="8">
                    <div
                      style="margin-bottom:15px;margin-left:15px;margin-right:15px;margin-top:15px;"
                    >
                      <a-row align="bottom" type="flex">
                        <a-col :span="5">
                          <span style="padding-right:5px">Default</span>
                        </a-col>
                        <a-col :span="18">
                          <a-input
                            :value="dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].default"
                            @change="UPDATE_DEFAULT_VALUE({
                                tableKey_id:tableKeyConfig,
                                coloumn_id:keyColoumn,
                                default_value:$event.target.value
                            })"
                            style="width:170px"
                            size="small"
                            placeholder="Default value"
                          />
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
                            :value="dataDiagramNew[tableKeyConfig].coloumns[keyColoumn].comment"
                            @change="UPDATE_COMMENT({
                                tableKey_id:tableKeyConfig,
                                coloumn_id:keyColoumn,
                                comment:$event.target.value
                            })"
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
              </table>
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <vue-context
      ref="tableDetailMenu"
      style="border-radius: 0px;
      border-radius: 0px;
      min-width: 0px;
      padding: 0px;"
    >
      <li @mouseup="(event)=>{event.stopPropagation()}">
        <a
          style="padding-top: 5px;
                padding-left: 12px;
                padding-right: 10px;
                padding-bottom: 2px;"
        >Copy</a>
      </li>
      <li>
        <a
          style="padding-top: 5px;
                padding-left: 12px;
                padding-right: 10px;
                padding-bottom: 2px;"
        >Paste</a>
      </li>
      <a-divider
        style="background:rgb(217, 217, 217);padding:0px;margin:1px; min-width: 95%;width: 95%;"
      />
      <li>
        <a
          style="padding-top: 2px;
                padding-left: 12px;
                padding-right: 10px;
                padding-bottom: 5px;"
        >Deselect</a>
      </li>
    </vue-context>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import { Sortable, MultiDrag } from "sortablejs";
import { VueContext } from "vue-context";

export default {
  components: {
    VueContext
  },
  mounted() {
    // eslint-disable-next-line
    console.log("Mountedddd-------");
    Sortable.mount(new MultiDrag());
    var el = document.getElementById("table-detail-body");
    this.sortable = Sortable.create(el, {
      forceFallback: true,
      ghostClass: "imageGhost",
      group: "shared",
      multiDrag: true,
      selectedClass: "sortableSelected",
      // filter: ".coloumn-detail", // 'filtered' class is not draggable
      animation: 150,

      handle: ".table-detail-body-side-left",
      fallbackTolerance: 5,
      onSelect: this.onSelect,
      onDeselect: this.onDeselect,
      onEnd: this.onColoumnMoved,
      onStart: this.onDragStart
    });
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
    /**
     * Get new ordered coloumn with class tag and this result array
     * element. To convert to string, use .textContent;
     */
    onColoumnMoved() {
      // get  new order key coloumn
      var coloumnRawArray = document.getElementsByClassName(
        "key-coloumn-selector-for-get-value"
      );

      var coloumnKeyArray = [];
      for (let i = 0; i < coloumnRawArray.length; i++) {
        const coloumnKey = coloumnRawArray[i].textContent;
        coloumnKeyArray.push(coloumnKey);
      }

      this.UPDATE_COLOUMN_POSITION({
        table_id: this.table_id,
        newKeyColoumnOrder: coloumnKeyArray
      });
    },
    onDragStart() {
      this.setShowDetailcoloumn(-1);
    },
    tableDetailIconFieldMouseUp(indexClicked) {
      if (this.showDetailcoloumn === indexClicked) {
        this.setShowDetailcoloumn(-1);
      } else {
        this.setShowDetailcoloumn(indexClicked);
      }
    },
    tableDetailColoumnContentMouseUp() {
      // eslint-disable-next-line
      console.log("table detail mouse up");
      this.sortable.multiDrag._deselectMultiDrag();
    },
    onDeselect(evt) {
      // eslint-disable-next-line
      console.log(JSON.stringify(this.selectItem));
      var index = Sortable.utils.index(evt.item, ">*");
      this.selectedColoumnIndex.pop(index);
    },
    onSelect(evt) {
      // eslint-disable-next-line
      console.log("On Selecttt");

      // eslint-disable-next-line
      console.log(Sortable.utils.index(evt.item, ">*"));
      var index = Sortable.utils.index(evt.item, ">*");
      this.selectedColoumnIndex.push(index);
      this.setShowDetailcoloumn(-1);
    },
    handleChange(evt) {
      // eslint-disable-next-line
      console.log(evt);
    },
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
      UPDATE_COLOUMN_POSITION: "UPDATE_COLOUMN_POSITION",
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
      sortable: null,
      selectedColoumnIndex: [],
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
<style >
table {
  border-spacing: 0;
  border-style: none;
  border-collapse: collapse;
}
.imageGhost {
  background-color: lightblue;
}
.sortableSelected {
  background-color: #c6c6c6 !important;
  border-color: #b5b5b5;
}

.table-detail-body-side-left {
  background-color: #eeeeee;
}

.table-detail table {
  border-collapse: collapse;
}

.table-detail table,
.table-detail thead {
  border-collapse: collapse;
  border-bottom: 1px #b5b5b5 solid;
  border-spacing: 0;
}

.coloumn-name-body {
  border: none !important;
}
.coloumn-name-body table,
.coloumn-name-body th,
.coloumn-name-body td {
  border: none !important;
}

.coloumn-content-table {
  border-collapse: collapse;
}

.coloumn-content-table table,
.coloumn-content-table td,
.coloumn-content-table th {
  border-bottom: 1px #b5b5b5 solid;
}
.first-row {
  border-right: 1px #b5b5b5 solid;
}

.second-row {
  border-right: 1px #b5b5b5 solid;
}

.third-row {
  border-right: 1px #b5b5b5 solid;
}
.fourth-row {
  border-right: 1px #b5b5b5 solid;
}
.fiveth-row {
  border-right: 1px #b5b5b5 solid;
}
.sixth-row {
  border-right: 1px #b5b5b5 solid;
}
.seventh-row {
  border-right: 1px #b5b5b5 solid;
}
.eighth-row {
  border-right: 1px #b5b5b5 solid;
}
.key-coloumn-selector-for-get-value {
  visibility: hidden;
  display: none;
}
</style>

