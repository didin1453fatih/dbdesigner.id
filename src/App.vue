<template>
  <div>
    <a-row>
      <a-col :span="17">
        <v-stage :config="configKonva">
          <v-layer>
            <table-base
              @editDataTable="editDataTable"
              @changedPotition="table1Change"
              :potition="{
          x:20,
          y:50      
        }"
            />
            <table-base
              @editDataTable="editDataTable"
              @changedPotition="table2Change"
              :potition="{  
           x:250,
           y:50
        }"
            />
            <connector-base :points="[20, 50, 250, 50]"/>
            <v-line :config="lineConfig"/>
          </v-layer>
        </v-stage>
      </a-col>
      <a-col :span="6">
        <a-button>Default</a-button>
        <a-button type="primary" @click="showDrawer">Open</a-button>
      </a-col>
    </a-row>
    <config-table :visible="visible" @close="onClose"/>
    <!-- <a-drawer
      title="Rujak"
      placement="right"
      :width="520"
      :closable="false"
      @close="onClose"
      :visible="visible"
    >
    <div>-->
    <!-- <a-table :columns="columns" :dataSource="data" bordered>
          <template slot="name" slot-scope="text">
            <span v-if="'John Brown'===text">hhhh</span>
          </template>
    </a-table>-->
    <!-- <table border="1" width="100%">
          <tr>
            <td>
              <span style="margin-left:10px">Column Name</span>
            </td>
            <td width="25%">
              <span style="margin-left:10px">Data Type</span>
            </td>
            <td width="9%" align="center">PK</td>
            <td width="9%" align="center">NN</td>
            <td width="9%" align="center">UQ</td>
            <td width="9%" align="center">UN</td>
            <td width="9%" align="center">AI</td>
            <td width="7%" align="center"></td>
          </tr>
          <tr>
            <td>
              <span style="margin-left:10px">
                <img
                  src="./assets/primary-key.png"
                  width="14px"
                  style="vertical-align: baseline; margin-right:5px"
                >
                <span>id</span>
              </span>
            </td>
            <td>
    <a-input placeholder="Data Type"/>-->
    <!-- <a-select
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                style="width: 100px; border:0;"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"
                :filterOption="filterOption"
              >
                <a-select-option value="jack">Varchar</a-select-option>
                <a-select-option value="lucy">Big Int</a-select-option>
                <a-select-option value="tom">Tom</a-select-option>
    </a-select>-->
    <!-- </td>
            <td align="center">
              <a-checkbox @change="onChange" style="padding:0px;margin:0px" :size="suze"></a-checkbox>
            </td>
            <td align="center">
              <a-checkbox @change="onChange" style="padding:0px;margin:0px" :size="suze"></a-checkbox>
            </td>
            <td align="center">
              <a-checkbox @change="onChange" style="padding:0px;margin:0px" :size="suze"></a-checkbox>
            </td>
            <td align="center">
              <a-checkbox @change="onChange" style="padding:0px;margin:0px" :size="suze"></a-checkbox>
            </td>
            <td align="center">
              <a-checkbox @change="onChange" style="padding:0px;margin:0px" :size="suze"></a-checkbox>
            </td>
            <td align="center">
              <a-icon type="edit" />
            </td>
          </tr>
          <tr>
            <td>
              <span style="margin-left:10px">
                <img
                  src="./assets/icons8-diamonds-40.png"
                  width="14px"
                  style="vertical-align: baseline; margin-right:5px"
                >
                <span>id</span>
              </span>
            </td>
            <td>
    <a-input placeholder="Data Type"/>-->
    <!-- <a-select
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                style="width: 100px; border:0;"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"
                :filterOption="filterOption"
              >
                <a-select-option value="jack">Varchar</a-select-option>
                <a-select-option value="lucy">Big Int</a-select-option>
                <a-select-option value="tom">Tom</a-select-option>
    </a-select>-->
    <!-- </td>
            <td align="center">
              <a-checkbox @change="onChange" style="padding:0px;margin:0px" :size="suze"></a-checkbox>
            </td>
            <td align="center">
              <a-checkbox @change="onChange" style="padding:0px;margin:0px" :size="suze"></a-checkbox>
            </td>
            <td align="center">
              <a-checkbox @change="onChange" style="padding:0px;margin:0px" :size="suze"></a-checkbox>
            </td>
            <td align="center">
              <a-checkbox @change="onChange" style="padding:0px;margin:0px" :size="suze"></a-checkbox>
            </td>
            <td align="center">
              <a-checkbox @change="onChange" style="padding:0px;margin:0px" :size="suze"></a-checkbox>
            </td>
            <td align="center">
              <a-icon type="edit" />
            </td>
          </tr>
    </table>-->
    <!-- <a-row>
          <a-col :span="1">
            <img
              src="./assets/primary-key.png"
              width="14px"
              style="vertical-align: baseline; margin-right:5px"
            >
          </a-col>
          <a-col :span="3">
            <span>id</span>
          </a-col>
          <a-col :span="5">
            <span>varchar(15)</span>
          </a-col>
          <a-col :span="3">
            <a-checkbox @change="onChange" style="padding:0px;margin:0px"  :size="suze"></a-checkbox>
            <a-checkbox @change="onChange" style="padding:0px;margin:0px"  :size="suze"></a-checkbox>
    </a-col>-->
    <!-- <a-col :span="3">
            <a-checkbox @change="onChange" style="padding:0px;margin:0px"  :size="suze"></a-checkbox>
          </a-col>
          <a-col :span="3">
            <a-checkbox @change="onChange" style="padding:0px;margin:0px"  :size="suze"></a-checkbox>
          </a-col>
          <a-col :span="3">
            <a-checkbox @change="onChange" style="padding:0px;margin:0px"  :size="suze"></a-checkbox>
    </a-col>-->
    <!-- </a-row> -->

    <!--  -->
    <!-- <a-select
          mode="multiple"
          placeholder="Inserted are removed"
          :value="selectedItems"
          @change="handleChange"
          style="width: 100%"
        >
          <a-select-option v-for="item in filteredOptions" :key="item" :value="item">{{item}}</a-select-option>
    </a-select>-->
    <!-- </div>
    </a-drawer>-->
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
      this.visible=true
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
    table1Change(val) {
      // getConnectorPoint(tableName)
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
      dataDiagram: {
        tableName: {
          coloumnName: {
            comment: "",
            dataType: "",
            default: "",
            primaryKey: true,
            allowNull: false,
            unique: false,
            unsigned: false,
            zeroFill: false,
            autoIncrement: false,
            foreignKey: {
              tableName: "tableName",
              coloumnName: "key"
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
