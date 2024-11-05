import { model } from "@medusajs/framework/utils";
import { Type, Language } from "../types";

const Attachment = model.define("attachment", {
   id: model.id().primaryKey(),
   name: model.text(),
   file_name: model.text(),
   language: model.enum(Language),
   type: model.enum(Type),
});

const AttachmentToProduct = model.define("attachment_to_product", {
   id: model.id().primaryKey(),
   attachment_id: model.text(),
   product_id: model.text(),
});

export { Attachment, AttachmentToProduct };
