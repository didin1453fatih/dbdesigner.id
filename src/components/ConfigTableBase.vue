<template>
  <a-drawer
    :title="tableName"
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
        <template v-for="(keyColoumn,index) in Object.keys(tableProperties.coloumns)">
          <tr v-bind:key="keyColoumn">
            <td>
              <table border="0" width="100%">
                <tr>
                  <td width="15%" align="left">
                    <span
                      style="margin-left:7px"
                      v-if="tableProperties.coloumns[keyColoumn].primaryKey"
                    >
                      <img
                        src="../assets/primary-key.png"
                        width="14px"
                        style="vertical-align: baseline; margin-right:3px"
                      >
                    </span>
                    <span
                      style="margin-left:7px"
                      v-else-if="tableProperties.coloumns[keyColoumn].allowNull===false"
                    >
                      <img
                        src="../assets/icons8-diamonds-40.png"
                        width="14px"
                        style="vertical-align: baseline; margin-right:5px"
                      >
                    </span>
                  </td>
                  <td  align="left">
                    <a-input
                      @blur="isEditColoumnName = false"
                      ref="searchLL"
                      v-if="showDetailcoloumn===index"
                      size="small"
                      placeholder="small size"
                      v-model="newColoumnName"
                    />
                    <div
                      @click="showDetail(index,keyColoumn)"
                      v-else
                      style="width:100%"
                    >{{keyColoumn}}</div>
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
              >{{tableProperties.coloumns[keyColoumn].dataType}}</div>
            </td>
            <td align="center">
              <a-checkbox></a-checkbox>
            </td>
            <td align="center">
              <a-checkbox></a-checkbox>
            </td>
            <td align="center">
              <a-checkbox></a-checkbox>
            </td>
            <td align="center">
              <a-checkbox></a-checkbox>
            </td>
            <td align="center">
              <a-checkbox></a-checkbox>
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
                      <a-input style="width:130px" size="small" placeholder="small size"/>
                    </a-col>
                  </a-row>
                  <a-row style="margin-top:5px" align="bottom" type="flex">
                    <a-col :span="5">
                      <span style="padding-right:5px">Foregn Key</span>
                    </a-col>
                    <a-col :span="18">
                      <a-checkbox style="padding:0;margin:0"></a-checkbox>
                    </a-col>
                  </a-row>
                  <a-row style="margin-top:5px" align="bottom" type="flex">
                    <a-col :span="5">
                      <span style="padding-right:5px">Ref. Table</span>
                    </a-col>
                    <a-col :span="18">
                      <a-input style="width:130px" size="small" placeholder="small size"/>
                    </a-col>
                  </a-row>
                  <a-row style="margin-top:5px" align="bottom" type="flex">
                    <a-col :span="5">Ref. Column</a-col>
                    <a-col :span="18">
                      <a-input style="width:130px" size="small" placeholder="small size"/>
                    </a-col>
                  </a-row>

                  <a-row style="margin-top:15px" align="bottom" type="flex">
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
                  </a-row>
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
      visible: state => state.visibleConfigTable
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
    cancelEdit() {
      this.showDetailcoloumn = -1;
    },
    changeColoumnName(val) {
      // eslint-disable-next-line
      console.log("val " + JSON.stringify(val.target.value));
      // var oldColoumn = this.isEditColoumnName;
      // // eslint-disable-next-line
      // console.log("oldData " + oldColoumn);
      // this.updateColoumnTable({
      //   newColoumn: val.target.value,
      //   tableName: this.tableName,
      //   oldColoumn: oldColoumn
      // });
    },
    ...mapMutations("diagram", {
      setVisibleConfigTable: "setVisibleConfigTable",
      updateColoumnTable: "updateColoumnTable"
    }),
    showDetail(val, keyColoumn) {
      this.newColoumnName = keyColoumn;
      this.newDataType = this.tableProperties.coloumns[keyColoumn].dataType;
      if (val === this.showDetailcoloumn) {
        this.showDetailcoloumn = -1;
      } else {
        this.showDetailcoloumn = val;
      }
    },
    onClose() {
      this.setVisibleConfigTable(false);
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
    }
  },
  data() {
    return {
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

