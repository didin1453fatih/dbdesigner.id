<template>
  <div>
    <a-spin :indicator="indicator" :spinning="loading" type="sync" size="large" spin>
      <div>
        <h3>Forget Password</h3>
        <div style="margin-top:20px">
          <label>Email</label>
          <a-input
            :value="email"
            name="email"
            @change="setEmail($event.target.value)"
            style="margin-top:3px"
            placeholder="Input Email"
          />
        </div>
        <div style="margin-top:15px;">
          <a-row>
            <a-col :span="12" @click="doLogin">
              <a>Login ?</a>
            </a-col>
            <a-col :span="12" style="text-align: right;">
              <a-button style="right:0" @click="doForgotPssword">Submit</a-button>
            </a-col>
          </a-row>
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
    ...mapState("LeftDialog/FileMenu/Component/ForgotPassword", {
      email: state => state.email,
      loading: state => state.loading
    })
  },
  methods: {
    ...mapActions("LeftDialog/FileMenu/Component/ForgotPassword", {
      doForgotPssword: "doForgotPssword"
    }),
    ...mapMutations("LeftDialog/FileMenu/Component/ForgotPassword", {
      setEmail: "setEmail"
    }),
    ...mapMutations("LeftDialog/FileMenu/Layout", {
      setVisiblePanel: "setVisible",
      SET_PANEL_NAME: "setPanelName"
    }),
    doLogin() {
      this.setVisiblePanel(true);
      this.SET_PANEL_NAME("login");
    }
  },
  data() {
    return {
      indicator: <a-icon type="loading" spin />
    };
  }
};
</script>

