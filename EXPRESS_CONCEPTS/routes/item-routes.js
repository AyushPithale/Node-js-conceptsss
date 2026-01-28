const express = require("express");
const router = express.Router();
const { asyncHandler, APIError } = require("../middleware/errorHandler");

const ITEMS = [
  {
    id: 1,
    name: "Item 1",
    price: 100,
  },
  {
    id: 2,
    name: "Item 2",
    price: 200,
  },
  {
    id: 3,
    name: "Item 3",
    price: 300,
  },
];

router.get(
  "/items",
  asyncHandler(async (req, res) => {
    res.json(ITEMS);
  }),
);

router.post(
  "/items",
  asyncHandler(async (req, res) => {
    const { name, price } = req.body;

    if (!name || !price) {
      throw new APIError("Name and price are required", 400);
    }

    const newItem = {
      name,
      price,
      id: ITEMS.length + 1,
    };

    ITEMS.push(newItem);
    res.status(201).json(newItem);
  }),
);

module.exports = router;
