<template>
  <!-- COnnect this height to  state to dynamic height in ribbon menu -->
  <div>
    <div
      @contextmenu.prevent="$refs.menu.open"
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
        cursor: cursor_mode
       }"
      >
        <!-- draggable: true -->
        <v-stage
          :config=" {
            width: canvasProperties.width,
            height: canvasProperties.height,
            draggable: canvas_draggable
          }"
          ref="stage"
          @wheel="onZooming"
        >
          <v-layer ref="layer">
            <v-rect
              @click="canvasClick"
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
          <!-- <v-layer ref="rightClickDialogLayer">
            <v-rect
              v-if="right_click_dialog_visible"
              :config="{
                fill: 'red',
                width: 70,
                height: 20,
                x: right_click_dialog_potition_x,
                y: right_click_dialog_potition_y,
                shadowBlur: 2,
                strokeWidth: 0,
            }"
            />
          </v-layer>-->
        </v-stage>
      </div>
    </div>
    <vue-context
      ref="menu"
      style="border-radius: 0px;
      border-radius: 0px;
      min-width: 0px;
      padding: 0px;"
    >
      <li @click="addNewTableEvent">
        <a
          style="padding-top: 5px;
                padding-left: 12px;
                padding-right: 10px;
                padding-bottom: 2px;"
        >New Table</a>
      </li>
      <!-- <li>
        <a
          style="padding-top: 2px;
                padding-left: 12px;
                padding-right: 10px;
                padding-bottom: 4px;"
        >New Note</a>
      </li> -->
      <a-divider
        style="background:rgb(217, 217, 217);padding:0px;margin:1px; min-width: 95%;width: 95%;"
      />
      <li>
        <a
          @click="setCursor('default')"
          style="padding-top: 2px;
                padding-left: 12px;
                padding-right: 10px;
                padding-bottom: 2px;"
        >Select</a>
      </li>
      <li>
        <a
          @click="setCursor('grab')"
          style="padding-top: 2px;
                padding-left: 12px;
                padding-right: 10px;
                padding-bottom: 2px;"
        >Move Canvas</a>
      </li>
      <li>
        <a
          @click="setCursor('zoom-in')"
          style="padding-top: 2px;
                padding-left: 12px;
                padding-right: 10px;
                padding-bottom: 2px;"
        >Zoom In</a>
      </li>
      <li>
        <a
          @click="setCursor('zoom-out')"
          style="padding-top: 2px;
                padding-left: 12px;
                padding-right: 10px;
                padding-bottom: 5px;"
        >Zoom Out</a>
      </li>
    </vue-context>
  </div>
</template>

<script>
/**
 * NOTE ignored bug.
 * Scale is not perfect for match with pointer potition in :
 * 1. Right click menu Zoom-In and Zoom-Out
 * 2. Cursor left click in zoom-in or zoom-out
 *
 * Solution
 * - Record center potition every scroll down and scroll up in canvas properties,
 * and zoom to this potition.
 */
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import { mapActions } from "vuex";
import TableBase from "@/components/MainCanvas/component/TableBase";
import ConnectorBase from "@/components/MainCanvas/component/ConnectorBase";
import { EventBus } from "@/helper/EventBus";
import bagroundPatternImage from "@/assets/canvas-background.png";
import { VueContext } from "vue-context";
export default {
  components: {
    TableBase,
    ConnectorBase,
    VueContext
  },
  methods: {
    addNewTableEvent() {
      this.addNewTableWithPosition({
        x: this.right_click_dialog_potition_x,
        y: this.right_click_dialog_potition_y
      });
    },
    setCursor(mode) {
      if (mode === "grab") {
        this.canvas_draggable = true;
      } else {
        if (this.cursor_mode === "grab") {
          this.canvas_draggable = false;
        }
      }

      if (mode === "zoom-in") {
        this.SET_CANVAS_ZOOM(this.canvasProperties.zoom + 0.25);
        this.scale({
          x: this.canvasProperties.zoom,
          y: this.canvasProperties.zoom
        });
      } else if (mode == "zoom-out") {
        this.SET_CANVAS_ZOOM(this.canvasProperties.zoom - 0.25);
        this.scale({
          x: this.canvasProperties.zoom,
          y: this.canvasProperties.zoom
        });
      }

      this.cursor_mode = mode;
    },
    canvasClick(e) {
      if (e.evt.button === 2) {
        // For computate coordinate of cursor in real canvas potition.
        var thisCanvasWidthAfterZoom =
          this.canvasProperties.width * this.canvasProperties.zoom;

        var thisCanvasHeightAfterZoom =
          this.canvasProperties.height * this.canvasProperties.zoom;

        this.right_click_dialog_potition_y =
          ((this.canvasProperties.height - thisCanvasHeightAfterZoom) /
            thisCanvasHeightAfterZoom +
            1) *
          this.$refs.stage.getStage().getPointerPosition().y;

        this.right_click_dialog_potition_x =
          ((this.canvasProperties.width - thisCanvasWidthAfterZoom) /
            thisCanvasWidthAfterZoom +
            1) *
          this.$refs.stage.getStage().getPointerPosition().x;

        // this.right_click_dialog_visible = true;
        // this.$refs.menu.open(e);
      } else {
        if (this.cursor_mode === "zoom-in") {
          this.SET_CANVAS_ZOOM(this.canvasProperties.zoom + 0.25);
          this.scale({
            x: this.canvasProperties.zoom,
            y: this.canvasProperties.zoom
          });
        } else if (this.cursor_mode === "zoom-out") {
          this.SET_CANVAS_ZOOM(this.canvasProperties.zoom - 0.25);
          this.scale({
            x: this.canvasProperties.zoom,
            y: this.canvasProperties.zoom
          });
        }
      }
    },
    scale(options) {
      this.$refs.stage.getStage().scale(options);
      this.$refs.stage.getStage().batchDraw();
    },
    onZooming(e) {
      if (this.cursor_mode === "zoom-in" || this.cursor_mode === "zoom-out") {
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
        this.SET_CANVAS_ZOOM(newScale);
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
      }
    },
    ...mapMutations("RightDialog/Export/Component/Image", {
      SET_IMAGE_BASE_64: "SET_IMAGE_BASE_64"
    }),
    ...mapMutations("Data/Project", {
      SET_CANVAS_ZOOM: "SET_CANVAS_ZOOM",
      addNewTableWithPosition: "addNewTableWithPosition"
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
      this.scale(options);
    });
    EventBus.$on("Canvas/resetPotition", () => {
      this.$refs.stage.getStage().position(0, 0);
      this.$refs.stage.getStage().batchDraw();
    });
  },
  async mounted() {
    const bagroundPattern = new window.Image();
    bagroundPattern.src = bagroundPatternImage;
    bagroundPattern.onload = () => {
      this.bagroundPattern = bagroundPattern;
    };
    this.$refs.stage.getStage().on("contentContextmenu", e => {
      e.evt.preventDefault();
    });
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
      scaleBy: 1.01,
      right_click_dialog_potition_x: 10,
      right_click_dialog_potition_y: 10,
      // right_click_dialog_visible: true,
      cursor_mode: "default",
      canvas_draggable: false
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
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAzSURBVDhPY2xoaGDABp49ewZloQImKE00GNVADGBMS0uDMlGBlJQUlIUKRmQo0VoDAwMABSUF0YPFlT4AAAAASUVORK5CYII=");
  /* background-color: red; */
  /* height: calc(100vh - 33px); */
  overflow: auto;
  margin: 0px;
  border: 0px solid grey;
}
.v-context > li > a {
  font-size: 12px;
}
</style>