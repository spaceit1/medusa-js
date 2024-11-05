import type {
   AuthenticatedMedusaRequest,
   MedusaResponse,
} from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { createAttachmentsWorkflow } from "../../../workflows/attachment/workflows/create-attachments";
import { AdminCreateAttachmentType } from "./validators";
import { z } from "zod";

// Schemat walidacji dla tworzenia załącznika
export const createAttachmentSchema = z.object({
   file_id: z.string(),
   mime_type: z.string(),
   file_name: z.string(),
   language: z.string(),
   document_type: z.string(),
});

type CreateAttachmentRequestBody = z.infer<typeof createAttachmentSchema>;

export const GET = async (
   req: AuthenticatedMedusaRequest,
   res: MedusaResponse
) => {
   const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

   const { data: attachments, metadata } = await query.graph({
      entity: "attachments",
      fields: req.remoteQueryConfig.fields,
      filters: req.filterableFields,
      pagination: {
         ...req.remoteQueryConfig.pagination,
      },
   });

   res.json({
      attachments,
      count: metadata!.count,
      offset: metadata!.skip,
      limit: metadata!.take,
   });
};

export const POST = async (
   req: AuthenticatedMedusaRequest<CreateAttachmentRequestBody>,
   res: MedusaResponse
) => {
   const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

   const { result } = await createAttachmentsWorkflow.run({
      input: {
         attachment: {
            fileId: req.validatedBody.file_id,
            mimeType: req.validatedBody.mime_type,
            fileName: req.validatedBody.file_name,
            language: req.validatedBody.language,
            documentType: req.validatedBody.document_type,
            productId: req.validatedBody.product_id,
         },
      },
      container: req.scope,
   });

   const {
      data: [attachment],
   } = await query.graph(
      {
         entity: "attachments",
         fields: req.remoteQueryConfig.fields,
         filters: { id: result.attachment.id },
      },
      { throwIfKeyNotFound: true }
   );

   res.json({ attachment });
};
