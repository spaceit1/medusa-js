import type {
   AuthenticatedMedusaRequest,
   MedusaResponse,
} from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { createAttachmentWorkflow } from "src/workflows/attachment";
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
   const { result } = await createAttachmentWorkflow(req.scope).run({
      input: req.body,
   });

   res.json({ attachment: result });
};
