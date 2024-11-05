import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import {
   IAttachmentModuleService,
   ModuleCreateAttachment,
} from "@starter/types";
import { ATTACHMENT_MODULE } from "../../../modules/attachment";

export const createAttachmentsStep = createStep(
   "create-attachments",
   // Execute step
   async (input: ModuleCreateAttachment, { container }) => {
      const attachmentModuleService =
         container.resolve<IAttachmentModuleService>(ATTACHMENT_MODULE);

      const attachment = await attachmentModuleService.createAttachment(input);

      return new StepResponse(attachment, attachment.id);
   },
   // Compensate (rollback) step
   async (attachmentId: string, { container }) => {
      if (!attachmentId) {
         return;
      }

      const attachmentModuleService =
         container.resolve<IAttachmentModuleService>(ATTACHMENT_MODULE);

      await attachmentModuleService.deleteAttachments([attachmentId]);
   }
);
