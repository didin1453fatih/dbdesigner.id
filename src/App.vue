<template>
  <div>
    <div>
      {{JSON.stringify(connectors)}}
    </div>
    <a-row>
      <a-col :span="17">
        <v-stage :config="configKonva">
          <v-layer>
            <table-base
              v-for="tableKey in Object.keys(dataDiagram)"
              v-bind:key="tableKey"
              @editDataTable="editDataTable"
              @changedPotition="table1Change"
              :coloumns="dataDiagram[tableKey].coloumns"
              :tableName="tableKey"
              :potition="dataDiagram[tableKey].potition"
            />
            <!-- <table-base
              @editDataTable="editDataTable"
              @changedPotition="table2Change"
              :potition="{  
           x:250,
           y:50
        }"
            />-->
            <!-- <div v-for="connectorKey in Object.keys(connectors)" :key="connectorKey"> -->
              <connector-base    
                v-for="connector in connectorArray"
                :key="connector.code"
                :points="connector.points"
              />
            <!-- </div> -->
            <!-- <connector-base :points="[20, 50, 250, 50]"/> -->
            <!-- <v-line :config="lineConfig"/> -->
          </v-layer>
        </v-stage>
      </a-col>
      <a-col :span="6">
        <a-button>Default</a-button>
        <a-button type="primary" @click="showDrawer">Open</a-button>
      </a-col>
    </a-row>
    <config-table :visible="visible" @close="onClose"/>
  </div>
</template>

<script>
import ConnectorBase from "./components/ConnectorBase";
import TableBase from "./components/TableBase";
import ConfigTable from "./components/ConfigTableBase.vue";
import lion from "./assets/perimary-key-yellow-dark.png";
const OPTIONS = ["PK", "NN", "UQ", "UN", "AI"];
const columns = [
  {
    title: "Column Name",
    dataIndex: "name",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "Data Type",
    className: "column-money",
    dataIndex: "money"
  },
  {
    title: "PK",
    dataIndex: "addressl"
  },
  {
    title: "NN",
    dataIndex: "addresss"
  }
];

