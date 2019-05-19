<template>
  <div>
    <h3>Export</h3>
    <div v-if="step===0">
      <div style="margin-top:20px">
        <label>To</label>
        <br>
        <a-radio-group @change="onChangeTo" defaultValue="a" style="margin-top:5px">
          <a-radio-button value="a">SQL</a-radio-button>
          <a-radio-button value="b" disabled>Image</a-radio-button>
          <a-radio-button value="c" disabled>PDF</a-radio-button>
        </a-radio-group>
      </div>
      <div style="margin-top:20px">
        <label>Database</label>
        <br>
        <a-radio-group @change="onChangeDatabase" defaultValue="a" style="margin-top:5px">
          <a-radio-button value="b" disabled>Postgree</a-radio-button>
          <a-radio-button value="bb" disabled>MS SQL</a-radio-button>
          <a-radio-button value="a">MySQL</a-radio-button>
          <a-radio-button value="c" disabled>Oracle</a-radio-button>
        </a-radio-group>
      </div>

      <div style="margin-top:20px">
        <label>Script</label>
        <br>
        <a-radio-group @change="onChangeScript" defaultValue="a" style="margin-top:5px">
          <a-radio-button value="b" disabled>Drop</a-radio-button>
          <a-radio-button value="a">Create</a-radio-button>
        </a-radio-group>
      </div>
      <div style="margin-top:30px;     text-align: right;">
        <a-button style="right:40px" @click="exportNextEvent()">Next</a-button>
      </div>
    </div>
    <div v-else-if="step===1" style="padding-right:30px">
      <a-textarea :value="sqlScript" placeholder="Generated Script" :rows="14" style="height: 400px;"/>
      <div style="margin-top:30px;     text-align: right;">
        <a-button style="right:0px" @click="step=0">Back</a-button>
      </div>
    </div>
  </div>
</template>


<script>
import { mapMutations } from "vuex";
import { mapActions } from "vuex";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("ExportDesign", {
      sqlScript: state => state.diagramScript
    })
  },
  methods: {
    onChangeTo() {},
    onChangeDatabase() {},
    onChangeScript() {},
    closeFilePanel() {},
    exportNextEvent() {
      this.step = 1;
      this.goExport();
    },
    ...mapActions("ExportDesign", {
      goExport: "goExport"
    }),
    ...mapMutations("ExportDesign", {
      openExport: "setVisible"
    })
  },
  data() {
    return {
      step: 0
    };
  }
};
</script>

<style>
</style>

