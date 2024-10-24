import DocumentModuleService from "./service"
import { Module } from "@medusajs/framework/utils"

export const DOCUMENT_MODULE = "documentModuleService"

export default Module(DOCUMENT_MODULE, {
  service: DocumentModuleService,
})