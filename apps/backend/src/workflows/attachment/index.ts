import {
   createWorkflow,
   WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { createAttachmentStep } from "./steps/create-attachments";
import { Language, Type } from "../../modules/attachment/types";
import { AdminCreateAttachmentType } from "src/api/admin/attachments/validators";

export const createAttachmentWorkflow = createWorkflow(
   "create-attachment",
   (input: AdminCreateAttachmentType) => {
      const attachment = createAttachmentStep(input);

      return new WorkflowResponse(attachment);
   }
);
