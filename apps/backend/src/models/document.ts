// src/models/document.js
module.exports = {
    name: "document",
    tableName: "documents",
    properties: {
      id: {
        type: "integer",
        primaryKey: true,
        autoIncrement: true,
      },
      product_id: {
        type: "integer",
        required: true,
        foreignKey: "products.id",
      },
      file_name: {
        type: "string",
        required: true,
      },
      created_at: {
        type: "timestamp",
        default: () => new Date(),
      },
    },
  };
  