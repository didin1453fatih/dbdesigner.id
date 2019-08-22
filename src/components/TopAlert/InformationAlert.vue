<template>
  <a-alert
    type="info"
    closeText="Close"
    v-if="visible"
    @close="onCloseMessage"
    style="border-radius: 0px; "
  >
    <div slot="message" style="text-align: center;">
      <b>{{message}}</b>
    </div>
  </a-alert>
</template>


<script>
import { mapMutations } from "vuex";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("TopAlert", {
      visible: state => state.visible,
      message: state => state.message
    })
  },
  methods: {
    ...mapMutations("TopAlert", {
      setVisible: "setVisible"
    }),
    onCloseMessage() {
      this.setVisible(false);
    }
  },
  data() {
    return {};
  }
};
</script>