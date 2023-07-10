const express = require("express");
const router = express.Router();
const auth = require("../controllers/cart&order.controller");
const { verifyToken, authorizeRoles } = require("../middlewares/authJwt");

router.post("/api/v1/order/checkout", verifyToken, auth.checkout);
router.post("/api/v1/order/placeOrder/:orderId", /*verifyToken,*/ auth.placeOrder);

router.post("/emptyCart/:id", auth.emptyCart);
router.get("/api/v1/order/allOrders", verifyToken, auth.getAllOrders);
router.get("/api/v1/order/Orders", verifyToken, auth.getOrders);
router.get("/api/v1/order/viewOrder/:id", verifyToken, auth.getOrderbyId);
router.put("/api/v1/order/cancelReturnOrder/:id"/*, verifyToken*/, auth.cancelReturnOrder)
router.put("/api/v1/order/updateStatus/:id"/*, verifyToken*/, auth.updateStatus)
router.put("/api/v1/order/updateStartTime/:id"/*, verifyToken*/, auth.updateStartTime)
router.post("/verifyOtpOfPartner/:id", auth.verifyOtpOfPartner);
router.put("/api/v1/order/updateEndTime/:id"/*, verifyToken*/, auth.updateEndTime)
// app.get("/api/v1/order/getcancelReturnOrder", [authJwt.verifyToken], auth.getcancelReturnOrder);
// app.get("/api/v1/user/allTransactionUser", [authJwt.verifyToken], auth.allTransactionUser);
// app.get("/api/v1/user/allcreditTransactionUser", [authJwt.verifyToken], auth.allcreditTransactionUser);
// app.get("/api/v1/user/allDebitTransactionUser", [authJwt.verifyToken], auth.allDebitTransactionUser);

////////////////////////////////////////////////
router.post("/addToCart", verifyToken, auth.addToCart);
router.get("/getCart", verifyToken, auth.getCart);

module.exports = router;