const data = [
  {
    key: "1",
    name: "John Brown",
    money: "￥300,000.00",
    address: "New York No. 1 Lake Park"
  },
  {
    key: "2",
    name: "Jim Green",
    money: "￥1,256,000.00",
    address: "London No. 1 Lake Park"
  },
  {
    key: "3",
    name: "Joe Black",
    money: "￥120,000.00",
    address: "Sidney No. 1 Lake Park"
  }
];
// import primaryKeyImage from "../assets/primary-key.png";
// import notNull from "../assets/icons8-diamonds-40.png";
// import imageNullImage from "../assets/icons8-diamonds-40-white.png";
export default {
  components: {
    TableBase,
    ConnectorBase,
    ConfigTable
  },
  methods: {
    async setPoints(tableName){
      var coloumnCount=0
      var coloumnKeyArray = Object.keys(this.dataDiagram[tableName].coloumns);
      await coloumnKeyArray.forEach(async coloumnKey => {
         coloumnCount++
         if (this.dataDiagram[tableName].coloumns[coloumnKey].foreignKey === true) {      
          var sourceTable=this.dataDiagram[tableName].coloumns[coloumnKey].foreignKeyProperties.tableName
          var sourceColoumn=this.dataDiagram[tableName].coloumns[coloumnKey].foreignKeyProperties.coloumnName
          var key=tableName+'#'+coloumnKey+'$'+sourceTable+'#'+sourceColoumn
          // "sopir#mobil_id$mobil#id"
          
          // window.alert(JSON.stringify(this.connectors[key]))
          await this.connectorArray.forEach(async connector=>{
              if(connector.code===key){
                connector.points=[
                  this.dataDiagram[tableName].potition.x,
                  this.dataDiagram[tableName].potition.y+35+(coloumnCount*15),
                  this.dataDiagram[sourceTable].potition.x,
                  this.dataDiagram[sourceTable].potition.y,
                ]
              }
          })
          // this.connectors[key]=null
          // this.connectors[key]=[
          //   this.dataDiagram[tableName].potition.x,
          //   this.dataDiagram[tableName].potition.y,
          //   this.dataDiagram[sourceTable].potition.x,
          //   this.dataDiagram[sourceTable].potition.y,
          // ]
          // eslint-disable-next-line
          // console.log("yeyeyyyy " + JSON.stringify(this.connectors));
          // window.alert(JSON.stringify(this.connectors[key]))
          // connectors[key]=[]
          // window.alert(
          //   "foregn Key " + this.dataDiagram[tableName][coloumnKey].foreignKey
          // );
        }
      })

    },
    async getPoints(tableName) {
      // window.alert(JSON.stringify(tableName));
      // window.alert(JSON.stringify(this.dataDiagram["sopir"]));
      var coloumnKeyArray = Object.keys(this.dataDiagram[tableName].coloumns);
      await coloumnKeyArray.forEach(coloumnKey => {
        // window.alert(coloumnKey+"get points " + JSON.stringify(this.dataDiagram[tableName].coloumns[coloumnKey]));
        if (this.dataDiagram[tableName].coloumns[coloumnKey].foreignKey === true) {      
          var sourceTable=this.dataDiagram[tableName].coloumns[coloumnKey].foreignKeyProperties.tableName
          var sourceColoumn=this.dataDiagram[tableName].coloumns[coloumnKey].foreignKeyProperties.coloumnName
          var key=tableName+'#'+coloumnKey+'$'+sourceTable+'#'+sourceColoumn
          // "sopir#mobil_id$mobil#id"
          
          // window.alert(JSON.stringify(this.connectors[key]))
          this.connectors[key]=null
          this.connectors[key]=[
            this.dataDiagram[tableName].potition.x,
            this.dataDiagram[tableName].potition.y,
            this.dataDiagram[sourceTable].potition.x,
            this.dataDiagram[sourceTable].potition.y,
          ]
          // eslint-disable-next-line
          console.log("yeyeyyyy " + JSON.stringify(this.connectors));
          // window.alert(JSON.stringify(this.connectors[key]))
          // connectors[key]=[]
          // window.alert(
          //   "foregn Key " + this.dataDiagram[tableName][coloumnKey].foreignKey
          // );
        }
      });
      return tableName;
    },
    editDataTable() {
      // window.alert("---" + val);
      this.visible = true;
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    handleChange(selectedItems) {
      this.selectedItems = selectedItems;
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    table1Change(val,tableName) {
      this.dataDiagram[tableName].potition.x=val.currentTarget.attrs.x;
      this.dataDiagram[tableName].potition.y=val.currentTarget.attrs.y;
      this.connectorArray[0].points=[100, 100, 30, 110]
      this.setPoints(tableName) 
      // getConnectorPoint(tableName)
      // eslint-disable-next-line
      // console.log("yeyeyyyy " + JSON.parse(JSON.stringify(val.target)));
      // eslint-disable-next-line
      // console.log('this.linePoin '+this.linePoin +'  '+JSON.stringify(val.target.attrs))
      // console.log(JSON.stringify(val.target.attrs));
      // this.lineConfig.points[0] = val.currentTarget.attrs.x;
      // this.lineConfig.points[1] = val.currentTarget.attrs.y;
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
    this.getPoints("sopir");
  },
  computed: {
    filteredOptions() {
      return OPTIONS.filter(o => !this.selectedItems.includes(o));
    },
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
      data,
      columns,
      suze: "small",
      selectedItems: [],
      visible: false,
      connectorArray:[
        {
          code:"sopir#mobil_id$mobil#id",
          points:[250, 100, 30, 110]
        }
      ],
      connectors: {
        "sopir#mobil_id$mobil#id": [250, 100, 30, 110]
        //  {
        //   x1: 0,
        //   y1: 0,
        //   x2: 100,
        //   y2: 100
        // }
      },
      dataDiagram: {
        mobil: {
          potition: {
            x: 30,
            y: 110
          },
          coloumns: {
            id: {
              comment: "",
              dataType: "varchar(31)",
              default: "",
              primaryKey: true,
              allowNull: false,
              unique: false,
              unsigned: false,
              zeroFill: false,
              autoIncrement: false,
              foreignKey: false
            },
            jumlah_roda: {
              comment: "",
              dataType: "int(32)",
              default: "",
              primaryKey: false,
              allowNull: false,
              unique: false,
              unsigned: false,
              zeroFill: false,
              autoIncrement: false,
              foreignKey: false
            }
          },
          association:{

          }
        },
        sopir: {
          potition: {
            x: 250,
            y: 100
          },
          coloumns: {
            nama: {
              comment: "",
              dataType: "varchar(45)",
              default: "",
              primaryKey: true,
              allowNull: false,
              unique: false,
              unsigned: false,
              zeroFill: false,
              autoIncrement: false,
              foreignKey: false
            },
            umur: {
              comment: "",
              dataType: "int(32)",
              default: "",
              primaryKey: false,
              allowNull: false,
              unique: false,
              unsigned: false,
              zeroFill: false,
              autoIncrement: false,
              foreignKey: false
            },
            mobil_id: {
              comment: "",
              dataType: "int(32)",
              default: "",
              primaryKey: false,
              allowNull: false,
              unique: false,
              unsigned: false,
              zeroFill: false,
              autoIncrement: false,
              foreignKey: true,
              foreignKeyProperties: {
                tableName: "mobil",
                coloumnName: "id"
              }
            }
          }
        }
      },
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
.ant-drawer-header {
  background: #316896 !important;
  color: #fff !important;
}
.ant-drawer-title {
  margin: 0 !important;
  font-size: 20px !important;
  line-height: 10px !important;
  font-weight: 500 !important;
  color: #fff !important;
}
.ant-drawer-header {
  border-radius: 0px 0px 0 0 !important;
}
</style>
