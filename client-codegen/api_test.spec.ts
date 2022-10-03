/**
 * Product API
 * Pactflow Product API demo
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This file is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the file manually.
 */

import * as api from "./api"
import { Configuration } from "./configuration"

const config: Configuration = {}

describe("DefaultApi", () => {
  let instance: api.DefaultApi
  beforeEach(function() {
    instance = new api.DefaultApi(config)
  });

  test("createProduct", () => {
    const body: api.Product = {
  "value" : {
    "id" : "1234",
    "type" : "food",
    "price" : 42,
    "name" : "burger"
  }
}
    return expect(instance.createProduct(body, {})).resolves.toBe(null)
  })
  test("getAllProducts", () => {
    return expect(instance.getAllProducts({})).resolves.toBe(null)
  })
  test("getProductByID", () => {
    const id: string = "id_example"
    return expect(instance.getProductByID(id, {})).resolves.toBe(null)
  })
})

