const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const { MongoClient } = require("mongodb");

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

(async () => {
  await client.connect();
})();
const db = client.db("products");

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/products",  function (req, res, next) {
  res.json({ error: "Product type not specified" });
});

app.get("/products/:product_type",async function (req, res, next) {
  const productType = req.params.product_type;
  const collection = db.collection(productType);
  const findResult = await collection.find({}).toArray();

  res.json({ products: findResult });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
