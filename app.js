const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");

const products = require("./sampleData.json");

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/products", function (req, res, next) {
  res.json({ products: products });
});

app.get("/products/:product_type", function (req, res, next) {
  const productType = req.params.product_type;
  let data = [];

  if (productType) {
    switch (productType) {
      case "cakes":
        data = products["cakes"];
        break;
      case "street_food":
        data = products["street_food"];
        break;
      case "coffee_and_tea":
        data = products["coffee_and_tea"];
        break;
    }
  }

  res.json({ products: data || products });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
