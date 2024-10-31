// src/models/customer.js
module.exports = {
    name: "customer",
    tableName: "customer",
    properties: {
      id: {
        type: "string",
        primaryKey: true,
      },
      email: {
        type: "string",
        required: true,
        unique: true,
      },
      first_name: {
        type: "string",
      },
      last_name: {
        type: "string",
      },
      phone: {
        type: "string",
      },
      has_account: {
        type: "boolean",
        default: false,
      },
      // Nowe pole approved
      approved: {
        type: "boolean",
        default: false,
      },
      metadata: {
        type: "jsonb",
        default: {},
      },
      created_at: {
        type: "timestamp",
        default: () => new Date(),
      },
      updated_at: {
        type: "timestamp",
        default: () => new Date(),
      },
      deleted_at: {
        type: "timestamp",
        nullable: true,
      }
    },
  };