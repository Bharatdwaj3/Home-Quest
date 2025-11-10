const { default: mongoose } = require("mongoose");
const Tenant = require("../models/tenantModel");
const User = require("../models/userModel");
const cloudinary = require("../services/cloudinary"); 
const getTenants = async (req, res) => {
  try {
    const Tenants = await Tenant.find({});
    res.status(200).json(Tenants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTenant = async (req, res) => {
  try {
    const { id } = req.params;  
    const [aggregatedTenant] = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id), accountType: 'tenant' } },
      {
        $lookup: {
          from: 'tenant',
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
          course: '$profile.course',
          imageUrl: '$profile.imageUrl'
        }
      }
    ]);

    if (!aggregatedTenant) return res.status(404).json({ message: 'Tenant not found' });
    res.status(200).json(aggregatedTenant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const updateTenantProfile=async(req, res)=>{
  try{
    const userId=req.user.id;
    const user=await User.findById(userId);
    if(!user) return res.status(404).json({message: 'Tenant not found'});
    if(user.accountType!='tenant')
        return res.status(400).json({message: "You don't have permissions to edit this !!"});
    const profileData=req.body;
    if(req.file){
      profileData.imageUrl=req.file.path;
      profileData.cloudinaryId=req.file.filename;
    }
    const updatedProfile=await Tenant.findOneAndUpdate(
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

const deleteTenant = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTenant = await Tenant.findByIdAndDelete(id);

    if (!deletedTenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    if(deletedTenant.cloudinaryId){
      await cloudinary.uploader.destroy(Tenant.cloudinaryId);
    }

    res.status(200).json({ message: "Tenant deleted successfully" });
  } catch (error) {
    console.error("Error deleting Tenant: ",error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTenants,
  getTenant,
  deleteTenant,
  updateTenantProfile
};
