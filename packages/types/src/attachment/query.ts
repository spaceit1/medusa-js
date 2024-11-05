import { ProductDTO } from "@medusajs/types";
import { ModuleAttachment, ModuleAttachmentToProduct } from "./module";

export type QueryAttachment = ModuleAttachment & {
   product: ProductDTO;
   attachmentToProduct: QueryAttachmentToProduct[];
};

export type QueryAttachmentToProduct = ModuleAttachmentToProduct & {
   attachment: QueryAttachment;
   product: ProductDTO;
};

export type QueryProductAttachments = ProductDTO & {
   attachments: QueryAttachment[];
};
