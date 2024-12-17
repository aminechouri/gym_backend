const express = require("express");
const router = express.Router();
const Gym = require("../models/gym");

// @route POST /api/gyms
// @desc Add a new gym
// @access Public
router.post("/gyms", async (req, res) => {
  try {
    const { name, location, contactNumber, description } = req.body;

    // Validate required fields
    if (!name || !location || !contactNumber) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }

    // Create a new gym instance
    const newGym = new Gym({
      name,
      location,
      contactNumber,
      description,
    });

    // Save the gym to the database
    await newGym.save();

    res.status(201).json({ message: "Gym added successfully", gym: newGym });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
});


router.get('/gyms', async (req, res) => {
  try {
    const gyms = await Gym.find();
    res.status(200).json(gyms);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
