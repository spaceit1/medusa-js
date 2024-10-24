import { MedusaService } from "@medusajs/framework/utils"
import Document from "./models/document"

class DocumentModuleService extends MedusaService({
  Document,
}){
}

export default DocumentModuleService