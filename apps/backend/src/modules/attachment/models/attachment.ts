import { model } from "@medusajs/framework/utils";

const Attachment = model.define("attachment", {
   id: model.id().primaryKey(),
   name: model.text(),
   file_name: model.text(),
   language: model.text(),
   document_type: model.text(),
});

const AttachmentToProduct = model.define("attachment_to_product", {
   id: model.id().primaryKey(),
   attachment_id: model.text(),
   product_id: model.text(),
});

export { Attachment, AttachmentToProduct };
