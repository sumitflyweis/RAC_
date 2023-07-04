const seviceNameModel = require("../models/service");

exports.getSeviceById = async (req, res) => {
  try {
    const { id } = req.params;
    // const seviceName = await seviceNameModel.findById(id).populate("subsubCategoryId")

    const seviceName = await seviceNameModel.findById(id)
      // .populate({
      //   path: "vendorId subCategoryId categoryId",
      // })
      .populate({
        path: "subsubCategoryId",
        populate: {
          path: "vendorId subCategoryId categoryId",
        },
      });
    
    if (!seviceName) {
      return res.status(404).json({ error: "SeviceName not found" });
    }
    
    res.status(200).json({msg:seviceName});
  } catch (error) {
    console.error("Error retrieving SeviceName:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createSevice = async (req, res) => {
  try {
    const { name, categoryId, subCategoryId, subsubCategoryId, vendorId, status, price, count } = req.body;

    const seviceName = await seviceNameModel.create({
      name,
      categoryId,
      subCategoryId,
      subsubCategoryId,
      vendorId,
      status,
      price,
      count,
    });

    res.status(201).json(seviceName);
  } catch (error) {
    console.error("Error creating SeviceName:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllSevice = async (req, res) => {
  try {
    const seviceNames = await seviceNameModel.find()  .populate({
      path: "subsubCategoryId",
      populate: {
        path: "vendorId subCategoryId categoryId",
      },
    });
    if (!seviceNames) {
      return res.status(404).json({ error: "SeviceNames not found" });
    }

    res.status(200).json({msg:seviceNames});
  } catch (error) {
    console.error("Error retrieving SeviceNames:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateSevice = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, categoryId, subCategoryId, subsubCategoryId, vendorId, status, price, count } = req.body;

    const seviceName = await seviceNameModel.findByIdAndUpdate(id, {
      name,
      categoryId,
      subCategoryId,
      subsubCategoryId,
      vendorId,
      status,
      price,
      count,
    }, { new: true });

    if (!seviceName) {
      return res.status(404).json({ error: "SeviceName not found" });
    }

    res.status(200).json(seviceName);
  } catch (error) {
    console.error("Error updating SeviceName:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteSevice = async (req, res) => {
  try {
    const { id } = req.params;

    const seviceName = await seviceNameModel.findByIdAndDelete(id);

    if (!seviceName) {
      return res.status(404).json({ error: "SeviceName not found" });
    }

    res.status(200).json({ message: "SeviceName deleted successfully" });
  } catch (error) {
    console.error("Error deleting SeviceName:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

