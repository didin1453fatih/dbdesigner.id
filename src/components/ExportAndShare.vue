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
            <div style="padding-top:10px;height:-webkit-fill-available;;">
              <div
                style="width:100%; padding-left:13px;padding-top:3px; padding-bottom:3px; "
                @click="closeFilePanel"
              >
                <img src="../assets/icons8-go-back-50.png" width="35px">
              </div>
              <div
                style="width:100%;font-weight: 300; padding-left:13px;padding-top:3px; padding-bottom:3px ; margin-top:10px;"
                @click="panelName='export'"
              >
                <label style="color:white">Export</label>
              </div>
              <div
                style="width:100%;font-weight: 300; padding-left:13px;padding-top:3px; padding-bottom:3px ;"
                @click="panelName='share'"
              >
                <label style="color:white">Share</label>
              </div>
              <div
                style="width:100%;font-weight: 300; padding-left:13px;padding-top:3px; padding-bottom:3px ;"
                @click="panelName='account'"
              >
                <label style="color:white">Account</label>
              </div>
            </div>
          </td>
          <td style="background-color:#F1F1F1;vertical-align:top">
            <div
              v-if="panelName==='export'"
              style="padding-top:30px; padding-left:25px; width:100%;height:-webkit-fill-available;"
              class="fg-black"
            >
              <export/>
            </div>
            <div
              v-else-if="panelName==='share'"
              style="padding-top:30px; padding-left:25px; width:100%"
              class="fg-black"
            >
              <Share/>
            </div>
            <div
              v-else-if="panelName==='account'"
              style="padding-top:30px; padding-left:25px; width:100%"
              class="fg-black"
            >
              <User-Account/>
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
import Export from "./Export";
import Share from "./Share";
import UserAccount from "./UserAccount";
export default {
  methods: {
    ...mapMutations("ExportDesign", {
      setVisible: "setVisible"
    }),
    closeFilePanel() {}
  },
  components: {
    Export,
    Share,
    UserAccount
  },
  computed: {
    ...mapState("ExportDesign", {
      visible: state => state.visible
    })
  },
  data() {
    return {
      panelName: "share"
    };
  }
};
</script>

<style scoped>
</style>
