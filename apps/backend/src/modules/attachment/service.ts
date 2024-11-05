import { MedusaService } from "@medusajs/framework/utils";
import { Attachment, AttachmentToProduct } from "./models/attachment";
import { CreateAttachmentData, AttachmentData } from "./types";

class AttachmentModuleService extends MedusaService({
   Attachment,
   AttachmentToProduct,
}) {
   async createAttachment(
      data: CreateAttachmentData | CreateAttachmentData[]
   ): Promise<AttachmentData[]> {
      const input = Array.isArray(data) ? data : [data];

      const attachments = await Promise.all(
         input.map(async (attachmentData) => {
            const attachment = await this.createAttachment({
               name: attachmentData.name,
               file_name: attachmentData.file_name,
               language: attachmentData.language,
               document_type: attachmentData.document_type,
               created_at: new Date(),
               updated_at: new Date(),
            });

            return attachment;
         })
      );

      return attachments;
   }

   // async attachToProduct(
   //    attachmentId: string,
   //    productId: string
   // ): Promise<AttachmentToProduct> {
   //    const attachmentToProduct =
   //       await this.attachmentToProductRepository.create({
   //          attachment_id: attachmentId,
   //          product_id: productId,
   //          created_at: new Date(),
   //          updated_at: new Date(),
   //       });

   //    return attachmentToProduct;
   // }

   // async getProductAttachments(productId: string): Promise<AttachmentData[]> {
   //    const attachments = await this.attachmentRepository
   //       .createQueryBuilder("attachment")
   //       .innerJoin(
   //          "attachment_to_product",
   //          "atp",
   //          "atp.attachment_id = attachment.id"
   //       )
   //       .where("atp.product_id = :productId", { productId })
   //       .getMany();

   //    return attachments;
   // }

   // async deleteAttachment(attachmentId: string): Promise<void> {
   //    // Soft delete the attachment
   //    await this.attachmentRepository.update(
   //       { id: attachmentId },
   //       {
   //          deleted_at: new Date(),
   //          updated_at: new Date(),
   //       }
   //    );
   // }
}

export default AttachmentModuleService;
