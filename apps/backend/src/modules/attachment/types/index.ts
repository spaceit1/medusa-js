import { ProductDTO, InferTypeOf } from "@medusajs/framework/types";
import { Attachment } from "../models/attachment";

export enum Type {
   DOCUMENT = "document",
   IMAGE = "image",
}

export enum Language {
   PL = "pl",
   EN = "en",
}

export interface AttachmentDTO {
   id: string;
   name: string;
   file_name: string;
   language: string;
   document_type: string;
   created_at: Date;
   updated_at: Date;
   deleted_at: Date | null;
}

export interface AttachmentToProductDTO {
   id: string;
   attachment_id: string;
   product_id: string;
   attachment?: AttachmentDTO;
   product?: ProductDTO;
   created_at: Date;
   updated_at: Date;
}

export interface ProductWithAttachmentsDTO extends ProductDTO {
   attachments?: AttachmentDTO[];
}

export type CreateAttachmentData = {
   name: string;
   file_name: string;
   language: Language;
   document_type: string;
   created_at: Date;
   updated_at: Date;
};

export type AttachmentData = InferTypeOf<typeof Attachment>;
