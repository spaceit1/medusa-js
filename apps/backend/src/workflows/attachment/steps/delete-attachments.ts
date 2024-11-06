import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { ATTACHMENT_MODULE } from "../../../modules/attachment";
import AttachmentModuleService from "../../../modules/attachment/service";

export const deleteAttachmentStep = createStep(
   "delete-attachment-step",
   async (id: string, { container }) => {
      const attachmentModuleService: AttachmentModuleService =
         container.resolve(ATTACHMENT_MODULE);

      await attachmentModuleService.softDeleteAttachments(id);
   }
);
