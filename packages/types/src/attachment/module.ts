/* Entity: Attachment */

export enum ModuleAttachmentType {
   MANUAL = "manual",
   WARRANTY = "warranty",
   CERTIFICATE = "certificate",
   TECHNICAL_SPEC = "technical_spec",
   OTHER = "other",
}

export enum ModuleAttachmentLanguage {
   PL = "pl",
   EN = "en",
   DE = "de",
   FR = "fr",
   ES = "es",
}

export type ModuleAttachment = {
   id: string;
   file_name: string;
   language: ModuleAttachmentLanguage;
   document_type: ModuleAttachmentType;
   product_id: string;
   created_at: Date;
   updated_at: Date;
   deleted_at: Date | null;
};

export type ModuleCreateAttachment = {
   file_name: string;
   language: ModuleAttachmentLanguage;
   document_type: ModuleAttachmentType;
   product_id: string;
};

export interface ModuleUpdateAttachment extends Partial<ModuleAttachment> {
   id: string;
}

export type ModuleDeleteAttachment = {
   id: string;
};

/* Entity: AttachmentToProduct */

export type ModuleAttachmentToProduct = {
   id: string;
   attachment_id: string;
   product_id: string;
   created_at: Date;
   updated_at: Date;
};

export type ModuleCreateAttachmentToProduct = {
   attachment_id: string;
   product_id: string;
};

export interface ModuleUpdateAttachmentToProduct
   extends Partial<ModuleAttachmentToProduct> {
   id: string;
}

export type ModuleDeleteAttachmentToProduct = {
   id: string;
};
