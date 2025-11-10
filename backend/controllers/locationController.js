const Location = require("../models/locationModel");
const getLocations = async (req, res) => {
  try {
    const locations = await Location.find({});
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const LocationItem = await Location.findById(id);
    res.status(200).json(LocationItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createLocation = async (req, res) => {
  try {
    const location = await Location.create(req.body);
    res.status(200).json(Location);
  } catch (error) {
    console.error("Error creating Cloth Item: ",error);
    res.status(500).json({ message: error.message });
  }
};

const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const location = await Location.findByIdAndUpdate(id, updateData, {new: true});

    if (!Location) {
      return res.status(404).json({ message: "Location not found" });
    }

    res.status(200).json(updatedLocation);
  } catch (error) {
    console.error("Error updating Location: ",error);
    res.status(500).json({ message: error.message });
  }
};

const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;

    const location = await Location.findByIdAndDelete(id);

    if (!Location) {
      return res.status(404).json({ message: "Location not found" });
    }

    res.status(200).json({ message: "Location deleted successfully" });
  } catch (error) {
    console.error("Error deleting Location Item: ",error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getLocations,
  getLocation,
  createLocation,
  updateLocation,
  deleteLocation,
};
