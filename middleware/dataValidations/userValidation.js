const Validator = require("validatorjs");

validateGitHubLogin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Authentication failed. User not logged in." });
  }

  const userData = {
    fullName: req.user.displayName,
    email: req.user.emails?.[0]?.value || "",
  };

  const loginRules = {
    fullName: "required|string|min:3|max:50",
    email: "required|email",
  };

  const validation = new Validator(userData, loginRules);
  if (validation.fails()) {
    return res.status(422).json({ message: "Login data validation failed", errors: validation.errors.all() });
  }

  next();
};

validateLogoutUser = async (req, res) => {
  try {
    const userName = req.user?.displayName || req.user?.username || "Unknown User";

    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to log out the user", error: err });
      }

      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: "Failed to destroy the session", error: err });
        }

        res.clearCookie("connect.sid");

        if (!req.isAuthenticated || !req.isAuthenticated()) {
          return res.status(200).json({
            message: "Logout successful",
            user: userName
          });
        } else {
          return res.status(400).json({
            message: "Logout failed, user still authenticated",
            user: userName
          });
        }
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Unexpected server error during logout", error });
  }
};

validateUser = (req, res, next) => {

  const userRules = {
  fullName: "required|string|min:3|max:50",
  email: "required|email",
  password: "required|string|min:6",
  role: "in:admin,doctor,patient"
  };

  const validation = new Validator(req.body, userRules);
  if (validation.fails()) {
    return res.status(422).json({ message: "Data Validation Failed", errors: validation.errors.all() });
  }
  next();
};

validateUserUpdate = (req, res, next) => {

  const userUpdateRules = {
  fullName: "string|min:3|max:50",
  email: "email",
  password: "required|string|min:6",
  role: "in:admin,doctor,patient"
  };

  const validation = new Validator(req.body, userUpdateRules);
  if (validation.fails()) {
    return res.status(422).json({ message: "Data Validation Failed", errors: validation.errors.all() });
  }
  next();
};

module.exports = {
  validateGitHubLogin,
  validateLogoutUser,
  validateUser,
  validateUserUpdate
};
