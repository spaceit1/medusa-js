import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { IAttachmentModuleService } from "@starter/types";
import { ATTACHMENT_MODULE } from "../../../modules/attachment";

export const deleteAttachmentsStep = createStep(
  "delete-attachments",
  async (id: string[], { container }) => {
    const attachmentModule =
      container.resolve<IAttachmentModuleService>(ATTACHMENT_MODULE);

    await attachmentModule.softDeleteAttachments(id);

    return new StepResponse(id, id);
  },
  async (attachmentId: string[], { container }) => {
    const attachmentModule =
      container.resolve<IAttachmentModuleService>(ATTACHMENT_MODULE);

    await attachmentModule.restoreAttachments(attachmentId);
  }
);
