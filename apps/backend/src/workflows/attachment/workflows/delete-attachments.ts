import { createWorkflow } from "@medusajs/workflows-sdk";
import { ModuleDeleteAttachment } from "@starter/types";
import { deleteAttachmentsStep } from "../steps";

export const deleteAttachmentsWorkflow = createWorkflow(
   "delete-attachments",
   function (input: ModuleDeleteAttachment) {
      deleteAttachmentsStep([input.id]);
   }
);
