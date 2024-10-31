import {
  MedusaNextFunction,
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework";
import { defineMiddlewares,authenticate } from "@medusajs/medusa";
import { adminMiddlewares } from "./admin/middlewares";
import { storeMiddlewares } from "./store/middlewares";

export default defineMiddlewares({
  routes: [
      {
          matcher: "/admin/product-documents/get-all",
          middlewares: [
              authenticate("user", ["session", "bearer", "api-key"])
          ],
      },
      {
        matcher: "/admin/product-documents/get",
        middlewares: [
            authenticate("user", ["session", "bearer", "api-key"])
        ],
    },
    {
      matcher: "/admin/product-documents/upload",
      middlewares: [
          authenticate("user", ["session", "bearer", "api-key"])
      ],
   },
   {
      matcher: "/admin/product-documents/save-file",
      middlewares: [
        authenticate("user", ["session", "bearer", "api-key"])
      ],
    },
    {
      matcher: "/admin/product-documents/delete",
      middlewares: [
          authenticate("user", ["session", "bearer", "api-key"])
      ],
  },
  ],
});