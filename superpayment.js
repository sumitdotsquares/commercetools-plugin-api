var express = require("express");
var axios = require("axios");
var router = express.Router();

const SP_REFERER = process.env.SP_REFERER;
const SP_BASE_URL = process.env.SUPER_PAY_API_URL;
const SP_API_KEY = process.env.SUPER_PAY_CHECKOUT_API_KEY;

/**
 * 
 * @param input
  {
    "minorUnitAmount": 10000,
    "cart": {
        "id": "cart101",
        "items": [
            {
                "name": "Im a product",
                "quantity": 2,
                "minorUnitAmount": 10000,
                "url": "https:\/\/www.dev-site-2x6137.wixdev-sites.org\/product-page\/i-m-a-product-8"
            },
            {
                "name": "Amazing boots",
                "quantity": 3,
                "minorUnitAmount": 10000,
                "url": "https://www.merchant.com/product1.html"
            }
        ]
    },
    "page": "Checkout",
    "output": "both",
    "test": true
  }
 * @returns 
  {
      "cashbackOfferId": "3775570c-07ea-4c41-8e87-8afea97d83e5",
      "content": {
          "title": "<span data-super-title=\"data-super-title\">  Pay by bank app and get 2.5% off  </span>",
          "description": "<div data-super-description=\"data-super-description\" style=\" font-size: 1rem; display: flex; flex-direction: column; gap: 1.2rem; background-color: #ffffff; color: #1E2B29; border-radius: 10px; padding: 20px 13px; font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; line-height: 1.2rem; overflow: clip; \" > <div style=\"display: flex; gap: 0.8rem\"> <div style=\"margin-top: 0.2rem; height: 1rem; min-width: 1rem\"> <svg viewBox=\"0 0 14 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M12.3337 1L5.00033 8.33333L1.66699 5\" stroke=\"#F54900\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ></path> </svg> </div> <div>  <strong>Save:</strong> paying with your bank app saves DJ GREAVES LTD money, so they're giving you <strong>2.5% off</strong> the price.  </div> </div> <div style=\"display: flex; gap: 0.8rem\"> <div style=\"margin-top: 0.2rem; height: 1rem; min-width: 1rem\"> <svg viewBox=\"0 0 14 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M12.3337 1L5.00033 8.33333L1.66699 5\" stroke=\"#F54900\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ></path> </svg> </div> <div> <strong>Fast:</strong> confirm via your bank app in just seconds - no card required. </div> </div> <div style=\"display: flex; gap: 0.8rem\"> <div style=\"margin-top: 0.2rem; height: 1rem; min-width: 1rem\"> <svg viewBox=\"0 0 14 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M12.3337 1L5.00033 8.33333L1.66699 5\" stroke=\"#F54900\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ></path> </svg> </div> <div> <strong>Safe:</strong> simply confirm this payment with Face ID or fingerprint verification. </div> </div> <div style=\"width: 100%; display: flex; gap: 0.8rem\"> <div style=\"min-width: 1rem\"></div> <img style=\"width: 87%; max-width: 27rem; height: auto; padding: 0 !important;\" src=\"https://cdn.superpayments.com/payments/widget_bank_types_no_text@3x.svg\" alt=\"Monzo, HSBC, Santander, Barclays, NatWest, Halifax, Lloyds\" /> </div> <div style=\"width: 100%; display: flex; gap: 0.8rem\"> <div style=\"min-width: 1rem\"></div> <div>+ many more major banks</div> </div> </div>",
          "banner": "<div data-super-banner=\"data-super-banner\" style=\" width: 100% !important; height: 3.3rem !important; display: flex !important; flex-wrap: wrap !important; justify-content: center !important; align-items: center !important; color: #FFFFFF !important; background-color: #D64000 !important; font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; line-height: 1.2rem !important; z-index: 1000 !important; \" > <span style=\"white-space: nowrap !important;\">Pay with</span> <img style=\" max-height: 2.2rem !important; min-height: 2.2rem !important; min-width: 2rem !important; flex-shrink: 0 !important; margin: 0 !important; padding: 0 !important; transform: translateY(0.15rem); \" src=\"https://cdn.superpayments.com/payments/super-wordmark-sm-white.svg\" alt=\"Super Logo\" />  <span style=\"white-space: nowrap !important;\"> and get an additional 2.5% off</span>  </div>"
      },
      "calculation": {
          "amountAfterSavings": 9750,
          "grossAmount": 10000,
          "savingsAmount": 250,
          "savingsPercentage": 2.5
      }
  }
 */
async function getOffer(input) {
  var cartId = "dasd";
  var lineItem = [
    {
      name: "Im a product",
      quantity: 2,
      minorUnitAmount: 10000,
      url: "https://www.dev-site-2x6137.wixdev-sites.org/product-page/i-m-a-product-8",
    },
    {
      name: "Amazing boots",
      quantity: 3,
      minorUnitAmount: 10000,
      url: "https://www.merchant.com/product1.html",
    },
  ];

  var data = JSON.stringify({
    minorUnitAmount: 10000,
    cart: {
      id: cartId,
      items: lineItem,
    },
    page: "Checkout",
    output: "both",
    test: true,
  });

  var config = {
    method: "post",
    url: SP_BASE_URL + "/offers",
    headers: {
      "Content-Type": "application/json",
      Referer: SP_REFERER,
      "checkout-api-key": SP_API_KEY,
    },
    data: data,
  };

  const rsp = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return await rsp;
}

/**
 * 
 * @param {*} input 
 {
    "cashbackOfferId": "1fed4780-233f-4bc4-8a00-e40d95caa3c6",
    "successUrl": "https://www.merchant.com/success",
    "cancelUrl": "https://www.merchant.com/cancel",
    "failureUrl": "https://www.merchant.com/fail",
    "minorUnitAmount": 10000,
    "currency": "GBP",
    "externalReference": "order_id_123450"
  }
 * @returns 
  {
    "redirectUrl": "https://checkout.staging.superpayments.com/PaymentSummary/c85b7f0d-0e11-4e8c-be44-efcbe0b82373",
    "transactionId": "c85b7f0d-0e11-4e8c-be44-efcbe0b82373",
    "transactionReference": "CK8SFOZFGVEKJQ3P62"
  }
 */
async function getPaymentLink(input) {
  var data = JSON.stringify(input);

  var config = {
    method: "post",
    url: SP_BASE_URL + "/payments",
    headers: {
      "Content-Type": "application/json",
      Referer: SP_REFERER,
      "checkout-api-key": SP_API_KEY,
    },
    data: data,
  };

  const rsp = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return await rsp;
}

router.get("/offer", async function (req, res) {
  res.send(await getOffer(req.body));
});

router.get("/payment-link", async function (req, res) {
  res.send(await getPaymentLink(req.body));
});

//Routes will go here
module.exports = router;
