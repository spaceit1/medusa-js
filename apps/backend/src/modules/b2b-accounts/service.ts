import { MedusaService } from "@medusajs/framework/utils"
import B2BAccount from "./models/b2b-account"

class B2BAccountService extends MedusaService({
  B2BAccount,
}){
}

export default B2BAccountService
