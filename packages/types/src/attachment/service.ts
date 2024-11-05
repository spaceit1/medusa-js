import {
   BaseFilterable,
   Context,
   FindConfig,
   IModuleService,
   RestoreReturn,
} from "@medusajs/types";
import {
   ModuleAttachment,
   ModuleCreateAttachment,
   ModuleUpdateAttachment,
   ModuleCreateAttachmentToProduct,
   ModuleUpdateAttachmentToProduct,
   ModuleAttachmentToProduct,
} from "./module";

export interface ModuleAttachmentFilters
   extends BaseFilterable<ModuleAttachmentFilters> {
   q?: string;
   id?: string | string[];
   product_id?: string | string[];
   language?: string | string[];
   document_type?: string | string[];
}

export interface ModuleAttachmentToProductFilters
   extends BaseFilterable<ModuleAttachmentToProductFilters> {
   id?: string | string[];
   attachment_id?: string | string[];
   product_id?: string | string[];
}

/**
 * The main service interface for the Attachment Module.
 */
export interface IAttachmentModuleService extends IModuleService {
   /* Entity: Attachments */
   createAttachment(
      data: ModuleCreateAttachment,
      sharedContext?: Context
   ): Promise<ModuleAttachment>;

   updateAttachment(
      data: ModuleUpdateAttachment,
      sharedContext?: Context
   ): Promise<ModuleAttachment>;

   listAttachments(
      filters?: ModuleAttachmentFilters,
      config?: FindConfig<ModuleAttachment>,
      sharedContext?: Context
   ): Promise<ModuleAttachment[]>;

   retrieveAttachment(
      id: string,
      config?: FindConfig<ModuleAttachment>,
      sharedContext?: Context
   ): Promise<ModuleAttachment>;

   deleteAttachments(ids: string[], sharedContext?: Context): Promise<void>;

   softDeleteAttachments(ids: string[], sharedContext?: Context): Promise<void>;

   restoreAttachments<TReturnableLinkableKeys extends string = string>(
      ids: string[],
      config?: RestoreReturn<TReturnableLinkableKeys>,
      sharedContext?: Context
   ): Promise<Record<TReturnableLinkableKeys, string[]> | void>;

   /* Entity: AttachmentToProduct */
   createAttachmentToProduct(
      data: ModuleCreateAttachmentToProduct,
      sharedContext?: Context
   ): Promise<ModuleAttachmentToProduct>;

   updateAttachmentToProduct(
      data: ModuleUpdateAttachmentToProduct,
      sharedContext?: Context
   ): Promise<ModuleAttachmentToProduct>;

   listAttachmentToProduct(
      filters?: ModuleAttachmentToProductFilters,
      config?: FindConfig<ModuleAttachmentToProduct>,
      sharedContext?: Context
   ): Promise<ModuleAttachmentToProduct[]>;

   deleteAttachmentToProduct(
      ids: string[],
      sharedContext?: Context
   ): Promise<void>;

   /* Product-specific methods */
   listAttachmentsByProduct(
      productId: string,
      config?: FindConfig<ModuleAttachment>,
      sharedContext?: Context
   ): Promise<ModuleAttachment[]>;
}
