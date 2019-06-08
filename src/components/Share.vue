<template>
  <div>
    <a-spin :indicator="indicator" :spinning="loading" type="sync" size="large" spin>
      <div style="padding-right:30px">
        <h3>Share</h3>
        <div style="margin-top:20px">
          <label>Status</label>
          <br>
          <a-radio-group
            :value="status+''"
            @change="eventChangeShareStatus(parseInt($event.target.value))"
            style="margin-top:5px;width:100%"
          >
            <a-radio-button style="width:30%" align="center" value="0">Private</a-radio-button>
            <a-radio-button style="width:30%" align="center" value="default" disabled>Protected</a-radio-button>
            <a-radio-button style="width:30%" align="center" value="2">Public</a-radio-button>
          </a-radio-group>
        </div>
        <div v-if="status===2">
          <div style="margin-top:20px; width:90%">
            <label>Link</label>
            <br>
            <a-input :value="shareLink" style="margin-top:5px">
              <a-icon slot="addonAfter" type="copy"/>
            </a-input>
          </div>
          <a-checkbox
            style="margin-top:20px; width:90%"
            :checked="checkPassword"
            @change="handleChangePassword($event.target.checked)"
          >Use password</a-checkbox>
          <div style="margin-top:15px; width:90%" v-if="checkPassword===true">
            <label>Password</label>
            <br>
            <a-input
              :value="sharePassword"
              @change="setSharePassword($event.target.value)"
              placeholder="Input Password"
              style="margin-top:5px"
            />
          </div>
        </div>

        <div style="margin-top:30px; width:90%;     text-align: right;" v-if="checkPassword===true">
          <a-button style="right:0px" @click="eventUpdateShareStatus">Update</a-button>
        </div>
      </div>
    </a-spin>
  </div>
</template>


<script>
import { message } from "ant-design-vue";
import { mapActions } from "vuex";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
export default {
  mounted() {
    this.readShareStatus();
  },
  computed: {
    ...mapState("Share", {
      title: state => state.title,
      status: state => state.status,
      loading: state => state.loading,
      sharePassword: state => state.sharePassword,
      shareLink: state => state.shareLink
    })
  },
  methods: {
    handleChangePassword(value) {
      if (value === false) {
        this.setSharePassword(null);
        this.saveChangeStatus();
      }
      this.checkPassword = value;
    },
    ...mapActions("Share", {
      saveChangeStatus: "saveChangeStatus",
      readShareStatus: "readShareStatus"
    }),
    ...mapMutations("Share", {
      setStatus: "setStatus",
      setSharePassword: "setSharePassword"
    }),
    eventUpdateShareStatus() {
      if (
        this.checkPassword === true &&
        (this.sharePassword === null || this.sharePassword === "")
      ) {
        message.error("Password is required", 3);
      } else {
        this.saveChangeStatus();
      }
    },
    eventChangeShareStatus(val) {
      this.checkPassword = false;

      this.setSharePassword(null);
      this.setStatus(val);
      this.saveChangeStatus();
    }
  },
  data() {
    return {
      checkPassword: false,
      indicator: <a-icon type="loading" spin />
    };
  }
};
</script>

<style>
</style>

