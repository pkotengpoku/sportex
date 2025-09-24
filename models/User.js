import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  emailVerified: Date,
  image: String,
  role: { // Your custom field
    type: String,
    default: 'user', // Default role for a new user
    required: true
  },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;