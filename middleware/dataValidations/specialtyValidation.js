const Validator = require("validatorjs");

const specialtyRules = {
  name: "required|string|min:5|max:50",
  description: "string|min:5|max:300"
};

validateSpecialty = (req, res, next) => {
  const validation = new Validator(req.body, specialtyRules);

  if (validation.fails()) {
    return res.status(422).json({
      message: "Data Validation Failed",
      errors: validation.errors.all(),
    });
  }

  next();
};

module.exports = {validateSpecialty};
