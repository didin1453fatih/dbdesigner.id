<template>
  <a-spin :indicator="indicator" :spinning="loading" type="sync" size="large" spin>
    <div>
      <h3>Account</h3>
      <div style="margin-top:20px">
        <label>Full Name</label>
        <br>
        <a-input
          :value="fullName"
          @change="setFullName($event.target.value)"
          defaultValue="Dienastya Galih Pradana"
          style="margin-top:5px"
        />
      </div>
      <div style="margin-top:20px">
        <label>Gender</label>
        <br>
        <a-select :value="gender" style="margin-top:5px;width: 100%" @change="setGender($event)">
          <a-select-option value="L">Male</a-select-option>
          <a-select-option value="P">Female</a-select-option>
        </a-select>
        <!-- <a-input :value="gender" defaultValue="L" style="margin-top:5px"/> -->
      </div>
      <div style="margin-top:20px">
        <label>Username</label>
        <br>
        <a-input
          :value="username"
          defaultValue="galih1994"
          style="margin-top:5px;color: rgba(0, 0, 0, 0.65);"
          disabled
        />
      </div>
      <div style="margin-top:20px">
        <label>Email</label>
        <br>
        <a-input
          :value="email"
          disabled
          defaultValue="galih1994@gmail.com"
          style="margin-top:5px;color: rgba(0, 0, 0, 0.65);"
        ></a-input>
      </div>
      <div style="margin-top:20px" v-if="verified===false">
        <label>Resend Email Verification</label>
        <br>
        <a-button style="right:0px;margin-top:5px" @click="resendEmailConfirmation()">Resend</a-button>
      </div>      
      <div style="margin-top:20px">
        <label>Password</label>
        <br>
        <a-button style="right:0px;margin-top:5px" @click="setVisibleChangePassword(true)">Change</a-button>
      </div>
      <a-drawer
        placement="left"
        :width="450"
        :closable="false"
        :visible="visibleChangePassword"
        @close="setVisibleChangePassword(false)"
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
                    @click="setPanelName('login')"
                  >
                    <label style="color:white">Login</label>
                  </div>
                  <div
                    style="width:100%; font-weight: 300;padding-left:13px;padding-top:3px; padding-bottom:3px ;"
                    @click="setPanelName('account')"
                  >
                    <label style="color:white">Account</label>
                  </div>
                </div>
              </td>
              <td style="background-color:#F1F1F1;vertical-align:top">
                <div style="padding-top:30px; padding-left:25px; width:300px" class="fg-black">
                  <a-spin
                    :indicator="indicator"
                    :spinning="loadingChangePassword"
                    type="sync"
                    size="large"
                    spin
                  >
                    <div
                      style="width: -webkit-fill-available;
         height: -webkit-fill-available;background-color:#F1F1F1;width:90%"
                    >
                      <h3>Change Password</h3>
                      <div style="margin-top:30px">
                        <label>Old Password</label>
                        <br>
                        <a-input
                          :value="oldPassword"
                          @change="setOldPassword($event.target.value)"
                          type="password"
                          style="margin-top:5px"
                        />
                      </div>

                      <div style="margin-top:20px">
                        <label>New Password</label>
                        <br>
                        <a-input
                          :value="newPassword"
                          @change="setNewPassword($event.target.value)"
                          type="password"
                          style="margin-top:5px"
                        />
                      </div>

                      <div style="margin-top:20px">
                        <label>Confirm Password</label>
                        <br>
                        <a-input
                          :value="confirmNewPassword"
                          @change="setConfirmNewPassword($event.target.value)"
                          type="password"
                          style="margin-top:5px"
                        />
                      </div>
                      <div style="margin-top:40px;     text-align: right;">
                        <a-button style="right:0px" @click="changePassword">Save</a-button>
                      </div>
                    </div>
                  </a-spin>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </a-drawer>
      <div style="margin-top:30px;     text-align: right;">
        <a-button style="right:0px" @click="updateAccount">Save</a-button>
      </div>
    </div>
  </a-spin>
</template>


<script>
import { mapMutations } from "vuex";
import { mapActions } from "vuex";
import { mapState } from "vuex";
export default {
  mounted() {
    this.readAccount();
  },
  methods: {
    ...mapMutations("LeftPanel", {
      setPanelNameLeftPanel: "setPanelName"
    }),
    setPanelName(val) {
      this.setVisibleChangePassword(false);
      setTimeout(() => {
        this.setPanelNameLeftPanel(val);
      }, 100);
    },
    onChangeDatabase() {},
    onChangeScript() {},
    closeFilePanel() {},
    ...mapActions("Account", {
      updateAccount: "updateAccount",
      readAccount: "readAccount",
      changePassword: "changePassword",
      resendEmailConfirmation: "resendEmailConfirmation"
    }),
    ...mapMutations("Account", {
      setFullName: "setFullName",
      setGender: "setGender",
      setConfirmNewPassword: "setConfirmNewPassword",
      setLoadingChangePassword: "setLoadingChangePassword",
      setNewPassword: "setNewPassword",
      setOldPassword: "setOldPassword",
      setVisibleChangePassword: "setVisibleChangePassword"
    })
  },
  computed: {
    ...mapState("Account", {
      verified: state => state.verified,
      fullName: state => state.fullName,
      gender: state => state.gender,
      username: state => state.username,
      email: state => state.email,
      loading: state => state.loading,
      loadingChangePassword: state => state.loadingChangePassword,
      visibleChangePassword: state => state.visibleChangePassword,
      oldPassword: state => state.oldPassword,
      newPassword: state => state.newPassword,
      confirmNewPassword: state => state.confirmNewPassword
    })
  },
  data() {
    return {
      indicator: <a-icon type="loading" spin />,
      childrenDrawer: false
    };
  }
};
</script>

<style scoped>
.ant-drawer-content {
  background-color: #f1f1f1 !important;
}
</style>
