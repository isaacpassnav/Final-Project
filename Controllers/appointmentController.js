const mongoose = require("mongoose");
const Appointment = require("../models/Appointment");
const sendAppointmentEmail = require("../utils/email");

const Patient = require("../models/Users");
const Doctor = require("../models/Doctor");
const Hospital = require("../models/Hostipals");

// c0b8c9d3e0f9e9c6104cfb09974e91d4598c1830

const getAllAppointments = async (req, res) => {
  //#swagger.tags = ['Appointments']
  //#swagger.summary = 'Get All Appointments'
    try {
        const appointments = await Appointment.find()
        .populate("patient", "fullName email")
        .populate("doctor", "firstName lastName specialty")
        .populate("hospital", "name address");
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message, error: err });
    }
};
const getAppointmentById = async (req, res) => {
  //#swagger.tags = ['Appointments']
  //#swagger.summary = 'Get an Appointment by ID'
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
        res.status(500).json({ message: "Server error", error: err.message, error: err });
    }
};

// new create appointment set up with email
const createAppointment = async (req, res) => {
  //#swagger.tags = ['Appointments']
  //#swagger.summary = 'Create an Appointment'

  try {
    const newAppointment = new Appointment(req.body);
    const saved = await newAppointment.save();

    const { email, date, reason } = req.body;

    if (email) {
      const subject = "Appointment Confirmation";
      const text = `Your appointment is confirmed for ${date}. Reason: ${reason}`;
      const html = `<p>Your appointment is <strong>confirmed</strong> for <strong>${date}</strong>.</p>
                    <p><strong>Reason:</strong> ${reason}</p>`;

      // Enviamos el correo (recuerda que sendAppointmentEmail debe aceptar 4 parámetros)
      await sendAppointmentEmail(email, subject, text, html);
    }

    res.status(201).json({
      message: "Appointment created successfully and confirmation email sent.",
      appointment: saved,
    });

  } catch (err) {
    console.error("❌ Error creating appointment:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
const updateAppointment = async (req, res) => {
  //#swagger.tags = ['Appointments']
  //#swagger.summary = 'Update an Appointment'
  try {
    const appointmentId = mongoose.Types.ObjectId.createFromHexString(req.params.id);
    const { patient, doctor, hospital, date, reason, status } = req.body;

    // Verificar que los IDs existan en sus colecciones
    const [foundPatient, foundDoctor, foundHospital] = await Promise.all([
      Patient.findById(patient),
      Doctor.findById(doctor),
      Hospital.findById(hospital)
    ]);

    if (!foundPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    if (!foundDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    if (!foundHospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    const updatedAppointment = {
      patient,
      doctor,
      hospital,
      date,
      reason,
      status
    };

    const response = await Appointment.replaceOne({ _id: appointmentId }, updatedAppointment);

    if (response.modifiedCount > 0) {
      res.status(200).json({
        message: "Appointment updated successfully",
        appointment: updatedAppointment
      });
    } else {
      res.status(404).json({ message: "Appointment not found or no changes made." });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred while updating the appointment.", error: error.message });
  }
};
const deleteAppointment = async (req, res) => {
  //#swagger.tags = ['Appointments']
  //#swagger.summary = 'Delete an Appointment by ID'
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
        res.status(500).json({ message: "Server error ", error: err.message, error: err });
    }
};
const getAppointmentsByUser = async (req, res) => {
  //#swagger.tags = ['Appointments']
  //#swagger.summary = 'Get an Appointment by User ID'
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
        res.status(500).json({ message: "Server error", error: err.message, userId: userId, error: err });
    }
};
const getAppointmentsByDoctor = async (req, res) => {
  //#swagger.tags = ['Appointments']
  //#swagger.summary = 'Get an Appointment by Doctor ID'
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
        res.status(500).json({ message: "Server error", error: err.message, doctorId: doctorId, error: err });
    }
};
module.exports = {getAllAppointments,getAppointmentById,createAppointment,updateAppointment,deleteAppointment,getAppointmentsByUser,getAppointmentsByDoctor};