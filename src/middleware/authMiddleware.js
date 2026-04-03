const authorizeAdmin = (req, res, next) => {
  const user = { role: "admin" };

  if (user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied",
    });
  }

  next();
};

module.exports = authorizeAdmin