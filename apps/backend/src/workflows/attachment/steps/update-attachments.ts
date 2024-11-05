import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { AttachmentDTO } from "../../../modules/attachment/types";
import { ATTACHMENT_MODULE } from "../../../modules/attachment";

export const updateAttachmentsStep = createStep(
  "update-attachments",
  async (input: ModuleUpdateAttachment, { container }) => {
    const attachmentModule =
      container.resolve<IAttachmentModuleService>(ATTACHMENT_MODULE);

    const [previousData] = await attachmentModule.listAttachments({
      id: input.id,
    });

    const updatedAttachments = await attachmentModule.updateAttachments(input);

    return new StepResponse(updatedAttachments, previousData);
  },
  async (previousData: ModuleUpdateAttachment, { container }) => {
    const attachmentModule =
      container.resolve<IAttachmentModuleService>(ATTACHMENT_MODULE);

    await attachmentModule.updateAttachments(previousData);
  }
);
