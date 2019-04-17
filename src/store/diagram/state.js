export default {
  connectorNewKey: {
    conn_Car_id_TO_Driver_car_id_2e1b6299_89bd_4b64_94b8_61d19a26fc34: {
      // head is has
      head: {
        table: "Car",
        table_id: "table_car_885ddad7_c509_4d5e_ab2e_dc5cb06d0e33",
        coloumn: "id",
        coloumn_id: "coloumn_car_id_885ddad7_c509_4d5e_ab2e_dc5cb06d0e35",
        association_id:'assoc_Car_has_driver_885ddad7_c509_4d5e_ab2e_dc5cb06d0e35'
      },
      // tail is belong
      tail: {
        table: "Driver",
        table_id: "table_Driver_885ddad7_c509_4d5e_ab2e_dc5cb06d0e38",
        coloumn: "car_id",
        coloumn_id: "coloumn_Driver_car_id_885ddad7_c509_4d5e_ab2e_dc5cb06d0e35",
        association_id: "assoc_Driver_belong_Car_885ddad7_c509_4d5e_ab2e_dc5cb06d0e39"
      },
      points: [250, 100, 100, 100, 30, 110],
      lineStyle: {
        shadowBlur: 0,
        shadowColor: "green"
      }
    },
    conn_Car_COlor_TO_Driver_id_2e1b6299_89bd_4b64_94b8_61d19a26fc34: {
      // head is has
      head: {
        table: "Car",
        table_id: "table_car_885ddad7_c509_4d5e_ab2e_dc5cb06d0e33",
        coloumn: "Color",
        coloumn_id: "coloumn_car_color_885ddad7_c509_4d5e_ab2e_dc5cb06d0e34",
        association_id:'assoc_Car_has_driver_885ddad7_c509_4d5e_ab2e_dc5cb06d0e35'
      },
      // tail is belong
      tail: {
        table: "Driver",
        table_id: "table_Driver_885ddad7_c509_4d5e_ab2e_dc5cb06d0e38",
        coloumn: "car_id",
        coloumn_id: "coloumn_Driver_id_885ddad7_c509_4d5e_ab2e_dc5cb06d0e34",
        association_id: "assoc_Driver_belong_Car_885ddad7_c509_4d5e_ab2e_dc5cb06d0e39"
      },
      points: [250, 100, 100, 100, 30, 110],
      lineStyle: {
        shadowBlur: 0,
        shadowColor: "green"
      }
    },
  },
  dataDiagramNew: {
    table_car_885ddad7_c509_4d5e_ab2e_dc5cb06d0e33: {
      table_name: "Car",
      point: {
        x: 30,
        y: 110
      },
      coloumns: {
        coloumn_car_id_885ddad7_c509_4d5e_ab2e_dc5cb06d0e35: {
          coloumn_name: "id",
          comment: "",
          dataType: "integer(31)",
          default: "",
          primaryKey: true,
          notNull: false,
          unique: false,
          foreignKey:false,
          unsigned: false,
          zeroFill: false,
          autoIncrement: false,
          style: {
            shadowBlur: 0,
            shadowColor: "green"
          },
        },
        coloumn_car_color_885ddad7_c509_4d5e_ab2e_dc5cb06d0e34: {
          coloumn_name: "color",
          comment: "",
          dataType: "varchar(31)",
          default: "",
          primaryKey: true,
          notNull: false,
          unique: false,
          foreignKey:false,
          unsigned: false,
          zeroFill: false,
          autoIncrement: false,
          style: {
            shadowBlur: 0,
            shadowColor: "green"
          }
        },
        coloumn_car_number_885ddad7_c509_4d5e_ab2e_dc5cb06d0e34: {
          coloumn_name: "number",
          comment: "",
          dataType: "integer(31)",
          default: "",
          primaryKey: false,
          notNull: true,
          unique: false,
          foreignKey:false,
          unsigned: false,
          zeroFill: false,
          autoIncrement: false,
          style: {
            shadowBlur: 0,
            shadowColor: "green"
          }
        }              
      },
      association: {
        assoc_Car_has_driver_885ddad7_c509_4d5e_ab2e_dc5cb06d0e35: {
          connector_id: "conn_Car_id_TO_Driver_car_id_2e1b6299_89bd_4b64_94b8_61d19a26fc34",
          type: "has",
          table: "Driver",
          table_id: "table_Driver_885ddad7_c509_4d5e_ab2e_dc5cb06d0e38",
          foreignKey: "Car_id",
          foreignKey_id: "coloumn_Driver_car_id_885ddad7_c509_4d5e_ab2e_dc5cb06d0e35",
          sourceKey: "id",
          sourceKey_id: "coloumn_car_id_885ddad7_c509_4d5e_ab2e_dc5cb06d0e35",
          point: {
            x: 100,
            y: 50
          }
        },
        assoc_Car_Color_has_driver_Id_885ddad7_c509_4d5e_ab2e_dc5cb06d0e35: {
          connector_id: "conn_Car_COlor_TO_Driver_id_2e1b6299_89bd_4b64_94b8_61d19a26fc34",
          type: "has",
          table: "Driver",
          table_id: "table_Driver_885ddad7_c509_4d5e_ab2e_dc5cb06d0e38",
          foreignKey: "Car_id",
          foreignKey_id: "coloumn_Driver_id_885ddad7_c509_4d5e_ab2e_dc5cb06d0e34",
          sourceKey: "id",
          sourceKey_id: "coloumn_car_color_885ddad7_c509_4d5e_ab2e_dc5cb06d0e34",
          point: {
            x: 100,
            y: 100
          }
        },
      }
    },
    table_Driver_885ddad7_c509_4d5e_ab2e_dc5cb06d0e38: {
      table_name: "Driver",
      point: {
        x: 250,
        y: 100
      },
      coloumns: {
        coloumn_Driver_id_885ddad7_c509_4d5e_ab2e_dc5cb06d0e34: {
          coloumn_name: "id",
          comment: "",
          dataType: "varchar(31)",
          default: "",
          primaryKey: true,
          notNull: false,
          unique: false,
          foreignKey:false,
          unsigned: false,
          zeroFill: false,
          autoIncrement: false,
          style: {
            shadowBlur: 0,
            shadowColor: "green"
          },
          association_belong_id:'assoc_Driver_belong_Color_885ddad7_c509_4d5e_ab2e_dc5cb06d0e39'
        },
        coloumn_Driver_car_id_885ddad7_c509_4d5e_ab2e_dc5cb06d0e35: {
          coloumn_name: "Car_id",
          comment: "",
          dataType: "integer(31)",
          default: "",
          primaryKey: true,
          foreignKey:true,
          notNull: false,
          unique: false,
          unsigned: false,
          zeroFill: false,
          autoIncrement: false,
          style: {
            shadowBlur: 0,
            shadowColor: "green"
          },
          association_belong_id:'assoc_Driver_belong_Car_885ddad7_c509_4d5e_ab2e_dc5cb06d0e39'
        }
      },
      association: {
        assoc_Driver_belong_Car_885ddad7_c509_4d5e_ab2e_dc5cb06d0e39: {
          connector_id: "conn_Car_id_TO_Driver_car_id_2e1b6299_89bd_4b64_94b8_61d19a26fc34",
          type: "belong",
          table: "Car",
          table_id: "table_car_885ddad7_c509_4d5e_ab2e_dc5cb06d0e33",
          foreignKey: "Car_id",
          foreignKey_id: "coloumn_Driver_car_id_885ddad7_c509_4d5e_ab2e_dc5cb06d0e35",
          targetKey: "id",
          targetKey_id: "coloumn_car_id_885ddad7_c509_4d5e_ab2e_dc5cb06d0e35",
          point: {
            x: 100,
            y: 50
          }
        },
        assoc_Driver_belong_Color_885ddad7_c509_4d5e_ab2e_dc5cb06d0e39: {
          connector_id: "conn_Car_COlor_TO_Driver_id_2e1b6299_89bd_4b64_94b8_61d19a26fc34",
          type: "belong",
          table: "Car",
          table_id: "table_car_885ddad7_c509_4d5e_ab2e_dc5cb06d0e33",
          foreignKey: "id",
          foreignKey_id: "coloumn_Driver_id_885ddad7_c509_4d5e_ab2e_dc5cb06d0e34",
          targetKey: "Color",
          targetKey_id: "coloumn_car_color_885ddad7_c509_4d5e_ab2e_dc5cb06d0e34",
          point: {
            x: 100,
            y: 100
          }
        }
      }
    },
  },
  tableKeyConfig:'',
  visibleConfigTable: false
};
