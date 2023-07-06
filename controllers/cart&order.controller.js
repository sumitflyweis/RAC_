const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");
var newOTP = require("otp-generators");
const User = require("../models/user.model");
const Category = require("../models/CategoryModel");
// const helpandSupport = require('../models/helpAndSupport');
const banner = require("../models/banner");
// const vendorDetails = require("../models/vendorDetails");
// const Product = require("../models/product.model");
const Product = require("../models/productsModel");
// const Discount = require("../models/discount.model");
// const transaction = require('../models/transactionModel');
// const Wishlist = require("../models/WishlistModel");
// const Address = require("../models/AddressModel");
// const userCard = require("../models/userCard");
// const staticContent = require('../models/staticContent');
// const Faq = require("../models/faq.Model");
// const Cart = require("../models/cartModel");
const Cart = require("../models/cart.model");
const orderModel = require("../models/orders/orderModel");
const userOrder = require("../models/orders/userOrder");
const cancelReturnOrder = require("../models/orders/cancelReturnOrder");
// const cartModel = require("../models/cart.model");
const seviceNameModel = require("../models/service");

// exports.addToCart = async (req, res) => {
//   try {
//     let userData = await User.findOne({ _id: req.user._id });
//     if (!userData) {
//       return res.status(404).send({ status: 404, message: "User not found" });
//     } else {
//       let findCart = await Cart.findOne({ userId: userData._id });
//       if (findCart) {
//         if (findCart.service.length == 0) {
//           let findService = await seviceNameModel.findById({
//             _id: req.body.serviceId,
//           });

//           let total = findService.price * req.body.quantity;
//           var obj = {
//             serviceId: findService._id,
//             vendorId: findService.vendorId,
//             servicePrice: findService.price,
//             quantity: req.body.quantity,
//             total: total,

//             categoryId: findService.categoryId,
//             subCategoryId: findService.subCategoryId,
//             subsubCategoryId: findService.subsubCategoryId,

//             cGst: req.body.cGst,
//             sGst: req.body.sGst,
//           };

//           const update = await Cart.findByIdAndUpdate(
//             { _id: findCart._id },
//             {
//               $push: { service: obj },
//               $set: {
//                 totalAmount: findCart.totalAmount + total,
//                 totalItem: findCart.totalItem + 1,
//               },
//             },
//             { new: true }
//           );
//           if (update) {
//             return res
//               .status(200)
//               .json({
//                 status: 200,
//                 message: "Service add to cart Successfully.",
//                 data: update,
//               });
//           }
//         } else {
//           for (let i = 0 ; i < findCart.service.length; i++) {
//             console.log(findCart.service[i])
//             let findService = await seviceNameModel.findById({
//               _id: req.body.serviceId,
//             });
//             if (findService) {
//               if (
//                 (findCart.service[i].serviceId.toString() == findService._id) ==
//                 true
//               ) {
//                 console.log("-----------------------------5555-")
//                 let obj = {
//                   serviceId: findService._id,
//                   servicePrice: findService.price,
//                   quantity: req.body.quantity,
//                   total: findService.price * req.body.quantity,
//                   vendorId: findService.vendorId,
//                   categoryId: findService.categoryId,
//                   subCategoryId: findService.subCategoryId,
//                   subsubCategoryId: findService.subsubCategoryId,
//                   cGst: req.body.cGst,
//                   sGst: req.body.sGst,
//                 };
//                 let update = await Cart.findByIdAndUpdate(
//                   { _id: findCart._id, "service.serviceId": req.body._id },
//                   { $set: { services: obj } },
//                   { new: true }
//                 );
//                 if (update) {
//                   let totals = 0;
//                   for (let j = 0; j < update.service.length; j++) {
//                     totals = totals + update.service[j].total;
//                   }
//                   let update1 = await Cart.findByIdAndUpdate(
//                     { _id: update._id },
//                     {
//                       $set: {
//                         totalAmount: totals,
//                         totalItem: update.service.length,
//                       },
//                     },
//                     { new: true }
//                   );
//                   return res
//                     .status(200)
//                     .json({
//                       status: 200,
//                       message: "Service add to cart Successfully.",
//                       data: update1,
//                     });
//                 }
//               } else {
//                 let total = findService.price * req.body.quantity;
//                 let obj = {
//                   serviceId: findService._id,
//                   servicePrice: findService.price,
//                   quantity: req.body.quantity,
//                   total: total,
//                   vendorId: findService.vendorId,
//                   categoryId: findService.categoryId,
//                   subCategoryId: findService.subCategoryId,
//                   subsubCategoryId: findService.subsubCategoryId,

