const Validator = require("validatorjs");

const appointmentRules = {
  patient: "required|string|size:24",
  doctor: "required|string|size:24",
  hospital: "required|string|size:24",
  date: "required|date",
  reason: "string|max:300",
  status: "in:pending,confirmed,cancelled"
};

validateAppointment = (req, res, next) => {
  const validation = new Validator(req.body, appointmentRules);
  if (validation.fails()) {
    return res.status(422).json({
      message: "Data Validation Failed",
      errors: validation.errors.all()
    });
  }
  next();
};

validateAppointmentUpdate = (req, res, next) => {
  const validation = new Validator(req.body, appointmentUpdateRules);
  if (validation.fails()) {
    return res.status(422).json({
      message: "Data Validation Failed",
      errors: validation.errors.all()
    });
  }
  next();
};

module.exports = {
  validateAppointment,
  validateAppointmentUpdate
};
