<template>
  <v-group
    :config="{
      x: potition.x,
      y: potition.y,
    }"
    @dragmove="dragmove"
    @dblclick="clickEvent"
    :draggable="true"
  >
    <v-rect
      @mouseover="selectRelation"
      @mouseout="deselectRelation"
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
            text: this.tableName,
            x: 15,
            y: 8,
            fill:'white'
          }"
    />
    <template v-for="(coloumnKey,index) in Object.keys(coloumns)">
      <div v-bind:key="coloumnKey">
        <!-- Primary key image -->
        <v-image
          v-if="coloumns[coloumnKey].primaryKey===true"
          :config="{
            image: primaryKey,
            width: 13,
            height: 13,
            x: 5,
            y: (5+30-2)+(index*20),
          }"
        />
        <!-- end primary key image -->
        <v-image
          v-else-if="coloumns[coloumnKey].allowNull===false"
          :config="{
            image: imageNotNull,
            width: 13,
            height: 13,
            x: 5,
            y: (5+30-2)+(index*20),
          }"
        />
        <v-image
          v-else-if="coloumns[coloumnKey].allowNull===true"
          :config="{
            image: imageNull,
            width: 13,
            height: 13,
            x: 5,
            y: (5+30-2)+(index*20),
          }"
        />
        <!-- <div v-if="isSelectRelation===true"> -->
          <v-text
            :config="{
            text: coloumnKey,
            x: 23,
            y: (5+30)+(index*20),
            shadowBlur: coloumns[coloumnKey].style.shadowBlur,
            shadowColor:coloumns[coloumnKey].style.shadowColor,
          }"
          />
          <v-text
            :config="{
            text: coloumns[coloumnKey].dataType,
            x: 0,            
            y: (5+30)+(index*20),
            width: 145,
            shadowBlur: coloumns[coloumnKey].style.shadowBlur,
            shadowColor:coloumns[coloumnKey].style.shadowColor,
            align: 'right'
          }"
          />
        <!-- </div>
        <div v-else-if="isSelectRelation===false">
          <v-text
            :config="{
            text: coloumnKey,
            x: 23,
            y: (5+30)+(index*20),
          }"
          />
          <v-text
            :config="{
            text: coloumns[coloumnKey].dataType,
            x: 0,            
            y: (5+30)+(index*20),
            width: 145,
            align: 'right'
          }"
          />
        </div> -->
      </div>
    </template>
    <!-- <v-text
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
    />-->
  </v-group>
</template>

<script>
import primaryKeyImage from "../assets/primary-key.png";
import notNull from "../assets/icons8-diamonds-40.png";
import imageNullImage from "../assets/icons8-diamonds-40-white.png";
export default {
  props: ["potition", "coloumns", "tableName"],
  methods: {
    selectRelation() {
      this.$emit('seeRelation',true, this.tableName)
      // this.isSelectRelation=true
      // window.alert('select relation')
    },
    deselectRelation(){
      this.$emit('seeRelation',false, this.tableName)
      // this.isSelectRelation=false
      // window.alert('deselect relation')
    },
    dragmove(val) {
      this.$emit("changedPotition", val, this.tableName);
      // eslint-disable-next-line
      // console.log(JSON.stringify(val));
    },
    clickEvent() {
      // window.alert("makan");
      this.$emit("editDataTable", "this.coloumns");
    },
    halo: () => {
      // eslint-disable-next-line
      console.log("makan");
    },
    addPointAssotiation() {},
    reaCalculatePointAsscotiation() {}
  },
  mounted() {
    const primaryKey = new window.Image();
    primaryKey.src = primaryKeyImage;
    primaryKey.onload = () => {
      // set image only when it is loaded
      this.primaryKey = primaryKey;
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
      isSelectRelation: false,
      primaryKey: null,
      imageNotNull: null,
      imageNull: null
      // tableName: "rujak",
      // coloumns: {
      //   id: {
      //     comment: "",
      //     dataType: "int(32)",
      //     default: "",
      //     primaryKey: true,
      //     allowNull: false,
      //     unique: false,
      //     unsigned: false,
      //     zeroFill: false,
      //     autoIncrement: false,
      //     foreignKey: {
      //       tableName: "tableName",
      //       coloumnName: "key"
      //     }
      //   },
      //   nama: {
      //     comment: "",
      //     dataType: "varcahar(20)",
      //     default: "",
      //     primaryKey: false,
      //     allowNull: false,
      //     unique: false,
      //     unsigned: false,
      //     zeroFill: false,
      //     autoIncrement: false,
      //     foreignKey: {
      //       tableName: "tableName",
      //       coloumnName: "key"
      //     }
      //   },
      //   umur: {
      //     comment: "",
      //     dataType: "varcahar(20)",
      //     default: "",
      //     primaryKey: false,
      //     allowNull: true,
      //     unique: false,
      //     unsigned: false,
      //     zeroFill: false,
      //     autoIncrement: false,
      //     foreignKey: {
      //       tableName: "tableName",
      //       coloumnName: "key"
      //     }
      //   }
      // }
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
