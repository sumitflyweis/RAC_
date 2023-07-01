const Wallet = require("../models/wallet");
const userSchema = require("../models/user.model");

exports.addandremoveMoney = async (req, res) => {
  if ((req.body.type = "add")) {
    const wallet = await Wallet.findOne({ user: req.params.user });

    if (wallet == null) {
     return res.status(400).json({
        message: "Wallet is Not Created ",
      });
    } else {
      wallet.balance = parseInt(wallet.balance) + parseInt(req.body.balance);

      //console.log(wallet.balance)
      const w = await wallet.save();
      const user1 = await userSchema.findByIdAndUpdate(
        { _id: wallet.user },
        { wallet: wallet.balance },
        { new: true }
      );

     return res.status(200).json({
        status: "success",
        data: [w, user1],
      });
    }
  }
  if ((req.body.type = "remove")) {
    const wallet = await Wallet.findOne({ user: req.params.user });

    if (parseInt(wallet.balance) < parseInt(req.body.balance)) {
      return res.status(400).json({ msg: "insuffient balance" });
    } else {
      wallet.balance =
        parseInt(wallet.balance) - parseInt(req.body.balance);

      //console.log(wallet.balance);
      const w = await wallet.save();

      const user1 = await userSchema.findByIdAndUpdate(
        { _id: wallet.user },
        { wallet: wallet.balance },
        { new: true }
      );

    return  res.status(200).json({
        status: "success",
        data: [w, user1],
      });
    }
  }
};
