<template>
  <div>
    <a-spin :indicator="indicator" :spinning="loading" type="sync" size="large" spin>
      <div>
        <h3>Login</h3>
        <div style="margin-top:20px">
          <label>Email</label>
          <a-input
            :value="email"
            @change="setEmail($event.target.value)"
            style="margin-top:3px"
            placeholder="Input Email"
          />
          <label>Password</label>
          <a-input
            type="password"
            :value="password"
            @change="setPassword($event.target.value)"
            style="margin-top:3px"
            placeholder="input password"
          />
        </div>
        <div style="margin-top:15px;     text-align: right;">
          <a-button style="right:0" @click="doLogin">Login</a-button>
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
    ...mapState("Login", {
      email: state => state.email,
      password: state => state.password,
      loading: state => state.loading
    })
  },
  methods: {
    ...mapActions("Login", {
      doLogin: "doLogin"
    }),
    ...mapMutations("Login", {
      setEmail: "setEmail",
      setPassword: "setPassword"
    })
  },
  data() {
    return {
      indicator: <a-icon type="loading" spin />
    };
  }
};
</script>

