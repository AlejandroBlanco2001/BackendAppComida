import mongoose from 'mongoose';

const RestaurantSchema = new mongoose.Schema({
  idAdmin: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  description: { type: String },
  direction: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  category: { type: String, required: true },
  rating: { type: Number, default: 0 },
  isDeleted: { type: Boolean, default: false },
});

RestaurantSchema.pre('find', function () {
  this.where({ isDeleted: false });
});

RestaurantSchema.pre('findOne', function () {
  this.where({ isDeleted: false });
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

export default Restaurant;
