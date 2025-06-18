const Validator = require("validatorjs");

const doctorRules = {
  firstName: "required|string|min:2|max:50",
  lastName: "required|string|min:2|max:50",
  email: "required|email",
  phone: "numeric|regex:^\\+?[0-9]{7,15}$|min:10",
  gender: "required|in:male,female,other",
  specialty: "required|string",
  hospital: "required|string",
};

const validateDoctor = async (req, res, next) => {
  const validation = new Validator(req.body, doctorRules);

  if (validation.fails()) {
    return res.status(422).json({
      message: "Data Validation Failed",
      errors: validation.errors.all(),
    });
  }
  next();
};

module.exports = {validateDoctor};
