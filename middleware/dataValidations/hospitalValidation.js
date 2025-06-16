const Validator = require("validatorjs");

const hospitalRules = {
  name: "required|string|min:5|max:100",
  address: "required|string|min:5|max:200",
  phone: "required|string|regex:^\\+?[0-9\\s\\-]{7,20}$",
  website: "string|url",
  capacity: "numeric|min:0"
};

validateHospital = (req, res, next) => {
  const validation = new Validator(req.body, hospitalRules);

  if (validation.fails()) {
    return res.status(422).json({
      message: "Data Validation Failed",
      errors: validation.errors.all(),
    });
  }

  next();
};

module.exports = {validateHospital};
