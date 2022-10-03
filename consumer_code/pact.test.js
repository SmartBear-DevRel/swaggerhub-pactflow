const axios = require("axios");
const defaultBaseUrl = "http://your-api.example.com";
const api = (baseUrl = defaultBaseUrl) => ({
  getProducts: () =>
    axios.get(baseUrl + "/products").then((response) => response.data),
  /* other endpoints here */
});

const { PactV3, MatchersV3 } = require("@pact-foundation/pact");

const providerWithConsumerA = new PactV3({
  consumer: "swaggerhub-pactflow-consumer-a",
  provider: "swaggerhub-pactflow-provider",
});

const providerWithConsumerB = new PactV3({
  consumer: "swaggerhub-pactflow-consumer-b",
  provider: "swaggerhub-pactflow-provider",
});

const { eachLike } = MatchersV3;

describe("tests with Pact", () => {
  it("tests consumer a", () => {
    const expectedProduct = {
      id: "10",
      type: "CREDIT_CARD",
      name: "28 Degrees",
    };
    providerWithConsumerA
      .given("products exist")
      .uponReceiving("A request to get all products")
      .withRequest({
        method: "GET",
        path: "/products",
      })
      .willRespondWith({
        status: 200,
        body: eachLike(expectedProduct),
      });
    return providerWithConsumerA.executeTest((mockserver) => {
      const client = api(mockserver.url);
      return client.getProducts().then((health) => {
        expect(health).toEqual([expectedProduct]);
      });
    });
  });

  it("tests consumer b", () => {
    // const expectedProduct = {
    //   id: "10",
    //   type: "CREDIT_CARD",
    //   name: "28 Degrees",
    //   price: 30.0,
    // };

    // // Uncomment the below expectedProduct to see a failure
    const expectedProduct = {
      id: "10",
      type: "CREDIT_CARD",
      name: "28 Degrees",
      price: 30.0,
      newField: 22,
    };
    providerWithConsumerB
      .given("products exist")
      .uponReceiving("A request to get all products")
      .withRequest({
        method: "GET",
        path: "/products",
      })
      .willRespondWith({
        status: 200,
        body: eachLike(expectedProduct),
      });
    return providerWithConsumerB.executeTest((mockserver) => {
      const client = api(mockserver.url);
      return client.getProducts().then((health) => {
        expect(health).toEqual([expectedProduct]);
      });
    });
  });
});
