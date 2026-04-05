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

const getRecords = async (req, res) => {
  try {
    const { type, category, startDate, endDate } = req.query;

    let query = "SELECT * FROM financial_records WHERE 1=1";
    const values = [];
    let index = 1;

    if (type) {
      query += ` AND type = $${index++}`;
      values.push(type);
    }

    if (category) {
      query += ` AND category = $${index++}`;
      values.push(category);
    }

    if (startDate && endDate) {
      query += ` AND date BETWEEN $${index++} AND $${index++}`;
      values.push(startDate, endDate);
    }

    query += " ORDER BY date DESC";

    const result = await pool.query(query, values);

    return res.status(200).json({
      data: result.rows,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getSummary = async (req, res) => {
  try {
    const query = `
      SELECT
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense
      FROM financial_records
    `;

    const result = await pool.query(query);

    const { total_income, total_expense } = result.rows[0];

    return res.status(200).json({
      totalIncome: total_income || 0,
      totalExpense: total_expense || 0,
      netBalance: (total_income || 0) - (total_expense || 0),
    });
  } catch (error) {
    console.error("Summary error: ",error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { createRecord, getRecords, getSummary };
