"use strict";

import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      // Associations s'il y en a
    }
  }
  Book.init(
    {
      title: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Book",
      tableName: "books",
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Book;
};
