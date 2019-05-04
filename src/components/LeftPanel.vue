<template>
  <a-drawer
    placement="left"
    :width="450"
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
          <td style="background-color:#2B569A;width: 120px;vertical-align:top">
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
                <label style="color:white">New</label>
              </div>
              <div
                style="width:100%;font-weight: 300; padding-left:13px;padding-top:3px; padding-bottom:3px ;"
                @click="panelName='update'"
              >
                <label style="color:white">Update</label>
              </div>
              <div
                style="width:100%; font-weight: 300;padding-left:13px;padding-top:3px; padding-bottom:3px ;"
                @click="panelName='open'"
              >
                <label style="color:white">Open</label>
              </div>
            </div>
          </td>
          <td style="background-color:#F1F1F1;vertical-align:top">
            <div
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
            </div>
          </td>
        </tr>
      </table>
    </div>
  </a-drawer>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import NewPanel from "./LeftPanel/New";
import OpenPanel from "./LeftPanel/Open";
import UpdatePanel from "./LeftPanel/Update";
export default {
  methods: {
    ...mapMutations("LeftPanel", {
      setVisible: "setVisible"
    }),
    closeFilePanel() {}
  },
  components: {
    NewPanel,
    OpenPanel,
    UpdatePanel
  },
  computed: {
    ...mapState("LeftPanel", {
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
