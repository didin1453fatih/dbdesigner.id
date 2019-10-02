<template>
  <div>
    <a-spin :indicator="indicator" :spinning="loading" type="sync" size="large" spin>
      <div>
        <h3>Registration</h3>
        <div style="margin-top:20px">
          <label>Username</label>
          <a-input
            :value="user_name"
            @change="SET_USER_NAME($event.target.value)"
            style="margin-top:3px"
            placeholder="Input Username"
          />
          <label>Full Name</label>
          <a-input
            :value="complete_name"
            @change="SET_COMPLETE_NAME($event.target.value)"
            style="margin-top:3px"
            placeholder="Input Full Name"
          />
          <label>Gender</label>
          <a-input
            :value="gender"
            @change="SET_GENDER($event.target.value)"
            style="margin-top:3px"
            placeholder="Input Gender"
          />
          <label>Email</label>
          <a-input
            :value="email"
            @change="SET_EMAIL($event.target.value)"
            style="margin-top:3px"
            placeholder="Input Email"
          />
          <label>Password</label>
          <a-input
            type="password"
            :value="password"
            @change="SET_PASSWORD($event.target.value)"
            style="margin-top:3px"
            placeholder="input password"
          />
          <label>Confirm Password</label>
          <a-input
            type="password"
            :value="password_confirm"
            @change="SET_PASSWORD_CONFIRM($event.target.value)"
            style="margin-top:3px"
            placeholder="input confirm password"
          />
        </div>
        <div style="margin-top:15px;     text-align: right;">
          <a-button style="right:0" @click="doLogin">Submit</a-button>
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
    ...mapState("LeftDialog/FileMenu/Component/Registration", {
      loading: state => state.loading,
      user_name: state => state.user_name,
      complete_name: state => state.complete_name,
      gender: state => state.gender,
      email: state => state.email,
      password: state => state.password,
      password_confirm: state => state.password_confirm
    })
  },
  methods: {
    ...mapActions("LeftDialog/FileMenu/Component/Registration", {
      doLogin: "doLogin"
    }),
    ...mapMutations("LeftDialog/FileMenu/Component/Registration", {
      SET_LOADING: "SET_LOADING",
      SET_USER_NAME: "SET_USER_NAME",
      SET_COMPLETE_NAME: "SET_COMPLETE_NAME",
      SET_GENDER: "SET_GENDER",
      SET_EMAIL: "SET_EMAIL",
      SET_PASSWORD: "SET_PASSWORD",
      SET_PASSWORD_CONFIRM: "SET_PASSWORD_CONFIRM"
    })
  },
  data() {
    return {
      indicator: <a-icon type="loading" spin />
    };
  }
};
</script>

