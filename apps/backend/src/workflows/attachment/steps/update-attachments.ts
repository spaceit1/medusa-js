import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { ATTACHMENT_MODULE } from "../../../modules/attachment";
import AttachmentModuleService from "../../../modules/attachment/service";
import { AdminUpdateAttachmentType } from "src/api/admin/attachments/validators";

export const updateAttachmentStep = createStep(
   "update-attachment-step",
   async (input: AdminUpdateAttachmentType, { container }) => {
      const attachmentModuleService: AttachmentModuleService =
         container.resolve(ATTACHMENT_MODULE);

      const [previousData] = await attachmentModuleService.listAttachments({
         id: input.id,
      });

      const attachment = await attachmentModuleService.updateAttachments(input);

      return new StepResponse(attachment, previousData.id);
   },

   async (id: string, { container }) => {
      const attachmentModuleService: AttachmentModuleService =
         container.resolve(ATTACHMENT_MODULE);

      await attachmentModuleService.deleteAttachments(id);
   }
);
