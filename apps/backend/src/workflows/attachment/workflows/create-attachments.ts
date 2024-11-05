import { createWorkflow, WorkflowResponse } from "@medusajs/workflows-sdk";
import { ModuleCreateAttachment } from "@starter/types";
import { createAttachmentsStep } from "../steps";

export const createAttachmentsWorkflow = createWorkflow(
   "create-attachment",
   function (input: ModuleCreateAttachment) {
      return new WorkflowResponse(createAttachmentsStep(input));
   }
);
