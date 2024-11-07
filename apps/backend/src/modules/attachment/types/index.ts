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

export type ModuleAttachment = {
   id: string;
   name: string;
   file_name: string;
   language: Language;
   type: Type;
   created_at: Date;
   updated_at: Date;
   deleted_at: Date | null;
 };

export type AttachmentData = InferTypeOf<typeof Attachment>;

export interface ModuleUpdateAttachment extends Partial<ModuleAttachment> {
   id: string;
 }