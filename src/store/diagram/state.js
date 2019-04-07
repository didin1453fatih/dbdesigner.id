export default {
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
  }
};
