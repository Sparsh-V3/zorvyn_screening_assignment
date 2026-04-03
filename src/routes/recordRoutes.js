const express = require("express");
const { createRecord } = require("../controllers/recordController");
const authorizeAdmin = require("../middleware/authMiddleware");
const validateRecord = require("../middleware/validateRecord");
const router = express.Router();

router.post("/records", validateRecord, authorizeAdmin, createRecord);

module.exports = router;
