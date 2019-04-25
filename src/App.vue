<template>
  <div>
    <a-menu
      style="line-height: 33px;background:#E6E6E6;color:#1C2128"
      size="small"
      v-model="current"
      mode="horizontal"
    >
      <a-sub-menu>
        <span slot="title" class="submenu-title-wrapper">
          <a-icon type="profile"/>File
        </span>
          <a-menu-item-group title="Project">
            <a-menu-item key="setting:3">Open Project</a-menu-item>
            <a-menu-item key="setting:2">New Project</a-menu-item>
          </a-menu-item-group>
          <a-menu-item-group title="Table">
            <a-menu-item key="setting:1" @click="addNewTable">New Table</a-menu-item>
          </a-menu-item-group>          
      </a-sub-menu>
      <a-menu-item key="history">
        <a-icon type="clock-circle"/>History
      </a-menu-item>
      
      <a-menu-item key="export">
        <a-icon type="gift"/>Export
      </a-menu-item>
    
      <a-menu-item key="share">
          <a-icon type="rocket"/>Share
       </a-menu-item >
      <a-menu-item  key="smile">
        <a-icon type="smile"/>Help
      </a-menu-item>
    </a-menu>
    <v-stage :config="configKonva">
      <v-layer>
        <!-- <template
        v-for="connectorKey in Object.keys(connectorNewKey)"
        >
        <div v-bind:key="connectorKey">
        <connector-base
          :points="connectorNewKey[connectorKey].points"
          :lineStyle="connectorNewKey[connectorKey].lineStyle"
        />
        </div>
        </template>-->

        <template v-for="connectorKey in Object.keys(connectorNewKey)">
          <div v-bind:key="connectorKey">
            <v-line
              :config="{
                x: 0,
                y: 0,
                points: connectorNewKey[connectorKey].points,
                strokeWidth: 1,
                tension: 1,
                closed: false,
                stroke: 'black',
                shadowBlur: connectorNewKey[connectorKey].lineStyle.shadowBlur,
                shadowColor:connectorNewKey[connectorKey].lineStyle.shadowColor,
              }"
            />
          </div>
        </template>

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
    <table-detail
      :visible="visible"
      :tableName="editTableName"
      :tableProperties="editTableProperties"
      @close="onClose"
    />
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
// import ConnectorBase from "./components/ConnectorBase";
import TableBase from "./components/TableBase";
import ConfigTable from "./components/ConfigTableBase.vue";
import TableDetail from "./components/TableDetail.vue";

export default {
  components: {
    TableBase,
    // ConnectorBase,
    TableDetail,
    ConfigTable
  },
  methods: {
    ...mapMutations("diagram", {
      changeTablePotition: "changeTablePotition",
      highlightRelation: "highlightRelation",
      setLineStyleConnector: "setLineStyleConnector",
      addNewTable :"addNewTable"
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
    }
  },
  mounted() {
    // var flip = false;
    // var cnn=this.connectorNewKey
    // var hhh= this.setLineStyleConnector
    // setInterval(function() {
    //   if (flip === false) {
    //     flip = true;
    //     let styleL = {
    //       shadowBlur: 5,
    //       shadowColor: "#00D2FF"
    //     };
    //     Object.keys(cnn).forEach( key => {
    //       // cnn[key].lineStyle = tmpLineStye;
    //       hhh({
    //         key:key,
    //         style:styleL
    //       })
    //     });
    //   } else {
    //     flip = false;
    //     let styleL = {
    //       shadowBlur: 5,
    //       shadowColor: "#00D2FF"
    //     };
    //     Object.keys(cnn).forEach( key => {
    //       // cnn[key].lineStyle = tmpLineStye;
    //       hhh({
    //         key:key,
    //         style:styleL
    //       })
    //     });
    //   }
    // }, 1000);
  },
  computed: {
    ...mapState("diagram", {
      dataDiagram: state => state.dataDiagram,
      connectorNew: state => state.connectorNew,
      dataDiagramNew: state => state.dataDiagramNew,
      connectorNewKey: state => state.connectorNewKey
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
      editTableName: "mobil",
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
.ant-menu-vertical .ant-menu-item, .ant-menu-vertical-left .ant-menu-item, .ant-menu-vertical-right .ant-menu-item, .ant-menu-inline .ant-menu-item, .ant-menu-vertical .ant-menu-submenu-title, .ant-menu-vertical-left .ant-menu-submenu-title, .ant-menu-vertical-right .ant-menu-submenu-title, .ant-menu-inline .ant-menu-submenu-title {
    line-height: 25px !important;
    height: 25px !important;
}
</style>
