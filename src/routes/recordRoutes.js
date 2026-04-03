const express = require("express");
const { createRecord, getRecords, getSummary } = require("../controllers/recordController");
const authorizeAdmin = require("../middleware/authMiddleware");
const validateRecord = require("../middleware/validateRecord");
const router = express.Router();

router.post("/records", validateRecord, authorizeAdmin, createRecord);

router.get("/records", getRecords)

router.get("/dashboard/summary", getSummary);

module.exports = router;
