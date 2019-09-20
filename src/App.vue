<template>
  <div>
    <information-alert />
    <menu-fluent />
    <div id="scroll-container">
      <div id="large-container">
        <v-stage
          :config=" {
            width: 3000,
            height: 3000,
            draggable: true
          }"
          ref="stage"
          @wheel="onZooming"
        >
          <v-layer ref="layer">
            <v-rect
              :config="{
                width: 3000,
                height: 3000,
                fillPatternImage: bagroundPattern,
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
    </div>
    <table-detail />
    <left-panel />
    <export />
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
import Export from "./components/RightDialog/Export/Layout";
import TableDetail from "./components/RightDialog/TableDetail/Layout.vue";
import { message } from "ant-design-vue";
import InformationAlert from "./components/TopAlert/Information/Layout";
import { EventBus } from "@/helper/EventBus";
import bagroundPatternImage from "@/assets/canvas-background.png";
export default {
  components: {
    InformationAlert,
    TableBase,
    MenuFluent,
    LeftPanel,
    Export,
    LoadingGlobal,
    ConnectorBase,
    TableDetail
  },
  methods: {
    onZooming(e) {
      e.evt.preventDefault();
      var oldScale = this.$refs.stage.getStage().scaleX();

      var mousePointTo = {
        x:
          this.$refs.stage.getStage().getPointerPosition().x / oldScale -
          this.$refs.stage.getStage().x() / oldScale,
        y:
          this.$refs.stage.getStage().getPointerPosition().y / oldScale -
          this.$refs.stage.getStage().y() / oldScale
      };

      var newScale =
        e.evt.deltaY > 0 ? oldScale * this.scaleBy : oldScale / this.scaleBy;
      this.$refs.stage.getStage().scale({ x: newScale, y: newScale });

      var newPos = {
        x:
          -(
            mousePointTo.x -
            this.$refs.stage.getStage().getPointerPosition().x / newScale
          ) * newScale,
        y:
          -(
            mousePointTo.y -
            this.$refs.stage.getStage().getPointerPosition().y / newScale
          ) * newScale
      };
      this.$refs.stage.getStage().position(newPos);
      this.$refs.stage.getStage().batchDraw();
    },
    ...mapMutations("LeftDialog/FileMenu/Layout", {
      leftPanelSetVisible: "setVisible",
      leftPanelSetPanelName: "setPanelName"
    }),
    ...mapMutations("RightDialog/Export/Component/Image", {
      SET_IMAGE_BASE_64: "SET_IMAGE_BASE_64"
    }),
    ...mapMutations("Data/Project", {
      changeTablePotition: "changeTablePotition",
      highlightRelation: "highlightRelation",
      setLineStyleConnector: "setLineStyleConnector",
      addNewTable: "addNewTable",
      setHighLightRelation: "setHighLightRelation"
    }),
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
    EventBus.$on("Canvas/scale", options => {
      this.$refs.stage.getStage().scale(options);
      this.$refs.stage.getStage().batchDraw();
    });
  },
  async mounted() {
    const bagroundPattern = new window.Image();
    bagroundPattern.src = bagroundPatternImage;
    bagroundPattern.onload = () => {
      this.bagroundPattern = bagroundPattern;
    };
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
      bagroundPattern: null,
      scaleBy: 1.01
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

#large-container {
  width: 3000px;
  height: 3000px;
  overflow: hidden;
  background-color: #eeeeee;
}

#scroll-container {
  width: 100%;
  height: calc(100vh - 33px);
  overflow: auto;
  margin: 0px;
  border: 0px solid grey;
}
</style>
