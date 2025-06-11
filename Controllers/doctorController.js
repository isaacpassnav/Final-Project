const mongoose = require("mongoose");
const Doctor = require("/models/Doctor");

const getAllDoctors  = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (err) {
        console.error("Error retrieving Doctors", err )
        res.status(500).json({ message: "Error retrieving Doctors", error: err.message });
    };
};
const getDoctorById  = async (req, res) => {
    try {
        const doctorId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(400).json({ message: "Invalid Dcotor ID" });
        };
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: "Dcotor not found" });
        }
        res.status(200).json(doctor)
    } catch (err) {
        console.error("Error retrieving Docotor by ID", err);
        res.status(500).json({ message: "Server error", error: err.message });
    };
};
const getDoctorsBySpecialty = async (req, res) => {
  const specialtyId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(specialtyId)) {
    return res.status(400).json({ message: "Invalid specialty ID" });
  }
  try {
    const doctors = await Doctor.find({ specialty: specialtyId }).populate("specialty hospital");
    res.status(200).json(doctors);
  } catch (err) {
    console.error("Error retrieving doctors by specialty", err)
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
const createDoctor = async (req, res) => {
    try {
        const {firstName, lastName, email, gender, specialty, hospital} = req.body;
        if (!firstName || !lastName || !email || !gender || !specialty || !hospital) {
            return res.status(400).json({ message: "Missing required fields" });
        };
        const newDoctor = new Doctor(req.body);
        const saveDoctor = await newDoctor.save();
        res.status(201).json(saveDoctor);
    } catch (err) {
        console.error("Error saving new doctor", err);
        res.status(500).json({ message: "Error saving new doctor", error: err.message });
    };
}
const updateDoctor = async (req, res) => {
    try {
        const doctorId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(400).json({ message: "Invalid Doctor ID" });
        }
        const updatedDoctor = await Doctor.fin
    } catch (err) {
        
    }
}
