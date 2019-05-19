<template>
  <div class="loading-outer" v-show="visible">
    <div class="loading-inside"></div>
    <a-icon
      type="loading"
      style="margin-top:20%;margin-left:50%;font-size:52px; color:blue;opacity: 1;z-indez:150"
    />
    <!-- <h3 style="margin-left:50%;color:black;z-indez:150">{{message}}</h3> -->
  </div>
</template>


<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("GlobalLoading", {
      visible: state => state.visible,
      message: state => state.message
    })
  }
};
</script>

<style scoped>
.loading-outer {
  position: absolute !important;
  width: 100%;
  top: 0;
  height: 100%;
  z-index: 100000;
}
.loading-inside {
  position: absolute !important;
  width: 100%;
  top: 0;
  height: 100%;
  background-color: rgb(49, 49, 49);
  opacity: 0.5;
}
</style>

