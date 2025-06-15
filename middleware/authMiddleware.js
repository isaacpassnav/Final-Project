function ensureAuth(req, res, next) {
  const allowedAdmins = ["isaacpassnav", "mmusih"]; 

    if (req.isAuthenticated && req.isAuthenticated()) {
        const username = req.user?.username;

        if (allowedAdmins.includes(username)) {
            return next();
        }
        if (req.method === "GET") {
            return next();
        }
        return res.status(403).json({
        message: "🚫 Access denied: Please contact the Admin for permission."
        });
    }
    return res.status(401).json({
    message: "🚫 Unauthorized: Please log in with GitHub."
  });
}

module.exports = ensureAuth;