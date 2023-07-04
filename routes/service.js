const express = require("express");
const router = express.Router();
const seviceNameController = require("../controllers/service");

// Create a new SeviceName
router.post("/", seviceNameController.createSevice);

// Get all SeviceNames
router.get("/", seviceNameController.getAllSevice);

// Get a specific SeviceName by ID
router.get("/:id", seviceNameController.getSeviceById);

// Update a specific SeviceName by ID
router.put("/:id", seviceNameController.updateSevice);

// Delete a specific SeviceName by ID
router.delete("/:id", seviceNameController.deleteSevice);

module.exports = router;

