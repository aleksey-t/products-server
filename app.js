const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

(async () => {
  await client.connect();
})();
const db = client.db("products");

app.use(cors());
app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/products", function (req, res, next) {
  res.json({ error: "Product type not specified" });
});

app.get("/products/:product_type", async function (req, res, next) {
  const productType = req.params.product_type;
  const collection = db.collection(productType);
  const findResult = await collection.find({}).toArray();

  res.json({ products: findResult });
});

app.get("/cart", async function (req, res, next) {
  const collection = db.collection("cart");
  const result = await collection.find({}).toArray();
  res.json({ products: result });
});

app.post("/cart", async function (req, res, next) {
  const { title, price, description } = req.body;
  const collection = db.collection("cart");
  const product = await collection.insertOne({
    title,
    price,
    description,
  });

  res.json({ product: product });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
