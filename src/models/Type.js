"use strict";

import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Type extends Model {
    static associate(models) {
      Type.hasMany(models.Book, {
        foreignKey: 'type_id',
        as: 'books'
      });
    }
  }
  Type.init(
    {
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Type",
      tableName: "types",
      underscored: true,
      timestamps: false,
    }
  );
  return Type;
};