import {
   AuthenticatedMedusaRequest,
   MedusaResponse,
} from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import {
   AdminGetAttachmentParamsType,
   AdminUpdateAttachmentType,
} from "../validators";

export const GET = async (
   req: AuthenticatedMedusaRequest<AdminGetAttachmentParamsType>,
   res: MedusaResponse
) => {
   const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
   const { id } = req.params;

   const {
      data: [attachment],
   } = await query.graph(
      {
         entity: "attachments",
         fields: req.remoteQueryConfig.fields,
         filters: { id },
      },
      { throwIfKeyNotFound: true }
   );

   res.json({ attachment });
};

export const POST = async (
   req: AuthenticatedMedusaRequest<AdminUpdateAttachmentType>,
   res: MedusaResponse
) => {
   const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
   const attachmentService = req.scope.resolve("attachmentService");
   const { id } = req.params;

   const updatedAttachment = await attachmentService.update(
      id,
      req.validatedBody
   );

   const {
      data: [attachment],
   } = await query.graph(
      {
         entity: "attachments",
         fields: req.remoteQueryConfig.fields,
         filters: { id },
      },
      { throwIfKeyNotFound: true }
   );

   res.json({ attachment });
};

export const DELETE = async (
   req: AuthenticatedMedusaRequest,
   res: MedusaResponse
) => {
   const attachmentService = req.scope.resolve("attachmentService");
   const { id } = req.params;

   await attachmentService.delete(id);

   res.status(200).json({
      id,
      object: "attachment",
      deleted: true,
   });
};
