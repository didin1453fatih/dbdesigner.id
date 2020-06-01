
const { DataTypes } = require('sequelize');
module.exports = {
    options: {
        createdAt: "created",
        updatedAt: "updated",
        timestamps: true,
        paranoid: false,
        freezeTableName: true
    },
    columns: {
        /**
         * id store as token
         */
        token: {
            type: DataTypes.STRING(256),
            allowNull: false,
            primaryKey: true
        },
        id: {
            type: DataTypes.UUID,
            allowNull: false,
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
        expired: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    associations: []
};
