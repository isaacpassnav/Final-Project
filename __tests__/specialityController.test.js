const specialityController = require('../Controllers/specialtyController');
const Specialty = require('../models/Specialties');
const mongoose = require('mongoose');

jest.mock('../models/Specialties');

describe('Speciality Controller - Get Routes', () => {
  let req, res;

  beforeEach(() => {
    req = { params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('getAllSpecialties', () => {
    it('should return all specialties', async () => {
      const mockSpecialties = [{ id: '1' }, { id: '2' }];
      Specialty.find.mockResolvedValue(mockSpecialties);

      await specialityController.getAllSpecialties(req, res);
      expect(Specialty.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockSpecialties);
    });

    it('should handle errors when retrieving specialties', async () => {
      Specialty.find.mockRejectedValue(new Error('Database Error'));

      await specialityController.getAllSpecialties(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Server error' })
      );
    });
  });

  describe('getSpecialtyById', () => {
    it('should return specialty by ID', async () => {
      req.params.id = new mongoose.Types.ObjectId().toString();
      const mockSpecialty = { id: req.params.id };

      Specialty.findById.mockResolvedValue(mockSpecialty);

      await specialityController.getSpecialtyById(req, res);
      expect(Specialty.findById).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockSpecialty);
    });

    it('should handle invalid specialty ID', async () => {
      req.params.id = 'invalid-id';
      await specialityController.getSpecialtyById(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Invalid specialty ID' })
      );
    });

    it('should handle specialty not found', async () => {
      req.params.id = new mongoose.Types.ObjectId().toString();
      Specialty.findById.mockResolvedValue(null);

      await specialityController.getSpecialtyById(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Specialty not found' })
      );
    });

    it('should handle server error during get by ID', async () => {
      req.params.id = new mongoose.Types.ObjectId().toString();
      Specialty.findById.mockRejectedValue(new Error('DB Error'));

      await specialityController.getSpecialtyById(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Server error' })
      );
    });
  });
});
