<template>
  <div>
    <a-spin :indicator="indicator" :spinning="loading" type="sync" size="large" spin>
      <div>
        <h3>Email Confirmation</h3>
        <div style="margin-top:20px">
          <!-- <label>Email</label>
          <a-input
            :value="email"
            name="email"
            @change="setEmail($event.target.value)"
            style="margin-top:3px"
            placeholder="Input Email"
          />
          <label>Password</label>
          <a-input
            type="password"
            name="password"
            :value="password"
            @change="setPassword($event.target.value)"
            style="margin-top:3px"
            placeholder="input password"
          />-->
        </div>
        <!-- <div style="margin-top:15px;">
          <a-row>
            <a-col :span="12" @click="doForgotPassword">
              <a>Forgot password ?</a>
            </a-col>
            <a-col :span="12" style="text-align: right;">
              <a-button style="right:0" @click="doLogin">Login</a-button>
            </a-col>
          </a-row>
        </div>-->
      </div>
    </a-spin>
  </div>
</template>


<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("LeftDialog/FileMenu/Component/EmailConfirmation", {
      loading: state => state.loading
    })
  },
  methods: {
    ...mapActions("LeftDialog/FileMenu/Component/EmailConfirmation", {
      mailConfirmation: "mailConfirmation"
    })
  },
  data() {
    return {
      indicator: <a-icon type="loading" spin />
    };
  }
};
</script>

