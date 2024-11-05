import type {
   AuthenticatedMedusaRequest,
   MedusaResponse,
} from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { AdminCreateAttachmentType } from "./validators";

export const GET = async (
   req: AuthenticatedMedusaRequest,
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
   req: AuthenticatedMedusaRequest<AdminCreateAttachmentType>,
   res: MedusaResponse
 ) => {
   const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
   const attachmentService = req.scope.resolve("attachmentService");
 
   const createdAttachment = await attachmentService.create({
     ...req.validatedBody,
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
 