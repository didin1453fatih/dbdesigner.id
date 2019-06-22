<template>
  <a-spin :indicator="indicator" :spinning="loading" type="sync" size="large" spin>
    <div style="padding-right:30px">
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
      <div style="margin-top:20px">
        <label>Password</label>
        <br>
        <a-button style="right:0px;margin-top:5px" @click="setVisibleChangePassword(true)">Change</a-button>
      </div>
      <a-drawer
        width="320"
        :closable="false"
        :visible="visibleChangePassword"
        @close="setVisibleChangePassword(false)"
      >
        <div
          style="width: -webkit-fill-available;
         height: -webkit-fill-available;margin:-24px;background-color:#F1F1F1;"
        >
          <a-spin
            :indicator="indicator"
            :spinning="loadingChangePassword"
            type="sync"
            size="large"
            spin
          >
            <div
              style="width: -webkit-fill-available;
         height: -webkit-fill-available;background-color:#F1F1F1;"
            >
              <div style="padding:24px; padding-left:30px">
                <h3>Change Password</h3>
                <div style="margin-top:20px">
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
            </div>
          </a-spin>
        </div>
      </a-drawer>
      <!-- <div style="margin-top:20px">
      <label>Old Password</label>
      <br>
      <a-input  style="margin-top:5px"/>
    </div>

    <div style="margin-top:20px">
      <label>New Password</label>
      <br>
      <a-input  style="margin-top:5px"/>
    </div>

    <div style="margin-top:20px">
      <label>Confirm Password</label>
      <br>
      <a-input  style="margin-top:5px"/>
      </div>-->

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
    onChangeTo() {},
    onChangeDatabase() {},
    onChangeScript() {},
    closeFilePanel() {},
    ...mapActions("Account", {
      updateAccount: "updateAccount",
      readAccount: "readAccount",
      changePassword: "changePassword"
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
