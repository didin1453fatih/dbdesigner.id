<template>
  <div>
    <v-stage :config="configKonva">
      <v-layer>
        <connector-base
          v-for="connectorKey in Object.keys(connectorNewKey)"
          :key="connectorKey"
          :points="connectorNewKey[connectorKey].points"
          :lineStyle="connectorNewKey[connectorKey].lineStyle"
        />

        <table-base
          @highlight="highlightRelation"
          v-for="tableKey in Object.keys(dataDiagramNew)"
          v-bind:key="tableKey"
          @editDataTable="editDataTable"
          @changedPotition="changeTablePotition"
          :tableKey="tableKey"
          :coloumns="dataDiagramNew[tableKey].coloumns"
          :tableName="dataDiagramNew[tableKey].table_name"
          :potition="dataDiagramNew[tableKey].point"
        />
      </v-layer>
    </v-stage>
    <config-table
      :visible="visible"
      :tableName="editTableName"
      :tableProperties="editTableProperties"
      @close="onClose"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
// import { mapActions } from "vuex";
import ConnectorBase from "./components/ConnectorBase";
import TableBase from "./components/TableBase";
import ConfigTable from "./components/ConfigTableBase.vue";

export default {
  components: {
    TableBase,
    ConnectorBase,
    ConfigTable
  },
  methods: {
    ...mapMutations("diagram", {
      changeTablePotition: "changeTablePotition",
      highlightRelation: "highlightRelation",
    }),
    editDataTable() {
      // this.editTableName = tableName;
      // this.editTableProperties = this.dataDiagram[tableName];
      this.visible = true;
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
  },
  mounted() {},
    computed: {
    ...mapState("diagram", {
      dataDiagram: state => state.dataDiagram,
      connectorNew: state => state.connectorNew,
      dataDiagramNew: state=>state.dataDiagramNew,
      connectorNewKey: state=> state.connectorNewKey
    })
  },
  data() {
    return {
      editTableProperties: {
              potition: {
            x: 30,
            y: 110
          },
          coloumns: {
            id: {
              comment: "",
              dataType: "varchar(31)",
              default: "",
              primaryKey: true,
              allowNull: false,
              unique: false,
              unsigned: false,
              zeroFill: false,
              autoIncrement: false,
              foreignKey: false,
              style: {
                shadowBlur: 0,
                shadowColor: "green"
              }
            },
            jumlah_roda: {
              comment: "",
              dataType: "int(32)",
              default: "",
              primaryKey: false,
              allowNull: false,
              unique: false,
              unsigned: false,
              zeroFill: false,
              autoIncrement: false,
              foreignKey: false,
              style: {
                shadowBlur: 0,
                shadowColor: "green"
              }
            }
          },
          association: [
            {
              type: "has",
              table: "sopir",
              foreignKey: "mobil_id",
              sourceKey: "id",
              potition: {
                x: 100,
                y: 50
              }
            },
            {
              type: "has",
              table: "kernet",
              foreignKey: "mobil_id",
              sourceKey: "id",
              potition: {
                x: 100,
                y: 50
              }
            }
          ]
      },
      editTableName: 'mobil',
      visible: false,
      configKonva: {
        width: 1400,
        height: 700
      }
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
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
</style>
