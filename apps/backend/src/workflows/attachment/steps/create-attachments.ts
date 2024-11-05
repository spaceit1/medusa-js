import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { ATTACHMENT_MODULE } from "../../../modules/attachment";
import { Type, Language } from "../../../modules/attachment/types";
import AttachmentModuleService from "src/modules/attachment/service";

export type StepInput = {
   name: string;
   file_name: string;
   type: Type;
   language: Language;
};

export const createAttachmentsStep = createStep(
   "create-attachments",
   async ({ name, file_name, type, language }: StepInput, { container }) => {
      const attachmentModuleService: AttachmentModuleService =
         container.resolve(ATTACHMENT_MODULE);

      const attachments = await attachmentModuleService.createAttachments({
         name,
         file_name,
         type,
         language,
      });

      return new StepResponse(
         {
            attachments: attachments,
         },
         {
            attachments: attachments,
         }
      );
   },
   async ({ attachments }, { container }) => {
      const attachmentModuleService: AttachmentModuleService =
         container.resolve(ATTACHMENT_MODULE);

      await attachmentModuleService.deleteAttachments(attachments);
   }
);

export default createAttachmentsStep;
