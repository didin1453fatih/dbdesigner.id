<template>
  <div>
    <a-spin :indicator="indicator" :spinning="loading" type="sync" size="large" spin>
      <div>
        <h3>Registration</h3>
        <div style="margin-top:20px">
          <label>Username</label>
          <a-input
            :value="user_name"
            @change="SET_USER_NAME($event.target.value);checkUsername();"
            style="margin-top:3px"
            placeholder="Input Username"
          >
            <a-icon
              v-if="status_check_user_name==='checking'"
              slot="suffix"
              type="loading"
              style="color: rgba(43, 86, 154,.75)"
            />
            <a-icon
              v-else-if="status_check_user_name==='ok'"
              slot="suffix"
              type="check-circle"
              style="color: rgba(0,100,0,.45)"
            />
            <a-icon
              v-else-if="status_check_user_name==='error'"
              slot="suffix"
              type="close-circle"
              style="color: rgba(245, 34, 45,.75)"
            />
          </a-input>
          <label>Full Name</label>
          <a-input
            :value="complete_name"
            @change="SET_COMPLETE_NAME($event.target.value)"
            style="margin-top:3px"
            placeholder="Input Full Name"
          />
          <label>Gender</label>
          <br />
          <a-select :defaultValue="gender" style="margin-top:3px;width:100%" @change="SET_GENDER">
            <a-select-option value="L">Male</a-select-option>
            <a-select-option value="P">Female</a-select-option>
          </a-select>
          <br />
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
        <div style="margin-top:15px;">
          <a-row>
            <a-col :span="12">
              <a @click="setPanelName('login')">Have account ? Login</a>
            </a-col>
            <a-col :span="12" style="text-align: right;">
              <a-button style="right:0" @click="submitRegistration">Submit</a-button>
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
    ...mapState("LeftDialog/FileMenu/Component/Registration", {
      loading: state => state.loading,
      user_name: state => state.user_name,
      complete_name: state => state.complete_name,
      gender: state => state.gender,
      email: state => state.email,
      password: state => state.password,
      password_confirm: state => state.password_confirm,
      status_check_user_name: state => state.status_check_user_name
    })
  },
  methods: {
    ...mapActions("LeftDialog/FileMenu/Component/Registration", {
      submitRegistration: "submitRegistration",
      checkUsername: "checkUsername"
    }),
    ...mapMutations("LeftDialog/FileMenu/Component/Registration", {
      SET_LOADING: "SET_LOADING",
      SET_USER_NAME: "SET_USER_NAME",
      SET_COMPLETE_NAME: "SET_COMPLETE_NAME",
      SET_GENDER: "SET_GENDER",
      SET_EMAIL: "SET_EMAIL",
      SET_PASSWORD: "SET_PASSWORD",
      SET_PASSWORD_CONFIRM: "SET_PASSWORD_CONFIRM"
    }),
    ...mapMutations("LeftDialog/FileMenu/Layout", {
      setPanelName: "setPanelName"
    })
  },
  data() {
    return {
      indicator: <a-icon type="loading" spin />
    };
  }
};
</script>

