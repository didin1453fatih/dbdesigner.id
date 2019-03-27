<template>
  <v-group
    :config="{
      x: potition.x,
      y: potition.y,
    }"
    @dragmove="dragmove"
    @click="clickEvent"
    :draggable="true"
  >
    <v-rect
      :config="{
          x: 0,
          y: 0,
          width: 150,
          height: 135,
          fill: '#316896',
          strokeWidth: 0,
          shadowBlur: 2
        }"
    />
    <v-rect
      :config="{
          x: 0,
          y: 25,
          width: 150,
          height: 110,
           strokeWidth: 0,
          fill: 'white',
          shadowBlur: 0
        }"
    />
    <v-text
      :config="{
            text: 'Nama Table',
            x: 15,
            y: 8,
            fill:'white'
          }"
    />
    <v-image
      :config="{
            image: image,
            width: 13,
            height: 13,
            x: 5,
            y: 5+30-2,
          }"
    />
    <v-text
      :config="{
            text: 'Kolom',
            x: 23,
            y: 5+30,
          }"
    />
    <v-image
      :config="{
            image: imageNotNull,
            width: 13,
            height: 13,
            x: 5,
            y: 5+30-2+20,
          }"
    />
    <v-text
      :config="{
            text: 'Kolom 2',
            x: 23,
            y: 5+30+20,
          }"
    />
    <v-image
      :config="{
            image: imageNull,
            width: 13,
            height: 13,
            x: 5,
            y: 5+30-2+20+20,
          }"
    />
    <v-text
      :config="{
            text: 'Kolom 3',
            x: 23,
            y: 5+30+20+20,
          }"
    />
    <v-rect
      :config="{
          x: 0,
          y: 5+30+20+20+20,
          width: 150,
          height: 20,
          fill: '#b8b8b8',
          strokeWidth: 0,
          shadowBlur: 0
        }"
    />
    <v-text
      :config="{
            text: 'Indexes',
            x: 15,
            y: 5+30+20+25+20,
            fill:'white'
          }"
    />
    <v-text
      :config="{
            text: 'id_UNIQUE',
            x: 7,
            y: 5+30+20+20+25+20,
          }"
    />
  </v-group>
</template>

<script>
import lion from "../assets/primary-key.png";
import notNull from "../assets/icons8-diamonds-40.png";
import imageNullImage from "../assets/icons8-diamonds-40-white.png";
export default {
  props: ["potition"],
  methods: {
    dragmove(val) {
      this.$emit("changedPotition", val);
      // eslint-disable-next-line
      // console.log(JSON.stringify(val));
    },
    clickEvent: () => {
      window.alert("makan");
    },
    halo: () => {
      // eslint-disable-next-line
      console.log("makan");
    },
    addPointAssotiation() {},
    reaCalculatePointAsscotiation() {}
  },
  mounted() {
    const image = new window.Image();
    image.src = lion;
    image.onload = () => {
      // set image only when it is loaded
      this.image = image;
    };
    const imageNotNull = new window.Image();
    imageNotNull.src = notNull;
    imageNotNull.onload = () => {
      // set image only when it is loaded
      this.imageNotNull = imageNotNull;
    };

    const imageNull = new window.Image();
    imageNull.src = imageNullImage;
    imageNull.onload = () => {
      // set image only when it is loaded
      this.imageNull = imageNull;
    };
  },
  data() {
    return {
      image: null,
      imageNotNull: null,
      imageNull: null,
      configKonva: {
        width: 200,
        height: 200
      },
      pointAssotiation: {
        left: [],
        right: [],
        top: [],
        bottom: []
      },
      configCircle: {
        x: 100,
        y: 100,
        radius: 70,
        fill: "red",
        stroke: "black",
        strokeWidth: 4
      }
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
