const userController = require('../Controllers/userController');
const User = require('../models/Users');
const mongoose = require('mongoose');

jest.mock('../models/Users');

describe('User Controller - Get Routes', () => {
  let req, res;

  beforeEach(() => {
    req = { params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const mockUsers = [{ id: '1' }, { id: '2' }];
      User.find.mockResolvedValue(mockUsers);

      await userController.getAllUsers(req, res);
      expect(User.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUsers);
    });

    it('should handle server errors when retrieving users', async () => {
      User.find.mockRejectedValue(new Error('Database Error'));

      await userController.getAllUsers(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'server error' })
      );
    });
  });

  describe('getUserById', () => {
    it('should return user by ID', async () => {
      req.params.id = new mongoose.Types.ObjectId().toString();
      const mockUser = { id: req.params.id };

      User.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser),
      });

      await userController.getUserById(req, res);
      expect(User.findById).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it('should handle invalid user ID', async () => {
      req.params.id = 'invalid-id';
      await userController.getUserById(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Invalid user ID' })
      );
    });

    it('should handle user not found', async () => {
      req.params.id = new mongoose.Types.ObjectId().toString();
      User.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      await userController.getUserById(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'User not found' })
      );
    });

    it('should handle server error during get by ID', async () => {
      req.params.id = new mongoose.Types.ObjectId().toString();
      User.findById.mockReturnValue({
        select: jest.fn().mockRejectedValue(new Error('DB Error')),
      });

      await userController.getUserById(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Server error' })
      );
    });
  });
});
