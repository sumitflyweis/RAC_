const express = require("express");
const walletRouter = express.Router();

const walletContrallers = require("../controllers/wallet");

walletRouter.post(
  "/addandremoveMoney/:user",
  walletContrallers.addandremoveMoney
);
walletRouter.post(
  "/addandremoveLead/:user",
  walletContrallers.addandremoveLead
);


module.exports = walletRouter;
