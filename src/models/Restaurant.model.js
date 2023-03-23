import mongoose from 'mongoose';

const RestaurantSchema = new mongoose.Schema({
  name: String,
  description: String,
  direction: String,
  phone: String,
  email: String,
  website: String,
  category: String,
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

export default Restaurant;
