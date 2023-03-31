import mongoose from 'mongoose';

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  direction: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  category: { type: String, required: true },
  rating: { type: Number, default: 0 },
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

export default Restaurant;
