const doctorController = require('../Controllers/doctorController');
const Doctor = require('../models/Doctor');
const mongoose = require('mongoose');

// Mock the Doctor model
jest.mock('../models/Doctor');

describe('Doctor Controller Unit Tests', () => {
  let req, res;

  beforeEach(() => {
    req = { params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  // getAllDoctors tests
  describe('getAllDoctors', () => {
    it('should return list of doctors', async () => {
      const doctorsMock = [
        { _id: '1', firstName: 'John', lastName: 'Doe' },
        { _id: '2', firstName: 'Jane', lastName: 'Smith' }
      ];

      Doctor.find.mockResolvedValue(doctorsMock);

      await doctorController.getAllDoctors(req, res);

      expect(Doctor.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(doctorsMock);
    });

    it('should handle errors', async () => {
      Doctor.find.mockRejectedValue(new Error('Database Error'));

      await doctorController.getAllDoctors(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Error retrieving Doctors',
          error: 'Database Error'
        })
      );
    });
  });

  // getDoctorById tests
  describe('getDoctorById', () => {
    it('should return doctor by ID', async () => {
      const id = new mongoose.Types.ObjectId().toString();
      req.params.id = id;

      const doctorMock = { _id: id, firstName: 'John', lastName: 'Doe' };

      Doctor.findById.mockResolvedValue(doctorMock);

      await doctorController.getDoctorById(req, res);

      expect(Doctor.findById).toHaveBeenCalledWith(id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(doctorMock);
    });

    it('should return 400 for invalid ID', async () => {
      req.params.id = 'invalidID';

      await doctorController.getDoctorById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid Doctor ID' });
    });

    it('should return 404 if doctor not found', async () => {
      const id = new mongoose.Types.ObjectId().toString();
      req.params.id = id;

      Doctor.findById.mockResolvedValue(null);

      await doctorController.getDoctorById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Doctor not found' });
    });

    it('should handle errors', async () => {
      const id = new mongoose.Types.ObjectId().toString();
      req.params.id = id;

      Doctor.findById.mockRejectedValue(new Error('Database Error'));

      await doctorController.getDoctorById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Server error',
          error: 'Database Error'
        })
      );
    });
  });

});