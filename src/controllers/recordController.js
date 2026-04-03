const pool = require("../config/db");

const createRecord = async (req, res) => {
  try {
    const { amount, type, category, date, notes } = req.body;

    const query = `
    INSERT INTO financial_records (amount, type, category, date, notes)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const values = [amount, type, category, date, notes];

    const result = await pool.query(query, values);

    return res.status(201).json({
      message: "Record created",
      data: result.rows[0],
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = { createRecord };
