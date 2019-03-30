<template>
  <v-group @click="clickEvent">
    <v-line :config="lineConfig"/>
  </v-group>
</template>

<script>
export default {
  props: ["points"],
  watch:{
    points(val){
      this.lineConfig.points=val
      // window.alert('halooo')
      return val
    }
  },
  methods: {
    clickEvent: () => {
      window.alert("makan line");
    }
  },
  mounted() {},
  data() {
    return {
      lineConfig: {
        x: 0,
        y: 0,
        points: this.points,
        strokeWidth: 1,
        tension: 0.5,
        closed: false,
        stroke: "black"
      }
    };
  }
};
</script>
