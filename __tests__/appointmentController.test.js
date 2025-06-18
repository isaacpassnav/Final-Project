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

      const mockQuery = {
        populate: jest.fn()
      };

      mockQuery.populate
        .mockImplementationOnce(() => mockQuery)
        .mockImplementationOnce(() => mockQuery)
        .mockImplementationOnce(() => Promise.resolve(mockAppointments));

      Appointment.find.mockReturnValue(mockQuery);

      await appointmentController.getAllAppointments(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockAppointments);
    });

    it('should handle errors', async () => {
      const mockQuery = {
        populate: jest.fn()
      };
      mockQuery.populate
        .mockImplementationOnce(() => mockQuery)
        .mockImplementationOnce(() => mockQuery)
        .mockImplementationOnce(() => Promise.reject(new Error('Database Error')));

      Appointment.find.mockReturnValue(mockQuery);

      await appointmentController.getAllAppointments(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('getAppointmentById', () => {
    it('should return appointment by ID', async () => {
      req.params.id = new mongoose.Types.ObjectId().toString();
      const mockAppointment = { id: req.params.id };

      const mockQuery = {
        populate: jest.fn()
      };
      mockQuery.populate
        .mockImplementationOnce(() => mockQuery)
        .mockImplementationOnce(() => mockQuery)
        .mockImplementationOnce(() => Promise.resolve(mockAppointment));

      Appointment.findById.mockReturnValue(mockQuery);

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

      const mockQuery = {
        populate: jest.fn()
      };
      mockQuery.populate
        .mockImplementationOnce(() => mockQuery)
        .mockImplementationOnce(() => mockQuery)
        .mockImplementationOnce(() => Promise.resolve(null));

      Appointment.findById.mockReturnValue(mockQuery);

      await appointmentController.getAppointmentById(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should handle server error', async () => {
      req.params.id = new mongoose.Types.ObjectId().toString();

      const mockQuery = {
        populate: jest.fn()
      };
      mockQuery.populate
        .mockImplementationOnce(() => mockQuery)
        .mockImplementationOnce(() => mockQuery)
        .mockImplementationOnce(() => Promise.reject(new Error('DB Error')));

      Appointment.findById.mockReturnValue(mockQuery);

      await appointmentController.getAppointmentById(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('getAppointmentsByDoctor', () => {
    it('should return appointments by doctor ID', async () => {
      const doctorId = new mongoose.Types.ObjectId().toString();
      req.params.id = doctorId;

      const mockAppointments = [{ id: '1' }];

      const secondPopulate = jest.fn().mockResolvedValue(mockAppointments); // ← async!
      const firstPopulate = jest.fn().mockReturnValue({ populate: secondPopulate });

      Appointment.find.mockReturnValue({ populate: firstPopulate });

      await appointmentController.getAppointmentsByDoctor(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockAppointments);
    });

    it('should handle not found', async () => {
      const doctorId = new mongoose.Types.ObjectId().toString();
      req.params.id = doctorId;

      const secondPopulate = jest.fn().mockResolvedValue([]); // ← también async
      const firstPopulate = jest.fn().mockReturnValue({ populate: secondPopulate });

      Appointment.find.mockReturnValue({ populate: firstPopulate });

      await appointmentController.getAppointmentsByDoctor(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: expect.stringContaining("No appointments found"),
      });
    });

    it('should handle invalid doctor ID', async () => {
      req.params.id = "invalidID";

      await appointmentController.getAppointmentsByDoctor(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid Doctor ID",
      });
    });

    it('should handle server error', async () => {
      const doctorId = new mongoose.Types.ObjectId().toString();
      req.params.id = doctorId;

      Appointment.find.mockImplementation(() => {
        throw new Error("Unexpected failure");
      });

      await appointmentController.getAppointmentsByDoctor(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: "Server error",
      }));
    });
  });
});
