<template>
  <div>
    <div>{{JSON.stringify(connectors)}}</div>
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
            <!-- <connector-base    
                v-for="connector in connectorArray"
                :key="connector.code"
                :points="connector.points"
            />-->
            <connector-base
              v-for="connector in connectorNew"
              :key="connector.head.table"
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
    async setPoints(tableName) {
      // eslint-disable-next-line
      // console.log(tableName)
      var coloumnCount = 0;
      var coloumnKeyArray = Object.keys(this.dataDiagram[tableName].coloumns);
      await coloumnKeyArray.forEach(async coloumnKey => {
        coloumnCount++;
        if (
          this.dataDiagram[tableName].coloumns[coloumnKey].foreignKey === true
        ) {
          var sourceTable = this.dataDiagram[tableName].coloumns[coloumnKey]
            .foreignKeyProperties.tableName;
          var sourceColoumn = this.dataDiagram[tableName].coloumns[coloumnKey]
            .foreignKeyProperties.coloumnName;
          var key =
            tableName +
            "#" +
            coloumnKey +
            "$" +
            sourceTable +
            "#" +
            sourceColoumn;
          // "sopir#mobil_id$mobil#id"

          // window.alert(JSON.stringify(this.connectors[key]))
          await this.connectorArray.forEach(async connector => {
            if (connector.code === key) {
              connector.points = [
                this.dataDiagram[tableName].potition.x,
                this.dataDiagram[tableName].potition.y + 35 + coloumnCount * 15,
                this.dataDiagram[sourceTable].potition.x,
                this.dataDiagram[sourceTable].potition.y
              ];
            }
          });
        } else {
          var keyNonFK =
            sourceTable +
            "#" +
            sourceColoumn +
            "$" +
            tableName +
            "#" +
            coloumnKey;
          // window.alert(keyNonFK)
          await this.connectorArray.forEach(async connector => {
            if (connector.code === keyNonFK) {
              connector.points = [
                this.dataDiagram[tableName].potition.x,
                this.dataDiagram[tableName].potition.y + 35 + coloumnCount * 15,
                this.dataDiagram[sourceTable].potition.x,
                this.dataDiagram[sourceTable].potition.y
              ];
            }
          });
        }
      });
    },
    // async getPoints(tableName) {
    //   // window.alert(JSON.stringify(tableName));
    //   // window.alert(JSON.stringify(this.dataDiagram["sopir"]));
    //   var coloumnKeyArray = Object.keys(this.dataDiagram[tableName].coloumns);
    //   await coloumnKeyArray.forEach(coloumnKey => {
    //     // window.alert(coloumnKey+"get points " + JSON.stringify(this.dataDiagram[tableName].coloumns[coloumnKey]));
    //     if (this.dataDiagram[tableName].coloumns[coloumnKey].foreignKey === true) {
    //       var sourceTable=this.dataDiagram[tableName].coloumns[coloumnKey].foreignKeyProperties.tableName
    //       var sourceColoumn=this.dataDiagram[tableName].coloumns[coloumnKey].foreignKeyProperties.coloumnName
    //       var key=tableName+'#'+coloumnKey+'$'+sourceTable+'#'+sourceColoumn
    //       // "sopir#mobil_id$mobil#id"

    //       // window.alert(JSON.stringify(this.connectors[key]))
    //       this.connectors[key]=null
    //       this.connectors[key]=[
    //         this.dataDiagram[tableName].potition.x,
    //         this.dataDiagram[tableName].potition.y,
    //         this.dataDiagram[sourceTable].potition.x,
    //         this.dataDiagram[sourceTable].potition.y,
    //       ]
    //       // eslint-disable-next-line
    //       console.log("yeyeyyyy " + JSON.stringify(this.connectors));
    //       // window.alert(JSON.stringify(this.connectors[key]))
    //       // connectors[key]=[]
    //       // window.alert(
    //       //   "foregn Key " + this.dataDiagram[tableName][coloumnKey].foreignKey
    //       // );
    //     }
    //   });
    //   return tableName;
    // },
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
    async table1Change(val, tableName) {
      this.dataDiagram[tableName].potition.x = val.currentTarget.attrs.x;
      this.dataDiagram[tableName].potition.y = val.currentTarget.attrs.y;

      this.dataDiagram[tableName].association.forEach(async assoc => {
        if (assoc.type === "belong") {
          await this.connectorNew.forEach(async conn => {
            if (
              conn.tail.table === tableName &&
              assoc.foreignKey === conn.tail.coloumn
            ) {
              var tmp = [
                val.currentTarget.attrs.x + assoc.potition.x,
                val.currentTarget.attrs.y + assoc.potition.y,
                conn.points[0] - conn.points[4],
                conn.points[1] - conn.points[5],
                conn.points[4],
                conn.points[5]
              ];
              conn.points=tmp
              // conn.points[2] = tmp[2];
              // conn.points[3] = tmp[3];
              // conn.points[0] = tmp[0];
              // conn.points[1] = tmp[1];
              // conn.points[4] = tmp[4];
              // conn.points[5] = tmp[5];
              // eslint-disable-next-line
              console.log("conn " + JSON.stringify(conn.points));
              // conn.points[0] = val.currentTarget.attrs.x + assoc.potition.x;
              // conn.points[1] = val.currentTarget.attrs.y + assoc.potition.y;

              // conn.points[2]= 300// await Math.abs(conn.points[0]-conn.points[4])
              // conn.points[3]= 300//await Math.abs(conn.points[1]-conn.points[5])
            }
          });
        } else if (assoc.type === "has") {
          await this.connectorNew.forEach(async conn => {
            if (
              conn.head.table === tableName &&
              assoc.sourceKey === conn.head.coloumn
            ) {

              var tmp = [
                conn.points[0] ,
                conn.points[1] ,
                conn.points[0] - conn.points[4],
                conn.points[1] - conn.points[5],
                val.currentTarget.attrs.x + assoc.potition.x,
                val.currentTarget.attrs.y + assoc.potition.y
              ];
              conn.points=tmp
              // conn.points[4] = val.currentTarget.attrs.x + assoc.potition.x;
              // conn.points[5] = val.currentTarget.attrs.y + assoc.potition.y;
              // var i=await Math.abs(conn.points[0]-conn.points[4])
              // var l=await Math.abs(conn.points[1]-conn.points[5])
              // conn.points[2] = 300;
              // conn.points[3] = 300;
            }
          });
        }
      });
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
    // this.getPoints("sopir");
    // setInterval(() => {
    //   this.connectorNew.forEach(conn => {
    //     conn.points = [250, 100, 100, 100, 30, 110];
    //   });
    // }, 2000);

    // setInterval(() => {
    //   this.connectorNew.forEach(conn => {
    //     conn.points = [0, 100, 100, 0, 30, 110];
    //   });
    // }, 4000);
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
      connectorNew: [
        {
          // head is belong
          head: {
            table: "mobil",
            coloumn: "id"
          },
          // tail is has
          tail: {
            table: "sopir",
            coloumn: "mobil_id"
          },
          points: [250, 100, 100, 100, 30, 110]
        },
        {
          // head is belong
          head: {
            table: "mobil",
            coloumn: "id"
          },
          // tail is has
          tail: {
            table: "kernet",
            coloumn: "mobil_id"
          },
          points: [450, 100, 100, 100, 30, 110]
        }
      ],
      connectorArray: [
        {
          code: "sopir#mobil_id$mobil#id",
          points: [250, 100, 30, 110]
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
          association: [
            {
              type: "has",
              table: "sopir",
              foreignKey: "mobil_id",
              sourceKey: "id",
              potition: {
                x: 0,
                y: 0
              }
            },
            {
              type: "has",
              table: "kernet",
              foreignKey: "mobil_id",
              sourceKey: "id",
              potition: {
                x: 0,
                y: 35
              }
            }
          ]
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
          },
          association: [
            {
              type: "belong",
              table: "mobil",
              foreignKey: "mobil_id",
              targetKey: "id",
              potition: {
                x: 0,
                y: 50
              }
            }
          ]
        },
        kernet: {
          potition: {
            x: 450,
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
          },
          association: [
            {
              type: "belong",
              table: "mobil",
              foreignKey: "mobil_id",
              targetKey: "id",
              potition: {
                x: 0,
                y: 50
              }
            }
          ]
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
        width: 1400,
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
