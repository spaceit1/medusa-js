import {
   createWorkflow,
   WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { createAttachmentStep } from "./steps/create-attachments";
import { Language, Type } from "../../modules/attachment/types";

export type CreateAttachmentInput = {
   name: string;
   file_name: string;
   language: Language;
   type: Type;
   created_at: Date;
   updated_at: Date;
};

export const createAttachmentWorkflow = createWorkflow(
   "create-attachment",
   (input: CreateAttachmentInput) => {
      const attachment = createAttachmentStep(input);

      return new WorkflowResponse(attachment);
   }
);
