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
        const { name, address, phone } = req.body;
        if (!name || !address || !phone) {
            return res.status(400).json({ message: "Missing required fields" });
        }
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
        const hospitalId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(hospitalId)) {
            return res.status(400).json({ message: "Invalid hospital ID" });
        }
        const updated = await Hospital.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Hospital not found" });
            res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: "Error updating hospital", error: err.message });
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
