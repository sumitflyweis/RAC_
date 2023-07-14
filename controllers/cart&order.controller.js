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

exports.addToCart = async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.user._id });
    if (!userData) {
      return res.status(404).send({ status: 404, message: "User not found" });
    } else {
      let findCart = await Cart.findOne({ userId: userData._id });
      if (!findCart) {
        findCart = new Cart({
          userId: userData._id,
          product: [],
          totalAmountProduct: 0,
          totalItemProduct: 0,
          service: [],
          totalAmountService: 0,
          totalItemService: 0,
          type: req.body.type,
        });
      }

      if (req.body.type === "service" && findCart.product.length === 0) {
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

        await findCart.save();

        return res.status(200).json({
          status: 200,
          message: "Service added to cart successfully.",
          data: findCart,
        });
      }

      if (req.body.type === "product" && findCart.service.length === 0) {
        const findProduct = await Product.findById(req.body.Id);
        if (!findProduct) {
          return res
            .status(404)
            .send({ status: 404, message: "Product not found" });
        }

        const existingProduct = findCart.product.find(
          (product) => product.productId.toString() === req.body.Id
        );

        if (existingProduct) {
          existingProduct.quantity += req.body.quantity;
          existingProduct.total =
            existingProduct.productPrice * existingProduct.quantity;
        } else {
          const total = findProduct.price * req.body.quantity;
          const newProduct = {
            productId: findProduct._id,
            vendorId: findProduct.vendorId,
            productPrice: findProduct.price,
            productType: findProduct.productType,
            quantity: req.body.quantity,
            total: total,
            categoryId: findProduct.categoryId,
            subCategoryId: findProduct.subCategoryId,
            subsubCategoryId: findProduct.subsubCategoryId,
            cGst: req.body.cGst,
            sGst: req.body.sGst,
          };
          findCart.product.push(newProduct);
        }

        findCart.totalAmountProduct = findCart.product.reduce(
          (total, product) => total + product.total,
          0
        );
        findCart.totalItemProduct = findCart.product.length;

        await findCart.save();

        return res.status(200).json({
          status: 200,
          message: "Product added to cart successfully.",
          data: findCart,
        });
      }

      return res.status(200).send({
        status: 200,
        message: "Please empty your cart before adding a different item.",
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: 500, message: "Server error" + error.message });
  }
};

// API endpoint to remove a product from the cart

exports.deletesingleProductAndService = async (req, res) => {
  try {
    let cart = [];
    const productId = req.params.productId;

    // Find the index of the product in the cart
    const index = cart.findIndex((item) => item.id === productId);

    if (index !== -1) {
      // Remove the product from the cart
      cart.splice(index, 1)
      res.status(200).json({ message: "Product removed from cart." });
    } else {
      res.status(404).json({ message: "Product not found in cart." });
    }
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred");
  }
};

exports.emptyCart = async (req, res) => {
  try {
    console.log("hi");
    const cart = await Cart.findById({ _id: req.params.id });

    if (!cart) {
      throw new Error("Cart not found");
    }

    if (cart.product.length > 0) {
      cart.product = [];
    }

    if (cart.service.length > 0) {
      cart.service = [];
    }

    await cart.save();
    return res
      .status(200)
      .json({ status: 200, message: "Cart emptied successfully" });
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred");
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
    console.log(req.user._id);
    let findOrder = await orderModel.find({
      userId: req.user._id,
      orderStatus: "unconfirmed",
    });
    console.log(findOrder);
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
                total: findCart.total,
                paidAmount: findCart.paidAmount,
                totalItem: findCart.totalItem,
              };
              await userOrder.create(obj1);
            }
          }
        }
        for (let i = 0; i < findCart.service.length; i++) {
          let obj = {
            orderId: orderId,
            userId: findCart.userId,
            vendorId: findCart.service[i].vendorId,
            categoryId: findCart.service[i].categoryId,
            subCategoryId: findCart.service[i].subCategoryId,
            subsubCategoryId: findCart.service[i].subsubCategoryId,
            serviceId: findCart.service[i].serviceId,
            servicePrice: findCart.service[i].servicePrice,
            cGst: findCart.service[i].cGst,
            sGst: findCart.service[i].sGst,
            quantity: findCart.service[i].quantity,
            total: findCart.service[i].total,
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
        res.status(200).json({
          status: 200,
          message: "Order create successfully.",
          data: findUserOrder,
        });
      }
    } else {
      let findCart = await Cart.findOne({ userId: req.user._id });
      console.log("hello");
      console.log(findCart);
      if (findCart) {
        let orderId = await reffralCode();
        for (let i = 0; i < findCart.product.length; i++) {
          let obj = {
            orderId: orderId,
            userId: findCart.userId,
            vendorId: findCart.product[i].vendorId,
            category: findCart.product[i].category,
            productId: findCart.product[i].productId,
            // discountId : findCart.product[i].discountId,
            productPrice: findCart.product[i].productPrice,
            quantity: findCart.product[i].quantity,
            total: findCart.product[i].total,
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
                total: findCart.total,
                paidAmount: findCart.paidAmount,
                totalItem: findCart.totalItem,
              };
              await userOrder.create(obj1);
            }
          }
        }
        for (let i = 0; i < findCart.service.length; i++) {
          let obj = {
            orderId: orderId,
            userId: findCart.userId,
            vendorId: findCart.service[i].vendorId,
            categoryId: findCart.service[i].categoryId,
            subCategoryId: findCart.service[i].subCategoryId,
            subsubCategoryId: findCart.service[i].subsubCategoryId,
            serviceId: findCart.service[i].serviceId,
            servicePrice: findCart.service[i].servicePrice,
            cGst: findCart.service[i].cGst,
            sGst: findCart.service[i].sGst,
            quantity: findCart.service[i].quantity,
            total: findCart.service[i].total,
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
        res.status(200).json({
          status: 200,
          message: "Order created successfully.",
          data: findUserOrder,
        });
      }
    }
  } catch (error) {
    res.status(501).send({ status: 501, message: "Server error.", data: {} });
  }
};

