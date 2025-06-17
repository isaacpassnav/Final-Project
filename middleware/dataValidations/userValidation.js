const Validator = require("validatorjs");

const userRules = {
  fullName: "required|string|min:3|max:50",
  email: "required|email",
  password: "required|string|min:6",
  role: "in:admin,doctor,patient"
};

const userUpdateRules = {
  fullName: "string|min:3|max:50",
  email: "email",
  password: "required|string|min:6",
  role: "in:admin,doctor,patient"
};

validateUser = (req, res, next) => {
  const validation = new Validator(req.body, userRules);
  if (validation.fails()) {
    return res.status(422).json({ message: "Data Validation Failed", errors: validation.errors.all() });
  }
  next();
};

validateUserUpdate = (req, res, next) => {
  const validation = new Validator(req.body, userUpdateRules);
  if (validation.fails()) {
    return res.status(422).json({ message: "Data Validation Failed", errors: validation.errors.all() });
  }
  next();
};

module.exports = {
  validateUser,
  validateUserUpdate
};
