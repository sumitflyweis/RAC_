const Subsubcategory = require("../models/subsubcategory");

exports.createSubsubcategory = async (req, res) => {
  try {
    const { name, categoryId, subCategoryId, vendorId, status } = req.body;

    // Create a new subsubcategory instance
    const newSubsubcategory = new Subsubcategory({
      name,
      categoryId,
      subCategoryId,
      vendorId,
      status,
    });

    // Save the new subsubcategory to the database
    const createdSubsubcategory = await newSubsubcategory.save();

    res.status(201).json(createdSubsubcategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getSubsubcategoryById = async (req, res) => {
  try {
    const subsubcategory = await Subsubcategory.findById(req.params.id);

    if (!subsubcategory) {
      return res.status(404).json({ message: "Subsubcategory not found" });
    }

    res.status(200).json(subsubcategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateSubsubcategory = async (req, res) => {
  try {
    const subsubcategory = await Subsubcategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!subsubcategory) {
      return res.status(404).json({ message: "Subsubcategory not found" });
    }

    res.status(200).json(subsubcategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteSubsubcategory = async (req, res) => {
  try {
    const subsubcategory = await Subsubcategory.findByIdAndDelete(req.params.id);

    if (!subsubcategory) {
      return res.status(404).json({ message: "Subsubcategory not found" });
    }

    res.status(200).json({ message: "Subsubcategory deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
