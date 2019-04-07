<template>
  <div>
    <div>{{JSON.stringify(connectors)}}</div>
    <a-row>
      <a-col :span="17">
        <v-stage :config="configKonva">
          <v-layer>

            <connector-base
              v-for="connector in connectorNew"
              :key="connector.key"
              :points="connector.points"
              :lineStyle="connector.lineStyle"
            />

            <table-base
              @highlight="highlight"
              v-for="tableKey in Object.keys(dataDiagram)"
              v-bind:key="tableKey"
              @editDataTable="editDataTable"
              @changedPotition="changeTablePotition"
              :coloumns="dataDiagram[tableKey].coloumns"
              :tableName="tableKey"
              :potition="dataDiagram[tableKey].potition"
            />
          </v-layer>
        </v-stage>
      </a-col>
      <a-col :span="6">
        <a-button>Default</a-button>
        <a-button type="primary" @click="showDrawer">Open</a-button>
      </a-col>
    </a-row>
    <config-table :visible="visible" :tableName="editTableName" :tableProperties="editTableProperties" @close="onClose"/>
  </div>
</template>

<script>
import ConnectorBase from "./components/ConnectorBase";
import TableBase from "./components/TableBase";
import ConfigTable from "./components/ConfigTableBase.vue";


export default {
  components: {
    TableBase,
    ConnectorBase,
    ConfigTable
  },
  methods: {
    editDataTable(tableName) {
      // this.editTableName=tableName
      this.editTableName=tableName
      this.editTableProperties=this.dataDiagram[tableName]
      // window.alert(JSON.stringify(this.editTableProperties));
      this.visible = true;
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
    highlight(status, tableName) {
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
    async changeTablePotition(val, tableName) {
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
            }
          });
        }
      });
    }
  },
  mounted() {
  },
  computed: {
    
  },
  data() {
    return {
      editTableProperties:{},
      editTableName:null,
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
                x: 100,
                y: 50
              }
            },
            {
              type: "has",
              table: "kernet",
              foreignKey: "mobil_id",
              sourceKey: "id",
              potition: {
                x: 100,
                y: 50
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
                x: 100,
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
                x: 100,
                y: 50
              }
            }
          ]
        }
      },
      configKonva: {
        width: 1400,
        height: 700
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
