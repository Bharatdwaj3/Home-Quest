
const { default: mongoose } = require("mongoose");
const Owner = require("../models/ownerModel");
const User = require("../models/userModel");
const cloudinary = require("../services/cloudinary"); 
const getOwners = async (req, res) => {
  try {
    const Owners = await Owner.find({});
    res.status(200).json(Owners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOwner = async (req, res) => {
  try {
    const { id } = req.params;  
    const [aggregatedOwner] = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id), accountType: 'owner' } },
      {
        $lookup: {
          from: 'Owner',
          localField: '_id',
          foreignField: 'userId',
          as: 'profile'
        }
      },
      { $unwind: { path: '$profile', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          fullName: 1,
          email: 1,
          accountType: 1,
          age: '$profile.age',
          gender: '$profile.gender',
          phone: '$profile.phone',
          family: '$profile.family',
          dept: '$profile.dept',
          imageUrl: '$profile.imageUrl'
        }
      }
    ]);

    if (!aggregatedOwner) return res.status(404).json({ message: 'Owner not found' });
    res.status(200).json(aggregatedOwner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createOwner = async (req, res) => {

  try{
    const OwnerData=req.body;
    if(req.file){
      OwnerData.imageUrl=req.file.path;
      OwnerData.cloudinaryId=req.file.filename;
    }    
    const Owner =  await Owner.create(OwnerData);
    res.status(201).json(Owner);
  }catch(error){
    console.error("Error creating Owner: ".error);
    res.status(500).json({message: error.message});
  }
}

const updateOwnerProfile=async(req, res)=>{
  try{
    const userId=req.user.id;
    const user=await User.findById(userId);
    if(!user) return res.status(404).json({message: 'User not found'});
    if(user.accountType!='owner')
        return res.status(400).json({message: "You don't have permissions to edit this !!"});
    const profileData=req.body;
    if(req.file){
      profileData.imageUrl=req.file.path;
      profileData.cloudinaryId=req.file.filename;
    }
    const updatedProfile=await Owner.findOneAndUpdate(
      {userId: userId},
      {...profileData, userId: userId},
      {new: true, upsert: true, setDefaultsOnInsert: true}
    );
    res.status(200).json(updatedProfile);
  }catch(error){
    console.error("Profile update error: ",error);
    res.status(500).json({message: error.message});
  }
}

const deleteOwner = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOwner = await Owner.findByIdAndDelete(id);

    if (!deletedOwner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    if(deletedOwner.cloudinaryId){
      await cloudinary.uploader.destroy(Owner.cloudinaryId);
    }

    res.status(200).json({ message: "Owner deleted successfully" });
  } catch (error) {
    console.error("Error deleting Owner: ",error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getOwners,
  getOwner,
  createOwner,
  deleteOwner,
  updateOwnerProfile
};
