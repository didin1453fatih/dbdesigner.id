export default {
  connectorNew: [
    {
      key: "mobil#id$sopir#mobil_id",
      // head is has
      head: {
        table: "mobil",
        coloumn: "id"
      },
      // tail is belong
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
  connectorNewKey: {
    conn_2e1b6299_89bd_4b64_94b8_61d19a26fc34: {
      // head is has
      head: {
        table: "Car",
        table_id: "table_885ddad7_c509_4d5e_ab2e_dc5cb06d0e33",
        coloumn: "id",
        coloumn_id: "coloumn_885ddad7_c509_4d5e_ab2e_dc5cb06d0e35"
      },
      // tail is belong
      tail: {
        table: "Driver",
        table_id: "table_885ddad7_c509_4d5e_ab2e_dc5cb06d0e38",
        coloumn: "Car_id",
        coloumn_id: "coloumn_885ddad7_c509_4d5e_ab2e_dc5cb06d0e35"
      },
      points: [250, 100, 100, 100, 30, 110],
      lineStyle: {
        shadowBlur: 0,
        shadowColor: "green"
      }
    },
    conn_3e1b6299_89bd_4b64_94b8_61d19a26fc34: {
      // head is has
      head: {
        table: "Car",
        table_id: "table_885ddad7_c509_4d5e_ab2e_dc5cb06d0e33",
        coloumn: "id",
        coloumn_id: "coloumn_885ddad7_c509_4d5e_ab2e_dc5cb06d0e35",
      },
      // tail is belong
      tail: {
        table: "Driver",
        table_id: "table_885ddad7_c509_4d5e_ab2e_dc5cb06d0e38",
        coloumn: "Car_id",
        coloumn_id: "coloumn_885ddad7_c509_4d5e_ab2e_dc5cb06d0e35"
      },
      points: [250, 330, 100, 100, 30, 110],
      lineStyle: {
        shadowBlur: 0,
        shadowColor: "green"
      }
    }
  },
  dataDiagramNew: {
    table_885ddad7_c509_4d5e_ab2e_dc5cb06d0e33: {
      table_name: "Car",
      point: {
        x: 30,
        y: 110
      },
      coloumns: {
        coloumn_885ddad7_c509_4d5e_ab2e_dc5cb06d0e34: {
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
        coloumn_885ddad7_c509_4d5e_ab2e_dc5cb06d0e35: {
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
          association: ["assoc_885ddad7_c509_4d5e_ab2e_dc5cb06d0e35"]
        }
      },
      association: {
        assoc_885ddad7_c509_4d5e_ab2e_dc5cb06d0e35: {
          connector_id: "conn_2e1b6299_89bd_4b64_94b8_61d19a26fc34",
          type: "has",
          table: "Driver",
          table_id: "table_885ddad7_c509_4d5e_ab2e_dc5cb06d0e38",
          foreignKey: "Car_id",
          foreignKey_id: "coloumn_885ddad7_c509_4d5e_ab2e_dc5cb06d0e35",
          sourceKey: "id",
          sourceKey_id: "coloumn_885ddad7_c509_4d5e_ab2e_dc5cb06d0e35",
          point: {
            x: 100,
            y: 50
          }
        },
        assoc_985ddad7_c509_4d5e_ab2e_dc5cb06d0e35: {
          connector_id: "conn_3e1b6299_89bd_4b64_94b8_61d19a26fc34",
          type: "has",
          table: "Driver",
          table_id: "table_885ddad7_c509_4d5e_ab2e_dc5cb06d0e38",
          foreignKey: "Car_id",
          foreignKey_id: "coloumn_885ddad7_c509_4d5e_ab2e_dc5cb06d0e35",
          sourceKey: "id",
          sourceKey_id: "coloumn_885ddad7_c509_4d5e_ab2e_dc5cb06d0e35",
          point: {
            x: 100,
            y: 50
          }
        }
      }
    },
    table_885ddad7_c509_4d5e_ab2e_dc5cb06d0e38: {
      table_name: "Driver",
      point: {
        x: 250,
        y: 100
      },
      coloumns: {
        coloumn_885ddad7_c509_4d5e_ab2e_dc5cb06d0e34: {
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
          }
        },
        coloumn_885ddad7_c509_4d5e_ab2e_dc5cb06d0e35: {
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
          association_belong_id:'assoc_885ddad7_c509_4d5e_ab2e_dc5cb06d0e39'
        }
      },
      association: {
        assoc_885ddad7_c509_4d5e_ab2e_dc5cb06d0e39: {
          connector_id: "conn_2e1b6299_89bd_4b64_94b8_61d19a26fc34",
          type: "belong",
          table: "Car",
          table_id: "table_885ddad7_c509_4d5e_ab2e_dc5cb06d0e33",
          foreignKey: "Car_id",
          foreignKey_id: "coloumn_885ddad7_c509_4d5e_ab2e_dc5cb06d0e35",
          targetKey: "id",
          targetKey_id: "coloumn_885ddad7_c509_4d5e_ab2e_dc5cb06d0e35",
          point: {
            x: 100,
            y: 50
          }
        }
      }
    },
    table_885ddad7_c509_4d5e_ab2e_dc5cc06d0e38: {
      table_name: "Owner",
      point: {
        x: 250,
        y: 300
      },
      coloumns: {
        coloumn_885ddad7_c509_4d5e_ab2e_dc5cb06d0e34: {
          coloumn_name: "id",
          comment: "",
          dataType: "varchar(31)",
          default: "",
          primaryKey: true,
          foreignKey:false,
          notNull: false,
          unique: false,
          unsigned: false,
          zeroFill: false,
          autoIncrement: false,
          style: {
            shadowBlur: 0,
            shadowColor: "green"
          }
        },
        coloumn_889ddad7_c509_4d5e_ab2e_dc5cb06d0e34: {
          coloumn_name: "nama",
          comment: "",
          dataType: "varchar(31)",
          default: "",
          primaryKey: false,
          foreignKey:false,
          notNull: true,
          unique: false,
          unsigned: false,
          zeroFill: false,
          autoIncrement: false,
          style: {
            shadowBlur: 0,
            shadowColor: "green"
          }
        },
        coloumn_885ddad7_c509_4d5e_ab2e_dc5cb06d0e35: {
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
          association_belong_id: "assoc_885ddad7_c509_4d5e_ab2e_dc5cb06d0e39"
        }
      },
      association: {
        assoc_885ddad7_c509_4d5e_ab2e_dc5cb06d0e39: {
          connector_id: "conn_3e1b6299_89bd_4b64_94b8_61d19a26fc34",
          type: "belong",
          table: "Car",
          table_id: "table_885ddad7_c509_4d5e_ab2e_dc5cb06d0e33",
          foreignKey: "Car_id",
          foreignKey_id: "coloumn_885ddad7_c509_4d5e_ab2e_dc5cb06d0e35",
          targetKey: "id",
          targetKey_id: "coloumn_885ddad7_c509_4d5e_ab2e_dc5cb06d0e35",
          point: {
            x: 100,
            y: 50
          }
        }
      }
    }
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
  configTable: {
    tableName: "mobil",
    properties: {
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
    }
  },
  tableKeyConfig:'',
  visibleConfigTable: false
};
