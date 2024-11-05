import AttachmentModuleService from "./service";
import { Module } from "@medusajs/framework/utils";

export const ATTACHMENT_MODULE = "AttachmentModuleService";

export default Module(ATTACHMENT_MODULE, {
   service: AttachmentModuleService,
});
