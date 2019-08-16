<template >
  <v-group >
    <v-arrow
      :config="{
        x: 0,
        y: 0,
        points: connectorObj.points,
        strokeWidth: 0.9,
        tension: 0,
        closed: false,
        stroke: '#444444',
        fill: '#444444',
        pointerLength: 7,
        pointerWidth: 7,
        shadowOpacity: 1,
        shadowBlur: connectorObj.lineStyle.shadowBlur,
        shadowColor:connectorObj.lineStyle.shadowColor,
      }"
    />
    <v-line
      @mouseover="setHighLightRelation({
        status: true,
        connector_id:connectorKey
      })"
      @mouseout="setHighLightRelation({
        status: false,
        connector_id:connectorKey
      })"
      :config="{
        x: 0,
        y: 0,
        points: connectorObj.points,
        strokeWidth: 5,
        tension: 0,
        closed: false,
        stroke: '#ff000000 '
      }"
    />
  </v-group>
</template>
        
<script>
import { mapMutations } from "vuex";
export default {
  props: ['connectorObj'],
  methods: {
    ...mapMutations("diagram", {
      setHighLightRelation: "setHighLightRelation"
    })
  },
  mounted() {},
  data() {
    return {};
  }
};
</script>
