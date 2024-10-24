import { model } from "@medusajs/framework/utils"

const document = model.define("document", {
  id: model.id().primaryKey(),
  name: model.text(),
})

export default document