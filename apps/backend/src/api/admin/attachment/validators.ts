import { createSelectParams } from "@medusajs/medusa/api/utils/validators";
import { z } from "zod";

/* Attachment Validators */
export type AdminGetAttachmentParamsType = z.infer<typeof AdminGetAttachmentParams>;
export const AdminGetAttachmentParams = createSelectParams();

export type AdminCreateAttachmentType = z.infer<typeof AdminCreateAttachment>;
export const AdminCreateAttachment = z
  .object({
    file_name: z.string(),
    language: z.string(),
    document_type: z.string(),
    product_id: z.string()
  })
  .strict();

export type AdminUpdateAttachmentType = z.infer<typeof AdminUpdateAttachment>;
export const AdminUpdateAttachment = z
  .object({
    file_name: z.string().optional(),
    language: z.string().optional(),
    document_type: z.string().optional(),
    product_id: z.string().optional()
  })
  .strict();

/* Attachment-Product Link Validators */
export type AdminCreateAttachmentToProductType = z.infer<typeof AdminCreateAttachmentToProduct>;
export const AdminCreateAttachmentToProduct = z
  .object({
    attachment_id: z.string(),
    product_id: z.string(),
  })
  .strict();

export type AdminUpdateAttachmentToProductType = z.infer<typeof AdminUpdateAttachmentToProduct>;
export const AdminUpdateAttachmentToProduct = z
  .object({
    attachment_id: z.string().optional(),
    product_id: z.string().optional(),
  })
  .strict();