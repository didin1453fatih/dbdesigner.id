<template>
  <v-stage :config="configKonva">
    <v-layer>
      <!-- <v-image
        :config="{
            image: image,
            width: 15,
            height: 15
          }"
      />-->
      <table-base
        @changedPotition="table1Change"
        :potition="{
          x:20,
          y:50      
        }"
      />
      <table-base
        @changedPotition="table2Change"
        :potition="{  
           x:250,
           y:50
        }"
      />
      <v-line :config="lineConfig"/>
    </v-layer>
  </v-stage>
</template>

<script>
import TableBase from "./components/TableBase";
import lion from "./assets/perimary-key-yellow-dark.png";
export default {
  components: {
    TableBase
  },
  methods: {
    table1Change(val) {
      // eslint-disable-next-line
      // console.log("yeyeyyyy " + JSON.parse(JSON.stringify(val.target)));
      // eslint-disable-next-line
      // console.log('this.linePoin '+this.linePoin +'  '+JSON.stringify(val.target.attrs))
      // console.log(JSON.stringify(val.target.attrs));
      this.lineConfig.points[0] = val.currentTarget.attrs.x;
      this.lineConfig.points[1] = val.currentTarget.attrs.y;
    },
    table2Change(val) {
      this.lineConfig.points[2] = val.currentTarget.attrs.x;
      this.lineConfig.points[3] = val.currentTarget.attrs.y;
      // eslint-disable-next-line
      console.log("yeyeyyyy " + JSON.stringify(val));
      // alert(JSON.stringify(val));
    },
    halo() {
      // eslint-disable-next-line
      console.log("makan");
    }
  },
  mounted() {
    const image = new window.Image();
    image.src = lion;
    image.onload = () => {
      // set image only when it is loaded
      this.image = image;
    };
  },
  computed: {
    configImg: function() {
      return {
        x: 20,
        y: 20,
        image: this.testImg,
        width: 200,
        height: 200
      };
    }
  },
  data() {
    return {
      dataDiagram: [
        {
          table: {
            
          },
          assotiation: [{

          }]
        }
      ],
      lineConfig: {
        x: 0,
        y: 0,
        points: [20, 50, 250, 50],
        strokeWidth: 1,
        tension: 2,
        closed: false,
        stroke: "black"
      },
      linePoint: [20, 50, 250, 50],
      image: null,
      testImg: new Image(100, 100),
      configKonva: {
        width: 700,
        height: 700
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
