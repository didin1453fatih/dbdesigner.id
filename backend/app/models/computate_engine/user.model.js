// const Sequelize = require("sequelize");
const {  DataTypes } = require('sequelize');
module.exports = {
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
    user_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    complete_name: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    token_email_verify: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    token_email_verify_expired_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    token_password_reset: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    token_password_reset_expired_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    facebook_account: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    github_account: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    twitter_account: {
      type: DataTypes.STRING(256),
      allowNull: true
    }
  },
  associations: [
    {
      type: "hasMany",
      model: "project",
      options: {
        foreignKey: "user_id",
        sourceKey: "id"
      }
    }
  ]
};
