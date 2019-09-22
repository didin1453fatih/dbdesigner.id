<template>
  <!-- COnnect this height to  state to dynamic height in ribbon menu -->
  <div
    id="scroll-container"
    :style="{
      height: `calc(100vh - ${visible_ribbon_menu===false?33:150}px)`
    }"
  >
    <div
      id="large-container"
      :style="{
        height: `${canvasProperties.height}px`,
        width: `${canvasProperties.width}px`,
       }"
    >
      <!-- draggable: true -->
      <v-stage
        :config=" {
            width: canvasProperties.width,
            height: canvasProperties.height,
            draggable: true
          }"
        ref="stage"
        @wheel="onZooming"
      >
        <v-layer ref="layer">
          <v-rect
            :config="{
                width: canvasProperties.width,
                height: canvasProperties.height,
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
            v-for="tableKey in Object.keys(dataDiagramNew)"
            v-bind:key="tableKey"
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
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import { mapActions } from "vuex";
import TableBase from "@/components/MainCanvas/component/TableBase";
import ConnectorBase from "@/components/MainCanvas/component/ConnectorBase";
import { EventBus } from "@/helper/EventBus";
import bagroundPatternImage from "@/assets/canvas-background.png";
export default {
  components: {
    TableBase,
    ConnectorBase
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
    ...mapMutations("RightDialog/Export/Component/Image", {
      SET_IMAGE_BASE_64: "SET_IMAGE_BASE_64"
    }),
    ...mapActions("Data/Project", {
      setEmptyDiagram: "setEmptyDiagram"
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
  },
  computed: {
    ...mapState("Data/Project", {
      dataDiagram: state => state.dataDiagram,
      connectorNew: state => state.connectorNew,
      dataDiagramNew: state => state.dataDiagramNew,
      connectorNewKey: state => state.connectorNewKey,
      canvasProperties: state => state.canvasProperties
    }),
    ...mapState("TopMenu/Layout", {
      visible_ribbon_menu: state => state.visible_ribbon_menu
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
#large-container {
  /* width: 100px;
  height: 100px; */
  overflow: hidden;
  background-color: grey;
}

#scroll-container {
  width: 100%;
  background-color: red;
  /* height: calc(100vh - 33px); */
  overflow: auto;
  margin: 0px;
  border: 0px solid grey;
}
</style>