import {
   AuthenticatedMedusaRequest,
   MedusaResponse,
} from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";

export const GET = async (
   req: AuthenticatedMedusaRequest,
   res: MedusaResponse
) => {
   const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
   const { id: productId } = req.params;

   const { data: attachments, metadata } = await query.graph({
      entity: "attachments",
      fields: req.remoteQueryConfig.fields,
      joins: [
         {
            entity: "attachment_to_product",
            alias: "atp",
            on: { attachment_id: "id" },
            where: { product_id: productId },
         },
      ],
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
