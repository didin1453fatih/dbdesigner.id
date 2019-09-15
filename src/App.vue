<template>
  <div>
    <!-- <a-menu
      style="line-height: 33px;background:#E6E6E6;color:#1C2128"
      size="small"
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
      </a-menu-item>
      <a-menu-item key="smile">
        <a-icon type="smile"/>Help
      </a-menu-item>
    </a-menu>-->
    <!-- :message="messageAccountInformation" -->
    <!-- <a-alert
      type="info"
      closeText="Close"
      v-if="visibleAccountInformation"
      @close="onCloseMessage"
      style="border-radius: 0px; "
    >
      <div slot="message" style="text-align: center;">
        <b>{{messageAccountInformation}}</b>
      </div>
    </a-alert>-->
    <information-alert />

    <menu-fluent />

    <div style=" overflow: scroll;width:100%;height:470px">
      <v-stage :config="configKonva" ref="stage">
        <v-layer ref="layer">
          <v-rect
            :config="{
              width: 1400,
              height: 700,
              fill: 'white'
            }"
          />
          <connector-base
            v-for="connectorKey in Object.keys(connectorNewKey)"
            v-bind:key="connectorKey"
            :connectorObj="connectorNewKey[connectorKey]"
            :connectorKey="connectorKey"
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
            :widthTable="dataDiagramNew[tableKey].widthTable"
          />
        </v-layer>
      </v-stage>
    </div>
    <table-detail
      :visible="visible"
      :tableName="editTableName"
      :tableProperties="editTableProperties"
      @close="onClose"
    />
    <left-panel />
    <export-and-share />
    <loading-global />
  </div>
</template>

<script>
import qs from "querystringify";
import { mapState } from "vuex";
import { mapMutations } from "vuex";

import { mapActions } from "vuex";
import TableBase from "./components/MainCanvas/TableBase";
import ConnectorBase from "./components/MainCanvas/ConnectorBase";
import LoadingGlobal from "./components/Utill/LoadingGlobal/Layout";
import MenuFluent from "./components/TopMenu/MenuLayout.vue";
import LeftPanel from "./components/LeftDialog/FileMenu/Layout.vue";
import ExportAndShare from "./components/RightDialog/ExportAndShare/Layout";
import TableDetail from "./components/RightDialog/TableDetail/Layout.vue";
import { message } from "ant-design-vue";
import InformationAlert from "./components/TopAlert/Information/Layout";
import { EventBus } from "@/helper/EventBus";
export default {
  components: {
    InformationAlert,
    TableBase,
    MenuFluent,
    LeftPanel,
    ExportAndShare,
    LoadingGlobal,
    ConnectorBase,
    TableDetail
  },
  methods: {
    onCloseMessage(e) {
      // eslint-disable-next-line
      console.log(e, "I was closed.");
      this.setVisibleAccountInformation(false);
    },
    ...mapMutations("LeftDialog/FileMenu/Layout", {
      leftPanelSetVisible: "setVisible",
      leftPanelSetPanelName: "setPanelName"
    }),
    ...mapMutations("RightDialog/ExportAndShare/Component/Image", {
      SET_IMAGE_BASE_64: "SET_IMAGE_BASE_64"
    }),
    // ...mapMutations("Account", {
    //   setVisibleAccountInformation: "setVisibleAccountInformation",
    //   setMessageAccountInformation: "setMessageAccountInformation"
    // }),
    ...mapMutations("Data/Project", {
      changeTablePotition: "changeTablePotition",
      highlightRelation: "highlightRelation",
      setLineStyleConnector: "setLineStyleConnector",
      addNewTable: "addNewTable",
      setHighLightRelation: "setHighLightRelation"
    }),
    // setHighLightRelation() {
    //   window.alert(JSON.stringify("saasd"));
    // },
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
    ...mapActions("Data/Project", {
      loadProjectUUID: "loadProjectUUID",
      setEmptyDiagram: "setEmptyDiagram",
      autoSave: "autoSave"
    }),
    ...mapActions("Data/Account", {
      globalReadAccount: "globalReadAccount"
    })
  },
  created() {
    this.setEmptyDiagram();
    EventBus.$on("Canvas/exportToDataURL", options => {
      var imageData = this.$refs.stage.getStage().toDataURL(options);
      this.SET_IMAGE_BASE_64(imageData);
    });
    EventBus.$on("Canvas/cropped", options => {
      var cropImg = this.$refs.stage.getCroppedCanvas().toDataURL(options);
      this.SET_IMAGE_BASE_64(cropImg);
    });
  },
  async mounted() {
    if (window.location.toString().indexOf("uuid=") > 1) {
      var valueUUID = window.location.toString().split("uuid=")[1];
      this.globalReadAccount({
        uuid: valueUUID
      });
      this.loadProjectUUID({
        uuid: valueUUID,
        password: null
      });
    } else {
      await this.globalReadAccount({
        uuid: null
      });
      var parsed = qs.parse(window.location.toString().split("#")[1]);
      if (parsed.src === "mail_confirmation") {
        if (parsed.action === "re_login") {
          this.leftPanelSetVisible(true);
          this.leftPanelSetPanelName("login");
          message.success(parsed.message, 7);
        } else if (parsed.action === "open_project") {
          this.leftPanelSetVisible(true);
          this.leftPanelSetPanelName("open");
          message.success(parsed.message, 7);
        } else if (parsed.action === "error_email_confirmation_expired") {
          this.leftPanelSetVisible(true);
          this.leftPanelSetPanelName("login");
          message.error(parsed.message, 7);
        } else if (parsed.action === "token_not_valid") {
          this.leftPanelSetVisible(true);
          this.leftPanelSetPanelName("login");
          message.error(parsed.message, 7);
        }
      } else if (parsed.src === "registration") {
        if (parsed.action === "new_project") {
          this.leftPanelSetVisible(true);
          this.leftPanelSetPanelName("new");
          message.success(parsed.message, 7);
        }
      }
    }

    this.autoSave();
  },
  computed: {
    ...mapState("Data/Project", {
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
</style>
