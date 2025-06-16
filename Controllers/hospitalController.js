const mongoose = require("mongoose");
const Hospital = require("../models/Hostipals");

const getAllHospitals = async (req, res) => {
  //#swagger.tags = ['Hospitals']
  //#swagger.summary = 'Display all Hospitals'
  try {
    const hospitals = await Hospital.find();
    res.status(200).json(hospitals);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving hospitals", error: err.message });
  }
};

const getHospitalById = async (req, res) => {
  //#swagger.tags = ['Hospitals']
  //#swagger.summary = 'Display Hospital by ID'
    try {
        const hospitalId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(hospitalId)) {
            return res.status(400).json({ message: "Invalid hospital ID" });
        }
        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) {
            return res.status(404).json({ message: "Hospital not found" });
        }
        res.status(200).json(hospital);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving hospital", error: err.message });
    }
};

const createHospital = async (req, res) => {
  //#swagger.tags = ['Hospitals']
  //#swagger.summary = 'Create Hospital'
    try {
        const newHospital = new Hospital(req.body);
        const saved = await newHospital.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ message: "Error creating hospital", error: err.message });
    }
};

const updateHospital = async (req, res) => {
  //#swagger.tags = ['Hospitals']
  //#swagger.summary = 'Update Hospital by ID'

  try {
    // Convert the ID from the URL parameter to a valid MongoDB ObjectId
    const hospitalId = mongoose.Types.ObjectId.createFromHexString(req.params.id);

    // Create an object with the updated hospital data from the request body
    const updatedHospital = {
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone
    };

    // Replace the existing hospital document with the new one
    const response = await Hospital.replaceOne({ _id: hospitalId }, updatedHospital);

    // Check if the document was successfully modified
    if (response.modifiedCount > 0) {
      res.status(200).json(updatedHospital); // Return the updated hospital data
      //res.status(204).send(); // Success with no content
    } else {
      // If no document was modified, it may not exist or no changes were made
      res.status(404).json({ error: "Hospital not found or no changes made." });
    }
  } catch (error) {
    // Handle any errors that occur during the update process
    console.error("Error updating hospital:", error);
    res.status(500).json({ error: "An error occurred while updating the hospital." });
  }
};

const deleteHospital = async (req, res) => {
  //#swagger.tags = ['Hospitals']
  //#swagger.summary = 'Delete Hospital by ID'
    try {
        const hospitalId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(hospitalId)) {
            return res.status(400).json({ message: "Invalid hospital ID" });
        }
        const deleted = await Hospital.findByIdAndDelete(hospitalId);
        if (!deleted) {
            return res.status(404).json({ message: "Hospital not found" });
        }    
        res.status(200).json({ message: "Hospital deleted" });
    } catch (err) {
        console.error("Error deleting hospital:", err);
        res.status(500).json({ message: "server Error", error: err.message });
    }
};

module.exports = {getAllHospitals, getHospitalById, createHospital, updateHospital, deleteHospital};
