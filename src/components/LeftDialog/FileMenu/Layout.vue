<template>
  <a-drawer
    placement="left"
    :width="450"
    :closable="false"
    @close="setVisible(false)"
    :visible="visible"
  >
    <div style="width: -webkit-fill-available;
         height: 100vh;margin:-24px">
      <table style="width: -webkit-fill-available;
         height: -webkit-fill-available;">
        <tr>
          <td style="background-color:#2B569A;width: 120px;vertical-align:top">
            <div style="padding-top:10px;;height:100%;">
              <div
                style="width:100%; padding-left:13px;padding-top:3px; padding-bottom:3px; "
                @click="closeFilePanel"
              >
                <img src="@/assets/icons8-go-back-50.png" width="35px" />
              </div>
              <div
                style="width:100%;font-weight: 300; padding-left:13px;padding-top:3px; padding-bottom:3px ; margin-top:10px;"
                @click="setPanelName('new')"
              >
                <label style="color:white">New</label>
              </div>
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
              </div>
              <div
                v-show="account_id!==null"
                style="width:100%; font-weight: 300;padding-left:13px;padding-top:3px; padding-bottom:3px ;"
                @click="setPanelName('account')"
              >
                <label style="color:white">Account</label>
              </div>
              <div
                v-show="account_id===null"
                style="width:100%; font-weight: 300;padding-left:13px;padding-top:3px; padding-bottom:3px ;"
                @click="setPanelName('login')"
              >
                <label style="color:white">Login</label>
              </div>                  
              <div
                v-show="account_id===null"
                style="width:100%; font-weight: 300;padding-left:13px;padding-top:3px; padding-bottom:3px ;"
                @click="setPanelName('forgotPassword')"
              >
                <label style="color:white">Forgot</label>
              </div>                        
              <div
                v-show="account_id===null"
                style="width:100%; font-weight: 300;padding-left:13px;padding-top:3px; padding-bottom:3px ;"
                @click="setPanelName('registration')"
              >
                <label style="color:white">Registration</label>
              </div>              
              <div
                v-show="account_id!==null"
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
              <new-panel />
            </div>
            <div
              v-else-if="panelName==='open'"
              style="padding-top:30px; padding-left:25px; width:300px"
              class="fg-black"
            >
              <open-panel />
            </div>
            <div
              v-else-if="panelName==='properties'"
              style="padding-top:30px; padding-left:25px; width:300px"
              class="fg-black"
            >
              <properties />
            </div>
            <div
              v-else-if="panelName==='login'"
              style="padding-top:30px; padding-left:25px; width:300px"
              class="fg-black"
            >
              <login />
            </div>
            <div
              v-else-if="panelName==='account'"
              style="padding-top:30px; padding-left:25px; width:300px"
              class="fg-black"
            >
              <account />
            </div>
            <div
              v-else-if="panelName==='OpenSharedWithPassword'"
              style="padding-top:30px; padding-left:25px; width:300px"
              class="fg-black"
            >
              <open-shared-with-password />
            </div>
            <div
              v-else-if="panelName==='registration'"
              style="padding-top:30px; padding-left:25px; width:300px"
              class="fg-black"
            >
              <registration />
            </div>
            <div
              v-else-if="panelName==='forgotPassword'"
              style="padding-top:30px; padding-left:25px; width:300px"
              class="fg-black"
            >
              <forgot-password />
            </div>     
            <div
              v-else-if="panelName==='resetPassword'"
              style="padding-top:30px; padding-left:25px; width:300px"
              class="fg-black"
            >
              <reset-password />
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
import ResetPassword from "./Component/ResetPassword"
import ForgotPassword from "./Component/ForgotPassword"
import NewPanel from "./Component/New";
import OpenPanel from "./Component/Open";
import Properties from "./Component/Properties";
import Login from "./Component/Login";
import Account from "./Component/Account";
import OpenSharedWithPassword from "./Component/OpenSharedWithPassword";
import Registration from "./Component/Registration";
import { message } from "ant-design-vue";
export default {
  methods: {
    ...mapMutations("LeftDialog/FileMenu/Layout", {
      setVisible: "setVisible",
      SET_PANEL_NAME: "setPanelName"
    }),
    setPanelName(value) {
      if (value === "new" && this.account_id === null) {
        return message.error("You must login first to create new design 😉", 2);
      }

      if (value === "open" && this.account_id === null) {
        return message.error("You must login first to open the design 😉", 2);
      }

      if (value === "properties" && this.account_id === null) {
        return message.error("You must login first to open the properties 😉", 2);
      }

      if (value === "properties" && this.project_description_uuid === null && this.account_id !== null) {
        message.warning(
          "open the project before see description 😎",
          2
        );
        return this.SET_PANEL_NAME("open");
      }
      this.SET_PANEL_NAME(value);
    },
    closeFilePanel() {
      this.setVisible(false);
    },
    ...mapActions("LeftDialog/FileMenu/Layout", {
      logoutAccount: "logoutAccount"
    })
  },
  components: {
    NewPanel,
    OpenPanel,
    Properties,
    Login,
    Account,
    OpenSharedWithPassword,
    Registration,
    ForgotPassword,
    ResetPassword
  },
  computed: {
    ...mapState("LeftDialog/FileMenu/Layout", {
      visible: state => state.visible,
      panelName: state => state.panelName
    }),
    ...mapState("Data/Account", {
      account_id: state => state.id
    }),
    ...mapState("Data/Project", {
      project_description_uuid: state => state.projectDescription.uuid
    })
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>
