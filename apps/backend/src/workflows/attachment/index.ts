import {
   createWorkflow,
   WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { createAttachmentStep } from "./steps/create-attachments";
import { updateAttachmentStep } from "./steps/update-attachments";
import { deleteAttachmentStep } from "./steps/delete-attachments";
import {
   AdminCreateAttachmentType,
   AdminUpdateAttachmentType,
} from "src/api/admin/attachments/validators";

export const createAttachmentWorkflow = createWorkflow(
   "create-attachment",
   (input: AdminCreateAttachmentType) => {
      const attachment = createAttachmentStep(input);

      return new WorkflowResponse(attachment);
   }
);

export const updateAttachmentWorkflow = createWorkflow(
   "update-attachment",
   (input: AdminUpdateAttachmentType) => {
      const attachment = updateAttachmentStep(input);

      return new WorkflowResponse(attachment);
   }
);

export const deleteAttachmentWorkflow = createWorkflow(
   "delete-attachment",
   (input: string) => {
      const attachment = deleteAttachmentStep(input);

      return new WorkflowResponse(attachment);
   }
);
