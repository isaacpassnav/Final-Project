const mongoose = require("mongoose");
const Specialty = require("../models/Specialties");

const getAllSpecialties = async (req, res) => {
  //#swagger.tags = ['Specialities']
  //#swagger.summary = 'Display all Specialities'
    try {
        const specialties = await Specialty.find();
        res.status(200).json(specialties);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const getSpecialtyById = async (req, res) => {
  //#swagger.tags = ['Specialities']
  //#swagger.summary = 'Display Speciality by ID'
    try {
        const specialtyId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(specialtyId)) {
            return res.status(400).json({ message: "Invalid specialty ID" });
        };
        const specialty = await Specialty.findById(specialtyId);
        if (!specialty) {
            return res.status(404).json({ message: "Specialty not found" });
        }
        res.status(200).json(specialty);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const createSpecialty = async (req, res) => {
  //#swagger.tags = ['Specialities']
  //#swagger.summary = 'Create Speciality'
    try {
        const newSpecialty = new Specialty(req.body);
        const saveSpecialty = await newSpecialty.save();
        res.status(201).json({ message:"Specialty created successfuly" , Specialty: saveSpecialty});
    } catch (err) {
        res.status(500).json({ message: "Error creating specialty", error: err.message });
    }
};

const updateSpecialty = async (req, res) => {
  //#swagger.tags = ['Specialities']
  //#swagger.summary = 'Update Specialty by ID'

  try {
    const specialtyId = mongoose.Types.ObjectId.createFromHexString(req.params.id);

    const updatedSpecialty = {
      name: req.body.name,
      description: req.body.description
    };

    const response = await Specialty.replaceOne({ _id: specialtyId }, updatedSpecialty);

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: "Specialty updated successfully", specialty: updatedSpecialty });
    } else {
      res.status(404).json({ message: "Specialty not found or no changes made." });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred while updating the specialty." });
  }
};

const deleteSpecialty = async (req, res) => {
  //#swagger.tags = ['Specialities']
  //#swagger.summary = 'Delete Speciality by ID'
    try {
        const specialtyId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(specialtyId)) {
            return res.status(400).json({ message: "Invalid specialty ID" });
        }
        const deleted = await Specialty.findByIdAndDelete(specialtyId);
        if (!deleted) {
            return res.status(404).json({ message: "Specialty not found" });
        }
        res.status(200).json({ message: "Specialty deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
module.exports = {getAllSpecialties, getSpecialtyById, createSpecialty, updateSpecialty, deleteSpecialty,};
