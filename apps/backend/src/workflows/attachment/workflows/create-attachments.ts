import { createWorkflow, WorkflowResponse } from "@medusajs/workflows-sdk";
import { CreateAttachmentData } from "../../../modules/attachment/types";
import { createAttachmentsStep } from "../steps";

export const createAttachmentsWorkflow = createWorkflow(
   "create-attachment",
   function (input: CreateAttachmentData) {
      return new WorkflowResponse(createAttachmentsStep(input));
   }
);
