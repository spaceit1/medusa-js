import { createWorkflow, WorkflowResponse } from "@medusajs/workflows-sdk";
import { AttachmentDTO } from "../../../modules/attachment/types";
import { createAttachmentsStep } from "../steps";

export const createAttachmentsWorkflow = createWorkflow(
   "create-attachment",
   function (input: AttachmentDTO) {
      return new WorkflowResponse(createAttachmentsStep(input));
   }
);
