import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  second_name: { type: String },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  direction: {
    road: { type: String, required: true },
    number: { type: Number, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postal_code: { type: Number, required: true },
  },
  phone: { type: String, required: true },
  role: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

UserSchema.pre('find', function () {
  this.where({ isDeleted: false });
});

UserSchema.pre('findOne', function () {
  this.where({ isDeleted: false });
});

const User = mongoose.model('User', UserSchema);

export default User;
