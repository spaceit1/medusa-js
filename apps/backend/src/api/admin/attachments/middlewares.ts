import {
   validateAndTransformBody,
   validateAndTransformQuery,
} from "@medusajs/framework";
import { MiddlewareRoute } from "@medusajs/medusa";
import {
   adminAttachmentQueryConfig,
   adminAttachmentToProductQueryConfig,
} from "./query-config";
import {
   AdminCreateAttachment,
   AdminCreateAttachmentToProduct,
   AdminGetAttachmentParams,
   AdminUpdateAttachment,
   AdminUpdateAttachmentToProduct,
} from "./validators";

export const adminAttachmentsMiddlewares: MiddlewareRoute[] = [
   /* Attachments Middlewares */
   {
      method: ["GET"],
      matcher: "/admin/attachments",
      middlewares: [
         validateAndTransformQuery(
            AdminGetAttachmentParams,
            adminAttachmentQueryConfig.list
         ),
      ],
   },
   {
      method: ["POST"],
      matcher: "/admin/attachments",
      middlewares: [
         validateAndTransformBody(AdminCreateAttachment),
         validateAndTransformQuery(
            AdminCreateAttachment,
            adminAttachmentQueryConfig.retrieve
         ),
      ],
   },
   {
      method: ["GET"],
      matcher: "/admin/attachments/:id",
      middlewares: [
         validateAndTransformQuery(
            AdminGetAttachmentParams,
            adminAttachmentQueryConfig.retrieve
         ),
      ],
   },
   {
      method: ["POST"],
      matcher: "/admin/attachments/:id",
      middlewares: [
         validateAndTransformBody(AdminUpdateAttachment),
         validateAndTransformQuery(
            AdminGetAttachmentParams,
            adminAttachmentQueryConfig.retrieve
         ),
      ],
   },

   /* Attachment-Product Link Middlewares */
   {
      method: ["POST"],
      matcher: "/admin/attachments/:id/products",
      middlewares: [
         validateAndTransformBody(AdminCreateAttachmentToProduct),
         validateAndTransformQuery(
            AdminGetAttachmentParams,
            adminAttachmentToProductQueryConfig.retrieve
         ),
      ],
   },
   {
      method: ["POST"],
      matcher: "/admin/attachments/:id/products/:product_id",
      middlewares: [
         validateAndTransformBody(AdminUpdateAttachmentToProduct),
         validateAndTransformQuery(
            AdminGetAttachmentParams,
            adminAttachmentToProductQueryConfig.retrieve
         ),
      ],
   },
   {
      method: ["DELETE"],
      matcher: "/admin/attachments/:id/products/:product_id",
      middlewares: [
         validateAndTransformQuery(
            AdminGetAttachmentParams,
            adminAttachmentToProductQueryConfig.retrieve
         ),
      ],
   },
];
