<template>
  <v-group
    :config="{
      x: potition.x,
      y: potition.y,
    }"
    @dragmove="dragmove"
    @dblclick="tableDoubleClick"
    :draggable="true"
  >
    <v-rect
      @mouseover="selectRelation"
      @mouseout="deselectRelation"
      :config="{
          x: 0,
          y: 0,
          width: widthTable,
          height:35+ 20*Object.keys(coloumns).length,
          fill: '#316896',
          strokeWidth: 0,
          shadowBlur: 2
        }"
    />
    <v-rect
      :config="{
          x: 0,
          y: 25,
          width: widthTable,
          height:10+ 20*Object.keys(coloumns).length,
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
          v-else-if="coloumns[coloumnKey].notNull===true"
          :config="{
            image: imageNotNull,
            width: 13,
            height: 13,
            x: 5,
            y: (5+30-2)+(index*20),
          }"
        />
        <v-image
          v-else-if="coloumns[coloumnKey].notNull===false"
          :config="{
            image: imageNull,
            width: 13,
            height: 13,
            x: 5,
            y: (5+30-2)+(index*20),
          }"
        />
        <v-text
          :config="{
            text: coloumns[coloumnKey].coloumn_name,
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
            width: widthTable-5,
            shadowBlur: coloumns[coloumnKey].style.shadowBlur,
            shadowColor:coloumns[coloumnKey].style.shadowColor,
            align: 'right'
          }"
        />
      </div>
    </template>
  </v-group>
</template>

<script>
import { mapMutations } from "vuex";
import primaryKeyImage from "@/assets/primary-key.png";
import notNull from "@/assets/icons8-diamonds-40.png";
import imageNullImage from "@/assets/icons8-diamonds-40-white.png";
export default {
  props: ["potition", "coloumns", "tableName", "tableKey", "widthTable"],
  methods: {
    ...mapMutations("Data/Project", {
      setConfigTable: "setConfigTable",
      setTableKeyConfig: "setTableKeyConfig",
      setShowDetailTable: "setShowDetailTable"
    }),
    ...mapMutations("Data/Project", {
      changeTablePotition: "changeTablePotition",
      highlightRelation: "highlightRelation",
    }),
    selectRelation() {
      this.highlightRelation({
        status: true,
        tableKey: this.tableKey
      });
    },
    deselectRelation() {
      this.highlightRelation({
        status: false,
        tableKey: this.tableKey
      });
    },
    dragmove(val) {
      this.changeTablePotition({
        value: val,
        tableKey: this.tableKey
      });
    },
    tableDoubleClick() {
      this.setShowDetailTable(this.tableKey);
    }
  },
  mounted() {
    const primaryKey = new window.Image();
    primaryKey.src = primaryKeyImage;
    primaryKey.onload = () => {
      this.primaryKey = primaryKey;
    };
    const imageNotNull = new window.Image();
    imageNotNull.src = notNull;
    imageNotNull.onload = () => {
      this.imageNotNull = imageNotNull;
    };

    const imageNull = new window.Image();
    imageNull.src = imageNullImage;
    imageNull.onload = () => {
      this.imageNull = imageNull;
    };
  },
  data() {
    return {
      isSelectRelation: false,
      primaryKey: null,
      imageNotNull: null,
      imageNull: null
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