//                   cGst: req.body.cGst,
//                   sGst: req.body.sGst,
//                 };
//                 let update = await Cart.findByIdAndUpdate(
//                   { _id: findCart._id },
//                   {
//                     $push: { service: obj },
//                     $set: {
//                       totalAmount: findCart.totalAmount + total,
//                       totalItem: findCart.totalItem + 1,
//                     },
//                   },
//                   { new: true }
//                 );
//                 if (update) {
//                   return res
//                     .status(200)
//                     .json({
//                       status: 200,
//                       message: "Service add to cart Successfully.",
//                       data: update,
//                     });
//                 }
//               }
//             } else {
//               return res
//                 .status(404)
//                 .send({ status: 404, message: "Service not found" });
//             }
//           }
//         }
//       } else {
//         let findService = await seviceNameModel.findById({
//           _id: req.body.serviceId,
//         });
//         if (findService) {
//           let obj = {
//             userId: userData._id,
//             service: [
//               {
//                 serviceId: findService._id,
//                 servicePrice: findService.price,
//                 quantity: req.body.quantity,
//                 total: findService.price * req.body.quantity,
//                 vendorId: findService.vendorId,
//                 categoryId: findService.categoryId,
//                 subCategoryId: findService.subCategoryId,
//                 subsubCategoryId: findService.subsubCategoryId,
//                 cGst: req.body.cGst,
//                 sGst: req.body.sGst,

//               },
//             ],
//             totalAmount: findService.price * req.body.quantity,
//             totalItem: 1,
//           };

//           const Data = await Cart.create(obj);
//           res
//             .status(200)
//             .json({
//               status: 200,
//               message: "Service successfully add to cart. ",
//               data: Data,
//             });
//         } else {
//           return res
//             .status(404)
//             .send({ status: 404, message: "Service not found" });
//         }
//       }
//     }
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .send({ status: 500, message: "Server error" + error.message });
//   }
// };

