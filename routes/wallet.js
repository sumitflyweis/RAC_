const express = require("express");
const walletRouter = express.Router();

const walletContrallers = require("../controllers/wallet");

walletRouter.post(
  "/addandremoveMoney/:user",
  walletContrallers.addandremoveMoney
);

module.exports = walletRouter;
