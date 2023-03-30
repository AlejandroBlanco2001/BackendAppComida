import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: String,
  first_name: String,
  second_name: String,
  password: String,
  email: String,
  direction: String,
  phone: String,
  role: String,
});

const User = mongoose.model('User', UserSchema);

export default User;