exports.addToCart = async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.user._id });
    if (!userData) {
      return res.status(404).send({ status: 404, message: "User not found" });
    }
    if (req.body.type == "service") {
      let findCart = await Cart.findOne({ userId: userData._id });
      if (!findCart) {
        findCart = new Cart({
          userId: userData._id,
          service: [],
          totalAmount: 0,
          totalItem: 0,
          type: req.body.type,
        });
      }

      const findService = await seviceNameModel.findById(req.body.Id);
      if (!findService) {
        return res
          .status(404)
          .send({ status: 404, message: "Service not found" });
      }

      const existingService = findCart.service.find(
        (service) => service.serviceId.toString() === req.body.Id
      );

      if (existingService) {
        existingService.quantity += req.body.quantity;
        existingService.total =
          existingService.servicePrice * existingService.quantity;
      } else {
        const total = findService.price * req.body.quantity;
        const newService = {
          serviceId: findService._id,
          vendorId: findService.vendorId,
          servicePrice: findService.price,
          quantity: req.body.quantity,
          total: total,
          categoryId: findService.categoryId,
          subCategoryId: findService.subCategoryId,
          subsubCategoryId: findService.subsubCategoryId,
          cGst: req.body.cGst,
          sGst: req.body.sGst,
        };
        findCart.service.push(newService);
      }

      findCart.totalAmountService = findCart.service.reduce(
        (total, service) => total + service.total,
        0
      );
      findCart.totalItemService = findCart.service.length;

      const update = await findCart.save();

      res.status(200).json({
        status: 200,
        message: "Service added to cart successfully.",
        data: update,
      });
    }

    if (req.body.type == "product") {
      let findCart = await Cart.findOne({ userId: userData._id });
      if (!findCart) {
        findCart = new Cart({
          userId: userData._id,
          product: [],
          totalAmount: 0,
          totalItem: 0,
          type: req.body.type,
        });
      }

      const findService = await Product.findById(req.body.Id);
      if (!findService) {
        return res
          .status(404)
          .send({ status: 404, message: "Service not found" });
      }

      const existingService = findCart.product.find(
        (product) => product.productId.toString() === req.body.Id
      );

      if (existingService) {
        existingService.quantity += req.body.quantity;
        existingService.total =
          existingService.productPrice * existingService.quantity;
      } else {
        const total = findService.price * req.body.quantity;
        const newService = {
          productId: findService._id,
          vendorId: findService.vendorId,
          productPrice: findService.price,
          productType: findService.productType,
          quantity: req.body.quantity,
          total: total,
          categoryId: findService.categoryId,
          subCategoryId: findService.subCategoryId,
          subsubCategoryId: findService.subsubCategoryId,
          cGst: req.body.cGst,
          sGst: req.body.sGst,
        };
        findCart.product.push(newService);
      }

      findCart.totalAmountProduct = findCart.product.reduce(
        (total, product) => total + product.total,
        0
      );
      findCart.totalItemProduct = findCart.product.length;

      const update = await findCart.save();

      res.status(200).json({
        status: 200,
        message: "Service added to cart successfully.",
        data: update,
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: 500, message: "Server error" + error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    let userData = await User.findOne({ _id: req.user._id, userType: "USER" });
    if (!userData) {
      return res
        .status(404)
        .json({ status: 404, message: "No data found", data: {} });
    } else {
      let findCart = await Cart.findOne({ userId: userData._id })
        .populate("userId")
        .populate("service.serviceId");
      if (!findCart) {
        return res
          .status(404)
          .json({ status: 404, message: "Cart is empty.", data: {} });
      } else {
        res
          .status(200)
          .json({ message: "cart data found.", status: 200, data: findCart });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(501).send({ status: 501, message: "server error.", data: {} });
  }
};

exports.checkout = async (req, res) => {
  try {
    
    let findOrder = await orderModel.find({
      user: req.user._id ,
      orderStatus : "unconfirmed",
    })
    console.log(findOrder)
    if (findOrder.length > 0) {
      for (let i = 0; i < findOrder.length; i++) {
        await userOrder.findOneAndDelete({ orderId: findOrder[i].orderId });
        let findOrders = await orderModel.find({
          orderId: findOrder[i].orderId,
        });
        if (findOrders.length > 0) {
          for (let i = 0; i < findOrders.length; i++) {
            await orderModel.findByIdAndDelete({ _id: findOrders[i]._id });
          }
        }
      }
      let findCart = await Cart.findOne({ userId: req.user._id });
      if (findCart) {
        let orderId = await reffralCode();
        for (let i = 0; i < findCart.product.length; i++) {
          let obj = {
            orderId: orderId,
            userId: findCart.userId,
            vendorId: findCart.product[i].vendorId,
            category: findCart.product[i].category,
            productId: findCart.product[i].productId,
            discountId: findCart.product[i].discountId,
            productPrice: findCart.product[i].productPrice,
            quantity: findCart.products[i].quantity,
            discountPrice: findCart.products[i].discountPrice,
            total: findCart.products[i].total,
            paidAmount: findCart.products[i].paidAmount,
            cGst: findCart.products[i].cGst,
            sGst: findCart.products[i].sGst,
            address: {
              street1: req.body.street1,
              street2: req.body.street2,
              city: req.body.city,
              state: req.body.state,
              country: req.body.country,
            },
          };
          const Data = await orderModel.create(obj);
          if (Data) {
            let findUserOrder = await userOrder.findOne({ orderId: orderId });
            if (findUserOrder) {
              await userOrder.findByIdAndUpdate(
                { _id: findUserOrder._id },
                { $push: { Orders: Data._id } },
                { new: true }
              );
            } else {
              let Orders = [];
              Orders.push(Data._id);
              let obj1 = {
                userId: findCart.userId,
                orderId: orderId,
                Orders: Orders,
                address: {
                  street1: req.body.street1,
                  street2: req.body.street2,
                  city: req.body.city,
                  state: req.body.state,
                  country: req.body.country,
                },
                discountPrice: findCart.discountPrice,
                total: findCart.total,
                paidAmount: findCart.paidAmount,
                totalItem: findCart.totalItem,
              };
              await userOrder.create(obj1);
            }
          }
        }
        let findUserOrder = await userOrder
          .findOne({ orderId: orderId })
          .populate("Orders");
        res
          .status(200)
          .json({
            status: 200,
            message: "Order create successfully. ",
            data: findUserOrder,
          });
      }
    } else {
      let findCart = await Cart.findOne({ userId: req.user._id });
      if (findCart) {
        let orderId = await reffralCode();
        for (let i = 0; i < findCart.product.length; i++) {
          let obj = {
            orderId : orderId,
            userId : findCart.userId,
            vendorId : findCart.product[i].vendorId,
            category : findCart.product[i].category,
            productId : findCart.product[i].productId,
            // discountId : findCart.product[i].discountId,
            productPrice : findCart.product[i].productPrice,
            quantity : findCart.product[i].quantity,
            total : findCart.product[i].total,
            paidAmount: findCart.product[i].paidAmount,
            cGst: findCart.product[i].cGst,
            sGst: findCart.product[i].sGst,
            address: {
              street1: req.body.street1,
              street2: req.body.street2,
              city: req.body.city,
              state: req.body.state,
              country: req.body.country,
            },
          };
          const Data = await orderModel.create(obj)
          if (Data) {
            let findUserOrder = await userOrder.findOne({ orderId : orderId });
            if (findUserOrder) {
              await userOrder.findByIdAndUpdate(
                { _id: findUserOrder._id },
                { $push: { Orders: Data._id } },
                { new: true }
              );
            } else {
              let Orders = [];
              Orders.push(Data._id);
              let obj1 = {
                userId: findCart.userId,
                orderId: orderId,
                Orders: Orders,
                address: {
                  street1: req.body.street1,
                  street2: req.body.street2,
                  city: req.body.city,
                  state: req.body.state,
                  country: req.body.country,
                },
                discountPrice: findCart.discountPrice,
                total: findCart.total,
                paidAmount: findCart.paidAmount,
                totalItem: findCart.totalItem,
              };
              await userOrder.create(obj1);
            }
          }
        }
        let findUserOrder = await userOrder
          .findOne({ orderId: orderId })
          .populate("Orders");
        res
          .status(200)
          .json({
            status: 200,
            message: "Order create successfully. ",
            data: findUserOrder,
          });
      }
    }
  } catch (error) {
    res.status(501).send({ status: 501, message: "server error.", data: {} });
  }
}

exports.placeOrder = async (req, res) => {
  try {
    let findUserOrder = await userOrder.findOne({
      orderId: req.params.orderId,
    });
    if (findUserOrder) {
      if (req.body.paymentStatus == "paid") {
        let update = await userOrder.findByIdAndUpdate(
          { _id: findUserOrder._id },
          { $set: { orderStatus: "confirmed", paymentStatus: "paid" } },
          { new: true }
        );
        if (update) {
          for (let i = 0; i < update.Orders.length; i++) {
            let update = await orderModel.findByIdAndUpdate(
              { _id: update.Orders[i]._id },
              { $set: { orderStatus: "confirmed", paymentStatus: "paid" } },
              { new: true }
            );
          }
          res
            .status(200)
            .json({ message: "Payment success.", status: 200, data: update });
        }
      }
      if (req.body.paymentStatus == "failed") {
        res
          .status(201)
          .json({ message: "Payment failed.", status: 201, orderId: orderId });
      }
    } else {
      return res.status(404).json({ message: "No data found", data: {} });
    }
  } catch (error) {
    res.status(501).send({ status: 501, message: "server error.", data: {} });
  }
};
exports.cancelReturnOrder = async (req, res, next) => {
  try {
    const orders = await orderModel.findById({ _id: req.params.id });
    if (!orders) {
      return res
        .status(404)
        .json({ status: 404, message: "Orders not found", data: {} });
    } else {
      let obj = {
        userId: orders.userId,
        vendorId: orders.vendorId,
        Orders: orders._id,
        reason: req.body.reason,
        orderStatus: req.body.orderStatus,
      };
      const data = await cancelReturnOrder.create(obj);
      let update = await orderModel
        .findByIdAndUpdate(
          { _id: orders._id },
          {
            $set: { returnOrder: data._id, returnStatus: req.body.orderStatus },
          },
          { new: true }
        )
        .populate("returnOrder");
      if (update) {
        res
          .status(200)
          .json({
            message: `Order ${req.body.orderStatus} Successfully.`,
            status: 200,
            data: update,
          });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(501).send({ status: 501, message: "server error.", data: {} });
  }
};
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await userOrder
      .find({ userId: req.user._id, orderStatus: "confirmed" })
      .populate("Orders");
    if (orders.length == 0) {
      return res
        .status(404)
        .json({ status: 404, message: "Orders not found", data: {} });
    }
    return res
      .status(200)
      .json({ status: 200, msg: "orders of user", data: orders });
  } catch (error) {
    console.log(error);
    res.status(501).send({ status: 501, message: "server error.", data: {} });
  }
};
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await orderModel.find({
      userId: req.user._id,
      orderStatus: "confirmed",
      returnStatus: "",
    });
    if (orders.length == 0) {
      return res
        .status(404)
        .json({ status: 404, message: "Orders not found", data: {} });
    }
    return res
      .status(200)
      .json({ status: 200, msg: "orders of user", data: orders });
  } catch (error) {
    console.log(error);
    res.status(501).send({ status: 501, message: "server error.", data: {} });
  }
};
exports.getcancelReturnOrder = async (req, res, next) => {
  try {
    const orders = await cancelReturnOrder
      .find({ userId: req.user._id })
      .populate("Orders");
    if (orders.length == 0) {
      return res
        .status(404)
        .json({ status: 404, message: "Orders not found", data: {} });
    }
    return res
      .status(200)
      .json({ status: 200, msg: "orders of user", data: orders });
  } catch (error) {
    console.log(error);
    res.status(501).send({ status: 501, message: "server error.", data: {} });
  }
};
exports.getOrderbyId = async (req, res, next) => {
  try {
    const orders = await orderModel
      .findById({ _id: req.params.id })
      .populate("vendorId userId category productId discountId returnOrder");
    if (!orders) {
      return res
        .status(404)
        .json({ status: 404, message: "Orders not found", data: {} });
    }
    return res
      .status(200)
      .json({ status: 200, msg: "orders of user", data: orders });
  } catch (error) {
    console.log(error);
    res.status(501).send({ status: 501, message: "server error.", data: {} });
  }
};
exports.allTransactionUser = async (req, res) => {
  try {
    const data = await transaction
      .find({ user: req.user._id })
      .populate("user orderId");
    res.status(200).json({ data: data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.allcreditTransactionUser = async (req, res) => {
  try {
    const data = await transaction.find({ user: req.user._id, type: "Credit" });
    res.status(200).json({ data: data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.allDebitTransactionUser = async (req, res) => {
  try {
    const data = await transaction.find({ user: req.user._id, type: "Debit" });
    res.status(200).json({ data: data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const reffralCode = async () => {
  var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let OTP = "";
  for (let i = 0; i < 9; i++) {
    OTP += digits[Math.floor(Math.random() * 36)];
  }
  return OTP;
};
