const express = require("express");
const router = express.Router();
const auth = require("../controllers/cart&order.controller");
const { verifyToken, authorizeRoles } = require("../middlewares/authJwt");

router.post("/api/v1/order/checkout", verifyToken, auth.checkout);
router.post("/api/v1/order/placeOrder/:orderId", verifyToken, auth.placeOrder);
// app.get("/api/v1/order/allOrders", [authJwt.verifyToken], auth.getAllOrders);
// app.get("/api/v1/order/Orders", [authJwt.verifyToken], auth.getOrders);
// app.get("/api/v1/order/viewOrder/:id", [authJwt.verifyToken], auth.getOrderbyId);
// app.put("/api/v1/order/cancelReturnOrder/:id", [authJwt.verifyToken], auth.cancelReturnOrder);
// app.get("/api/v1/order/getcancelReturnOrder", [authJwt.verifyToken], auth.getcancelReturnOrder);
// app.get("/api/v1/user/allTransactionUser", [authJwt.verifyToken], auth.allTransactionUser);
// app.get("/api/v1/user/allcreditTransactionUser", [authJwt.verifyToken], auth.allcreditTransactionUser);
// app.get("/api/v1/user/allDebitTransactionUser", [authJwt.verifyToken], auth.allDebitTransactionUser);

////////////////////////////////////////////////
router.post("/addToCart", verifyToken, auth.addToCart);
router.get("/getCart", verifyToken, auth.getCart);

module.exports = router;
