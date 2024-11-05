import { FindParams, PaginatedResponse } from "@medusajs/types";
import {
   QueryAttachment,
   QueryAttachmentToProduct,
   QueryProductAttachments,
} from "./query";
import {
   ModuleAttachmentFilters,
   ModuleAttachmentToProductFilters,
} from "./service";
import { ModuleAttachmentLanguage, ModuleAttachmentType } from "./module";

/* Filters */
export interface AttachmentFilterParams
   extends FindParams,
      ModuleAttachmentFilters {}

export interface AttachmentToProductFilterParams
   extends FindParams,
      ModuleAttachmentToProductFilters {}

/* Admin */

/* Attachment */
export type AdminAttachmentResponse = {
   attachment: QueryAttachment;
};

export type AdminAttachmentsResponse = PaginatedResponse<{
   attachments: QueryAttachment[];
}>;

export type AdminCreateAttachment = {
   file_name: string;
   language: ModuleAttachmentLanguage;
   document_type: ModuleAttachmentType;
   product_id: string;
};

export type AdminUpdateAttachment = {
   id: string;
   file_name?: string;
   language?: ModuleAttachmentLanguage;
   document_type?: ModuleAttachmentType;
   product_id?: string;
};

/* Product Attachments */
export type AdminProductAttachmentsResponse = {
   product: QueryProductAttachments;
};

export type AdminAttachmentToProductResponse = {
   attachmentToProduct: QueryAttachmentToProduct;
};

/* Store */

/* Attachment */
export type StoreAttachmentResponse = {
   attachment: QueryAttachment;
};

export type StoreAttachmentsResponse = PaginatedResponse<{
   attachments: QueryAttachment[];
}>;

export type StoreCreateAttachment = {
   file_name: string;
   language: ModuleAttachmentLanguage;
   document_type: ModuleAttachmentType;
   product_id: string;
};

export type StoreUpdateAttachment = {
   id: string;
   file_name?: string;
   language?: ModuleAttachmentLanguage;
   document_type?: ModuleAttachmentType;
   product_id?: string;
};

/* Product Attachments */
export type StoreProductAttachmentsResponse = {
   product: QueryProductAttachments;
};

export type StoreAttachmentPreviewResponse = {
   attachment: {
      id: string;
      file_name: string;
      language: ModuleAttachmentLanguage;
      document_type: ModuleAttachmentType;
   };
};
