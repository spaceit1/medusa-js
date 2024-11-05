/* Attachment Query Config */
export const adminAttachmentFields = [
  "id",
  "file_name",
  "language",
  "document_type",
  "created_at",
  "updated_at",
  "deleted_at",
  "product_id"
];

export const adminAttachmentQueryConfig = {
  list: {
      defaults: adminAttachmentFields,
      isList: true,
  },
  retrieve: {
      defaults: adminAttachmentFields,
      isList: false,
  },
};

/* Attachment-Product Link Query Config */
export const adminAttachmentToProductFields = [
  "id",
  "attachment_id",
  "product_id",
];

export const adminAttachmentToProductQueryConfig = {
  list: {
      defaults: adminAttachmentToProductFields,
      isList: true,
  },
  retrieve: {
      defaults: adminAttachmentToProductFields,
      isList: false,
  },
};