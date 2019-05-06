<template>
  <a-drawer
    placement="right"
    :width="480"
    :closable="false"
    @close="setVisible(false)"
    :visible="visible"
  >
    <div
      style="width: -webkit-fill-available;
         height: -webkit-fill-available;margin:-24px"
    >
      <table style="width: -webkit-fill-available;
         height: -webkit-fill-available;">
        <tr>
          <td style="background-color:#2B569A;width: 100px;vertical-align:top">
            <div style="padding-top:10px;;height:100%;">
              <div
                style="width:100%; padding-left:13px;padding-top:3px; padding-bottom:3px; "
                @click="closeFilePanel"
              >
                <img src="../assets/icons8-go-back-50.png" width="35px">
              </div>
              <div
                style="width:100%;font-weight: 300; padding-left:13px;padding-top:3px; padding-bottom:3px ; margin-top:10px;"
                @click="panelName='new'"
              >
                <label style="color:white">Export</label>
              </div>
              <div
                style="width:100%;font-weight: 300; padding-left:13px;padding-top:3px; padding-bottom:3px ;"
                @click="panelName='update'"
              >
                <label style="color:white">Share</label>
              </div>
            </div>
          </td>
          <td style="background-color:#F1F1F1;vertical-align:top">
            <div style="padding-top:30px; padding-left:25px; width:100%" class="fg-black">
              <h3>Export</h3>
              <div style="margin-top:20px">
                <label>To</label>
                <br>
                <a-radio-group @change="onChange" defaultValue="a" style="margin-top:5px">
                  <a-radio-button value="a">SQL</a-radio-button>
                  <a-radio-button value="b" disabled>Image</a-radio-button>
                  <a-radio-button value="c" disabled>PDF</a-radio-button>
                </a-radio-group>
              </div>
              <div style="margin-top:20px">
                <label>Database</label>
                <br>
                <a-radio-group @change="onChange" defaultValue="a" style="margin-top:5px">
                  <a-radio-button value="b" disabled>Postgree</a-radio-button>
                  <a-radio-button value="bb" disabled>MS SQL</a-radio-button>
                  <a-radio-button value="a">MySQL</a-radio-button>
                  <a-radio-button value="c" disabled>Oracle</a-radio-button>
                </a-radio-group>
              </div>

              <div style="margin-top:20px">
                <label>Scripty</label>
                <br>
                <a-radio-group @change="onChange" defaultValue="a" style="margin-top:5px">
                  <a-radio-button value="b" disabled>Drop</a-radio-button>
                  <a-radio-button value="a">Create</a-radio-button>
                </a-radio-group>
              </div>
              <div style="margin-top:30px;     text-align: right;">
                <a-button style="right:40px">Create</a-button>
              </div>
            </div>
            <!-- <div
              v-if="panelName==='new'"
              style="padding-top:30px; padding-left:25px; width:300px"
              class="fg-black"
            >
              <new-panel/>
            </div>
            <div
              v-else-if="panelName==='open'"
              style="padding-top:30px; padding-left:25px; width:300px"
              class="fg-black"
            >
              <open-panel/>
            </div>
            <div
              v-else-if="panelName==='update'"
              style="padding-top:30px; padding-left:25px; width:300px"
              class="fg-black"
            >
              <update-panel/>
            </div>-->
          </td>
        </tr>
      </table>
    </div>
  </a-drawer>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations("ExportDesign", {
      setVisible: "setVisible"
    }),
    closeFilePanel() {}
  },
  components: {},
  computed: {
    ...mapState("ExportDesign", {
      visible: state => state.visible
    })
  },
  data() {
    return {
      panelName: "open"
    };
  }
};
</script>

<style scoped>
</style>
