const Wallet = require("../models/wallet");
const userSchema = require("../models/user.model");


exports.addandremoveMoney = async (req, res) => {
  if (req.body.type === "add") {
    const wallet = await userSchema.findOne({ _id: req.params.user });

    if (wallet == null) {
      return res.status(400).json({
        message: "User is Not Created ",
      });
    } else {
      wallet.wallet = parseInt(wallet.wallet) + parseInt(req.body.balance);

      const user1 = await userSchema.findByIdAndUpdate(
        { _id: wallet._id },
        { wallet: wallet.wallet },
        { new: true }
      );

      return res.status(200).json({
        status: "success",
        data: user1,
      });
    }
  }

  if (req.body.type === "remove") {
    const wallet = await userSchema.findOne({ _id: req.params.user });

    if (parseInt(wallet.wallet) < parseInt(req.body.balance)) {
      return res.status(400).json({ msg: "insufficient balance" });
    } else {
      wallet.wallet = parseInt(wallet.wallet) - parseInt(req.body.balance);

      const user1 = await userSchema.findByIdAndUpdate(
        { _id: wallet._id },
        { wallet: wallet.wallet },
        { new: true }
      );

      return res.status(200).json({
        status: "success",
        data: user1,
      });
    }
  }
};




exports.addandremoveLead = async (req, res) => {
  if (req.body.type === "add") {
    const lead = await userSchema.findOne({ _id: req.params.user });

    if (lead == null) {
      return res.status(400).json({
        message: "User is Not Created ",
      });
    } else {
      lead.lead = parseInt(lead.lead) + parseInt(req.body.lead);

      const user1 = await userSchema.findByIdAndUpdate(
        { _id: lead._id },
        { lead: lead.lead },
        { new: true }
      );

      return res.status(200).json({
        status: "success",
        data: user1,
      });
    }
  }

  if (req.body.type === "remove") {
    const lead = await userSchema.findOne({ _id: req.params.user });

    if (parseInt(lead.lead) < parseInt(req.body.lead)) {
      return res.status(400).json({ msg: "insufficient lead" });
    } else {
      lead.lead = parseInt(lead.lead) - parseInt(req.body.lead);

      const user1 = await userSchema.findByIdAndUpdate(
        { _id: lead._id },
        { lead: lead.lead },
        { new: true }
      );

      return res.status(200).json({
        status: "success",
        data: user1,
      });
    }
  }
}
