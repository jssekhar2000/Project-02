const express = require("express");
const router = express.Router();
const collegeController = require ("../Controller/CollegeController")
const internsController = require("../Controller/internsController")





router.post("/functisonup/college",collegeController.createCollege)
router.post("/functionup/interns",internsController.createInterns)
router.get("/functionup/collegeDetails",internsController.getCollegeDetails)

module.exports = router;