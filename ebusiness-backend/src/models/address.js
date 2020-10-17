'use strict';
module.exports = (sequelize, DataTypes) => {
  const address = sequelize.define(
    'address',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      county: {
        type: DataTypes.STRING,
        allowNull: false
      },
      postalCode: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
      },
      // lat: {
      //   type: DataTypes.FLOAT,
      //   allowNull: false
      // },
      // lng: {
      //   type: DataTypes.FLOAT,
      //   allowNull: false
      // },
      clientId: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {}
  );
  address.associate = function(models) {
    address.belongsTo(models.client, { onDelete: 'CASCADE' });
    address.hasMany(models.order, { foreignKey: 'deliveryAddressId' });
    address.hasMany(models.order, { foreignKey: 'receiptAddressId' });
  };
  return address;
};
