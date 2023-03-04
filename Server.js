import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import { dirname } from "path";
import cors from "cors";
import dotenv from "dotenv";

import commerceTools from "./CommerceToolsHelper.js";


const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "client/build")));
app.use("/confirm", express.static(path.join(__dirname, "client/build")));
app.use(cors());

dotenv.config();


const PORT = process.env.CT_PORT;
const BASE_URL = process.env.CT_BASE_URL;

/* ------ GET PRODUCTS ------ */
app.get("/products", async (req, res) => {
  const currency = req.params.currency;
  const ctProducts = await commerceTools.getProducts();
  res.send(ctProducts.results);
});

/* ------ GET CUSTOMER BY EMAIL ------ */
app.get("/customer/:email?", async (req, res) => {
  const customers = await commerceTools.getCustomerByEmail(req.params.email);
  if (req.params.email === undefined || customers.total === 0)
    res.send({
      id: "",
      name: "",
      address: "",
      city: "",
      country: "",
    });
  else {
    res.send({
      id: customers.results[0].id,
      name: `${customers.results[0].firstName} ${customers.results[0].lastName}`,
      addressId: customers.results[0].addresses[0].id,
      address: `${customers.results[0].addresses[0].streetName}`,
      city: customers.results[0].addresses[0].city,
      country: customers.results[0].addresses[0].country,
    });
  }
});

/* ------ GET CART------ */
app.get("/cart/:cartId?", async (req, res) => {
  res.send(await commerceTools.getCart(req.params.cartId));
});

/* ------ CREATE CART ------ */
app.post("/cart", async (req, res) => {
  res.send(await commerceTools.createCart());
});

/* ------ ADD CART LINE ITEM ------ */
app.post("/cart/line-item", async (req, res) => {
  const cartId = req.body.cartId;
  const productId = req.body.productId;
  const variantId = req.body.variantId;
  const version = req.body.version;
  res.send(
    await commerceTools.cartAddLineItem(cartId, productId, variantId, version)
  );
});

/* ------ ADD CUSTOMER TO CART------ */
app.post("/cart/customer", async (req, res) => {
  const cartId = req.body.cartId;
  const customerId = req.body.customerId;
  res.send(await commerceTools.cartAddCustomer(cartId, customerId));
});

/* ------ CREATE CUSTOMER ------ */
app.post("/customer", async (req, res) => {
  const payload = {
    email: req.body.email,
    name: req.body.name,
    address: {
      line1: req.body.address,
      city: req.body.city,
      country: req.body.country,
    },
  };
  payload.cartId = req.body.cartId;
  res.send(await commerceTools.createCustomer(payload));
});


app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`)
});