import {
   AuthenticatedMedusaRequest,
   MedusaResponse,
} from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import {
   AdminGetAttachmentParamsType,
   AdminUpdateAttachmentType,
} from "../validators";
import {
   deleteAttachmentWorkflow,
   updateAttachmentWorkflow,
} from "src/workflows/attachment";

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
   const { id } = req.params;

   await updateAttachmentWorkflow.run({ input: { ...req.body, id } });

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
   const { id } = req.params;

   const { result } = await deleteAttachmentWorkflow.run({
      input: id,
   });

   res.json({ attachment: result });
};
