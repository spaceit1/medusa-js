import { createWorkflow, WorkflowResponse } from "@medusajs/workflows-sdk";
import { ModuleUpdateAttachment } from "@starter/types";
import { updateAttachmentsStep } from "../steps";

export const updateAttachmentsWorkflow = createWorkflow(
  "update-attachments",
  function (input: ModuleUpdateAttachment) {
    return new WorkflowResponse(updateAttachmentsStep(input));
  }
);
