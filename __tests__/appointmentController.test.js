const appointmentController = require('../Controllers/appointmentController');
const Appointment = require('../models/Appointment');
const mongoose = require('mongoose');

// Mock the Appointment model
jest.mock('../models/Appointment');

describe('Appointment Controller - Get Routes', () => {
  let req, res;

  beforeEach(() => {
    req = { params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('getAllAppointments', () => {
    it('should return all appointments', async () => {
      const mockAppointments = [{ id: '1' }, { id: '2' }];
      Appointment.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        populate: jest.fn().mockReturnThis(),
        populate: jest.fn().mockResolvedValue(mockAppointments),
      });

      await appointmentController.getAllAppointments(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockAppointments);
    });

    it('should handle errors', async () => {
      Appointment.find.mockImplementation(() => ({
        populate: jest.fn().mockReturnThis(),
        populate: jest.fn().mockReturnThis(),
        populate: jest.fn().mockRejectedValue(new Error('Database Error')),
      }));

      await appointmentController.getAllAppointments(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('getAppointmentById', () => {
    it('should return appointment by ID', async () => {
      req.params.id = new mongoose.Types.ObjectId().toString();
      const mockAppointment = { id: req.params.id };

      Appointment.findById.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        populate: jest.fn().mockReturnThis(),
        populate: jest.fn().mockResolvedValue(mockAppointment),
      });

      await appointmentController.getAppointmentById(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockAppointment);
    });

    it('should handle invalid ID', async () => {
      req.params.id = 'invalid-id';
      await appointmentController.getAppointmentById(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should handle not found', async () => {
      req.params.id = new mongoose.Types.ObjectId().toString();
      Appointment.findById.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        populate: jest.fn().mockReturnThis(),
        populate: jest.fn().mockResolvedValue(null),
      });

      await appointmentController.getAppointmentById(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should handle server error', async () => {
      req.params.id = new mongoose.Types.ObjectId().toString();
      Appointment.findById.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        populate: jest.fn().mockReturnThis(),
        populate: jest.fn().mockRejectedValue(new Error('DB Error')),
      });

      await appointmentController.getAppointmentById(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('getAppointmentsByUser', () => {
    it('should return appointments by user ID', async () => {
      req.params.id = new mongoose.Types.ObjectId().toString();
      const mockAppointments = [{ id: '1' }];

      Appointment.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        populate: jest.fn().mockResolvedValue(mockAppointments),
      });

      await appointmentController.getAppointmentsByUser(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockAppointments);
    });

    it('should handle invalid user ID', async () => {
      req.params.id = 'invalid-id';
      await appointmentController.getAppointmentsByUser(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should handle not found', async () => {
      req.params.id = new mongoose.Types.ObjectId().toString();
      Appointment.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        populate: jest.fn().mockResolvedValue([]),
      });

      await appointmentController.getAppointmentsByUser(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe('getAppointmentsByDoctor', () => {
    it('should return appointments by doctor ID', async () => {
      req.params.id = new mongoose.Types.ObjectId().toString();
      const mockAppointments = [{ id: '1' }];

      Appointment.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        populate: jest.fn().mockReturnThis(),
        populate: jest.fn().mockResolvedValue(mockAppointments),
      });

      await appointmentController.getAppointmentsByDoctor(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockAppointments);
    });

    it('should handle invalid doctor ID', async () => {
      req.params.id = 'invalid-id';
      await appointmentController.getAppointmentsByDoctor(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should handle not found', async () => {
      req.params.id = new mongoose.Types.ObjectId().toString();
      Appointment.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        populate: jest.fn().mockReturnThis(),
        populate: jest.fn().mockResolvedValue([]),
      });

      await appointmentController.getAppointmentsByDoctor(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});