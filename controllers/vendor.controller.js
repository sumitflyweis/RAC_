const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");
var newOTP = require("otp-generators");
const User = require("../models/user.model");

exports.registrationVendor = async (req, res) => {
  try {
    const { phone } = req.body;
    const user = await User.findOne({ phone: phone, userType: "VENDOR" });
    if (!user) {
      req.body.otp = newOTP.generate(4, {
        alphabets: false,
        upperCase: false,
        specialChar: false,
      });
      req.body.otpExpiration = new Date(Date.now() + 5 * 60 * 1000);
      req.body.accountVerification = false;
      req.body.userType = "VENDOR";
      const userCreate = await User.create(req.body);
      let obj = {
        id: userCreate._id,
        otp: userCreate.otp,
        fullName: userCreate.fullName,
        phone: userCreate.phone,
        email: userCreate.email,
        pincode: userCreate.pincode,
        serviceArea: userCreate.serviceArea,
        serviceDistance: userCreate.serviceDistance,
        serviceName: userCreate.serviceName,
        //   uploadSelfie
        // pancard:
        // uploadPanCard:
        // aadharCard:
        // frontSide:
        // backSide:
      };
      res
        .status(200)
        .send({ status: 200, message: "Registered successfully ", data: obj });
    } else {
      return res.status(409).send({ status: 409, msg: "Already Exit" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.loginWithPhoneVendor = async (req, res) => {
  try {
    const { phone } = req.body;
    const user = await User.findOne({ phone: phone, userType: "VENDOR" });
    if (!user) {
      return res.status(400).send({ msg: "not found" });
    }
    const userObj = {};
    userObj.otp = newOTP.generate(4, {
      alphabets: false,
      upperCase: false,
      specialChar: false,
    });
    userObj.otpExpiration = new Date(Date.now() + 5 * 60 * 1000);
    userObj.accountVerification = false;
    const updated = await User.findOneAndUpdate(
      { phone: phone, userType: "VENDOR" },
      userObj,
      { new: true }
    );
    let obj = {
      id: updated._id,
      otp: updated.otp,
      phone: updated.phone,
      fullName: updated.fullName,
      email: updated.email,
    };
    res
      .status(200)
      .send({ status: 200, message: "logged in successfully", data: obj });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.verifyOtpVendor = async (req, res) => {
  try {
    const { otp } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }
    if (user.otp !== otp || user.otpExpiration < Date.now()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    const updated = await User.findByIdAndUpdate(
      { _id: user._id },
      { accountVerification: true },
      { new: true }
    );
    const accessToken = jwt.sign({ id: user._id }, authConfig.secret, {
      expiresIn: authConfig.accessTokenTime,
    });
    let obj = {
      id: updated._id,
      otp: updated.otp,
      phone: updated.phone,
      accessToken: accessToken,
    };
    res
      .status(200)
      .send({ status: 200, message: "logged in successfully", data: obj });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ error: "internal server error" + err.message });
  }
};

exports.getProfileVendor = async (req, res) => {
  try {
    const data = await User.findOne({ _id: req.user.id });
    if (data) {
      return res
        .status(200)
        .json({ status: 200, message: "get Profile", data: data });
    } else {
      return res
        .status(404)
        .json({ status: 404, message: "No data found", data: {} });
    }
  } catch (error) {
    console.log(error);
    res.status(501).send({ status: 501, message: "server error.", data: {} });
  }
};

exports.resendOTPVendor = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id, userType: "VENDOR" });
    if (!user) {
      return res.status(404).send({ status: 404, message: "User not found" });
    }
    const otp = newOTP.generate(4, {
      alphabets: false,
      upperCase: false,
      specialChar: false,
    });
    const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);
    const accountVerification = false;
    const updated = await User.findOneAndUpdate(
      { _id: user._id },
      { otp, otpExpiration, accountVerification },
      { new: true }
    );
    let obj = {
      id: updated._id,
      otp: updated.otp,
      phone: updated.phone,
    };
    res.status(200).send({ status: 200, message: "OTP resent", data: obj });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: 500, message: "Server error" + error.message });
  }
};

exports.updateLocationVendor = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
      return res.status(404).send({ status: 404, message: "User not found" });
    } else {
      if (req.body.currentLat || req.body.currentLong) {
        coordinates = [
          parseFloat(req.body.currentLat),
          parseFloat(req.body.currentLong),
        ];
        req.body.currentLocation = { type: "Point", coordinates };
      }
      let update = await User.findByIdAndUpdate(
        { _id: user._id },
        {
          $set: {
            currentLocation: req.body.currentLocation,
          },
        },
        { new: true }
      );
      if (update) {
        res.status(200).send({
          status: 200,
          message: "Location update successfully.",
          data: update,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: 500, message: "Server error" + error.message });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const findUser = await User.findById({ _id: req.params.id });
    if (findUser) {
      await User.deleteOne({ _id: findUser._id });
      return res.status(200).send({ message: "data deleted " });
    } else {
      return res.status(404).json({ msg: "user not found", user: {} });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: err.message });
  }
};

exports.updateFileAndDocumentVendor = async (req, res) => {
  try {
    // console.log("hi")
    let front = req.files["frontImage"];
    let back = req.files["backImage"];
    let pic = req.files["pic"];
    let panCard = req.files["panCard"];
    req.body.frontSide = front[0].path;
    req.body.backSide = back[0].path;
    req.body.uploadSelfie = pic[0].path;
    req.body.uploadPanCard = panCard[0].path;


    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          frontSide: req.body.frontSide,
          backSide: req.body.backSide,
          uploadSelfie: req.body.uploadSelfie,
          uploadPanCard: req.body.uploadPanCard,
          pancard: req.body.pancardNumber,
          aadharCard: req.body.aadharCardNumber,
          document: req.body.document,
        },
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ msg: "profile updated successfully", user: user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: 500, message: "Server error" + error.message });
  }
};
