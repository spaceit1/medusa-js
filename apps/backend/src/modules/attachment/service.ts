import { MedusaService } from "@medusajs/framework/utils";
import { Attachment, AttachmentToProduct } from "./models/attachment";

class AttachmentModuleService extends MedusaService({
   Attachment,
   AttachmentToProduct,
}) {}

export default AttachmentModuleService;
