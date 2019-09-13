<template>
  <div>
    <h3>Image</h3>
    <div v-if="step===0">
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
        <a-radio-group
          v-model="quality"
          :defaultChecked="1"
          :defaultValue="1"
          style="margin-top:5px"
        >
          <a-radio-button :value="1">Default</a-radio-button>
          <a-radio-button :value="2">High</a-radio-button>
          <a-radio-button :value="3">Best</a-radio-button>
        </a-radio-group>
      </div>
      <div style="margin-top:30px;     text-align: right;">
        <a-button style="right:40px" @click="exportImage()">Next</a-button>
      </div>
    </div>
    <div v-else-if="step===1" style="padding-right:30px">
      <img :src="imageBase64" />
      <div style="margin-top:30px;     text-align: right;">
        <a-button style="right:0px" @click="step=0">Back</a-button>
        <a-button style="left:0px" @click="downloadEvent">Download</a-button>
      </div>
    </div>
  </div>
</template>


<script>
import { mapMutations } from "vuex";
import { mapState } from "vuex";
import { EventBus } from "@/helper/EventBus";
export default {
  computed: {
    ...mapState("RightDialog/ExportAndShare/Component/Image", {
      imageBase64: state => state.imageBase64
    })
  },
  methods: {
    exportImage() {
      EventBus.$emit("Canvas/exportToDataURL", {
        mimeType: this.mimeType,
        pixelRatio: this.quality
      });
      this.step = 1;
    },
    downloadEvent() {
      this.downloadURI(this.imageBase64, "stage.png");
    },
    exportNextEvent() {
      this.step = 1;
    },
    ...mapMutations("RightDialog/ExportAndShare/Component/Image", {
      openExport: "setVisible"
    }),
    downloadURI: function(uri, name) {
      var link = document.createElement("a");
      link.download = name;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // delete link;
    }
  },
  data() {
    return {
      step: 0,
      mimeType: "image/png",
      quality: 1
    };
  }
};
</script>

<style>
</style>