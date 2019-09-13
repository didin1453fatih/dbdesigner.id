<template>
  <div>
    <h3>SQL</h3>
    <div v-if="step===0">
      <div style="margin-top:20px">
        <label>Database</label>
        <br>
        <a-radio-group @change="onChangeDatabase" defaultChecked="mysql" defaultValue="mysql" style="margin-top:5px">
          <a-radio-button value="postgree" disabled>Postgree</a-radio-button>
          <a-radio-button value="mssgl" disabled>MS SQL</a-radio-button>
          <a-radio-button value="mysql">MySQL</a-radio-button>
          <a-radio-button value="oracle" disabled>Oracle</a-radio-button>
        </a-radio-group>
      </div>

      <div style="margin-top:20px">
        <label>Script</label>
        <br>
        <a-radio-group
          v-model="scriptType"
          defaultChecked="create"
          defaultValue="create"
          style="margin-top:5px"
        >
          <a-radio-button value="drop">Drop</a-radio-button>
          <a-radio-button value="create">Create</a-radio-button>
        </a-radio-group>
      </div>
      <div style="margin-top:30px;     text-align: right;">
        <a-button style="right:40px" @click="exportNextEvent()">Next</a-button>
      </div>
    </div>
    <div v-else-if="step===1" style="padding-right:30px">
      <a-textarea
        :value="sqlScript"
        placeholder="Generated Script"
        :rows="14"
        style="height: 400px;white-space: nowrap; font-family:Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace;"
      />
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
    ...mapState("RightDialog/ExportAndShare/Component/Export", {
      sqlScript: state => state.diagramScript
    })
  },
  methods: {
    onChangeTo() {},
    onChangeDatabase() {},
    onChangeScript(val) {
      this.scriptType = val;
      window.alert(JSON.stringify(val));
    },
    closeFilePanel() {},
    exportNextEvent() {
      this.step = 1;
      this.goExport({
        scriptType: this.scriptType
      });
    },
    ...mapActions("RightDialog/ExportAndShare/Component/Export", {
      goExport: "goExport"
    }),
    ...mapMutations("RightDialog/ExportAndShare/Component/Export", {
      openExport: "setVisible"
    })
  },
  data() {
    return {
      step: 0,
      scriptType: "create"
    };
  }
};
</script>

<style>
</style>

