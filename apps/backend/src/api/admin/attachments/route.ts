import type {
   AuthenticatedMedusaRequest,
   MedusaResponse,
} from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { createAttachmentsWorkflow } from "../../../workflows/attachment/workflows/create-attachments";
import { AdminCreateAttachmentType } from "./validators";

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
   req: AuthenticatedMedusaRequest<AdminCreateAttachmentType>,
   res: MedusaResponse
) => {
   const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

   console.log(...req.validatedBody);

   const { result: createdAttachment } = await createAttachmentsWorkflow.run({
      input: { ...req.validatedBody },
      container: req.scope,
   });

   const {
      data: [attachment],
   } = await query.graph(
      {
         entity: "attachments",
         fields: req.remoteQueryConfig.fields,
         filters: { id: createdAttachment.id },
      },
      { throwIfKeyNotFound: true }
   );

   res.json({ attachment });
};
