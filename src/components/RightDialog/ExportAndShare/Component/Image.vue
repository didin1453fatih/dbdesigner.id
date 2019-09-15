<template>
  <div>
    <h3>Image</h3>
    <div style="margin-top:20px">
      <label>Format</label>
      <br />
      <a-radio-group
        v-model="mimeType"
        defaultChecked="image/png"
        defaultValue="image/png"
        style="margin-top:5px"
      >
        <a-radio-button value="image/png">PNG</a-radio-button>
        <a-radio-button value="image/jpeg">JPEG</a-radio-button>
      </a-radio-group>
    </div>
    <div style="margin-top:20px">
      <label>Quality</label>
      <br />
      <a-radio-group v-model="quality" :defaultChecked="1" :defaultValue="1" style="margin-top:5px">
        <a-radio-button :value="1">Default</a-radio-button>
        <a-radio-button :value="2">High</a-radio-button>
        <a-radio-button :value="3">Best</a-radio-button>
      </a-radio-group>
    </div>
    <div style="margin-top:30px;     text-align: right;">
      <a-button style="right:40px" @click="exportImage()">Next</a-button>
    </div>
    <a-drawer
      width="100%"
      :closable="false"
      @close="visiblePopUp=false"
      :visible="visiblePopUp"
      style="background-color:#F1F1F1;"
      class="cropper-bg"
    >
      <div
        style="width: -webkit-fill-available;
           height:100vh;margin:-24px;background-color:#F1F1F1;padding:-9px"
        class="cropper-bg"
      >
        <div
          style="position: absolute;z-index: 100;background-color:white; margin-top:30vh;border-radius: 4px;
                  border: 1px solid transparent;-webkit-box-shadow: 0px 0px 5px 0px rgba(117,117,117,1);
                  -moz-box-shadow: 0px 0px 5px 0px rgba(117,117,117,1);
                  box-shadow: 0px 0px 5px 0px rgba(117,117,117,1);"
        >
          <div
            style="padding-top:7px;padding-bottom:10px;padding-left:7px;padding-right:7px"
            @click="visiblePopUp=false"
          >
            <a-icon type="rollback" style="font-size: 27px;" />
          </div>
          <a-divider style="background:rgb(217, 217, 217);padding:0px;margin:0px" />
          <div style="padding-top:7px;padding-left:7px;padding-right:7px" @click="zoomIn">
            <a-icon type="zoom-in" style="font-size: 27px;" />
          </div>
          <div
            style="padding-top:10px;padding-bottom:13px;padding-left:7px;padding-right:7px"
            @click="zoomOut"
          >
            <a-icon type="zoom-out" style="font-size: 27px;" />
          </div>
          <a-divider style="background:rgb(217, 217, 217);padding:0px;margin:0px" />
          <div style="padding-top:13px;padding-left:7px;padding-right:7px" @click="cropImage">
            <a-icon type="scissor" style="font-size: 27px;" />
          </div>
          <div
            style="padding-top:7px;padding-bottom:7px;padding-left:7px;padding-right:7px"
            @click="downloadEvent"
          >
            <a-icon type="cloud-download" style="font-size: 27px;" />
          </div>
        </div>
        <vue-cropper
          v-if="croppingRender===true"
          ref="cropper"
          :guides="true"
          :view-mode="0"
          drag-mode="crop"
          :auto-crop-area="0.9"
          :min-container-width="150"
          :min-container-height="180"
          :background="true"
          :autoCrop="true"
          :src="imageBase64"
          alt="Source Image"
          :img-style="{ 'width': '100vh', 'height':'100vh' }"
        ></vue-cropper>
      </div>
    </a-drawer>
  </div>
</template>


<script>
import { mapMutations } from "vuex";
import { mapState } from "vuex";
import { EventBus } from "@/helper/EventBus";
import moment from "moment";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
export default {
  computed: {
    ...mapState("RightDialog/ExportAndShare/Component/Image", {
      imageBase64: state => state.imageBase64
    }),
    ...mapState("Data/Project", {
      projectTitle: state => state.projectDescription.title
    })
  },
  mounted() {
  },
  methods: {
    zoomIn() {
      this.$refs.cropper.relativeZoom(0.1);
    },
    zoomOut() {
      this.$refs.cropper.relativeZoom(-0.1);
    },
    exportImage() {
      EventBus.$emit("Canvas/exportToDataURL", {
        mimeType: this.mimeType,
        pixelRatio: this.quality
      });
      this.visiblePopUp = true;
      this.croppingRender = false;
      setTimeout(() => {
        this.croppingRender = true;
        setTimeout(() => {
          this.$refs.cropper.relativeZoom(-0.1);
        }, 100);
      }, 100);
    },
    downloadEvent() {
      this.downloadURI(
        this.imageBase64,
        this.projectTitle +
          "__dbdesigner.id__" +
          moment().format("YYYY-MM-DD HH:mm:ss") +
          "." +
          this.mimeType.split("/")[1]
      );
    },
    ...mapMutations("RightDialog/ExportAndShare/Component/Image", {
      openExport: "setVisible"
    }),
    ...mapMutations("Utill/LoadingGlobal/Layout/", {
      SET_GLOBAL_LOADING: "setVisible"
    }),
    downloadURI: function(uri, name) {
      var link = document.createElement("a");
      link.download = name;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    ...mapMutations("RightDialog/ExportAndShare/Component/Image", {
      SET_IMAGE_BASE_64: "SET_IMAGE_BASE_64"
    }),
    cropImage() {
      var cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      this.SET_IMAGE_BASE_64(cropImg);
      this.croppingRender = false;
      this.SET_GLOBAL_LOADING(true);
      setTimeout(() => {
        this.croppingRender = true;
        setTimeout(() => {
          this.$refs.cropper.relativeZoom(-0.1);
          this.SET_GLOBAL_LOADING(false);
        }, 100);
      }, 100);
    }
  },
  components: {
    VueCropper
  },
  data() {
    return {
      mimeType: "image/png",
      quality: 1,
      visiblePopUp: false,
      croppingRender: true
    };
  }
};
</script>

<style>
.cropper-crop {
  cursor: auto !important;
}
</style>