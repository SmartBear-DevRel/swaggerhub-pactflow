# Tooling integration - SwaggerHub -> Pactflow

In this guide, you'll learn how to use Pactflow and [SwaggerHub](https://swaggerhub.com/) together, to add contract testing to your design first API development workflow.

## Benefits

Pactflow and SwaggerHub can be combined to increase the quality of your design-first API development workflow, and help navigate the complexity of microservice rollouts.

SwaggerHub is foundation of a repeatable process for API Development, providing a secure collaborative environment for your API design process:

1. It unifies teams around a single source of truth - **the OAS** - and enables standardisation across your services
1. Allows teams to work **independently**
2. **Unlocks automation** such as code-generation and mock services

Pactflow brings increased visibility into how consumers use your API, enabling:

1. API consumer and API producer development teams to work in independently and **safely**
2. **Prevent breaking changes** to your API and releasing an incompatible API consumer
3. A reduction in the need for **API versioning**, avoiding the need to create and maintain multiple versions of an API, and communicating the change to consumers.

Together, they allow faster feedback cycles from design through to development, test and release.

## _Pre-requisites:_

To use this feature, you will need:

* A [Pactflow](https://pactflow.io) account (create a [free account](https://pactflow.io/pricing/)).
* A [SwaggerHub](https://swaggerhub.com) account (create a [free account](https://try.smartbear.com/)).

## Integration Guide

### 1. Design your first API in SwaggerHub and Upload to Pactflow

Follow this [guide](https://support.smartbear.com/swaggerhub/docs/tutorials/getting-started.html) to create your first API in SwaggerHub.

Next steps: now that we have agreed on our design, we can get started on our implementation.

1. Create OpenAPI Document in SwaggerHub
   1. Select `Create New` -> `Create new API`
   2. Select `Owner`
   3. Select `Specification`: `OpenAPI 3.0.x`
   4. Select `Template`: `--None--`
   5. Select `Name`: `Enter the name of your API here`
   6. Select `Version`: `1.0.0`
   7. Select `Auto Mock API`: `off`
   8. Select `Create API`
2. Create a new repository in GitHub - [GitHub Docs](https://docs.github.com/en/get-started/quickstart/create-a-repo)
3. Create a Github Secret to store your Pactflow API token in.
   1. In Pactflow:
       1. Log in to your Pactflow account (`https://<your-subdomain>.pactflow.io`), and go to Settings > API Tokens - See [here](/#configuring-your-api-token) for the docs.
       2. Click the Copy button for the read/write CI token (make sure it's the read _write_ one, not the read only one).
   2. In Github:
       1. Open your Git project
       2. Click on the `Settings` tab.
       3. Select `Secrets` from the side menu.
       4. Click `New repository secret` (the button is to the right of the "Actions secrets" heading)
       5. Set the name of the secret to `PACT_BROKER_TOKEN`
       6. Paste in the Pactflow API token value you copied in the previous step.
4. Create a GitHub Actions workflow
   1. Select `Add File` -> `Create new file` in your GitHub Project
   2. Set the title to `.github/workflows/Consumer_Insight.yml`
   3. Paste the contents of `.github/workflows/Consumer_Insight.yml` file from this repository
   4. Set your application name `application_name: swaggerhub-pactflow-provider` to your required provider name. This will be used by your consumer to identify the relationship between consumer->provider so should be sensibly named
   5. Update `PACT_BROKER_BASE_URL` to the URL of your Pactflow account
      1. In Pactflow:
          1. Go to Settings > API Tokens.
          2. Click the `COPY PACTFLOW BASE URL` button
      2. In Github:
          1. Open your project
             1. Open `.github/workflows/Consumer_Insight.yml`
             2. In the upper right corner of the file view, click 🖊️ to open the file editor.
             3. Update the value of `PACT_BROKER_BASE_URL` to the base URL of your own Pactflow account. You can easily get this by clicking the COPY PACTFLOW BASE URL button on the API Tokens page in Pactflow.
             4. Press the green `Commit changes` button
5. Sync OpenAPI -> SCM with Github Sync - <https://support.smartbear.com/swaggerhub/docs/integrations/github-sync.html>
   1. Open the API page in SwaggerHub.
   2. Click the API name, switch to the Integrations tab, and click Add New Integrations:
   3. Select GitHub Sync.
   4. In the subsequent dialog, specify the integration parameters:
      1. Name – Required. A display name for the integration. `gh-design-to-pactflow`
      2. GitHub Token – Required. The GitHub access token that SwaggerHub will use to access the target GitHub repository.
      3. The easiest way to get the token is to click Connect to GitHub and allow SwaggerHub to retrieve information from your GitHub account:
      4. Click Next in the GitHub Token edit box to continue. SwaggerHub will validate the token and then display other parameters.
      5. Repository Owner – Select you GitHub user or organization that owns the repository you created in the previous step
      6. Repository – Select the repository you setup earlier to push the code to
   5. Sync Method – Select the synchronization type: `Basic Sync`
   6. Branch – Required. The repository branch to push the code to. If this branch does not exist, it will be created based on the repository’s default branch. Choose `swaggerhub*`
   7. Generated API Code – Required. Select what you want to generate: `YAML(Resolved)`
   8. Output Folder - Select `oas`
   9. Output File - Select `swagger.yaml`
   10. Click `Create And Execute` -> `Done`.
6. View the GitHub Action run which will upload the Provider contract to Pactflow whenever it changes in SwaggerHub
   1. Version number = `<OpenAPI SemVer Version>->GitHub Commit Sha>-<design>` for traceability on change
   2. OpenAPI + Provider Test Report = Provider Contract Uploaded to Pactflow
   3. _Test Report is just OAS file, as the design will not be tested against an API mock or real implementation at this stage_
7. Pactflow compares OpenAPI against any registered consumers
8. Visibility into affected consumers visible via can-i-deploy or querying Pactflow API

:::note
We can actually begin to work on all of next major sections (3, 4 and 5) in parallel. In this guide, we will work through the steps sequentially however to simplify the explanation.
:::

### 2. Setup your API Mock Environment (Optional)

[SwaggerHub feature reference](https://support.smartbear.com/swaggerhub/docs/integrations/api-auto-mocking.html).

> The API Auto Mocking integration creates and maintains a semi-static mock of your API based on the responses and examples defined in your OpenAPI 3.0 or 2.0 definition. The mock is updated every time you save your API.
> The mock helps you test your API when designing it, that is, before it is implemented by developers. Also, the mock allows developers to start building client applications even before the API back end is ready.

![Design First - Provider Auto Mock workflow](https://docs.pactflow.io/assets/images/design-first-provider-automock-fb04d533dfe4205fa3750b6241a7a459.png)

You can use the `./.github/workflows/AutoMock.yml` GitHub actions workflow to setup an [Auto Mock](https://support.smartbear.com/swaggerhub/docs/integrations/api-auto-mocking.html) virtualisation server (also referred to as "VirtServer") from your OpenAPI as it changes in SwaggerHub. The AutoMock will be tested against your specification and the results uploaded to Pactflow.

You will need to setup the following to run this step.

1. Add your SwaggerHub API to GitHub Actions Secrets as `SWAGGERHUB_API_KEY`
2. Update `./.github/workflows/AutoMock.yml`
   1. `application_name`: set this to the same name as the previous step 1
   2. `PACT_BROKER_BASE_URL`: Your Pactflow broker URL
   3. `SWAGGERHUB_URL`: set to your own otherwise leave as <https://api.swaggerhub.com>
   4. `SWAGGERHUB_ORG`: Your SwaggerHub Organisation
   5. `SWAGGERHUB_API_NAME`: The name of the SwaggerHub API, setup in step 1

### 3. Test your Provider (Auto Mock)

For the general Provider test and release workflow, see our [Provider Side Bi-Directional Contract Testing Guide](https://docs.pactflow.io/docs/bi-directional-contract-testing/provider).

#### 3.1 Select a Testing Tool

Now that we have an agreed API definition and an implementation (in this case, a Mock of the provider), we can start to build out our test cases whilst the implementation is underway. We will be able to re-use these tests when the real provider is ready for testing.

Start by [choosing](http://localhost:3000/docs/bi-directional-contract-testing/provider#step-2-choose-an-api-testing-tool) an API testing tool. See our [examples](/docs/examples) for an idea of how to do this.

#### 3.2. Publish to Pactflow

[Publish](/docs/bi-directional-contract-testing/contracts/oas#publishing-the-provider-contract--results-to-pactflow) your OAS and the test results from your chosen API testing tool to Pactflow.

#### 3.3. Check `can-i-deploy` if it's safe to release

Check if it's safe to release to your chosen test or staging environment using the [`can-i-deploy`](https://docs.pact.io/pact_broker/can_i_deploy) command.

#### 3.4. Release

You can now deploy your Auto Mock. In this case, because the Auto Mock is a hosted service from SwaggerHub you don't actually need to perform a real deployment. However, we need to tell Pactflow that it has been deployed and will be used as the provider in a nominated environment.

Use the [record-deployment](/docs/bi-directional-contract-testing/deploying) command to record that you have done this with Pactflow.

### 4. Consumer Workflow

![Design First - Consumer workflow](https://docs.pactflow.io/assets/images/design-first-consumer-74d2c8d00d7310062b2fae7d1314cf23.png)

[Consumer Side Bi-Directional Contract Testing Guide](https://docs.pactflow.io/docs/bi-directional-contract-testing/consumer)

#### 4.1 Create our Consumer

We can start the build of our consumer. We have the choice to build from our own framework, or generate an [OAS compliant client SDK](https://support.smartbear.com/swaggerhub/docs/apis/generating-code/client-sdk.html).

We can optionally use the server mocks from step (2).

1. OAS compliant client SDK - See `./client-codegen`
   1. This needs to be modified slightly to be testable with the Pact framework, see `./client-codegen-pact`
      1. We added a unit-test Framework (Jest), Typescript and some other dependencies.
      2. We installed Pact-JS
      3. We updated `./client-codgen/api_test.spec.ts`, see `./client-codgen-pact/api_test.spec.ts`
   2. You can use the `./.github/workflows/ConsumerCodeGen.yml` GitHub actions workflow to run these tests
2. Build our own - See `./consumer_code`
   1. We create a simple API client in a test file, that will exercise one of the endpoints in the OAS in `consumer_code/pact.test.js`, running this test will generate a pact file.
   2. In the test, we create contract tests for two consumers, each of them will depend on different fields from the provider.
   3. You can use the `./.github/workflows/ConsumerCodeSample.yml` GitHub actions workflow to run these tests

#### 4.2 Test our Consumer

We can now test our consumer. This is the stage where we will capture the _consumer contract_. You can choose to use Pact, or convert your preferred mocks into a contract file.

See this [guide](http://localhost:3000/docs/bi-directional-contract-testing/consumer) and one of our BDCT [examples](/docs/examples) for an idea of how to do this.

#### 4.3. Publish to Pactflow

[Publish](https://docs.pact.io/getting_started/sharing_pacts) your contsumer contract to Pactflow. We suggest to use the standard [Pact CLI tools](https://docs.pact.io/implementation_guides/cli#distributions) for this step.

#### 4.4. Check `can-i-deploy` if it's safe to release

Check if it's safe to release to your chosen test or staging environment using the [`can-i-deploy`](https://docs.pact.io/pact_broker/can_i_deploy) command.

#### 4.5. Release

You can now deploy your consumer to the same environment as your Auto Mock.

Use the [record-deployment](/docs/bi-directional-contract-testing/deploying) command to record that you have done this with Pactflow.

We now have a consumer deployed to a test environment, that uses the Auto Mock. The consumer can't yet be deployed to production, because the provider has not yet been built and released.

### 5. (Real) Provider Workflow

![Design First - Provider workflow](https://docs.pactflow.io/assets/images/design-first-provider-e2659e16c3b39fa1ec6cd9d7fffae83a.png)

We can now repeat this process, but with the real provider which we can deploy to real environments.

For the general Provider test and release workflow, see our [Provider Side Bi-Directional Contract Testing Guide](https://docs.pactflow.io/docs/bi-directional-contract-testing/provider).

#### 5.1 Build the provider

We can start the build of our provider. We have the choice to build from our own framework, or generate [OAS compliant server stubs](https://support.smartbear.com/swaggerhub/docs/apis/generating-code/server-stub.html).

1. OAS compliant server stubs - See `./server-codegen`
   1. You can use the `./.github/workflows/ServerCodeGen.yml` GitHub actions workflow to run these tests

#### 5.2 Run the tests

Using the test framework created in 3.1, we can test our real implementation.

#### 5.3. Publish to Pactflow

[Publish](/docs/bi-directional-contract-testing/contracts/oas#publishing-the-provider-contract--results-to-pactflow) your OAS and the test results from your chosen API testing tool to Pactflow.

#### 5.4. Check `can-i-deploy` if it's safe to release

Check if it's safe to release to your chosen test or staging environment using the [`can-i-deploy`](https://docs.pact.io/pact_broker/can_i_deploy) command.

#### 5.5. Release

You can now deploy your real provider to the nominated test environment.

Use the [record-deployment](/docs/bi-directional-contract-testing/deploying) command to record that you have done this with Pactflow.

### Next steps

We can repeat steps 3-5 for the various environments and as we iterate on the design and implementation.
