const express = require("express");
const router = express.Router();
const collegeController = require ("../Controller/CollegeController")
const internsController = require("../Controller/internsController")




router.post("/functionup/colleges",collegeController.createCollege)
router.post("/functionup/interns",internsController.CreateInterns)
router.get("/functionup/collegeDetails",getController.getData)