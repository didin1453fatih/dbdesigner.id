<template>
  <div>
    <a-spin :indicator="indicator" :spinning="loading" type="sync" size="large" spin>
      <div>
        <h3>Reset Password</h3>
        <div style="margin-top:20px;">
          <label>Password</label>
          <a-input
            type="password"
            :value="password"
            name="password"
            @change="SET_PASSWORD($event.target.value)"
            style="margin-top:3px;margin-bottom:5px"
            placeholder="Input Password"
          />
          <label >Password Verify</label>
          <a-input
            type="password"
            name="password_verify"
            :value="password_verify"
            @change="SET_PASSWORD_VERIFY($event.target.value)"
            style="margin-top:3px"
            placeholder="Verify you password"
          />
        </div>
        <div style="margin-top:15px;text-align: right;">
          <a-button style="right:0" @click="doResetPassword">Submit</a-button>
        </div>
      </div>
    </a-spin>
  </div>
</template>


<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("LeftDialog/FileMenu/Component/ResetPassword", {
      password: state => state.password,
      password_verify: state => state.password_verify,
      loading: state => state.loading
    })
  },
  methods: {
    ...mapActions("LeftDialog/FileMenu/Component/ResetPassword", {
      doResetPassword: "doResetPassword"
    }),
    ...mapMutations("LeftDialog/FileMenu/Component/ResetPassword", {
      SET_PASSWORD: "SET_PASSWORD",
      SET_PASSWORD_VERIFY: "SET_PASSWORD_VERIFY"
    }),
    ...mapMutations("LeftDialog/FileMenu/Layout", {
      setVisiblePanel: "setVisible",
      SET_PANEL_NAME: "setPanelName"
    }),
    doForgotPassword() {
      this.setVisiblePanel(true);
      this.SET_PANEL_NAME("forgotPassword");
    }
  },
  data() {
    return {
      indicator: <a-icon type="loading" spin />
    };
  }
};
</script>

