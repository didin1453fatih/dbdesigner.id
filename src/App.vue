<template>
  <div>
    <div>{{JSON.stringify(connectors)}}</div>
    <a-row>
      <a-col :span="17">
        <v-stage :config="configKonva">
          <v-layer>
            <table-base
              @seeRelation="seeRelation"
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
              :key="connector.key"
              :points="connector.points"
              :lineStyle="connector.lineStyle"
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
    seeRelation(status, tableName) {
      // this.dataDiagram[tableName].coloumn.forEach(coloumn=>{

      // })
      this.dataDiagram[tableName].association.forEach(async assoc => {
        if (assoc.type === "belong") {
          if (status === true) {
            this.dataDiagram[tableName].coloumns[
              assoc.foreignKey
            ].style.shadowBlur = 5;
            this.dataDiagram[tableName].coloumns[
              assoc.foreignKey
            ].style.shadowColor = "green";
            this.dataDiagram[assoc.table].coloumns[
              assoc.targetKey
            ].style.shadowBlur = 5;
            this.dataDiagram[assoc.table].coloumns[
              assoc.targetKey
            ].style.shadowColor = "green";
            await this.connectorNew.forEach(async conn => {
              if (
                conn.tail.table === tableName &&
                assoc.foreignKey === conn.tail.coloumn
              ) {
                conn.lineStyle.shadowBlur = 5;
                conn.lineStyle.shadowColor = "green";
              }
            });
          } else {
            this.dataDiagram[tableName].coloumns[
              assoc.foreignKey
            ].style.shadowBlur = 0;
            this.dataDiagram[assoc.table].coloumns[
              assoc.targetKey
            ].style.shadowBlur = 0;
            await this.connectorNew.forEach(async conn => {
              if (
                conn.tail.table === tableName &&
                assoc.foreignKey === conn.tail.coloumn
              ) {
                conn.lineStyle.shadowBlur = 0;
              }
            });
          }
        } else if (assoc.type === "has") {
          if (status === true) {
            this.dataDiagram[tableName].coloumns[
              assoc.sourceKey
            ].style.shadowBlur = 5;
            this.dataDiagram[tableName].coloumns[
              assoc.sourceKey
            ].style.shadowColor = "#00D2FF";
            this.dataDiagram[assoc.table].coloumns[
              assoc.foreignKey
            ].style.shadowBlur = 5;
            this.dataDiagram[assoc.table].coloumns[
              assoc.foreignKey
            ].style.shadowColor = "#00D2FF";
            await this.connectorNew.forEach(async conn => {
              if (
                conn.head.table === tableName &&
                assoc.sourceKey === conn.head.coloumn
              ) {
                conn.lineStyle.shadowBlur = 5;
                conn.lineStyle.shadowColor = "#00D2FF";
              }
            });
          } else {
            this.dataDiagram[tableName].coloumns[
              assoc.sourceKey
            ].style.shadowBlur = 0;
            this.dataDiagram[assoc.table].coloumns[
              assoc.foreignKey
            ].style.shadowBlur = 0;
            await this.connectorNew.forEach(async conn => {
              if (
                conn.head.table === tableName &&
                assoc.sourceKey === conn.head.coloumn
              ) {
                conn.lineStyle.shadowBlur = 0;
              }
            });
          }
        }
      });
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
                conn.points[0] - 30,
                conn.points[1] - 30,
                conn.points[4],
                conn.points[5]
              ];
              conn.points = tmp;
            }
          });
        } else if (assoc.type === "has") {
          await this.connectorNew.forEach(async conn => {
            if (
              conn.head.table === tableName &&
              assoc.sourceKey === conn.head.coloumn
            ) {
              var tmp = [
                conn.points[0],
                conn.points[1],
                conn.points[0] - 30,
                conn.points[1] - 30,
                val.currentTarget.attrs.x + assoc.potition.x,
                val.currentTarget.attrs.y + assoc.potition.y
              ];
              conn.points = tmp;
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
          key: "mobil#id$sopir#mobil_id",
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
          points: [250, 100, 100, 100, 30, 110],
          lineStyle: {
            shadowBlur: 0,
            shadowColor: "green"
          }
        },
        {
          key: "mobil#id$kernet#mobil_id",
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
          points: [450, 100, 100, 100, 30, 110],
          lineStyle: {
            shadowBlur: 0,
            shadowColor: "green"
          }
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
              foreignKey: false,
              style: {
                shadowBlur: 0,
                shadowColor: "green"
              }
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
              foreignKey: false,
              style: {
                shadowBlur: 0,
                shadowColor: "green"
              }
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
              foreignKey: false,
              style: {
                shadowBlur: 0,
                shadowColor: "green"
              }
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
              foreignKey: false,
              style: {
                shadowBlur: 0,
                shadowColor: "green"
              }
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
              },
              style: {
                shadowBlur: 0,
                shadowColor: "green"
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
              foreignKey: false,
              style: {
                shadowBlur: 0,
                shadowColor: "green"
              }
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
              foreignKey: false,
              style: {
                shadowBlur: 0,
                shadowColor: "green"
              }
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
              },
              style: {
                shadowBlur: 0,
                shadowColor: "green"
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
