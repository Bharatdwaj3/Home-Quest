const { default: mongoose } = require("mongoose");
const PG = require("../models/pgModel");
const cloudinary = require("../services/cloudinary");
 
const getPGs = async (req, res) => {
  try {
    const PGs = await PG.find({});
    res.status(200).json(PGs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPG = async (req, res) => {
  try {
    const { id } = req.params;
    const PGs = await PG.findById(id);
    res.status(200).json(PGs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPG = async (req, res) => {
  try {
    const PGData = req.body;
    if (typeof PGData.rooms === 'string') {
      PGData.rooms = JSON.parse(PGData.rooms);
    }
    if (typeof PGData.avaliable === 'string') {
      PGData.avaliable = PGData.avaliable === 'true';
    }
    if (PGData.latitude) PGData.latitude = parseFloat(PGData.latitude);
    if (PGData.longitude) PGData.longitude = parseFloat(PGData.longitude);
    
    if (req.file) {
      PGData.imageUrl = req.file.path;
      PGData.cloudinaryId = req.file.filename;
    }
    const newPG = await PG.create(PGData);
    res.status(201).json(newPG); 
    
  } catch(error) {
    res.status(500).json({ message: error.message });
  }
}
const updatePG = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const pgData = await PG.findByIdAndUpdate(id, updateData, {new: true});
    if (!pgData) {
      return res.status(404).json({ message: "Room not found" });
    }
    if(pgData.userId.toString()!=req.user.id.toString()&& req.user.role!=='admin'){
      return res.status(403).json({message: "You can only update your owned rooms "})
    }
    if(req.file){
      updateData.imageUrl=req.file.path;
      updateData.cloudinaryId=req.file.filename;
    }
    const updatedPG = await PG.findByIdAndUpdate(id, updateData, {new: true});
    
    if (!updatedPG) {
      return res.status(404).json({ message: "PG not found" });
    }

    res.status(200).json(PG);
  } catch (error) {
    console.error("Error updating PG: ",error);
    res.status(500).json({ message: error.message });
  }
};



const deletePG = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPG = await PG.findByIdAndDelete(id);

    if (!deletedPG) {
      return res.status(404).json({ message: "PG not found" });
    }

    if(deletedPG.cloudinaryId){
      await cloudinary.uploader.destroy(PG.cloudinaryId);
    }

    res.status(200).json({ message: "PG deleted successfully" });
  } catch (error) {
    console.error("Error deleting PG: ",error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPGs,
  getPG,
  createPG,
  updatePG,
  deletePG,
};