import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { ATTACHMENT_MODULE } from "../../../modules/attachment";
import AttachmentModuleService from "../../../modules/attachment/service";
import { ModuleAttachment } from "src/modules/attachment/types";

export const createAttachmentStep = createStep(
   "create-attachment-step",
   async (input: ModuleAttachment, { container }) => {
      const attachmentModuleService: AttachmentModuleService =
         container.resolve(ATTACHMENT_MODULE);

      const attachment = await attachmentModuleService.createAttachments(input);

      return new StepResponse(attachment, attachment.id);
   },

   async (id: string, { container }) => {
      const attachmentModuleService: AttachmentModuleService =
         container.resolve(ATTACHMENT_MODULE);

      await attachmentModuleService.deleteAttachments(id);
   }
);
