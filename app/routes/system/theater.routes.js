const express = require("express");
const { theaterController } = require("../../controllers/system/theater.controller");

const router = express.Router();

router.get("/list", theaterController.getTheaters);
router.post("/create", theaterController.createTheater);
router.post("/create-complex", theaterController.createTheaterComplex);
router.get("/chair", theaterController.getChairs);
router.post("/create-chair", theaterController.createChair);
router.post("/find", theaterController.findTheater);

router.post("/booking", theaterController.createBooking);

module.exports = router;
