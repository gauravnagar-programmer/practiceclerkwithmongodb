import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  image: String
}, { timestamps: true });

const userModel = mongoose.models.User || mongoose.model('User', userSchema);
export default userModel;