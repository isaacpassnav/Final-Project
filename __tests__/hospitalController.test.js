const hospitalController = require('../Controllers/hospitalController');
const Hospital = require('../models/Hostipals');
const mongoose = require('mongoose');

jest.mock('../models/Hostipals');

describe('Hospital Controller - Get Routes', () => {
  let req, res;

  beforeEach(() => {
    req = { params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('getAllHospitals', () => {
    it('should return all hospitals', async () => {
      const mockHospitals = [{ id: '1' }, { id: '2' }];
      Hospital.find.mockResolvedValue(mockHospitals);

      await hospitalController.getAllHospitals(req, res);
      expect(Hospital.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockHospitals);
    });

    it('should handle errors', async () => {
      Hospital.find.mockRejectedValue(new Error('Database Error'));

      await hospitalController.getAllHospitals(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Error retrieving hospitals' })
      );
    });
  });

  describe('getHospitalById', () => {
    it('should return hospital by ID', async () => {
      req.params.id = new mongoose.Types.ObjectId().toString();
      const mockHospital = { id: req.params.id };

      Hospital.findById.mockResolvedValue(mockHospital);

      await hospitalController.getHospitalById(req, res);
      expect(Hospital.findById).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockHospital);
    });

    it('should handle invalid hospital ID', async () => {
      req.params.id = 'invalid-id';
      await hospitalController.getHospitalById(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Invalid hospital ID' })
      );
    });

    it('should handle hospital not found', async () => {
      req.params.id = new mongoose.Types.ObjectId().toString();
      Hospital.findById.mockResolvedValue(null);

      await hospitalController.getHospitalById(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Hospital not found' })
      );
    });

    it('should handle server error', async () => {
      req.params.id = new mongoose.Types.ObjectId().toString();
      Hospital.findById.mockRejectedValue(new Error('DB Error'));

      await hospitalController.getHospitalById(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Error retrieving hospital' })
      );
    });
  });
});