exports.placeOrder = async (req, res) => {
  try {
    let findUserOrder = await userOrder.findOne({
      orderId: req.params.orderId,
    });

    if (findUserOrder) {
      if (req.body.paymentStatus == "paid") {
        let updatedUserOrder = await userOrder.findByIdAndUpdate(
          { _id: findUserOrder._id },
          { $set: { orderStatus: "confirmed", paymentStatus: "paid" } },
          { new: true }
        );

        if (updatedUserOrder) {
          for (let i = 0; i < updatedUserOrder.Orders.length; i++) {
            let updatedOrder = await orderModel.findByIdAndUpdate(
              { _id: updatedUserOrder.Orders[i]._id },
              { $set: { orderStatus: "confirmed", paymentStatus: "paid" } },
              { new: true }
            );
          }

          res.status(200).json({
            message: "Payment success.",
            status: 200,
            data: updatedUserOrder,
          });
        }
      } else if (req.body.paymentStatus == "failed") {
        res.status(201).json({
          message: "Payment failed.",
          status: 201,
          orderId: req.params.orderId,
        });
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
        res.status(200).json({
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

exports.updateStatus = async (req, res, next) => {
  try {
    const orders = await orderModel.findOne({ _id: req.params.id });
    if (!orders) {
      return res
        .status(404)
        .json({ status: 404, message: "Orders not found", data: {} });
    }
    let update = await orderModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        acceptOrRejected: req.body.acceptOrRejected,
      },
      { new: true }
    );
    if (update) {
      res.status(200).send({
        status: 200,
        message: "Status updated successfully.",
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

exports.updateStartTime = async (req, res, next) => {
  try {
    const orders = await orderModel.findOne({ _id: req.params.id });
    if (!orders) {
      return res
        .status(404)
        .json({ status: 404, message: "Orders not found", data: {} });
    }
    const otp = newOTP.generate(4, {
      alphabets: false,
      upperCase: false,
      specialChar: false,
    });
    const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);
    const accountVerification = false;

    let update = await orderModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        startTime: req.body.startTime,
        otp: otp,
        otpExpiration: otpExpiration,
        accountVerification: accountVerification,
      },
      { new: true }
    );
    let obj = {
      id: update._id,
      otp: update.otp,
      startTime: req.body.startTime,
    };
    res.status(200).send({ status: 200, message: "OTP", data: obj });
    if (update) {
      res.status(200).send({
        status: 200,
        message: "otp send successfully.",
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

exports.updateEndTime = async (req, res, next) => {
  try {
    const orders = await orderModel.findOne({ _id: req.params.id });
    if (!orders) {
      return res
        .status(404)
        .json({ status: 404, message: "Orders not found", data: {} });
    }
    const otp = newOTP.generate(4, {
      alphabets: false,
      upperCase: false,
      specialChar: false,
    });
    const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);
    const accountVerification = false;

    let update = await orderModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        endTime: req.body.endTime,
        otp: otp,
        otpExpiration: otpExpiration,
        accountVerification: accountVerification,
      },
      { new: true }
    );
    let obj = {
      id: update._id,
      otp: update.otp,
      endTime: req.body.endTime,
    };
    return res.status(200).send({ status: 200, message: "OTP", data: obj });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ status: 500, message: "Server error" + error.message });
  }
};

exports.verifyOtpOfPartner = async (req, res) => {
  try {
    const { otp } = req.body;
    const user = await orderModel.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }
    if (user.otp !== otp || user.otpExpiration < Date.now()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    const updated = await orderModel.findByIdAndUpdate(
      { _id: user._id },
      { accountVerification: true },
      { new: true }
    );
    // const accessToken = jwt.sign({ id: user._id }, authConfig.secret, {
    //   expiresIn: authConfig.accessTokenTime,
    // });
    let obj = {
      id: updated._id,
      otp: updated.otp,
      // phone: updated.phone,
      // accessToken: accessToken,
    };
    return res
      .status(200)
      .send({ status: 200, message: "logged in successfully", data: obj });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .send({ error: "internal server error" + err.message });
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
      .populate("vendorId");
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
