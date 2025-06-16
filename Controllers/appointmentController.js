const mongoose = require("mongoose");
const Appointment = require("../models/Appointment");

const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
        .populate("patient", "fullName email")
        .populate("doctor", "firstName lastName specialty")
        .populate("hospital", "name address");
        res.status(200).json(appointments);
    } catch (err) {
        console.error("Error retrieving Appointments", err )
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
const getAppointmentById = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
            return res.status(400).json({ message: "Invalid appointment ID" });
        }
        const appointment = await Appointment.findById(appointmentId)
        .populate("patient", "fullName email")
        .populate("doctor", "firstName lastName specialty")
        .populate("hospital", "name address");
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.status(200).json(appointment);
    } catch (err) {
        console.error("Error retrieving Appointment by ID", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
const createAppointment = async (req, res) => {
    try {
        const newAppointment = new Appointment(req.body);
        const saved = await newAppointment.save();
        res.status(201).json(saved);
    } catch (err) {
        console.error("Error saving new Appointment", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
const updateAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
            return res.status(400).json({ message: "Invalid appointment ID" });
        }
        const updated = await Appointment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updated) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.status(200).json(updated);
    } catch (err) {
        console.error("Error updating Appointment:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
const deleteAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
            return res.status(400).json({ message: "Invalid appointment ID" });
        }
        const deleted = await Appointment.findByIdAndDelete(appointmentId);
        if (!deleted) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.status(200).json({ message: "Appointment deleted" });
    } catch (err) {
        console.error("Error deleting Appointment:", err); 
        res.status(500).json({ message: "Server error ", error: err.message });
    }
};
const getAppointmentsByUser = async (req, res) => {
    const userId = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }
        const appointments = await Appointment.find({ patient: userId })
        .populate("doctor", "firstName lastName specialty")
        .populate("hospital", "name address");
        if (appointments.length === 0) {
            return res.status(404).json({ message: `No appointments found for User ID: ${userId}` });
        }
        res.status(200).json(appointments);
    } catch (err) {
        console.error(`Error retrieving appointments for User ID: ${userId}`, err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
const getAppointmentsByDoctor = async (req, res) => {
    const doctorId = req.params.id;
    try {
    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
        return res.status(400).json({ message: "Invalid Doctor ID" });
    }
    const appointments = await Appointment.find({ doctor: doctorId })
        .populate("patient", "fullName email")
        .populate("hospital", "name address");

    if (appointments.length === 0) {
        return res.status(404).json({ message: `No appointments found for Doctor ID: ${doctorId}` });
    }
    res.status(200).json(appointments);
  } catch (err) {
        console.error(`Error retrieving appointments for Doctor ID: ${doctorId}`, err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
module.exports = {getAllAppointments,getAppointmentById,createAppointment,updateAppointment,deleteAppointment,getAppointmentsByUser,getAppointmentsByDoctor,};