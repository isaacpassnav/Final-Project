const Validator = require("validatorjs");

Validator.register(
  "phone_format",
  function (value) {
    const regex = /^\+?[0-9\s\-]{7,20}$/;
    return regex.test(value);
  },
  "The phone number format is invalid."
);

const hospitalRules = {
  name: "required|string|min:5|max:100",
  address: "required|string|min:5|max:200",
  phone: "required|string|phone_format",
  website: "string|url",
  capacity: "required|string|min:0"
};

const validateHospital = (req, res, next) => {
  const validation = new Validator(req.body, hospitalRules);

  if (validation.fails()) {
    return res.status(422).json({
      message: "Data Validation Failed",
      errors: validation.errors.all(),
    });
  }

  next();
};

module.exports = { validateHospital };
