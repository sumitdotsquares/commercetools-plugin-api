# CommerceTools and Super Payment Extension

The application provides a basic e-commerce site integrated with CommerceTools and Super Payment. This is pulling a product catalog directly from Commercetools and taking advantage of Commercetools’s cart API when a user adds a new item to a cart.

When a user chooses to checkout the e-commerce site will create both a Super Payment intent and Commercetools Order using the details from the cart, the PaymentIntent will include the Commercetools CartID and OrderID as metadata. The user can now be presented with either Super Payment Elements or Super Payment Checkout to complete the transaction. A Super Payment Webhook will send succeeded or payment_failed to the e-commerce site. The e-commerce site will then process the event and update the Commercetools order status accordingly, getting the order_id from the PaymentIntent’s metadata.


## Installation

```bash
npm install
```

## Running Locally

Then to start the app, run the following from the _root_ directory:

```bash
npm run build
npm start
```

## Update .env with

When running locally copy `/.env-sample` to `/.env` update with your details

```bash
cp .env-sample .env
```

| Variable                 | Description               | Example                                         |
| ------------------------ | ------------------------- | ----------------------------------------------- |
| SUPAR_API_URL     | Super Payment API URL         | https://api.staging.superpayments.com/v2  |
| SUPAR_API_KEY     | Super Payment API Key         | **\***                                    |
| SUPAR_API_CONFIRMATION     | Super Payment confirmation Key   | **\***                        |
| CT_PORT           | Port to run the server    | 8081                                            |
| CT_BASE_URL       | Base URL of the server    | http://localhost:8081                           |
| CT_PROJECT_KEY | CommerceTools Project Key | **\***                                          |
| CT_CLIENT_ID   | CommerceTools Client ID   | **\***                                          |
| CT_SECRET      | CommerceTools Secret Key  | **\***                                          |
| CT_API_URL     | CommerceTools API URL     | https://api.europe-west1.gcp.commercetools.com  |
| CT_AUTH_URL    | CommerceTools Auth URL    | https://auth.europe-west1.gcp.commercetools.com |

# Webhooks

This example used webhooks to handel payment's asynchronously, an Super Payment webhook will be configured when starting the sever which will use the `CT_BASE_URL` configured in the .env file.

## Webhooks Details [OPTIONAL]

Super Payment register your webhook endpoint, provide the publicly accessible HTTPS URL to your webhook endpoint, and select the type of events you’re receiving in your endpoint. The URL format to register a webhook endpoint is:

```
https://<your-website>/super-payment/success
https://<your-website>/super-payment/refund
```

For example, if your domain is `https://mycompanysite.com` specify `https://mycompanysite.com/super-payment/success` as the endpoint URL.


# Commerce Tools

When creating a new API client you will need to set the following Scopes:

### Manage

- Customers
- Orders
- Payments
- Products

### View

- Categories
- Customers
- Orders
- Payments
- Products (all)
- Products (published)

### Manage My

- Orders
- Payments
- Profile
- Shopping Lists
