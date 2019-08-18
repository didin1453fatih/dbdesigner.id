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
                <img src="@/assets/icons8-go-back-50.png" width="35px">
              </div>
              <!-- <div
                style="width:100%;font-weight: 300; padding-left:13px;padding-top:3px; padding-bottom:3px ; margin-top:10px;"
                @click="panelName='login'"
              >
                <label style="color:white">Login</label>
              </div>-->
              <div
                style="width:100%;font-weight: 300; padding-left:13px;padding-top:3px; padding-bottom:3px ; margin-top:10px;"
                @click="setPanelName('new')"
              >
                <label style="color:white">New</label>
              </div>
              <!-- <div
                style="width:100%;font-weight: 300; padding-left:13px;padding-top:3px; padding-bottom:3px ;"
                @click="panelName='update'"
              >
                <label style="color:white">Update</label>
              </div>-->
              <div
                style="width:100%; font-weight: 300;padding-left:13px;padding-top:3px; padding-bottom:3px ;"
                @click="setPanelName('open')"
              >
                <label style="color:white">Open</label>
              </div>
              <div
                style="width:100%; font-weight: 300;padding-left:13px;padding-top:3px; padding-bottom:3px ;"
                @click="setPanelName('properties')"
              >
                <label style="color:white">Properties</label>
              </div>
              <div
                style="width:100%; font-weight: 300;padding-left:13px;margin-top:13px; margin-bottom:13px ;"
              >
                <!-- <div style="color:white;background:white;height:0.5px; width:75%">
                </div>-->
              </div>
              <div
                style="width:100%; font-weight: 300;padding-left:13px;padding-top:3px; padding-bottom:3px ;"
                @click="setPanelName('account')"
              >
                <label style="color:white">Account</label>
              </div>                         
              <div
                v-show="id===null"
                style="width:100%; font-weight: 300;padding-left:13px;padding-top:3px; padding-bottom:3px ;"
                @click="setPanelName('login')"
              >
                <label style="color:white">Login</label>
              </div>
              <div
                v-show="id!==null"
                style="width:100%; font-weight: 300;padding-left:13px;padding-top:3px; padding-bottom:3px ;"
                @click="logoutAccount()"
              >
                <label style="color:white">Logout</label>
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
            <div
              v-else-if="panelName==='properties'"
              style="padding-top:30px; padding-left:25px; width:300px"
              class="fg-black"
            >
              <properties/>
            </div>
            <div
              v-else-if="panelName==='login'"
              style="padding-top:30px; padding-left:25px; width:300px"
              class="fg-black"
            >
              <login/>
            </div>
            <div
              v-else-if="panelName==='account'"
              style="padding-top:30px; padding-left:25px; width:300px"
              class="fg-black"
            >
              <account/>
            </div>
            <div
              v-else-if="panelName==='OpenSharedWithPassword'"
              style="padding-top:30px; padding-left:25px; width:300px"
              class="fg-black"
            >
              <open-shared-with-password/>
            </div>            
          </td>
        </tr>
      </table>
    </div>
  </a-drawer>
</template>

<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import NewPanel from "./Component/New";
import OpenPanel from "./Component/Open";
import UpdatePanel from "./Component/Update";
import Properties from "./Component/Properties";
import Login from "./Component/Login";
import Account from "./Component/Account";
import OpenSharedWithPassword from './Component/OpenSharedWithPassword'
export default {
  methods: {
    ...mapMutations("LeftPanel", {
      setVisible: "setVisible",
      setPanelName: "setPanelName"
    }),
    closeFilePanel() {
      this.setVisible(false);
    },
    ...mapActions("Account", {
      logoutAccount: "logoutAccount"
    })
  },
  components: {
    NewPanel,
    OpenPanel,
    UpdatePanel,
    Properties,
    Login,
    Account,
    OpenSharedWithPassword
  },
  computed: {
    ...mapState("LeftPanel", {
      visible: state => state.visible,
      panelName: state => state.panelName
    }),
    ...mapState("Account", {
      id: state => state.id
    })
  },
  data() {
    return {
      // panelName: "open"
    };
  }
};
</script>

<style scoped>
</style>
