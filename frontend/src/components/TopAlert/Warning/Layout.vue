<template>
  <a-alert
    type="warning"
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
    ...mapState("TopAlert/Warning/Layout", {
      visible: state => state.visible,
      message: state => state.message
    })
  },
  methods: {
    ...mapMutations("TopAlert/Warning/Layout", {
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