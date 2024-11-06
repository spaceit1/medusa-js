import { Module } from "@medusajs/framework/utils";
import AttachmentModuleService from "./service";

export const ATTACHMENT_MODULE = "attachmentModuleService";

export default Module(ATTACHMENT_MODULE, {
   service: AttachmentModuleService,
});
