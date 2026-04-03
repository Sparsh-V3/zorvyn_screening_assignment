const validateRecord = (req, res, next) => {
  const { amount, type } = req.body;

  // Missing fields
  if (amount === undefined || type === undefined) {
    return res.json(400).json({
      message: "amount and type are required",
    });
  }

  // Amount validation
  if (typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({
      message: "amount must be a positive number",
    });
  }

  // Type validation
  if (type !== "income" && type !== "expense") {
    return res.status(400).json({
      message: "type must be 'income' or 'expense'",
    });
  }

  next()
};

module.exports = validateRecord
