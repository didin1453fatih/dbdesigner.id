<template>
  <div>
      <div>
        <h3>Open shared</h3>
        <div style="margin-top:20px">
          <label>Project UUID</label>
          <a-input
            :value="uuid"
            disabled
            style="margin-top:3px; cursor:pointer"
            placeholder="UUID"
          />
          <label>Password</label>
          <a-input
            :value="password"
            @change="setPassword($event.target.value)"
            style="margin-top:3px"
            placeholder="input password"
          />
        </div>
        <div style="margin-top:15px;     text-align: right;">
          <a-button style="right:0" @click="openProject">Open</a-button>
        </div>
      </div>
  </div>
</template>


<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("OpenSharedWithPassword", {
      uuid: state => state.uuid,
      password: state => state.password,
      loading: state => state.loading
    })
  },
  methods: {
    ...mapActions("Data/Project", {
      loadProjectUUID: "loadProjectUUID"
    }),
    ...mapMutations("OpenSharedWithPassword", {
      setPassword: "setPassword"
    }),
    openProject() {
      this.loadProjectUUID({
        uuid: this.uuid,
        password: this.password
      });
    }
  },
  data() {
    return {
      indicator: <a-icon type="loading" spin />
    };
  }
};
</script>

