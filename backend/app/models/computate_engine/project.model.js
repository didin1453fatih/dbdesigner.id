const { Model, DataTypes } = require('sequelize');
module.exports = {
  datastore: "default",
  options: {
    createdAt: "created",
    updatedAt: "updated",
    timestamps: true,
    paranoid: false,
    freezeTableName: true
  },
  columns: {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false,
      defaultValue: ''
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      get: integerDataType('share_status')
    },
    // version use sermver x.y.z
    version: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    viewers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      get: integerDataType('share_status')
    },
    // 0 is private
    // 1 is protected
    // 2 is public
    share_status: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0,
      get: integerDataType('share_status')
    },
    share_password: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    share_link: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    data_design: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    }
  },
  associations: [
    {
      type: "belongsTo",
      model: "user",
      options: {
        foreignKey: "user_id",
        targetKey: "id",
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    }
  ]
};

function integerDataType( column) {
  return function get() {
    var value = this.getDataValue(column)
    if (typeof value === 'string') {
      return parseInt(value);
    }
    return value
  }
}