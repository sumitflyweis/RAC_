const serviceName = require('../models/service');


exports.createSeviceArea = async (req, res) => {
  try {
    const { name,service ,price,offer} = req.body;

    // Validate required fields
    if (!name && !service&& !price&& !offer) {
      return res.status(400).json({ error: "Name & service&price&offer is required" });
    }

    // Create new seviceArea
    const newSeviceArea = new serviceName({ name , service,price,offer });
    const savedSeviceArea = await newSeviceArea.save();

    res.status(201).json(savedSeviceArea);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.getAllSeviceAreas = async (req, res) => {
  try {
    const seviceAreas = await serviceName.find();
    if (!seviceAreas || seviceAreas.length==0) {
        return res.status(400).json({ error: "serviceName is required" });
      }
    res.status(200).json({msg:seviceAreas});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSeviceAreaById = async (req, res) => {
  try {
    const seviceAreaId = req.params.id;
    const seviceArea = await serviceName.findById({_id:seviceAreaId});
        if (!seviceArea) {
      return res.status(404).json({ error: "serviceName not found" });
    }
        res.status(200).json({msg:seviceArea});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateSeviceArea = async (req, res) => {
  try {
    const seviceAreaId = req.params.id;
    const updates = req.body;
    
    const updatedSeviceArea = await serviceName.findByIdAndUpdate(seviceAreaId, updates, { new: true });
    
    if (!updatedSeviceArea) {
      return res.status(404).json({ error: "serviceName not found" });
    }
    
    res.status(200).json(updatedSeviceArea);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteSeviceArea = async (req, res) => {
  try {
    const seviceAreaId = req.params.id;
    const deletedSeviceArea = await serviceName.findByIdAndDelete(seviceAreaId);
    
    if (!deletedSeviceArea) {
      return res.status(404).json({ error: "serviceName not found" });
    }
    
    res.status(200).json({ message: "serviceName deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


