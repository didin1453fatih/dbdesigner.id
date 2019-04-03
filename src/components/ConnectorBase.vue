<template>
  <!-- <v-group @click="clickEvent">
    <v-line :config="lineConfig"/>
  </v-group> -->
  <v-line :config="{
        x: 0,
        y: 0,
        points: this.points,
        strokeWidth: 1,
        tension: 1,
        closed: false,
        stroke: 'black',
        shadowBlur: this.lineStyle.shadowBlur,
        shadowColor:this.lineStyle.shadowColor,
      }"/>
</template>

<script>
export default {
  props: ["points","lineStyle"],
  watch:{
    points(val){
      this.lineConfig.points=val
      // window.alert('halooo')
      return val
    },
    lineStyle(val){
      this.lineConfig.shadowBlur=val.shadowBlur
      this.lineConfig.shadowColor=val.shadowColor
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
        tension: 1,
        closed: false,
        stroke: "black",
        shadowBlur: this.lineStyle.shadowBlur,
        shadowColor:this.lineStyle.shadowColor,
      }
    };
  }
};
</script>
